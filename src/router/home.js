import layout from '@/components/layout/layout';
import {beforeEnter} from '@/utils/routeGuard';

export default {
  path: '/',
  component: layout,
  meta: {title: 'Home'},
  redirect: '/index',
  children: [
    {
      path: 'index',
      name: 'home',
      meta: {title: 'Home', cache: true},
      component: (resolve) => require(['@/components/home/index'], resolve),
      beforeEnter: beforeEnter,
    },
  ],
};
