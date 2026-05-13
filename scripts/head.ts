import { createStorefrontApiClient } from '@shopify/storefront-api-client';
import * as helpers from './helpers';
import { Helpers } from './types';

window.helpers = {
  ...helpers,
} as Helpers;

window.client = createStorefrontApiClient({
  storeDomain: `http://${window.Shopify.shop}`,
  apiVersion: '2024-04',
  publicAccessToken: process.env.STOREFRONT_API_TOKEN as string,
});
