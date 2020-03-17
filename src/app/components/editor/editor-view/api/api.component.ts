import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'epson-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.scss']
})
export class ApiComponent implements OnInit {
  code: string;
  constructor() { }

  ngOnInit(): void {
  }

}
