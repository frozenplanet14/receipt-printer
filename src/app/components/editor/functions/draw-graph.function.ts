import { LINE_CONVERT_CONST } from '../const/line-convert.const';
import { ModelInfoModel } from '../editor-view/epos-print-editor.model';

function drawHLine(
  textCanvas: HTMLCanvasElement, lineCanvas: HTMLCanvasElement, model: ModelInfoModel,
  { line_w, line_h, hline, vline, rotate, align }) {
  let textContext: CanvasRenderingContext2D;
  // tslint:disable-next-line: one-variable-per-declaration
  let g, e, a, h;
  if (line_w > 0) {
    hline = [];
    drawFeed(0, textCanvas, lineCanvas, model, { line_w, line_h, hline, vline, rotate, align });
  } else {
    if (textCanvas) {
      textContext = textCanvas.getContext('2d');
      textContext.fillStyle = '#000000';
      for (e = 0; e < hline.length; e++) {
        a = hline[e];
        h = LINE_CONVERT_CONST[a.style];
        textContext.fillRect(a.x1, 0, a.x2 - a.x1, h.w);
        if (h.d) {
          textContext.fillRect(a.x1, h.w + 1, a.x2 - a.x1, h.w);
        }
        line_h = Math.max(line_h, h.d ? h.w * 2 + 1 : h.w);
      }
      if (lineCanvas.getContext) {
        g = lineCanvas.getContext('2d');
        g.drawImage(textCanvas, 0, 0, model.width, line_h, 0, 0, model.width, line_h);
        g.fillStyle = '#000000';
        // tslint:disable-next-line: forin
        for (e in vline) {
          a = vline[e];
          h = LINE_CONVERT_CONST[a.style];
          g.fillRect(a.x, 0, h.w, lineCanvas.height);
          if (h.d) {
            g.fillRect(a.x + h.w + 1, 0, h.w, lineCanvas.height);
          }
        }
        textContext.clearRect(0, 0, textCanvas.width, textCanvas.height);
      }
    }
    return {
      canvas: lineCanvas,
      attr: {
        hline: [],
        line_x: 0,
        line_w: 0,
        line_h: 0
      }
    };
  }
}

export function drawFeed(
  k, textCanvas: HTMLCanvasElement, lineCanvas: HTMLCanvasElement,
  model: ModelInfoModel, { line_h, hline, line_w, vline, rotate, align }) {
  let e;
  let b;
  let j = 0;
  let h;
  let g;
  let a;
  if (hline.length > 0) {
    drawHLine(textCanvas, lineCanvas, model, { line_h, hline, line_w, vline, rotate, align });
  }
  if (lineCanvas.getContext && textCanvas.getContext) {
    e = lineCanvas.getContext('2d');
    b = textCanvas.getContext('2d');
    if (line_w > 0) {
      if (rotate) {
        if (align !== 'right') {
          j = (model.width - line_w) / (align === 'left' ? 1 : 2);
        }
        e.drawImage(textCanvas, 576 - line_w, 0, line_w, line_h, j, 0, line_w, line_h);
      } else {
        if (align !== 'left') {
          j = (model.width - line_w) / (align === 'right' ? 1 : 2);
        }
        e.drawImage(textCanvas, 0, 192 - line_h, line_w, line_h, j, 0, line_w, line_h);
      }
    }
    e.fillStyle = '#000000';
    // tslint:disable-next-line: forin
    for (h in vline) {
      g = vline[h];
      a = LINE_CONVERT_CONST[g.style];
      e.fillRect(g.x, 0, a.w, lineCanvas.height);
      if (a.d) {
        e.fillRect(g.x + a.w + 1, 0, a.w, lineCanvas.height);
      }
    }
    b.clearRect(0, 0, textCanvas.width, textCanvas.height);
  }
  return {
    canvas: lineCanvas,
    attr: {
      line_x: 0,
      line_w: 0,
      line_h: 0
    }
  };
}

// export function drawText(h) {
//   let a, f, g, e, b;
//   if (hline.length > 0) {
//     drawHLine();
//   }
//   a = $('#preview-text').get(0);
//   if (a.getContext) {
//     f = a.getContext('2d');
//     f.textAlign = 'left';
//     f.textBaseline = 'alphabetic';
//     for (e = 0; e < h.length; e++) {
//       g = h.charAt(e);
//       switch (g) {
//         case '\t':
//           if (line_x == model.width) {
//             drawFeed(linespc);
//           }
//           b = font_a * 4;
//           line_x = Math.floor(line_x / b) * b + b;
//           if (line_x > model.width) {
//             drawFeed(linespc);
//           }
//           break;
//         case '\n':
//           drawFeed(linespc);
//           break;
//         case '\r':
//           break;
//         default:
//           drawChar(f, g);
//           break;
//       }
//     }
//   }
// }
