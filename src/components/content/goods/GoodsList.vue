<template>
  <div class="goods">
    <goods-list-item
      v-for="(item, index) in goods"
      :key="index"
      :good="item"
    ></goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem.vue";
export default {
  name: "GoodsList",
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    GoodsListItem,
  },
};
</script>
<style scoped>
.goods {
  display: flex;
  flex-wrap: wrap; /* 允许换行 */
  justify-content: space-around; /* 项目之间间隔相等 */
  padding: 2px;
}
</style>
