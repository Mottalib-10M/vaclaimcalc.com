/** GI Bill housing allowance in a list of areas. arg: { areas: [name, e5WithDependents][] } */
import type { MiniSpec } from '../mini-types';
import { P, usd, parseArg } from './_kit';
export default (arg?: string): MiniSpec => {
  const { areas } = parseArg<{ areas: Array<[string, number]> }>(arg, { areas: [['Online only', P.gi.onlineMha]] });
  const list: Array<[string, number]> = [...areas, ['Online classes only', P.gi.onlineMha]];
  return {
    title: 'GI Bill housing allowance, 2026-27',
    cta: 'GI Bill calculator by ZIP code', ctaHref: '/en/gi-bill-calculator/',
    inputs: [
      { id: 'a', label: 'Where you study', def: 0, options: list.map(([n], i) => ({ value: String(i), label: n })) },
      { id: 't', label: 'Eligibility tier', def: 100, options: P.gi.tiers.map(([, p]) => ({ value: String(p), label: `${p}%` })) },
      { id: 'c', label: 'Credits per term (12 = full time)', def: 12, options: [12, 11, 10, 9, 8, 7].map((c) => ({ value: String(c), label: `${c}` })) },
    ],
    run: (v) => {
      const rop = Math.min(100, Math.round((v.c / 12) * 10) * 10);
      const m = list[v.a][1] * (v.t / 100) * (rop / 100);
      return { head: ['Housing allowance per month', usd(m)], rows: [['Full E-5 with-dependents rate', usd(list[v.a][1])], ['Rate of pursuit (rounded)', `${rop}%`], ['For a 9-month school year', usd(m * 9)]] };
    },
  };
};
