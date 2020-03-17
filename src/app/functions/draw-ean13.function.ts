// left margin, start character
const start = '00000000000101';

// prefix character
const prefix = ['111111', '110100', '110010', '110001', '101100', '100110', '100011', '101010', '101001', '100101'];

// left characters, odd parity
const leftodd = ['0001101', '0011001', '0010011', '0111101', '0100011', '0110001', '0101111', '0111011', '0110111', '0001011'];

// left characters, even parity
const lefteven = ['0100111', '0110011', '0011011', '0100001', '0011101', '0111001', '0000101', '0010001', '0001001', '0010111'];

// center bar
const center = '01010';

// right characters
const right = ['1110010', '1100110', '1101100', '1000010', '1011100', '1001110', '1010000', '1000100', '1001000', '1110100'];

// stop character, right margin
const stop = '10100000000000';

//
// encode EAN13(JAN13)
//
export function drawEan13(context, data, x, y, w, h) {

  // check data length
  if (!/^\d{12,13}$/.test(data)) {
    throw new Error('invalid data');
  }

  // calculate check digit
  let odd = 0;
  let even = 0;
  for (let i = 0; i < 12; i += 2) {
    odd += Number(data.charAt(i));
    even += Number(data.charAt(i + 1));
  }
  const cd = (220 - odd - even * 3) % 10;

  // check digit
  if (data.length < 13) {
    data += cd;
  } else if (cd !== Number(data.charAt(12))) {
    throw new Error('invalid check digit');
  }

  // build modules
  let module = '';

  // append left margin and start character
  module += start;

  // append left characters
  const parity = prefix[Number(data.charAt(0))];
  for (let i = 1; i < 7; i++) {
    const c = Number(data.charAt(i));
    module += Number(parity.charAt(i - 1)) ? leftodd[c] : lefteven[c];
  }

  // append center bar
  module += center;

  // append right characters
  for (let i = 7; i < 13; i++) {
    const c = Number(data.charAt(i));
    module += right[c];
  }

  // append stop character and right margin
  module += stop;

  // draw modules
  for (let i = 0; i < module.length; i++) {
    context.fillStyle = Number(module.charAt(i)) ? 'black' : 'white';
    context.fillRect(x + i * w, y, w, h);
  }
}
