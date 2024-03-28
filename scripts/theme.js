import select from 'selectricity';
import Quickshop from './web-components/quick-shop';
import { addToCart, clearCart } from './helpers';
import '@styles/theme.scss';

(async () => {
  select('[data-add-to-cart]').listen('click', async ({ $node }) => {
    const { id, quantity = 1 } = $node.dataset;
    await addToCart(id, quantity);
  });

  select('[data-clear-cart]').listen('click', async () => {
    await clearCart();
  });

  select('[data-cart-toggle]').listen('click', () => {
    const event = new CustomEvent('cartToggled');
    document.dispatchEvent(event);
  });

  select('[data-search]').listen('click', () => {
    const event = new CustomEvent('searchToggled');
    document.dispatchEvent(event);
  });

  customElements.define('quick-shop', Quickshop);
})();
