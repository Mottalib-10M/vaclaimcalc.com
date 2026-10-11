/** BAS 2026 by status. */
import type { MiniSpec } from '../mini-types';
import { P, usd2, usd } from './_kit';
export default (): MiniSpec => ({
  title: 'Your BAS in 2026',
  cta: 'Military pay calculator', ctaHref: '/en/military-pay-calculator/',
  inputs: [
    { id: 's', label: 'Status', def: 0, options: [{ value: '0', label: 'Enlisted' }, { value: '1', label: 'Officer or warrant' }, { value: '2', label: 'Enlisted, BAS II' }] },
    { id: 'm', label: 'Months', def: 12, options: [{ value: '1', label: '1 month' }, { value: '12', label: '12 months' }] },
  ],
  run: (v) => {
    const b = [P.pay.bas.enlisted, P.pay.bas.officer, P.pay.bas.basII][v.s];
    const prev = [P.pay.bas2025.enlisted, P.pay.bas2025.officer, P.pay.bas2025.enlisted * 2][v.s];
    return { head: [`BAS for ${v.m} month${v.m > 1 ? 's' : ''}`, usd2(b * v.m)], rows: [['Monthly rate 2026', usd2(b)], ['Monthly rate 2025', usd2(prev)], ['Per year, tax free', usd(Math.round(b * 12))]] };
  },
});
