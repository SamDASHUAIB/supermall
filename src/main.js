import Vue from "vue";
import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;
// Vue 实例可以用作, 事件总线
Vue.prototype.$bus = new Vue();
new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
