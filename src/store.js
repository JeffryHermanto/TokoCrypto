import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    nama: 'Jeffry',
    saldo: 10000000,
    listing: [],
    coins: [],
    coinsFilled: true
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
    },
    coinsFilled: state => {
      return state.coinsFilled
    }
  },
  mutations: {

  },
  actions: {

  }
})
