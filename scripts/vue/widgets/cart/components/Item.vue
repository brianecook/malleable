<template>
  <div class="c-item">
    <div class="u-noLineHeight">
      <a :href="item.url">
        <img :src="item.featured_image.url" />
      </a>
    </div>
    <div class="c-item__details">
      <p>{{ item.title }}</p>
      <p>{{ formatMoney(item.price) }}</p>
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
  import { formatMoney } from '@scripts/helpers';
  import Quantity from '@components/Quantity.vue';

  export default {
    props: {
      item: {
        type: Object
      }
    },
    methods: {
      formatMoney,
    },
    components: {
      Quantity
    },
  }
</script>../../../../helpers