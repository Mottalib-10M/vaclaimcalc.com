/** Bilateral factor: two limb ratings and one other rating, with and without the 10%. */
import type { MiniSpec } from '../mini-types';
import { combine, combinedValue, toTens } from '../engine/va';
import { ratingOpts } from './_kit';
const opts = [{ value: '0', label: 'None' }, ...ratingOpts()];
export default (): MiniSpec => ({
  title: 'Bilateral factor: both knees, both arms',
  cta: 'Combine all your ratings', ctaHref: '/en/va-combined-rating-table/',
  inputs: [
    { id: 'l', label: 'Left leg rating', def: 10, options: ratingOpts() },
    { id: 'r', label: 'Right leg rating', def: 10, options: ratingOpts() },
    { id: 'o', label: 'Other rating (back, PTSD…)', def: 50, options: opts },
  ],
  run: (v) => {
    const c = combine([{ rating: v.l, limb: 'leg', side: 'left' }, { rating: v.r, limb: 'leg', side: 'right' }, { rating: v.o }]);
    const plain = combinedValue([v.l, v.r, v.o]);
    return { head: ['Combined rating with the bilateral factor', `${c.rating}%`], rows: [['Bilateral value (legs + 10%)', `${c.bilateral}`], ['Combined value', `${c.value}`], ['Without the factor', `${plain} → ${toTens(plain)}%`]] };
  },
});
