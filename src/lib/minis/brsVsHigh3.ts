/** BRS against High-3: pension difference and the TSP matching that has to make it up. */
import type { MiniSpec } from '../mini-types';
import { retiredPay } from '../engine/retire';
import { tspProject } from '../engine/edu';
import { usd2, usd } from './_kit';
export default (): MiniSpec => ({
  title: 'BRS or High-3: what the 2% multiplier costs, what the match brings',
  cta: 'Military retirement calculator', ctaHref: '/en/military-retirement-calculator/',
  inputs: [
    { id: 'h', label: 'High-36 average basic pay', def: 6500, unit: '$', max: 30000 },
    { id: 'y', label: 'Years of service', def: 20, unit: 'yrs', max: 40 },
    { id: 'p', label: 'Average basic pay over the career', def: 4500, unit: '$', max: 30000 },
  ],
  run: (v) => {
    const gap = retiredPay('high3', v.h, v.y).monthly - retiredPay('brs', v.h, v.y).monthly;
    const match = tspProject({ annualPay: v.p * 12, contribPct: 5, brs: true, years: v.y, returnPct: 0, balance: 0, raisePct: 0 }).gov;
    return { head: ['Smaller pension under BRS, per month', usd2(gap)], rows: [['Per year', usd(gap * 12)], ['Service TSP money over the career (5%, no growth)', usd(match)], ['Years of BRS pension gap it covers', gap > 0 ? `${Math.round((match / (gap * 12)) * 10) / 10}` : '–']] };
  },
});
