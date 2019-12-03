const state = {
  token: null,
  user: {},
};

const mutations = {
  SETTOKEN(state, token) {
    state.token = token;
  },
  SETUSER(state, user) {
    state.user = user;
  },
};

const actions = {
  setToken({commit}, token) {
    commit('SETTOKEN', token);
  },
  setUser({commit}, user) {
    commit('SETUSER', user);
  },
  logout: ({commit}) => {
    commit('SETTOKEN', '');
    commit('SETUSER', {});
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
