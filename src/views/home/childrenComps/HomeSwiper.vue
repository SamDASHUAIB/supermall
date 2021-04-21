<template>
  <div>
    <swiper>
      <swiper-item v-for="item in banners" :key="item.title">
        <img @load="imgLoad" :src="item.image" alt="" />
      </swiper-item>
    </swiper>
  </div>
</template>
<script>
import Swiper from "../../../components/common/swiper/Swiper.vue";
import SwiperItem from "../../../components/common/swiper/SwiperItem.vue";
export default {
  name: "HomeSwiper",
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return { isLoad: false };
  },
  components: { Swiper, SwiperItem },
  methods: {
    imgLoad() {
      if (!this.isLoad) {
        this.$emit("swiperImgLoad");
        this.isLoad = true; // 发射一次, 将 isLoad 设为 true 避免多次发射
      }
    },
  },
};
</script>
<style scoped></style>
