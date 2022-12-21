<template>
  <div class="c-overlay" v-if="open" @click="open = false"></div>
  <div :class="['c-cart', {
    'c-cart--open': open
  }]">
    <div class="c-cart__inner">
      <div v-for="(item) in cart.items" :key="item.id">
        <img :src="item.featured_image.url" />
        <p>{{ item.title }} x {{ item.quantity }}</p>
      </div>
      <p>{{ cart.items_subtotal_price }}</p>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import { getCart } from '@scripts/helpers';
  
  export default {
    data() {
      return {
        cart: {},
        open: false
      }
    },
    methods: {
      
    },
    async created() {
      const response = await axios.get('/cart.js');
      this.cart = response.data;

      document.addEventListener('cartUpdated', async () => {
        const updatedCart = await getCart();
        this.cart = updatedCart;
        this.open = true;
      })
    }
  }
</script>