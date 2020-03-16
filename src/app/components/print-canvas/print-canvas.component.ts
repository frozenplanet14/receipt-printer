import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { EpsonPrintingService } from 'src/app/services/epson-printing.service';
import { CanvasSettingClass } from './canvas-setting-form/canvas-setting.model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BaseCanvasFormClass } from './base-canvas-form.class';

@Component({
  selector: 'epson-print-canvas',
  templateUrl: './print-canvas.component.html',
  styleUrls: ['./print-canvas.component.scss']
})
export class PrintCanvasComponent implements OnInit, OnDestroy {
  webApiUrl: string;
  title: string;
  @ViewChild('canvas', { static: true }) canvas: ElementRef;
  context: CanvasRenderingContext2D;
  canvasSubscription: Subscription;

  constructor(
    private printerService: EpsonPrintingService,
    public router: Router) { }

  ngOnInit(): void {
    this.webApiUrl = this.printerService.getUrl();
  }

  onActivate(componentReference: BaseCanvasFormClass) {
    // console.log(componentReference, this.router.getCurrentNavigation().extras.state);
    this.title = (this.router.getCurrentNavigation().extras.state || {}).title;
    this.context = (this.canvas.nativeElement as HTMLCanvasElement).getContext('2d');
    componentReference.initialize(this.canvas.nativeElement as HTMLCanvasElement, this.context);
    this.canvasSubscription = componentReference.clearCanvas
      .subscribe(() => {
        if (this.context) {
          // clear canvas
          this.context.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
        }
      });
  }

  printCanvas(imageProp: CanvasSettingClass) {
    const epos = this.printerService.printCommand(true);
    const { mode, brightness, halftone, align, color, cut } = imageProp;
    epos.mode = epos[mode];
    epos.brightness = brightness;
    epos.halftone = epos[halftone];
    epos.align = epos[align];
    epos.color = epos[color];
    epos.cut = cut;
    epos.print(this.canvas.nativeElement);
  }

  ngOnDestroy() {
    if (this.canvasSubscription) {
      this.canvasSubscription.unsubscribe();
    }
  }

}
