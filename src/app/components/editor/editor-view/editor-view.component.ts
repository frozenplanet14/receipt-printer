import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'epson-editor-view',
  templateUrl: './editor-view.component.html',
  styleUrls: ['./editor-view.component.scss']
})
export class EditorViewComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas', { static: true }) canvas: ElementRef;
  context: CanvasRenderingContext2D;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    const canvas = (this.canvas.nativeElement as HTMLCanvasElement);
    this.context = canvas.getContext('2d');
    this.context.clearRect(0, 0, canvas.width, canvas.height);
  }

}
