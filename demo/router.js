import Vue from "vue";
import VueRouter from "vue-router";

import CartView from "./views/CartView";
import CheckoutView from "./views/CheckoutView";
import ProductView from "./views/ProductView";
import StoreView from "./views/StoreView";

Vue.use(VueRouter);

const routes = [
  {
    path: "/store",
    name: "store",
    component: StoreView,
    children: [
      {
        path: ":name",
        name: "product",
        component: ProductView,
        props: true
      }
    ]
  },
  {
    path: "/cart",
    name: "cart",
    component: CartView
  },
  {
    path: "/checkout",
    name: "checkout",
    component: CheckoutView
  }
];

export const router = new VueRouter({
  mode: "history",
  routes
});
