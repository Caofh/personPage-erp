// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import store from './store/index'
import App from './App'

Vue.config.productionTip = false

router.afterEach((to,from,next) => {

  // 获取用户基本信息
  store.dispatch('init', to)

})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
