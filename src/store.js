import Vue from 'vue'
import Vuex from 'vuex'
import api from './apify'

Vue.use(Vuex)

const tea = api('http://localhost:3000/tea')
const memorandum = api('http://localhost:3000/memorandum', ()=>{
  return {text: '', date: new Date()}
})

export default new Vuex.Store({
  modules: {
    tea,
    memorandum
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
