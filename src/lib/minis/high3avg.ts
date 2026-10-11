/** High-36 average from the last three years of basic pay. */
import type { MiniSpec } from '../mini-types';
import { retiredPay } from '../engine/retire';
import { usd2 } from './_kit';
export default (): MiniSpec => ({
  title: 'Your high-36 average and the pension it gives',
  cta: 'Military retirement calculator', ctaHref: '/en/military-retirement-calculator/',
  inputs: [
    { id: 'a', label: 'Monthly basic pay, 3rd year back', def: 5950, unit: '$', max: 30000 },
    { id: 'b', label: 'Monthly basic pay, 2nd year back', def: 6110, unit: '$', max: 30000 },
    { id: 'c', label: 'Monthly basic pay, last year', def: 6280, unit: '$', max: 30000 },
    { id: 'y', label: 'Years of service', def: 20, unit: 'yrs', max: 40 },
  ],
  run: (v) => {
    const avg = (v.a + v.b + v.c) / 3;
    return { head: ['High-36 average', usd2(avg)], rows: [['High-3 retired pay', usd2(retiredPay('high3', avg, v.y).monthly)], ['BRS retired pay', usd2(retiredPay('brs', avg, v.y).monthly)], ['Final pay would give (High-3)', usd2(retiredPay('high3', v.c, v.y).monthly)]] };
  },
});
