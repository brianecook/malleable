import { formatMoney } from '../_money';

test('returns string dollar value from Number cents', () => {
  expect(formatMoney(1000)).toBe('$10.00');
});

test('returns string dollar value from String cents', () => {
  expect(formatMoney('1000')).toBe('$10.00');
});
