/** Post-9/11 GI Bill tier from days of service, and what it pays at a private school. */
import type { MiniSpec } from '../mini-types';
import { giTier } from '../engine/edu';
import { P, usd } from './_kit';
export default (): MiniSpec => ({
  title: 'Your Post-9/11 GI Bill percentage',
  cta: 'GI Bill calculator', ctaHref: '/en/gi-bill-calculator/',
  inputs: [{ id: 'd', label: 'Days of active duty since 9/11/2001', def: 800, unit: 'days', max: 20000 }],
  run: (v) => {
    const t = giTier(v.d);
    return { head: ['Eligibility tier', `${t}%`], rows: [['Private school tuition cap at your tier', usd((P.gi.privateCap * t) / 100)], ['Online housing allowance', `${usd((P.gi.onlineMha * t) / 100)} a month`], ['Books per year (max)', usd((P.gi.books * t) / 100)]], note: t === 0 ? 'Under 90 days: no Post-9/11 GI Bill unless discharged for a service-connected disability after 30 days.' : undefined };
  },
});
