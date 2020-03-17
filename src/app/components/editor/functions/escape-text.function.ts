export function escapeText(a) {
  const b = /\\[tnr\\]|\\/g;
  if (b.test(a)) {
    a = a.replace(b, (f) => {
      let e = '';
      switch (f) {
        case '\\t':
          e = '\x09';
          break;
        case '\\n':
          e = '\x0a';
          break;
        case '\\r':
          e = '\x0d';
          break;
        case '\\\\':
          e = '\\';
          break;
        default:
          break;
      }
      return e;
    });
  }
  return a;
}

export function escapeTextHex(a) {
  const b = /\\x[0-9A-Fa-f]{2}/g;
  if (b.test(a)) {
    a = a.replace(b, (e) => String.fromCharCode(parseInt(e.slice(2), 16)));
  }
  return escapeText(a);
}

export function escapeTextHexApi(a) {
  const b = /\\x[0-9A-Fa-f]{2}|\\[tnr\\]|['"]|\\/g;
  if (b.test(a)) {
    a = a.replace(b, (f) => {
      let e = f;
      switch (f) {
        case '"':
          e = '\\"';
          break;
        case '\'':
          e = '\\\'';
          break;
        case '\\':
          e = '';
          break;
        default:
          break;
      }
      return e;
    });
  }
  return a;
}

export function escapeTextApi(a) {
  const b = /\\[tnr\\]|['"]|\\/g;
  if (b.test(a)) {
    a = a.replace(b, (f) => {
      let e = f;
      switch (f) {
        case '"':
          e = '\\"';
          break;
        case '\'':
          e = '\\\'';
          break;
        case '\\':
          e = '';
          break;
        default:
          break;
      }
      return e;
    });
  }
  return a;
}
