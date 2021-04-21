<template>
  <div class="goods-item" @click="itemClick">
    <!-- 图片加载完成 @load -->
    <img @load="imgLoad" class="good-img" :src="showImage" alt="" />
    <div class="goods-info">
      <p>{{ good.title }}</p>
      <span class="price">{{ good.price }}</span>
      <span class="collect">{{ good.cfav }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "GoodsListItem",
  props: {
    good: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    imgLoad() {
      // 方案一: 为每个路由(Home Detail ...) 设置一个专门的监听事件
      // if (this.$route.path.includes("/home")) {
      //   this.$bus.$emit("goodItemImageLoad");
      // } else if (this.$route.path.includes("/detail")) {
      //   this.$bus.$emit("detailGoodItemImageLoad");
      // }
      this.$bus.$emit("goodItemImageLoad");
    },
    itemClick() {
      // console.log("跳转详情");
      // 动态路由 /detail/xxx 形式
      this.$router.push("/detail/" + this.good.iid);
    },
  },
  computed: {
    showImage() {
      return this.good.image || this.good.show.img;
    },
  },
};
</script>
<style scoped>
.goods-item {
  padding-bottom: 40px;
  position: relative;

  width: 48%; /* 给定宽度, 一行两个 */
}

.goods-item img {
  width: 100%;
  border-radius: 5px;
}

.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.goods-info p {
  /* 单行文本省略 */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}

.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods-info .collect {
  position: relative;
}

/* 收藏图标, 伪元素 */
.goods-info .collect::before {
  margin-top: 1px;
  content: "";
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>
