<template>
  <nav>
    <img src="../assets/logo.png" />
    <router-link :to="{ name: 'store' }">Store</router-link>
    <router-link :to="{ name: 'cart' }"
      >Cart
      <template v-if="cartCount > 0">
        ({{ cartCount }})
      </template>
    </router-link>
  </nav>
</template>
<style scoped>
* {
  line-height: inherit;
}

nav {
  width: 100%;
}

img {
  display: inline;
  width: 1em;
  height: 1em;
}

a {
  margin-left: 1em;
}
</style>
<script>
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component({})
export default class CartView extends Vue {
  get cartCount() {
    return this.$store.getters.cartTotalItems;
  }
}
</script>
