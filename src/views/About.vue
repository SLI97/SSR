<template>
  <div>
    <div class="news-view">About haha~</div>
    <router-link to="/" exact>Jump Home</router-link>
    <div class="news-view">我异步获取的数据是:{{id}}</div>
  </div>
</template>

<script>
import { getData } from "@/api/index";

export default {
  name: "About",
  data: () => ({
    loading: true,
  }),
  computed: {
    id() {
      return this.$store.state.id;
    },
  },
  asyncData({
    store,
    route: {
      params: { id },
    },
  }) {
    console.log(1123)
    return store.dispatch("FETCH_DATA", id);
  },
};
</script>

<style lang="stylus"></style>
