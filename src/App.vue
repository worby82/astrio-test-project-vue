<template>
  <Header />
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "./components/Header.vue";

export default defineComponent({
  components: {
    Header,
  },
});
</script>

<style lang="scss">
*,
*::after,
*::before {
  padding: 0;
  margin: 0;
  border: 0;
  box-sizing: border-box;
}
*:focus-visible {
  outline: none;
}

html,
body {
  width: 100%;
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
}

img,
svg {
  line-height: 0;
}

#root {
  height: 100%;
  display: flex;
  flex-direction: column;
}

h1 {
  font-style: normal;
  font-weight: 600;
  font-size: 22px;
  line-height: 30px;
}

h2 {
  font-style: normal;
  font-weight: 400;
  font-size: 25px;
  line-height: 120%;
}

h3 {
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 25px;
}

h4 {
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 120%;
}

h5 {
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
}

a {
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  text-decoration: none;
  transition: 0.3s;
  color: #1e64aa;
  &:hover {
    transition: 0.3s;
    color: #041d36;
  }
}

input:focus,
input:active,
button:focus,
button:active {
  outline: none;
}

button::-moz-focus-inner {
  padding: 0;
  border: 0;
}
button {
  background: none;
}

label {
  cursor: pointer;
}

* {
  scrollbar-width: thin;
  scrollbar-color: rgba(16, 24, 32, 0.2);
}

*::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

*::-webkit-scrollbar-track {
  background: none;
}

*::-webkit-scrollbar-thumb {
  background-color: rgba(16, 24, 32, 0.2);
  border-radius: 10px;
  border: none;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  opacity: 1;
}
.button {
  background-color: #fff;
  border: 1px solid #041d36;
  padding: 5px 15px;
  border-radius: 5px;
  transition: 0.3s;
  text-transform: uppercase;
  max-width: 130px;
  margin: 0 auto;
  &:hover {
    transition: 0.3s;
    background-color: #041d36;
    color: #fff;
    cursor: pointer;
  }
}
</style>