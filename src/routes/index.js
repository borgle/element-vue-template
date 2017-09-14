/**
 * Created by Yoker.Wu on 2017/9/6.
 */

const ERROR401 = r => require.ensure([], () => r(require('@/pages/error/401')), 'error')
const ERROR404 = r => require.ensure([], () => r(require('@/pages/error/404')), 'error')
const ERROR403 = r => require.ensure([], () => r(require('@/pages/error/403')), 'error')

const ABOUTUS = r => require.ensure([], () => r(require('@/pages/about/overview')), 'about')
const CONTACTUS = r => require.ensure([], () => r(require('@/pages/about/contact')), 'about')
const TERMS = r => require.ensure([], () => r(require('@/pages/about/terms')), 'about')

const LOGIN = r => require.ensure([], () => r(require('@/pages/login')), 'login')

const LAYOUT = r => require.ensure([], () => r(require('@/pages/layout')), 'layout')
const DASHBOARD = r => require.ensure([], () => r(require('@/pages/dashboard')), 'layout')

const routes = [
  { path: '/401', name: 'error401', component: ERROR401 },
  { path: '/404', name: 'error404', component: ERROR404 },
  { path: '/403', name: 'error403', component: ERROR403 },

  { path: '/about/overview', name: 'overview', component: ABOUTUS },
  { path: '/about/contact', name: 'contact', component: CONTACTUS },
  { path: '/about/terms', name: 'terms', component: TERMS },

  { path: '/login', name: 'login', component: LOGIN },
  { path: '/',
    component: LAYOUT,
    icon: 'fa fa-id-card-o',
    name: 'dashboard',
    children: [
      {path: '/dashboard', name: 'dashboard_index', component: DASHBOARD, icon: 'fa fa-car'}
    ]},
  { path: '/user',
    component: LAYOUT,
    icon: 'fa fa-user',
    name: 'user',
    children: [
      {path: '/passwd', name: 'user_passwd', component: DASHBOARD, icon: 'fa fa-key'}
    ]},
  { path: '*', redirect: { name: 'error404' } }
]

export default routes
