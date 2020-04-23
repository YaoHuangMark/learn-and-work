/*
 * @Author: 黄遥
 * @Date: 2020-04-22 20:02:15
 * @LastEditors: 黄遥
 * @LastEditTime: 2020-04-22 20:05:47
 * @Description: file content
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routeOptions = [
  { path: '/', name: 'home' },
  { path: '/about', name: 'about' },
  { path: '/login', name: 'login' }
]

const routes = routeOptions.map(route => {
  return {
    ...route,
    component: () => import(/* webpackChunkName: "[request]" */ `../views/${route.name}.vue`)
  }
})

const router = new VueRouter({
  routes
})

export default router