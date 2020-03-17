import { LabelValueModel } from '../../../../print-canvas/canvas-setting-form/canvas-setting.model';
import { FONTS } from './printer-font.const';
import { FORM_TYPE_CONST } from './form-type.const';

export const BAR_CODE_TYPE_CONST: LabelValueModel[] = [
  { label: 'UPC-A', value: 'BARCODE_UPC_A' },
  { label: 'UPC-E', value: 'BARCODE_UPC_E' },
  { label: 'EAN13', value: 'BARCODE_EAN13' },
  { label: 'JAN13', value: 'BARCODE_JAN13' },
  { label: 'EAN8', value: 'BARCODE_EAN8' },
  { label: 'JAN8', value: 'BARCODE_JAN8' },
  { label: 'CODE39', value: 'BARCODE_CODE39', isDefault: true },
  { label: 'ITF', value: 'BARCODE_ITF' },
  { label: 'CODABAR', value: 'BARCODE_CODABAR' },
  { label: 'CODE93', value: 'BARCODE_CODE93' },
  { label: 'CODE128', value: 'BARCODE_CODE128' },
  { label: 'GS1-128', value: 'BARCODE_GS1_128' },
  { label: 'GS1 DataBar Omnidirectional', value: 'BARCODE_GS1_DATABAR_OMNIDIRECTIONAL' },
  { label: 'GS1 DataBar Truncated', value: 'BARCODE_GS1_DATABAR_TRUNCATED' },
  { label: 'GS1 DataBar Limited', value: 'BARCODE_GS1_DATABAR_LIMITED' },
  { label: 'GS1 Databar Expanded', value: 'BARCODE_GS1_DATABAR_EXPANDED' }
];

export const HRI_CONST: LabelValueModel[] = [
  { label: 'None', value: 'HRI_NONE', isDefault: true },
  { label: 'Above', value: 'HRI_ABOVE' },
  { label: 'Below', value: 'HRI_BELOW' },
  { label: 'Both', value: 'HRI_BOTH' },
];

export const BARCODE_FORM_ITEM = {
  img: 'barcode.png',
  name: 'Barcode',
  alt_text: 'barcode',
  hasDelete: true,
  form: [{
    id: 'attr-barcode-data',
    type: FORM_TYPE_CONST.FORM_TYPE_INPUT,
    label: 'Data',
    value: '12345'
  }, {
    id: 'attr-barcode-type',
    type: FORM_TYPE_CONST.FORM_TYPE_SELECT,
    label: 'Type',
    options: BAR_CODE_TYPE_CONST
  }, {
    id: 'attr-barcode-hri',
    type: FORM_TYPE_CONST.FORM_TYPE_SELECT,
    label: 'HRI',
    options: HRI_CONST
  }, {
    id: 'attr-barcode-font',
    type: FORM_TYPE_CONST.FORM_TYPE_SELECT,
    label: 'Font',
    options: FONTS
  }, {
    id: 'attr-barcode-width',
    type: FORM_TYPE_CONST.FORM_TYPE_SLIDER,
    label: 'Module Width',
    suffix: 'dots',
    value: 2,
    min: 2,
    max: 6,
    step: 1
  }, {
    id: 'attr-barcode-height',
    type: FORM_TYPE_CONST.FORM_TYPE_SLIDER,
    label: 'Module Height',
    suffix: 'dots',
    value: 32,
    min: 1,
    max: 255,
    step: 1
  }]
};

export const SYMBOL_TYPE_CONST: LabelValueModel[] = [
  { label: 'Standard PDF417', value: 'SYMBOL_PDF417_STANDARD', isDefault: true },
  { label: 'Truncated PDF417', value: 'SYMBOL_PDF417_TRUNCATED' },
  { label: 'QR Code Model 1', value: 'SYMBOL_QRCODE_MODEL_1' },
  { label: 'QR Code Model 2', value: 'SYMBOL_QRCODE_MODEL_2' },
  { label: 'Micro QR Code [v4.1-]', value: 'SYMBOL_QRCODE_MICRO' },
  { label: 'MaxiCode Mode 2', value: 'SYMBOL_MAXICODE_MODE_2' },
  { label: 'MaxiCode Mode 3', value: 'SYMBOL_MAXICODE_MODE_3' },
  { label: 'MaxiCode Mode 4', value: 'SYMBOL_MAXICODE_MODE_4' },
  { label: 'MaxiCode Mode 5', value: 'SYMBOL_MAXICODE_MODE_5' },
  { label: 'MaxiCode Mode 6', value: 'SYMBOL_MAXICODE_MODE_6' },
  { label: 'GS1 DataBar Stacked', value: 'SYMBOL_GS1_DATABAR_STACKED' },
  { label: 'GS1 DataBar Stacked Omnidirectional', value: 'SYMBOL_GS1_DATABAR_STACKED_OMNIDIRECTIONAL' },
  { label: 'GS1 DataBar Expanded Stacked', value: 'SYMBOL_GS1_DATABAR_EXPANDED_STACKED' },
  { label: 'Aztec Code Full-Range [v2.2-]', value: 'SYMBOL_AZTECCODE_FULLRANGE' },
  { label: 'Aztec Code Compact [v2.2-]', value: 'SYMBOL_AZTECCODE_COMPACT' },
  { label: 'DataMatrix Square [v2.2-]', value: 'SYMBOL_DATAMATRIX_SQUARE' },
  { label: 'DataMatrix Rectangle (Row=8) [v2.2-]', value: 'SYMBOL_DATAMATRIX_RECTANGLE_8' },
  { label: 'DataMatrix Rectangle (Row=12) [v2.2-]', value: 'SYMBOL_DATAMATRIX_RECTANGLE_12' },
  { label: 'DataMatrix Rectangle (Row=16) [v2.2-]', value: 'SYMBOL_DATAMATRIX_RECTANGLE_16' }
];

export const ERROR_CORRECTION_LEVEL_CONST: LabelValueModel[] = [
  { label: 'PDF417 Level 0', value: 'LEVEL_0' },
  { label: 'PDF417 Level 1', value: 'LEVEL_1' },
  { label: 'PDF417 Level 2', value: 'LEVEL_2' },
  { label: 'PDF417 Level 3', value: 'LEVEL_3' },
  { label: 'PDF417 Level 4', value: 'LEVEL_4' },
  { label: 'PDF417 Level 5', value: 'LEVEL_5' },
  { label: 'PDF417 Level 6', value: 'LEVEL_6' },
  { label: 'PDF417 Level 7', value: 'LEVEL_7' },
  { label: 'PDF417 Level 8', value: 'LEVEL_8' },
  { label: 'QR Code Level L', value: 'LEVEL_L' },
  { label: 'QR Code Level M', value: 'LEVEL_M' },
  { label: 'QR Code Level Q', value: 'LEVEL_Q' },
  { label: 'QR Code Level H', value: 'LEVEL_H' },
  { label: 'Default Level', value: 'LEVEL_DEFAULT', isDefault: true },
];

export const SYMBOL_FORM_ITEM = {
  img: 'symbol.png',
  name: 'Symbol',
  alt_text: 'symbol',
  hasDelete: true,
  form: [{
    id: 'attr-symbol-data',
    type: FORM_TYPE_CONST.FORM_TYPE_INPUT,
    label: 'Data',
    value: 'http://www.epson.com/',
    hint: `Hexadecimal: '\x00'-'\xff', Horizontal Tab(HT): '\t', Line Feed(LF): '\n', Carriage Return(CR): '\r', Back Slash: '\\'`
  }, {
    id: 'attr-symbol-type',
    type: FORM_TYPE_CONST.FORM_TYPE_SELECT,
    label: 'Type',
    options: SYMBOL_TYPE_CONST
  }, {
    id: 'attr-symbol-level-enum',
    type: FORM_TYPE_CONST.FORM_TYPE_SELECT,
    label: 'Error Correction Level',
    options: ERROR_CORRECTION_LEVEL_CONST
  }, {
    id: 'attr-symbol-level',
    type: FORM_TYPE_CONST.FORM_TYPE_SLIDER,
    label: 'Error Correction Level (Aztec Code)',
    value: 23,
    min: 5,
    max: 95,
    step: 1
  }, {
    id: 'attr-symbol-width',
    type: FORM_TYPE_CONST.FORM_TYPE_SLIDER,
    label: 'Module Width',
    suffix: 'dots',
    value: 3,
    min: 0,
    max: 16,
    step: 1
  }, {
    id: 'attr-symbol-height',
    type: FORM_TYPE_CONST.FORM_TYPE_SLIDER,
    label: 'Module Height (PDF417)',
    suffix: 'times',
    value: 0,
    min: 0,
    max: 8,
    step: 1
  }, {
    id: 'attr-symbol-size',
    type: FORM_TYPE_CONST.FORM_TYPE_SLIDER,
    label: 'Symbol Size (PDF417, GS1 DataBar)',
    suffix: 'columns, dots',
    value: 0,
    min: 0,
    max: 2400,
    step: 1
  }]
};
