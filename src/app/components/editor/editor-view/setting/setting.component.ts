import { Component, OnInit } from '@angular/core';
import { SETTING_CONST } from './setting.const';
import { SettingClass } from './setting.model';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'epson-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  settingForm: SettingClass;
  printers = SETTING_CONST;

  constructor(private localStorage: LocalStorageService) { }

  ngOnInit(): void {
    const { jobid, model, status } = this.localStorage.getExtraSetting();
    this.settingForm = new SettingClass(model, status, jobid);
  }

  onChange() {
    this.localStorage.saveExtraInLocalStorage(this.settingForm);
  }

}
