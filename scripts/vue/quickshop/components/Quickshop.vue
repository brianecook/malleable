<template>
  <div v-if="open">
    <div @click="open = false" class="c-overlay"></div>
    <div class="c-modal">
      <div class="c-modal__inner">
        <div class="u-noLineHeight">
          <a :href="`/products/${product.handle}`">
            <img
              :src="featuredImage.src"
              :width="featuredImage.width"
              :height="featuredImage.height"
              :alt="featuredImage.alt || product.title"
            />
          </a>
        </div>
        <div class="c-modal__details">
          <h3>{{ product.title }}</h3>
          <div v-html="product.description"></div>
          <product-actions
            :product="product"
            @productAddedToCart="open = false"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import select from 'selectricity';
  import ProductActions from '../../product-actions/components/ProductActions.vue';

  export default {
    data() {
      return {
        product: {
        },
        open: false
      }
    },
    computed: {
      featuredImage() {
        return this.product.media[0];
      },
    },
    watch: {
      open: () => {
        const $body = select('body');
        $body.toggleClass('u-noScroll');
      }
    },
    components: {
      ProductActions
    },
    async created() {
      document.addEventListener('quickshopOpened', (e) => {
        const { product: { details, options_with_values } } = e.detail;
        this.product = {
          ...details,
          options_with_values
        };
        this.open = true;
      });
    }
  }
</script>