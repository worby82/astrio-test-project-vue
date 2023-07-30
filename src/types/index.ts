export interface IRootState {
  product: IProductsState
  brand: IBrandsState
}
export interface IBrandsState {
  brands: Array<IBrand>
}
export interface ICartItem {
  id: number
  count: number
}
export interface IProductsState {
  products: Array<IProductItem>
  cartItems: Array<ICartItem>
  selectedBrand: number | null
  subtotalCart: string
}
export interface IProductItem {
  type: ProductItemType
  id: number
  sku: string
  title: string
  regular_price: IRegularPrice
  image: string
  configurable_options?: Array<IConfigurableOption>
  variants?: Array<IVariant>
  brand: number
}
export interface IRegularPrice {
  currency: string
  value: number
}
export interface IConfigurableOption {
  attribute_id: number
  attribute_code: AttributeCode
  label: string
  values: Array<IConfigurableValue>
}
export interface IConfigurableValue {
  label: string
  value_index: number
  value: string
}
export interface IVariant {
  attributes: Array<IVariantAttribute>
  product: IVariantProduct
}
export interface IVariantAttribute {
  code: AttributeCode
  value_index: number
}
export interface IVariantProduct {
  id: number
  sku: string
  image: string
}
export interface IBrand {
  id: number,
  title: string,
  sort: string,
  code: string
}

export type ProductItemType = "configurable" | "simple"

export const CONFIGURABLE: ProductItemType = "configurable"
export const SIMPLE: ProductItemType = "simple"

export type AttributeCode = "color" | "size"

export const COLOR: AttributeCode = "color"
export const SIZE: AttributeCode = "size"