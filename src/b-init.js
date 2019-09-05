import Vue from 'vue'

import button from "bootstrap-vue/es/components/button/button"
import bform from 'bootstrap-vue/es/components/form/form'
import bformgroup from 'bootstrap-vue/es/components/form-group/form-group'
import bfcheckbox from 'bootstrap-vue/es/components/form-checkbox/form-checkbox'
import bfinput from 'bootstrap-vue/es/components/form-input/form-input'
import bftextarea from 'bootstrap-vue/es/components/form-textarea/form-textarea'
import bcontainer from 'bootstrap-vue/es/components/layout/container'
import bcol from 'bootstrap-vue/es/components/layout/col'
import brow from 'bootstrap-vue/es/components/layout/row'
import bcollapse from 'bootstrap-vue/es/components/collapse/collapse'
import dtoggle from 'bootstrap-vue/es/directives/toggle/toggle'
import bselect from 'bootstrap-vue/es/components/form-select/form-select'
import bcard from 'bootstrap-vue/es/components/card/card'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.component('b-button', button)
Vue.component('b-form', bform)
Vue.component('b-form-checkbox', bfcheckbox)
Vue.component('b-form-input', bfinput)
Vue.component('b-form-textarea', bftextarea)
Vue.component('b-form-group', bformgroup)
Vue.component('b-container', bcontainer)
Vue.component('b-col', bcol)
Vue.component('b-row', brow)
Vue.component('b-collapse', bcollapse)
Vue.directive('b-toggle', dtoggle)
Vue.component('b-form-select', bselect)
Vue.component('b-card', bcard)

