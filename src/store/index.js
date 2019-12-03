import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import user from '@/store/user';

Vue.use(Vuex);

const localStore = new VuexPersistence({
  storage: window.localStorage,
  reducer: (state) => ({user: state.user}),
});

export default new Vuex.Store({
  modules: {
    user,
  },
  plugins: [localStore.plugin],
});
