export interface DirectionModel {
  x: number;
  y: number;
  r: number;
  w: boolean;
}

export interface DirConvertModel {
  left_to_right: DirectionModel;
  top_to_bottom: DirectionModel;
  right_to_left: DirectionModel;
  bottom_to_top: DirectionModel;
}
