import {AfterViewInit, Component} from '@angular/core';
import Konva from 'konva';
import {House} from '../../../_shapes/house';
import {CreateWorkerEvent, ShapesChangedWorkerEvent, WorkerEvent, WorkerEventType} from '../../../_models/worker';

@Component({
  selector: 'app-konva',
  templateUrl: './konva.component.html',
  styleUrl: './konva.component.less',
  standalone: false
})
export class KonvaComponent implements AfterViewInit {
  selectedLayer?: Konva.Layer;
  stage?: Konva.Stage;
  worker?: Worker;

  ngAfterViewInit() {
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
    });
    const house = new House(
      300, 200, 100, 100
    )
    house.draw(this.selectedLayer);
    this.selectedLayer.add(rectangle);

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
    this.worker.postMessage(new CreateWorkerEvent(10))
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

}
