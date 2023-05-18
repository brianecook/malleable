import {
  addToCart,
  clearCart,
  getData,
  select,
  setSizeStyleProperty,
} from './helpers';
import '@styles/theme.scss';

(async () => {
  const $header = select('[data-header]');

  setSizeStyleProperty('--headerHeight', $header);

  select('[data-add-to-cart]').listen('click', async ($target) => {
    const { id, quantity = 1 } = $target.dataset;
    await addToCart(id, quantity);
  });

  select('[data-clear-cart]').listen('click', async () => {
    await clearCart();
  });

  select('[data-quickshop]').listen('click', async ($target) => {
    const productUrl = $target.dataset.quickshop;
    const data = await getData(`${productUrl}?view=quickshop`);
    const parsedData = JSON.parse(data);
    const event = new CustomEvent('quickshopOpened', {
      detail: { product: parsedData },
    });

    document.dispatchEvent(event);
  });
})();
