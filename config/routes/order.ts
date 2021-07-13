import type { IRoute } from '@umijs/core/lib/Route/types';

const OrderRouter: IRoute[] = [
  {
    path: '/order',
    name: 'order',
    routes: [
      {
        path: '/order',
        redirect: '/order/index',
      },
      {
        name: 'index',
        icon: 'icon-goods_light',
        path: '/order/index',
        component: './order/index',
      },
      {
        name: 'delivery',
        icon: 'icon-goods_light',
        path: '/order/delivery',
        component: './order/index/delivery',
      },
      {
        name: 'refund',
        icon: 'icon-fenlei',
        path: '/order/refund',
        component: './order/refund',
      },
      {
        name: 'invoice',
        icon: 'icon-fenlei',
        path: '/order/invoice',
        component: './order/invoice',
      },
    ],
  },
];

export default OrderRouter;
