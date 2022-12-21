import { addToCart, clearCart, getData } from './helpers';
import '@styles/layout.scss';

(async () => {
  document
    .querySelector('[data-add-to-cart]')
    .addEventListener('click', async () => {
      await addToCart(44090469744915, 2);
    });
  document
    .querySelector('[data-clear-cart]')
    .addEventListener('click', async () => {
      await clearCart();
    });
})();

const elva = {
  select(selector) {
    return document.querySelectorAll(selector);
  },
  listen(selector, event, callback) {
    this.select(selector).forEach(($el) => {
      $el.addEventListener(event, callback);
    });
  },
};

window.elva = elva;
