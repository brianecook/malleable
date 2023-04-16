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
      const productUrl = e.target.dataset.quickshop;
      const data = await getData(`${productUrl}?view=quickshop`);
      const parsedData = JSON.parse(data);
      const event = new CustomEvent('quickshopOpened', {
        detail: { product: parsedData },
      });

      document.dispatchEvent(event);
    });
    select('[data-option]').listen('click', (e) => {
      const { target } = e;

      function getVariant($container) {
        const values = [];

        $container.querySelectorAll('[data-selected]').forEach(($option) => {
          values.push($option.getAttribute('data-option'));
        });

        const $selectedOption = $container.querySelector(
          `[data-options="${values.join(',')}"]`
        );

        $container.querySelector('[data-variant-select]').selectedIndex =
          $selectedOption.index;
        $container
          .querySelector('[data-add-to-cart]')
          .setAttribute('data-id', $selectedOption.textContent.trim());
      }

      target
        .closest('[data-options]')
        .querySelectorAll('[data-option]')
        .forEach(($option) => {
          $option.removeAttribute('data-selected', '');
          $option.classList.remove('u-underline');
        });
      target.setAttribute('data-selected', '');
      target.classList.add('u-underline');

      getVariant(target.closest('[data-product-options]'));
    });
  });
})();
