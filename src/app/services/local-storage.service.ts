import { Injectable } from '@angular/core';
import { PrinterConfigModel } from '../models/Printer-config.model';
import { DEFAULT_PRINTER_SETTING } from '../constants/default_setting.const';
import { SettingClass } from '../components/editor/editor-view/setting/setting.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  /**
   * Name of the settings stored locally to facilitate test harness.
   */
  readonly localStorageName = 'Epson-LocalSettings';
  readonly extraSetting = 'Epson-ExtraSettings';

  constructor() { }

  getCurrentSetting(): PrinterConfigModel {
    return this.getConfigFromLocalStorage() || DEFAULT_PRINTER_SETTING;
  }

  /**
   * Saves configuration in a local browser's storage.
   * @param config PrinterConfigModel to save.
   */
  saveInLocalStorage(config: PrinterConfigModel) {
    this.setItem(this.localStorageName, config);
  }

  saveExtraInLocalStorage(config: SettingClass) {
    this.setItem(this.extraSetting, config);
  }

  /**
   * Gets a configuration from local browser's storage.
   */
  getConfigFromLocalStorage(): PrinterConfigModel {
    return this.getItem(this.localStorageName);
  }

  getExtraSetting(): SettingClass {
    return this.getItem(this.extraSetting) || {};
  }

  /**
   * Removes a configuration from local browser's storage.
   */
  removeFromLocalStorage() {
    if (!!!this.getConfigFromLocalStorage()) { return; }
    localStorage.removeItem(this.localStorageName);
  }

  getItem(key: string) {
    const configFromLocalStorage = localStorage.getItem(key);
    if (!configFromLocalStorage) {
      return null;
    }
    return JSON.parse(configFromLocalStorage);
  }

  setItem(key: string, value: any) {
    if (!value) { return; } // nothing to store
    localStorage.setItem(key, JSON.stringify(value));
  }
}
