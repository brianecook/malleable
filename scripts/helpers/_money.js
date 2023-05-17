export function formatMoney(cents, currency = 'USD') {
  const centsNumber = Number(cents);
  const dollars = centsNumber / 100;

  return Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(dollars);
}
