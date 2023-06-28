import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import(/* webpackChunkName: "Test" */ '../views/Test.vue')
  }
]

const router = new VueRouter({
  routes,
  mode: 'history', // 去掉url中的#
  base: `/${process.env.VUE_APP_PACKAGENAME}/`
})

export default router
