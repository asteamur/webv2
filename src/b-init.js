import Vue from 'vue'

import button from "bootstrap-vue/es/components/button/button"
import bform from 'bootstrap-vue/es/components/form/form'
import bformgroup from 'bootstrap-vue/es/components/form-group/form-group'
import bfcheckbox from 'bootstrap-vue/es/components/form-checkbox/form-checkbox'
import bfinput from 'bootstrap-vue/es/components/form-input/form-input'
import bftextarea from 'bootstrap-vue/es/components/form-textarea/form-textarea'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.component('b-button', button)
Vue.component('b-form', bform)
Vue.component('b-form-checkbox', bfcheckbox)
Vue.component('b-form-input', bfinput)
Vue.component('b-form-textarea', bftextarea)
Vue.component('b-form-group', bformgroup)
