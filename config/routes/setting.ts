import type { IRoute } from '@umijs/core/lib/Route/types';

const AdminRouter: IRoute[] = [
  {
    path: '/setting',
    name: 'setting',
    routes: [
      {
        path: '/setting',
        redirect: '/setting/basic',
      },

      // 基础配置
      {
        name: 'basic',
        icon: 'icon-zhanghaoquanxianguanli',
        path: '/setting/basic',
        routes: [
          {
            path: '/setting/basic',
            redirect: '/setting/basic/site',
          },
          {
            name: 'site',
            path: '/setting/basic/site',
            component: './setting/basic/site',
          },
          {
            name: 'copyright',
            path: '/setting/basic/copyright',
            component: './setting/basic/copyright',
          },
        ],
      },

      // 订单配置
      {
        name: 'order',
        icon: 'icon-zhanghaoquanxianguanli',
        path: '/setting/order',
        routes: [
          {
            path: '/setting/order',
            redirect: '/setting/order/index',
          },
          {
            name: 'index',
            path: '/setting/order/index',
            component: './setting/order',
          },
        ],
      },

      // 物流配置
      {
        name: 'express',
        icon: 'icon-zhanghaoquanxianguanli',
        path: '/setting/express',
        routes: [
          {
            path: '/setting/express',
            redirect: '/setting/express/index',
          },
          {
            name: 'index',
            path: '/setting/express/index',
            component: './setting/express',
          },
          {
            name: 'company',
            path: '/setting/express/company',
            component: './setting/express/company',
          },
        ],
      },
    ],
  },
];

export default AdminRouter;
