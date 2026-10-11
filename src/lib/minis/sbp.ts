/** SBP: annuity and premium for a base amount. */
import type { MiniSpec } from '../mini-types';
import { sbp } from '../engine/retire';
import { P, usd2, usd } from './_kit';
export default (): MiniSpec => ({
  title: 'Survivor Benefit Plan: what it costs, what it pays',
  cta: 'Military retirement calculator', ctaHref: '/en/military-retirement-calculator/',
  inputs: [
    { id: 'r', label: 'Gross retired pay per month', def: 3200, unit: '$', max: 30000 },
    { id: 'b', label: 'Base amount chosen (% of retired pay)', def: 100, unit: '%', max: 100 },
  ],
  run: (v) => {
    const base = (v.r * Math.max(0, Math.min(100, v.b))) / 100;
    const s = sbp(base);
    return { head: ['Monthly annuity to your survivor', usd2(s.annuity)], rows: [[`Premium (${P.retire.sbpPremiumPct}% of the base)`, `${usd2(s.premium)} a month`], ['Premium per year', usd(s.premium * 12)], ['Years of premiums for one year of annuity', `${Math.round((s.annuity / s.premium) * 10) / 10}`]] };
  },
});
