import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'lib-flexible/flexible'
Vue.config.productionTip = false
import {
  Stepper,
} from 'vant';
Vue.use(Stepper);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')