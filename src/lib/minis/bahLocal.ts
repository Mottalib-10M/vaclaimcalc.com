/** BAH of one housing area. arg: { name, grades, w, wo } (rates from the DTMO 2026 file, written by the page). */
import type { MiniSpec } from '../mini-types';
import { usd, yesNo, parseArg } from './_kit';
export default (arg?: string): MiniSpec => {
  const a = parseArg<{ name: string; grades: string[]; w: number[]; wo: number[] }>(arg, { name: 'this area', grades: ['E-5'], w: [0], wo: [0] });
  const def = Math.max(0, a.grades.indexOf('E-5'));
  return {
    title: `BAH 2026 in ${a.name}`,
    cta: 'BAH calculator by ZIP code', ctaHref: '/en/bah-calculator/',
    inputs: [
      { id: 'g', label: 'Pay grade', def, options: a.grades.map((g, i) => ({ value: String(i), label: g })) },
      { id: 'd', label: 'With dependents?', def: 1, options: yesNo },
    ],
    run: (v) => {
      const r = (v.d ? a.w : a.wo)[v.g];
      const o = (v.d ? a.wo : a.w)[v.g];
      return { head: [`${a.grades[v.g]} ${v.d ? 'with' : 'without'} dependents`, usd(r)], rows: [['Per year, tax free', usd(r * 12)], [v.d ? 'Without dependents' : 'With dependents', usd(o)], ['Difference', usd(Math.abs(r - o))]] };
    },
  };
};
