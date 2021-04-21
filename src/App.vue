<template>
  <div id="app">
    <!-- keep-alive 跳转路由, 保存上一个路由(页面)的状态(下拉位置啊, 用户当前使用的状态)-->
    <keep-alive exclude="Detail">
      <router-view />
    </keep-alive>
    <main-tab-bar class="main-tab-bar"></main-tab-bar>
  </div>
</template>
<script>
import MainTabBar from "./components/content/mainTabbar/MainTabBar.vue";
export default {
  name: "App",
  components: { MainTabBar },
};
</script>
<style>
@import "assets/css/base.css";
</style>
