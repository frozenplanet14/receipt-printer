import { LabelValueModel, getDefault } from '../canvas-setting-form/canvas-setting.model';

export const TEXTALIGN: LabelValueModel[] = [
  {
    label: 'start',
    value: 'start',
    isDefault: true
  },
  {
    label: 'end',
    value: 'end'
  },
  {
    label: 'left',
    value: 'left'
  },
  {
    label: 'right',
    value: 'right'
  },
  {
    label: 'center',
    value: 'center'
  }
];

export const TEXTBASE: LabelValueModel[] = [
  {
    label: 'top',
    value: 'top'
  },
  {
    label: 'hanging',
    value: 'hanging'
  },
  {
    label: 'middle',
    value: 'middle'
  },
  {
    label: 'alphabetic',
    value: 'alphabetic',
    isDefault: true
  },
  {
    label: 'ideographic',
    value: 'ideographic'
  },
  {
    label: 'bottom',
    value: 'bottom'
  }
];

export class CanvasTextFormClass {
  x: string;
  y: string;
  text: string;
  bold: boolean;
  italic: boolean;
  caps: boolean;
  size: string;
  line: string;
  font: string;
  textalign: string;
  textbase: string;

  constructor(
    x?: string, y?: string, text?: string, bold?: boolean, italic?: boolean, caps?: boolean,
    size?: string, line?: string, font?: string, textalign?: string, textbase?: string) {
    // Position
    this.x = x || '0';
    this.y = y || '24';
    // text
    this.text = text || 'Hello, World!';
    // Style
    this.bold = typeof bold === 'boolean' ? bold : false;
    this.italic = typeof italic === 'boolean' ? italic : false;
    this.caps = typeof caps === 'boolean' ? caps : false;
    // font-size
    this.size = size || '24';
    // line-height
    this.line = line || '30';
    // font-family
    this.font = font || '\'Arial\', sans-serif';
    // text-align
    this.textalign = textalign || getDefault(TEXTALIGN).value;
    // text-baseline
    this.textbase = textbase || getDefault(TEXTBASE).value;
  }
}
