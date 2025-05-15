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
    const shape = this.shape();
    shape.on('mouseenter', () => {
      document.body.style.cursor = 'pointer';
    })
    shape.on('mouseleave', () => {
      document.body.style.cursor = 'default';
    })
    layer.add(shape);
  }

  shape(): Konva.Group {
    const group = new Konva.Group({
      x: this.x,
      y: this.y,
    });
    const body = new Konva.Line({
      points: [
        0,
        this.height / 2,
        this.width / 2,
        0,
        this.width,
        this.height / 2,
        this.width,
        this.height,
        0,
        this.height
      ],
      closed: true,
      fill: 'lightblue',
      stroke: 'black',
      strokeWidth: 1,
    });
    const door = new Konva.Rect({
      x: this.width / 3,
      y: this.height * 2 / 3,
      width: this.width / 3,
      height: this.height / 3,
      fill: 'brown',
      stroke: 'black'
    });

    group.add(body, door);

    return group;
  }
}
