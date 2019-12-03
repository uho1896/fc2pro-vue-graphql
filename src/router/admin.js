import layout from '@/components/layout/layout';
import {beforeEnterAdmin} from '@/utils/routeGuard';

export default {
  path: '/admin',
  component: layout,
  meta: {title: 'Admin'},
  redirect: '/admin/userList',
  children: [
    {
      path: 'userList',
      name: 'admin_userList',
      meta: {title: 'User List', cache: false},
      component: (resolve) => require(['@/components/admin/userList'], resolve),
      beforeEnter: beforeEnterAdmin,
    },
  ],
};
