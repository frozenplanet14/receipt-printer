import { Component, OnInit } from '@angular/core';
import { PrintClass } from './print.model';

@Component({
  selector: 'epson-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.scss']
})
export class PrintComponent implements OnInit {
  printForm = new PrintClass();
  constructor() { }

  ngOnInit(): void {
  }

}
