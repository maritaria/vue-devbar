import Vue from "vue";
import App from "./App.vue";
import Devbar from "../src";

Vue.use(Devbar);

Vue.config.productionTip = false;

const devbar = new Devbar();

new Vue({
  render: h => h(App),
  devbar
}).$mount("#app");
