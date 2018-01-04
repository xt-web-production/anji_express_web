import * as types from './mutation-types'

const makeAction = (type) => {
  return ({ commit }, ...args) => commit(type, ...args)
}
// ------------------- 更新节用户信息 -------------------------
export const update_user_info = makeAction(types.UPDATE_USER_INFO)
// ------------------- 更新节目类型索引 -------------------------
export const update_item_type = makeAction(types.UPDATE_ITEM_TYPE)
