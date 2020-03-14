import { PAPER_WIDTH } from '../models/paper-width.enum';
import { PrinterConfigModel } from '../models/Printer-config.model';

export const DEFAULT_PRINTER_SETTING: PrinterConfigModel = {
  ipAddress: '10.0.0.200',
  deviceId: 'local_printer',
  timeout: '60000',
  grayscale: false,
  layout: false
};
