<template>
  <div class="c-productActions">
    <div v-if="product.available">
      <div v-if="!singleVariantProduct">
        <div class="c-productActions__row" v-for="(option, optionIndex) in this.product.options_with_values" :key="optionIndex">
          <div class="c-productActions__option">
            <strong>{{ option.name }}</strong>
            <ul v-if="option.name !== 'Color' && option.name !== 'Pattern'" class="c-productActions__values">
              <li v-for="(value, index) in option.values" :key="index">
                <button
                  :class="['c-productActions__value', {
                    'c-productActions__value--disabled': checkOptionDisabled(value, optionIndex),
                    'c-productActions__value--selected': selectedOptions[optionIndex] === value
                  }]"
                  :disabled="checkOptionDisabled(value, optionIndex)"
                  @click="() => {
                    handleOptionChange(value, optionIndex);
                  }"
                >
                  {{ value }}
                </button>
              </li>
            </ul>
            <ul v-else class="c-swatches">
              <li v-for="(value, index) in option.values" :key="index">
                <button
                  :class="['c-swatches__swatch', {
                    'c-swatches__swatch--selected': selectedOptions[optionIndex] === value
                  }]"
                  :disabled="checkOptionDisabled(value, optionIndex)"
                  @click="() => {
                    handleOptionChange(value, optionIndex);
                  }"
                  :style="`background-image: url(${getSwatchAsset(value)});`"
                >
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div class="c-productActions__row">
          {{ selectedOptionsText }} - {{ selectedVariantPrice }}
        </div>
      </div>
      <div class="c-productActions__atc">
        <quantity
          :quantity="quantity"
          @increment="quantity++"
          @decrement="quantity > 1 && quantity--"
        />
        <btn
          :adding="adding"
          @click="handleAddToCart"
        >
          Add to Cart
        </btn>
      </div>
    </div>
    <div v-else>
      <button class="c-btn" disabled>Out of Stock</button>
    </div>
  </div>
</template>

<script>
  import { addToCart, formatMoney } from '@scripts/helpers';
  import Quantity from '@components/Quantity.vue';
  import Btn from '@components/Btn.vue';

  export default {
    data() {
      return {
        quantity: 1,
        selectedOptions: [],
        adding: false,
      }
    },
    props: {
      product: {
        type: [Object]
      }
    },
    components: {
      Quantity,
      Btn
    },
    methods: {
      formatMoney,
      handleDec() {
        if(this.quantity > 1) {
          this.quantity--;
        }
      },
      handleOptionChange(value, index) {
        this.selectedOptions[index] = value;
      },
      async handleAddToCart() {
        const idToAdd = this.singleVariantProduct ? this.product.variants[0].id : this.selectedVariant.id;
        this.adding = true;
        await addToCart(idToAdd, this.quantity);
        this.$emit('productAddedToCart');
        this.adding = false;
      },
      checkOptionDisabled(option, index) {
        const updatedOptions = [...this.selectedOptions];
        updatedOptions[index] = option;

        const updatedOptionsVariant = this.product.variants.find(variant => variant.options.every(option => updatedOptions.includes(option)));

        return !(updatedOptionsVariant && updatedOptionsVariant.available);
      },
      getSwatchAsset(value) {
        const valueHandle = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-$/, '').replace(/^-/, '');
        const { shop } = window.Shopify;
        return `https://${shop}/cdn/shop/files/${valueHandle}.png`;
      }
    },
    computed: {
      selectedVariant() {
        return this.product?.variants?.find(variant => {
          const { option1, option2, option3 } = variant;
          const variantOptions = [option1, option2, option3].filter(option => !!option);
          if (this.selectedOptions.every(option => variantOptions.includes(option))) return variant;
        })
      },
      selectedVariantPrice() {
        return formatMoney(this.selectedVariant.price);
      },
      singleVariantProduct() {
        return this.product?.variants?.length === 1
      },
      selectedOptionsText() {
        return this.selectedOptions.join('/');
      }
    },
    watch: {
      selectedVariant: {
        handler(variant) {
          if(this.product.variants.length > 1 && window.product) {
            window.history.replaceState({ }, '', `${window.location.pathname}?variant=${variant.id}`);
          }
        }
      }
    },
    async created() {
      const urlParams = new URLSearchParams(window.location.search);
      const urlVariant = Number(urlParams.get('variant'));
      let urlVariantOptions;

      const defaultOptions = this.product.options_with_values.map(option => {
        return option.values[0]
      });

      if (urlVariant) {
        const urlVariantObject = this.product.variants.find(variant => variant.id === urlVariant);
        const { option1, option2, option3 } = urlVariantObject;
        urlVariantOptions = [option1, option2, option3].filter(option => !!option);
      }

      this.selectedOptions = urlVariant ? urlVariantOptions : defaultOptions;
    }
  }
</script>
