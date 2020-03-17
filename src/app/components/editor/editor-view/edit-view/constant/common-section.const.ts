import { LabelValueModel } from '../../../../print-canvas/canvas-setting-form/canvas-setting.model';
import { FORM_TYPE_SELECT, FORM_TYPE_SLIDER, FORM_TYPE_CHECK_BOX } from './form-type.const';

export const ALIGNMENT: LabelValueModel[] = [{
  label: 'Left',
  value: 'ALIGN_LEFT',
  isDefault: true
}, {
  label: 'Center',
  value: 'ALIGN_CENTER',
  isDefault: true
}, {
  label: 'Right',
  value: 'ALIGN_RIGHT',
  isDefault: true
}
];
export const ALIGNMENT_FORM_ITEM = {
  img: 'text-align.png',
  name: 'Align',
  alt_text: 'text-align',
  hasDelete: true,
  form: [{
    type: FORM_TYPE_SELECT,
    label: 'Alignment',
    options: ALIGNMENT
  }]
};
export const LINE_SPEC_FORM_ITEM = {
  img: 'text-linespc.png',
  name: 'Linespc',
  alt_text: 'text-linespc',
  hasDelete: true,
  form: [{
    type: FORM_TYPE_SLIDER,
    label: 'Line Spacing',
    suffix: 'dots',
    value: 30
  }]
};
export const ROTATE_FORM_ITEM = {
  img: 'text-rotate.png',
  name: 'Rotate',
  alt_text: 'text-rotate',
  hasDelete: true,
  form: [{
    type: FORM_TYPE_CHECK_BOX,
    label: 'Upside-down',
    value: true
  }]
};
