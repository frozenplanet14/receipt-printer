import { Component, OnInit, ComponentRef, OnDestroy } from '@angular/core';
import { EpsonPrintingService } from 'src/app/services/epson-printing.service';
import { CanvasSettingClass } from './canvas-setting-form/canvas-setting.model';
import { ActivatedRoute, Data } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'epson-print-canvas',
  templateUrl: './print-canvas.component.html',
  styleUrls: ['./print-canvas.component.scss']
})
export class PrintCanvasComponent implements OnInit, OnDestroy {
  webApiUrl: string;
  canvas: HTMLCanvasElement;
  routeData: Observable<Data>;
  canvasSubscription: Subscription;

  constructor(
    private printerService: EpsonPrintingService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.webApiUrl = this.printerService.getUrl();
    this.routeData = this.activatedRoute.data;
  }

  onActivate(componentReference: any) {
    console.log(componentReference);
    this.canvasSubscription = componentReference.shareCanvas
      .subscribe((canvas: HTMLCanvasElement) => this.canvas = canvas);
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
    epos.print(this.canvas);
  }

  ngOnDestroy() {
    if (this.canvasSubscription) {
      this.canvasSubscription.unsubscribe();
    }
  }

}
