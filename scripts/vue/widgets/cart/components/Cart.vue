<template>
  <div v-if="open" class="c-overlay" @click="open = false"></div>
  <div :class="['c-cart', {
    'c-cart--open': open
  }]">
    <div class="c-cart__inner">
      <div class="c-cart__header">
        <div>
          <strong>Your Cart</strong> ({{ cart.item_count }} {{ cart.item_count === 1 ? 'item' : 'items' }})
        </div>
        <button class="c-cart__close" @click="open = false">
          <v-icon name="hi-x" />
        </button>
      </div>
      <div class="c-cart__items">
        <item v-for="(item, index) in cart.items"
          :key="item.id"
          :item="item"
          @increment="() => handleChangeQuantity(index + 1, item.quantity + 1)"
          @decrement="() => handleChangeQuantity(index + 1, item.quantity - 1)"
          @remove="() => handleChangeQuantity(index + 1, 0)"
        />
      </div>
    </div>
    <div class="c-cart__bottom">
      <p class="c-cart__subtotal">Total: {{ subtotal }}</p>
      <a class="c-cart__cta c-btn" href="/checkout">Checkout</a>
    </div>
  </div>
</template>

<script>
  import select from 'selectricity';
  import { getCart, getData, postData, formatMoney } from '@scripts/helpers';
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
    methods: {
      async handleChangeQuantity(line, quantity) {
        const response = await postData('/cart/change.js', {
          line,
          quantity
        });
        this.cart = response
      },
    },
    watch: {
      open: (open) => {
        if (open) {
          select('body').addClass('u-noScroll');
        } else {
          select('body').removeClass('u-noScroll');
        }
      }
    },
    computed: {
      subtotal() {
        return formatMoney(this.cart.items_subtotal_price);
      }
    },
    async created() {
      const response = await getData('/cart.js');
      this.cart = response;

      document.addEventListener('cartToggled', async () => {
        this.open = !this.open;
      });

      document.addEventListener('cartUpdated', async () => {
        const updatedCart = await getCart();
        this.cart = updatedCart;
        this.open = true;
      })
    }
  }
</script>