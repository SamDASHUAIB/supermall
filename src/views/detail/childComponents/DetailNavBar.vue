<template>
  <div>
    <nav-bar class="nav-bar">
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="" />
      </div>
      <div slot="center" class="titles">
        <div
          @click="itemClick(index)"
          class="title-item"
          :class="{ active: index === currentIndex }"
          v-for="(item, index) in titles"
          :key="index"
        >
          {{ item }}
        </div>
      </div>
    </nav-bar>
  </div>
</template>
<script>
import NavBar from "../../../components/common/navbar/NavBar.vue";
export default {
  name: "DetailNavBar",
  components: { NavBar },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0,
    };
  },
  props: {},
  created() {},
  mounted() {},
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      // 将 index 发射出去
      this.$emit("titleClick", index);
    },
    backClick() {
      this.$router.back();
    },
  },
};
</script>
<style scoped>
.nav-bar {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.titles {
  display: flex;
  font-size: 12px;
}
.title-item {
  flex: 1;
}
.active {
  color: var(--color-high-text);
}
.back {
  margin-top: 7px;
}
</style>
