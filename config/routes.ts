// router
import LoginRouter from './routes/login';
import DashboardRouter from './routes/dashboard';
// import GoodsRouter from './routes/goods';
// import OrderRouter from './routes/order';
// import UserRouter from './routes/user';
// import MessageRouter from './routes/message';
// import AdminRouter from './routes/admin';
// import SettingRouter from './routes/setting';

export default [
  ...LoginRouter,
  ...DashboardRouter,
  // ...GoodsRouter,
  // ...OrderRouter,
  // ...UserRouter,
  // ...MessageRouter,
  // ...AdminRouter,
  // ...SettingRouter,
  {
    path: '/',
    redirect: '/general',
  },
  {
    component: './404',
  },
];
