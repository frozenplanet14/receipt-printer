import { Component, OnInit } from '@angular/core';
import { EpsonPrintingService } from 'src/app/services/epson-printing.service';
import { CanvasSettingClass } from './canvas-setting-form/canvas-setting.model';

@Component({
  selector: 'epson-print-canvas',
  templateUrl: './print-canvas.component.html',
  styleUrls: ['./print-canvas.component.scss']
})
export class PrintCanvasComponent implements OnInit {
  webApiUrl: string;
  canvas: HTMLCanvasElement;

  constructor(private printerService: EpsonPrintingService) { }

  ngOnInit(): void {
    this.webApiUrl = this.printerService.getUrl();
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

}
