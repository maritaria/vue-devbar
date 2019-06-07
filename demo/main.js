import Vue from "vue";
import App from "./App.vue";
import Devbar from "../src";
import { router } from "./router";
import { store } from "./store";
import "./filters";

Vue.use(Devbar);

Vue.config.productionTip = false;

const devbar = new Devbar();

new Vue({
  render: h => h(App),
  devbar,
  router,
  store
}).$mount("#app");
