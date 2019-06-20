<template>
  <div>
    <h1>Store</h1>
    <spinner v-if="loading" />
    <div v-else class="row">
      <div class="col">
        <ul>
          <li v-for="name in products" :key="name">
            <router-link :to="linkToProduct(name)">
              {{ name }}
            </router-link>
          </li>
        </ul>
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
import { Mock } from "../../src/decorators/mock";
import { Kick } from "../../src/decorators/kick";
import Spinner from "../components/Spinner";

@Component({
  components: { Spinner }
})
export default class StoreView extends Vue {
  rloading = false;

  @Mock({ label: "loading", factory: () => true })
  @Mock({ label: "done", factory: () => false })
  get loading() {
    return this.rloading;
  }
  set loading(value) {
    this.rloading = value;
  }

  get products() {
    return this.$store.state.products.names;
  }

  async created() {
    this.loading = true;
    try {
      await this.$store.dispatch("loadProducts");
    } finally {
      this.loading = false;
    }
  }

  linkToProduct(name) {
    return {
      name: "product",
      params: {
        name
      }
    };
  }

  @Kick()
  addProduct() {
    this.$store.commit("defineProduct", { name: "new-item", price: 20 });
  }
}
</script>
