export enum WorkerEventType {
  CREATE = 'CREATE',
  SHAPES_CHANGED = 'SHAPES_CHANGED'
}

export class WorkerEvent {
  type: WorkerEventType;

  constructor(type: WorkerEventType) {
    this.type = type;
  }
}

export class CreateWorkerEvent extends WorkerEvent {
  count: number;

  constructor(count: number) {
    super(WorkerEventType.CREATE);
    this.count = count;
  }
}

export class ShapesChangedWorkerEvent extends WorkerEvent {
  newShapes: string[];
  modifiedShapes: string[];

  constructor(newShapes: string[], modifiedShapes: string[]) {
    super(WorkerEventType.SHAPES_CHANGED);
    this.newShapes = newShapes;
    this.modifiedShapes = modifiedShapes;
  }
}
