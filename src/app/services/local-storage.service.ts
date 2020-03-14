import { Injectable } from '@angular/core';
import { PrinterConfigModel } from '../models/Printer-config.model';
import { DEFAULT_PRINTER_SETTING } from '../constants/default_setting.const';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  /**
   * Name of the settings stored locally to facilitate test harness.
   */
  readonly localStorageName = 'Epson-LocalSettings';

  constructor() { }

  getCurrentSetting(): PrinterConfigModel {
    return this.getConfigFromLocalStorage() || DEFAULT_PRINTER_SETTING;
  }

  /**
   * Saves configuration in a local browser's storage.
   * @param config PrinterConfigModel to save.
   */
  saveInLocalStorage(config: PrinterConfigModel) {
    if (!config) { return; } // nothing to store
    localStorage.setItem(this.localStorageName, JSON.stringify(config));
  }

  /**
   * Gets a configuration from local browser's storage.
   */
  getConfigFromLocalStorage(): PrinterConfigModel {
    const configFromLocalStorage = localStorage.getItem(this.localStorageName);
    if (!configFromLocalStorage) {
      return null;
    }
    return JSON.parse(configFromLocalStorage);
  }

  /**
   * Removes a configuration from local browser's storage.
   */
  removeFromLocalStorage() {
    if (!!!this.getConfigFromLocalStorage()) { return; }
    localStorage.removeItem(this.localStorageName);
  }
}
