<template>
  <div class="product-item">
    <img
      class="product-item__image"
      :src="image"
      :alt="product.title"
    />
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
              :class="[{'product-item__option-item--active': selectedColor === value.value_index},{'product-item__option-item--disable': !variants.includes(value.value_index) && variantsCode === 'size'}]"
              v-for="value in option.values"
              :key="value.value_index"
              :style="{ 'background-color': value.value }"
              @click="variants.length !== 0 && variantsCode !== null && variantsCode === 'size' ? variants.includes(value.value_index) && setSelectedColor(value.value_index) : setSelectedColor(value.value_index)"
            ></div>
          </template>
          <template v-else>
            <div
              class="product-item__option-item"
              :class="[{'product-item__option-item--active': selectedSize === value.value_index},{'product-item__option-item--disable': !variants.includes(value.value_index) && variantsCode === 'color'}]"
              v-for="value in option.values"
              :key="value.value_index"
              @click="variants.length !== 0 && variantsCode !== null && variantsCode === 'color' ? variants.includes(value.value_index) && setSelectedSize(value.value_index): setSelectedSize(value.value_index)"
            >
              {{ value.label }}
            </div>
          </template>
        </div>
      </template>
      <button
        v-if="selectedColor && selectedSize && product.type !== 'simple' && 
          !cartItems.some((item) => item.id === getProductId()) || product.type === 'simple' && 
          !cartItems.some((item) => item.id === getProductId())
        "
        class="button"
        @click="setCartItem({ id: getProductId(), count: 1 })"
      >
        Add to cart
      </button>
      <p v-if="selectedColor && selectedSize && product.type !== 'simple' && 
          cartItems.some((item) => item.id === getProductId()) || product.type === 'simple' && 
          cartItems.some((item) => item.id === getProductId())">
        Product in the shopping cart
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapMutations, MapperForState, mapState } from "vuex";
import priceFormat from "@/utils/priceFormat";
import { IRootState } from "@/store";

export default defineComponent({
  name: "ProductItem",
  data() {
    return {
      selectedColor: null as null | number,
      selectedSize: null as null | number,
      variants: [],
      variantsCode:  null as null | string,
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
      if(this.selectedColor !== id) {
        if(this.selectedSize === null) {
          this.setVariants('color', id)
        } else if(this.selectedColor !== null && this.selectedSize !== null) {
          this.selectedSize = null
          this.setVariants('color', id)
        }
        this.selectedColor = id;
        if(this.selectedColor && this.selectedSize) {
          this.image = this.product.variants.find((item: any) => item.product.id === this.getProductId()).product.image
        } else {
          this.image = this.product.image
        }
      } else {
        this.selectedColor = null
        if(this.selectedSize === null) {
          this.variants = []
          this.variantsCode = null
        }
      }
    },
    setSelectedSize(id: number) {
      if(this.selectedSize !== id) {
        if(this.selectedColor === null) {
          this.setVariants('size', id)
        } else if(this.selectedColor !== null && this.selectedSize !== null) {
          this.selectedColor = null
          this.setVariants('size', id)
        }
        this.selectedSize = id;
        if(this.selectedColor && this.selectedSize) {
          this.image = this.product.variants.find((item: any) => item.product.id === this.getProductId()).product.image
        } else {
          this.image = this.product.image
        }
      } else {
        this.selectedSize = null
        if(this.selectedColor === null) {
          this.variants = []
          this.variantsCode = null
        }
      }
    },
    setVariants(code: string, id: number) {
      const productVariants = this.product.variants.filter((item: any)=> item.attributes.find((atribute: any) => atribute.code === code).value_index === id)
      this.variants = productVariants.map((item: any) => item.attributes.find((atribute: any) => atribute.code !== code).value_index)
      this.variantsCode = code
    },
    getProductId() {
      if(this.product.type === 'simple') {
        return this.product.id
      } else {
        const productId = this.product.variants.filter((item: any)=> item.attributes.find((atribute: any) => atribute.code === 'color').value_index === this.selectedColor).find((item: any)=> item.attributes.find((atribute: any) => atribute.code === 'size').value_index === this.selectedSize).product.id
        return productId
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
      opacity: 0.5;
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