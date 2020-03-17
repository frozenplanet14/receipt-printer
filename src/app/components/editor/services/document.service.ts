import { Injectable } from '@angular/core';
import xml2js from 'xml2js';
import { BehaviorSubject } from 'rxjs';
import { MESSAGE, MODEL_INFO_CONST } from '../editor-view/epos-print-editor.const';
import { IMPORT_CONVERT } from '../const/import-convert.const';
import {
  escapeCode,
  decodeBase64,
  drawGray16,
  drawMono,
  decodeHex,
  escapeText,
  escapeTextApi,
  escapeTextHex,
  escapeTextHexApi
} from '../functions/escape-text.function';
import { EditMenuModel, ItemModel, FormModel } from '../model/form-model';
import { EDIT_MENU_FORM } from '../editor-view/edit-view/constant/edit-menu-form.const';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ModelInfoModel } from '../editor-view/epos-print-editor.model';
import { first } from 'rxjs/operators';
import { DIR_CONVERT_CONST } from '../const/dir-convert.const';

declare var xmlToJSON;
declare var epson: any;

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  data: BehaviorSubject<ItemModel[]> = new BehaviorSubject<ItemModel[]>(null);
  xml: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  api: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(private localStorage: LocalStorageService) {
    // const testString = '<xml><a>It Works!</a></xml>';  	// get some xml (string or document/node)
    // const result = xmlToJSON.parseString(testString);	// parse
    // console.log(result);
    this.data.subscribe((items) => this.exportDoc(items));
  }

  parseXML(data) {
    return new Promise(resolve => {
      resolve(xmlToJSON.parseString(data, {
        namespaceKey: 'epos', 	// tag name for namespace objects
        textKey: 'text', 	// tag name for text nodes
        valueKey: 'value', 	// tag name for attribute values
        attrKey: 'attr', 	// tag for attr groups
      }));
      // const parser = new xml2js.Parser(
      //   {
      //     charsAsChildren: true,
      //     explicitChildren: true,
      //     preserveChildrenOrder: true,
      //     mergeAttrs: true,
      //     explicitArray: false
      //   });
      // parser.parseString(data, (err, result) => {
      //   console.log(result);
      //   resolve(result);
      // });
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
    let objectList;
    try {
      const root = 'epos-print';
      if (l[root]) {
        throw new Error(MESSAGE.import_noelem);
      }
      // TODO: Add check for force
      objectList = Object.keys(l).filter(key => key !== root);
      objectList.foreach((key) => {
        const menuList: EditMenuModel[] = EDIT_MENU_FORM; // $('#edit-left ul');
        let w = false;
        let v;
        let s;
        let e;
        const n = {};
        let t;
        switch (key.tagName) {
          case 'text':
            if (item.is('[align]')) {
              v = menuList.find('.epos-text-align').clone();
              e = item.attr('align');
              s = IMPORT_CONVERT['align_' + e];
              if (s) {
                v.find('.attr-text-align').val(s);
              } else {
                h.push('<' + key.tagName + '>' + MESSAGE.import_inattr + 'align="' + e + '"');
                break;
              }
              // $('#edit-sequence').append(v);
              // extract(v);
            }
            if (item.is('[linespc]')) {
              v = menuList.find('.epos-text-linespc').clone();
              e = item.attr('linespc');
              s = e || 0;
              if (isNaN(s) || s < 0 || s > 255) {
                h.push('<' + key.tagName + '>' + MESSAGE.import_inattr + 'linespc="' + e + '"');
                break;
              }
              v.find('.attr-text-linespc').val(s);
              // $('#edit-sequence').append(v);
              // extract(v);
            }
            if (item.is('[rotate]')) {
              v = menuList.find('.epos-text-rotate').clone();
              e = item.attr('rotate');
              if (/^(1|true)$/.test(e)) {
                v.find('.attr-text-rotate').attr('checked', 'checked');
              } else {
                if (/^(0|false)$/.test(e)) {
                  v.find('.attr-text-rotate').removeAttr('checked');
                } else {
                  h.push('<' + key.tagName + '>' + MESSAGE.import_inattr + 'rotate="' + e + '"');
                  break;
                }
              }
              // $('#edit-sequence').append(v);
              // extract(v);
            }
            if (item.is('[lang]')) {
              v = menuList.find('.epos-text-lang').clone();
              s = IMPORT_CONVERT[('lang_' + item.attr('lang')).toLowerCase()];
              v.find('.attr-text-lang').val(s ? s : 'en');
              // $('#edit-sequence').append(v);
              // extract(v);
            }
            if (item.is('[font]')) {
              v = menuList.find('.epos-text-font').clone();
              e = item.attr('font');
              s = IMPORT_CONVERT['font_' + e];
              if (s) {
                v.find('.attr-text-font').val(s);
              } else {
                h.push('<' + key.tagName + '>' + MESSAGE.import_inattr + 'font="' + e + '"');
                break;
              }
              // $('#edit-sequence').append(v);
              // extract(v);
            }
            if (item.is('[x]')) {
              v = menuList.find('.epos-text-position').clone();
              e = item.attr('x');
              s = e || 0;
              if (isNaN(s) || s < 0 || s > 2399) {
                h.push('<' + key.tagName + '>' + MESSAGE.import_inattr + 'x="' + e + '"');
                break;
              }
              v.find('.attr-text-x').val(s);
              // $('#edit-sequence').append(v);
              // extract(v);
            }
            if (item.is('[y]')) {
              v = menuList.find('.epos-text-vposition').clone();
              e = item.attr('y');
              s = e || 0;
              if (isNaN(s) || s < 0 || s > 2399) {
                h.push('<' + key.tagName + '>' + MESSAGE.import_inattr + 'y="' + e + '"');
                break;
              }
              v.find('.attr-text-y').val(s);
              // $('#edit-sequence').append(v);
              // extract(v);
            }
            if (item.is('[smooth]')) {
              v = menuList.find('.epos-text-smooth').clone();
              e = item.attr('smooth');
              if (/^(1|true)$/.test(e)) {
                v.find('.attr-text-smooth').attr('checked', 'checked');
              } else {
                if (/^(0|false)$/.test(e)) {
                  v.find('.attr-text-smooth').removeAttr('checked');
                } else {
                  h.push('<' + key.tagName + '>' + MESSAGE.import_inattr + 'smooth="' + e + '"');
                  break;
                }
              }
              // $('#edit-sequence').append(v);
              // extract(v);
            }
            if (item.is('[dw], [dh]')) {
              v = menuList.find('.epos-text-double').clone();
              e = item.attr('dw');
              if (e) {
                if (/^(1|true)$/.test(e)) {
                  a = 2;
                } else {
                  if (/^(0|false)$/.test(e)) {
                    a = 1;
                  } else {
                    h.push('<' + key.tagName + '>' + MESSAGE.import_inattr + 'dw="' + e + '"');
                    break;
                  }
                }
              }
              e = item.attr('dh');
              if (e) {
                if (/^(1|true)$/.test(e)) {
                  m = 2;
                } else {
                  if (/^(0|false)$/.test(e)) {
                    m = 1;
                  } else {
                    h.push('<' + key.tagName + '>' + MESSAGE.import_inattr + 'dh="' + e + '"');
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
            if (w || item.is('[width], [height]')) {
              v = menuList.find('.epos-text-size').clone();
              e = item.attr('width');
              if (e) {
                s = e || 0;
                if (isNaN(s) || s < 1 || s > 8) {
                  h.push('<' + key.tagName + '>' + MESSAGE.import_inattr + 'width="' + e + '"');
                  break;
                }
                a = s;
              }
              e = item.attr('height');
              if (e) {
                s = e || 0;
                if (isNaN(s) || s < 1 || s > 8) {
                  h.push('<' + key.tagName + '>' + MESSAGE.import_inattr + 'height="' + e + '"');
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
            if (item.is('[reverse], [ul], [em], [color]')) {
              v = menuList.find('.epos-text-style').clone();
              e = item.attr('reverse');
              if (e) {
                if (/^(1|true)$/.test(e)) {
                  k = true;
                } else {
                  if (/^(0|false)$/.test(e)) {
                    k = false;
                  } else {
                    h.push('<' + key.tagName + '>' + MESSAGE.import_inattr + 'reverse="' + e + '"');
                    break;
                  }
                }
              }
              e = item.attr('ul');
              if (e) {
                if (/^(1|true)$/.test(e)) {
                  j = true;
                } else {
                  if (/^(0|false)$/.test(e)) {
                    j = false;
                  } else {
                    h.push('<' + key.tagName + '>' + MESSAGE.import_inattr + 'ul="' + e + '"');
                    break;
                  }
                }
              }
              e = item.attr('em');
              if (e) {
                if (/^(1|true)$/.test(e)) {
                  b = true;
                } else {
                  if (/^(0|false)$/.test(e)) {
                    b = false;
                  } else {
                    h.push('<' + key.tagName + '>' + MESSAGE.import_inattr + 'em="' + e + '"');
                    break;
                  }
                }
              }
              e = item.attr('color');
              if (e) {
                s = IMPORT_CONVERT['color_' + e];
                if (s) {
                  g = s;
                } else {
                  h.push('<' + key.tagName + '>' + MESSAGE.import_inattr + 'color="' + e + '"');
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
            if (item.text().length > 0) {
              v = menuList.find('.epos-text').clone();
              v.find('.attr-text-data').val(escapeCode(item.text()));
              // $('#edit-sequence').append(v);
              // extract(v);
            }
            break;
          case 'feed':
            if (item.is('[linespc]')) {
              v = menuList.find('.epos-text-linespc').clone();
              e = item.attr('linespc');
              s = e || 0;
              if (isNaN(s) || s < 0 || s > 255) {
                h.push('<' + key.tagName + '>' + MESSAGE.import_inattr + 'linespc="' + e + '"');
                break;
              }
              v.find('.attr-text-linespc').val(s);
              // $('#edit-sequence').append(v);
              // extract(v);
            }
            if (item.is('[unit]')) {
              v = menuList.find('.epos-feed-unit').clone();
              e = item.attr('unit');
              s = e || 0;
              if (isNaN(s) || s < 0 || s > 255) {
                h.push('<' + key.tagName + '>' + MESSAGE.import_inattr + 'unit="' + e + '"');
                break;
              }
              v.find('.attr-feed-unit').val(s);
              // $('#edit-sequence').append(v);
              // extract(v);
            }
            if (item.is('[line]')) {
              v = menuList.find('.epos-feed-line').clone();
              e = item.attr('line');
              s = e || 0;
              if (isNaN(s) || s < 0 || s > 255) {
                h.push('<' + key.tagName + '>' + MESSAGE.import_inattr + 'line="' + e + '"');
                break;
              }
              v.find('.attr-feed-line').val(s);
              // $('#edit-sequence').append(v);
              // extract(v);
            }
            if (item.is(':not([unit], [line], [pos])')) {
              v = menuList.find('.epos-feed').clone();
              // $('#edit-sequence').append(v);
              // extract(v);
            }
            if (item.is('[pos]')) {
              v = menuList.find('.epos-feed-pos').clone();
              e = item.attr('pos');
              s = IMPORT_CONVERT['feed_' + e];
              if (s) {
                v.find('.attr-feed-pos').val(s);
              } else {
                h.push('<' + key.tagName + '>' + MESSAGE.import_inattr + 'pos="' + e + '"');
                break;
              }
              // $('#edit-sequence').append(v);
              // extract(v);
            }
            break;
          case 'image':
            if (item.is('[align]')) {
              v = menuList.find('.epos-text-align').clone();
              e = item.attr('align');
              s = IMPORT_CONVERT['align_' + e];
              if (s) {
                v.find('.attr-text-align').val(s);
              } else {
                h.push('<' + key.tagName + '>' + MESSAGE.import_inattr + 'align="' + e + '"');
                break;
              }
              // $('#edit-sequence').append(v);
              // extract(v);
            }
            if (item.is('[width][height]')) {
              v = menuList.find('.epos-image').clone();
              e = item.attr('mode');
              if (e) {
                s = IMPORT_CONVERT['mode_' + e];
                if (s) {
                  v.find('.attr-image-mode').val(s);
                } else {
                  h.push('<' + key.tagName + '>' + MESSAGE.import_inattr + 'mode="' + e + '"');
                  break;
                }
              }
              e = item.attr('color');
              if (e) {
                s = IMPORT_CONVERT['color_' + e];
                if (s) {
                  v.find('.attr-image-color').val(s);
                } else {
                  h.push('<' + key.tagName + '>' + MESSAGE.import_inattr + 'color="' + e + '"');
                  break;
                }
              }
              // n = $('#epos-image').get(0);
              e = item.attr('width');
              s = e || 0;
              if (isNaN(s) || s < 1) {
                h.push('<' + key.tagName + '>' + MESSAGE.import_inattr + 'width="' + e + '"');
                break;
              }
              n.width = s;
              e = item.attr('height');
              s = e || 0;
              if (isNaN(s) || s < 1) {
                h.push('<' + key.tagName + '>' + MESSAGE.import_inattr + 'height="' + e + '"');
                break;
              }
              n.height = s;
              t = decodeBase64(item.text());
              if (item.attr('mode') === 'gray16') {
                if (t.length === ((n.width + 1) >> 1) * n.height) {
                  drawGray16(n, t);
                } else {
                  h.push('<' + key.tagName + '>' + MESSAGE.import_intext);
                  break;
                }
              } else {
                if (t.length === ((n.width + 7) >> 3) * n.height) {
                  drawMono(n, t);
                } else {
                  h.push('<' + key.tagName + '>' + MESSAGE.import_intext);
                  break;
                }
              }
              v.find('.attr-image').attr({ src: n.toDataURL() });
              v.find('.attr-image-file').val('');
              // $('#edit-sequence').append(v);
              // extract(v);
            } else {
              h.push('<' + key.tagName + '>' + MESSAGE.import_noattr + '"width", "height"');
            }
            break;
          case 'logo':
            if (item.is('[align]')) {
              v = menuList.find('.epos-text-align').clone();
              e = item.attr('align');
              s = IMPORT_CONVERT['align_' + e];
              if (s) {
                v.find('.attr-text-align').val(s);
              } else {
                h.push('<' + key.tagName + '>' + MESSAGE.import_inattr + 'align="' + e + '"');
                break;
              }
              // $('#edit-sequence').append(v);
              // extract(v);
            }
            if (item.is('[key1][key2]')) {
              v = menuList.find('.epos-logo').clone();
              e = item.attr('key1');
              s = e || 0;
              if (isNaN(s) || s < 32 || s > 126) {
                h.push('<' + key.tagName + '>' + MESSAGE.import_inattr + 'key1="' + e + '"');
                break;
              }
              v.find('.attr-logo-key1').val(s);
              e = item.attr('key2');
              s = e || 0;
              if (isNaN(s) || s < 32 || s > 126) {
                h.push('<' + key.tagName + '>' + MESSAGE.import_inattr + 'key2="' + e + '"');
                break;
              }
              v.find('.attr-logo-key2').val(s);
              // $('#edit-sequence').append(v);
              // extract(v);
            } else {
              h.push('<' + key.tagName + '>' + MESSAGE.import_noattr + '"key1", "key2"');
            }
            break;
          case 'barcode':
            if (item.is('[align]')) {
              v = menuList.find('.epos-text-align').clone();
              e = item.attr('align');
              s = IMPORT_CONVERT['align_' + e];
              if (s) {
                v.find('.attr-text-align').val(s);
              } else {
                h.push('<' + key.tagName + '>' + MESSAGE.import_inattr + 'align="' + e + '"');
                break;
              }
              // $('#edit-sequence').append(v);
              // extract(v);
            }
            if (item.is('[rotate]')) {
              v = menuList.find('.epos-text-rotate').clone();
              e = item.attr('rotate');
              if (/^(1|true)$/.test(e)) {
                v.find('.attr-text-rotate').attr('checked', 'checked');
              } else {
                if (/^(0|false)$/.test(e)) {
                  v.find('.attr-text-rotate').removeAttr('checked');
                } else {
                  h.push('<' + key.tagName + '>' + MESSAGE.import_inattr + 'rotate="' + e + '"');
                  break;
                }
              }
              // $('#edit-sequence').append(v);
              // extract(v);
            }
            if (item.is('[type]')) {
              v = menuList.find('.epos-barcode').clone();
              e = item.attr('type');
              s = IMPORT_CONVERT['barcode_' + e];
              if (s) {
                v.find('.attr-barcode-type').val(s);
              } else {
                h.push('<' + key.tagName + '>' + MESSAGE.import_inattr + 'type="' + e + '"');
                break;
              }
              e = item.attr('hri');
              if (e) {
                s = IMPORT_CONVERT['hri_' + e];
                if (s) {
                  v.find('.attr-barcode-hri').val(s);
                } else {
                  h.push('<' + key.tagName + '>' + MESSAGE.import_inattr + 'hri="' + e + '"');
                  break;
                }
              }
              e = item.attr('font');
              if (e) {
                s = IMPORT_CONVERT['font_' + e];
                if (s) {
                  v.find('.attr-barcode-font').val(s);
                } else {
                  h.push('<' + key.tagName + '>' + MESSAGE.import_inattr + 'font="' + e + '"');
                  break;
                }
              }
              e = item.attr('width');
              if (e) {
                s = e || 0;
                if (isNaN(s) || s < 2 || s > 6) {
                  h.push('<' + key.tagName + '>' + MESSAGE.import_inattr + 'width="' + e + '"');
                  break;
                }
                v.find('.attr-barcode-width').val(s);
              }
              e = item.attr('height');
              if (e) {
                s = e || 0;
                if (isNaN(s) || s < 1 || s > 255) {
                  h.push('<' + key.tagName + '>' + MESSAGE.import_inattr + 'height="' + e + '"');
                  break;
                }
                v.find('.attr-barcode-height').val(s);
              }
              v.find('.attr-barcode-data').val(escapeCode(item.text()));
              // $('#edit-sequence').append(v);
              // extract(v);
            } else {
              h.push('<' + key.tagName + '>' + MESSAGE.import_noattr + '"type"');
            }
            break;
          case 'symbol':
            if (item.is('[align]')) {
              v = menuList.find('.epos-text-align').clone();
              e = item.attr('align');
              s = IMPORT_CONVERT['align_' + e];
              if (s) {
                v.find('.attr-text-align').val(s);
              } else {
                h.push('<' + key.tagName + '>' + MESSAGE.import_inattr + 'align="' + e + '"');
                break;
              }
              // $('#edit-sequence').append(v);
              // extract(v);
            }
            if (item.is('[rotate]')) {
              v = menuList.find('.epos-text-rotate').clone();
              e = item.attr('rotate');
              if (/^(1|true)$/.test(e)) {
                v.find('.attr-text-rotate').attr('checked', 'checked');
              } else {
                if (/^(0|false)$/.test(e)) {
                  v.find('.attr-text-rotate').removeAttr('checked');
                } else {
                  h.push('<' + key.tagName + '>' + MESSAGE.import_inattr + 'rotate="' + e + '"');
                  break;
                }
              }
              // $('#edit-sequence').append(v);
              // extract(v);
            }
            if (item.is('[type]')) {
              v = menuList.find('.epos-symbol').clone();
              e = item.attr('type');
              s = IMPORT_CONVERT['symbol_' + e];
              if (s) {
                v.find('.attr-symbol-type').val(s);
              } else {
                h.push('<' + key.tagName + '>' + MESSAGE.import_inattr + 'type="' + e + '"');
                break;
              }
              e = item.attr('level');
              if (e) {
                s = IMPORT_CONVERT['level_' + e];
                if (s) {
                  v.find('.attr-symbol-level-enum').val(s);
                } else {
                  s = e || 0;
                  if (isNaN(s) || s < 5 || s > 95) {
                    h.push('<' + key.tagName + '>' + MESSAGE.import_inattr + 'level="' + e + '"');
                    break;
                  }
                  v.find('.attr-symbol-level').val(s);
                }
              }
              e = item.attr('width');
              if (e) {
                s = e || 0;
                if (isNaN(s) || s < 0 || s > 16) {
                  h.push('<' + key.tagName + '>' + MESSAGE.import_inattr + 'width="' + e + '"');
                  break;
                }
                v.find('.attr-symbol-width').val(s);
              }
              e = item.attr('height');
              if (e) {
                s = e || 0;
                if (isNaN(s) || s < 0 || s > 8) {
                  h.push('<' + key.tagName + '>' + MESSAGE.import_inattr + 'height="' + e + '"');
                  break;
                }
                v.find('.attr-symbol-height').val(s);
              }
              e = item.attr('size');
              if (e) {
                s = e || 0;
                if (isNaN(s) || s < 0 || s > 2400) {
                  h.push('<' + key.tagName + '>' + MESSAGE.import_inattr + 'size="' + e + '"');
                  break;
                }
                v.find('.attr-symbol-size').val(s);
              }
              v.find('.attr-symbol-data').val(escapeCode(item.text()));
              // $('#edit-sequence').append(v);
              // extract(v);
            } else {
              h.push('<' + key.tagName + '>' + MESSAGE.import_noattr + '"type"');
            }
            break;
          case 'hline':
            if (item.is('[x1][x2]')) {
              v = menuList.find('.epos-hline').clone();
              e = item.attr('x1');
              s = e || 0;
              if (isNaN(s) || s < 0 || s > 575) {
                h.push('<' + key.tagName + '>' + MESSAGE.import_inattr + 'x1="' + e + '"');
                break;
              }
              v.find('.attr-hline-x1').val(s);
              e = item.attr('x2');
              s = e || 0;
              if (isNaN(s) || s < 0 || s > 575) {
                h.push('<' + key.tagName + '>' + MESSAGE.import_inattr + 'x2="' + e + '"');
                break;
              }
              v.find('.attr-hline-x2').val(s);
              e = item.attr('style');
              if (e) {
                s = IMPORT_CONVERT['line_' + e];
                if (s) {
                  v.find('.attr-hline-style').val(s);
                } else {
                  h.push('<' + key.tagName + '>' + MESSAGE.import_inattr + 'style="' + e + '"');
                  break;
                }
              }
              // $('#edit-sequence').append(v);
              // extract(v);
            } else {
              h.push('<' + key.tagName + '>' + MESSAGE.import_noattr + '"x1", "x2"');
            }
            break;
          case 'vline-begin':
            if (item.is('[x]')) {
              v = menuList.find('.epos-vline-begin').clone();
              e = item.attr('x');
              s = e || 0;
              if (isNaN(s) || s < 0 || s > 575) {
                h.push('<' + key.tagName + '>' + MESSAGE.import_inattr + 'x="' + e + '"');
                break;
              }
              v.find('.attr-vline-x').val(s);
              e = item.attr('style');
              if (e) {
                s = IMPORT_CONVERT['line_' + e];
                if (s) {
                  v.find('.attr-vline-style').val(s);
                } else {
                  h.push('<' + key.tagName + '>' + MESSAGE.import_inattr + 'style="' + e + '"');
                  break;
                }
              }
              // $('#edit-sequence').append(v);
              // extract(v);
            } else {
              h.push('<' + key.tagName + '>' + MESSAGE.import_noattr + '"x"');
            }
            break;
          case 'vline-end':
            if (item.is('[x]')) {
              v = menuList.find('.epos-vline-end').clone();
              e = item.attr('x');
              s = e || 0;
              if (isNaN(s) || s < 0 || s > 575) {
                h.push('<' + key.tagName + '>' + MESSAGE.import_inattr + 'x="' + e + '"');
                break;
              }
              v.find('.attr-vline-x').val(s);
              e = item.attr('style');
              if (e) {
                s = IMPORT_CONVERT['line_' + e];
                if (s) {
                  v.find('.attr-vline-style').val(s);
                } else {
                  h.push('<' + key.tagName + '>' + MESSAGE.import_inattr + 'style="' + e + '"');
                  break;
                }
              }
              // $('#edit-sequence').append(v);
              // extract(v);
            } else {
              h.push('<' + key.tagName + '>' + MESSAGE.import_noattr + '"x"');
            }
            break;
          case 'page':
            v = menuList.find('.epos-page-begin').clone();
            // $('#edit-sequence').append(v);
            // extract(v);
            break;
          case 'area':
            if (item.is('[x][y][width][height]')) {
              v = menuList.find('.epos-area').clone();
              e = item.attr('x');
              s = e || 0;
              if (isNaN(s) || s < 0 || s > 575) {
                h.push('<' + key.tagName + '>' + MESSAGE.import_inattr + 'x="' + e + '"');
                break;
              }
              v.find('.attr-area-x').val(s);
              e = item.attr('y');
              s = e || 0;
              if (isNaN(s) || s < 0 || s > 2399) {
                h.push('<' + key.tagName + '>' + MESSAGE.import_inattr + 'y="' + e + '"');
                break;
              }
              v.find('.attr-area-y').val(s);
              e = item.attr('width');
              s = e || 0;
              if (isNaN(s) || s < 1 || s > 576) {
                h.push('<' + key.tagName + '>' + MESSAGE.import_inattr + 'width="' + e + '"');
                break;
              }
              v.find('.attr-area-width').val(s);
              e = item.attr('height');
              s = e || 0;
              if (isNaN(s) || s < 1 || s > 2400) {
                h.push('<' + key.tagName + '>' + MESSAGE.import_inattr + 'height="' + e + '"');
                break;
              }
              v.find('.attr-area-height').val(s);
              // $('#edit-sequence').append(v);
              // extract(v);
            } else {
              h.push('<' + key.tagName + '>' + MESSAGE.import_noattr + '"x", "y", "width", "height"');
            }
            break;
          case 'direction':
            if (item.is('[dir]')) {
              v = menuList.find('.epos-direction').clone();
              e = item.attr('dir');
              s = IMPORT_CONVERT['direction_' + e];
              if (s) {
                v.find('.attr-direction-dir').val(s);
              } else {
                h.push('<' + key.tagName + '>' + MESSAGE.import_inattr + 'dir="' + e + '"');
                break;
              }
              // $('#edit-sequence').append(v);
              // extract(v);
            } else {
              h.push('<' + key.tagName + '>' + MESSAGE.import_noattr + '"dir"');
            }
            break;
          case 'position':
            if (item.is('[x][y]')) {
              v = menuList.find('.epos-position').clone();
              e = item.attr('x');
              s = e || 0;
              if (isNaN(s) || s < 0 || s > 2399) {
                h.push('<' + key.tagName + '>' + MESSAGE.import_inattr + 'x="' + e + '"');
                break;
              }
              v.find('.attr-position-x').val(s);
              e = item.attr('y');
              s = e || 0;
              if (isNaN(s) || s < 0 || s > 2399) {
                h.push('<' + key.tagName + '>' + MESSAGE.import_inattr + 'y="' + e + '"');
                break;
              }
              v.find('.attr-position-y').val(s);
              // $('#edit-sequence').append(v);
              // extract(v);
            } else {
              h.push('<' + key.tagName + '>' + MESSAGE.import_noattr + '"x", "y"');
            }
            break;
          case 'line':
            if (item.is('[x1][y1][x2][y2]')) {
              v = menuList.find('.epos-line').clone();
              e = item.attr('x1');
              s = e || 0;
              if (isNaN(s) || s < 0 || s > 2399) {
                h.push('<' + key.tagName + '>' + MESSAGE.import_inattr + 'x1="' + e + '"');
                break;
              }
              v.find('.attr-line-x1').val(s);
              e = item.attr('y1');
              s = e || 0;
              if (isNaN(s) || s < 0 || s > 2399) {
                h.push('<' + key.tagName + '>' + MESSAGE.import_inattr + 'y1="' + e + '"');
                break;
              }
              v.find('.attr-line-y1').val(s);
              e = item.attr('x2');
              s = e || 0;
              if (isNaN(s) || s < 0 || s > 2399) {
                h.push('<' + key.tagName + '>' + MESSAGE.import_inattr + 'x2="' + e + '"');
                break;
              }
              v.find('.attr-line-x2').val(s);
              e = item.attr('y2');
              s = e || 0;
              if (isNaN(s) || s < 0 || s > 2399) {
                h.push('<' + key.tagName + '>' + MESSAGE.import_inattr + 'y2="' + e + '"');
                break;
              }
              v.find('.attr-line-y2').val(s);
              e = item.attr('style');
              if (e) {
                s = IMPORT_CONVERT['line_' + e];
                if (s) {
                  v.find('.attr-line-style').val(s);
                } else {
                  h.push('<' + key.tagName + '>' + MESSAGE.import_inattr + 'style="' + e + '"');
                  break;
                }
              }
              // $('#edit-sequence').append(v);
              // extract(v);
            } else {
              h.push('<' + key.tagName + '>' + MESSAGE.import_noattr + '"x1", "y1", "x2", "y2"');
            }
            break;
          case 'rectangle':
            if (item.is('[x1][y1][x2][y2]')) {
              v = menuList.find('.epos-rectangle').clone();
              e = item.attr('x1');
              s = e || 0;
              if (isNaN(s) || s < 0 || s > 2399) {
                h.push('<' + key.tagName + '>' + MESSAGE.import_inattr + 'x1="' + e + '"');
                break;
              }
              v.find('.attr-rectangle-x1').val(s);
              e = item.attr('y1');
              s = e || 0;
              if (isNaN(s) || s < 0 || s > 2399) {
                h.push('<' + key.tagName + '>' + MESSAGE.import_inattr + 'y1="' + e + '"');
                break;
              }
              v.find('.attr-rectangle-y1').val(s);
              e = item.attr('x2');
              s = e || 0;
              if (isNaN(s) || s < 0 || s > 2399) {
                h.push('<' + key.tagName + '>' + MESSAGE.import_inattr + 'x2="' + e + '"');
                break;
              }
              v.find('.attr-rectangle-x2').val(s);
              e = item.attr('y2');
              s = e || 0;
              if (isNaN(s) || s < 0 || s > 2399) {
                h.push('<' + key.tagName + '>' + MESSAGE.import_inattr + 'y2="' + e + '"');
                break;
              }
              v.find('.attr-rectangle-y2').val(s);
              e = item.attr('style');
              if (e) {
                s = IMPORT_CONVERT['line_' + e];
                if (s) {
                  v.find('.attr-rectangle-style').val(s);
                } else {
                  h.push('<' + key.tagName + '>' + MESSAGE.import_inattr + 'style="' + e + '"');
                  break;
                }
              }
              // $('#edit-sequence').append(v);
              // extract(v);
            } else {
              h.push('<' + key.tagName + '>' + MESSAGE.import_noattr + '"x1", "y1", "x2", "y2"');
            }
            break;
          case 'page-end':
            v = menuList.find('.epos-page-end').clone();
            // $('#edit-sequence').append(v);
            // extract(v);
            break;
          case 'cut':
            v = menuList.find('.epos-cut').clone();
            e = item.attr('type');
            if (e) {
              s = IMPORT_CONVERT['cut_' + e];
              if (s) {
                v.find('.attr-cut-type').val(s);
              } else {
                h.push('<' + key.tagName + '>' + MESSAGE.import_inattr + 'type="' + e + '"');
                break;
              }
            }
            // $('#edit-sequence').append(v);
            // extract(v);
            break;
          case 'pulse':
            v = menuList.find('.epos-pulse').clone();
            e = item.attr('drawer');
            if (e) {
              s = IMPORT_CONVERT['drawer_' + e];
              if (s) {
                v.find('.attr-pulse-drawer').val(s);
              } else {
                h.push('<' + key.tagName + '>' + MESSAGE.import_inattr + 'drawer="' + e + '"');
                break;
              }
            }
            e = item.attr('time');
            if (e) {
              s = IMPORT_CONVERT['pulse_' + e];
              if (s) {
                v.find('.attr-pulse-time').val(s);
              } else {
                h.push('<' + key.tagName + '>' + MESSAGE.import_inattr + 'time="' + e + '"');
                break;
              }
            }
            // $('#edit-sequence').append(v);
            // extract(v);
            break;
          case 'sound':
            v = menuList.find('.epos-sound').clone();
            e = item.attr('pattern');
            if (e) {
              s = IMPORT_CONVERT['pattern_' + e];
              if (s) {
                v.find('.attr-sound-pattern').val(s);
              } else {
                h.push('<' + key.tagName + '>' + MESSAGE.import_inattr + 'pattern="' + e + '"');
                break;
              }
            }
            e = item.attr('repeat');
            if (e) {
              s = e || 0;
              if (isNaN(s) || s < 0 || s > 255) {
                h.push('<' + key.tagName + '>' + MESSAGE.import_inattr + 'repeat="' + e + '"');
                break;
              }
              v.find('.attr-sound-repeat').val(s);
            }
            e = item.attr('cycle');
            if (e) {
              s = e || 0;
              if (isNaN(s) || s < 1000 || s > 25500) {
                h.push('<' + key.tagName + '>' + MESSAGE.import_inattr + 'cycle="' + e + '"');
                break;
              }
              v.find('.attr-sound-cycle').val(s);
            }
            // $('#edit-sequence').append(v);
            // extract(v);
            break;
          case 'layout':
            v = menuList.find('.epos-layout').clone();
            e = item.attr('type');
            s = IMPORT_CONVERT['layout_' + e];
            if (s) {
              v.find('.attr-layout-type').val(s);
            } else {
              h.push('<' + key.tagName + '>' + MESSAGE.import_inattr + 'type="' + e + '"');
              break;
            }
            e = item.attr('width');
            if (e) {
              s = (e || 0) / 10;
              if (isNaN(s) || s < 29 || s > 80) {
                h.push('<' + key.tagName + '>' + MESSAGE.import_inattr + 'width="' + e + '"');
                break;
              }
              v.find('.attr-layout-width').val(s);
            }
            e = item.attr('height');
            if (e) {
              s = (e || 0) / 10;
              if (isNaN(s) || (s !== 0 && s < 28.4) || s > 310) {
                h.push('<' + key.tagName + '>' + MESSAGE.import_inattr + 'height="' + e + '"');
                break;
              }
              if (s !== 0) {
                v.find('.attr-layout-height-auto:first').removeAttr('checked');
                v.find('.attr-layout-height-auto:last').attr('checked', 'checked');
                v.find('.attr-layout-height').val(s);
              }
            }
            e = item.attr('margin-top');
            if (e) {
              s = (e || 0) / 10;
              if (isNaN(s) || s < -15 || s > 300) {
                h.push('<' + key.tagName + '>' + MESSAGE.import_inattr + 'margin-top="' + e + '"');
                break;
              }
              v.find('.attr-layout-margin-top').val(s);
            }
            e = item.attr('margin-bottom');
            if (e) {
              s = (e || 0) / 10;
              if (isNaN(s) || s < -1.5 || s > 1.5) {
                h.push('<' + key.tagName + '>' + MESSAGE.import_inattr + 'margin-bottom="' + e + '"');
                break;
              }
              v.find('.attr-layout-margin-bottom').val(s);
            }
            e = item.attr('offset-cut');
            if (e) {
              s = (e || 0) / 10;
              if (isNaN(s) || s < -29 || s > 5) {
                h.push('<' + key.tagName + '>' + MESSAGE.import_inattr + 'offset-cut="' + e + '"');
                break;
              }
              v.find('.attr-layout-offset-cut').val(s);
            }
            e = item.attr('offset-label');
            if (e) {
              s = (e || 0) / 10;
              if (isNaN(s) || s < 0 || s > 1.5) {
                h.push('<' + key.tagName + '>' + MESSAGE.import_inattr + 'offset-label="' + e + '"');
                break;
              }
              v.find('.attr-layout-offset-label').val(s);
            }
            // $('#edit-sequence').append(v);
            // extract(v);
            break;
          case 'recovery':
            v = menuList.find('.epos-recovery').clone();
            // $('#edit-sequence').append(v);
            // extract(v);
            break;
          case 'reset':
            v = menuList.find('.epos-reset').clone();
            // $('#edit-sequence').append(v);
            // extract(v);
            break;
          case 'command':
            v = menuList.find('.epos-command').clone();
            v.find('.attr-command-data').val(decodeHex(item.text()));
            // $('#edit-sequence').append(v);
            // extract(v);
            break;
          default:
            h.push('<' + key.tagName + '>' + MESSAGE.import_inelem);
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
    //   .value
    //   .change();
  }*/

  exportDoc(items: ItemModel[]) {
    const epos = new epson.ePOSBuilder();
    const canvasItems = [];
    const selectedModel: ModelInfoModel = MODEL_INFO_CONST[this.localStorage.getExtraSetting().model];
    let b = false;
    let j = true;
    let a = selectedModel.page.ini_w;
    let k = selectedModel.page.ini_h;
    canvasItems.push('var builder = new epson.ePOSBuilder();');
    // if ($('#edit-force').value) {
    //   h.force = true;
    //   canvasItems.push('builder.force = true;');
    // }
    // this.data.pipe(first()).subscribe((items: ItemModel[]) => {
    try {
      (items || []).forEach((item, index) => {
        const findElem = (key: string): FormModel => item.form.find(f => f.id === key);
        let u: number | string | boolean;
        let v: number | string | boolean;
        let y: number | string | boolean;
        let z: number | string | boolean;
        if (findElem('attr-text-align')) {
          z = findElem('attr-text-align').value;
          epos.addTextAlign(epos[z as string]);
          canvasItems.push('builder.addTextAlign(builder.' + z + ');');
        } else {
          if (findElem('attr-text-linespc')) {
            z = findElem('attr-text-linespc').value || 0;
            epos.addTextLineSpace(z);
            canvasItems.push('builder.addTextLineSpace(' + z + ');');
          } else {
            if (findElem('attr-text-rotate')) {
              z = findElem('attr-text-rotate').value;
              epos.addTextRotate(z);
              canvasItems.push('builder.addTextRotate(' + z + ');');
            } else {
              if (findElem('attr-text-lang')) {
                z = findElem('attr-text-lang').value;
                epos.addTextLang(z);
                canvasItems.push(`builder.addTextLang('` + z + `');`);
              } else {
                if (findElem('attr-text-font')) {
                  z = findElem('attr-text-font').value;
                  epos.addTextFont(epos[z as string]);
                  canvasItems.push('builder.addTextFont(builder.' + z + ');');
                } else {
                  if (findElem('attr-text-x')) {
                    z = findElem('attr-text-x').value || 0;
                    epos.addTextPosition(z);
                    canvasItems.push('builder.addTextPosition(' + z + ');');
                  } else {
                    if (findElem('attr-text-y')) {
                      z = findElem('attr-text-y').value || 0;
                      epos.addTextVPosition(z);
                      canvasItems.push('builder.addTextVPosition(' + z + ');');
                    } else {
                      if (findElem('attr-text-smooth')) {
                        z = findElem('attr-text-smooth').value;
                        epos.addTextSmooth(z);
                        canvasItems.push('builder.addTextSmooth(' + z + ');');
                      } else {
                        if (item.name === 'Size') {
                          z = findElem('attr-text-width').value || 0;
                          y = findElem('attr-text-height').value || 0;
                          epos.addTextSize(z, y);
                          canvasItems.push('builder.addTextSize(' + z + ', ' + y + ');');
                        } else {
                          if (item.name === 'Double') {
                            z = findElem('attr-text-dw').value;
                            y = findElem('attr-text-dh').value;
                            epos.addTextDouble(z, y);
                            canvasItems.push('builder.addTextDouble(' + z + ', ' + y + ');');
                          } else {
                            if (item.name === 'Style') {
                              z = findElem('attr-text-reverse').value;
                              y = findElem('attr-text-ul').value;
                              v = findElem('attr-text-em').value;
                              u = findElem('attr-text-color').value;
                              epos.addTextStyle(z, y, v, epos[u as string]);
                              canvasItems.push('builder.addTextStyle(' + z + ', ' + y + ', ' + v + ', builder.' + u + ');');
                            } else {
                              if (findElem('attr-text-data')) {
                                z = findElem('attr-text-data').value;
                                epos.addText(escapeText(z));
                                canvasItems.push(`builder.addText('` + escapeTextApi(z) + `');`);
                              } else {
                                if (findElem('attr-feed-unit')) {
                                  z = findElem('attr-feed-unit').value || 0;
                                  epos.addFeedUnit(z);
                                  canvasItems.push('builder.addFeedUnit(' + z + ');');
                                } else {
                                  if (findElem('attr-feed-line')) {
                                    z = findElem('attr-feed-line').value || 0;
                                    epos.addFeedLine(z);
                                    canvasItems.push('builder.addFeedLine(' + z + ');');
                                  } else {
                                    if (item.name === 'LF') {
                                      epos.addFeed();
                                      canvasItems.push('builder.addFeed();');
                                    } else {
                                      if (findElem('attr-feed-pos')) {
                                        z = findElem('attr-feed-pos').value;
                                        epos.addFeedPosition(epos[z as string]);
                                        canvasItems.push('builder.addFeedPosition(builder.' + z + ');');
                                      } else {
                                        if (item.name === 'Image') {
                                          z = findElem('attr-image-color').value;
                                          y = findElem('attr-image-mode').value;
                                          v = findElem('attr-image-brightness').value;
                                          u = findElem('attr-image-halftone').value;
                                          const t = findElem('attr-image-fit').value;
                                          const o = findElem('attr-image').value;
                                          // const m = $('#epos-image').get(0);
                                          // if (t) {
                                          //   x = b ? (j ? a : k) : selectedModel.width;
                                          //   q = ((o.height * x) / o.width) || 0;
                                          // } else {
                                          //   x = Math.min(o.width, b ? (j ? a : k) : selectedModel.width);
                                          //   q = o.height;
                                          // }
                                          // m.width = x;
                                          // m.height = q;
                                          // if (m.getContext) {
                                          //   e = m.getContext('2d');
                                          //   e.clearRect(0, 0, x, q);
                                          //   if (t) {
                                          //     e.drawImage(o, 0, 0, x, q);
                                          //   } else {
                                          //     e.drawImage(o, 0, 0, x, q, 0, 0, x, q);
                                          //   }
                                          //   epos.brightness = v;
                                          //   epos.halftone = epos[u];
                                          //   epos.addImage(e, 0, 0, x, q, epos[z], epos[y]);
                                          //   canvasItems.push('builder.brightness = ' + v + ';');
                                          //   canvasItems.push('builder.halftone = builder.' + u + ';');
                                          //   canvasItems.push(
                                          //     'builder.addImage(context, 0, 0, ' +
                                          //     x +
                                          //     ', ' +
                                          //     q +
                                          //     ', builder.' +
                                          //     z +
                                          //     ', builder.' +
                                          //     y +
                                          //     ');'
                                          //   );
                                          // }
                                        } else {
                                          if (item.name === 'NV Logo') {
                                            z = findElem('attr-logo-key1').value || 0;
                                            y = findElem('attr-logo-key2').value || 0;
                                            epos.addLogo(z, y);
                                            canvasItems.push('builder.addLogo(' + z + ', ' + y + ');');
                                          } else {
                                            if (item.name === 'Barcode') {
                                              z = findElem('attr-barcode-data').value;
                                              y = findElem('attr-barcode-type').value;
                                              v = findElem('attr-barcode-hri').value;
                                              u = findElem('attr-barcode-font').value;
                                              const t = findElem('attr-barcode-width').value || 0;
                                              const s = findElem('attr-barcode-height').value || 0;
                                              epos.addBarcode(escapeTextHex(z),
                                                epos[y as string], epos[v as string], epos[u as string], t, s);
                                              canvasItems.push(
                                                `builder.addBarcode('` +
                                                escapeTextHexApi(z) +
                                                `', builder.` +
                                                y +
                                                ', builder.' +
                                                v +
                                                ', builder.' +
                                                u +
                                                ', ' +
                                                t +
                                                ', ' +
                                                s +
                                                ');'
                                              );
                                            } else {
                                              if (item.name === 'Symbol') {
                                                z = findElem('attr-symbol-data').value;
                                                y = findElem('attr-symbol-type').value;
                                                v = findElem('attr-symbol-level-enum').value;
                                                u = findElem('attr-symbol-width').value || 0;
                                                const t = findElem('attr-symbol-height').value || 0;
                                                const s = findElem('attr-symbol-size').value || 0;
                                                const r = findElem('attr-symbol-level').value || 0;
                                                if (/^SYMBOL_AZTECCODE/.test(y as string)) {
                                                  epos.addSymbol(escapeTextHex(z), epos[y as string], r, u, t, s);
                                                  canvasItems.push(
                                                    `builder.addSymbol('` +
                                                    escapeTextHexApi(z) +
                                                    `', builder.` +
                                                    y +
                                                    ', ' +
                                                    r +
                                                    ', ' +
                                                    u +
                                                    ', ' +
                                                    t +
                                                    ', ' +
                                                    s +
                                                    ');'
                                                  );
                                                } else {
                                                  epos.addSymbol(escapeTextHex(z), epos[y as string], epos[v as string], u, t, s);
                                                  canvasItems.push(
                                                    `builder.addSymbol('` +
                                                    escapeTextHexApi(z) +
                                                    `', builder.` +
                                                    y +
                                                    ', builder.' +
                                                    v +
                                                    ', ' +
                                                    u +
                                                    ', ' +
                                                    t +
                                                    ', ' +
                                                    s +
                                                    ');'
                                                  );
                                                }
                                              } else {
                                                if (findElem('epos-hline')) {
                                                  z = findElem('attr-hline-x1').value || 0;
                                                  y = findElem('attr-hline-x2').value || 0;
                                                  v = findElem('attr-hline-style').value;
                                                  epos.addHLine(z, y, epos[v as string]);
                                                  canvasItems.push('builder.addHLine(' + z + ', ' + y + ', builder.' + v + ');');
                                                } else {
                                                  if (findElem('epos-vline-begin')) {
                                                    z = findElem('attr-vline-x').value || 0;
                                                    y = findElem('attr-vline-style').value;
                                                    epos.addVLineBegin(z, epos[y as string]);
                                                    canvasItems.push('builder.addVLineBegin(' + z + ', builder.' + y + ');');
                                                  } else {
                                                    if (findElem('epos-vline-end')) {
                                                      z = findElem('attr-vline-x').value || 0;
                                                      y = findElem('attr-vline-style').value;
                                                      epos.addVLineEnd(z, epos[y as string]);
                                                      canvasItems.push('builder.addVLineEnd(' + z + ', builder.' + y + ');');
                                                    } else {
                                                      if (item.name === 'Start') {
                                                        epos.addPageBegin();
                                                        canvasItems.push('builder.addPageBegin();');
                                                        b = true;
                                                        a = selectedModel.page.ini_w;
                                                        k = selectedModel.page.ini_h;
                                                        j = true;
                                                      } else {
                                                        if (item.name === 'Area') {
                                                          z = findElem('attr-area-x').value || 0;
                                                          y = findElem('attr-area-y').value || 0;
                                                          v = findElem('attr-area-width').value || 0;
                                                          u = findElem('attr-area-height').value || 0;
                                                          epos.addPageArea(z, y, v, u);
                                                          canvasItems.push(
                                                            'builder.addPageArea(' +
                                                            z +
                                                            ', ' +
                                                            y +
                                                            ', ' +
                                                            v +
                                                            ', ' +
                                                            u +
                                                            ');'
                                                          );
                                                          a = Number(v);
                                                          k = Number(u);
                                                        } else {
                                                          if (item.name === 'Direction') {
                                                            z = findElem('attr-direction-dir').value;
                                                            epos.addPageDirection(epos[z as string]);
                                                            canvasItems.push('builder.addPageDirection(builder.' + z + ');');
                                                            j = DIR_CONVERT_CONST[epos[z as string]].w;
                                                          } else {
                                                            if (item.name === 'Position') {
                                                              z = findElem('attr-position-x').value || 0;
                                                              y = findElem('attr-position-y').value || 0;
                                                              epos.addPagePosition(z, y);
                                                              canvasItems.push('builder.addPagePosition(' + z + ', ' + y + ');');
                                                            } else {
                                                              if (item.name === 'Line') {
                                                                z = findElem('attr-line-x1').value || 0;
                                                                y = findElem('attr-line-y1').value || 0;
                                                                v = findElem('attr-line-x2').value || 0;
                                                                u = findElem('attr-line-y2').value || 0;
                                                                const t = findElem('attr-line-style').value;
                                                                epos.addPageLine(z, y, v, u, epos[t as string]);
                                                                canvasItems.push(
                                                                  'builder.addPageLine(' +
                                                                  z +
                                                                  ', ' +
                                                                  y +
                                                                  ', ' +
                                                                  v +
                                                                  ', ' +
                                                                  u +
                                                                  ', builder.' +
                                                                  t +
                                                                  ');'
                                                                );
                                                              } else {
                                                                if (item.name === 'Rect') {
                                                                  z = findElem('attr-rectangle-x1').value || 0;
                                                                  y = findElem('attr-rectangle-y1').value || 0;
                                                                  v = findElem('attr-rectangle-x2').value || 0;
                                                                  u = findElem('attr-rectangle-y2').value || 0;
                                                                  const t = findElem('attr-rectangle-style').value;
                                                                  epos.addPageRectangle(z, y, v, u, epos[t as string]);
                                                                  canvasItems.push(
                                                                    'builder.addPageRectangle(' +
                                                                    z +
                                                                    ', ' +
                                                                    y +
                                                                    ', ' +
                                                                    v +
                                                                    ', ' +
                                                                    u +
                                                                    ', builder.' +
                                                                    t +
                                                                    ');'
                                                                  );
                                                                } else {
                                                                  if (item.name === 'End') {
                                                                    epos.addPageEnd();
                                                                    canvasItems.push('builder.addPageEnd();');
                                                                    b = false;
                                                                  } else {
                                                                    if (item.name === 'Cut') {
                                                                      z = findElem('attr-cut-type').value;
                                                                      epos.addCut(epos[z as string]);
                                                                      canvasItems.push('builder.addCut(builder.' + z + ');');
                                                                    } else {
                                                                      if (item.name === 'Drawer') {
                                                                        z = findElem('attr-pulse-drawer').value;
                                                                        y = findElem('attr-pulse-time').value;
                                                                        epos.addPulse(epos[z as string], epos[y as string]);
                                                                        canvasItems.push(
                                                                          'builder.addPulse(builder.' +
                                                                          z +
                                                                          ', builder.' +
                                                                          y +
                                                                          ');'
                                                                        );
                                                                      } else {
                                                                        if (item.name === 'Buzzer') {
                                                                          z = findElem('attr-sound-pattern').value;
                                                                          y = findElem('attr-sound-repeat').value || 0;
                                                                          v = findElem('attr-sound-cycle').value || 0;
                                                                          if (/^PATTERN_(10|[1-9])$/.test(z as string)) {
                                                                            epos.addSound(epos[z as string], y, v);
                                                                            canvasItems.push(
                                                                              'builder.addSound(builder.' +
                                                                              z +
                                                                              ', ' +
                                                                              y +
                                                                              ', ' +
                                                                              v +
                                                                              ');'
                                                                            );
                                                                          } else {
                                                                            epos.addSound(epos[z as string], y);
                                                                            canvasItems.push(
                                                                              'builder.addSound(builder.' +
                                                                              z +
                                                                              ', ' +
                                                                              y +
                                                                              ');'
                                                                            );
                                                                          }
                                                                        } else {
                                                                          if (findElem('attr-layout-type')) {
                                                                            z = findElem('attr-layout-type').value;
                                                                            y =
                                                                              (Number(findElem('attr-layout-width').value) * 10) ||
                                                                              0;
                                                                            v = (Number(findElem('attr-layout-height').value) *
                                                                              10) || 0;
                                                                            u =
                                                                              (Number(findElem('attr-layout-margin-top').value) *
                                                                                10) || 0;
                                                                            const t =
                                                                              (Number(findElem('attr-layout-margin-bottom').value) *
                                                                                10) || 0;
                                                                            const s =
                                                                              (Number(findElem('attr-layout-offset-cut').value) *
                                                                                10) || 0;
                                                                            const r =
                                                                              (Number(findElem('attr-layout-offset-label').value) *
                                                                                10) || 0;
                                                                            epos.addLayout(epos[z as string], y, v, u, t, s, r);
                                                                            canvasItems.push(
                                                                              'builder.addLayout(builder.' +
                                                                              z +
                                                                              ', ' +
                                                                              y +
                                                                              ', ' +
                                                                              v +
                                                                              ', ' +
                                                                              u +
                                                                              ', ' +
                                                                              t +
                                                                              ', ' +
                                                                              s +
                                                                              ', ' +
                                                                              r +
                                                                              ');'
                                                                            );
                                                                          } else {
                                                                            if (item.name === 'Recovery') {
                                                                              epos.addRecovery();
                                                                              canvasItems.push('builder.addRecovery();');
                                                                            } else {
                                                                              if (item.name === 'Reset') {
                                                                                epos.addReset();
                                                                                canvasItems.push('builder.addReset();');
                                                                              } else {
                                                                                if (item.name === 'Cmd') {
                                                                                  z = findElem('attr-command-data').value;
                                                                                  epos.addCommand(escapeTextHex(z));
                                                                                  canvasItems.push(
                                                                                    'builder.addCommand(\'' +
                                                                                    escapeTextHexApi(z) +
                                                                                    '\');'
                                                                                  );
                                                                                }
                                                                              }
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      });
    } catch (e) {
      console.log(e);
    }
    this.xml.next(epos.toString().replace(/><(?!\/(text|barcode|symbol|command)>)/g, '>\n<'));
    this.api.next(canvasItems.join('\n'));
    // });
  }
}
