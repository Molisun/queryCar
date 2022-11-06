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
      name: '感谢提交',
      component: resolve =>require(['@/components/thanks'],resolve)
    },
    {
      path: '/backgroundLogo',
      name: '后台日志',
      component: resolve =>require(['@/components/backgroundLogo'],resolve)
    }
  ]
})

const originalPush = VueRouter.prototype.push
const originalReplace = VueRouter.prototype.replace

VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) {
    return originalPush.call(this, location, onResolve, onReject)
  }
  return originalPush.call(this, location).catch(err => err)
}


VueRouter.prototype.replace = function push(location, onResolve, onReject) {
  if (onResolve || onReject) {
    return originalReplace.call(this, location, onResolve, onReject)
  }
  return originalReplace.call(this, location).catch(err => err)
}
