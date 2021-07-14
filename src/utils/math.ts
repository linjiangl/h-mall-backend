import NP from 'number-precision';

export const bcadd = (x: number, y: number, scale: number = 0): string => {
  return NP.plus(x, y).toFixed(scale);
};

export const bcsub = (x: number, y: number, scale: number = 0): string => {
  return NP.minus(x, y).toFixed(scale);
};

export const bcmul = (x: number, y: number, scale: number = 0): string => {
  return NP.times(x, y).toFixed(scale);
};

export const bcdiv = (x: number, y: number, scale: number = 0): string => {
  return NP.divide(x, y).toFixed(scale);
};