export class CanvasLabelFormClass {
  name: string;
  desc: string;
  code: string;
  price: string;

  constructor(
    name?: string,
    desc?: string,
    code?: string,
    price?: string
  ) {
    this.name = name || 'Name';
    this.desc = desc || 'Description';
    this.code = code || '201234567890';
    this.price = price || '€19.80';
  }
}
