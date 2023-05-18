<template>
  <div class="c-item">
    <div class="u-noLineHeight">
      <img :src="item.featured_image.url" />
    </div>
    <div class="c-item__details">
      <p>{{ item.title }}</p>
      <div class="c-quantity">
        <button @click="$emit('decrement')">–</button>
        <span>{{ item.quantity }}</span>
        <button @click="$emit('increment')">+</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      item: {
        type: Object
      }
    }
  }
</script>