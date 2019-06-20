<template>
  <div>
    <h1>Cart</h1>
    <template v-if="cartProductNames.length > 0">
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Unit price</th>
            <th>Amount</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="name in cartProductNames" :key="name">
            <td>
              <router-link :to="linkToProduct(name)">{{ name }}</router-link>
            </td>
            <td>{{ productPrice(name) | currency }}</td>
            <td>{{ cartCount(name) }}</td>
            <td>{{ productCartTotal(name) | currency }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2">Total</td>
            <td>{{ cartTotalCount }}</td>
            <td>{{ cartTotalPrice | currency }}</td>
          </tr>
        </tfoot>
      </table>
      <button @click="clearCart">Clear</button>
      <router-link tag="button" :to="{ name: 'checkout' }"
        >Proceed to checkout</router-link
      >
    </template>
    <p v-else>
      Cart is empty, check out our
      <router-link :to="{ name: 'store' }">store</router-link>
    </p>
  </div>
</template>
<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
}

thead {
  background: dodgerblue;
  color: white;
}

tfoot {
  background: dodgerblue;
  color: white;
  font-weight: bold;
}
</style>
<script>
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { Mock } from "../../src/decorators/mock";

@Component({})
export default class CartView extends Vue {
  get cartProductNames() {
    return this.$store.state.cart.productNames;
  }

  productPrice(name) {
    const product = this.$store.state.products.map[name];
    return product ? product.price : 0;
  }

  cartCount(name) {
    return this.$store.state.cart.amounts[name];
  }

  productCartTotal(name) {
    return this.productPrice(name) * this.cartCount(name);
  }

  get cartTotalCount() {
    return this.$store.getters.cartTotalCount;
  }

  @Mock({ label: "zero", factory: () => 0 })
  @Mock({ label: "negative", factory: () => -1 })
  get cartTotalPrice() {
    return this.$store.getters.cartTotalPrice;
  }

  clearCart() {
    this.$store.commit("clearCart");
  }

  linkToProduct(name) {
    return {
      name: "product",
      params: {
        name
      }
    };
  }
}
</script>
