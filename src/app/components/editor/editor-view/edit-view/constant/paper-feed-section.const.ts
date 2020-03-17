import { FORM_TYPE_SLIDER, FORM_TYPE_SELECT } from './form-type.const';
import { LabelValueModel } from 'src/app/components/print-canvas/canvas-setting-form/canvas-setting.model';

export const FEED_UNIT_FORM_ITEM = {
  img: 'feed-unit.png',
  name: 'By Unit',
  alt_text: 'feed-unit',
  hasDelete: true,
  form: [{
    type: FORM_TYPE_SLIDER,
    label: 'Units',
    suffix: 'dots',
    value: 30
  }]
};

export const FEED_LINE_FORM_ITEM = {
  img: 'feed-line.png',
  name: 'By Line',
  alt_text: 'feed-line',
  hasDelete: true,
  form: [{
    type: FORM_TYPE_SLIDER,
    label: 'Lines',
    suffix: 'lines',
    value: 3
  }]
};

export const FEED_FORM_ITEM = {
  img: 'feed.png',
  name: 'LF',
  alt_text: 'feed',
  hasDelete: true,
  form: []
};

export const FEED_POS_CONST: LabelValueModel[] = [
  { label: 'FEED_PEELING', value: 'Peeling' },
  { label: 'FEED_CUTTING', value: 'Cutting' },
  { label: 'FEED_CURRENT_TOF', value: 'Current TOF', isDefault: true },
  { label: 'FEED_NEXT_TOF', value: 'Next TOF' },
];

export const FEED_POS_FORM_ITEM = {
  img: 'feed-pos.png',
  name: 'Label',
  alt_text: 'feed-pos',
  hint: '[v2.1-] TM-L90, TM-P60II, TM-P80, TM-P20',
  hasDelete: true,
  form: [{
    type: FORM_TYPE_SELECT,
    label: 'Position',
    options: FEED_POS_CONST
  }]
};
