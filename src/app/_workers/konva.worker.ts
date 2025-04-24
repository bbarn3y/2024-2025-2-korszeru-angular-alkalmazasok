import {CreateWorkerEvent, ShapesChangedWorkerEvent, WorkerEvent, WorkerEventType} from '../_models/worker';
import Konva from 'konva';
import {interval} from 'rxjs';

const blinkingRectangles: Konva.Rect[] = [];

self.onmessage = (event: MessageEvent<WorkerEvent>) => {
  console.log('message', event);

  switch (event.data.type) {
    case WorkerEventType.CREATE:
      const createWorkerEvent = event.data as CreateWorkerEvent;
      createRandomizedObjects(createWorkerEvent.count);
      break;
  }
}

function createRandomizedObjects(count: number) {
  const newShapes = [];
  for (let i= 0; i < count; i++) {
    if (Math.random() < 0.5) {
      newShapes.push(randomArrow());
    } else {
      newShapes.push(randomRect());
    }
  }
  postMessage(new ShapesChangedWorkerEvent(newShapes, []));
}


function randomArrow() {
  const points: number[] =
    [...Array(3)].flatMap((i) => [Math.floor(Math.random() * 600), Math.floor((Math.random() * 600))]);

  const arrow = new Konva.Arrow({
    points: points,
    stroke: 'black',
    strokeWidth: 7,
    tension: Math.random(),
    elementId: randomInteger(0, 100000),
  });

  return arrow.toJSON();
}

function randomRect() {
  const originalFillColor = randomColor();
  const secondaryFillColor = randomColor();

  const rect = new Konva.Rect({
    x: randomInteger(0, 700),
    y: randomInteger(0, 700),
    width: randomInteger(100, 300),
    height: randomInteger(100, 400),
    stroke: 'black',
    strokeWidth: 3,
    elementId: randomInteger(0, 100000),
    fill: originalFillColor,
    originalFillColor,
    secondaryFillColor
  });

  blinkingRectangles.push(rect);

  return rect.toJSON();
}

function randomInteger(from: number, to: number): number {
  return Math.round(Math.random() * to) + from;
}

function randomColor(): string {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

function blinkingLoop() {
  interval(1000).subscribe(() => {
    if (blinkingRectangles.length > 0) {
      const modifiedShapeJSONs: string[] = blinkingRectangles.map((shape) => {
        if (shape.fill() === shape.attrs.originalFillColor) {
          shape.fill(shape.attrs.secondaryFillColor);
        } else {
          shape.fill(shape.attrs.originalFillColor);
        }
        return shape.toJSON();
      })
      postMessage(new ShapesChangedWorkerEvent([], modifiedShapeJSONs));
    }
  })
}
blinkingLoop();
