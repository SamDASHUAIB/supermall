<template>
  <div class="tab-control">
    <div
      class="title"
      v-for="(item, index) in titles"
      :key="index"
      :class="{ active: index === currentIndex }"
      @click="itemClick(index)"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "TabControl",
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      // 向组件调用方, 发射数据
      this.$emit("tabClick", index);
    },
  },
};
</script>
<style scoped>
.tab-control {
  display: flex;
  font-size: 15px;
  /* margin-top: 20px; */
}
.title {
  flex: 1;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.title span {
  padding: 0px 7px 5px 7px;
}
.active span {
  color: var(--color-high-text);
  border-bottom: 4px solid var(--color-high-text);
}
</style>
