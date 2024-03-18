import select from 'selectricity';
import Quickshop from './web-components/quick-shop';
import { addToCart, clearCart, getData, setSizeStyleProperty } from './helpers';
import '@styles/theme.scss';

(async () => {
  const $header = select('[data-header]');

  setSizeStyleProperty('--headerHeight', $header);

  select('[data-add-to-cart]').listen('click', async ({ $node }) => {
    const { id, quantity = 1 } = $node.dataset;
    await addToCart(id, quantity);
  });

  select('[data-clear-cart]').listen('click', async () => {
    await clearCart();
  });

  customElements.define('quick-shop', Quickshop);
})();
