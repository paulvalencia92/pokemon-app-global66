import Vue from 'vue'
import Vuex from 'vuex'
import pokemons from './modules/pokemons'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    overlay: false
  },
  mutations: {
    TOGGLE_STATUS_OVERLAY(state, data) {
      state.overlay = !state.overlay;
    }
  },
  actions: {
  },
  modules: {
    pokemons
  }
})
