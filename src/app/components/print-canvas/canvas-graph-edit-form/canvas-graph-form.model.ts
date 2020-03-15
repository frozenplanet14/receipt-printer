import { LabelValueModel, getDefault } from '../canvas-setting-form/canvas-setting.model';

export const FILL_STYLES: LabelValueModel[] = [
  {
    label: 'Stroke',
    value: '0'
  },
  {
    label: 'Fill',
    value: '1'
  },
  {
    label: 'Linear Gradient',
    value: '2',
    isDefault: true
  },
  {
    label: 'Radial Gradient',
    value: '3'
  }
];

export class CanvasGraphFormClass {
  public fill: string;
  public col1: string;
  public col2: string;
  public rectx: string;
  public recty: string;
  public rectw: string;
  public recth: string;
  public arcx: string;
  public arcy: string;
  public arcr: string;

  constructor(
    fill?: string,
    col1?: string,
    col2?: string,
    rectx?: string,
    recty?: string,
    rectw?: string,
    recth?: string,
    arcx?: string,
    arcy?: string,
    arcr?: string
  ) {
    this.fill = fill || getDefault(FILL_STYLES).value;
    this.col1 = col1 || 'gray';
    this.col2 = col2 || 'white';
    this.rectx = rectx || '32';
    this.recty = recty || '64';
    this.rectw = rectw || '192';
    this.recth = recth || '192';
    this.arcx = arcx || '224';
    this.arcy = arcy || '256';
    this.arcr = arcr || '96';
  }
}
