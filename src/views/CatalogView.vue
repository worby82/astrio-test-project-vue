<template>
  <div class="catalog-content">
    <Filter />
    <ProductList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ProductList from "@/components/ProductList.vue";
import Filter from "@/components/Filter.vue";

export default defineComponent({
  name: "CatalogView",
  components: {
    ProductList,
    Filter,
  },
});
</script>

<style lang="scss" scoped>
.catalog-content {
  display: flex;
  gap: 20px;
  padding: 20px 10px;
  max-width: 1920px;
  margin: 0 auto;
}
</style>