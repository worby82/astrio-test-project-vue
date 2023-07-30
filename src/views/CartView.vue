<template>
  <div class="cart-content">
    <h1>Shopping Cart</h1>
    <CartList />
    <h2 class="subotal">Subtotal: {{ subtotalCart }}</h2>
  </div>
</template>

<script lang="ts">
import CartList from "@/components/CartList.vue";
import { IRootState } from "@/types";
import { defineComponent } from "vue";
import { MapperForState, mapState } from "vuex";

export default defineComponent({
  components: { CartList },
  name: "CartView",
  computed: {
    ...mapState<MapperForState>({
      subtotalCart: (state: IRootState) => state.product.subtotalCart,
    }),
  },
});
</script>

<style lang="scss" scoped>
.cart-content {
  padding: 20px 10px;
  max-width: 1920px;
  margin: 0 auto;
}
.subotal {
  padding-top: 20px;
  text-align: right;
}
</style>