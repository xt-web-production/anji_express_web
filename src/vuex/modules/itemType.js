import {UPDATE_ITEM_TYPE} from '../mutation-types'
const state = {
  itemType: 1
}

const mutations = {
  //更新节目类型索引
  [UPDATE_ITEM_TYPE](state, val = 1) {
    state.itemType = val
  }
}

export default {
  state,
  mutations
}
