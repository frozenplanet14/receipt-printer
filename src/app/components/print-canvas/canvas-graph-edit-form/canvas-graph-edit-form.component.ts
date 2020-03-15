import { Component } from '@angular/core';
import { BaseCanvasFormClass } from '../base-canvas-form.class';
import { CanvasGraphFormClass, FILL_STYLES } from './canvas-graph-form.model';

@Component({
  selector: 'epson-canvas-graph-edit-form',
  templateUrl: './canvas-graph-edit-form.component.html',
  styleUrls: ['./canvas-graph-edit-form.component.scss']
})
export class CanvasGraphEditFormComponent extends BaseCanvasFormClass {
  graphForm = new CanvasGraphFormClass();
  fillStyles = FILL_STYLES;
  constructor() {
    super();
  }

  drawCanvas() {

  }

  swapColor() {
    const { col1, col2 } = this.graphForm;
    this.graphForm.col1 = col2;
    this.graphForm.col2 = col1;
  }

  drawCircle() {
    const { arcx, arcy, arcr } = this.graphForm;
    // Circle
    this.context.beginPath();
    this.context.arc(Number(arcx), Number(arcy), Number(arcr), 0, Math.PI * 2, false);
    this.context.closePath();
    // Fill
    this.fillColor();
  }

  drawRect() {
    const { rectx, recty, rectw, recth } = this.graphForm;
    // Rectangle
    this.context.beginPath();
    this.context.rect(Number(rectx), Number(recty), Number(rectw), Number(recth));
    this.context.closePath();
    // Fill
    this.fillColor(true);
  }

  fillColor(isRect?: boolean) {
    const { fill, col1, col2, rectx, recty, rectw, recth, arcx, arcy, arcr } = this.graphForm;
    switch (Number(fill)) {
      case 0:
        // stroke
        this.context.stroke();
        break;
      case 1:
        // fill
        this.context.fillStyle = col1;
        this.context.fill();
        break;
      case 2:
        // linear gradient
        const s = Number(arcr) / Math.sqrt(2);
        const linear = isRect
          ? this.context.createLinearGradient(Number(rectx), Number(recty), Number(rectx) + Number(rectw), Number(rectx) + Number(recth))
          : this.context.createLinearGradient(Number(arcx) - s, Number(arcy) - s, Number(arcx) + s, Number(arcy) + s);
        linear.addColorStop(0, col1);
        linear.addColorStop(1, col2);
        this.context.fillStyle = linear;
        this.context.fill();
        break;
      case 3:
        // radical gradient
        const a = Number(rectw) / 2;
        const b = Number(recth) / 2;
        const u = Number(rectx) + a;
        const v = Number(recty) + b;
        const radial = isRect
          ? this.context.createRadialGradient(u, v, 0, u, v, Math.sqrt(a * a + b * b))
          : this.context.createRadialGradient(Number(arcx), Number(arcy), 0, Number(arcx), Number(arcy), Number(arcr));
        radial.addColorStop(0, col1);
        radial.addColorStop(1, col2);
        this.context.fillStyle = radial;
        this.context.fill();
        break;
      default:
        break;
    }
  }

}
