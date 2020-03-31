const socket = {
  state: {
    connect: [],
    selectConnect: '0',
    showTalk: true
  },
  mutations: {
    setMessage(state, data) {
      state.connect[data.index].talkContent.push(data.content)
      state.connect = JSON.parse(JSON.stringify(state.connect))
    },
    pushConnect(state, data){
      state.connect.push(data)
    },
    unshiftConnect(state, data) {
      state.connect.splice(data, 1)
    },
    setSelectConnect(state, data){
      state.selectConnect = data
    },
    setShowTalk(state, data) {
      state.showTalk = data
    }
  },
  actions: {
    actionSetMessage({commit}, data){
      commit('setMessage', data)
    },
    actionPushConnect({commit}, data){
      commit('pushConnect', data)
    },
    actionUnshiftConnect({commit}, data){
      commit('unshiftConnect', data)
    },
    actionSetSelectConnect({commit}, data) {
      commit('setSelectConnect', data)
    },
    actionSetShowTalk({commit}, data) {
      commit('setShowTalk', data)
    }
  },
}

export default socket