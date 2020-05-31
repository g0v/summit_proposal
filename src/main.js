import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import API from "@/utils/API.js";

Vue.config.productionTip = process.env.NODE_ENV !== "production";

//引入已編譯完成，且全局可使用的 scss 檔案
import "./assets/scss/base/reset.scss";
import "./assets/scss/globalStyle/index.scss";

// 引入 Bootstrap 套件
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import {
  NavbarPlugin,
  LayoutPlugin,
  ButtonPlugin,
  CardPlugin,
  IconsPlugin,
  FormInputPlugin,
  FormGroupPlugin,
  FormPlugin,
  FormSelectPlugin,
  ToastPlugin
} from "bootstrap-vue";
Vue.use(NavbarPlugin);
Vue.use(LayoutPlugin);
Vue.use(ButtonPlugin);
Vue.use(CardPlugin);
Vue.use(IconsPlugin);
Vue.use(FormInputPlugin);
Vue.use(FormGroupPlugin);
Vue.use(FormPlugin);
Vue.use(FormSelectPlugin);
Vue.use(ToastPlugin);

import VBodyScrollLock from "v-body-scroll-lock";
Vue.use(VBodyScrollLock);

if (API.HAS_AUTH_TOKEN()) {
  store.dispatch("fetchUserInfo");
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
