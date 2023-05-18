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

  select('[data-option]').listen('click', ($target) => {
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

    $target
      .closest('[data-options]')
      .querySelectorAll('[data-option]')
      .forEach(($option) => {
        $option.removeAttribute('data-selected', '');
      });
    $target.setAttribute('data-selected', '');

    getVariant($target.closest('[data-product-options]'));
  });
})();
