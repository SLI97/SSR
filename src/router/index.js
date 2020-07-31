import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export function createRouter() {
	return new Router({
		mode: 'history',
		fallback: false,
		scrollBehavior: () => ({y: 0}),
		routes: [
			{
				path: "/",
				redirect: "/home"
			},
			{
				path: "/home",
				name: "home",
				component: () => import("../views/Home.vue"),
			},
			{
				path: "/search/:id",
				name: "search",
				component: () => import("../views/Search.vue"),
			},
			{
				path: "/space",
				name: "space",
				component: () => import("../views/Space.vue"),
			},
		]
	})
}
