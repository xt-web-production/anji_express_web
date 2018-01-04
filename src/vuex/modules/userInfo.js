import {UPDATE_USER_INFO, UPDATE_ITEM_TYPE} from '../mutation-types'
const state = {
  userInfo: {},
  itemType: 1
}

const mutations = {
  //更新用户信息
  [UPDATE_USER_INFO](state, params) {
    state.userInfo = params
  },
  //更新节目类型索引
[UPDATE_ITEM_TYPE](state, val = 1) {
  state.itemType = val
}
}

export default {
  state,
  mutations
}
