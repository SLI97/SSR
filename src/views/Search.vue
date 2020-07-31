<template>
	<div>
		<div class="news-view">Space Page</div>
		<div class="news-view">我是搜索页面</div>
		<div class="news-view">数据：{{searchData}}</div>
		<div>
			<router-link to="/home" exact class="link">Jump Home</router-link>
		</div>
		<div>
			<router-link to="/space" exact class="link">Jump Space</router-link>
		</div>
		<input type="text" v-model="formData">
		<div @click="search">查询</div>
	</div>
</template>

<script>
	import {getSearchData} from "@/api/index";
	import {mapGetters, mapState} from "vuex";
	// import mixins from "./mixin";

	export default {
		name: "Search",
		// mixins: [mixins],
		data: () => ({
			loading: true,
			formData: '',
		}),
		computed: {
			...mapGetters(["searchData"]),
		},
		watch: {
			searchData(newVal, oldVal) {
				this.formData = newVal
			}
		},
		// beforeRouteUpdate(to, from, next) {
		// 	this.formData = this.searchData
		// 	//如果我不next，路由的声明周期就跑不下去了
		// 	next()
		// },
		asyncData({store, route: {params: {id},}}) {
			console.log("搜索请求")
			return store.dispatch("GET_SEARCH_DATA", id);
		},
		mounted() {
			this.formData = this.searchData
			// console.log(process.env.NODE_ENV)
		},
		methods: {
			search() {
				if(this.formData === this.searchData){
					return
				}
				this.$router.push({path: '/search/' + this.formData})
			}
		}
	};
</script>

<style lang="stylus"></style>
