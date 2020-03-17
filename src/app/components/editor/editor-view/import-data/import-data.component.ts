import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../../services/document.service';

@Component({
  selector: 'epson-import-data',
  templateUrl: './import-data.component.html',
  styleUrls: ['./import-data.component.scss']
})
export class ImportDataComponent implements OnInit {
  doc: string;
  info: string;

  constructor(private documentService: DocumentService) { }

  ngOnInit(): void {
  }

  onImport() {
    if (this.doc) {
      this.documentService.parseXML(this.doc).then(x => console.log(x));
    }
  }

}
