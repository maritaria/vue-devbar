<template>
  <div>
    <h1>Store</h1>
    <div class="row">
      <div class="col">
        <ul>
          <li v-for="name in products" :key="name">
            <router-link :to="linkToProduct(name)">
              {{ name }}
            </router-link>
          </li>
        </ul>
        <button @click="addProduct">Add</button>
      </div>
      <div class="col">
        <router-view />
      </div>
    </div>
  </div>
</template>
<style scoped>
.row {
  display: flex;
}

.row > .col {
  flex: 1;
}
</style>
<script>
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component({})
export default class StoreView extends Vue {
  get products() {
    return this.$store.state.products.names;
  }

  created() {
    this.$store.dispatch("loadProducts");
  }

  linkToProduct(name) {
    return {
      name: "product",
      params: {
        name
      }
    };
  }

  addProduct() {
    this.$store.commit("defineProduct", { name: "new-item", price: 20 });
  }
}
</script>
