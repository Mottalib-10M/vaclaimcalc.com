/** FERS military buy-back: deposit against the annuity gained. */
import type { MiniSpec } from '../mini-types';
import { fers, militaryDeposit } from '../engine/retire';
import { usd } from './_kit';
export default (): MiniSpec => ({
  title: 'Is the FERS military deposit worth it?',
  cta: 'FERS retirement calculator', ctaHref: '/en/fers-retirement-calculator/',
  inputs: [
    { id: 'h', label: 'Expected high-3 salary', def: 90000, unit: '$', max: 500000 },
    { id: 'm', label: 'Military years to buy back', def: 4, unit: 'yrs', max: 30 },
    { id: 'e', label: 'Military basic pay earned in those years', def: 110000, unit: '$', max: 2000000 },
  ],
  run: (v) => {
    const gain = fers(v.h, 20, v.m, 62).annual - fers(v.h, 20, 0, 62).annual;
    const d = militaryDeposit(v.e);
    return { head: ['Annuity added per year', usd(gain)], rows: [['Deposit (3%, before interest)', usd(d)], ['Years to recover it', gain > 0 ? `${Math.round((d / gain) * 10) / 10}` : '–'], ['Assumption', '20 civilian years, start at 62']] };
  },
});
