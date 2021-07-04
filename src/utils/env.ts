type EnvConfig = {
  base: string;
  publicPath: string;
  host: string;
  loginUrl: string;
  staticCdn: string;
  apiPrefix: string;
};

const baseConfig: EnvConfig = {
  base: '/',
  publicPath: '/',
  // 各环境接口请求的域名
  host: '',
  // 登录地址
  loginUrl: '/login',
  // 静态资源cdn域名
  staticCdn: '//mall-static.udoyo.com/',
  // 接口前缀
  apiPrefix: '/backend',
};

const config = {
  dev: {
    ...baseConfig,
  },
  test: {
    ...baseConfig,
    host: 'http://xxx.com',
  },
  prod: {
    ...baseConfig,
    host: 'http://xxx.com',
  },
};

export const getEnvConfig = (env: string | undefined = 'prod'): EnvConfig => {
  return config[env || 'dev'];
};
