import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CanvasSettingClass, MODES, HALFTONES, ALIGNS, COLORS } from './canvas-setting.model';

@Component({
  selector: 'epson-canvas-setting-form',
  templateUrl: './canvas-setting-form.component.html',
  styleUrls: ['./canvas-setting-form.component.scss']
})
export class CanvasSettingFormComponent implements OnInit {
  @Input()
  set webApiUrl(value: string) {
    this.setting = new CanvasSettingClass(value);
  }
  @Output() executePrint = new EventEmitter<CanvasSettingClass>();
  setting: CanvasSettingClass;
  modes = MODES;
  halftones = HALFTONES;
  aligns = ALIGNS;
  colors = COLORS;

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.setting);
    this.executePrint.next(this.setting);
  }

}
