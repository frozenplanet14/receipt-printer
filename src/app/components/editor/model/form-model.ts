import { LabelValueModel } from '../../print-canvas/canvas-setting-form/canvas-setting.model';

export interface FormModel {
  id: string;
  type: string;
  label: string;
  value?: number | string | boolean;
  hint?: string;
  options?: LabelValueModel[];
  min?: number;
  max?: number;
  step?: number;
  suffix?: string;
  inline?: boolean;
}

export interface ItemModel {
  img: string;
  name: string;
  alt_text: string;
  hasDelete: boolean;
  form: FormModel[];
  hint?: string;
}

export interface EditMenuModel {
  legend: string;
  items: ItemModel[][];
}
