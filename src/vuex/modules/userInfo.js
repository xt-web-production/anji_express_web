import {UPDATE_USER_INFO, UPDATE_ITEM_TYPE} from '../mutation-types'
const state = {
  userInfo: {
    name: '安吉员工',
    img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516446371020&di=9c589e36e08314d4bda80e9349ebc6b4&imgtype=0&src=http%3A%2F%2Fimg4.duitang.com%2Fuploads%2Fitem%2F201511%2F26%2F20151126112617_vUaQf.jpeg',
    openId: `test${Math.random() * 100}`
  },
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
