import { library } from '@fortawesome/fontawesome-svg-core';
import { faSpinner, faMobile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import Vue from 'vue';
import Buefy from 'buefy';
import App from './App.vue';
import router from './router';
import store from './store';
import '@fortawesome/fontawesome-free/css/all.css';

import 'buefy/dist/buefy.css';

library.add(faSpinner);
library.add(faMobile);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(Buefy);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
