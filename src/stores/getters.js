/**
 * Created by Yoker.Wu on 2017/9/6.
 */

import * as types from './getters-types'

const getters = {
  [types.GET_LOADING_STATE]: state => { return state.showLoading },
  [types.GET_USER_INFO]: state => { return state.userInfo }
}

export default getters
