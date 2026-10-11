/** Retired pay at a grade and years: High-3 against BRS, from the 2026 basic pay of the grade. */
import type { MiniSpec } from '../mini-types';
import { basePayOrFirst } from '../engine/pay';
import { retiredPay } from '../engine/retire';
import { usd2, usd, gradeOpts } from './_kit';
const GR = ['E-5', 'E-6', 'E-7', 'E-8', 'E-9', 'W-2', 'W-3', 'W-4', 'W-5', 'O-3', 'O-3E', 'O-4', 'O-5', 'O-6'];
export default (): MiniSpec => ({
  title: 'Retired pay by grade: High-3 and BRS',
  cta: 'Military retirement calculator', ctaHref: '/en/military-retirement-calculator/',
  inputs: [
    { id: 'g', label: 'Grade at retirement', def: 2, options: gradeOpts(GR) },
    { id: 'y', label: 'Years of service', def: 20, unit: 'yrs', max: 40 },
  ],
  run: (v) => {
    const base = basePayOrFirst(GR[v.g], Math.max(0, v.y - 1)).pay;
    const h = retiredPay('high3', base, v.y), b = retiredPay('brs', base, v.y);
    return { head: ['High-3 retired pay per month', usd2(h.monthly)], rows: [['BRS retired pay per month', usd2(b.monthly)], ['High-36 base used (2026 rate)', usd2(base)], ['Difference per year', usd((h.monthly - b.monthly) * 12)]] };
  },
});
