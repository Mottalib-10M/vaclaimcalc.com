/** CRSC estimate: combat-related rating, total rating, retired pay. */
import type { MiniSpec } from '../mini-types';
import { concurrent } from '../engine/retire';
import { usd2, ratingOpts } from './_kit';
export default (): MiniSpec => ({
  title: 'CRSC or CRDP: which one pays more',
  cta: 'VA calculator with retired pay', ctaHref: '/en/',
  inputs: [
    { id: 'p', label: 'Gross retired pay per month', def: 2600, unit: '$', max: 30000 },
    { id: 'r', label: 'Total VA rating', def: 60, options: ratingOpts() },
    { id: 'c', label: 'Combat-related part', def: 40, options: ratingOpts() },
    { id: 'y', label: 'Years of service', def: 20, unit: 'yrs', max: 40 },
  ],
  run: (v) => {
    const x = concurrent({ retiredPay: v.p, rating: v.r, years: v.y, combatRating: Math.min(v.c, v.r) });
    return { head: ['Better option', x.best === 'none' ? 'Neither' : x.best.toUpperCase()], rows: [['CRDP restores', x.crdpEligible ? usd2(x.crdp) : 'not eligible'], ['CRSC (estimate, tax free)', usd2(x.crsc)], ['Total each month', usd2(x.totalMonthly)]] };
  },
});
