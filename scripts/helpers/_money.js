const { currency, locale, country } = window.Shopify;

export function formatMoney(cents, localCurrency = currency.active) {
  const dollars = cents / 100;
  return Intl.NumberFormat(`${locale}-${country}`, {
    style: 'currency',
    currency: localCurrency,
  }).format(dollars);
}
