import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: () => import(/* webpackChunkName: "ChannelShow" */ './Login')

    },
    {
      path: '/apply',
      name: 'Apply',
      component: () => import(/* webpackChunkName: "ChannelShow" */ './Apply')

    },
    {
      path: '/detail',
      name: 'Home',
      component: () => import(/* webpackChunkName: "ChannelShow" */ './Home')
    }
  ]
})
