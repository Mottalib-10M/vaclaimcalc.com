/** SMC: level, spouse, number of SMC-K awards. */
import type { MiniSpec } from '../mini-types';
import { P, usd2, usd, yesNo, counts } from './_kit';
const LEVELS = Object.keys(P.va.smc);
export default (): MiniSpec => ({
  title: 'Special monthly compensation for your level',
  cta: 'VA disability calculator', ctaHref: '/en/',
  inputs: [
    { id: 'l', label: 'SMC level', def: 0, options: LEVELS.map((k, i) => ({ value: String(i), label: `SMC-${k}` })) },
    { id: 's', label: 'Married?', def: 0, options: yesNo },
    { id: 'k', label: 'SMC-K awards on top', def: 0, options: counts(3) },
  ],
  run: (v) => {
    const lv = LEVELS[v.l];
    const base = (v.s === 1 ? P.va.smcSpouse : P.va.smc)[lv as keyof typeof P.va.smc];
    const k = ['O/P', 'R.1', 'R.2/T'].includes(lv) ? 0 : v.k * P.va.smcK;
    return { head: [`SMC-${lv} per month`, usd2(base + k)], rows: [['Basic SMC rate', usd2(base)], ['SMC-K added', k ? usd2(k) : (v.k ? 'not with this level' : 'none')], ['Per year', usd(Math.round((base + k) * 12))]] };
  },
});
