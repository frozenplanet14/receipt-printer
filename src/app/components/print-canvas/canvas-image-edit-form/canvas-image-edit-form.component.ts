import { Component, ViewChild, ElementRef, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { CanvasFormClass } from './canvas-form.model';
import { BaseCanvasFormClass } from '../base-canvas-form.class';

@Component({
  selector: 'epson-canvas-image-edit-form',
  templateUrl: './canvas-image-edit-form.component.html',
  styleUrls: ['./canvas-image-edit-form.component.scss', '../print-canvas.component.scss']
})
export class CanvasImageEditFormComponent extends BaseCanvasFormClass {
  imageForm = new CanvasFormClass();
  file: File;
  addtnFileDetail: string;
  @ViewChild('fileUpload', { static: true }) fileUpload: ElementRef;

  constructor() {
    super();
  }

  getBase64(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      // console.log(reader.result);
      this.drawCanvas(event.target.result as string);
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  }

  onUpload() {
    const fileUpload = this.fileUpload.nativeElement;
    fileUpload.onchange = () => {
      const imageFile = fileUpload.files;
      // console.log(imageFile[0]);
      if (imageFile && imageFile.length) {
        this.file = imageFile[0];
        this.onApply();
      }
    };
    fileUpload.click();
  }

  onApply() {
    if (this.file) {
      this.onClear();
      this.getBase64(this.file);
    }
  }

  drawCanvas(value: string) {
    // load image
    if (!value) {
      return;
    }
    const image = new Image();
    image.src = value;
    image.onload = () => {
      // show message
      this.addtnFileDetail = (' Image: Width ' + image.width + 'px, Height ' + image.height + 'px');
      if (this.context) {
        // rotate
        const { x, y, w, h, d } = this.imageForm;
        const r = Number(d) * Math.PI / 180;
        this.context.rotate(r);
        // draw image
        this.context.drawImage(image, 0, 0, image.width, image.height, Number(x), Number(y), Number(w), Number(h));
        // rotate in opposit
        this.context.rotate(-r);
      }
    };
  }

  onClear(isForceClear?: boolean) {
    super.onClear();
    if (isForceClear) {
      this.file = null;
      this.addtnFileDetail = null;
    }
  }

}
