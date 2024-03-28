<template>
  <div v-show="open">
    <div class="c-header__overlay c-overlay" @click="open = false"></div>
    <div class="c-search">
      <div class="u-relative">
        <input class="c-input c-search__input" ref="search" type="text" v-model="searchTerm" placeholder="Search" />
        <button v-if="searchTerm" class="c-search__clear">
          <v-icon name="hi-x" scale=".8" @click="clear"></v-icon>
        </button>
      </div>
      <button class="c-search__close">
        <v-icon name="hi-x" scale="1.8" @click="open = false"></v-icon>
      </button>
    </div>
    <div class="c-header__results" v-if="results">
      <div class="o-container">
        <div class="c-header__products" v-if="results.products.length">
          <div v-for="product in results.products" :key="product.id" class="c-header__result">
            <a class="c-header__product" :href="product.url">
              <img
                :src="product.featured_image.url"
                :alt="product.featured_image.alt"
                :width="product.featured_image.width"
                :height="product.featured_image.height"
              />
              <strong>
                {{ product.title }}
              </strong>
            </a>
          </div>
        </div>
        <div v-else>
          No results found.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { getData } from '@scripts/helpers';
  import select from 'selectricity';

  const $body = select('body');

  export default {
    data() {
      return {
        open: false,
        searchTerm: '',
        results: null,
      }
    },
    watch: {
      open: {
        handler(open) {
          if (open) {
            $body.addClass('u-noScroll');
            this.$nextTick(() => this.$refs.search.focus());
          } else {
            $body.removeClass('u-noScroll');
          }
        }
      },
      searchTerm: {
        async handler(term) {
          const response = await getData(`/search/suggest.json?q=${term}`);
          this.results = response?.resources?.results;
        }
      }
    },
    methods: {
      clear() {
        this.searchTerm = '';
        this.$nextTick(() => this.$refs.search.focus());
      }
    },
    mounted() {
      document.addEventListener('searchToggled', async () => {
        this.open = !this.open;
      });
      
      this.$refs.search.addEventListener('keydown', (e) => {
        if (e.keyCode === 27) {
          this.open = false;
        }
      });
    },
  }
</script>