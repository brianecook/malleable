<template>
  <div class="c-productActions">
    <div v-if="!singleVariantProduct">
      <div class="c-productActions__option" v-for="(option, optionIndex) in this.product.options_with_values" :key="optionIndex">
        <strong>{{ option.name }}</strong>
        <ul class="c-productActions__values">
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
      </div>
    </div>
    <div class="c-productActions__atc">
      <quantity
        :quantity="quantity"
        @increment="quantity++"
        @decrement="quantity > 1 && quantity--"
      />
      <button class="c-btn" @click="() => handleAddToCart()">Add To Cart</button>
    </div>
  </div>
</template>

<script>
  import { addToCart } from '@scripts/helpers';
  import Quantity from '../../quantity/Quantity.vue';

  export default {
    data() {
      return {
        quantity: 1,
        selectedOptions: []
      }
    },
    props: {
      product: {
        type: [Object]
      }
    },
    components: {
      Quantity
    },
    methods: {
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
        await addToCart(idToAdd, this.quantity);
        this.$emit('productAddedToCart');
      },
      checkOptionDisabled(option, index) {
        const updatedOptions = [...this.selectedOptions];
        updatedOptions[index] = option;

        const variantExists = this.product.variants.find(variant => variant.options.every(option => updatedOptions.includes(option)));

        return !!!variantExists;
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
      singleVariantProduct() {
        return this.product?.variants?.length === 1
      },
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
