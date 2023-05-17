export function formatMoney(cents, currency = 'USD') {
  const centsNumber = Number(cents);
  const isValidCents = centsNumber.toString().indexOf('.') > -1;
  const dollars = centsNumber / 100;

  return Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(dollars);
}
