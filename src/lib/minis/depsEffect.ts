/** What each dependent adds at a rating. */
import type { MiniSpec } from '../mini-types';
import { compensation, rateCell } from '../engine/va';
import { usd2, counts, yesNo, ratingOpts } from './_kit';
export default (): MiniSpec => ({
  title: 'What your dependents add to VA compensation',
  cta: 'Full VA disability calculator', ctaHref: '/en/',
  inputs: [
    { id: 'r', label: 'Combined rating', def: 70, options: ratingOpts(30) },
    { id: 's', label: 'Married?', def: 1, options: yesNo },
    { id: 'k', label: 'Children under 18', def: 2, options: counts(6) },
    { id: 'sc', label: 'Children 18 to 23 in school', def: 0, options: counts(4) },
  ],
  run: (v) => {
    const c = compensation(v.r, { spouse: v.s === 1, kids: v.k, school: v.sc, parents: 0, spouseAA: false });
    const alone = compensation(v.r).monthly;
    return { head: ['Added each month for dependents', usd2(c.monthly - alone)], rows: [['Total at this rating', usd2(c.monthly)], ['Each extra child under 18', usd2(rateCell(v.r, 'addChild'))], ['Each child in school', usd2(rateCell(v.r, 'addSchool'))]] };
  },
});
