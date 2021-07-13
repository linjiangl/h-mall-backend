import type { IRoute } from '@umijs/core/lib/Route/types';

const DashboardRouter: IRoute[] = [
  {
    path: '/general',
    name: 'general',
    component: './Welcome',
    // routes: [
    //   {
    //     path: '/general/welcome',
    //     name: 'welcome',
    //     icon: 'icon-dashboard',
    //     component: './Welcome',
    //   },
    // ],
  },
];

export default DashboardRouter;
