// https://umijs.org/config/
import { defineConfig } from 'umi';
import type { IConfig } from 'umi';
import { join } from 'path';

import defaultSettings from './defaultSettings';
import proxy from './proxy';
import routes from './routes';

const { REACT_APP_ENV } = process.env;

const umiConfig: IConfig = {
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  layout: {
    // https://umijs.org/zh-CN/plugins/plugin-layout
    locale: true,
    siderWidth: 208,
    ...defaultSettings,
  },
  // https://umijs.org/zh-CN/plugins/plugin-locale
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@ant-design/pro-layout/es/PageLoading',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes,
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': defaultSettings.primaryColor,
  },
  // esbuild is father build tools
  // https://umijs.org/plugins/plugin-esbuild
  esbuild: {},
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  // Fast Refresh 热更新
  fastRefresh: {},
  openAPI: [
    {
      requestLibPath: "import { request } from 'umi'",
      // 或者使用在线的版本
      // schemaPath: "https://gw.alipayobjects.com/os/antfincdn/M%24jrzTTYJN/oneapi.json"
      schemaPath: join(__dirname, 'oneapi.json'),
      mock: false,
    },
    {
      requestLibPath: "import { request } from 'umi'",
      schemaPath: 'https://gw.alipayobjects.com/os/antfincdn/CA1dOm%2631B/openapi.json',
      projectName: 'swagger',
    },
  ],
  nodeModulesTransform: { type: 'none' },
  mfsu: {},
  webpack5: {},
  exportStatic: {},
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    lodash: '_',
    bizcharts: 'BizCharts',
  },
  scripts:
    REACT_APP_ENV === 'prod'
      ? [
          'https://unpkg.com/react@17.0.2/umd/react.production.min.js',
          'https://unpkg.com/react-dom@17.0.2/umd/react-dom.production.min.js',
          'https://unpkg.com/lodash@4.17.21/lodash.min.js',
          'https://unpkg.com/bizcharts@4.1.10/umd/BizCharts.min.js',
        ]
      : [
          'https://unpkg.com/react@17.0.2/umd/react.development.js',
          'https://unpkg.com/react-dom@17.0.2/umd/react-dom.development.js',
          'https://unpkg.com/lodash@4.17.21/lodash.js',
          'https://unpkg.com/bizcharts@4.1.10/umd/BizCharts.js',
        ],
};

type RegxConfig = {
  resource: string;
};

if (!['local', 'dev'].includes(REACT_APP_ENV || 'dev')) {
  umiConfig.chainWebpack = (config, { webpack }) => {
    config.merge({
      optimization: {
        minimize: true,
        splitChunks: {
          chunks: 'all',
          minSize: 30000,
          minChunks: 3,
          automaticNameDelimiter: '.',
          cacheGroups: {
            antd: {
              name: 'antd',
              test({ resource }: RegxConfig) {
                return /[\\/]node_modules[\\/](antd)[\\/]/.test(resource);
              },
              priority: 10,
            },
            'ant-design': {
              name: 'ant-design',
              test({ resource }: RegxConfig) {
                return /[\\/]node_modules[\\/](@ant-design)[\\/]/.test(resource);
              },
              priority: 9,
            },
            rc: {
              name: 'rc',
              test({ resource }: RegxConfig) {
                return /[\\/]node_modules[\\/](rc[\\\-\w]+)[\\/]/.test(resource);
              },
              priority: 8,
            },
            utils: {
              name: 'utils',
              test({ resource }: RegxConfig) {
                return /[\\/]node_modules[\\/](moment|lodash|antd-img-crop|(react|lodash|dnd|dom|async)[\.\\\-\w]+)[\\/]/.test(
                  resource,
                );
              },
              priority: 7,
            },
          },
        },
      },
    });
  };
}

export default defineConfig(umiConfig);
