import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  }
  // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
];

const router = new VueRouter({
  routes,
  mode: "history", // 去掉url中的#
  base: `/${process.env.VUE_APP_PACKAGENAME}/`
});

export default router;
