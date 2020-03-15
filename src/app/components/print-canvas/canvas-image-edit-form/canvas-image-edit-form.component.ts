import { Component, ViewChild, ElementRef, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { CanvasFormClass } from './canvas-form.model';

@Component({
  selector: 'epson-canvas-image-edit-form',
  templateUrl: './canvas-image-edit-form.component.html',
  styleUrls: ['./canvas-image-edit-form.component.scss']
})
export class CanvasImageEditFormComponent implements AfterViewInit {
  @Output() shareCanvas = new EventEmitter<HTMLCanvasElement>();
  imageForm = new CanvasFormClass();
  file: File;
  addtnFileDetail: string;
  @ViewChild('fileUpload', { static: true }) fileUpload: ElementRef;
  @ViewChild('canvas', { static: true }) canvas: ElementRef;
  context: CanvasRenderingContext2D;

  constructor() { }

  ngAfterViewInit() {
    this.shareCanvas.next(this.canvas.nativeElement);
    this.context = (this.canvas.nativeElement as HTMLCanvasElement).getContext('2d');
  }

  getBase64(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      // console.log(reader.result);
      this.drawImage(event.target.result as string);
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
        this.getBase64(imageFile[0]);
      }
    };
    fileUpload.click();
  }

  onApply() {
    if (this.file) {
      this.getBase64(this.file);
    }
  }

  drawImage(value: string) {
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

  onClear() {
    if (this.context) {
      this.file = null;
      this.addtnFileDetail = null;
      // clear canvas
      this.context.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    }
  }

}
