import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'epson-xml',
  templateUrl: './xml.component.html',
  styleUrls: ['./xml.component.scss']
})
export class XmlComponent implements OnInit {
  doc: string;
  constructor() { }

  ngOnInit(): void {
  }

}
