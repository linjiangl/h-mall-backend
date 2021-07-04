import { getEnvConfig } from '@/utils/env';

const getConfig = (option: string): string => {
  const config = getEnvConfig(REACT_APP_ENV);
  return config[option];
};

export const getHost = (): string => {
  return getConfig('host');
};

export const getStaticCdn = (): string => {
  return getConfig('staticCdn');
};

export const getUploadUrl = (): string => {
  return `${getHost()}/public/upload`;
};

export const getUEditorUrl = (): string => {
  return `${getHost()}/public/ueditor`;
};

export const getBuildPath = (): string => {
  const basePath = getConfig('publicPath');
  return basePath.substr(0, basePath.length - 1);
};

export const getApiPrefix = (): string => {
  return getConfig('apiPrefix');
};
