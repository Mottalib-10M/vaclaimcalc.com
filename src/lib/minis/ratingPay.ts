/** One VA rating: monthly amount for the family entered. arg: { rating } */
import type { MiniSpec } from '../mini-types';
import { compensation, rateCell } from '../engine/va';
import { usd2, usd, counts, yesNo, parseArg } from './_kit';
export default (arg?: string): MiniSpec => {
  const { rating } = parseArg<{ rating: number }>(arg, { rating: 70 });
  const low = rating < 30;
  return {
    title: `What ${rating}% pays your family each month`,
    cta: 'Combine several ratings', ctaHref: '/en/',
    inputs: low ? [{ id: 'm', label: 'Months', def: 12, options: [{ value: '1', label: '1 month' }, { value: '12', label: '12 months' }] }] : [
      { id: 's', label: 'Married?', def: 1, options: yesNo },
      { id: 'k', label: 'Children under 18', def: 1, options: counts(6) },
      { id: 'sc', label: 'Children 18 to 23 in school', def: 0, options: counts(4) },
      { id: 'p', label: 'Dependent parents', def: 0, options: counts(2) },
    ],
    run: (v) => {
      if (low) { const m = rateCell(rating, ''); return { head: [`${rating}% for ${v.m} month${v.m > 1 ? 's' : ''}`, usd2(m * v.m)], rows: [['Per month', usd2(m)], ['Per year', usd(m * 12)], ['Dependents', 'no added amount below 30%']] }; }
      const c = compensation(rating, { spouse: v.s === 1, kids: v.k, school: v.sc, parents: v.p, spouseAA: false });
      const alone = compensation(rating).monthly;
      return { head: [`Monthly compensation at ${rating}%`, usd2(c.monthly)], rows: [['Per year, tax free', usd(c.monthly * 12)], ['Veteran alone', usd2(alone)], ['Added for your dependents', usd2(c.monthly - alone)]] };
    },
  };
};
