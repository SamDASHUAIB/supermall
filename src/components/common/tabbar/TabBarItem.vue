<template>
  <div @click="itemClick" class="tab-bar-item">
    <!-- slot 插槽, 一类组件, 不同的定制 -->
    <slot v-if="!isActive" name="item-icon"></slot>
    <slot v-else name="item-icon-active"></slot>
    <!-- 不要在 slot 中绑定动态 class, 因为 slot 整个都会被替换掉, 当然 slot 上的 class 也没了 -->
    <!-- 在外面包一层 div 将动态绑定的 :class 添加在 div 上就好了 -->
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "TabBarItem",
  props: {
    path: String,
    activeColor: {
      type: String,
      default: "red",
    },
  },
  data() {
    return {
      // isActive: true
    };
  },
  methods: {
    itemClick() {
      // 路由跳转
      this.$router.push(this.path);
    },
  },
  computed: {
    isActive() {
      // 判断是否处于活跃状态, 活跃路由 $route 与 当前路由 this.path(组件调用处, 传递到 props)
      return this.$route.path.includes(this.path);
    },
    activeStyle() {
      return this.isActive ? { color: this.activeColor, fontSize: "20px" } : {};
    },
  },
};
</script>
<style scoped>
.tab-bar-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 49px;
  font-size: 14px;
}
.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  margin-bottom: 3px;
}
</style>
