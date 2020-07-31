<template>
	<div>
		<div class="news-view">Home Page</div>
		<div class="news-view">我是首页</div>
		<div class="news-view">数据：{{homeData}}</div>
		<div>
			<router-link to="/search/1" exact class="link">Jump Search</router-link>
		</div>
		<div>
			<router-link to="/space" exact class="link">Jump Space</router-link>
		</div>
	</div>
</template>

<script>
	import {getHomeData} from "@/api/index";
	import {mapGetters, mapState} from "vuex";

	export default {
		name: "Home",
		data() {
			return {};
		},
		computed: {
			...mapGetters(["homeData"]),
		},
		methods: {},
		beforeRouteEnter(to, from, next) {
			console.log("我是home组件的路由前置钩子,当我执行完之后，才会执行onReady和beforeResolve")
			//如果我不next，路由的声明周期就跑不下去了
			next()
		},
		asyncData({store}) {
			console.log("首页请求")
			return store.dispatch("GET_HOME_DATA");
		},
		mounted() {
		}
	};
</script>

<style lang="stylus"></style>
