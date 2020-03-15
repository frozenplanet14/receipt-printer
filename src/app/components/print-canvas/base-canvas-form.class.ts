import { Output, EventEmitter } from '@angular/core';

export abstract class BaseCanvasFormClass {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  @Output() clearCanvas = new EventEmitter<void>();

  abstract drawCanvas(value?: string): void;

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
