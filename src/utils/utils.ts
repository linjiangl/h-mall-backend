import moment from 'moment';
import { isEmpty as tmpIsEmpty } from 'lodash';
import { message } from 'antd';
import { history } from 'umi';
import { getBuildPath } from './config';
import { parse } from 'querystring';

/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg =
  /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export const isUrl = (path: string): boolean => reg.test(path);

// 获取页面参数
export const getPageQuery = () => parse(window.location.href.split('?')[1]);

// 参数错误统一处理
export const parmasValidationFailed = (errorMessage: string = '参数错误', url: string = '') => {
  message.error(errorMessage);
  if (url) {
    history.push(url);
  } else {
    history.goBack();
  }
};

// 判断是否为空
export const isEmpty = (data: any): boolean => {
  return tmpIsEmpty(data);
};

// 格式化时间戳
export const formatDate = (unix: number, format: string = 'YYYY-MM-DD HH:mm:ss'): string => {
  if (unix === 0) {
    return '--';
  }
  return moment.unix(unix).format(format);
};

// 时间戳转成日期组件
export const toDatePicker = (unix: number) => {
  if (unix === 0) {
    return undefined;
  }
  return moment.unix(unix);
};

// 日期转时间戳
export const dateToUnix = (date: string): number => {
  return moment(date).unix();
};

// 跳转地址
export const goUrl = (url: string = '/welcome') => {
  history.push(url);
};

// 构建链接
export const buildRouteUrl = (url: string): string => {
  const buildPath: string = getBuildPath();
  const regexp: RegExp = new RegExp(buildPath);
  return buildPath + url.replace(regexp, '');
};

// 保存授权的token
const authorizeTokenKey: string = 'authorize-token';

export const setAuthorizeToken = (token: string): string => {
  localStorage.setItem(authorizeTokenKey, token);
  return token;
};

export const getAuthorizeToken = (): string => {
  const token: string | null = localStorage.getItem(authorizeTokenKey);
  return token === null ? '' : token;
};

export const removeAuthorizeToken = (): void => {
  localStorage.removeItem(authorizeTokenKey);
};

// 初始化对象数据
// eslint-disable-next-line @typescript-eslint/ban-types
export const initializesObjectData = <T extends object, K extends T>(
  objectData: T,
  defaultData: K,
): T => {
  let data: T = objectData;
  if (JSON.stringify(objectData) === '{}') {
    data = defaultData;
  }
  return data;
};

export const generateEditTableId = (): number => {
  return Number((Math.random() * 10000000000000).toFixed(0)) * -1;
};

// eslint-disable-next-line @typescript-eslint/ban-types
export const onCallback = (f: undefined | Function, args: any[]): void => {
  if (typeof f === 'function') {
    f(...args);
  }
};
