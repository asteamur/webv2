import Vue from 'vue'
import Vuex from 'vuex'
import api from './apify'

Vue.use(Vuex)

const tea = api('http://localhost:3000/tea')

export default new Vuex.Store({
  modules: {
    tea
  },
  state: {
    msg: null
  },
  mutations: {
    toast(state){
      state.msg = null
    }
  }
})
