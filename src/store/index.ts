import { Store, createStore } from 'vuex'
import { IProductsState, productList } from './productListModule'
import { IBrandsState, brands } from './brandsModule'

export interface IRootState {
  product: IProductsState
  brand: IBrandsState
}
export default createStore<Store<IRootState>>({
  modules: {
    product: productList,
    brand: brands
  }
})
