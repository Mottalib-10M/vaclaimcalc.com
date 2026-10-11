/** REDUX against High-3, and the recomputation at 62. */
import type { MiniSpec } from '../mini-types';
import { retiredPay, multiplier } from '../engine/retire';
import { usd2, pc } from './_kit';
export default (): MiniSpec => ({
  title: 'REDUX: the multiplier cut and what age 62 restores',
  cta: 'Military retirement calculator', ctaHref: '/en/military-retirement-calculator/',
  inputs: [
    { id: 'h', label: 'High-36 average basic pay', def: 6200, unit: '$', max: 30000 },
    { id: 'y', label: 'Years of service', def: 20, unit: 'yrs', max: 40 },
  ],
  run: (v) => {
    const r = retiredPay('redux', v.h, v.y), h = retiredPay('high3', v.h, v.y);
    return { head: ['REDUX retired pay until 62', usd2(r.monthly)], rows: [['REDUX multiplier', pc(multiplier('redux', v.y))], ['High-3 instead', usd2(h.monthly)], ['From age 62 (recomputed)', usd2(r.at62 ?? 0)]] };
  },
});
