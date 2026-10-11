/** Veterans Pension: MAPR minus countable income. */
import type { MiniSpec } from '../mini-types';
import { P, usd, counts } from './_kit';
const N = P.va.pension;
export default (): MiniSpec => ({
  title: 'Veterans Pension for your household',
  cta: 'VA disability calculator', ctaHref: '/en/',
  inputs: [
    { id: 'd', label: 'Dependents (spouse, children)', def: 1, options: counts(6) },
    { id: 'a', label: 'Care level', def: 0, options: [{ value: '0', label: 'Basic' }, { value: '1', label: 'Housebound' }, { value: '2', label: 'Aid and Attendance' }] },
    { id: 'i', label: 'Countable income per year', def: 12000, unit: '$', max: 200000 },
  ],
  run: (v) => {
    const key = (['basic', 'housebound', 'aa'] as const)[v.a];
    const mapr = v.d === 0 ? N.alone[key] : N.oneDep[key] + Math.max(0, v.d - 1) * N.addDep;
    const year = Math.max(0, mapr - v.i);
    return { head: ['Pension per month', usd(year / 12)], rows: [['MAPR (yearly limit)', usd(mapr)], ['Pension per year', usd(year)], ['Net worth limit', usd(N.netWorthLimit)]], note: year === 0 ? 'Income at or above the MAPR: no pension.' : undefined };
  },
});
