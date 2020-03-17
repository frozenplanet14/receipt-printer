import { LabelValueModel } from 'src/app/components/print-canvas/canvas-setting-form/canvas-setting.model';
import { FORM_TYPE_CONST } from './form-type.const';

export const PAGE_START_FORM_ITEM = {
  img: 'page-begin.png',
  name: 'Start',
  alt_text: 'page-begin',
  hasDelete: true,
  form: []
};


export const AREA_FORM_ITEM = {
  img: 'area.png',
  name: 'Area',
  alt_text: 'area',
  hasDelete: true,
  form: [{
    id: 'attr-area-x',
    type: FORM_TYPE_CONST.FORM_TYPE_SLIDER,
    label: 'X Origin',
    suffix: 'dots',
    value: 0
  }, {
    id: 'attr-area-y',
    type: FORM_TYPE_CONST.FORM_TYPE_SLIDER,
    label: 'Y Origin',
    suffix: 'dots',
    value: 0,
    min: 1,
    max: 2399,
    step: 1
  }, {
    id: 'attr-area-width',
    type: FORM_TYPE_CONST.FORM_TYPE_SLIDER,
    label: 'Width',
    suffix: 'dots',
    value: 100,
    min: 1,
    max: 576,
    step: 1
  }, {
    id: 'attr-area-height',
    type: FORM_TYPE_CONST.FORM_TYPE_SLIDER,
    label: 'Height',
    suffix: 'dots',
    value: 100,
    min: 1,
    max: 2400,
    step: 1
  }]
};

export const DIRECTIONS: LabelValueModel[] = [
  { label: 'Left To Right', value: 'DIRECTION_LEFT_TO_RIGHT', isDefault: true },
  { label: 'Top To Bottom', value: 'DIRECTION_TOP_TO_BOTTOM' },
  { label: 'Right To Left', value: 'DIRECTION_RIGHT_TO_LEFT' },
  { label: 'Bottom To Top', value: 'DIRECTION_BOTTOM_TO_TOP' }
];

export const DIRECTION_FORM_ITEM = {
  img: 'direction.png',
  name: 'Direction',
  alt_text: 'direction',
  hasDelete: true,
  form: [{
    id: 'attr-direction-dir',
    type: FORM_TYPE_CONST.FORM_TYPE_SELECT,
    label: 'Direction',
    options: DIRECTIONS
  }]
};

export const POSITION_FORM_ITEM = {
  img: 'position.png',
  name: 'Position',
  alt_text: 'position',
  hasDelete: true,
  form: [{
    id: 'attr-position-x',
    type: FORM_TYPE_CONST.FORM_TYPE_SLIDER,
    label: 'X Position',
    suffix: 'dots',
    value: 0,
    min: 1,
    max: 2399,
    step: 1
  }, {
    id: 'attr-position-y',
    type: FORM_TYPE_CONST.FORM_TYPE_SLIDER,
    label: 'Y Position',
    suffix: 'dots',
    value: 21,
    min: 1,
    max: 2399,
    step: 1
  }]
};

export const STYLE_CONST: LabelValueModel[] = [
  { label: 'Single: Thin', value: 'LINE_THIN' },
  { label: 'Single: Medium', value: 'LINE_MEDIUM' },
  { label: 'Single: Thick', value: 'LINE_THICK' },
  { label: 'Double: Thin', value: 'LINE_THIN_DOUBLE' },
  { label: 'Double: Medium', value: 'LINE_MEDIUM_DOUBLE' },
  { label: 'Double: Thick', value: 'LINE_THICK_DOUBLE' },
];

export const LINE_FORM_ITEM = {
  img: 'line.png',
  name: 'Line',
  alt_text: 'line',
  hint: 'TM-P60II, TM-P80, TM-P20',
  hasDelete: true,
  form: [{
    id: 'attr-line-x1',
    type: FORM_TYPE_CONST.FORM_TYPE_SLIDER,
    label: 'X Start Position',
    suffix: 'dots',
    value: 0,
    min: 1,
    max: 2399,
    step: 1
  }, {
    id: 'attr-line-y1',
    type: FORM_TYPE_CONST.FORM_TYPE_SLIDER,
    label: 'Y Start Position',
    suffix: 'dots',
    value: 50,
    min: 1,
    max: 2399,
    step: 1
  }, {
    id: 'attr-line-x2',
    type: FORM_TYPE_CONST.FORM_TYPE_SLIDER,
    label: 'X End Position',
    suffix: 'dots',
    value: 99,
    min: 1,
    max: 2399,
    step: 1
  }, {
    id: 'attr-line-y2',
    type: FORM_TYPE_CONST.FORM_TYPE_SLIDER,
    label: 'Y End Position',
    suffix: 'dots',
    value: 50,
    min: 1,
    max: 2399,
    step: 1
  }, {
    id: 'attr-line-style',
    type: FORM_TYPE_CONST.FORM_TYPE_SELECT,
    label: 'Style',
    options: STYLE_CONST
  }]
};

export const RECT_FORM_ITEM = {
  img: 'rectangle.png',
  name: 'Rect',
  alt_text: 'rectangle',
  hint: 'TM-P60II, TM-P80, TM-P20',
  hasDelete: true,
  form: [{
    id: 'attr-rectangle-x1',
    type: FORM_TYPE_CONST.FORM_TYPE_SLIDER,
    label: 'X Start Position',
    suffix: 'dots',
    value: 0,
    min: 1,
    max: 2399,
    step: 1
  }, {
    id: 'attr-rectangle-y1',
    type: FORM_TYPE_CONST.FORM_TYPE_SLIDER,
    label: 'Y Start Position',
    suffix: 'dots',
    value: 0,
    min: 1,
    max: 2399,
    step: 1
  }, {
    id: 'attr-rectangle-x2',
    type: FORM_TYPE_CONST.FORM_TYPE_SLIDER,
    label: 'X End Position',
    suffix: 'dots',
    value: 99,
    min: 1,
    max: 2399,
    step: 1
  }, {
    id: 'attr-rectangle-y2',
    type: FORM_TYPE_CONST.FORM_TYPE_SLIDER,
    label: 'Y End Position',
    suffix: 'dots',
    value: 99,
    min: 1,
    max: 2399,
    step: 1
  }, {
    id: 'attr-rectangle-style',
    type: FORM_TYPE_CONST.FORM_TYPE_SELECT,
    label: 'Style',
    options: STYLE_CONST
  }]
};

export const PAGE_END_FORM_ITEM = {
  img: 'page-end.png',
  name: 'End',
  alt_text: 'page-end',
  hasDelete: true,
  form: []
};
