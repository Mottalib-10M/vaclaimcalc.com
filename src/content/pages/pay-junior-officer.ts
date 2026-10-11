import { definePage } from '../../lib/page-types';
import { P, pay, basePay, steps, colLabel, colIndex, bas, bah, usdx, usd, day } from '../../lib/kit';

const G = ['O-1', 'O-2', 'O-3'];
const Y = [0, 2, 3, 4, 6, 8, 10, 12, 14];
const cell = (g: string, y: number) => { const v = basePay(g, y); return v == null ? 'n/a' : usdx(v); };
const stations: Array<[string, string]> = [['Fort Bragg', 'NC182'], ['Norfolk', 'VA298'], ['Colorado Springs', 'CO046'], ['San Diego', 'CA038'], ['Washington DC', 'DC053']];

export default definePage({
  id: 'pay-junior-officer',
  group: 'pay',
  kind: 'grade',
  order: 240,
  slug: 'junior-officer-pay-o1-o3',
  nav: 'O-1 to O-3 pay',
  card: 'Second lieutenant or ensign to captain or lieutenant: 2026 basic pay and allowances',
  title: `O-1 to O-3 Pay 2026: Lieutenant and Captain Basic Pay`,
  description: `O-1 to O-3 pay 2026: a new O-1 earns ${usdx(pay('O-1', 0))} a month, an O-2 over 2 years ${usdx(pay('O-2', 2))} and an O-3 over 6 ${usdx(pay('O-3', 6))}, plus officer BAS and BAH by duty station.`,
  h1: 'Junior officer pay (O-1 to O-3) in 2026',
  intro: 'Basic pay for second lieutenants and ensigns, first lieutenants and lieutenants junior grade, captains and Navy lieutenants, with what the allowances add at a few stations.',
  resume: `A newly commissioned O-1, second lieutenant or ensign, earns ${usdx(pay('O-1', 0))} a month of basic pay in 2026, an O-2 with more than two years ${usdx(pay('O-2', 2))} and an O-3 with more than six years ${usdx(pay('O-3', 6))}, after the ${P.pay.raisePct}% raise of ${day(P.pay.effective)}. The O-1 row stops rising at over ${steps('O-1').lastYears} years and the O-2 row at over ${steps('O-2').lastYears}, because officers normally pin on the next grade before then: promotion to O-2 usually comes after about two years and to O-3 after about four. The O-3 row climbs until over ${steps('O-3').lastYears} years, to ${usdx(steps('O-3').top)}. These rates apply to officers commissioned without significant prior enlisted service; those with more than four years of active enlisted or warrant service are paid at the higher O-1E to O-3E rates. Officers receive BAS of ${usdx(bas('O-1'))} and BAH at officer rates, which in high-cost areas can approach basic pay.`,
  mini: 'gradePay',
  miniArg: { grades: G },
  faqs: [
    { q: 'How much does a second lieutenant make in 2026?', a: `${usdx(pay('O-1', 0))} a month of basic pay during the first two years, then ${usdx(pay('O-1', 2))} over 2 years. With officer BAS of ${usdx(bas('O-1'))} and BAH, the total depends on the station: with dependents, an O-1 receives ${usd(bah('NC182', 'O-1'))} of BAH at Fort Bragg and ${usd(bah('CA038', 'O-1'))} in San Diego. Only basic pay is taxed.` },
    { q: 'How much does an O-3 make with 8 years of service?', a: `${usdx(pay('O-3', 8))} a month of basic pay in 2026 for an O-3 with more than eight years. An O-3 with that seniority who has more than four years of prior enlisted service is paid ${usdx(pay('O-3E', 8))} instead, at the O-3E rate. The O-3 row keeps rising until over ${steps('O-3').lastYears} years.` },
    { q: 'Is an Army captain paid the same as a Navy lieutenant?', a: 'Yes. Both are O-3, and the DFAS basic pay table is the same for the Army, Navy, Air Force, Marine Corps, Space Force, Coast Guard, Public Health Service and NOAA Corps. A Navy lieutenant (O-3) is not the same grade as an Army lieutenant (O-1 or O-2), a common source of confusion when comparing pay.' },
    { q: 'Do officer academy years count toward pay?', a: 'No. Time as a cadet or midshipman at a service academy does not count toward the years of service used in the pay table, and neither does ROTC. An officer commissioned from the academy starts at the "2 or less" column. Prior enlisted or reserve service before the academy does count.' },
  ],
  body: (h) => `
<h2>O-1 to O-3 basic pay, 2026</h2>
${h.table(['Years', ...G], Y.map((y) => [colLabel(colIndex(y)), ...G.map((g) => cell(g, y))]), `Monthly basic pay, DFAS, effective ${day(P.pay.effective)}. Rows do not change after the last column shown.`, ['l', 'r', 'r', 'r'])}
<h2>Promotion, not seniority, drives junior officer pay</h2>
<p>The junior officer rows are short on purpose. An O-1 who stays an O-1 stops gaining at over three years, an O-2 at over six. Since promotion to O-2 and O-3 is close to automatic for officers in good standing, at roughly two and four years, the real progression is diagonal: ${usdx(pay('O-1', 0))} on commissioning, ${usdx(pay('O-2', 2))} as a first lieutenant or lieutenant junior grade at two years, ${usdx(pay('O-3', 4))} as a captain or Navy lieutenant at four, and ${usdx(pay('O-3', 8))} at eight. That is an increase of more than half in basic pay over eight years, before any yearly raise.</p>
<h2>What the allowances add, station by station</h2>
${h.table(['Station', 'O-1 with dependents', 'O-3 with dependents', 'O-3 without'], stations.map(([n, c]) => [n, usd(bah(c, 'O-1')), usd(bah(c, 'O-3')), usd(bah(c, 'O-3', false))]), 'Monthly BAH 2026, DTMO.', ['l', 'r', 'r', 'r'])}
<p>For a junior officer, BAH is often the largest single factor in the comparison between assignments. In the Washington area, an O-3 with dependents receives ${usd(bah('DC053', 'O-3'))} of BAH, against ${usd(bah('NC182', 'O-3'))} at Fort Bragg, while basic pay is the same. BAS is a flat ${usdx(bas('O-3'))} for every officer, lower than the enlisted rate. The ${h.a('military-pay-calculator', 'military pay calculator')} adds basic pay, BAH and BAS for any ZIP code.</p>
<h2>Service commitments and the money that follows</h2>
<p>Most junior officers serve under an active-duty commitment after commissioning or training, and pilots and some specialists carry longer ones. During those years, saving in the TSP with the Blended Retirement System match is the main lever: an O-2 over 2 years who puts 5% of basic pay into the TSP contributes ${usdx(pay('O-2', 2) * 0.05)} a month and receives the same amount from the service once the full match applies. The ${h.a('tsp-calculator', 'TSP calculator')} projects it, and the ${h.a('pay-field-grade', 'O-4 to O-6 page')} shows the next steps of the officer table.</p>
<h2>Junior officers with prior service</h2>
<p>An officer commissioned after more than four years of active enlisted or warrant officer service is paid from a separate set of rates, O-1E to O-3E, which start at the "over 4" column and run higher: an O-3E with more than ten years earns ${usdx(pay('O-3E', 10))} against ${usdx(pay('O-3', 10))} for an O-3. The ${h.a('pay-prior-enlisted', 'O-1E to O-3E page')} explains who qualifies.</p>
<h2>Grade names across the services</h2>
<p>O-1 is second lieutenant in the Army, Air Force, Marine Corps and Space Force and ensign in the Navy and Coast Guard; O-2 is first lieutenant or lieutenant junior grade; O-3 is captain or, in the Navy and Coast Guard, lieutenant. The pay is identical for the same grade and years in every service.</p>`,
  related: ['pay-prior-enlisted', 'pay-field-grade', 'military-pay-chart', 'military-pay-calculator', 'tsp-calculator'],
  sources: ['dfasOfficer', 'dfasBas', 'dtmoBah'],
});
