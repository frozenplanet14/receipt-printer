export class PrintClass {
  doc: string;
  info: string;

  constructor(
    doc?: string,
    info?: string
  ) {
    // tslint:disable-next-line: max-line-length
    this.doc = doc || '&lt;epos-print xmlns=&quot;http://www.epson-pos.com/schemas/2011/03/epos-print&quot;&gt;&lt;text lang=&quot;en&quot; smooth=&quot;true&quot;&gt;Hello&lt;/text&gt;&lt;feed /&gt;&lt;/epos-print&gt;';
    this.info = info || '';
  }
}
