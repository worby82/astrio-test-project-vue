<template>
  <ul class="filter">
    <li class="filter__item" :class="{'filter__item--active': selectedBrand === null}" @click="setSelectedBrand(null)">All brands</li>
    <li class="filter__item" :class="{'filter__item--active': brand.id === selectedBrand}" v-for="brand in brands" :key="brand.id" @click="setSelectedBrand(brand.id)">{{brand.title}}</li>
  </ul>
</template>

<script lang="ts">
import { IRootState } from '@/store'
import { defineComponent } from 'vue'
import { mapActions, mapMutations, MapperForState, mapState } from 'vuex'

export default defineComponent({
  name: 'Filter',
  props: {
    modelValue: {
      type: Number
    },
  },
  methods: {
    ...mapActions({
      fetchBrands: 'brand/fetchBrands',
    }),
    ...mapMutations({
      setSelectedBrand: 'product/setSelectedBrand'
    }),
  },
  mounted() {
    this.fetchBrands()
  },
  computed: {
    ...mapState<MapperForState>({
      brands: (state: IRootState) => state.brand.brands,
      selectedBrand: (state: IRootState) => state.product.selectedBrand
    })
  }  
})
</script>

<style lang="scss" scoped>
.filter {
  width: 100%;
  max-width: 320px;
  padding: 0 20px;
  
  max-width: 120px;
  padding: 0 10px;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  list-style: none;
  border-right: 1px solid #aeaeae;
  position: sticky;
  top: 5px;
  &__item {
    padding: 5px;
    text-align: left;
    border-radius: 5px;
    border: 1px solid transparent;
    transition: .3s;
    &:hover {
      transition: .3s;
      border-color: #041d36;
      color: #041d36;
      cursor: pointer;
    }
    &--active {
      transition: .3s;
      background-color: #041d36;
      border-color: #041d36;
      color: #fff;
      &:hover {
        background-color: #041d36;
        color: #fff;
        cursor: default;
      }
    }
    @media (min-width: 1280px) {
      padding: 5px 15px;
    }
  }
  @media (min-width: 1280px) {
    max-width: 240px;
    padding: 0 20px;
  }
}
</style>