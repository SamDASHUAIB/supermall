import { debounce } from "./utils";
import { BackTop } from "components/content/backTop/BackTop.vue";
import { BACKTOP_DISTANCE } from "common/const";

export const itemListenerMixin = {
  data() {
    return {
      refresh: null,
    };
  },
  mounted() {
    // 进入路由, 重新 refresh 一次, 计算图片的宽高，可以解决不能滚动的 bug
    // 监听事件总线中的 @load 事件
    // $ref 不能在 created 里面去定义和修改
    this.refresh = debounce(this.$refs.scroll.refresh, 300);
    this.itemListener = () => {
      this.refresh();
    };

    this.$bus.$on("goodItemImageLoad", this.itemListener);
  },
};

export const backTopMixin = {
  components: { BackTop },
  data() {
    return {
      isShowBackTop: false,
    };
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 1000);
    },
    listenShowBackTop(position) {
      this.isShowBackTop = -position.y > BACKTOP_DISTANCE;
    },
  },
};
