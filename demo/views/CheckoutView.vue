<template>
  <div>
    <h1>Checkout</h1>
    <p>You have to pay {{ amount | currency }}</p>
    <p>Please select how you want to pay</p>
    <select v-model="provider">
      <option disabled :value="null">Pick payment provider</option>
      <option
        v-for="provider in paymentProviders"
        :key="provider.name"
        :value="provider"
        >{{ provider.name }}</option
      >
    </select>
    <button @click="proceed" :disabled="!canProceed">Proceed</button>
  </div>
</template>
<style scoped></style>
<script>
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component({})
export default class CheckoutView extends Vue {
  get amount() {
    return this.$store.getters.cartTotalPrice;
  }

  get paymentProviders() {
    return [
      { name: "PayPal", link: "http://example.com/paypal" },
      { name: "iDeal", link: "http://example.com/ideal" },
      { name: "MasterCard", link: "http://example.com/mastercard" }
    ];
  }

  provider = null;

  get canProceed() {
    return !!this.provider;
  }

  proceed() {
    if (!this.canProceed) return;
    alert(this.provider.link);
  }
}
</script>
