<template>
  <div class="detail-swiper">
    <swiper>
      <swiper-item
        class="swiper-item"
        v-for="(item, index) in topImages"
        :key="index"
      >
        <img :src="item" alt="" />
      </swiper-item>
    </swiper>
  </div>
</template>
<script>
import Swiper from "../../../components/common/swiper/Swiper.vue";
import SwiperItem from "../../../components/common/swiper/SwiperItem.vue";
export default {
  name: "DetailSwiper",
  components: { SwiperItem, Swiper },
  data() {
    return {};
  },
  props: {
    topImages: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>
<style scoped>
.swiper-item {
  height: 300px;
  overflow: hidden;
}
</style>
