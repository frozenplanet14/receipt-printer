import { Output, EventEmitter } from '@angular/core';

export class BaseCanvasFormClass {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  @Output() clearCanvas = new EventEmitter<void>();

  initialize(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
    this.canvas = canvas;
    this.context = context;
  }

  onClear() {
    this.clearCanvas.next();
  }
}
