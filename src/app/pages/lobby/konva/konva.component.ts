import {AfterViewInit, Component} from '@angular/core';
import Konva from 'konva';
import {House} from '../../../_shapes/house';

@Component({
  selector: 'app-konva',
  templateUrl: './konva.component.html',
  styleUrl: './konva.component.less',
  standalone: false
})
export class KonvaComponent implements AfterViewInit {
  selectedLayer?: Konva.Layer;
  stage?: Konva.Stage;

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
  }

}
