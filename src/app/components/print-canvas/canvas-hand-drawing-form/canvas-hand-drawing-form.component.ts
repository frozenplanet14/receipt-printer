import { Component, AfterViewInit } from '@angular/core';
import { BaseCanvasFormClass } from '../base-canvas-form.class';
import { LabelValueModel, getDefault } from '../canvas-setting-form/canvas-setting.model';
import { fromEvent } from 'rxjs';
import { switchMap, takeUntil, pairwise } from 'rxjs/operators';

@Component({
  selector: 'epson-canvas-hand-drawing-form',
  templateUrl: './canvas-hand-drawing-form.component.html',
  styleUrls: ['./canvas-hand-drawing-form.component.scss']
})
export class CanvasHandDrawingFormComponent extends BaseCanvasFormClass implements AfterViewInit {
  penWidths: LabelValueModel[] = [{
    label: 'Thin',
    value: '3',
    isDefault: true
  }, {
    label: 'Medium',
    value: '6'
  }, {
    label: 'Thick',
    value: '9'
  }];
  pen: string = getDefault(this.penWidths).value;

  constructor() {
    super();
  }

  ngAfterViewInit() {
    this.drawCanvas();
  }

  drawCanvas(): void {
    this.context.lineWidth = Number(this.pen);
    // we'll implement this method to start capturing mouse events
    this.captureEvents(this.canvas);
  }

  // https://medium.com/@tarik.nzl/creating-a-canvas-component-with-free-hand-drawing-with-rxjs-and-angular-61279f577415
  private captureEvents(canvasEl: HTMLCanvasElement) {
    // this will capture all mousedown events from the canvas element
    fromEvent(canvasEl, 'mousedown')
      .pipe(
        switchMap((e) => {
          // after a mouse down, we'll record all mouse moves
          return fromEvent(canvasEl, 'mousemove')
            .pipe(
              // we'll stop (and unsubscribe) once the user releases the mouse
              // this will trigger a 'mouseup' event
              takeUntil(fromEvent(canvasEl, 'mouseup')),
              // we'll also stop (and unsubscribe) once the mouse leaves the canvas (mouseleave event)
              takeUntil(fromEvent(canvasEl, 'mouseleave')),
              // pairwise lets us get the previous value to draw a line from
              // the previous point to the current point
              pairwise()
            );
        })
      )
      .subscribe((res: [MouseEvent, MouseEvent]) => {
        const rect = canvasEl.getBoundingClientRect();

        // previous and current position with the offset
        const prevPos = {
          x: res[0].clientX - rect.left,
          y: res[0].clientY - rect.top
        };

        const currentPos = {
          x: res[1].clientX - rect.left,
          y: res[1].clientY - rect.top
        };

        // this method we'll implement soon to do the actual drawing
        this.drawOnCanvas(prevPos, currentPos);
      });
  }

  private drawOnCanvas(
    prevPos: { x: number, y: number },
    currentPos: { x: number, y: number }
  ) {
    // incase the context is not set
    if (!this.context) { return; }

    // start our drawing path
    this.context.beginPath();

    // we're drawing lines so we need a previous position
    if (prevPos) {
      // sets the start point
      this.context.moveTo(prevPos.x, prevPos.y); // from

      // draws a line from the start pos until the current position
      this.context.lineTo(currentPos.x, currentPos.y);

      // strokes the current path with the styles we set earlier
      this.context.stroke();
    }
  }

}
