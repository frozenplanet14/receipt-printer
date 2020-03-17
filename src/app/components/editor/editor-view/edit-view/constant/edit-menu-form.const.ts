import { ALIGNMENT_FORM_ITEM, LINE_SPEC_FORM_ITEM, ROTATE_FORM_ITEM } from './common-section.const';
import {
  LANGUAGE_FORM_ITEM,
  FONT_FORM_ITEM,
  HORIZONTAL_POSITION_FORM_ITEM,
  VERTICAL_POSITION_FORM_ITEM,
  SMOOTHING_FORM_ITEM,
  SIZE_FORM_ITEM,
  DOUBLE_FORM_ITEM,
  STYLE_FORM_ITEM,
  TEXT_FORM_ITEM
} from './printer-font.const';
import { FEED_UNIT_FORM_ITEM, FEED_LINE_FORM_ITEM, FEED_FORM_ITEM, FEED_POS_FORM_ITEM } from './paper-feed-section.const';
import { IMAGE_FORM_ITEM, NV_LOGO_FORM_ITEM } from './image-section.const';
import { BARCODE_FORM_ITEM, SYMBOL_FORM_ITEM } from './bar-code-section.const';
import {
  PAGE_START_FORM_ITEM,
  AREA_FORM_ITEM,
  DIRECTION_FORM_ITEM,
  POSITION_FORM_ITEM,
  LINE_FORM_ITEM,
  RECT_FORM_ITEM,
  PAGE_END_FORM_ITEM
} from './page-mode-section.const';
import {
  PAPER_CUT_FORM_ITEM,
  CONNECTOR_FORM_ITEM,
  PATTERN_FORM_ITEM,
  LAYOUT_FORM_ITEM,
  RECOVERY_FORM_ITEM,
  RESET_FORM_ITEM,
  COMMAND_FORM_ITEM
} from './others-section.const';
import { EditMenuModel } from '../../../model/form-model';

export const EDIT_MENU_FORM: EditMenuModel[] = [
  {
    legend: 'Common',
    items: [
      [ALIGNMENT_FORM_ITEM, LINE_SPEC_FORM_ITEM, ROTATE_FORM_ITEM]
    ]
  },
  {
    legend: 'Text (Printer Font)',
    items: [
      [LANGUAGE_FORM_ITEM, FONT_FORM_ITEM, HORIZONTAL_POSITION_FORM_ITEM],
      [VERTICAL_POSITION_FORM_ITEM, SMOOTHING_FORM_ITEM, SIZE_FORM_ITEM],
      [DOUBLE_FORM_ITEM, STYLE_FORM_ITEM, TEXT_FORM_ITEM]
    ]
  },
  {
    legend: 'Paper Feed',
    items: [
      [FEED_UNIT_FORM_ITEM, FEED_LINE_FORM_ITEM, FEED_FORM_ITEM],
      [FEED_POS_FORM_ITEM]
    ]
  },
  {
    legend: 'Image',
    items: [
      [IMAGE_FORM_ITEM, NV_LOGO_FORM_ITEM]
    ]
  },
  {
    legend: 'Bar Code',
    items: [
      [BARCODE_FORM_ITEM, SYMBOL_FORM_ITEM]
    ]
  },
  {
    legend: 'Page Mode',
    items: [
      [PAGE_START_FORM_ITEM, AREA_FORM_ITEM, DIRECTION_FORM_ITEM],
      [POSITION_FORM_ITEM, LINE_FORM_ITEM, RECT_FORM_ITEM],
      [PAGE_END_FORM_ITEM]
    ]
  },
  {
    legend: 'Others',
    items: [
      [PAPER_CUT_FORM_ITEM, CONNECTOR_FORM_ITEM, PATTERN_FORM_ITEM],
      [LAYOUT_FORM_ITEM, RECOVERY_FORM_ITEM, RESET_FORM_ITEM],
      [COMMAND_FORM_ITEM]
    ]
  }
];
