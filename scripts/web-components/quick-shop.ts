import select, { SelectObject } from 'selectricity';
import type { Product } from '@shopify/hydrogen-react/storefront-api-types';
import { quickshopQuery } from '../graphql/queries';

export default class Quickshop extends HTMLElement {
  private quickshop: SelectObject;

  constructor() {
    super();

    this.quickshop = select('[data-quickshop]', this);

    this.quickshop.listen('click', async ({ $node }) => {
      const handle = $node.dataset.quickshop as string;

      const {
        data: { product },
      } = (await window.client.request(quickshopQuery, {
        variables: {
          handle,
        },
      })) as { data: { product: Product } };

      const event = new CustomEvent('quickshopOpened', {
        detail: { product },
      });

      document.dispatchEvent(event);
    });
  }
}
