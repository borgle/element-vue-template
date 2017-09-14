/**
 * Created by Yoker.Wu on 2017/9/6.
 */

// 引入模块
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import state from './states'

// 引入定义
import * as atypes from './actions-types'
import * as gtypes from './getters-types'
import * as mtypes from './mutations-types'

const stores = {
  state,
  getters,
  actions,
  mutations
}

export {
  atypes,
  gtypes,
  mtypes,
  stores
}
