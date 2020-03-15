import { Output, EventEmitter } from '@angular/core';

export abstract class BaseCanvasFormClass {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  @Output() clearCanvas = new EventEmitter<void>();

  drawCanvas(): void {

  }

  initialize(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
    this.canvas = canvas;
    this.context = context;
  }

  onClear() {
    this.clearCanvas.next();
  }

  onApply() {
    this.onClear();
    this.drawCanvas();
  }
}
