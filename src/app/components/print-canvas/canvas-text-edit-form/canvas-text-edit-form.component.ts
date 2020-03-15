import { Component } from '@angular/core';
import { CanvasTextFormClass, TEXTALIGN, TEXTBASE } from './canvas-text-form.model';
import { BaseCanvasFormClass } from '../base-canvas-form.class';

@Component({
  selector: 'epson-canvas-text-edit-form',
  templateUrl: './canvas-text-edit-form.component.html',
  styleUrls: ['./canvas-text-edit-form.component.scss']
})
export class CanvasTextEditFormComponent extends BaseCanvasFormClass {
  textForm = new CanvasTextFormClass();
  alignments = TEXTALIGN;
  baselines = TEXTBASE;

  constructor() {
    super();
  }

  drawText() {
    const { bold, italic, caps, size, font, textalign, textbase, x, y, text, line } = this.textForm;
    this.context.font =
      (italic ? 'italic ' : 'normal ') + (caps ? 'small-caps ' : 'normal ') +
      (bold ? 'bold ' : 'normal ') + size + 'px ' + font;
    this.context.textAlign = textalign as CanvasTextAlign;
    this.context.textBaseline = textbase as CanvasTextBaseline;
    this.context.fillText(text, Number(x), Number(y) + Number(line));
  }

  onApply() {
    this.drawText();
  }

}
