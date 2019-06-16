import { randomFail, sleep } from "../api-mocking";

export const products = {
  state: () => ({
    map: {},
    names: [],
    loadPromise: null
  }),
  getters: {
    productPrice: state => name => (state.map[name] ? state.map[name].price : 0)
  },
  actions: {
    loadProducts: ({ state, commit, dispatch }) => {
      if (state.loadPromise) {
        return state.loadPromise;
      }
      const promise = dispatch("loadProductsInternal");
      commit("setProductsPromise", promise);
      return promise;
    },
    loadProductsInternal: async ({ commit }) => {
      // Fake api fetch delay
      await sleep(1000);
      // Randomly fail the request, so the app has error states also
      await randomFail();
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
      if (!state.names.includes(name)) {
        state.names.push(name);
      }
    },
    setProductsPromise: (state, promise) => {
      state.loadPromise = promise;
    }
  }
};
