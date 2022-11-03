// import Vue from 'vue'
// import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    info: {},
  },
  getters: {
    getInfo(state) {
      return state.info
    }
  },
  mutations: {
    setInfo(state, payload) {
      state.info = payload
    }
  },
  actions: {
  }
})

export default store
