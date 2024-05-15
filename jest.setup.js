const helpers = require('./scripts/helpers');

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
    ...helpers,
  };
});
