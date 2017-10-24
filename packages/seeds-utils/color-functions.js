function hexToRgb(hex) {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
    return r + r + g + g + b + b;
  });
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      }
    : null;
}

function rgbToXyz(rgb) {
  let _r = rgb.r / 255,
    _g = rgb.g / 255,
    _b = rgb.b / 255;

  if (_r > 0.04045) {
    _r = Math.pow((_r + 0.055) / 1.055, 2.4);
  } else {
    _r = _r / 12.92;
  }

  if (_g > 0.04045) {
    _g = Math.pow((_g + 0.055) / 1.055, 2.4);
  } else {
    _g = _g / 12.92;
  }

  if (_b > 0.04045) {
    _b = Math.pow((_b + 0.055) / 1.055, 2.4);
  } else {
    _b = _b / 12.92;
  }

  _r = _r * 100;
  _g = _g * 100;
  _b = _b * 100;

  const X = _r * 0.4124 + _g * 0.3576 + _b * 0.1805,
    Y = _r * 0.2126 + _g * 0.7152 + _b * 0.0722,
    Z = _r * 0.0193 + _g * 0.1192 + _b * 0.9505;

  return [X, Y, Z];
}

function xyzToLab(xyz) {
  let ref_X = 95.047,
    ref_Y = 100.0,
    ref_Z = 108.883,
    _X = xyz[0] / ref_X,
    _Y = xyz[1] / ref_Y,
    _Z = xyz[2] / ref_Z;

  if (_X > 0.008856) {
    _X = Math.pow(_X, 1 / 3);
  } else {
    _X = 7.787 * _X + 16 / 116;
  }

  if (_Y > 0.008856) {
    _Y = Math.pow(_Y, 1 / 3);
  } else {
    _Y = 7.787 * _Y + 16 / 116;
  }

  if (_Z > 0.008856) {
    _Z = Math.pow(_Z, 1 / 3);
  } else {
    _Z = 7.787 * _Z + 16 / 116;
  }

  const CIE_L = 116 * _Y - 16,
    CIE_a = 500 * (_X - _Y),
    CIE_b = 200 * (_Y - _Z);

  return [CIE_L, CIE_a, CIE_b];
}

function cie1994(x, y, isTextiles) {
  (x = {l: x[0], a: x[1], b: x[2]}), (y = {l: y[0], a: y[1], b: y[2]});
  let labx = x,
    laby = y,
    k2,
    k1,
    kl,
    kh = 1,
    kc = 1;

  if (isTextiles) {
    k2 = 0.014;
    k1 = 0.048;
    kl = 2;
  } else {
    k2 = 0.015;
    k1 = 0.045;
    kl = 1;
  }

  const c1 = Math.sqrt(x.a * x.a + x.b * x.b),
    c2 = Math.sqrt(y.a * y.a + y.b * y.b),
    sh = 1 + k2 * c1,
    sc = 1 + k1 * c1,
    sl = 1,
    da = x.a - y.a,
    db = x.b - y.b,
    dc = c1 - c2,
    dl = x.l - y.l,
    dh = Math.sqrt(Math.abs(da * da + db * db - dc * dc));

  return Math.sqrt(Math.pow(dl / (kl * sl), 2) + Math.pow(dc / (kc * sc), 2) + Math.pow(dh / (kh * sh), 2));
}

function hexToLab(hex) {
  return xyzToLab(rgbToXyz(hexToRgb(hex)));
}

module.exports.hexToRgb = hexToRgb;
module.exports.rgbToXyz = rgbToXyz;
module.exports.xyzToLab = xyzToLab;
module.exports.cie1994 = cie1994;
module.exports.hexToLab = hexToLab;
