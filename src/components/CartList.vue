<template>
  <div class="cart-list">
    <template v-if="cartProducts.length > 0">
      <div v-for="cartItem in cartProducts" :key="cartItem.id" >
        <img class="cart-item__image" :src="cartItem.image" :alt="cartItem.title">
        <div class="cart-item__info">
          <h3>{{cartItem.brand}} / {{cartItem.title}}</h3>
          <div v-if="cartItem.type !== 'simple'">
            <p>Color: {{cartItem.color}}</p>
            <p>Size: {{cartItem.size}}</p>
          </div>
        </div>
        <div>
          <p>{{priceFormat(cartItem.regular_price.currency, cartItem.regular_price.value)}}</p>
          <input type="number" min="1" :value="cartItem.count" @change="setCartItemCount({id: cartItem.id, count: +$event.target.value})">
          <p>{{priceFormat(cartItem.regular_price.currency, cartItem.regular_price.value*cartItem.count)}}</p>
          <button class="button" @click="deleteCartItem(cartItem.id)">Delete</button>
        </div>
      </div>
    </template>
    <template v-else>
      <h3>the shopping cart is empty</h3>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters, mapMutations, MapperForState, mapState  } from 'vuex'
import priceFormat from '@/utils/priceFormat'

export default defineComponent({
  name: 'CartList',
  data() {
    return {
      priceFormat
    }
  },
  methods: {
    ...mapMutations({
      deleteCartItem: 'product/deleteCartItem',
      setCartItemCount: 'product/setCartItemCount'
    }),
  },
  mounted() {
  },
  computed: {
    ...mapState<MapperForState>({
      // products: (state: IRootState) => state.product.products
    }),
    ...mapGetters({
      cartProducts: 'product/cartProducts',
    }),
  }
})
</script>

<style lang="scss" scoped>
.product-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;
  width: 100%;
}
</style>
