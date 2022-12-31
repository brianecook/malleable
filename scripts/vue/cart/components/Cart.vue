<template>
  <div v-if="open" class="c-overlay" @click="open = false"></div>
  <div :class="['c-cart', {
    'c-cart--open': open
  }]">
    <div class="c-cart__inner">
      <item v-for="(item, index) in cart.items"
        :key="item.id"
        :item="item"
        @increment="() => handleChangeQuantity(index + 1, item.quantity + 1)"
        @decrement="() => handleChangeQuantity(index + 1, item.quantity - 1)"
      />
      <p>{{ cart.items_subtotal_price }}</p>
    </div>
  </div>
</template>

<script>
  import { getCart, getData, postData, select } from '@scripts/helpers';
  import Item from './Item.vue';
  
  export default {
    data() {
      return {
        cart: {
          items: [],
        },
        open: false
      }
    },
    components: { 
      Item
    },
    watch: {
      open: (open) => {
        if (open) {
          select('body').classList.add('u-noScroll');
        } else {
          select('body').classList.remove('u-noScroll');
        }
      }
    },
    methods: {
      async handleChangeQuantity(line, quantity) {
        const response = await postData('/cart/change.js', {
          line,
          quantity
        });
        this.cart = response
      },
    },
    async created() {
      const response = await getData('/cart.js');
      this.cart = response;

      document.addEventListener('cartUpdated', async () => {
        const updatedCart = await getCart();
        this.cart = updatedCart;
        this.open = true;
      })
    }
  }
</script>