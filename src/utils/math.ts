import Big from 'big.js';

export const bcadd = (x: number, y: number, scale: number = 0): string => {
  return (new Big(x)).plus(new Big(y)).toFixed(scale);
};

export const bcsub = (x: number, y: number, scale: number = 0): string => {
  return (new Big(x)).minus(new Big(y)).toFixed(scale);
};

export const bcmul = (x: number, y: number, scale: number = 0): string => {
  return (new Big(x)).times(new Big(y)).toFixed(scale);
};

export const bcdiv = (x: number, y: number, scale: number = 0): string => {
  return (new Big(x)).div(new Big(y)).toFixed(scale);
};