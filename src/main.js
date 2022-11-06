// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'; //样式文件需要单独引入。

import store from './store'
import Vuex from 'vuex'
import constants from './Constants'

Vue.config.productionTip = false
Vue.prototype.$Constants = constants
// Vue.use(ElementUI)
Vue.use(Vuex)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
