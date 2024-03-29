import { createApp } from 'vue';
import ProductActions from './components/ProductActions.vue';

const app = createApp(ProductActions, {
  product: window.product,
});

app.mount('#v-product-actions');
