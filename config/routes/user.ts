import type { IRoute } from '@umijs/core/lib/Route/types';

const UserRouter: IRoute[] = [
  {
    path: '/user',
    name: 'user',
    routes: [
      {
        path: '/user',
        redirect: '/user/index',
      },
      {
        name: 'general',
        icon: 'icon-user',
        path: '/user/general',
        component: './user/index/general',
      },
      {
        name: 'index',
        icon: 'icon-user',
        path: '/user/index',
        component: './user/index',
      },
      {
        name: 'level',
        icon: 'icon-user',
        path: '/user/level',
        component: './user/level',
      },
    ],
  },
];

export default UserRouter;
