<template>
	<div>
		<div class="news-view">About haha~</div>
		<div>
			<router-link to="/" exact class="link">Jump Home</router-link>
		</div>
		<div>
			<router-link :to="'/about/' + (id === '1'?'2':'1')" exact class="link">Jump About{{id === '1'?'2':'1'}}</router-link>
		</div>
		<div class="news-view">我异步获取的数据是:{{id}}</div>
	</div>
</template>

<script>
	import {getData} from "@/api/index";
	import {mapGetters, mapState} from "vuex";
	// import mixins from "./mixin";

	export default {
		name: "About",
		// mixins: [mixins],
		data: () => ({
			loading: true,
		}),
		computed: {
			...mapGetters(["id"]),
		},
		asyncData({store, route: {params: {id},}}) {
			console.log("请求")
			return store.dispatch("GET_DATA", id);
		},
		mounted() {
			// console.log(process.env.NODE_ENV)
		}
	};
</script>

<style lang="stylus"></style>
