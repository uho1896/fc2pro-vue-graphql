import layout from '@/components/layout/layout';
import {beforeEnter} from '@/utils/routeGuard';

export default {
  path: '/user',
  component: layout,
  meta: {title: 'User'},
  redirect: '/user/login',
  children: [
    {
      path: 'login',
      name: 'user_login',
      meta: {title: 'Login', cache: false},
      component: (resolve) => require(['@/components/user/login'], resolve),
    },
    {
      path: 'register',
      name: 'user_register',
      meta: {title: 'Register', cache: false},
      component: (resolve) => require(['@/components/user/register'], resolve),
    },
    {
      path: 'activate',
      name: 'user_activate',
      meta: {title: 'Activate', cache: false},
      component: (resolve) => require(['@/components/user/activate'], resolve),
    },
    {
      path: 'forgetPwd',
      name: 'user_forgetPwd',
      meta: {title: 'Forget Password', cache: false},
      component: (resolve) => require(['@/components/user/forgetPwd'], resolve),
    },
    {
      path: 'resetPwd',
      name: 'user_resetPwd',
      meta: {title: 'Reset Password', cache: false},
      component: (resolve) => require(['@/components/user/resetPwd'], resolve),
      beforeEnter,
    },
  ],
};
