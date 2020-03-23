import { Component, OnInit, ViewChild, ElementRef, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';

export interface DimensionModel {
  width: number;
  height: number;
}

@Component({
  selector: 'epson-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {
  @ViewChild('clone') clone: ElementRef;
  @ViewChild('container', { read: ViewContainerRef }) container;

  constructor(private resolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
  }

  cloneTemplate(dims: DimensionModel) {
    this.container.createEmbeddedView(this.clone, { context: dims });
  }

}
