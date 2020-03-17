import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../../services/document.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'epson-xml',
  templateUrl: './xml.component.html',
  styleUrls: ['./xml.component.scss']
})
export class XmlComponent implements OnInit {
  doc: Observable<string>;

  constructor(private docService: DocumentService) { }

  ngOnInit(): void {
    this.doc = this.docService.xml;
  }

}
