import type { IRoute } from '@umijs/core/lib/Route/types';

const AdminRouter: IRoute[] = [
  {
    path: '/admin',
    name: 'admin',
    // access: 'canAdmin',
    routes: [
      {
        path: '/admin',
        redirect: '/admin/index',
      },
      {
        name: 'index',
        path: '/admin/index',
        icon: 'icon-zhanghaoquanxianguanli',
        component: './admin/index',
      },
      {
        path: '/admin/logs',
        name: 'logs',
        icon: 'icon-zhanghaoquanxianguanli',
        routes: [
          {
            path: '/admin/logs',
            redirect: '/admin/logs/login',
          },
          {
            name: 'login',
            path: '/admin/logs/login',
            component: './admin/logs/login',
          },
          {
            name: 'action',
            path: '/admin/logs/action',
            component: './admin/logs/action',
          },
        ],
      },
    ],
  },
];

export default AdminRouter;
