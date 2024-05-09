const apiHelpers = require('./scripts/helpers/api');
const cartHelpers = require('./scripts/helpers/cart');
const domHelpers = require('./scripts/helpers/dom');
const moneyHelpers = require('./scripts/helpers/money');
const shopifyHelpers = require('./scripts/helpers/shopify');

beforeAll(() => {
  global.window.Shopify = {
    shop: 'test.myshopify.com',
    country: 'US',
    locale: 'en-US',
    currency: {
      active: 'USD',
      rate: '1.00',
    },
  };
  global.window.helpers = {
    ...apiHelpers,
    ...cartHelpers,
    ...domHelpers,
    ...moneyHelpers,
    ...shopifyHelpers,
  };
});