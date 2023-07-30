import { IProductsState, ICartItem, SIMPLE, IVariant, SIZE, COLOR, IProductItem } from "@/types";
import { getAttributeLabel } from "@/utils/getAttributeLabel";
import priceFormat from "@/utils/priceFormat";
import { Commit } from "vuex";

export const productList = {
  state: (): IProductsState => ({
    products: [],
    cartItems: [],
    selectedBrand: null,
    subtotalCart: ''
  }),
  getters: {
    filterProducts(state: IProductsState) {
      if (state.selectedBrand === null) {
        return [...state.products]
      } else {
        return [...state.products].filter(item => item.brand === state.selectedBrand)
      }
    },
    cartProducts(state: IProductsState) {
      const cartProductArray = [...state.cartItems].map(item => {
        const productItem = [...state.products].find(productItem => productItem.type === SIMPLE ? productItem.id === item.id : productItem?.variants?.some((variant: IVariant) => variant.product.id === item.id))
        const productImage = productItem && productItem.type !== SIMPLE ? productItem.variants?.find((variant: IVariant) => variant.product.id === item.id)?.product.image : productItem?.image
        if (productItem) {
          return {
            id: item.id,
            type: productItem.type,
            image: productImage,
            regular_price: productItem.regular_price,
            brand: productItem.brand,
            title: productItem.title,
            size: getAttributeLabel(productItem, SIZE, item.id),
            color: getAttributeLabel(productItem, COLOR, item.id),
            count: item.count
          }
        }
      })
      state.subtotalCart = priceFormat('USD', [...cartProductArray].reduce((totalPrice, cartProduct) => totalPrice + (cartProduct ? cartProduct.count * cartProduct.regular_price.value : 0), 0))
      return cartProductArray
    },
    totalCartCount(state: IProductsState) {
      return [...state.cartItems].reduce((totalCount, cartItem) => totalCount + cartItem.count, 0)
    },
  },
  mutations: {
    setProducts(state: IProductsState, products: Array<IProductItem>) {
      state.products = products
    },
    setCartItem(state: IProductsState, cartItem: ICartItem) {
      state.cartItems = [...state.cartItems, cartItem]
    },
    setCartItemCount(state: IProductsState, cartItem: ICartItem) {
      state.cartItems = [...state.cartItems].map(item => {
        if (item.id === cartItem.id) {
          return { id: item.id, count: cartItem.count }
        }
        return item
      })
    },
    deleteCartItem(state: IProductsState, cartItemId: number) {
      state.cartItems = [...state.cartItems].filter(item => item.id !== cartItemId)
    },
    setSelectedBrand(state: IProductsState, selectedBrand: number | null) {
      state.selectedBrand = selectedBrand
    }
  },
  actions: {
    async fetchProducts({ state, commit }: { state: IProductsState, commit: Commit }) {
      try {
        const response = await fetch('./products.json')
          .then((res) => res.json());
        commit('setProducts', response)
      } catch (e) {
        console.error(e)
      }
    },
  },
  namespaced: true
}