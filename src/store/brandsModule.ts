import { Commit } from "vuex";

export interface IBrandsState {
  brands: Array<any>
}

export const brands = {
  state: (): IBrandsState => ({
    brands: []
  }),
  getters: {
  },
  mutations: {
    setBrands(state: IBrandsState, brands: Array<any>) {
      state.brands = brands
    },

  },
  actions: {
    async fetchBrands({state, commit}: {state: IBrandsState, commit: Commit}) {
      try {
          const response = await fetch('./brands.json')
          .then((res) => res.json());
          commit('setBrands', response)
      } catch (e) {
          console.error(e)
      }
    },
  },
  namespaced: true
}