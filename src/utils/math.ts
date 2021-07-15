import Decimal from 'decimal.js';

export const bcadd = (x: number, y: number, scale: number = 0): string => {
  return Decimal.add(x, y).toFixed(scale);
};

export const bcsub = (x: number, y: number, scale: number = 0): string => {
  return Decimal.sub(x, y).toFixed(scale);
};

export const bcmul = (x: number, y: number, scale: number = 0): string => {
  return Decimal.mul(x, y).toFixed(scale);
};

export const bcdiv = (x: number, y: number, scale: number = 0): string => {
  return Decimal.div(x, y).toFixed(scale);
};