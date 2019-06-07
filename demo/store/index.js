import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import { cart } from "./cart";
import { products } from "./products";

export const store = new Vuex.Store({
  modules: {
    cart,
    products
  }
});
