import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    logs: [{
      text: 'Initial log',
      icon: 'mdi-info',
      color: 'info'
    }]
  },
  getters: {
    getLogs(state) {
      return state.logs
    }
  },
  mutations: {
    pushLog(state, log) {
      state.logs.unshift(log)
    }
  },
  actions: {
    pushLog({commit}, log) {
      commit('pushLog', log)
    }
  },
  modules: {
  }
})
