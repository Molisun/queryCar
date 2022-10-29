import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import queryInfo from "../components/queryInfo";
import logo from "../components/logo";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      component: HelloWorld
    },
    {
      path: '/queryInfo',
      name: '查询信息',
      component: queryInfo
    },
    {
      path: '/logo',
      name: '后台日志',
      component: logo
    }
  ]
})
