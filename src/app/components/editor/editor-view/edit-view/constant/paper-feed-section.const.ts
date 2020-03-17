import { LabelValueModel } from 'src/app/components/print-canvas/canvas-setting-form/canvas-setting.model';
import { FORM_TYPE_CONST } from './form-type.const';

export const FEED_UNIT_FORM_ITEM = {
  img: 'feed-unit.png',
  name: 'By Unit',
  alt_text: 'feed-unit',
  hasDelete: true,
  form: [{
    id: 'attr-feed-unit',
    type: FORM_TYPE_CONST.FORM_TYPE_SLIDER,
    label: 'Units',
    suffix: 'dots',
    value: 30,
    min: 0,
    max: 255,
    step: 1
  }]
};

export const FEED_LINE_FORM_ITEM = {
  img: 'feed-line.png',
  name: 'By Line',
  alt_text: 'feed-line',
  hasDelete: true,
  form: [{
    id: 'attr-feed-line',
    type: FORM_TYPE_CONST.FORM_TYPE_SLIDER,
    label: 'Lines',
    suffix: 'lines',
    value: 3,
    min: 0,
    max: 255,
    step: 1
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
    id: 'attr-feed-pos',
    type: FORM_TYPE_CONST.FORM_TYPE_SELECT,
    label: 'Position',
    options: FEED_POS_CONST
  }]
};
