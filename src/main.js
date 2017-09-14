/**
 * Created by Yoker.Wu on 2017/9/6.
 */

import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

import App from './App'
import routes from './routes'
import * as filters from './filters'
import { mtypes, stores } from './stores'
import { localStorage } from './common'

import axios from 'axios'
import VueFilter from 'vue-filter'
import ElementUI from 'element-ui'

import 'element-ui/lib/theme-default/index.css'
import 'font-awesome/css/font-awesome.min.css'
import './assets/css/base.css'

Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(VueFilter)
Vue.use(ElementUI)

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

const store = new Vuex.Store(stores)

const router = new VueRouter({
  mode: 'hash',
  base: __dirname,
  routes
})
router.beforeEach((to, from, next) => {
  let userInfo = localStorage.get('userinfo')
  if (to.meta['needAuth']) {
    if (userInfo === null) {
      next('/503')
    }
  }
  store.commit(mtypes.SET_LOADING_STATE, true)
  next()
})

router.afterEach(route => {
  store.commit(mtypes.SET_LOADING_STATE, false)
})

// 添加一个请求拦截器
axios.interceptors.request.use(function (config) {
  if (!config.params) {
    config.params = {}
  }
  config.params['_'] = (new Date()).getTime()
  return config
}, function (error) {
  return Promise.reject(error)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
