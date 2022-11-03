// import Vue from 'vue'
// import Router from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: '首页',
      component: resolve =>require(['@/components/home'],resolve)
    },
    {
      path: '/queryInfo',
      name: '查询信息',
      component: resolve =>require(['@/components/queryInfo'],resolve)
    },
    {
      path: '/thanks',
      name: '查询信息',
      component: resolve =>require(['@/components/logo'],resolve)
    },
    {
      path: '/logo',
      name: '后台日志',
      component: resolve =>require(['@/components/thanks'],resolve)
    }
  ]
})
