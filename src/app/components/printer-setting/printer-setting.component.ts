import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { JsonEditorOptions, JsonEditorComponent } from 'ang-jsoneditor';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'epson-printer-setting',
  templateUrl: './printer-setting.component.html',
  styleUrls: ['./printer-setting.component.scss']
})
export class PrinterSettingComponent implements OnInit, AfterViewInit {
  public editorOptions: JsonEditorOptions;
  @ViewChild(JsonEditorComponent, { static: true }) editor: JsonEditorComponent;

  get settingsInLocalStorage() {
    return !!this.localStorage.getConfigFromLocalStorage();
  }

  constructor(private localStorage: LocalStorageService) {
    this.editorOptions = new JsonEditorOptions();
    this.editorOptions.modes = ['code', 'text', 'tree', 'view']; // set all allowed modes
    // this.editorOptions.mode = 'code'; // set only one mode
  }

  ngAfterViewInit(): void {
    const configFromLocalStorage = this.localStorage.getCurrentSetting();
    this.editor.set(configFromLocalStorage as any);
  }

  ngOnInit(): void {

  }

  onEdit() {
    if (this.settingsInLocalStorage) {
      this.localStorage.removeFromLocalStorage();
    } else {
      this.localStorage.saveInLocalStorage(JSON.parse(JSON.stringify(this.editor.get())));
    }
  }

}
