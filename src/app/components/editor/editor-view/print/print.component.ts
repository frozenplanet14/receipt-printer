import { Component, OnInit } from '@angular/core';
import { PrintClass } from './print.model';
import { EpsonPrintingService } from 'src/app/services/epson-printing.service';
import { MESSAGE } from '../epos-print-editor.const';
import { DocumentService } from '../../services/document.service';

@Component({
  selector: 'epson-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.scss']
})
export class PrintComponent implements OnInit {
  printForm = new PrintClass();
  constructor(
    private printService: EpsonPrintingService,
    private docService: DocumentService
  ) { }

  ngOnInit(): void {
    this.docService.xml.subscribe(xml => this.printForm.doc = xml);
    this.setStatusMonitor();
  }

  setStatusMonitor() {
    const epos = this.printService.printCommand();
    if ((this.printService.getExtraSetting() || {}).status) {
      if (!epos.enabled) {
        epos.open();
        this.addPrintInfo(MESSAGE.epos_open);
      }
    } else {
      if (epos.enabled) {
        epos.close();
        this.addPrintInfo(MESSAGE.epos_close);
      }
    }
    epos.ononline = () => {
      this.addPrintInfo(MESSAGE.epos_online);
    };
    epos.onoffline = () => {
      this.addPrintInfo(MESSAGE.epos_offline);
    };
    epos.onpoweroff = () => {
      this.addPrintInfo(MESSAGE.epos_poweroff);
    };
    epos.oncoverok = () => {
      this.addPrintInfo(MESSAGE.epos_coverok);
    };
    epos.oncoveropen = () => {
      this.addPrintInfo(MESSAGE.epos_coveropen);
    };
    epos.onpaperok = () => {
      this.addPrintInfo(MESSAGE.epos_paperok);
    };
    epos.onpapernearend = () => {
      this.addPrintInfo(MESSAGE.epos_papernearend);
    };
    epos.onpaperend = () => {
      this.addPrintInfo(MESSAGE.epos_paperend);
    };
    epos.ondrawerclosed = () => {
      this.addPrintInfo(MESSAGE.epos_drawerclosed);
    };
    epos.ondraweropen = () => {
      this.addPrintInfo(MESSAGE.epos_draweropen);
    };
    epos.onbatterylow = () => {
      this.addPrintInfo(MESSAGE.epos_batterylow);
    };
    epos.onbatteryok = () => {
      this.addPrintInfo(MESSAGE.epos_batteryok);
    };
    epos.onbatterystatuschange = (a) => {
      if (a > 0) {
        this.addPrintInfo(MESSAGE.epos_batterystatus + ': 0x' + ('000' + a.toString(16)).slice(-4));
      }
    };
  }

  addPrintInfo(f) {
    const b = new Date();
    const a = [b.getFullYear(), ('0' + (b.getMonth() + 1)).slice(-2), ('0' + b.getDate()).slice(-2)].join('-');
    const e = [b.getHours(), ('0' + b.getMinutes()).slice(-2), ('0' + b.getSeconds()).slice(-2)].join(':');
    this.printForm.info += a + ' ' + e + ' ' + f + '\n';
  }

  sendPrintDoc() {
    const epos = this.printService.printCommand();
    // tslint:disable-next-line: one-variable-per-declaration
    let a: Date, b: string;
    if ((this.printService.getExtraSetting() || {}).jobid) {
      a = new Date();
      b =
        'E' +
        a.getHours() +
        ('0' + a.getMinutes()).slice(-2) +
        ('0' + a.getSeconds()).slice(-2) +
        ('00' + a.getMilliseconds()).slice(-3);
      epos.send(this.printForm.doc, b);
      this.addPrintInfo(MESSAGE.epos_send + ' (' + MESSAGE.epos_jobid + ': ' + b + ')');
    } else {
      epos.send(this.printForm.doc);
      this.addPrintInfo(MESSAGE.epos_send);
    }
  }

}
