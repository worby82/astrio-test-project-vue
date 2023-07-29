<template>
  <div class="product-item">
    <img class="product-item__image" :src="product.image" :alt="product.title">
    <div class="product-item__info">
      <h3>{{product.title}}</h3>
      <p>brand: {{product.brand}}</p>
      <p>{{priceFormat(product.regular_price.currency, product.regular_price.value)}}</p>
      <button v-if="product.type === 'simple' && !cartItems.some(item => item.id === product.id)" class="button" @click="setCartItem({id: product.id, count: 1})">Add to cart</button>
      <p v-if="cartItems.some(item => item.id === product.id)">Product in the shopping cart</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapMutations, MapperForState, mapState } from 'vuex'
import priceFormat from '@/utils/priceFormat'
import { IRootState } from '@/store'

export default defineComponent({
  name: 'ProductItem',
  data() {
    return {
      priceFormat
    }
  },
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  methods: {
    ...mapMutations({
      setCartItem: 'product/setCartItem'
    }),
  },
  computed: {
    ...mapState<MapperForState>({
      cartItems: (state: IRootState) => state.product.cartItems
    }),
  }
})
</script>

<style lang="scss" scoped>
.product-item {
  display: flex;
  flex-direction: column;
  gap: 10px;
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
  @media (min-width: 640px) {
    width: calc((100% - 20px)/2);
  }
  @media (min-width: 960px) {
    width: calc((100% - 40px)/3);
  }
  @media (min-width: 1280px) {
    width: calc((100% - 60px)/4);
  }
}
</style>