import select from 'selectricity';
import { getData } from '../helpers';

export default class Quickshop extends HTMLElement {
  constructor() {
    super();

    this.quickshop = select('[data-quickshop]', this);

    this.quickshop.listen('click', async ({ $node }) => {
      const productUrl = $node.dataset.quickshop;
      const data = await getData(`${productUrl}?view=quickshop`);
      const parsedData = JSON.parse(data);
      const event = new CustomEvent('quickshopOpened', {
        detail: { product: parsedData },
      });

      document.dispatchEvent(event);
    });
  }
}
