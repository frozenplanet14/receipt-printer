export interface Ank {
  font_a: number;
  font_b: number;
  font_c: number;
  font_d: number;
  font_e: number;
  special_a: number;
  special_b: number;
}

export interface Kanji {
  font_a: number;
  font_b: number;
  font_c: number;
  font_d: number;
  font_e: number;
  special_a: number;
  special_b: number;
}

export interface Page {
  ini_w: number;
  ini_h: number;
  max_w: number;
  max_h: number;
}

export interface ModelInfoModel {
  width: number;
  linespc: number;
  ank: Ank;
  kanji: Kanji;
  page: Page;
}
