import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
import config from "../config";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    logs: [{
      text: 'Initial log',
      icon: 'mdi-info',
      color: 'info'
    }],
    guests: [],
    tickets: []
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
        if (item.isPaid) {
          let inc = 0;
          switch (item.room) {
            case 'Economy':
              inc = 3800
              break
            case 'Base':
              inc = 4100
              break
          }
          inc += 200 * item.waveNumber
          money += inc
        }

      })
      console.log(money)
      return money
    },
    getStatistics(state) {
      let c1 = 0, c2 = 0, c3 = 0, c4 = 0
      state.guests.forEach((item) => {
        if (item.isPaid) {
          switch (item.room) {
            case 'Economy':
              c1++
              break
            case 'Base':
              c2++
              break
            case 'Comfort':
              c3++
              break
            case 'Business':
              c4++
              break
          }
        }
      })
      // return [c1, (c1+c2)/2-2, c2, (c3+c2)/2-2, c3, (c4+c3)/2-2, c4]
      return [c1, 0, c2]
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
      Object.assign(state.guests[state.guests.findIndex(x=>x.id == item.id)], item)
    },
    deleteGuest(state, index) {
      state.guests.splice(index, 1)
    },
    getTickets(state, items) {
      state.tickets = items
    }
  },
  actions: {
    async loadGuests({ commit }) {
      let items = await axios.get('http://'+ config.backend_container +'/v1/guests')
      commit('getGuests', items.data.guests)
    },
    async deleteItem({commit}, data) {
      await axios.delete('http://'+ config.backend_container +'/v1/guest/' + data.item.id)
      commit('deleteGuest', data.index)
    },
    async putItem({commit}, item) {
      await axios.patch('http://'+ config.backend_container +'/v1/guest', {guest: item})
      commit('editGuest', item)
    },
    async postItem({commit}, item) {
      await axios.post('http://'+ config.backend_container +'/v1/guest', item)
      commit('postGuest', item)
    },
    async sendMessage({commit}, data) {
      console.log({personId: data.target, message: data.message})
      await axios.post('http://'+ config.bot_container +'/v1/send', {personId: data.target, message: data.message})
    },
    async sendAccept({commit}, data) {
      console.log({personID: data.target})
      //await axios.post('http://'+ config.bot_container +'/v1/accept', {personID: data.target})
    },
  },
  modules: {
  }
})
