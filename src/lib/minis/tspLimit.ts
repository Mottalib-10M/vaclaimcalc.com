/** TSP 2026: personal limit by age and the BRS match for a contribution rate. */
import type { MiniSpec } from '../mini-types';
import { tspLimit, brsMatch } from '../engine/edu';
import { usd, pc } from './_kit';
export default (): MiniSpec => ({
  title: 'Your 2026 TSP limit and BRS match',
  cta: 'TSP calculator', ctaHref: '/en/tsp-calculator/',
  inputs: [
    { id: 'a', label: 'Age at the end of 2026', def: 35, unit: 'yrs', max: 90 },
    { id: 'c', label: 'Your contribution', def: 5, unit: '%', max: 100 },
    { id: 'p', label: 'Annual basic pay', def: 48000, unit: '$', max: 1000000 },
  ],
  run: (v) => {
    const l = tspLimit(v.a); const m = brsMatch(v.c);
    return { head: ['Most you can put in yourself in 2026', usd(l.total)], rows: [['Catch-up part', usd(l.catchUp)], ['BRS service contribution', `${pc(m.total, 0)} = ${usd((v.p * m.total) / 100)}`], ['Months to reach the limit', (v.p * v.c) / 100 > 0 ? `${Math.min(12, Math.ceil(l.elective / ((v.p * v.c) / 1200)))}` : '–']] };
  },
});
