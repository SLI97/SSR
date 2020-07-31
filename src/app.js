import Vue from 'vue'
import App from './App.vue'
import {createStore} from './store'
import {createRouter} from './router'
import {sync} from 'vuex-router-sync'
// import titleMixin from './util/title'
// import * as filters from './util/filters'

// mixin for handling title
// Vue.mixin(titleMixin)

// register global utility filters.
// Object.keys(filters).forEach(key => {
//   Vue.filter(key, filters[key])
// })

// Expose a factory function that creates a fresh set of store, router,
// app instances on each call (which is called for each SSR request)
export function createApp() {
	// create store and router instances
	const store = createStore()
	const router = createRouter()

	// sync the router with the vuex store.
	// this registers `store.state.route`
	sync(store, router)

	// create the app instance.
	// here we inject the router, store and ssr context to all child components,
	// making them available everywhere as `this.$router` and `this.$store`.
	//当router已经挂载vue上时，他的一堆钩子都不会再触发了，这样会导致第一次进页面时无法触发钩子
	const app = new Vue({
		router,
		store,
		render: h => h(App)
	})

	// expose the app, the router and the store.
	// note we are not mounting the app here, since bootstrapping will be
	// different depending on whether we are in a browser or on the server.
	return {app, router, store}
}

const lifecycle = {
	1: {desc: "网页重定向的耗时", key: "redirect", value: 0},
	2: {desc: "检查本地缓存的耗时", key: "cache", value: 5},
	3: {desc: "DNS查询的耗时", key: "dns", value: 5},
	4: {desc: "TCP连接的耗时", key: "tcp", value: 5},
	5: {desc: "客户端发起请求的耗时", key: "request", value: 5},
	6: {desc: "服务端响应的耗时", key: "response", value: 5},
	7: {desc: "渲染页面的耗时", key: "render", value: 5},
}
