<template>
  <div class="product-item">
    <img class="product-item__image" :src="image" :alt="product.title" />
    <div class="product-item__info">
      <h3>{{ product.title }}</h3>
      <p>brand: {{ product.brand }}</p>
      <p>
        {{
          priceFormat(
            product.regular_price.currency,
            product.regular_price.value
          )
        }}
      </p>
      <template v-if="product.type !== 'simple'">
        <div
          class="product-item__options"
          v-for="option in product.configurable_options"
          :key="option.attribute_id"
        >
          <template v-if="option.attribute_code === 'color'">
            <div
              class="product-item__option-item"
              :class="[
                {
                  'product-item__option-item--active':
                    selectedColor === value.value_index,
                },
                {
                  'product-item__option-item--disable':
                    !variantsId.includes(value.value_index) &&
                    variantsCode === 'size',
                },
              ]"
              v-for="value in option.values"
              :key="value.value_index"
              :style="{ 'background-color': value.value }"
              @click="
                variantsId.length !== 0 &&
                variantsCode !== null &&
                variantsCode === 'size'
                  ? variantsId.includes(value.value_index) &&
                    setSelectedColor(value.value_index)
                  : setSelectedColor(value.value_index)
              "
            ></div>
          </template>
          <template v-else>
            <div
              class="product-item__option-item"
              :class="[
                {
                  'product-item__option-item--active':
                    selectedSize === value.value_index,
                },
                {
                  'product-item__option-item--disable':
                    !variantsId.includes(value.value_index) &&
                    variantsCode === 'color',
                },
              ]"
              v-for="value in option.values"
              :key="value.value_index"
              @click="
                variantsId.length !== 0 &&
                variantsCode !== null &&
                variantsCode === 'color'
                  ? variantsId.includes(value.value_index) &&
                    setSelectedSize(value.value_index)
                  : setSelectedSize(value.value_index)
              "
            >
              {{ value.label }}
            </div>
          </template>
        </div>
        <template v-if="selectedColor && selectedSize">
          <button
            v-if="!cartItems.some((item) => item.id === getProductId())"
            class="button"
            @click="setCartItem({ id: getProductId(), count: 1 })"
          >
            Add to cart
          </button>
          <p v-else>Product in the shopping cart</p>
        </template>
        <p v-else>Сhoose a color and size</p>
      </template>
      <template v-else>
        <button
          v-if="!cartItems.some((item) => item.id === getProductId())"
          class="button"
          @click="setCartItem({ id: getProductId(), count: 1 })"
        >
          Add to cart
        </button>
        <p v-else>Product in the shopping cart</p>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapMutations, MapperForState, mapState } from "vuex";
import priceFormat from "@/utils/priceFormat";
import {
  AttributeCode,
  COLOR,
  IRootState,
  IVariant,
  IVariantAttribute,
  SIMPLE,
  SIZE,
} from "@/types";

export default defineComponent({
  name: "ProductItem",
  data() {
    return {
      selectedColor: null as null | number,
      selectedSize: null as null | number,
      selectedVariant: undefined as IVariant | undefined,
      variants: [] as Array<IVariant>,
      variantsId: [] as Array<number | undefined>,
      variantsCode: null as null | string,
      image: this.product.image,
      priceFormat,
    };
  },
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  methods: {
    setSelectedColor(id: number) {
      if (this.selectedColor !== id) {
        if (this.selectedSize === null) {
          this.setVariants(COLOR, id);
        } else if (this.selectedColor !== null && this.selectedSize !== null) {
          this.selectedSize = null;
          this.setVariants(COLOR, id);
        }
        this.selectedColor = id;
      } else {
        this.selectedColor = null;
        if (this.selectedSize === null) {
          this.variantsId = [];
          this.variantsCode = null;
        }
      }
      this.getImage();
    },
    setSelectedSize(id: number) {
      if (this.selectedSize !== id) {
        if (this.selectedColor === null) {
          this.setVariants(SIZE, id);
        } else if (this.selectedColor !== null && this.selectedSize !== null) {
          this.selectedColor = null;
          this.setVariants(SIZE, id);
        }
        this.selectedSize = id;
      } else {
        this.selectedSize = null;
        if (this.selectedColor === null) {
          this.variantsId = [];
          this.variantsCode = null;
        }
      }
      this.getImage();
    },
    setVariants(code: AttributeCode, id: number) {
      this.variants = this.product.variants.filter(
        (item: IVariant) =>
          item.attributes.find(
            (atribute: IVariantAttribute) => atribute.code === code
          )!.value_index === id
      );
      this.variantsId = this.variants.map(
        (item: IVariant) =>
          item.attributes.find(
            (atribute: IVariantAttribute) => atribute.code !== code
          )!.value_index
      );
      this.variantsCode = code;
    },
    getProductId() {
      if (this.product.type === SIMPLE) {
        return this.product.id;
      } else {
        this.selectedVariant = this.variants!.find(
          (item: IVariant) =>
            item.attributes.find(
              (atribute: IVariantAttribute) =>
                atribute.code !== this.variantsCode
            )!.value_index ===
            (this.variantsCode !== SIZE
              ? this.selectedSize
              : this.selectedColor)
        );
        const productId = this.selectedVariant?.product.id;
        return productId;
      }
    },
    getImage() {
      if (this.selectedColor && this.selectedSize) {
        this.getProductId();
        this.image = this.selectedVariant?.product.image;
      } else {
        this.image = this.product.image;
      }
    },
    ...mapMutations({
      setCartItem: "product/setCartItem",
    }),
  },
  computed: {
    ...mapState<MapperForState>({
      cartItems: (state: IRootState) => state.product.cartItems,
    }),
  },
});
</script>

<style lang="scss" scoped>
.product-item {
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid #aeaeae;
  border-radius: 10px;
  overflow: hidden;
  &__image {
    width: 100%;
  }
  &__info {
    padding: 5px 10px;
    height: 100%;
    background-color: #d2eee0;
    display: flex;
    flex-direction: column;
    gap: 5px;
    text-align: left;
    @media (min-width: 640px) {
      padding: 5px 20px;
    }
  }
  &__options {
    display: flex;
    gap: 10px;
  }
  &__option-item {
    width: 30px;
    height: 20px;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #000;
    cursor: pointer;
    &--active {
      border: 2px solid #0ddb30;
    }
    &--disable {
      opacity: 0.3;
      cursor: default;
    }
  }
  @media (min-width: 640px) {
    width: calc((100% - 20px) / 2);
  }
  @media (min-width: 960px) {
    width: calc((100% - 40px) / 3);
  }
  @media (min-width: 1280px) {
    width: calc((100% - 60px) / 4);
  }
}
</style>