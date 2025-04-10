import Konva from 'konva';

export class House {
  x: number;
  y: number;
  width: number;
  height: number;

  constructor(x: number, y: number, width: number, height: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  draw(layer: Konva.Layer) {
    layer.add(this.shape());
  }

  shape(): Konva.Group {
    const group = new Konva.Group({});
    const body = new Konva.Line({
      points: [
        this.x,
        this.y + this.height / 2,
        this.x + this.width / 2,
        this.y,
        this.x + this.width,
        this.y + this.height / 2,
        this.x + this.width,
        this.y + this.height,
        this.x,
        this.y + this.height
      ],
      closed: true,
      fill: 'lightblue',
      stroke: 'black',
      strokeWidth: 1
    });
    const door = new Konva.Rect({
      x: this.x + this.width / 3,
      y: this.y + this.height * 2 / 3,
      width: this.width / 3,
      height: this.height / 3,
      fill: 'brown',
      stroke: 'black'
    });

    group.add(body, door);

    return group;
  }
}
