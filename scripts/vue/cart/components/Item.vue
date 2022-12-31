<template>
  <div>
    <img :src="item.featured_image.url" />
    <p>{{ item.title }} x {{ item.quantity }}</p>
    <button @click="$emit('increment')">+</button>
    <button @click="$emit('decrement')">-</button>
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