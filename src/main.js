import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { extend, ValidationProvider, ValidationObserver } from 'vee-validate'
import { required, email } from 'vee-validate/dist/rules'
import './b-init'

Vue.config.productionTip = false

extend('required', required)
extend('email', email)

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
