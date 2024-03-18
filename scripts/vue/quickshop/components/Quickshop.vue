<template>
  <div v-if="open">
    <div @click="open = false" class="c-overlay"></div>
    <div class="c-modal">
      <div class="c-modal__inner">
        <div class="u-noLineHeight">
          <a :href="`/products/${product.details.handle}`">
            <img
              :src="featuredImage.src"
              :width="featuredImage.width"
              :height="featuredImage.height"
              :alt="featuredImage.alt || product.details.title"
            />
          </a>
        </div>
        <div class="c-modal__details">
          <h3>{{ product.details.title }}</h3>
          <div v-html="product.details.description"></div>
          <button class="c-btn" @click="() => handleClick(product.details.variants[0].id, 1)">Add to Cart</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import select from 'selectricity';
  import { addToCart } from '@scripts/helpers';

  export default {
    data() {
      return {
        product: {
        },
        open: false
      }
    },
    methods: {
      async handleClick(id, quantity) {
        await addToCart([{
          id,
          quantity
        }]);
        this.open = false;
      }
    },
    computed: {
      featuredImage() {
        return this.product.details.media[0];
      }
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
    async created() {
      document.addEventListener('quickshopOpened', (e) => {
        const { product } = e.detail;
        this.product = product;
        this.open = true;
      });
    }
  }
</script>