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

export function escapeCode(a) {
  const b = /[\t\n\r\\]/g;
  if (b.test(a)) {
    a = a.replace(b, (f) => {
      let e = '';
      switch (f) {
        case '\t':
          e = '\\t';
          break;
        case '\n':
          e = '\\n';
          break;
        case '\r':
          e = '\\r';
          break;
        case '\\':
          e = '\\\\';
          break;
        default:
          break;
      }
      return e;
    });
  }
  return a;
}

// tslint:disable: no-bitwise
export function decodeHex(a) {
  const b = /[0-9A-Fa-f]{2}/g;
  a = a.replace(/[^0-9A-Fa-f]/g, '');
  a = a.slice(0, a.length & ~1);
  if (b.test(a)) {
    a = a.replace(b, (e) => {
      return '\\x' + e;
    });
  }
  return a;
}


export function decodeBase64(o) {
  const h = String.fromCharCode;
  const m = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  const k = {};
  let e;
  let a;
  let b;
  let g;
  let f;
  for (f = 0; f < 64; f++) {
    k[m.charAt(f)] = f;
  }
  o = o.replace(/[^A-Za-z0-9\+\/]/g, '');
  e = o.length;
  a = new Array(((e + 3) >> 2) * 3);
  o += 'AAA';
  f = 0;
  g = 0;
  while (g < e) {
    b = (k[o.charAt(g++)] << 18) | (k[o.charAt(g++)] << 12) | (k[o.charAt(g++)] << 6) | k[o.charAt(g++)];
    a[f++] = h((b >> 16) & 255);
    a[f++] = h((b >> 8) & 255);
    a[f++] = h(b & 255);
  }
  a.length -= (4 - (e % 4)) % 4;
  return a.join('');
}


export function drawMono(b, k) {
  let a;
  let n;
  let h;
  let e;
  let m;
  let g = 0;
  let f = 0;
  if (b.getContext) {
    a = b.getContext('2d');
    n = a.getImageData(0, 0, (b.width + 7) & ~7, b.height);
    h = n.data;
    e = h.length >> 2;
    while (g < e) {
      m = (k.charCodeAt(g >> 3) & (128 >> (g & 7))) === 0 ? 255 : 0;
      h[f++] = m;
      h[f++] = m;
      h[f++] = m;
      h[f++] = 255;
      g++;
    }
    a.putImageData(n, 0, 0);
  }
}


export function drawGray16(b, m) {
  const h = [
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    3,
    3,
    3,
    3,
    4,
    4,
    4,
    4,
    5,
    5,
    5,
    5,
    6,
    6,
    6,
    6,
    6,
    7,
    7,
    7,
    7,
    8,
    8,
    8,
    8,
    8,
    9,
    9,
    9,
    9,
    10,
    10,
    10,
    10,
    10,
    11,
    12,
    12,
    13,
    13,
    14,
    15,
    15,
    16,
    16,
    17,
    17,
    18,
    19,
    19,
    20,
    20,
    21,
    22,
    24,
    25,
    26,
    27,
    28,
    29,
    30,
    31,
    32,
    33,
    34,
    35,
    37,
    38,
    39,
    40,
    42,
    44,
    45,
    47,
    48,
    50,
    52,
    53,
    55,
    56,
    58,
    60,
    61,
    63,
    64,
    66,
    68,
    70,
    72,
    74,
    77,
    79,
    81,
    83,
    85,
    87,
    89,
    91,
    93,
    95,
    97,
    99,
    102,
    104,
    106,
    109,
    111,
    114,
    116,
    118,
    121,
    123,
    126,
    128,
    130,
    133,
    135,
    138,
    140,
    142,
    145,
    147,
    150,
    152,
    155,
    157,
    160,
    162,
    165,
    167,
    170,
    172,
    175,
    177,
    180,
    182,
    185,
    187,
    189,
    191,
    193,
    195,
    198,
    200,
    202,
    204,
    206,
    209,
    211,
    213,
    215,
    217,
    220,
    222,
    223,
    225,
    226,
    228,
    229,
    231,
    232,
    234,
    235,
    237,
    238,
    240,
    241,
    243,
    244,
    246,
    247,
    248,
    248,
    248,
    249,
    249,
    250,
    250,
    251,
    251,
    252,
    252,
    253,
    253,
    254,
    254,
    255,
    255,
    255,
    255,
    255,
    255,
    255,
    255,
    255,
    255,
    255,
    255,
    255,
    255,
    255,
    255,
    255,
    255,
    255,
    255,
    255,
    255,
    255,
    255,
    255,
    255,
    255,
    255,
    255,
    255,
    255,
    255,
    255,
    255,
    255,
    255,
    255,
    255,
    255,
    255,
    255,
    255,
    255,
    255,
    255,
    255,
    255,
    255,
    255,
    255,
    255,
    255,
    255
  ];
  let a;
  let o;
  let k;
  let e;
  let n;
  let g = 0;
  let f = 0;
  if (b.getContext) {
    a = b.getContext('2d');
    o = a.getImageData(0, 0, (b.width + 1) & ~1, b.height);
    k = o.data;
    e = k.length >> 1;
    while (g < e) {
      n = h[(m.charCodeAt(g >> 1) & 240) + 8];
      k[f++] = n;
      k[f++] = n;
      k[f++] = n;
      k[f++] = 255;
      g++;
      n = h[((m.charCodeAt(g >> 1) & 15) << 4) + 8];
      k[f++] = n;
      k[f++] = n;
      k[f++] = n;
      k[f++] = 255;
      g++;
    }
    a.putImageData(o, 0, 0);
  }
}
// tslint:enable: no-bitwise
