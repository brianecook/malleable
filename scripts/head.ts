import { createStorefrontApiClient } from '@shopify/storefront-api-client';
import * as helpers from './helpers';
import { Helpers } from './types';

window.helpers = {
  ...helpers,
} as Helpers;

window.client = createStorefrontApiClient({
  storeDomain: `http://${window.Shopify.shop}`,
  apiVersion: '2024-04',
  publicAccessToken: 'c06046a92e063d4d94d02da0ffc96d8e',
});
