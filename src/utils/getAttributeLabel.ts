import { AttributeCode, IConfigurableOption, IConfigurableValue, IProductItem, IVariant, IVariantAttribute, SIMPLE } from "@/types";

const getAttributeLabelIndex = (product: IProductItem, attribute: AttributeCode, id: number) => {
  return product.variants?.find((variant: IVariant) => variant.product.id === id)?.attributes?.find((item: IVariantAttribute) => item.code === attribute)?.value_index
}
export const getAttributeLabel = (product: IProductItem | undefined, attribute: AttributeCode, id: number) => {
  return product && product.type !== SIMPLE
    ? product.configurable_options?.find((item: IConfigurableOption) => item.attribute_code === attribute)?.values.find((item: IConfigurableValue) => item.value_index === getAttributeLabelIndex(product, attribute, id))?.label
    : undefined
}