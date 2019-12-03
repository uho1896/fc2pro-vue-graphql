import store from '@/store';

/**
 * @param {String} to
 * @param {String} from
 * @param {Function} next
 * @return {Promise}
 */
export function beforeEnter(to, from, next) {
  const user = store.state.user && store.state.user.user;

  if (user.email) {
    return next();
  } else {
    return next('/user/login');
  }
};

/**
 * @param {String} to
 * @param {String} from
 * @param {Function} next
 * @return {Promise}
 */
export function beforeEnterAdmin(to, from, next) {
  const user = store.state.user && store.state.user.user;

  if (user.role >= 100) {
    return next();
  } else {
    return next(false);
  }
};
