// router
import LoginRouter from './module/login';
import DashboardRouter from './module/dashboard';
import GoodsRouter from './module/goods';
import OrderRouter from './module/order';
import UserRouter from './module/user';
import MessageRouter from './module/message';
import AdminRouter from './module/admin';
import SettingRouter from './module/setting';

export default [
  ...LoginRouter,
  ...DashboardRouter,
  ...GoodsRouter,
  ...OrderRouter,
  ...UserRouter,
  ...MessageRouter,
  ...AdminRouter,
  ...SettingRouter,
  {
    path: '/',
    redirect: '/general',
  },
  {
    component: './404',
  },
];
