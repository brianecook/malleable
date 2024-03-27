<template>
  <div v-if="open">
    <div @click="open = false" class="c-overlay"></div>
    <div class="c-quickshop">
      <button class="c-btnIcon c-quickshop__close" @click="open = false">
        <v-icon class="c-btnIcon__icon" name="hi-x" />
      </button>
      <div class="c-quickshop__inner">
        <div class="c-quickshop__image u-noLineHeight">
          <a :href="`/products/${product.handle}`">
            <img
              class="u-full"
              :src="featuredImage.src"
              :width="featuredImage.width"
              :height="featuredImage.height"
              :alt="featuredImage.alt || product.title"
            />
          </a>
        </div>
        <div class="c-quickshop__details">
          <h2>{{ product.title }}</h2>
          <div class="c-quickshop__description rte" v-html="product.description"></div>
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
  import { OhVueIcon, addIcons } from 'oh-vue-icons';
  import { HiX } from 'oh-vue-icons/icons/hi';

  addIcons(HiX);

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
      ProductActions,
      "v-icon": OhVueIcon
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