import Vue from "vue";
import * as Sentry from "@sentry/browser";
import { Vue as VueIntegration } from "@sentry/integrations";

import App from "./App.vue";
import router from "./router";
import store from "./store";
import API from "@/utils/API.js";
import "@/utils/veeValidate";

const isDevEnv = process.env.NODE_ENV !== "production";
Vue.config.productionTip = isDevEnv;

if (!isDevEnv) {
  Sentry.init({
    dsn:
      "https://fdd85abbffad4665bcfa8e962627a295@o413793.ingest.sentry.io/5301999",
    integrations: [new VueIntegration({ Vue, attachProps: true })]
  });
}

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
  BadgePlugin,
  CardPlugin,
  IconsPlugin,
  FormInputPlugin,
  FormTextareaPlugin,
  FormGroupPlugin,
  FormRadioPlugin,
  FormPlugin,
  FormSelectPlugin,
  ToastPlugin,
  PaginationPlugin,
  FormCheckboxPlugin,
  TablePlugin
} from "bootstrap-vue";
Vue.use(TablePlugin);
Vue.use(NavbarPlugin);
Vue.use(LayoutPlugin);
Vue.use(ButtonPlugin);
Vue.use(BadgePlugin);
Vue.use(CardPlugin);
Vue.use(IconsPlugin);
Vue.use(FormInputPlugin);
Vue.use(FormTextareaPlugin);
Vue.use(FormGroupPlugin);
Vue.use(FormRadioPlugin);
Vue.use(FormPlugin);
Vue.use(FormSelectPlugin);
Vue.use(ToastPlugin);
Vue.use(PaginationPlugin);
Vue.use(FormCheckboxPlugin);

import VBodyScrollLock from "v-body-scroll-lock";
Vue.use(VBodyScrollLock);

import VueClipboard from "vue-clipboard2";
Vue.use(VueClipboard)

const existingAuthToken = API.GET_EXISTING_AUTH_TOKEN();
if (existingAuthToken) {
  store.dispatch("updateToken", existingAuthToken);
  store.dispatch("fetchUserInfo");
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
