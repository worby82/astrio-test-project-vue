<template>
  <div class="test">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import './index.scss'

export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: String,
  },
});
</script>