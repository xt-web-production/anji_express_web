import * as types from './mutation-types'

const makeAction = (type) => {
  return ({ commit }, ...args) => commit(type, ...args)
}
// ------------------- 更新节目类型索引 -------------------------
export const update_item_type = makeAction(types.UPDATE_ITEM_TYPE)
