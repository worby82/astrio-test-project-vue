<template>
  <div class="cart-item">
    <img
      class="cart-item__image"
      :src="cartItem.image"
      :alt="cartItem.title"
    />
    <div class="cart-item__info">
      <h3>{{ cartItem.brand }} / {{ cartItem.title }}</h3>
      <div v-if="cartItem.type !== 'simple'">
        <p>Color: {{ cartItem.color }}</p>
        <p>Size: {{ cartItem.size }}</p>
      </div>
    </div>
    <div>
      <p>
        {{
          priceFormat(
            cartItem.regular_price.currency,
            cartItem.regular_price.value
          )
        }}
      </p>
      <input
        type="number"
        min="1"
        :value="cartItem.count"
        @change="
          setCartItemCount({ id: cartItem.id, count: +$event.target.value })
        "
      />
      <p>
        {{
          priceFormat(
            cartItem.regular_price.currency,
            cartItem.regular_price.value * cartItem.count
          )
        }}
      </p>
      <button class="button" @click="deleteCartItem(cartItem.id)">
        Delete
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapMutations } from "vuex";
import priceFormat from "@/utils/priceFormat";

export default defineComponent({
  name: "CartItem",
  data() {
    return {
      priceFormat,
    };
  },
  props: {
    cartItem: {
      type: Object,
      required: true
    }
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
  display: flex;
  gap: 10px;
  width: 100%;
}
</style>