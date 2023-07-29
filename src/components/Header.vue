<template>
  <div class="header">
    <nav class="header__navigate">
      <router-link class="header__link" to="/">
        <img class="header__image" :src="logo" alt="">
      </router-link>
      <router-link class="header__link header__link--cart" to="/cart" v-if="$route.name !== 'cart'">
        <img class="header__image" :src="cart" alt="">
        <div class="cart-count">{{totalCartCount}}</div>
      </router-link>
    </nav>
  </div>
</template>

<script lang="ts">
import { IRootState } from '@/store';
import { defineComponent } from 'vue'
import { mapGetters, MapperForState, mapState } from 'vuex';
import logo from '../assets/images/logo.png';
import cart from '../assets/images/shopping-cart.png';

export default defineComponent({
  name: 'Header',
  data() {
    return {
      logo: logo,
      cart: cart
    }
  },
  computed: {
    ...mapGetters({
      totalCartCount: 'product/totalCartCount',
    })
  }
})
</script>

<style lang="scss" scoped>
.header {
  padding: 0 20px;
  &__navigate {
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #aeaeae;
    padding: 20px 0;
  }
  &__image {
    max-height: 50px;
  }
  &__link {
    position: relative;
    &--cart {
      margin-left: auto;
    }
  }
}
.cart-count {
  position: absolute;
  width: 30px;
  height: 30px;
  top: -10px;
  right: -10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: #041d36;
  color: #fff;
}
</style>