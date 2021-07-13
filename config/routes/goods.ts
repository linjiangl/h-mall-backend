import type { IRoute } from '@umijs/core/lib/Route/types';

const GoodsRouter: IRoute[] = [
  {
    path: '/goods',
    name: 'goods',
    routes: [
      {
        path: '/goods',
        redirect: '/goods/index',
      },
      {
        name: 'index',
        icon: 'icon-goods_light',
        path: '/goods/index',
        routes: [
          {
            path: '/goods/index',
            component: './goods/index',
          },
          {
            name: 'add',
            path: '/goods/index/add',
            component: './goods/index/add',
            hideInMenu: true,
          },
          {
            name: 'edit',
            path: '/goods/index/edit',
            component: './goods/index/edit',
            hideInMenu: true,
          },
        ],
      },
      {
        name: 'stock',
        icon: 'icon-goods_light',
        path: '/goods/stock',
        component: './goods/index/stock',
      },
      {
        name: 'category',
        icon: 'icon-fenlei',
        path: '/goods/category',
        component: './goods/category',
      },
      {
        name: 'brand',
        icon: 'icon-fenlei',
        path: '/goods/brand',
        component: './goods/brand',
      },
      {
        name: 'spec',
        icon: 'icon-goods_light',
        path: '/goods/spec',
        component: './goods/spec',
      },
      {
        name: 'service',
        icon: 'icon-goods_light',
        path: '/goods/service',
        component: './goods/service',
      },
      {
        name: 'parameter',
        icon: 'icon-goods_light',
        path: '/goods/parameter',
        component: './goods/parameter',
      },
      {
        name: 'parameterOptions',
        icon: 'icon-goods_light',
        path: '/goods/parameter/options',
        component: './goods/parameter/options',
        hideInMenu: true,
      },
      {
        name: 'appraises',
        icon: 'icon-goods_light',
        path: '/goods/appraises',
        component: './goods/appraises',
      },
      {
        name: 'aftersale',
        icon: 'icon-goods_light',
        path: '/goods/aftersale',
        component: './goods/index/aftersale',
      },
      {
        name: 'recycle',
        icon: 'icon-goods_light',
        path: '/goods/recycle',
        component: './goods/index/recycle',
      },
    ],
  },
];

export default GoodsRouter;
