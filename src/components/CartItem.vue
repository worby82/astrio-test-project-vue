<template>
  <div class="cart-item">
    <div class="cart-item__row cart-item__row--headers">
      <div class="cart-item__element"></div>
      <div class="cart-item__element">Item</div>
      <div class="cart-item__element">Price</div>
      <div class="cart-item__element">Quantity</div>
      <div class="cart-item__element">Total</div>
      <div class="cart-item__element"></div>
    </div>
    <div class="cart-item__row">
      <div class="cart-item__element">
        <img
          class="cart-item__image"
          :src="cartItem.image"
          :alt="cartItem.title"
        />
      </div>
      <div class="cart-item__element cart-item__element--left">
        <h3>{{ cartItem.brand }} / {{ cartItem.title }}</h3>
        <div v-if="cartItem.type !== 'simple'" class="cart-item__attributes">
          <p>Color: {{ cartItem.color }}</p>
          <p>Size: {{ cartItem.size }}</p>
        </div>
      </div>
      <div class="cart-item__element">
        <p>
          {{
            priceFormat(
              cartItem.regular_price.currency,
              cartItem.regular_price.value
            )
          }}
        </p>
      </div>
      <div class="cart-item__element">
        <input
          class="cart-item__quantity"
          type="number"
          min="1"
          :value="cartItem.count"
          @change="
            setCartItemCount({ id: cartItem.id, count: +$event.target.value })
          "
        />
      </div>
      <div class="cart-item__element">
        <p>
          {{
            priceFormat(
              cartItem.regular_price.currency,
              cartItem.regular_price.value * cartItem.count
            )
          }}
        </p>
      </div>
      <div class="cart-item__element">
        <img
          class="cart-item__image cart-item__image--btn"
          :src="trash"
          alt=""
          @click="deleteCartItem(cartItem.id)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapMutations } from "vuex";
import priceFormat from "@/utils/priceFormat";
import trash from "../assets/images/trash.png";

export default defineComponent({
  name: "CartItem",
  data() {
    return {
      priceFormat,
      trash: trash,
    };
  },
  props: {
    cartItem: {
      type: Object,
      required: true,
    },
  },
  methods: {
    ...mapMutations({
      deleteCartItem: "product/deleteCartItem",
      setCartItemCount: "product/setCartItemCount",
    }),
  },
});
</script>

<style lang="scss" scoped>
.cart-item {
  display: grid;
  grid-template-columns: 30% 70%;
  grid-template-rows: auto;
  padding: 10px 0;
  border-bottom: 1px solid #aeaeae;
  &__attributes {
    padding-top: 10px;
    display: flex;
    flex-direction: column;
    gap: 5px;
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
  &__image {
    width: auto;
    height: 100%;
    &--btn {
      cursor: pointer;
    }
    @media (min-width: 640px) {
      width: 100%;
      height: auto;
    }
  }
  &__quantity {
    width: 100%;
    max-width: 100px;
    padding: 5px;
    border: 1px solid #3a3a3a;
    border-radius: 5px;
  }
  &__row {
    display: grid;
    grid-template-rows: 100px auto repeat(4, 30px);
    &--headers .cart-item__element {
      align-items: flex-start;
      text-align: left;
    }
    @media (min-width: 640px) {
      grid-template-columns: 180px auto 100px 100px 100px 30px;
      align-items: center;
      grid-template-rows: auto;
      &--headers {
        display: none;
      }
    }
  }
  @media (min-width: 640px) {
    grid-template-columns: auto;
    grid-template-rows: auto;
    justify-items: unset;
  }
}
</style>