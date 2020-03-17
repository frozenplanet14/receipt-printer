import { ModelInfoModel } from '../epos-print-editor.model';
import { DirectionModel } from '../../model/dir-convert.model';

export interface PreviewModel {
  model: ModelInfoModel;
  align: string;
  linespc: number;
  rotate: boolean;
  line_x: number;
  line_y: number;
  line_w: number;
  line_h: number;
  text_l: string;
  text_f: string;
  text_s: boolean;
  text_w: number;
  text_h: number;
  text_r: boolean;
  text_u: boolean;
  text_e: boolean;
  text_c: string;
  font_a: number;
  font_k: number;
  hline: any[];
  vline: any[];
  page: boolean;
  page_linespc: number;
  page_h: number;
  area_x: number;
  area_y: number;
  area_w: number;
  area_h: number;
  area_valid: boolean;
  page_dir: DirectionModel;
  page_x: number;
  page_y: number;
}
