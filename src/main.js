import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

// 引入 Bootstrap 套件
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import { NavbarPlugin } from "bootstrap-vue";
Vue.use(NavbarPlugin);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
