import Vue from "vue";
import Vuex from "vuex";

import Socket from './socket'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    ...Socket.state
  },
  mutations: {
    ...Socket.mutations
  },
  actions: {
    ...Socket.actions
  },
  modules: {
  }
});
