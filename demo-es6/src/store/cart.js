import Vue from "vue";

export const cart = {
  state: () => ({
    amounts: {},
    productNames: []
  }),
  mutations: {
    addToCart: (state, { name, count }) => {
      if (!state.productNames.includes(name)) {
        state.productNames.push(name);
      }
      if (!state.amounts[name]) {
        Vue.set(state.amounts, name, count);
      } else {
        state.amounts[name] += count;
      }
    },
    setCartItemCount: (state, { name, count }) => {
      if (!state.productNames.includes(name)) {
        state.productNames.push(name);
      }
      Vue.set(state.amounts, name, count);
    },
    clearCart: state => {
      state.amounts = {};
      state.productNames = [];
    }
  },
  getters: {
    cartTotalCount: state => {
      return state.productNames
        .map(name => state.amounts[name])
        .reduce((sum, count) => sum + count, 0);
    },
    cartTotalPrice: (state, getters) => {
      return state.productNames
        .map(name => getters.productPrice(name) * state.amounts[name])
        .reduce((sum, price) => sum + price, 0);
    }
  }
};
