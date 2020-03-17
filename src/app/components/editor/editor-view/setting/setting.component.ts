import { Component, OnInit } from '@angular/core';
import { SETTING_CONST } from './setting.const';
import { SettingClass } from './setting.model';

@Component({
  selector: 'epson-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  settingForm = new SettingClass();
  printers = SETTING_CONST;

  constructor() { }

  ngOnInit(): void {
  }

}
