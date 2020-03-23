import { Component, OnInit, OnDestroy } from '@angular/core';
import { PrintClass } from './print.model';
import { EpsonPrintingService } from 'src/app/services/epson-printing.service';
import { MESSAGE } from '../epos-print-editor.const';
import { DocumentService } from '../../services/document.service';

@Component({
  selector: 'epson-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.scss']
})
export class PrintComponent implements OnInit, OnDestroy {
  printForm = new PrintClass();
  epos: any;
  constructor(
    private printService: EpsonPrintingService,
    private docService: DocumentService
  ) { }

  ngOnInit(): void {
    this.docService.xml.subscribe(xml => this.printForm.doc = xml);
    this.setStatusMonitor();
  }

  ngOnDestroy() {
    this.closeConnection();
  }

  closeConnection() {
    if (this.epos.enabled) {
      this.epos.close();
      this.addPrintInfo(MESSAGE.epos_close);
    }
  }

  setStatusMonitor() {
    this.epos = this.printService.printCommand();
    if ((this.printService.getExtraSetting() || {}).status) {
      if (!this.epos.enabled) {
        this.epos.open();
        this.addPrintInfo(MESSAGE.epos_open);
      }
    } else {
      this.closeConnection();
    }
    this.epos.ononline = () => {
      this.addPrintInfo(MESSAGE.epos_online);
    };
    this.epos.onoffline = () => {
      this.addPrintInfo(MESSAGE.epos_offline);
    };
    this.epos.onpoweroff = () => {
      this.addPrintInfo(MESSAGE.epos_poweroff);
    };
    this.epos.oncoverok = () => {
      this.addPrintInfo(MESSAGE.epos_coverok);
    };
    this.epos.oncoveropen = () => {
      this.addPrintInfo(MESSAGE.epos_coveropen);
    };
    this.epos.onpaperok = () => {
      this.addPrintInfo(MESSAGE.epos_paperok);
    };
    this.epos.onpapernearend = () => {
      this.addPrintInfo(MESSAGE.epos_papernearend);
    };
    this.epos.onpaperend = () => {
      this.addPrintInfo(MESSAGE.epos_paperend);
    };
    this.epos.ondrawerclosed = () => {
      this.addPrintInfo(MESSAGE.epos_drawerclosed);
    };
    this.epos.ondraweropen = () => {
      this.addPrintInfo(MESSAGE.epos_draweropen);
    };
    this.epos.onbatterylow = () => {
      this.addPrintInfo(MESSAGE.epos_batterylow);
    };
    this.epos.onbatteryok = () => {
      this.addPrintInfo(MESSAGE.epos_batteryok);
    };
    this.epos.onbatterystatuschange = (a) => {
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
