import Vue from "vue";

const currencyStyle = new Intl.NumberFormat("nl", {
  style: "currency",
  currency: "EUR"
});

Vue.filter("currency", function(number) {
  if (typeof number !== "number") return number;
  return currencyStyle.format(number);
});
