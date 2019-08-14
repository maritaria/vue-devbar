<template>
  <div>
    <p>Product: {{ name }}</p>
    <p>Price: {{ price | currency }}</p>
    <button @click="addToCart" :disabled="!canAddToCart">Add to cart</button>
    <p v-if="cartCount > 0">In cart: {{ cartCount }}</p>
  </div>
</template>
<style scoped></style>
<script>
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component({})
export default class ProductView extends Vue {
  get name() {
    return this.$route.params.name;
  }

  get product() {
    return this.name ? this.$store.state.products.map[this.name] : null;
  }

  get price() {
    return this.product ? this.product.price : "unknown";
  }

  get canAddToCart() {
    return this.product;
  }

  addToCart() {
    if (this.canAddToCart) {
      this.$store.commit("addToCart", { name: this.name, count: 1 });
    }
  }

  get cartCount() {
    return this.$store.state.cart.amounts[this.name];
  }
}
</script>
