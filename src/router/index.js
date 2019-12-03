import Vue from 'vue';
import VueRouter from 'vue-router';
import home from '@/router/home';
import user from '@/router/user';
import admin from '@/router/admin';

Vue.use(VueRouter);

export const routes = [
  home,
  user,
  admin,
];

export default new VueRouter({
  mode: 'history',
  scrollBehavior: () => ({y: 0}),
  routes,
});
