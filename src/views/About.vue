<!--
 * @Author: your name
 * @Date: 2020-07-30 20:54:32
 * @LastEditTime: 2020-07-30 23:38:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \SSR\src\views\About.vue
--> 
<template>
  <div>
    <div class="news-view">About haha~</div>
    <router-link to="/" exact>Jump Home</router-link>
    <div class="news-view">我异步获取的数据是:{{id}}</div>
  </div>
</template>

<script>
import { getData } from "@/api/index";
import { mapGetters, mapState } from "vuex";

export default {
  name: "About",
  data: () => ({
    loading: true,
  }),
  computed: {
    ...mapGetters(["id"]),
    // id() {
    //   return this.$store.getters.id;
    // },
  },
  asyncData({
    store,
    route: {
      params: { id },
    },
  }) {
    return store.dispatch("GET_DATA", id);
  },
  mounted() {
    // console.log(this.$store)
  },
};
</script>

<style lang="stylus"></style>
