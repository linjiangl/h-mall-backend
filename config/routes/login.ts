import type { IRoute } from '@umijs/core/lib/Route/types';
import { getEnvConfig } from '../../src/utils/env';

const envConfig = getEnvConfig();

const LoginRouter: IRoute[] = [
  {
    path: envConfig.loginUrl,
    layout: false,
    routes: [
      {
        name: 'login',
        path: envConfig.loginUrl,
        component: './user/Login',
      },
    ],
  },
];

export default LoginRouter;
