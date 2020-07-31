<template>
  <div>
    <div class="news-view">Home Page</div>
    <router-link to="/about/1" exact class="link">Jump About1</router-link>
  </div>
</template>

<script>

export default {
  name: "Home",
  data() {
    return {};
  },
  computed: {},
  methods: {},
	beforeRouteEnter(to, from, next){
  	console.log("我是home组件的路由前置钩子,当我执行完之后，才会执行onReady和beforeResolve")
		//如果我不next，路由的声明周期就跑不下去了
		next()
	},
	mounted(){
  	console.log(999)
	}
};
</script>

<style lang="stylus"></style>
