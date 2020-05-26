import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

//引入已編譯完成，且全局可使用的 scss 檔案
import "./assets/scss/base/reset.scss";
import "./assets/scss/globalStyle/index.scss";

// 引入 Bootstrap 套件
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import { NavbarPlugin } from "bootstrap-vue";
import { LayoutPlugin } from "bootstrap-vue";
import { ButtonPlugin } from "bootstrap-vue";
import { CardPlugin } from "bootstrap-vue";
Vue.use(NavbarPlugin);
Vue.use(LayoutPlugin);
Vue.use(ButtonPlugin);
Vue.use(CardPlugin);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
