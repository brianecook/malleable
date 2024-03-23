<template>
  <div class="c-item">
    <div class="u-noLineHeight">
      <img :src="item.featured_image.url" />
    </div>
    <div class="c-item__details">
      <p>{{ item.title }}</p>
      <div class="c-item__bottom">
        <div class="c-item__actions">
          <quantity
            :miniumum="0"
            :quantity="item.quantity"
            @increment="$emit('increment')"
            @decrement="$emit('decrement')"
          />
        </div>
        <button @click="$emit('remove')">
          <v-icon name="hi-trash" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import Quantity from '../../quantity/Quantity.vue';

  export default {
    props: {
      item: {
        type: Object
      }
    },
    components: {
      Quantity
    },
  }
</script>