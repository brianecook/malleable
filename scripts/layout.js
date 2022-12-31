import { addToCart, clearCart, getData, select } from './helpers';
import '@styles/layout.scss';

(async () => {
  document.addEventListener('DOMContentLoaded', () => {
    select('[data-add-to-cart]').listen('click', async (e) => {
      const { id, quantity = 1 } = e.target.dataset;
      await addToCart(id, quantity);
    });
    select('[data-clear-cart]').listen('click', async () => {
      await clearCart();
    });
    select('[data-quickshop]').listen('click', async (e) => {
      const handle = e.target.dataset.quickshop;
      const parsedData = JSON.parse(handle);
      const event = new CustomEvent('quickshopOpened', {
        detail: { product: parsedData },
      });

      document.dispatchEvent(event);
    });
  });
})();
