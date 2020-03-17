import { DirConvertModel } from '../model/dir-convert.model';

export const DIR_CONVERT_CONST: DirConvertModel = {
  left_to_right: { x: 0, y: 0, r: 0, w: true },
  top_to_bottom: { x: 1, y: 0, r: Math.PI * 0.5000001, w: false },
  right_to_left: { x: 1, y: 1, r: Math.PI, w: true },
  bottom_to_top: { x: 0, y: 1, r: Math.PI * 1.5000001, w: false }
};
