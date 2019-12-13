import Vue from 'vue';
import App from '@/App.vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueApollo from 'vue-apollo';
import {ApolloClient} from 'apollo-client';
import {ApolloLink} from 'apollo-link';
import {createHttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import router from '@/router';
import store from '@/store';

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: 'http://nanshan.fun/fc2pro/q',
});

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  const token = store.state.user && store.state.user.token;
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : null,
    },
  });

  return forward(operation);
});

// Cache implementation
const cache = new InMemoryCache();

// Create the apollo client
const apolloClient = new ApolloClient({
  link: authMiddleware.concat(httpLink),
  cache,
});

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VueApollo);

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  router,
  store,
  apolloProvider,
}).$mount('#app');
