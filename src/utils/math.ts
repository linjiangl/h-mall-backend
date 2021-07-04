import * as math from 'mathjs';

export const bcadd = (x: number, y: number, scale: number = 0): string => {
  return Number(math.format(x + y, { precision: 14 })).toFixed(scale);
};

export const bcsub = (x: number, y: number, scale: number = 0): string => {
  return Number(math.format(x - y, { precision: 14 })).toFixed(scale);
};

export const bcmul = (x: number, y: number, scale: number = 0): string => {
  return Number(math.format(x * y, { precision: 14 })).toFixed(scale);
};

export const bcdiv = (x: number, y: number, scale: number = 0): string => {
  return Number(math.format(x * y, { precision: 14 })).toFixed(scale);
};
