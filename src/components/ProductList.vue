<template>
  <div class="product-list">
    <template v-if="filterProducts.length > 0">
      <ProductItem
        v-for="product in filterProducts"
        :key="product.id"
        :product="product"
      />
    </template>
    <template v-else>
      <h3>Products no found</h3>
    </template>
  </div>
</template>

<script lang="ts">
import { IRootState } from "@/types";
import { defineComponent } from "vue";
import { mapActions, mapGetters, MapperForState, mapState } from "vuex";
import ProductItem from "./ProductItem.vue";

export default defineComponent({
  components: { ProductItem },
  name: "ProductList",
  methods: {
    ...mapActions({
      fetchProducts: "product/fetchProducts",
    }),
  },
  mounted() {
    this.fetchProducts();
  },
  computed: {
    ...mapState<MapperForState>({
      products: (state: IRootState) => state.product.products,
    }),
    ...mapGetters({
      filterProducts: "product/filterProducts",
    }),
  },
});
</script>

<style lang="scss" scoped>
.product-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  height: 100%;
  width: 100%;
}
</style>
