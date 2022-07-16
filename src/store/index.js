import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    logs: [{
      text: 'Initial log',
      icon: 'mdi-info',
      color: 'info'
    }],
    guests: []
  },
  getters: {
    getLogs(state) {
      return state.logs
    },
    getGuests(state) {
      return state.guests
    },
    getMoney(state) {
      let money = 0
      state.guests.forEach((item) => {
        if (item.payment) {
          let inc = 0
          switch (item.room_type) {
            case 1:
              inc = 3500
              break
            case 2:
              inc = 4500
              break
            case 3:
              inc = 6000
              break
          }
          money += inc
        }

      })
      console.log(money)
      return money
    },
    getStatistics(state) {
      let c1 = 0, c2 = 0, c3 = 0
      state.guests.forEach((item) => {
        if (item.payment) {
          switch (item.room_type) {
            case 1:
              c1++
              break
            case 2:
              c2++
              break
            case 3:
              c3++
              break
          }
        }
      })
      return [c1, (c1+c2)/2-3, c2, (c3+c2)/2-3, c3]
    }
  },
  mutations: {
    postLog(state, log) {
      state.logs.unshift(log)
    },
    getLogs(state, items) {
      state.logs = items
    },
    getGuests(state, items) {
      state.guests = items
    },
    postGuest(state, item) {
      state.guests.push(item)
    },
    editGuest(state, item) {
      Object.assign(state.guests[state.guests.findIndex(x=>x.tgId == item.tgId)], item)
    },
    deleteGuest(state, index) {
      state.guests.splice(index, 1)
    },
  },
  actions: {
    async loadGuests({ commit }) {
      let items = await axios.get('http://localhost:3000/getGuests')
      commit('getGuests', items.data)
    },
    async deleteItem({commit}, index) {
      await axios.delete(`http://localhost:3000/deleteGuest/${index}`)
      commit('deleteGuest', index)
    },
    async putItem({commit}, item) {
      await axios.put('http://localhost:3000/editGuest', item)
      commit('editGuest', item)
    },
    async postItem({commit}, item) {
      await axios.post('http://localhost:3000/postGuest', item)
      commit('postGuest', item)
    },
    async loadLogs({ commit }) {
      let items = await axios.get('http://localhost:3000/getLogs')
      commit('setLogs', items.data)
    },
    async postLog({commit}, log) {
      await axios.post('http://localhost:3000/postLog', log)
      commit('postLog', log)
    },
  },
  modules: {
  }
})
