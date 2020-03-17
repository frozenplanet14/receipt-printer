import { LabelValueModel, COLORS } from '../../../../print-canvas/canvas-setting-form/canvas-setting.model';
import { FORM_TYPE_SELECT, FORM_TYPE_SLIDER, FORM_TYPE_CHECK_BOX, FORM_TYPE_INPUT } from './form-type.const';

export const LANGUAGES: LabelValueModel[] = [{
  label: 'Alphanumeric',
  value: 'en',
  isDefault: true
}, {
  label: 'Japanese',
  value: 'ja'
}, {
  label: 'Korean',
  value: 'ko'
}, {
  label: 'Simplified Chinese',
  value: 'zh-cn'
}, {
  label: 'Simplified Chinese [v2.2-]',
  value: 'zh-hans'
}, {
  label: 'Traditional Chinese',
  value: 'zh-tw'
}, {
  label: 'Traditional Chinese [v2.2-]',
  value: 'zh-hant'
}];

export const LANGUAGE_FORM_ITEM = {
  img: 'text-lang.png',
  name: 'Lang',
  alt_text: 'text-lang',
  hasDelete: true,
  form: [{
    type: FORM_TYPE_SELECT,
    label: 'Language',
    options: LANGUAGES
  }]
};

export const FONTS: LabelValueModel[] = [{
  label: 'Font A',
  value: 'FONT_A',
  isDefault: true
}, {
  label: 'Font B',
  value: 'FONT_B'
}, {
  label: 'Font C',
  value: 'FONT_C'
}, {
  label: 'Font D',
  value: 'FONT_D'
}, {
  label: 'Font E',
  value: 'FONT_E'
}, {
  label: 'Special Font A',
  value: 'FONT_SPECIAL_A'
}, {
  label: 'Special Font B',
  value: 'FONT_SPECIAL_B'
}];

export const FONT_FORM_ITEM = {
  img: 'text-font.png',
  name: 'Font',
  alt_text: 'text-font',
  hasDelete: true,
  form: [{
    type: FORM_TYPE_SELECT,
    label: 'Font',
    options: FONTS
  }]
};

export const HORIZONTAL_POSITION_FORM_ITEM = {
  img: 'text-position.png',
  name: 'Position',
  alt_text: 'text-position',
  hasDelete: true,
  form: [{
    type: FORM_TYPE_SLIDER,
    label: 'X Position',
    suffix: 'dots',
    value: 0
  }]
};

export const VERTICAL_POSITION_FORM_ITEM = {
  img: 'text-vposition.png',
  name: 'Position',
  alt_text: 'text-vposition',
  hint: '[v3.0-]',
  hasDelete: true,
  form: [{
    type: FORM_TYPE_SLIDER,
    label: 'Y Position',
    suffix: 'dots',
    value: 21
  }]
};

export const SMOOTHING_FORM_ITEM = {
  img: 'text-smooth.png',
  name: 'Smooth',
  alt_text: 'text-smooth',
  hasDelete: true,
  form: [{
    type: FORM_TYPE_CHECK_BOX,
    label: 'Smoothing',
    value: true
  }]
};

export const SIZE_FORM_ITEM = {
  img: 'text-size.png',
  name: 'Size',
  alt_text: 'text-size',
  hasDelete: true,
  form: [{
    type: FORM_TYPE_SLIDER,
    label: 'Width',
    value: 1
  }, {
    type: FORM_TYPE_SLIDER,
    label: 'Height',
    value: 1
  }]
};

export const DOUBLE_FORM_ITEM = {
  img: 'text-double.png',
  name: 'Double',
  alt_text: 'text-double',
  hasDelete: true,
  form: [{
    type: FORM_TYPE_CHECK_BOX,
    label: 'Double-width',
    value: true
  }, {
    type: FORM_TYPE_CHECK_BOX,
    label: 'Double-height',
    value: true
  }]
};

// export const COLORS: LabelValueModel[] = [{
//   label: 'None',
//   value: 'COLOR_NONE'
// }, {
//   label: 'Color 1',
//   value: 'COLOR_1'
// }, {
//   label: 'Color 2',
//   value: 'COLOR_2'
// }, {
//   label: 'Color 3',
//   value: 'COLOR_3'
// }, {
//   label: 'Color 4',
//   value: 'COLOR_4'
// }];

export const STYLE_FORM_ITEM = {
  img: 'text-style.png',
  name: 'Style',
  alt_text: 'text-style',
  hasDelete: true,
  form: [{
    type: FORM_TYPE_CHECK_BOX,
    label: 'White/Black Reverse',
    value: false,
    inline: true
  }, {
    type: FORM_TYPE_CHECK_BOX,
    label: 'Underline',
    value: false,
    inline: true
  }, {
    type: FORM_TYPE_CHECK_BOX,
    label: 'Emphasized',
    value: false
  }, {
    type: FORM_TYPE_SELECT,
    label: 'Color',
    options: COLORS
  }]
};

export const TEXT_FORM_ITEM = {
  img: 'text.png',
  name: 'Text',
  alt_text: 'text',
  hasDelete: true,
  form: [{
    type: FORM_TYPE_INPUT,
    value: 'Hello\\n',
    hint: `Horizontal Tab(HT): '\t', Line Feed(LF): '\n', Carriage Return(CR): '\r', Back Slash: '\\'`
  }]
};
