<template>
  <div class="cart-list">
    <template v-if="cartProducts.length > 0">
      <CartItem v-for="cartItem in cartProducts" :key="cartItem.id" :cartItem="cartItem" />
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
    CartItem
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
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;
  width: 100%;
}
</style>