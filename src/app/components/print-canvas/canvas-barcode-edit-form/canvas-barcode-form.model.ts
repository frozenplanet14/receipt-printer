export class CanvasBarcodeFormClass {
  x: string;
  y: string;
  w: string;
  h: string;
  data: string;

  constructor(
    x?: string,
    y?: string,
    w?: string,
    h?: string,
    data?: string) {
    this.x = x || '5';
    this.y = y || '175';
    this.w = w || '3';
    this.h = h || '162';
    this.data = data || '201234567890';
  }
}
