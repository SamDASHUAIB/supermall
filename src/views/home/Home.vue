<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <!-- 固定的 tab-control 和滑动区域的 tab-control 的选中状态要一致 -->
    <tab-control
      v-show="isTabFixed"
      ref="tabControlFixed"
      @tabClick="tabClick"
      :titles="['流行', '新款', '精选']"
    ></tab-control>

    <scroll
      @scroll="contentScroll"
      @pullingUp="loadMore"
      class="content"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
    >
      <home-swiper
        @swiperImgLoad="swiperImgLoad"
        :banners="banners"
      ></home-swiper>
      <home-recommend-view :recommend="recommend"></home-recommend-view>
      <home-feature-view></home-feature-view>
      <tab-control
        v-show="!isTabFixed"
        ref="tabControl"
        @tabClick="tabClick"
        :titles="['流行', '新款', '精选']"
      ></tab-control>
      <goods-list :goods="goods[currentType].list"></goods-list>
    </scroll>
    <!-- .native 监听组件根元素的原生事件 -->
    <back-top v-show="isShowBackTop" @click.native="backClick"></back-top>
  </div>
</template>
<script>
import BackTop from "../../components/content/backTop/BackTop.vue";
import Scroll from "../../components/common/scroll/Scroll.vue";
import GoodsList from "../../components/content/goods/GoodsList.vue";
import TabControl from "../../components/content/tabControl/TabControl.vue";
import HomeFeatureView from "./childrenComps/HomeFeatureView.vue";
import HomeRecommendView from "./childrenComps/HomeRecommendView.vue";
import HomeSwiper from "./childrenComps/HomeSwiper.vue";
import NavBar from "../../components/common/navbar/NavBar.vue";

import { getHomeMultiData, getHomeGoods } from "network/home";
import { itemListenerMixin, backTopMixin } from "common/mixin";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommendView,
    HomeFeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      // res: {},
      banners: [],
      dKeyword: [],
      keywords: [],
      recommend: [],
      // '流行', '新款', '精选'
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      // isShowBackTop: false,
      tapOffsetTop: 0,
      isTabFixed: false, // 默认情况下, 不需要吸顶效果
      saveY: 0,
      itemListener: null,
    };
  },
  created() {
    // 请求首页数据
    this.getHomeMultiData();
    // 请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {},
  // 进入当前路由(或者说激活当前路由)
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    // this.$refs.scroll.refresh();
    // this.$bus.$on("goodItemImageLoad", this.itemListener);
  },
  // 离开路由(当前路由处于未激活状态)
  deactivated() {
    // 保存离开时的位置 Y 值
    this.saveY = this.$refs.scroll.getScrollY();
    // 离开路由时, 取消事件监听, 仅仅取消 Home 中的监听事件, 其他地方依旧可以监听此事件
    this.$bus.$off("goodItemImageLoad", this.itemListener);
    // console.log(this.saveY);
  },
  methods: {
    /**
     * 这里是监听函数
     */
    tabClick(index) {
      // 点击不同的tab "['流行', '新款', '精选']" 切换不同的数据项
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      // 两个 tab-control 的状态需要保持一致
      this.$refs.tabControlFixed.currentIndex = index;
      this.$refs.tabControl.currentIndex = index;
      // this.$refs.tabControlFixed.currentIndex = this.$refs.tabControl.currentIndex;
    },
    // backClick() {
    //   this.$refs.scroll.scrollTo(0, 0, 1000);
    // },
    contentScroll(position) {
      // 注意 position.y 值在上拉的时候, 0 => -999999 是负值
      // 判断 backTop 是否显示
      // this.isShowBackTop = position.y < -200;
      this.listenShowBackTop(position);
      // 决定吸顶效果(posf)
      this.isTabFixed = -position.y > this.tapOffsetTop;
    },
    loadMore() {
      this.getHomeGoods(this.currentType);
      // 供下一次下拉消费
      this.$refs.scroll.finishPullUp();
      // 每一次下拉都重新计算一次高度
      this.$refs.scroll.refresh();
    },
    swiperImgLoad() {
      this.tapOffsetTop = this.$refs.tabControl.$el.offsetTop;
    },
    /**
     * 网络请求相关方法
     */
    async getHomeMultiData() {
      const res = await getHomeMultiData();
      this.banners = res.data.banner.list;
      this.dKeyword = res.data.dKeyword.list;
      this.keywords = res.data.keywords.list;
      this.recommend = res.data.recommend.list;
    },
    async getHomeGoods(type) {
      // 新一次请求
      let page = this.goods[type].page + 1;
      const resGoods = await getHomeGoods(type, page);
      // 累加
      this.goods[type].list.push(...resGoods.data.list);
      // 分页累加器
      this.goods[type].page += 1;
    },
  },
};
</script>
<style scoped>
#home {
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  /* 使用浏览器原生滚动时, 为了让导航不跟随一起滚动, 有用, 使用了 better-scroll 固定高度之后, 没有用了 */
  /* position: fixed; */
  /* position: sticky;
  right: 0;
  left: 0;
  top: 0;
  z-index: 99; */
}

.content {
  /* 设置可滚动区域的高度, 方案一 定位 */
  /* position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0; */
  /* 方案二 calc() 函数 */
  height: calc(100% - 93px);
  overflow: hidden;
  background-color: #fff;
}
</style>
