import { definePage } from '../../lib/page-types';
import { P, pay, basePay, steps, colLabel, colIndex, usdx, usd, day } from '../../lib/kit';

const Y = [4, 6, 8, 10, 12, 14, 16, 18, 20];
const pairs: Array<[string, string]> = [['O-1', 'O-1E'], ['O-2', 'O-2E'], ['O-3', 'O-3E']];
const cell = (g: string, y: number) => { const v = basePay(g, y); return v == null ? 'n/a' : usdx(v); };

export default definePage({
  id: 'pay-prior-enlisted',
  group: 'pay',
  kind: 'grade',
  order: 250,
  slug: 'prior-enlisted-officer-pay-o1e-o3e',
  nav: 'O-1E to O-3E pay',
  card: 'The higher rates for officers with more than four years of enlisted or warrant service',
  title: `O-1E to O-3E Pay 2026: Prior Enlisted Officer Basic Pay`,
  description: `O-1E to O-3E pay 2026 for officers with over 4 years of enlisted or warrant service: an O-3E over 10 years earns ${usdx(pay('O-3E', 10))} against ${usdx(pay('O-3', 10))} for an O-3.`,
  h1: 'Prior enlisted officer pay: O-1E, O-2E and O-3E in 2026',
  intro: 'Who is paid at the "E" officer rates, how much more they are worth than the regular O-1 to O-3 rates in 2026, and when they stop.',
  resume: `Officers in grades O-1 to O-3 who have more than four years of active enlisted service, warrant officer service or both are paid from a separate table: O-1E, O-2E and O-3E. In 2026, an O-1E with more than four years earns ${usdx(pay('O-1E', 4))} a month against ${usdx(pay('O-1', 4))} for an O-1 with the same years, an O-2E with more than eight years ${usdx(pay('O-2E', 8))} against ${usdx(pay('O-2', 8))}, and an O-3E with more than ten years ${usdx(pay('O-3E', 10))} against ${usdx(pay('O-3', 10))}, after the ${P.pay.raisePct}% raise of ${day(P.pay.effective)}. The rates recognize the experience of officers commissioned from the ranks through officer candidate school, ROTC or a commissioning program. The condition in the DFAS notes is precise: more than four years means at least four years and one day of creditable active service as an enlisted member or warrant officer. Reserve officers can qualify on the basis of 1,460 retirement points earned in enlisted or warrant status. The E rates end at promotion to O-4, where a single officer table applies again.`,
  mini: 'gradePay',
  miniArg: { grades: ['O-1E', 'O-2E', 'O-3E'] },
  faqs: [
    { q: 'Who qualifies for O-1E pay?', a: 'A commissioned officer in grade O-1, O-2 or O-3 with more than four years of active service as an enlisted member, a warrant officer or both, which DFAS defines as at least four years and one day. For reserve officers, enlisted or warrant service for which more than 1,460 points were credited counts. Officer training time and academy years do not count toward the four years.' },
    { q: 'How much more is O-3E pay than O-3 pay?', a: `It depends on the years. In 2026, at more than ten years, an O-3E earns ${usdx(pay('O-3E', 10))} a month against ${usdx(pay('O-3', 10))}, ${usdx(pay('O-3E', 10) - pay('O-3', 10))} more; at more than eighteen years, ${usdx(pay('O-3E', 18))} against ${usdx(pay('O-3', 18))}. The gap grows with seniority because the O-3E row keeps climbing until over ${steps('O-3E').lastYears} years.` },
    { q: 'What happens to O-3E pay at promotion to major?', a: `The E rates stop: an O-4 is paid from the regular officer table, ${usdx(pay('O-4', 14))} at more than fourteen years in 2026. Because the O-4 rate at a given seniority is above the O-3E rate, promotion still brings a raise, but a smaller one than for an officer coming from the regular O-3 row.` },
    { q: 'Does prior enlisted service count for officer retirement?', a: 'Yes. All active service counts toward the twenty years needed for a regular retirement, and an officer who retires as a commissioned officer must normally have ten years of active commissioned service to retire in that grade; otherwise retirement can be in the highest enlisted or warrant grade held, with possible advancement later. The high-36 average uses the pay actually received, including O-3E rates.' },
  ],
  body: (h) => `
<h2>Regular and prior-enlisted officer rates side by side</h2>
${h.table(['Years', 'O-1', 'O-1E', 'O-2', 'O-2E', 'O-3', 'O-3E'], Y.map((y) => [colLabel(colIndex(y)), ...pairs.flatMap(([a, b]) => [cell(a, y), cell(b, y)])]), `Monthly basic pay, DFAS, effective ${day(P.pay.effective)}. The E rates start at over 4 years.`, ['l', 'r', 'r', 'r', 'r', 'r', 'r'])}
<h2>Why the E rates exist</h2>
<p>A sergeant with eight years who goes through officer candidate school and becomes a second lieutenant would, on the regular table, be paid as an O-1 over 8: ${usdx(pay('O-1', 8))}. The O-1E rate for the same years is ${usdx(pay('O-1E', 8))}. Without the E rates, commissioning could mean a pay cut compared with staying enlisted and making E-6 or E-7: an E-7 over 8 years earns ${usdx(pay('E-7', 8))}. The E table removes most of that penalty and keeps the officer path attractive for experienced enlisted members, who often make up a large share of new officers in some branches.</p>
<h2>Where the E rows stop</h2>
<p>The O-1E row climbs until over ${steps('O-1E').lastYears} years and tops out at ${usdx(steps('O-1E').top)}; the O-2E row also stops at over ${steps('O-2E').lastYears}, at ${usdx(steps('O-2E').top)}; the O-3E row continues to over ${steps('O-3E').lastYears} years, reaching ${usdx(steps('O-3E').top)}. A prior enlisted captain who stays at O-3 to twenty years retires on a high-36 average close to that ceiling, which is above what a regular O-3 would reach, ${usdx(steps('O-3').top)}.</p>
<h2>Proving the four years</h2>
<p>Finance offices set the E rate from the service record. Active enlisted service in any branch counts, including time before a break in service, as does warrant officer service. Time spent as a cadet at a service academy or in an ROTC program does not count, nor does time in the Delayed Entry Program. Reserve and National Guard officers qualify through retirement points rather than calendar years: more than 1,460 points credited while in enlisted or warrant status. If your LES shows the regular rate while you have the service, ask the finance office to review the pay entry base date and the creditable service.</p>
<h2>What it means over a career</h2>
<p>The extra pay of the E rates is not small. An O-3E with more than ten years earns ${usd((pay('O-3E', 10) - pay('O-3', 10)) * 12)} more a year than a regular O-3 with the same years, and the difference counts toward the retirement base. The ${h.a('military-retirement-calculator', 'retirement calculator')} lets you enter your own high-36 average, and the ${h.a('pay-junior-officer', 'O-1 to O-3 page')} covers the regular table.</p>
<p>The E rates also matter for warrant officers who accept a commission, since their warrant years count toward the four-year condition, and for reservists who return to active duty as officers after an enlisted reserve career.</p>`,
  related: ['pay-junior-officer', 'pay-warrant', 'pay-senior-nco', 'military-pay-chart', 'pay-field-grade'],
  sources: ['dfasOE', 'dfasOfficer'],
});
