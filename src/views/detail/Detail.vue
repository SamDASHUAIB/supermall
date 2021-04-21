<template>
  <div class="detail" id="detail">
    <!-- 导航条 -->
    <!-- 事件, 直接驼峰, 无需转成 连字符 -->
    <detail-nav-bar @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <scroll
      :probe-type="3"
      @scroll="contentScroll"
      ref="scroll"
      class="content"
    >
      <!-- swiper -->
      <!-- 属性需要将 驼峰 => 连字符 -->
      <detail-swiper :top-images="topImages"></detail-swiper>
      <!-- detail-base-info -->
      <detail-base-info :goods="goodsInfo"></detail-base-info>
      <detail-shop-info :shop="shopInfo"></detail-shop-info>
      <!-- DetailImgsInfo 商品大图 -->
      <detail-imgs-info
        @detailImageLoad="detailImageLoad"
        :detail-info="detailInfo"
      ></detail-imgs-info>
      <!-- DetailParamsInfo 商品参数信息 -->
      <detail-params-info
        ref="params"
        :param-info="itemParams"
      ></detail-params-info>
      <!-- DetailCommentInfo 商品评论信息 -->
      <detail-comment-info
        ref="comment"
        :comment-info="commentInfo"
      ></detail-comment-info>
      <!-- 商品推荐列表 -->
      <goods-list ref="recommend" :goods="recommend"></goods-list>
    </scroll>
    <!-- 底部工具栏 -->
    <detail-bottom-bar></detail-bottom-bar>
    <!-- backTop 小图标 -->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>
<script>
import BackTop from "../../components/content/backTop/BackTop";
import DetailBottomBar from "./childComponents/DetailBottomBar.vue";
import GoodsList from "../../components/content/goods/GoodsList.vue";
import DetailCommentInfo from "./childComponents/DetailCommentInfo.vue";
import DetailParamsInfo from "./childComponents/DetailParamsInfo.vue";
import DetailImgsInfo from "./childComponents/DetailImgsInfo.vue";
import DetailShopInfo from "./childComponents/DetailShopInfo.vue";
import Scroll from "../../components/common/scroll/Scroll.vue";
import DetailBaseInfo from "./childComponents/DetailBaseInfo.vue";
import DetailSwiper from "./childComponents/DetailSwiper.vue";
import DetailNavBar from "./childComponents/DetailNavBar.vue";
import { getDetail, getRecommend, Goods } from "network/detail";
import { itemListenerMixin } from "common/mixin";
import { debounce } from "@/common/utils";
import { backTopMixin } from "common/mixin";
export default {
  name: "Detail",
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      iid: null,
      data: null,
      topImages: null,
      goodsInfo: {},
      shopInfo: {},
      detailInfo: {},
      itemParams: {},
      commentInfo: {},
      recommend: [],
      itemListener: null,
      topThemeYs: [],
      getThemeTopY: null,
      currentIndex: 0,
    };
  },

  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    Scroll,
    DetailShopInfo,
    DetailImgsInfo,
    DetailParamsInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    BackTop,
  },
  created() {
    // 第一步: 拿到动态路由参数 iid
    this.iid = this.$route.params.iid;
    // 第二步: 请求详情数据
    this.getDetail(this.iid);
    // 第三步: 请求商品推荐数据
    this.getRecommend();

    // 给 getThemeTopY 赋值, 用于防抖
    this.getThemeTopY = debounce(() => {
      this._getOffsetTop();
    }, 200);
  },
  mounted() {
    // this.topThemeYs.push(0);
    // this.$refs.params 是一个组件对象, 需要加上 $el 才能取到 DOM 值
    // 不能写在, mounted 里面, 此时, 组件中的全部 data 并不一定渲染完成了
    // this.topThemeYs.push(this.$refs.params.$el.offsetTop);
    // this.topThemeYs.push(this.$refs.comment.$el.offsetTop);
    // this.topThemeYs.push(this.$refs.recommend.$el.offsetTop);
    // console.log(this.topThemeYs);
  },
  updated() {
    // this._getOffsetTop();
  },
  // 和 keep-alive 配套使用的
  // deactivated() {
  //   this.$bus.$off("goodItemImageLoad");
  // },
  destroyed() {
    this.$bus.$off("goodItemImageLoad");
  },
  // activated() {
  //   this.$bus.$on("goodItemImageLoad", this.itemListener);
  // },

  methods: {
    async getDetail(iid) {
      const res = await getDetail(iid);
      // 数据绑定
      this.data = res.result;
      this.topImages = res.result.itemInfo.topImages;
      // 第三步: 创建 Goods 对象, 封装数据请求细节
      this.goodsInfo = new Goods(
        this.data.itemInfo,
        this.data.columns,
        this.data.shopInfo.services
      );
      // 第四步: 取出店铺的信息
      this.shopInfo = this.data.shopInfo;
      // 第五步: 取出商品详情信息
      this.detailInfo = this.data.detailInfo;
      // 第六步: 取出商品参数信息
      this.itemParams = this.data.itemParams;
      // 第七步: 取出商品评论信息, 有些商品没有评论
      if (this.data.rate.cRate !== 0) {
        this.commentInfo = this.data.rate.list[0];
      }
    },
    async getRecommend() {
      const res = await getRecommend();
      // console.log(res);
      this.recommend = res.data.list;
    },
    detailImageLoad() {
      this.refresh();
      // 等待, 详情数据中的 image 加载完成, 再去拿到 offsetTop 就是正确的了(计算了所有 image 的高度)
      // 调用过于频繁, 可以使用防抖
      // this._getOffsetTop();
      this.getThemeTopY();
    },
    titleClick(index) {
      // console.log(index);
      // 点击 title 滚动到相应的位置
      // 记得 y 值是一个负数
      this.$refs.scroll.scrollTo(0, -this.topThemeYs[index], 500);
    },
    contentScroll(position) {
      // 获取到 y 值
      const positionY = -position.y;
      // console.log(positionY);
      // position 和主题中值对比
      // [0, 12769, 13698, 14012]
      // positionY 在 0 - 12769 index = 0
      // positionY 在 12769 - 13698 index = 1
      // positionY 在 13698 - 14012 index = 2
      // positionY 在 超过 14012 index = 3
      let length = this.topThemeYs.length;
      for (let i = 0; i < length; i++) {
        // i + 1 数组最后一项, 将越界, 最后一次, 条件始终不能成立(undefined) 所以, 我们需要分成两种情况讨论
        if (
          this.currentIndex !== i &&
          ((i < length - 1 &&
            positionY > this.topThemeYs[i] &&
            positionY < this.topThemeYs[i + 1]) ||
            (i === length - 1 && positionY > this.topThemeYs[i]))
        ) {
          this.currentIndex = i;
          // console.log(this.currentIndex);
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
      // 是否显示回到顶部
      this.listenShowBackTop(position);
    },
    backTop() {},
    _getOffsetTop() {
      // 下一次更新, 清空数组
      this.topThemeYs = [];
      this.topThemeYs.push(0);
      // 减去 头部 的 height
      this.topThemeYs.push(this.$refs.params.$el.offsetTop - 44);
      this.topThemeYs.push(this.$refs.comment.$el.offsetTop - 44);
      this.topThemeYs.push(this.$refs.recommend.$el.offsetTop - 44);
      console.log(this.topThemeYs);
    },
  },
};
</script>
<style scoped>
.detail {
  height: 100vh;
  background-color: #fff;
  position: relative;
  z-index: 99;
}
.content {
  background-color: #fff;
  height: calc(100% - 102px);
}
</style>
