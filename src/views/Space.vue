<template>
	<div>
		<div class="news-view">Space Page</div>
		<div class="news-view">我是个人空间</div>
		<div class="news-view">数据：{{spaceData}}</div>
		<div>
			<router-link to="/home" exact class="link">Jump Home</router-link>
		</div>
		<div>
			<router-link to="/search/1" exact class="link">Jump Search</router-link>
		</div>
	</div>
</template>

<script>
	import {getSpaceData} from "@/api/index";
	import {mapGetters, mapState} from "vuex";

	export default {
		name: "Space",
		data() {
			return {};
		},
		computed: {
			...mapGetters(["spaceData"]),
		},
		methods: {},
		beforeRouteEnter(to, from, next) {
			console.log("我是space组件的路由前置钩子,当我执行完之后，才会执行onReady和beforeResolve")
			//如果我不next，路由的声明周期就跑不下去了
			next()
		},
		asyncData({store}) {
			console.log("空间请求")
			return store.dispatch("GET_SPACE_DATA");
		},
		mounted() {
		}
	};
</script>

<style lang="stylus"></style>
