import { LabelValueModel } from 'src/app/components/print-canvas/canvas-setting-form/canvas-setting.model';
import { FORM_TYPE_CONST } from './form-type.const';

export const PAPER_CUT_TYPE: LabelValueModel[] = [
  { label: 'No Feed', value: 'CUT_NO_FEED' },
  { label: 'Feed', value: 'CUT_FEED', isDefault: true },
  { label: 'Reserve', value: 'CUT_RESERVE' }
];

export const PAPER_CUT_FORM_ITEM = {
  img: 'cut.png',
  name: 'Cut',
  alt_text: 'cut',
  hasDelete: true,
  form: [{
    id: 'attr-cut-type',
    type: FORM_TYPE_CONST.FORM_TYPE_SELECT,
    label: 'Type',
    options: PAPER_CUT_TYPE
  }]
};

export const CONNECTOR_CONST: LabelValueModel[] = [
  { label: 'Pin 2', value: 'DRAWER_1', isDefault: true },
  { label: 'Pin 5', value: 'DRAWER_2' },
];

export const PULSE_CONST: LabelValueModel[] = [
  { label: '100 ms', value: 'PULSE_100', isDefault: true },
  { label: '200 ms', value: 'PULSE_200' },
  { label: '300 ms', value: 'PULSE_300' },
  { label: '400 ms', value: 'PULSE_400' },
  { label: '500 ms', value: 'PULSE_500' },
];

export const CONNECTOR_FORM_ITEM = {
  img: 'pulse.png',
  name: 'Drawer',
  alt_text: 'pulse',
  hasDelete: true,
  form: [{
    id: 'attr-pulse-drawer',
    type: FORM_TYPE_CONST.FORM_TYPE_SELECT,
    label: 'Connector',
    options: CONNECTOR_CONST
  }, {
    id: 'attr-pulse-time',
    type: FORM_TYPE_CONST.FORM_TYPE_SELECT,
    label: 'ON Time',
    options: PULSE_CONST
  }]
};

export const PATTERN_CONST: LabelValueModel[] = [
  { label: 'None', value: 'PATTERN_NONE' },
  { label: 'Pattern 1 [v2.2-]', value: 'PATTERN_1' },
  { label: 'Pattern 2 [v2.2-]', value: 'PATTERN_2' },
  { label: 'Pattern 3 [v2.2-]', value: 'PATTERN_3' },
  { label: 'Pattern 4 [v2.2-]', value: 'PATTERN_4' },
  { label: 'Pattern 5 [v2.2-]', value: 'PATTERN_5' },
  { label: 'Pattern 6 [v2.2-]', value: 'PATTERN_6' },
  { label: 'Pattern 7 [v2.2-]', value: 'PATTERN_7' },
  { label: 'Pattern 8 [v2.2-]', value: 'PATTERN_8' },
  { label: 'Pattern 9 [v2.2-]', value: 'PATTERN_9' },
  { label: 'Pattern 10 [v2.2-]', value: 'PATTERN_10' },
  { label: 'Pattern A', value: 'PATTERN_A', isDefault: true },
  { label: 'Pattern B', value: 'PATTERN_B' },
  { label: 'Pattern C', value: 'PATTERN_C' },
  { label: 'Pattern D', value: 'PATTERN_D' },
  { label: 'Pattern E', value: 'PATTERN_E' },
  { label: 'Pattern For Error', value: 'PATTERN_ERROR' },
  { label: 'Pattern For Paper-end', value: 'PATTERN_PAPER_END' }
];

export const PATTERN_FORM_ITEM = {
  img: 'sound.png',
  name: 'Buzzer',
  alt_text: 'sound',
  hasDelete: true,
  hint: 'TM-T88V, TM-P60II, TM-P80, TM-P20',
  form: [{
    id: 'attr-sound-pattern',
    type: FORM_TYPE_CONST.FORM_TYPE_SELECT,
    label: 'Pattern',
    options: PATTERN_CONST
  }, {
    id: 'attr-sound-repeat',
    type: FORM_TYPE_CONST.FORM_TYPE_SLIDER,
    label: 'Repeat',
    value: 1,
    min: 0,
    max: 255,
    step: 1
  }, {
    id: 'attr-sound-cycle',
    type: FORM_TYPE_CONST.FORM_TYPE_SLIDER,
    label: 'Cycle (Pattern 1-10)',
    suffix: 'ms',
    value: 1000,
    min: 1000,
    max: 25500,
    step: 100
  }]
};

export const RECEIPT_LAYOUT_TYPE_CONST: LabelValueModel[] = [
  { label: 'Receipt', value: 'LAYOUT_RECEIPT', isDefault: true },
  { label: 'Receipt (Black Mark)', value: 'LAYOUT_RECEIPT_BM' },
  { label: 'Die Cut Label Paper', value: 'LAYOUT_LABEL' },
  { label: 'Die Cut Label Paper (Black Mark)', value: 'LAYOUT_LABEL_BM' }
];

export const LAYOUT_FORM_ITEM = {
  img: 'layout.png',
  name: 'Layout',
  alt_text: 'layout',
  hasDelete: true,
  hint: '[v2.2-] TM-P60II, TM-P80, TM-P20',
  form: [{
    id: 'attr-layout-type',
    type: FORM_TYPE_CONST.FORM_TYPE_SELECT,
    label: 'Paper Type',
    options: RECEIPT_LAYOUT_TYPE_CONST
  }, {
    id: 'attr-layout-width',
    type: FORM_TYPE_CONST.FORM_TYPE_SLIDER,
    label: 'Paper Width (Liner Width) (sf)',
    suffix: 'mm',
    value: 58.0,
    min: 29,
    max: 80,
    step: 0.1
  }, {
    // TODO: ADD RADIO BUTTON FOR AUTOMATIC VS MANUAL = attr-layout-height-auto
    id: 'attr-layout-height',
    type: FORM_TYPE_CONST.FORM_TYPE_SLIDER,
    label: 'Height (sa)',
    suffix: 'mm',
    value: 28.4,
    min: 28.4,
    max: 310,
    step: 0.1
  }, {
    id: 'attr-layout-margin-top',
    type: FORM_TYPE_CONST.FORM_TYPE_SLIDER,
    label: 'Top Margin (sb)',
    suffix: 'mm',
    value: 0.0,
    min: -15,
    max: 300,
    step: 0.1
  }, {
    id: 'attr-layout-margin-bottom',
    type: FORM_TYPE_CONST.FORM_TYPE_SLIDER,
    label: 'Bottom Margin (se)',
    suffix: 'mm',
    value: 0.0,
    min: -1.5,
    max: 1.5,
    step: 0.1
  }, {
    id: 'attr-layout-offset-cut',
    type: FORM_TYPE_CONST.FORM_TYPE_SLIDER,
    label: 'Offset to Cutting Position (sc)',
    suffix: 'mm',
    value: 0.0,
    min: -29,
    max: 5,
    step: 0.1
  }, {
    id: 'attr-layout-offset-label',
    type: FORM_TYPE_CONST.FORM_TYPE_SLIDER,
    label: 'Offset to Label Bottom Edge Position (sd)',
    suffix: 'mm',
    value: 0.0,
    min: 0,
    max: 1.5,
    step: 0.1
  }]
};

export const RECOVERY_FORM_ITEM = {
  img: 'recovery.png',
  name: 'Recovery',
  alt_text: 'recovery',
  hint: '[v3.0-]',
  hasDelete: true,
  form: []
};

export const RESET_FORM_ITEM = {
  img: 'reset.png',
  name: 'Reset',
  alt_text: 'reset',
  hint: '[v3.0-]',
  hasDelete: true,
  form: []
};

export const COMMAND_FORM_ITEM = {
  img: 'command.png',
  name: 'Cmd',
  alt_text: 'command',
  hasDelete: true,
  form: [
    {
      id: 'attr-command-data',
      type: FORM_TYPE_CONST.FORM_TYPE_INPUT,
      hint: `Hexadecimal: '\x00'-'\xff', Horizontal Tab(HT): '\t', Line Feed(LF): '\n', Carriage Return(CR): '\r', Back Slash: '\\'`,
      value: `\x1b*\x21\x01\x00\x55\x55\x55\n`
    }
  ]
};
