export interface LabelValueModel {
  label: string;
  value: string;
  isDefault?: boolean;
}

export const MODES: LabelValueModel[] = [
  {
    label: 'Monochrome',
    value: 'MODE_MONO',
    isDefault: true
  },
  {
    label: 'Grayscale (only for supported models)',
    value: 'MODE_GRAY16'
  }
];

export const HALFTONES: LabelValueModel[] = [
  {
    label: 'Dither',
    value: 'HALFTONE_DITHER',
    isDefault: true
  },
  {
    label: 'Error Diffusion',
    value: 'HALFTONE_ERROR_DIFFUSION'
  },
  {
    label: 'Threshold',
    value: 'HALFTONE_THRESHOLD'
  }
];

export const ALIGNS: LabelValueModel[] = [
  {
    label: 'Left',
    value: 'ALIGN_LEFT',
    isDefault: true
  },
  {
    label: 'Center',
    value: 'ALIGN_CENTER'
  },
  {
    label: 'Right',
    value: 'ALIGN_RIGHT'
  }
];

export const COLORS: LabelValueModel[] = [
  {
    label: 'None',
    value: 'COLOR_NONE'
  },
  {
    label: 'Color 1',
    value: 'COLOR_1',
    isDefault: true
  },
  {
    label: 'Color 2',
    value: 'COLOR_2'
  },
  {
    label: 'Color 3',
    value: 'COLOR_3'
  },
  {
    label: 'Color 4',
    value: 'COLOR_4'
  }
];

export class CanvasSettingClass {
  public address: string;
  public mode: string;
  public brightness: string;
  public halftone: string;
  public align: string;
  public color: string;
  public cut: boolean;

  constructor(
    address?: string,
    mode?: string,
    brightness?: string,
    halftone?: string,
    align?: string,
    color?: string,
    cut?: boolean
  ) {
    const getDefault = (arr: LabelValueModel[]) => arr.find(x => x.isDefault);
    this.address = address || '';
    this.mode = mode || getDefault(MODES).value;
    this.brightness = brightness || '1.0';
    this.halftone = halftone || getDefault(HALFTONES).value;
    this.align = align || getDefault(ALIGNS).value;
    this.color = color || getDefault(COLORS).value;
    this.cut = typeof cut === 'boolean' ? cut : true;
  }
}
