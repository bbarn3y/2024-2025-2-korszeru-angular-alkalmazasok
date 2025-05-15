import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import Konva from 'konva';
import {House} from '../../../_shapes/house';
import {ShapesChangedWorkerEvent, WorkerEvent, WorkerEventType} from '../../../_models/worker';
import {KonvaMode} from '../../../_models/konva';
import {NzContextMenuService, NzDropdownMenuComponent} from 'ng-zorro-antd/dropdown';

@Component({
  selector: 'app-konva',
  templateUrl: './konva.component.html',
  styleUrl: './konva.component.less',
  standalone: false
})
export class KonvaComponent implements AfterViewInit {
  konvaScale = 1;
  leftClickedShape?: Konva.Node;
  rightClickedShape?: Konva.Node;
  selectedLayer?: Konva.Layer;
  selectedLayerIndex?: number = 0;
  selectedMode: KonvaMode = KonvaMode.SELECT;
  stage?: Konva.Stage;
  transformer?: Konva.Transformer;
  worker?: Worker;

  @ViewChild('menu') contextMenuEl!: NzDropdownMenuComponent;

  constructor(private elRef: ElementRef,
              private nzContextMenuService: NzContextMenuService) {
  }

  ngAfterViewInit() {
    this.loadState();

    console.log(this.stage);

    // Worker
    this.worker = new Worker(new URL('../../../_workers/konva.worker.ts', import.meta.url));

    this.worker.onmessage = ({data}: MessageEvent<WorkerEvent>) => {
      console.log('main thread message', data);
      if (data.type === WorkerEventType.SHAPES_CHANGED) {
        const shapesChangedWorkerEvent = data as ShapesChangedWorkerEvent;
        shapesChangedWorkerEvent.newShapes.forEach((shapeJSON) => {
          this.addNewShapeFromJSON(shapeJSON);
        });
        shapesChangedWorkerEvent.modifiedShapes.forEach((shapeJSON) => {
          this.modifyShapeFromJSON(shapeJSON);
        })
      }
    };

    this.worker.onerror = (error: ErrorEvent) => {
      console.log(error);
    };

    console.log('Sending test message...');
    this.worker.postMessage('Test message');
    // this.worker.postMessage(new CreateWorkerEvent(10))

    this.addListeners();
  }

  addListeners() {
    document.addEventListener('keydown', (e) => {
      e.preventDefault();
      switch (e.code) {
        case 'ArrowUp':
          this.leftClickedShape?.y(this.leftClickedShape?.y() - 5);
          break;
        case 'ArrowDown':
          this.leftClickedShape?.y(this.leftClickedShape?.y() + 5);
          break;
        case 'ArrowLeft':
          this.leftClickedShape?.x(this.leftClickedShape?.x() - 5);
          break;
        case 'ArrowRight':
          this.leftClickedShape?.x(this.leftClickedShape?.x() + 5);
          break;
      }
    });

    this.stage?.on('click', (event) => {
      if (this.stage && this.selectedLayer) {
        const pointer = this.stage.getPointerPosition();
        this.leftClickedShape = this.getClickTarget(event.target);
        console.log(' this.leftClickedShape',  this.leftClickedShape);
        if (this.leftClickedShape instanceof Konva.Shape || this.leftClickedShape instanceof Konva.Group) {
          switch(this.selectedMode) {
            case KonvaMode.DRAG:
              this.transformer?.nodes([]);
              this.leftClickedShape.draggable(true);
              this.leftClickedShape.startDrag();
              break;
            case KonvaMode.SELECT:
              this.leftClickedShape.draggable(false);
              this.transformer?.nodes([this.leftClickedShape]);
              this.transformer?.moveToTop();
              break;
          }
        } else {
          switch (this.selectedMode) {
            case KonvaMode.HOUSE:
              if (pointer) {
                const house = new House(
                  (pointer.x - this.stage.x()) / this.konvaScale,
                  (pointer.y - this.stage.y()) / this.konvaScale,
                  100,
                  100
                )
                house.draw(this.selectedLayer);
              }
              break;
            case KonvaMode.SELECT:
              this.transformer?.nodes([]);
              break;
          }
        }
      }
    })

    this.stage?.on('contextmenu', (event) => {
      event.evt.preventDefault();
      this.rightClickedShape = this.getClickTarget(event.target);

      if (this.rightClickedShape) {
        this.nzContextMenuService.create({
          x: this.rightClickedShape.getClientRect().x,
          y: this.elRef.nativeElement.getBoundingClientRect().y + this.rightClickedShape.getClientRect().y
        }, this.contextMenuEl);
      }
    })

    this.stage?.on('wheel', (event) => {
      event.evt.preventDefault();
      if (this.stage) {
        let scaleBy = 1.03;
        let oldScale = this.stage.scaleX();
        let direction = event.evt.deltaY;
        let pointer = this.stage.getPointerPosition();

        if (pointer) {
          let pointerScaledPosition = {
            x: (pointer.x - this.stage.x()) / oldScale,
            y: (pointer.y - this.stage.y()) / oldScale
          }

          this.konvaScale = direction < 0 ? oldScale * scaleBy : oldScale / scaleBy;

          this.stage.position({
            x: pointer.x - pointerScaledPosition.x * this.konvaScale,
            y: pointer.y - pointerScaledPosition.y * this.konvaScale,
          });
          this.stage.scale({
            x: this.konvaScale,
            y: this.konvaScale
          });
        }
      }
    })
  }

  changeLayer(layerIndex: number) {
    this.selectedLayer = this.stage?.getLayers()[layerIndex];
    this.stage?.getLayers().forEach((layer, index) => {
      layer.listening(layerIndex === index)
    })
    this.transformer?.nodes([]);
  }

  deleteShape() {
    this.rightClickedShape?.destroy();
  }

  goToOrigo() {
    // const localPosition = this.rightClickedShape?.getRelativePointerPosition();
    //
    // console.log('localPos', localPosition);
    //
    // if (localPosition) {
    //   this.rightClickedShape?.to({
    //     x: localPosition.x * -1,
    //     y: localPosition.y * -1,
    //     duration: 2
    //   })
    // }

    if (!this.rightClickedShape) return;
    this.rightClickedShape.to({
      x: 0,
      y: 0,
      duration: 1
    })
  }

  makeItRed(shape?: Konva.Node) {
    if (!shape) return;

    if (shape instanceof Konva.Group) {
      shape.children.forEach(this.makeItRed);
    } else {
      shape?.to({
        fill: 'red',
        duration: 2,
        easing: Konva.Easings.EaseIn
      })
    }
  }

  getClickTarget(target: Konva.Node) {
    if (target instanceof Konva.Stage) {
      return undefined;
    } else if (target.parent instanceof Konva.Group) {
      return target.parent;
    } else {
      return target;
    }
  }

  addNewShapeFromJSON(json: string) {
    const shape = Konva.Node.create(json);
    this.selectedLayer?.add(shape);
  }

  modifyShapeFromJSON(json: string) {
    const shape = JSON.parse(json);
    const shapeInLayer = this.selectedLayer?.children
      .find((child) => child.attrs.elementId === shape.attrs.elementId);
    if (shapeInLayer) {
      Object.keys(shape.attrs).forEach((key) => {
        shapeInLayer.setAttr(key, shape.attrs[key]);
        // (shapeInLayer as Konva.Shape).fill(shape.attrs['fill']);
      })
    }
  }

  loadState() {
    const savedState = localStorage.getItem('konvaState');
    if (savedState) {
      this.stage = Konva.Node.create(savedState, 'konva-container');
      this.selectedLayer = this.stage?.children[0];
    } else {
      this.stage = new Konva.Stage({
        container: 'konva-container',
        width: window.innerWidth,
        height: window.innerHeight
      });

      const layer1 = new Konva.Layer();
      const layer2 = new Konva.Layer();
      this.stage.add(layer1, layer2);

      this.selectedLayer = this.stage.getLayers()[0];

      const rectangle = new Konva.Rect({
        x: 100,
        y: 150,
        width: 200,
        height: 100,
        fill: 'rgba(133,200,300,0.4)',
        stroke: 'black',
        strokeWidth: 5,
        draggable: false
      });
      const house = new House(
        300, 200, 100, 100
      )
      house.draw(this.selectedLayer);
      this.selectedLayer.add(rectangle);
    }

    this.transformer = new Konva.Transformer();
    this.selectedLayer?.add(this.transformer);
  }

  saveState() {
    if (this.stage) {
      const json = this.stage.toJSON();
      localStorage.setItem('konvaState', json);
    }
  }

  protected readonly KonvaMode = KonvaMode;
}
