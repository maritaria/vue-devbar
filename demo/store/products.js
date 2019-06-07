import { sleep } from "../api-mocking";

export const products = {
  state: () => ({
    map: {},
    names: []
  }),
  getters: {
    productPrice: state => name => (state.map[name] ? state.map[name].price : 0)
  },
  actions: {
    loadProducts: async ({ state, commit }) => {
      if (state.loadPromise) {
        return state.loadPromise;
      }
      // Fake api fetch delay
      await sleep(1000);
      await rareFail();
      commit("defineProduct", { name: "vue-license", price: 0 });
      commit("defineProduct", { name: "sturbacks-coffee", price: 16.75 });
      commit("defineProduct", { name: "flammable-jetski", price: 500 });
    }
  },
  mutations: {
    defineProduct: (state, { name, price }) => {
      state.map[name] = {
        price
      };
      state.names.push(name);
    }
  }
};
