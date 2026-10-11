/** Basic pay for the grades of a page. arg: { grades: string[] } */
import type { MiniSpec } from '../mini-types';
import { basePayOrFirst, colLabel } from '../engine/pay';
import { P, usd2, usd, parseArg, gradeOpts } from './_kit';
export default (arg?: string): MiniSpec => {
  const { grades } = parseArg<{ grades: string[] }>(arg, { grades: ['E-4', 'E-5', 'E-6'] });
  return {
    title: `${grades[0]} to ${grades[grades.length - 1]} basic pay in 2026`,
    cta: 'Full military pay chart', ctaHref: '/en/military-pay-chart/',
    inputs: [
      { id: 'g', label: 'Pay grade', def: Math.min(1, grades.length - 1), options: gradeOpts(grades) },
      { id: 'y', label: 'Completed years of service', def: 4, unit: 'yrs', max: 45 },
    ],
    run: (v) => {
      const g = grades[v.g];
      const r = basePayOrFirst(g, v.y);
      const before = r.pay / (1 + P.pay.raisePct / 100);
      return { head: [`${g}, ${colLabel(r.col).toLowerCase()}`, usd2(r.pay)], rows: [['Per year', usd(r.pay * 12)], [`Before the ${P.pay.raisePct}% raise (approx.)`, usd(before)], ['Per drill (1/30 of a month)', usd2(r.pay / 30)]], note: r.adjusted ? `No ${g} rate at ${v.y} years in the DFAS table; first rate shown.` : undefined };
    },
  };
};
