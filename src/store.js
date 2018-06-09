import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    nama: 'Jeffry',
    saldo: 10000000,
    listing: [],
    coins: []
  },
  getters: {
    listing: state => {
      return state.listing
    },
    nama: state => {
      return state.nama
    },
    saldo: state => {
      return state.saldo
    },
    coins: state => {
      return state.coins
    }
  },
  mutations: {

  },
  actions: {

  }
})
