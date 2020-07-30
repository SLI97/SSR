import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export function createRouter() {
  return new Router({
    mode: 'history',
    fallback: false,
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      {
        path: "/",
        name: "home",
        component: () => import("../views/Home.vue"),
      },
      {
        path: "/about/:id",
        name: "about",
        component: () => import("../views/About.vue"),
      },
    ]
  })
}
