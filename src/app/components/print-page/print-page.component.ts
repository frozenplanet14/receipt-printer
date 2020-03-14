import { Component, OnInit } from '@angular/core';
import { PrintOptionModel, PrintOptionType, PrintOptionConst } from 'src/app/constants/print-option.const';
import { EpsonPrintingService } from '../../services/epson-printing.service';

@Component({
  selector: 'epson-print-page',
  templateUrl: './print-page.component.html',
  styleUrls: ['./print-page.component.scss']
})
export class PrintPageComponent implements OnInit {
  printOptions: PrintOptionModel[];

  constructor(private printService: EpsonPrintingService) { }

  ngOnInit(): void {
    this.printOptions = PrintOptionConst;
  }

  execiutePrint(value: PrintOptionType) {
    this.printService.execiutePrint(value);
  }

}
