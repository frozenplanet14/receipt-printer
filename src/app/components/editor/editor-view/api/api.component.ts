import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../../services/document.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'epson-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.scss']
})
export class ApiComponent implements OnInit {
  code: Observable<string>;

  constructor(private docService: DocumentService) { }

  ngOnInit(): void {
    this.code = this.docService.api;
  }

}
