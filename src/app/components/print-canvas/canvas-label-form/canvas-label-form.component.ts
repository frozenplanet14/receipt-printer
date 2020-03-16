import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { BaseCanvasFormClass } from '../base-canvas-form.class';
import { CanvasLabelFormClass } from './canvas-label-form.model';
import { drawEan13 } from 'src/app/functions/draw-ean13.function';

@Component({
  selector: 'epson-canvas-label-form',
  templateUrl: './canvas-label-form.component.html',
  styleUrls: ['./canvas-label-form.component.scss', '../print-canvas.component.scss']
})
export class CanvasLabelFormComponent extends BaseCanvasFormClass implements AfterViewInit, OnDestroy {
  labelForm = new CanvasLabelFormClass();

  constructor() {
    super();
  }

  ngAfterViewInit() {
    this.canvas.width = 384;
    this.canvas.height = 160;
  }

  ngOnDestroy() {
    this.canvas.width = 360;
    this.canvas.height = 512;
  }

  drawCanvas() {
    const { name, desc, code, price } = this.labelForm;
    // line-width
    this.context.lineWidth = 2;
    // stroke-style
    this.context.strokeStyle = 'black';
    // strokeRect
    this.context.strokeRect(1, 1, 382, 79);
    this.context.strokeRect(1, 80, 382, 79);
    this.context.strokeRect(1, 80, 258, 79);

    // font
    this.context.font = 'normal normal bold 40px "Times New Roman", serif';
    // text-align
    this.context.textAlign = 'start';
    // text-baseline
    this.context.textBaseline = 'top';
    // fill-style
    this.context.fillStyle = 'black';
    // fillText
    this.context.fillText(name, 5, 5);

    // font
    this.context.font = 'normal normal normal 30px "Arial", sans-serif';
    // text-align
    this.context.textAlign = 'start';
    // text-baseline
    this.context.textBaseline = 'top';
    // fill-style
    this.context.fillStyle = 'black';
    // fillText
    this.context.fillText(desc, 5, 45);

    // barcode
    drawEan13(this.context, code, 13, 85, 2, 50);
    // font
    this.context.font = 'normal normal normal 20px "OCR-B", sans-serif';
    // text-align
    this.context.textAlign = 'center';
    // text-baseline
    this.context.textBaseline = 'top';
    // fill-style
    this.context.fillStyle = 'black';
    // fillText
    this.context.fillText(code, 130, 135);

    // font
    this.context.font = 'normal normal bold 30px "Arial", sans-serif';
    // text-align
    this.context.textAlign = 'end';
    // text-baseline
    this.context.textBaseline = 'middle';
    // fill-style
    this.context.fillStyle = 'black';
    // fillText
    this.context.fillText(price, 379, 120);
  }

}
