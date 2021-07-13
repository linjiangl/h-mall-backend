// router
import LoginRouter from './routes/login';
import DashboardRouter from './routes/dashboard';
import UserRouter from './routes/user';
import GoodsRouter from './routes/goods';
import OrderRouter from './routes/order';
import MessageRouter from './routes/message';
import AdminRouter from './routes/admin';
import SettingRouter from './routes/setting';

export default [
  ...LoginRouter,
  ...DashboardRouter,
  ...UserRouter,
  ...GoodsRouter,
  ...OrderRouter,
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
