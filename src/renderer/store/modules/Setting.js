import * as Types from '../types'
const settings = require('electron-settings')

const state = {
  timeSpan: 20
}

const mutations = {
  [Types.UPDATE_TIME_SPAN]: function (state, timeSpan) {
    timeSpan = Number.parseInt(timeSpan)
    if (Number.isInteger(timeSpan)) {
      state.timeSpan = timeSpan
      settings.set('timeSpan', timeSpan)
    }
  }
}

export default {
  state,
  mutations
}
