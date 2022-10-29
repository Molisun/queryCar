import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import queryInfo from "../components/queryInfo";
import logo from "../components/logo";
import thanks from "@/components/thanks";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      component: home
    },
    {
      path: '/queryInfo',
      name: '查询信息',
      component: queryInfo
    },
    {
      path: '/thanks',
      name: '查询信息',
      component: thanks
    },
    {
      path: '/logo',
      name: '后台日志',
      component: logo
    }
  ]
})
