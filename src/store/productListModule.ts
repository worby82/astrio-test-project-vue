import priceFormat from "@/utils/priceFormat";
import { Commit } from "vuex";

export interface ICartItem {
  id: number
  count: number
}
export interface IProductsState {
  products: Array<any>
  cartItems: Array<ICartItem>
  selectedBrand: number | null
  subtotalCart: string
}

export const productList = {
  state: ():IProductsState => ({
    products: [],
    cartItems: [],
    selectedBrand: null,
    subtotalCart: ''
  }),
  getters: {
    filterProducts(state: IProductsState) {
      if(state.selectedBrand === null) {
        return [...state.products]
      } else {
        return [...state.products].filter( item => item.brand === state.selectedBrand)
      }
    },
    cartProducts(state: IProductsState) {
      const cartProductArray = [...state.cartItems].map(item => {
        const productItem = [...state.products].find(productItem => productItem.type === 'simple' ? productItem.id === item.id : productItem.variants.some((variant: any) => variant.product.id === item.id))
        const productSizeIndex = productItem.type !== 'simple' ? productItem.variants.find((variant: any) => variant.product.id === item.id).attributes.find((item: any) => item.code === 'size').value_index: undefined
        const productSize = productItem.type !== 'simple' ? productItem.configurable_options.find((item: any) => item.attribute_code === 'size').values.find((item: any) => item.value_index === productSizeIndex).label: undefined
        const productColorIndex = productItem.type !== 'simple' ? productItem.variants.find((variant: any) => variant.product.id === item.id).attributes.find((item: any) => item.code === 'color').value_index: undefined
        const productColor = productItem.type !== 'simple' ? productItem.configurable_options.find((item: any) => item.attribute_code === 'color').values.find((item: any) => item.value_index === productColorIndex).label: undefined
        const productImage = productItem.type !== 'simple' ? productItem.variants.find((variant: any) => variant.product.id === item.id).product.image : productItem.image
        return {
          id: item.id,
          type: productItem.type,
          image: productImage,
          regular_price: productItem.regular_price,
          brand: productItem.brand,
          title: productItem.title,
          size: productSize,
          color: productColor,
          count: item.count
        }
      })
      state.subtotalCart = priceFormat('USD',[...cartProductArray].reduce((totalPrice, cartProduct) => totalPrice + cartProduct.count * cartProduct.regular_price.value, 0))
      return cartProductArray
    },
    totalCartCount(state: IProductsState) {
      return [...state.cartItems].reduce((totalCount, cartItem) => totalCount + cartItem.count, 0)
    },
  },
  mutations: {
    setProducts(state: IProductsState, products: Array<any>) {
      state.products = products
    },
    setCartItem(state: IProductsState, cartItem: ICartItem) {
      state.cartItems = [...state.cartItems, cartItem]
    },
    setCartItemCount(state: IProductsState, cartItem: ICartItem) {
      state.cartItems = [...state.cartItems].map(item => {
        if(item.id === cartItem.id) {
          return {id: item.id, count: cartItem.count}
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
    async fetchProducts({state, commit}: {state: IProductsState, commit: Commit}) {
      try {
        const response = await fetch('./products.json')
        .then((res) => res.json());
        commit('setProducts', response)
      } catch (e) {
        console.error(e)
      }
    },
    // deleteCartItem({state, commit}: {state: IProductsState, commit: Commit}, CartItemId: number) {
    //   commit('deleteCartItem', CartItemId)
    // },
    // addCartItem({state, commit}: {state: IProductsState, commit: Commit}, CartItem: ICartItem) {
    //   commit('setCartItem', CartItem)
    // },
  },
  namespaced: true
}