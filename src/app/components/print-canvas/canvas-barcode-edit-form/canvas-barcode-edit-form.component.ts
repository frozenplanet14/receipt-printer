import { Component } from '@angular/core';
import { BaseCanvasFormClass } from '../base-canvas-form.class';
import { CanvasBarcodeFormClass } from './canvas-barcode-form.model';
import { drawEan13 } from 'src/app/functions/draw-ean13.function';

@Component({
  selector: 'epson-canvas-barcode-edit-form',
  templateUrl: './canvas-barcode-edit-form.component.html',
  styleUrls: ['./canvas-barcode-edit-form.component.scss', '../print-canvas.component.scss']
})
export class CanvasBarcodeEditFormComponent extends BaseCanvasFormClass {
  barCodeForm = new CanvasBarcodeFormClass();

  constructor() {
    super();
  }

  drawCanvas() {
    const { x, y, w, h, data } = this.barCodeForm;
    drawEan13(this.context, data, Number(x), Number(y), Number(w), Number(h));
  }

}
