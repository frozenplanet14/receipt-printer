import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../components/dialog/dialog.component';
import { DialogDataModel } from '../models/dialog-data.model';
import { CanvasMeasureModel } from '../models/canvas-measure.model';
import { drawEan13 } from '../functions/draw-ean13.function';
import { PrintOptionType } from '../constants/print-option.const';

declare var epson: any; // quiet down the editor, library is referenced in index.html

@Injectable({
  providedIn: 'root'
})
export class EpsonPrintingService {
  activePos: any;
  // Queue Ticket Sequence Number
  sequence = 1;

  // Coupon Serial Number
  serial = 12301;

  // Item Code
  code = 2012001;

  constructor(private localStore: LocalStorageService, private dialog: MatDialog) { }

  execiutePrint(value: PrintOptionType) {
    this.onStart();
    switch (value) {
      case 'QueueTicket':
        this.printTicket();
        break;
      case 'Coupon':
        this.printCoupon();
        break;
      case 'Label':
        this.printLabel();
        break;
      default:
        this.launchDialog({ title: 'Error', message: 'Invalid option' });
    }
  }

  getUrl = (): string => {
    const { ipAddress, deviceId, timeout } = this.localStore.getCurrentSetting();
    return 'http://' + ipAddress + '/cgi-bin/epos/service.cgi?devid=' + deviceId + '&timeout=' + timeout;
  }

  printCommand = (isCanvas?: boolean) => {
    // create print object
    const url = this.getUrl();
    const epos = isCanvas ? new epson.CanvasPrint(url) : new epson.ePOSPrint(url);
    this.activePos = epos;
    // register callback function
    epos.onreceive = this.onReceive.bind(this);

    // register callback function
    epos.onerror = this.onError.bind(this);

    return epos;
  }

  launchDialog(data: DialogDataModel) {
    this.dialog.open(DialogComponent, {
      width: '480px',
      data
    });
  }

  closeDialog() {
    this.dialog.closeAll();
  }

  onStart() {
    this.launchDialog({ title: 'Information', message: 'Printing ...' });
  }

  onReceive(res) {
    this.closeDialog();
    console.log(res);
    if (!res.success) {
      this.launchDialog({ title: 'Error', message: 'Print error occured. ' + this.getStatusText(this.activePos, res.status) });
    }
  }

  onError(err) {
    this.closeDialog();
    console.log(err);
    this.launchDialog({ title: 'Error', message: 'Network error occured.' });
  }

  canvasDrawImage = (context: CanvasRenderingContext2D, measure: CanvasMeasureModel, image: string) => {
    const img = new Image();
    img.src = image;
    img.onload = () => {
      const { dx, dy, dh, dw } = measure;
      if (dw && dh) {
        context.drawImage(img, dx, dy, dw, dh);
      } else {
        context.drawImage(img, dx, dy);
      }
    };
  }

  canvasInitialize = (image: string, measure: CanvasMeasureModel, hasClear?: boolean) => {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const context = canvas.getContext('2d');
    if (hasClear) {
      context.clearRect(0, 0, 512, 480);
    }
    this.canvasDrawImage(context, measure, image);
    return { canvas, context };
  }

  printTicket() {
    //
    // build print data
    //

    // create print data builder object
    const builder = new epson.ePOSBuilder();
    const setting = this.localStore.getCurrentSetting();
    // paper layout
    if (setting.layout) {
      builder.addLayout(builder.LAYOUT_RECEIPT, 580);
    }

    // get current date
    const now = new Date();

    // ticket number
    const num = ('0000' + this.sequence).slice(-4);

    // initialize (ank mode, smoothing)
    builder.addTextLang('en').addTextSmooth(true);

    // draw image (for raster image)
    const { context } = this.canvasInitialize('./assets/img/logo.bmp', { dx: 0, dy: 0, dw: 200, dh: 70 });

    // append raster image
    builder.addTextAlign(builder.ALIGN_CENTER);
    builder.addImage(context, 0, 0, 200, 70);
    builder.addFeedLine(1);

    // append ticket number
    builder.addTextAlign(builder.ALIGN_LEFT);
    builder.addTextDouble(true, false).addText('Your Number:');
    builder.addTextDouble(false, false).addText('');
    builder.addFeedUnit(16);
    builder.addTextAlign(builder.ALIGN_CENTER);
    builder.addTextSize(6, 4).addText(num);
    builder.addTextSize(1, 1).addText('');
    builder.addFeedUnit(16);

    // append message
    builder.addTextStyle(false, false, true);
    builder.addText('Please wait until your ticket');
    builder.addText('number is called.');
    builder.addTextStyle(false, false, false);
    builder.addFeedUnit(16);

    // append date and time
    builder.addText(now.toDateString() + ' ' + now.toTimeString().slice(0, 8) + '');
    builder.addFeedUnit(16);

    // append barcode
    builder.addBarcode(num, builder.BARCODE_CODE39, builder.HRI_BELOW, builder.FONT_A, 2, 48);
    builder.addFeedLine(1);

    // append paper cutting
    builder.addCut();

    //
    // send print data
    //
    const epos = this.printCommand();
    epos.send(builder.toString());

    // set next ticket number
    this.sequence = this.sequence % 9999 + 1;
  }

  // print coupon
  printCoupon() {

    //
    // draw print data
    //

    // get context of canvas
    const { canvas, context } = this.canvasInitialize('./assets/img/coffee.jpg', { dx: 0, dy: 0, dw: 512, dh: 384 }, true);

    // get current date
    const now = new Date();

    // draw background image
    context.fillStyle = 'rgba(255, 255, 255, 0.5)';
    context.fillRect(0, 0, 512, 480);
    context.fillStyle = 'rgba(0, 0, 0, 1.0)';

    // draw water mark
    this.canvasDrawImage(context, { dx: 0, dy: 0 }, './assets/img/wmark.png');
    this.canvasDrawImage(context, { dx: 256, dy: 324 }, './assets/img/wmark.png');

    // draw serial number
    context.textAlign = 'end';
    context.textBaseline = 'top';
    context.font = 'normal normal normal 24px "Arial", sans-serif';
    context.fillText('No. ' + ('000000' + this.serial).slice(-6), 512, 0);

    // draw message with rotation
    context.translate(96, 112);
    context.rotate(-Math.PI / 12);
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.font = 'italic normal normal 48px "Times New Roman", serif';
    context.fillText('Enjoy!', 0, 0);
    context.rotate(Math.PI / 12);
    context.translate(-96, -112);

    // draw title
    context.textAlign = 'center';
    context.textBaseline = 'alphabetic';
    context.font = 'normal normal bold 72px "Arial", sans-serif';
    context.fillText('FREE Coffee', 256, 224);
    context.font = 'normal normal bold 36px "Times New Roman", serif';
    context.fillText('Expires ' + now.toDateString(), 256, 288);

    // draw time
    context.textAlign = 'start';
    context.textBaseline = 'bottom';
    context.font = 'normal normal normal 24px "Arial", sans-serif';
    context.fillText(now.toTimeString().slice(0, 8), 0, 384);

    const { grayscale, layout } = this.localStore.getCurrentSetting();
    // draw barcode
    if (!grayscale) {
      drawEan13(context, '201234567890', 139, 400, 2, 80);
    }

    //
    // print
    //

    // create print object
    const epos = this.printCommand(true);

    // paper layout
    if (layout) {
      epos.paper = epos.PAPER_RECEIPT;
      epos.layout = { width: 580 };
    }

    // print
    if (grayscale) {
      epos.mode = epos.MODE_GRAY16;
    } else {
      epos.mode = epos.MODE_MONO;
      epos.halftone = epos.HALFTONE_ERROR_DIFFUSION;
    }
    epos.cut = true;
    epos.print(canvas);

    // set next serial number
    this.serial = this.serial % 999999 + 1;
  }

  //
  // print label
  //
  printLabel() {
    //
    // build print data
    //

    // color list
    const color = ['Gold', 'Red', 'Yellow', 'Green', 'Blue', 'Purple', 'Brown', 'Black', 'White', 'Sliver'];

    // create print data builder object
    const builder = new epson.ePOSBuilder();
    const { layout } = this.localStore.getCurrentSetting();
    // paper layout
    if (layout) {
      builder.addLayout(builder.LAYOUT_LABEL, 580, 0, 15, -15, 25, 0);
    }

    // initialize (alphanumeic mode, smoothing)
    builder.addTextLang('en');
    builder.addTextSmooth(1);

    // paper control
    builder.addFeedPosition(builder.FEED_CURRENT_TOF);

    // paper control for first print
    if (layout) {
      builder.addFeedPosition(builder.FEED_NEXT_TOF);
    }

    // start page mode
    builder.addPageBegin();

    // format
    builder.addPageArea(0, 0, 384, 160);

    // format - title
    builder.addPagePosition(0, 21);
    builder.addText('Name');
    builder.addPagePosition(0, 71);
    builder.addText('Color');
    builder.addPagePosition(0, 121);
    builder.addText('Code');

    // format - line
    builder.addTextStyle(0, 1, 0);
    builder.addPagePosition(0, 42);
    builder.addText('                                ');
    builder.addPagePosition(0, 92);
    builder.addText('                                ');
    builder.addTextStyle(0, 0, 0);

    // name
    builder.addPageArea(100, 0, 284, 50);
    builder.addPagePosition(0, 42);
    builder.addTextDouble(0, 1);
    builder.addText('Item A');

    // color
    builder.addPageArea(100, 50, 284, 50);
    builder.addPagePosition(0, 33);
    builder.addTextDouble(0, 0);
    builder.addText(color[this.code % 10]);

    // barcode
    builder.addPageArea(100, 100, 284, 60);
    builder.addPagePosition(0, 35);
    builder.addBarcode(this.code, builder.BARCODE_CODE39, builder.HRI_BELOW, builder.FONT_A, 2, 36);

    // end page mode
    builder.addPageEnd();

    // paper control
    builder.addFeedPosition(builder.FEED_PEELING);

    // add cut to the receipt
    builder.addCut();

    //
    // send print data
    //

    // create print object
    const epos = this.printCommand();

    // send
    epos.send(builder.toString());

    // set next item code
    this.code++;
  }

  // get status text
  getStatusText(e, status) {
    if (!e) {
      return '';
    }
    let s = 'Status: ';
    /* tslint:disable:no-bitwise */
    if (status & e.ASB_NO_RESPONSE) {
      s += ' No printer response';
    }
    if (status & e.ASB_PRINT_SUCCESS) {
      s += ' Print complete';
    }
    if (status & e.ASB_DRAWER_KICK) {
      s += ' Status of the drawer kick number 3 connector pin = "H"';
    }
    if (status & e.ASB_BATTERY_OFFLINE) {
      s += ' Offline due to a weak battery (only for supported models)';
    }
    if (status & e.ASB_OFF_LINE) {
      s += ' Offline status';
    }
    if (status & e.ASB_COVER_OPEN) {
      s += ' Cover is open';
    }
    if (status & e.ASB_PAPER_FEED) {
      s += ' Paper feed switch is feeding paper';
    }
    if (status & e.ASB_WAIT_ON_LINE) {
      s += ' Waiting for online recovery';
    }
    if (status & e.ASB_PANEL_SWITCH) {
      s += ' Panel switch is ON';
    }
    if (status & e.ASB_MECHANICAL_ERR) {
      s += ' Mechanical error generated';
    }
    if (status & e.ASB_AUTOCUTTER_ERR) {
      s += ' Auto cutter error generated';
    }
    if (status & e.ASB_UNRECOVER_ERR) {
      s += ' Unrecoverable error generated';
    }
    if (status & e.ASB_AUTORECOVER_ERR) {
      s += ' Auto recovery error generated';
    }
    if (status & e.ASB_RECEIPT_NEAR_END) {
      s += ' No paper in the roll paper near end detector';
    }
    if (status & e.ASB_RECEIPT_END) {
      s += ' No paper in the roll paper end detector';
    }
    if (status & e.ASB_BUZZER) {
      s += ' Sounding the buzzer (only for supported models)';
    }
    if (status & e.ASB_WAIT_REMOVE_LABEL) {
      s += ' Waiting to remove label (only for supported models)';
    }
    if (status & e.ASB_NO_LABEL) {
      s += ' No paper in the label peeling detector (only for supported models)';
    }
    if (status & e.ASB_SPOOLER_IS_STOPPED) {
      s += ' Stop the spooler';
    }
    /* tslint:enable:no-bitwise */
    return s;
  }
}
