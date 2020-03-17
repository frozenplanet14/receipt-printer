import { Injectable } from '@angular/core';
import xml2js from 'xml2js';
import { BehaviorSubject } from 'rxjs';
import { MESSAGE } from '../editor-view/epos-print-editor.const';
import { IMPORT_CONVERT } from '../const/import-convert.const';
import { escapeCode, decodeBase64, drawGray16, drawMono, decodeHex } from '../functions/escape-text.function';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  data: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor() { }

  parseXML(data) {
    return new Promise(resolve => {
      const parser = new xml2js.Parser(
        {
          trim: true,
          explicitArray: true
        });
      parser.parseString(data, (err, result) => {
        console.log(result);
        resolve(result);
      });
    });
  }

  /*! ePOS-Print Editor Version 1.6.0 Copyright (C) SEIKO EPSON CORPORATION 2012.
  All rights reserved.
  importDoc(l: any) {
    const h = [];
    let a = 1;
    let m = 1;
    let k = false;
    let j = false;
    let b = false;
    let g = 'COLOR_1';
    let f;
    try {
      if (l.find('epos-print').size() === 0) {
        throw new Error(MESSAGE.import_noelem);
      }
      // $('#edit-sequence li').remove();
      // $('#edit-force').removeAttr('checked');
      if (/^(1|true)$/.test(l.find('epos-print').attr('force'))) {
        // $('#edit-force').attr('checked', 'checked');
      }
      l.find('epos-print > page-end').remove();
      // l.find('epos-print > page').after($('<page-end/>'));
      f = l.find('epos-print > *, epos-print > page > *');
      f.foreach((r, o) => {
        let q = r;
        let u = []; // $('#edit-left ul');
        let w = false;
        let v;
        let s;
        let e;
        const n = {};
        let t;
        switch (o.tagName) {
          case 'text':
            if (q.is('[align]')) {
              v = u.find('.epos-text-align').clone();
              e = q.attr('align');
              s = IMPORT_CONVERT['align_' + e];
              if (s) {
                v.find('.attr-text-align').val(s);
              } else {
                h.push('<' + o.tagName + '>' + MESSAGE.import_inattr + 'align="' + e + '"');
                break;
              }
              // $('#edit-sequence').append(v);
              // extract(v);
            }
            if (q.is('[linespc]')) {
              v = u.find('.epos-text-linespc').clone();
              e = q.attr('linespc');
              s = e | 0;
              if (isNaN(s) || s < 0 || s > 255) {
                h.push('<' + o.tagName + '>' + MESSAGE.import_inattr + 'linespc="' + e + '"');
                break;
              }
              v.find('.attr-text-linespc').val(s);
              // $('#edit-sequence').append(v);
              // extract(v);
            }
            if (q.is('[rotate]')) {
              v = u.find('.epos-text-rotate').clone();
              e = q.attr('rotate');
              if (/^(1|true)$/.test(e)) {
                v.find('.attr-text-rotate').attr('checked', 'checked');
              } else {
                if (/^(0|false)$/.test(e)) {
                  v.find('.attr-text-rotate').removeAttr('checked');
                } else {
                  h.push('<' + o.tagName + '>' + MESSAGE.import_inattr + 'rotate="' + e + '"');
                  break;
                }
              }
              // $('#edit-sequence').append(v);
              // extract(v);
            }
            if (q.is('[lang]')) {
              v = u.find('.epos-text-lang').clone();
              s = IMPORT_CONVERT[('lang_' + q.attr('lang')).toLowerCase()];
              v.find('.attr-text-lang').val(s ? s : 'en');
              // $('#edit-sequence').append(v);
              // extract(v);
            }
            if (q.is('[font]')) {
              v = u.find('.epos-text-font').clone();
              e = q.attr('font');
              s = IMPORT_CONVERT['font_' + e];
              if (s) {
                v.find('.attr-text-font').val(s);
              } else {
                h.push('<' + o.tagName + '>' + MESSAGE.import_inattr + 'font="' + e + '"');
                break;
              }
              // $('#edit-sequence').append(v);
              // extract(v);
            }
            if (q.is('[x]')) {
              v = u.find('.epos-text-position').clone();
              e = q.attr('x');
              s = e | 0;
              if (isNaN(s) || s < 0 || s > 2399) {
                h.push('<' + o.tagName + '>' + MESSAGE.import_inattr + 'x="' + e + '"');
                break;
              }
              v.find('.attr-text-x').val(s);
              // $('#edit-sequence').append(v);
              // extract(v);
            }
            if (q.is('[y]')) {
              v = u.find('.epos-text-vposition').clone();
              e = q.attr('y');
              s = e | 0;
              if (isNaN(s) || s < 0 || s > 2399) {
                h.push('<' + o.tagName + '>' + MESSAGE.import_inattr + 'y="' + e + '"');
                break;
              }
              v.find('.attr-text-y').val(s);
              // $('#edit-sequence').append(v);
              // extract(v);
            }
            if (q.is('[smooth]')) {
              v = u.find('.epos-text-smooth').clone();
              e = q.attr('smooth');
              if (/^(1|true)$/.test(e)) {
                v.find('.attr-text-smooth').attr('checked', 'checked');
              } else {
                if (/^(0|false)$/.test(e)) {
                  v.find('.attr-text-smooth').removeAttr('checked');
                } else {
                  h.push('<' + o.tagName + '>' + MESSAGE.import_inattr + 'smooth="' + e + '"');
                  break;
                }
              }
              // $('#edit-sequence').append(v);
              // extract(v);
            }
            if (q.is('[dw], [dh]')) {
              v = u.find('.epos-text-double').clone();
              e = q.attr('dw');
              if (e) {
                if (/^(1|true)$/.test(e)) {
                  a = 2;
                } else {
                  if (/^(0|false)$/.test(e)) {
                    a = 1;
                  } else {
                    h.push('<' + o.tagName + '>' + MESSAGE.import_inattr + 'dw="' + e + '"');
                    break;
                  }
                }
              }
              e = q.attr('dh');
              if (e) {
                if (/^(1|true)$/.test(e)) {
                  m = 2;
                } else {
                  if (/^(0|false)$/.test(e)) {
                    m = 1;
                  } else {
                    h.push('<' + o.tagName + '>' + MESSAGE.import_inattr + 'dh="' + e + '"');
                    break;
                  }
                }
              }
              if (a === 2) {
                v.find('.attr-text-dw').attr('checked', 'checked');
              } else {
                v.find('.attr-text-dw').removeAttr('checked');
              }
              if (m === 2) {
                v.find('.attr-text-dh').attr('checked', 'checked');
              } else {
                v.find('.attr-text-dh').removeAttr('checked');
              }
              // $('#edit-sequence').append(v);
              // extract(v);
              w = a > 2 || m > 2;
            }
            if (w || q.is('[width], [height]')) {
              v = u.find('.epos-text-size').clone();
              e = q.attr('width');
              if (e) {
                s = e | 0;
                if (isNaN(s) || s < 1 || s > 8) {
                  h.push('<' + o.tagName + '>' + MESSAGE.import_inattr + 'width="' + e + '"');
                  break;
                }
                a = s;
              }
              e = q.attr('height');
              if (e) {
                s = e | 0;
                if (isNaN(s) || s < 1 || s > 8) {
                  h.push('<' + o.tagName + '>' + MESSAGE.import_inattr + 'height="' + e + '"');
                  break;
                }
                m = s;
              }
              v.find('.attr-text-width').val(a);
              v.find('.attr-text-height').val(m);
              // $('#edit-sequence').append(v);
              // extract(v);
              w = false;
            }
            if (q.is('[reverse], [ul], [em], [color]')) {
              v = u.find('.epos-text-style').clone();
              e = q.attr('reverse');
              if (e) {
                if (/^(1|true)$/.test(e)) {
                  k = true;
                } else {
                  if (/^(0|false)$/.test(e)) {
                    k = false;
                  } else {
                    h.push('<' + o.tagName + '>' + MESSAGE.import_inattr + 'reverse="' + e + '"');
                    break;
                  }
                }
              }
              e = q.attr('ul');
              if (e) {
                if (/^(1|true)$/.test(e)) {
                  j = true;
                } else {
                  if (/^(0|false)$/.test(e)) {
                    j = false;
                  } else {
                    h.push('<' + o.tagName + '>' + MESSAGE.import_inattr + 'ul="' + e + '"');
                    break;
                  }
                }
              }
              e = q.attr('em');
              if (e) {
                if (/^(1|true)$/.test(e)) {
                  b = true;
                } else {
                  if (/^(0|false)$/.test(e)) {
                    b = false;
                  } else {
                    h.push('<' + o.tagName + '>' + MESSAGE.import_inattr + 'em="' + e + '"');
                    break;
                  }
                }
              }
              e = q.attr('color');
              if (e) {
                s = IMPORT_CONVERT['color_' + e];
                if (s) {
                  g = s;
                } else {
                  h.push('<' + o.tagName + '>' + MESSAGE.import_inattr + 'color="' + e + '"');
                  break;
                }
              }
              if (k) {
                v.find('.attr-text-reverse').attr('checked', 'checked');
              } else {
                v.find('.attr-text-reverse').removeAttr('checked');
              }
              if (j) {
                v.find('.attr-text-ul').attr('checked', 'checked');
              } else {
                v.find('.attr-text-ul').removeAttr('checked');
              }
              if (b) {
                v.find('.attr-text-em').attr('checked', 'checked');
              } else {
                v.find('.attr-text-em').removeAttr('checked');
              }
              v.find('.attr-text-color').val(g);
              // $('#edit-sequence').append(v);
              // extract(v);
            }
            if (q.text().length > 0) {
              v = u.find('.epos-text').clone();
              v.find('.attr-text-data').val(escapeCode(q.text()));
              // $('#edit-sequence').append(v);
              // extract(v);
            }
            break;
          case 'feed':
            if (q.is('[linespc]')) {
              v = u.find('.epos-text-linespc').clone();
              e = q.attr('linespc');
              s = e | 0;
              if (isNaN(s) || s < 0 || s > 255) {
                h.push('<' + o.tagName + '>' + MESSAGE.import_inattr + 'linespc="' + e + '"');
                break;
              }
              v.find('.attr-text-linespc').val(s);
              // $('#edit-sequence').append(v);
              // extract(v);
            }
            if (q.is('[unit]')) {
              v = u.find('.epos-feed-unit').clone();
              e = q.attr('unit');
              s = e | 0;
              if (isNaN(s) || s < 0 || s > 255) {
                h.push('<' + o.tagName + '>' + MESSAGE.import_inattr + 'unit="' + e + '"');
                break;
              }
              v.find('.attr-feed-unit').val(s);
              // $('#edit-sequence').append(v);
              // extract(v);
            }
            if (q.is('[line]')) {
              v = u.find('.epos-feed-line').clone();
              e = q.attr('line');
              s = e | 0;
              if (isNaN(s) || s < 0 || s > 255) {
                h.push('<' + o.tagName + '>' + MESSAGE.import_inattr + 'line="' + e + '"');
                break;
              }
              v.find('.attr-feed-line').val(s);
              // $('#edit-sequence').append(v);
              // extract(v);
            }
            if (q.is(':not([unit], [line], [pos])')) {
              v = u.find('.epos-feed').clone();
              // $('#edit-sequence').append(v);
              // extract(v);
            }
            if (q.is('[pos]')) {
              v = u.find('.epos-feed-pos').clone();
              e = q.attr('pos');
              s = IMPORT_CONVERT['feed_' + e];
              if (s) {
                v.find('.attr-feed-pos').val(s);
              } else {
                h.push('<' + o.tagName + '>' + MESSAGE.import_inattr + 'pos="' + e + '"');
                break;
              }
              // $('#edit-sequence').append(v);
              // extract(v);
            }
            break;
          case 'image':
            if (q.is('[align]')) {
              v = u.find('.epos-text-align').clone();
              e = q.attr('align');
              s = IMPORT_CONVERT['align_' + e];
              if (s) {
                v.find('.attr-text-align').val(s);
              } else {
                h.push('<' + o.tagName + '>' + MESSAGE.import_inattr + 'align="' + e + '"');
                break;
              }
              // $('#edit-sequence').append(v);
              // extract(v);
            }
            if (q.is('[width][height]')) {
              v = u.find('.epos-image').clone();
              e = q.attr('mode');
              if (e) {
                s = IMPORT_CONVERT['mode_' + e];
                if (s) {
                  v.find('.attr-image-mode').val(s);
                } else {
                  h.push('<' + o.tagName + '>' + MESSAGE.import_inattr + 'mode="' + e + '"');
                  break;
                }
              }
              e = q.attr('color');
              if (e) {
                s = IMPORT_CONVERT['color_' + e];
                if (s) {
                  v.find('.attr-image-color').val(s);
                } else {
                  h.push('<' + o.tagName + '>' + MESSAGE.import_inattr + 'color="' + e + '"');
                  break;
                }
              }
              // n = $('#epos-image').get(0);
              e = q.attr('width');
              s = e | 0;
              if (isNaN(s) || s < 1) {
                h.push('<' + o.tagName + '>' + MESSAGE.import_inattr + 'width="' + e + '"');
                break;
              }
              n.width = s;
              e = q.attr('height');
              s = e | 0;
              if (isNaN(s) || s < 1) {
                h.push('<' + o.tagName + '>' + MESSAGE.import_inattr + 'height="' + e + '"');
                break;
              }
              n.height = s;
              t = decodeBase64(q.text());
              if (q.attr('mode') === 'gray16') {
                if (t.length === ((n.width + 1) >> 1) * n.height) {
                  drawGray16(n, t);
                } else {
                  h.push('<' + o.tagName + '>' + MESSAGE.import_intext);
                  break;
                }
              } else {
                if (t.length === ((n.width + 7) >> 3) * n.height) {
                  drawMono(n, t);
                } else {
                  h.push('<' + o.tagName + '>' + MESSAGE.import_intext);
                  break;
                }
              }
              v.find('.attr-image').attr({ src: n.toDataURL() });
              v.find('.attr-image-file').val('');
              // $('#edit-sequence').append(v);
              // extract(v);
            } else {
              h.push('<' + o.tagName + '>' + MESSAGE.import_noattr + '"width", "height"');
            }
            break;
          case 'logo':
            if (q.is('[align]')) {
              v = u.find('.epos-text-align').clone();
              e = q.attr('align');
              s = IMPORT_CONVERT['align_' + e];
              if (s) {
                v.find('.attr-text-align').val(s);
              } else {
                h.push('<' + o.tagName + '>' + MESSAGE.import_inattr + 'align="' + e + '"');
                break;
              }
              // $('#edit-sequence').append(v);
              // extract(v);
            }
            if (q.is('[key1][key2]')) {
              v = u.find('.epos-logo').clone();
              e = q.attr('key1');
              s = e | 0;
              if (isNaN(s) || s < 32 || s > 126) {
                h.push('<' + o.tagName + '>' + MESSAGE.import_inattr + 'key1="' + e + '"');
                break;
              }
              v.find('.attr-logo-key1').val(s);
              e = q.attr('key2');
              s = e | 0;
              if (isNaN(s) || s < 32 || s > 126) {
                h.push('<' + o.tagName + '>' + MESSAGE.import_inattr + 'key2="' + e + '"');
                break;
              }
              v.find('.attr-logo-key2').val(s);
              // $('#edit-sequence').append(v);
              // extract(v);
            } else {
              h.push('<' + o.tagName + '>' + MESSAGE.import_noattr + '"key1", "key2"');
            }
            break;
          case 'barcode':
            if (q.is('[align]')) {
              v = u.find('.epos-text-align').clone();
              e = q.attr('align');
              s = IMPORT_CONVERT['align_' + e];
              if (s) {
                v.find('.attr-text-align').val(s);
              } else {
                h.push('<' + o.tagName + '>' + MESSAGE.import_inattr + 'align="' + e + '"');
                break;
              }
              // $('#edit-sequence').append(v);
              // extract(v);
            }
            if (q.is('[rotate]')) {
              v = u.find('.epos-text-rotate').clone();
              e = q.attr('rotate');
              if (/^(1|true)$/.test(e)) {
                v.find('.attr-text-rotate').attr('checked', 'checked');
              } else {
                if (/^(0|false)$/.test(e)) {
                  v.find('.attr-text-rotate').removeAttr('checked');
                } else {
                  h.push('<' + o.tagName + '>' + MESSAGE.import_inattr + 'rotate="' + e + '"');
                  break;
                }
              }
              // $('#edit-sequence').append(v);
              // extract(v);
            }
            if (q.is('[type]')) {
              v = u.find('.epos-barcode').clone();
              e = q.attr('type');
              s = IMPORT_CONVERT['barcode_' + e];
              if (s) {
                v.find('.attr-barcode-type').val(s);
              } else {
                h.push('<' + o.tagName + '>' + MESSAGE.import_inattr + 'type="' + e + '"');
                break;
              }
              e = q.attr('hri');
              if (e) {
                s = IMPORT_CONVERT['hri_' + e];
                if (s) {
                  v.find('.attr-barcode-hri').val(s);
                } else {
                  h.push('<' + o.tagName + '>' + MESSAGE.import_inattr + 'hri="' + e + '"');
                  break;
                }
              }
              e = q.attr('font');
              if (e) {
                s = IMPORT_CONVERT['font_' + e];
                if (s) {
                  v.find('.attr-barcode-font').val(s);
                } else {
                  h.push('<' + o.tagName + '>' + MESSAGE.import_inattr + 'font="' + e + '"');
                  break;
                }
              }
              e = q.attr('width');
              if (e) {
                s = e | 0;
                if (isNaN(s) || s < 2 || s > 6) {
                  h.push('<' + o.tagName + '>' + MESSAGE.import_inattr + 'width="' + e + '"');
                  break;
                }
                v.find('.attr-barcode-width').val(s);
              }
              e = q.attr('height');
              if (e) {
                s = e | 0;
                if (isNaN(s) || s < 1 || s > 255) {
                  h.push('<' + o.tagName + '>' + MESSAGE.import_inattr + 'height="' + e + '"');
                  break;
                }
                v.find('.attr-barcode-height').val(s);
              }
              v.find('.attr-barcode-data').val(escapeCode(q.text()));
              // $('#edit-sequence').append(v);
              // extract(v);
            } else {
              h.push('<' + o.tagName + '>' + MESSAGE.import_noattr + '"type"');
            }
            break;
          case 'symbol':
            if (q.is('[align]')) {
              v = u.find('.epos-text-align').clone();
              e = q.attr('align');
              s = IMPORT_CONVERT['align_' + e];
              if (s) {
                v.find('.attr-text-align').val(s);
              } else {
                h.push('<' + o.tagName + '>' + MESSAGE.import_inattr + 'align="' + e + '"');
                break;
              }
              // $('#edit-sequence').append(v);
              // extract(v);
            }
            if (q.is('[rotate]')) {
              v = u.find('.epos-text-rotate').clone();
              e = q.attr('rotate');
              if (/^(1|true)$/.test(e)) {
                v.find('.attr-text-rotate').attr('checked', 'checked');
              } else {
                if (/^(0|false)$/.test(e)) {
                  v.find('.attr-text-rotate').removeAttr('checked');
                } else {
                  h.push('<' + o.tagName + '>' + MESSAGE.import_inattr + 'rotate="' + e + '"');
                  break;
                }
              }
              // $('#edit-sequence').append(v);
              // extract(v);
            }
            if (q.is('[type]')) {
              v = u.find('.epos-symbol').clone();
              e = q.attr('type');
              s = IMPORT_CONVERT['symbol_' + e];
              if (s) {
                v.find('.attr-symbol-type').val(s);
              } else {
                h.push('<' + o.tagName + '>' + MESSAGE.import_inattr + 'type="' + e + '"');
                break;
              }
              e = q.attr('level');
              if (e) {
                s = IMPORT_CONVERT['level_' + e];
                if (s) {
                  v.find('.attr-symbol-level-enum').val(s);
                } else {
                  s = e | 0;
                  if (isNaN(s) || s < 5 || s > 95) {
                    h.push('<' + o.tagName + '>' + MESSAGE.import_inattr + 'level="' + e + '"');
                    break;
                  }
                  v.find('.attr-symbol-level').val(s);
                }
              }
              e = q.attr('width');
              if (e) {
                s = e | 0;
                if (isNaN(s) || s < 0 || s > 16) {
                  h.push('<' + o.tagName + '>' + MESSAGE.import_inattr + 'width="' + e + '"');
                  break;
                }
                v.find('.attr-symbol-width').val(s);
              }
              e = q.attr('height');
              if (e) {
                s = e | 0;
                if (isNaN(s) || s < 0 || s > 8) {
                  h.push('<' + o.tagName + '>' + MESSAGE.import_inattr + 'height="' + e + '"');
                  break;
                }
                v.find('.attr-symbol-height').val(s);
              }
              e = q.attr('size');
              if (e) {
                s = e | 0;
                if (isNaN(s) || s < 0 || s > 2400) {
                  h.push('<' + o.tagName + '>' + MESSAGE.import_inattr + 'size="' + e + '"');
                  break;
                }
                v.find('.attr-symbol-size').val(s);
              }
              v.find('.attr-symbol-data').val(escapeCode(q.text()));
              // $('#edit-sequence').append(v);
              // extract(v);
            } else {
              h.push('<' + o.tagName + '>' + MESSAGE.import_noattr + '"type"');
            }
            break;
          case 'hline':
            if (q.is('[x1][x2]')) {
              v = u.find('.epos-hline').clone();
              e = q.attr('x1');
              s = e | 0;
              if (isNaN(s) || s < 0 || s > 575) {
                h.push('<' + o.tagName + '>' + MESSAGE.import_inattr + 'x1="' + e + '"');
                break;
              }
              v.find('.attr-hline-x1').val(s);
              e = q.attr('x2');
              s = e | 0;
              if (isNaN(s) || s < 0 || s > 575) {
                h.push('<' + o.tagName + '>' + MESSAGE.import_inattr + 'x2="' + e + '"');
                break;
              }
              v.find('.attr-hline-x2').val(s);
              e = q.attr('style');
              if (e) {
                s = IMPORT_CONVERT['line_' + e];
                if (s) {
                  v.find('.attr-hline-style').val(s);
                } else {
                  h.push('<' + o.tagName + '>' + MESSAGE.import_inattr + 'style="' + e + '"');
                  break;
                }
              }
              // $('#edit-sequence').append(v);
              // extract(v);
            } else {
              h.push('<' + o.tagName + '>' + MESSAGE.import_noattr + '"x1", "x2"');
            }
            break;
          case 'vline-begin':
            if (q.is('[x]')) {
              v = u.find('.epos-vline-begin').clone();
              e = q.attr('x');
              s = e | 0;
              if (isNaN(s) || s < 0 || s > 575) {
                h.push('<' + o.tagName + '>' + MESSAGE.import_inattr + 'x="' + e + '"');
                break;
              }
              v.find('.attr-vline-x').val(s);
              e = q.attr('style');
              if (e) {
                s = IMPORT_CONVERT['line_' + e];
                if (s) {
                  v.find('.attr-vline-style').val(s);
                } else {
                  h.push('<' + o.tagName + '>' + MESSAGE.import_inattr + 'style="' + e + '"');
                  break;
                }
              }
              // $('#edit-sequence').append(v);
              // extract(v);
            } else {
              h.push('<' + o.tagName + '>' + MESSAGE.import_noattr + '"x"');
            }
            break;
          case 'vline-end':
            if (q.is('[x]')) {
              v = u.find('.epos-vline-end').clone();
              e = q.attr('x');
              s = e | 0;
              if (isNaN(s) || s < 0 || s > 575) {
                h.push('<' + o.tagName + '>' + MESSAGE.import_inattr + 'x="' + e + '"');
                break;
              }
              v.find('.attr-vline-x').val(s);
              e = q.attr('style');
              if (e) {
                s = IMPORT_CONVERT['line_' + e];
                if (s) {
                  v.find('.attr-vline-style').val(s);
                } else {
                  h.push('<' + o.tagName + '>' + MESSAGE.import_inattr + 'style="' + e + '"');
                  break;
                }
              }
              // $('#edit-sequence').append(v);
              // extract(v);
            } else {
              h.push('<' + o.tagName + '>' + MESSAGE.import_noattr + '"x"');
            }
            break;
          case 'page':
            v = u.find('.epos-page-begin').clone();
            // $('#edit-sequence').append(v);
            // extract(v);
            break;
          case 'area':
            if (q.is('[x][y][width][height]')) {
              v = u.find('.epos-area').clone();
              e = q.attr('x');
              s = e | 0;
              if (isNaN(s) || s < 0 || s > 575) {
                h.push('<' + o.tagName + '>' + MESSAGE.import_inattr + 'x="' + e + '"');
                break;
              }
              v.find('.attr-area-x').val(s);
              e = q.attr('y');
              s = e | 0;
              if (isNaN(s) || s < 0 || s > 2399) {
                h.push('<' + o.tagName + '>' + MESSAGE.import_inattr + 'y="' + e + '"');
                break;
              }
              v.find('.attr-area-y').val(s);
              e = q.attr('width');
              s = e | 0;
              if (isNaN(s) || s < 1 || s > 576) {
                h.push('<' + o.tagName + '>' + MESSAGE.import_inattr + 'width="' + e + '"');
                break;
              }
              v.find('.attr-area-width').val(s);
              e = q.attr('height');
              s = e | 0;
              if (isNaN(s) || s < 1 || s > 2400) {
                h.push('<' + o.tagName + '>' + MESSAGE.import_inattr + 'height="' + e + '"');
                break;
              }
              v.find('.attr-area-height').val(s);
              // $('#edit-sequence').append(v);
              // extract(v);
            } else {
              h.push('<' + o.tagName + '>' + MESSAGE.import_noattr + '"x", "y", "width", "height"');
            }
            break;
          case 'direction':
            if (q.is('[dir]')) {
              v = u.find('.epos-direction').clone();
              e = q.attr('dir');
              s = IMPORT_CONVERT['direction_' + e];
              if (s) {
                v.find('.attr-direction-dir').val(s);
              } else {
                h.push('<' + o.tagName + '>' + MESSAGE.import_inattr + 'dir="' + e + '"');
                break;
              }
              // $('#edit-sequence').append(v);
              // extract(v);
            } else {
              h.push('<' + o.tagName + '>' + MESSAGE.import_noattr + '"dir"');
            }
            break;
          case 'position':
            if (q.is('[x][y]')) {
              v = u.find('.epos-position').clone();
              e = q.attr('x');
              s = e | 0;
              if (isNaN(s) || s < 0 || s > 2399) {
                h.push('<' + o.tagName + '>' + MESSAGE.import_inattr + 'x="' + e + '"');
                break;
              }
              v.find('.attr-position-x').val(s);
              e = q.attr('y');
              s = e | 0;
              if (isNaN(s) || s < 0 || s > 2399) {
                h.push('<' + o.tagName + '>' + MESSAGE.import_inattr + 'y="' + e + '"');
                break;
              }
              v.find('.attr-position-y').val(s);
              // $('#edit-sequence').append(v);
              // extract(v);
            } else {
              h.push('<' + o.tagName + '>' + MESSAGE.import_noattr + '"x", "y"');
            }
            break;
          case 'line':
            if (q.is('[x1][y1][x2][y2]')) {
              v = u.find('.epos-line').clone();
              e = q.attr('x1');
              s = e | 0;
              if (isNaN(s) || s < 0 || s > 2399) {
                h.push('<' + o.tagName + '>' + MESSAGE.import_inattr + 'x1="' + e + '"');
                break;
              }
              v.find('.attr-line-x1').val(s);
              e = q.attr('y1');
              s = e | 0;
              if (isNaN(s) || s < 0 || s > 2399) {
                h.push('<' + o.tagName + '>' + MESSAGE.import_inattr + 'y1="' + e + '"');
                break;
              }
              v.find('.attr-line-y1').val(s);
              e = q.attr('x2');
              s = e | 0;
              if (isNaN(s) || s < 0 || s > 2399) {
                h.push('<' + o.tagName + '>' + MESSAGE.import_inattr + 'x2="' + e + '"');
                break;
              }
              v.find('.attr-line-x2').val(s);
              e = q.attr('y2');
              s = e | 0;
              if (isNaN(s) || s < 0 || s > 2399) {
                h.push('<' + o.tagName + '>' + MESSAGE.import_inattr + 'y2="' + e + '"');
                break;
              }
              v.find('.attr-line-y2').val(s);
              e = q.attr('style');
              if (e) {
                s = IMPORT_CONVERT['line_' + e];
                if (s) {
                  v.find('.attr-line-style').val(s);
                } else {
                  h.push('<' + o.tagName + '>' + MESSAGE.import_inattr + 'style="' + e + '"');
                  break;
                }
              }
              // $('#edit-sequence').append(v);
              // extract(v);
            } else {
              h.push('<' + o.tagName + '>' + MESSAGE.import_noattr + '"x1", "y1", "x2", "y2"');
            }
            break;
          case 'rectangle':
            if (q.is('[x1][y1][x2][y2]')) {
              v = u.find('.epos-rectangle').clone();
              e = q.attr('x1');
              s = e | 0;
              if (isNaN(s) || s < 0 || s > 2399) {
                h.push('<' + o.tagName + '>' + MESSAGE.import_inattr + 'x1="' + e + '"');
                break;
              }
              v.find('.attr-rectangle-x1').val(s);
              e = q.attr('y1');
              s = e | 0;
              if (isNaN(s) || s < 0 || s > 2399) {
                h.push('<' + o.tagName + '>' + MESSAGE.import_inattr + 'y1="' + e + '"');
                break;
              }
              v.find('.attr-rectangle-y1').val(s);
              e = q.attr('x2');
              s = e | 0;
              if (isNaN(s) || s < 0 || s > 2399) {
                h.push('<' + o.tagName + '>' + MESSAGE.import_inattr + 'x2="' + e + '"');
                break;
              }
              v.find('.attr-rectangle-x2').val(s);
              e = q.attr('y2');
              s = e | 0;
              if (isNaN(s) || s < 0 || s > 2399) {
                h.push('<' + o.tagName + '>' + MESSAGE.import_inattr + 'y2="' + e + '"');
                break;
              }
              v.find('.attr-rectangle-y2').val(s);
              e = q.attr('style');
              if (e) {
                s = IMPORT_CONVERT['line_' + e];
                if (s) {
                  v.find('.attr-rectangle-style').val(s);
                } else {
                  h.push('<' + o.tagName + '>' + MESSAGE.import_inattr + 'style="' + e + '"');
                  break;
                }
              }
              // $('#edit-sequence').append(v);
              // extract(v);
            } else {
              h.push('<' + o.tagName + '>' + MESSAGE.import_noattr + '"x1", "y1", "x2", "y2"');
            }
            break;
          case 'page-end':
            v = u.find('.epos-page-end').clone();
            // $('#edit-sequence').append(v);
            // extract(v);
            break;
          case 'cut':
            v = u.find('.epos-cut').clone();
            e = q.attr('type');
            if (e) {
              s = IMPORT_CONVERT['cut_' + e];
              if (s) {
                v.find('.attr-cut-type').val(s);
              } else {
                h.push('<' + o.tagName + '>' + MESSAGE.import_inattr + 'type="' + e + '"');
                break;
              }
            }
            // $('#edit-sequence').append(v);
            // extract(v);
            break;
          case 'pulse':
            v = u.find('.epos-pulse').clone();
            e = q.attr('drawer');
            if (e) {
              s = IMPORT_CONVERT['drawer_' + e];
              if (s) {
                v.find('.attr-pulse-drawer').val(s);
              } else {
                h.push('<' + o.tagName + '>' + MESSAGE.import_inattr + 'drawer="' + e + '"');
                break;
              }
            }
            e = q.attr('time');
            if (e) {
              s = IMPORT_CONVERT['pulse_' + e];
              if (s) {
                v.find('.attr-pulse-time').val(s);
              } else {
                h.push('<' + o.tagName + '>' + MESSAGE.import_inattr + 'time="' + e + '"');
                break;
              }
            }
            // $('#edit-sequence').append(v);
            // extract(v);
            break;
          case 'sound':
            v = u.find('.epos-sound').clone();
            e = q.attr('pattern');
            if (e) {
              s = IMPORT_CONVERT['pattern_' + e];
              if (s) {
                v.find('.attr-sound-pattern').val(s);
              } else {
                h.push('<' + o.tagName + '>' + MESSAGE.import_inattr + 'pattern="' + e + '"');
                break;
              }
            }
            e = q.attr('repeat');
            if (e) {
              s = e | 0;
              if (isNaN(s) || s < 0 || s > 255) {
                h.push('<' + o.tagName + '>' + MESSAGE.import_inattr + 'repeat="' + e + '"');
                break;
              }
              v.find('.attr-sound-repeat').val(s);
            }
            e = q.attr('cycle');
            if (e) {
              s = e | 0;
              if (isNaN(s) || s < 1000 || s > 25500) {
                h.push('<' + o.tagName + '>' + MESSAGE.import_inattr + 'cycle="' + e + '"');
                break;
              }
              v.find('.attr-sound-cycle').val(s);
            }
            // $('#edit-sequence').append(v);
            // extract(v);
            break;
          case 'layout':
            v = u.find('.epos-layout').clone();
            e = q.attr('type');
            s = IMPORT_CONVERT['layout_' + e];
            if (s) {
              v.find('.attr-layout-type').val(s);
            } else {
              h.push('<' + o.tagName + '>' + MESSAGE.import_inattr + 'type="' + e + '"');
              break;
            }
            e = q.attr('width');
            if (e) {
              s = (e | 0) / 10;
              if (isNaN(s) || s < 29 || s > 80) {
                h.push('<' + o.tagName + '>' + MESSAGE.import_inattr + 'width="' + e + '"');
                break;
              }
              v.find('.attr-layout-width').val(s);
            }
            e = q.attr('height');
            if (e) {
              s = (e | 0) / 10;
              if (isNaN(s) || (s !== 0 && s < 28.4) || s > 310) {
                h.push('<' + o.tagName + '>' + MESSAGE.import_inattr + 'height="' + e + '"');
                break;
              }
              if (s !== 0) {
                v.find('.attr-layout-height-auto:first').removeAttr('checked');
                v.find('.attr-layout-height-auto:last').attr('checked', 'checked');
                v.find('.attr-layout-height').val(s);
              }
            }
            e = q.attr('margin-top');
            if (e) {
              s = (e | 0) / 10;
              if (isNaN(s) || s < -15 || s > 300) {
                h.push('<' + o.tagName + '>' + MESSAGE.import_inattr + 'margin-top="' + e + '"');
                break;
              }
              v.find('.attr-layout-margin-top').val(s);
            }
            e = q.attr('margin-bottom');
            if (e) {
              s = (e | 0) / 10;
              if (isNaN(s) || s < -1.5 || s > 1.5) {
                h.push('<' + o.tagName + '>' + MESSAGE.import_inattr + 'margin-bottom="' + e + '"');
                break;
              }
              v.find('.attr-layout-margin-bottom').val(s);
            }
            e = q.attr('offset-cut');
            if (e) {
              s = (e | 0) / 10;
              if (isNaN(s) || s < -29 || s > 5) {
                h.push('<' + o.tagName + '>' + MESSAGE.import_inattr + 'offset-cut="' + e + '"');
                break;
              }
              v.find('.attr-layout-offset-cut').val(s);
            }
            e = q.attr('offset-label');
            if (e) {
              s = (e | 0) / 10;
              if (isNaN(s) || s < 0 || s > 1.5) {
                h.push('<' + o.tagName + '>' + MESSAGE.import_inattr + 'offset-label="' + e + '"');
                break;
              }
              v.find('.attr-layout-offset-label').val(s);
            }
            // $('#edit-sequence').append(v);
            // extract(v);
            break;
          case 'recovery':
            v = u.find('.epos-recovery').clone();
            // $('#edit-sequence').append(v);
            // extract(v);
            break;
          case 'reset':
            v = u.find('.epos-reset').clone();
            // $('#edit-sequence').append(v);
            // extract(v);
            break;
          case 'command':
            v = u.find('.epos-command').clone();
            v.find('.attr-command-data').val(decodeHex(q.text()));
            // $('#edit-sequence').append(v);
            // extract(v);
            break;
          default:
            h.push('<' + o.tagName + '>' + MESSAGE.import_inelem);
            break;
        }
      });
      if (h.length > 0) {
        h.push('');
      }
      h.push(MESSAGE.import_complete);
    } catch (i) {
      h.push(i.MESSAGE);
      h.push('');
      h.push(MESSAGE.import_abort);
    }
    h.push('');
    console.log(h.join('\n'));
    // $('#import-info')
    //   .val()
    //   .change();
  } */
}
