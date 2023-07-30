<template>
  <div class="cart-list">
    <template v-if="cartProducts.length > 0">
      <div class="cart-list__header">
        <div class="cart-list__row">
          <div class="cart-list__element"></div>
          <div class="cart-list__element cart-list__element--left">Item</div>
          <div class="cart-list__element">Price</div>
          <div class="cart-list__element">Quantity</div>
          <div class="cart-list__element">Total</div>
          <div class="cart-list__element"></div>
        </div>
      </div>
      <div class="cart-list__body">
        <CartItem
          v-for="cartItem in cartProducts"
          :key="cartItem.id"
          :cartItem="cartItem"
        />
      </div>
    </template>
    <template v-else>
      <h3>the shopping cart is empty</h3>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters, mapMutations, MapperForState, mapState } from "vuex";
import CartItem from "./CartItem.vue";

export default defineComponent({
  name: "CartList",
  components: {
    CartItem,
  },
  computed: {
    ...mapGetters({
      cartProducts: "product/cartProducts",
    }),
  },
});
</script>

<style lang="scss" scoped>
.cart-list {
  padding-top: 20px;
  &__header {
    display: none;
    @media (min-width: 640px) {
      display: block;
    }
  }
  &__row {
    display: grid;
    grid-template-columns: 180px auto 100px 100px 100px 30px;
    align-items: center;
    grid-template-rows: auto;
  }
  &__element {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    &--left {
      padding: 5px 10px;
      @media (min-width: 640px) {
        align-items: flex-start;
        text-align: left;
      }
    }
    @media (max-width: 639px) {
      padding: 5px 10px;
      align-items: flex-end;
      text-align: right;
    }
  }
}
</style>