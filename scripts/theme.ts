import select from 'selectricity';
import Quickshop from './web-components/quick-shop';
import AccordionItem from './web-components/accordion-item';
import '@styles/theme.scss';

const { addToCart, clearCart } = window.helpers;

(() => {
  select('[data-add-to-cart]').listen('click', async ({ $node }) => {
    const { id, quantity = 1 } = $node.dataset;
    await addToCart(Number(id), Number(quantity));
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
  customElements.define('accordion-item', AccordionItem);
})();
