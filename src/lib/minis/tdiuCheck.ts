/** TDIU schedular test of 38 CFR 4.16(a) and the 100% rate it pays. */
import type { MiniSpec } from '../mini-types';
import { compensation, tdiuSchedular } from '../engine/va';
import { usd2, ratingOpts, yesNo } from './_kit';
export default (): MiniSpec => ({
  title: 'Do your ratings meet the TDIU threshold?',
  cta: 'Full VA disability calculator', ctaHref: '/en/',
  inputs: [
    { id: 'h', label: 'Highest single rating', def: 50, options: ratingOpts() },
    { id: 'c', label: 'Combined rating', def: 70, options: ratingOpts() },
    { id: 's', label: 'Married?', def: 1, options: yesNo },
  ],
  run: (v) => {
    const ok = v.c >= v.h && tdiuSchedular([v.h], v.c);
    const full = compensation(100, { spouse: v.s === 1, kids: 0, school: 0, parents: 0, spouseAA: false }).monthly;
    const now = compensation(v.c, { spouse: v.s === 1, kids: 0, school: 0, parents: 0, spouseAA: false }).monthly;
    return { head: ['Schedular threshold', ok ? 'Met' : 'Not met'], rows: [['TDIU pays (100% rate)', usd2(full)], [`Your ${v.c}% rate`, usd2(now)], ['Difference per month', usd2(full - now)]], note: v.c < v.h ? 'The combined rating cannot be lower than the highest single rating.' : undefined };
  },
});
