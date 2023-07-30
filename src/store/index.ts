import { Store, createStore } from 'vuex'
import { productList } from './productListModule'
import { brands } from './brandsModule'
import { IRootState } from '@/types'

export default createStore<Store<IRootState>>({
  modules: {
    product: productList,
    brand: brands
  }
})
