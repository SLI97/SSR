import Vue from 'vue'
import 'es6-promise/auto'
import {createApp} from './app'
import ProgressBar from './components/ProgressBar.vue'

//采用服务端渲染
//www.bilibili.com
//search.bilibili.com
//live.bilibili.com
//game.bilibili.com
//account.bilibili.com

//客户端渲染
//space.bilibili.com
//t.bilibili.com
//message.bilibili.com
//member.bilibili.com
//show.bilibili.com
//bw.bilibili.com
//app.bilibili.com

// global progress bar
const bar = Vue.prototype.$bar = new Vue(ProgressBar).$mount()
document.body.appendChild(bar.$el)

const {app, router, store} = createApp()

// prime the store with server-initialized state.
// the state is determined during SSR and inlined in the page markup.
if (window.__INITIAL_STATE__) {
	store.replaceState(window.__INITIAL_STATE__)
}

//当点击切换路由时：
// beforeRouterLeave
// -->beforeEach  全局路由的前置拦截
// -->beforeEnter 进入全局钩子
// -->beforeRouteEnter 进入子组件路由钩子
// -->beforeResolve   子组件路由解析完成钩子
// -->afterEach    全局路由的后置拦截
// -->beforeCreate
// -->created
// -->beforeMount
// -->mounted
// -->beforeRouteEnter的next的回调

//开发环境使用这种方案，解决由于在app.js中，router已经挂载了，router的各种钩子不在触发
if (process.env.NODE_ENV === 'development') {
	app.$mount('#app')

	//他会为所有的组件都加上这个方法，包括第三方或者内置组件，不过测试环境无所谓了
	Vue.mixin({
		beforeMount() {
			const {asyncData} = this.$options
			if (asyncData) {
				console.log("beforeMount-asyncData")
				// 将获取数据操作分配给 promise
				// 以便在组件中，我们可以在数据准备就绪后
				// 通过运行 `this.dataPromise.then(...)` 来执行其他任务
				this.dataPromise = asyncData({
					store: this.$store,
					route: this.$route
				})
			}
		}
	})
} else {
	// wait until router has resolved all async before hooks
	// and async components...
	//所有的路由前置钩子完成后才会执行
	router.onReady(() => {
		console.log("onReady")
		// Add router hook for handling asyncData.
		// Doing it after initial route is resolved so that we don't double-fetch
		// the data that we already have. Using router.beforeResolve() so that all
		// async components are resolved.
		//当前路由的异步组件被解析完成时触发
		router.beforeResolve((to, from, next) => {
			//在路由导航之前解析数据
			console.log("beforeResolve")
			const matched = router.getMatchedComponents(to)
			const prevMatched = router.getMatchedComponents(from)
			let diffed = false
			const activated = matched.filter((c, i) => {
				return diffed || (diffed = (prevMatched[i] !== c))
			})
			const asyncDataHooks = activated.map(c => c.asyncData).filter(_ => _)
			if (!asyncDataHooks.length) {
				return next()
			}

			bar.start()
			Promise.all(asyncDataHooks.map(hook => hook({store, route: to})))
				.then(() => {
					bar.finish()
					next()
				})
				.catch(next)
		})

		// actually mount to DOM
		app.$mount('#app')
	})
}


// a global mixin that calls `asyncData` when a route component's params change
//开发环境和生产环境都需要的配置，仅在组件被复用。但是路由发生了改变时触发，如动态路由
Vue.mixin({
	beforeRouteUpdate(to, from, next) {
		console.log("beforeRouteUpdate")
		const {asyncData} = this.$options
		if (asyncData) {
			asyncData({
				store: this.$store,
				route: to
			}).then(next).catch(next)
		} else {
			next()
		}
	}
})


