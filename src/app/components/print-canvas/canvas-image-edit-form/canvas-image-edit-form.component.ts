import { Component, ViewChild, ElementRef } from '@angular/core';
import { CanvasFormClass } from './canvas-form.model';
import { BaseCanvasFormClass } from '../base-canvas-form.class';

declare var pdfjsLib: any;

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
      // console.log(event.target);
      const pdfText = 'data:application/pdf;base64,';
      const result = event.target.result as string;
      if (result.startsWith(pdfText)) {
        this.viewPDF(result, pdfText);
      } else {
        this.drawCanvas(result);
      }
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

  viewPDF(base64: string, prefixText: string) {
    const pdfData = atob(base64.replace(prefixText, ''));
    pdfjsLib.getDocument({ data: pdfData }).promise.then(pdf => {
      pdf.getPage(1).then(page => {
        const viewport = page.getViewport({ scale: 1, });
        this.canvas.height = viewport.height;
        this.canvas.width = viewport.width;
        // var scale = desiredWidth / viewport.width;
        // var scaledViewport = page.getViewport({ scale: scale, });
        page.render({
          canvasContext: this.context,
          viewport
        });
      });
    });
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
