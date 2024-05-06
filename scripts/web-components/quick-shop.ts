import select, { SelectObject } from 'selectricity';
import { getData } from '../helpers';
import { EventProduct } from '../preact/types';

export default class Quickshop extends HTMLElement {
  private quickshop: SelectObject;

  constructor() {
    super();

    this.quickshop = select('[data-quickshop]', this);

    this.quickshop.listen('click', async ({ $node }) => {
      const productUrl = $node.dataset.quickshop as string;
      const data = (await getData(`${productUrl}?view=quickshop`)) as string;
      const parsedData = JSON.parse(data) as EventProduct;
      const event = new CustomEvent('quickshopOpened', {
        detail: { product: parsedData },
      });

      document.dispatchEvent(event);
    });
  }
}
