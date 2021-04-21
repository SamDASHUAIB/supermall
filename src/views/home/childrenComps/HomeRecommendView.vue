<template>
  <div class="recommend">
    <div class="recommend-item" v-for="item in recommend" :key="item.title">
      <a :href="item.link">
        <img :src="item.image" alt="" />
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>
<script>
export default {
  name: "HomeRecommendView",
  props: {
    recommend: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>
<style scoped>
.recommend {
  display: flex;
  width: 100%;
  font-size: 12px;
  padding: 15px 0 30px 0;
  border-bottom: 8px solid #eee;
}
.recommend-item {
  flex: 1;
  text-align: center;
}
.recommend-item img {
  height: 70px;
  width: 70px;
  margin-bottom: 10px;
}
</style>
