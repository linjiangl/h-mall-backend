import type { IRoute } from '@umijs/core/lib/Route/types';

const MessageRouter: IRoute[] = [
  {
    path: '/message',
    name: 'message',
    routes: [
      {
        path: '/message',
        redirect: '/message/index',
      },
      {
        name: 'index',
        icon: 'message',
        path: '/message/index',
        component: './message/index',
      },
      {
        name: 'remind',
        icon: 'message',
        path: '/message/remind',
        component: './message/remind',
      },
    ],
  },
];

export default MessageRouter;
