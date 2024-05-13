export function formatMoney(
  cents: number,
  localCurrency: string = window.Shopify.currency.active
) {
  const { locale, country } = window.Shopify;
  const dollars = cents / 100;
  return Intl.NumberFormat(`${locale}-${country}`, {
    style: 'currency',
    currency: localCurrency,
  }).format(dollars);
}
