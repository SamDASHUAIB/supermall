<template>
  <!-- ref 明确拿到某一个组件或者元素的 DOM 对象 -->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import BetterScroll from "better-scroll";
export default {
  name: "Scroll",
  props: {
    // 配置项
    probeType: {
      type: Number,
      default() {
        return 0;
      },
    },
    pullUpLoad: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  data() {
    return {
      scroll: null,
    };
  },
  mounted() {
    // 创建 BetterScroll 对象
    this.scroll = new BetterScroll(this.$refs.wrapper, {
      scrollbar: true,
      pullUpLoad: this.pullUpLoad,
      click: true,
      probeType: this.probeType,
    });
    // 监听滚动的位置
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on("scroll", (position) => {
        // 向父组件, 传递 position 对象
        this.$emit("scroll", position);
      });
    }
    // 监听上拉事件
    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        this.$emit("pullingUp");
        this.scroll.finishPullUp();
      });
    }
  },
  methods: {
    // 封装
    scrollTo(x, y, time = 300) {
      // 空值校验
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      // 生产 pullingUp 以供消费, 不断下拉
      this.scroll && this.scroll.finishPullUp();
    },
    // 刷新页面, 有 image 的时候, 必须调用
    refresh() {
      // console.log("防抖");
      this.scroll && this.scroll.refresh();
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0;
    },
  },
};
</script>
<style scoped></style>
