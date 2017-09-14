/**
 * Created by Yoker.Wu on 2017/9/6.
 */

import * as types from './mutations-types'

const mutations = {
  [types.SET_LOADING_STATE] (st, state) {
    st.showLoading = state
  },
  [types.SET_USER_INFO] (st, info) {
    st.userInfo = info
  }
}

export default mutations
