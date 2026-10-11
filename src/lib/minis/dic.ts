/** DIC for a surviving spouse (veteran died on or after January 1, 1993). */
import type { MiniSpec } from '../mini-types';
import { P, usd2, yesNo, counts } from './_kit';
const D = P.va.dic;
export default (): MiniSpec => ({
  title: 'DIC for a surviving spouse',
  cta: 'VA disability rates', ctaHref: '/en/va-disability-rates/',
  inputs: [
    { id: 'k', label: 'Children under 18', def: 1, options: counts(6) },
    { id: 'e', label: '8-year provision applies?', def: 0, options: yesNo },
    { id: 'a', label: 'Aid and Attendance?', def: 0, options: yesNo },
  ],
  run: (v) => {
    const after = D.base + v.k * D.child + (v.e ? D.eightYear : 0) + (v.a ? D.aa : 0);
    const first = after + (v.k ? D.transitional : 0);
    return { head: ['DIC per month', usd2(first)], rows: [['Base rate', usd2(D.base)], ['Children under 18', usd2(v.k * D.child)], ['After the 2-year transitional benefit', usd2(after)]] };
  },
});
