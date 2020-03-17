import { MODEL_INFO_CONST } from '../epos-print-editor.const';
import { COLOR_CONVERT_CONST } from '../../const/color-convert.const';
import { DIR_CONVERT_CONST } from '../../const/dir-convert.const';
import { PreviewModel } from './preview.model';

export const PREVIEW_DEFAULT: PreviewModel = {
  model: MODEL_INFO_CONST.tm_t88_80,
  align: 'left',
  linespc: 30,
  rotate: false,
  line_x: 0,
  line_y: 191,
  line_w: 0,
  line_h: 0,
  text_l: 'en',
  text_f: 'font_a',
  text_s: false,
  text_w: 1,
  text_h: 1,
  text_r: false,
  text_u: false,
  text_e: false,
  text_c: COLOR_CONVERT_CONST.color_1,
  font_a: 24,
  font_k: 24,
  hline: [],
  vline: [],
  page: false,
  page_linespc: 30,
  page_h: 0,
  area_x: 0,
  area_y: 0,
  area_w: 512,
  area_h: 831,
  area_valid: false,
  page_dir: DIR_CONVERT_CONST.left_to_right,
  page_x: 0,
  page_y: 23
};
