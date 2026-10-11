import { definePage } from '../../lib/page-types';
import { P, pay, basePay, bas, bah, multiplier, usd, usdx, day, colLabel } from '../../lib/kit';

const YRS = [0, 2, 3, 4, 6, 8, 10, 12, 14, 16, 18, 20];
const raise = (g: string, y: number) => pay(g, y) - pay(g, y) / (1 + P.pay.raisePct / 100);

export default definePage({
  id: 'pay-nco',
  group: 'pay',
  kind: 'grade',
  order: 210,
  slug: 'nco-pay-e5-e6',
  nav: 'E-5 and E-6 pay',
  card: 'Sergeant and staff sergeant (petty officer) basic pay 2026 by year, and where it stops rising',
  title: `E-5 and E-6 Pay 2026: ${usdx(pay('E-5', 4))} and Up, Year by Year`,
  description: `E-5 and E-6 basic pay 2026: ${usdx(pay('E-5', 4))} for an E-5 over 4 years, ${usdx(pay('E-6', 10))} for an E-6 over 10, after the ${P.pay.raisePct}% raise of January 1, 2026, for every service.`,
  h1: 'E-5 and E-6 pay in 2026',
  intro: 'Basic pay of the first noncommissioned grades for each year of service, from the DFAS table of January 1, 2026.',
  resume: `An E-5 with four years of service earns ${usdx(pay('E-5', 4))} a month of basic pay in 2026 and an E-6 with ten years ${usdx(pay('E-6', 10))}, after the ${P.pay.raisePct}% raise that took effect on ${day(P.pay.effective)}. E-5 is sergeant in the Army and Marine Corps, petty officer second class in the Navy and Coast Guard, staff sergeant in the Air Force and sergeant in the Space Force; E-6 is staff sergeant, petty officer first class or technical sergeant. The two grades share one feature that matters for a career plan: their pay stops climbing early. The E-5 table reaches its last step at over 12 years (${usdx(pay('E-5', 12))}) and the E-6 table at over 18 years (${usdx(pay('E-6', 18))}), so after that point only promotion, not time, raises basic pay. Housing and food allowances come on top and are not taxed.`,
  mini: 'gradePay',
  miniArg: { grades: ['E-5', 'E-6'] },
  faqs: [
    { q: 'How much does an E-5 make a month in 2026?', a: `Basic pay runs from ${usdx(pay('E-5', 0))} with two years or less to ${usdx(pay('E-5', 12))} from over 12 years. On top come BAS of ${usdx(bas('E-5'))} and BAH where you live off base, for example ${usd(bah('NC182', 'E-5'))} with dependents at Fort Bragg. The housing and food allowances are not taxed, so the take-home difference with a civilian salary is larger than basic pay suggests.` },
    { q: 'Does E-6 pay keep rising after 18 years?', a: `No. The DFAS table for E-6 stops at over 18 years, ${usdx(pay('E-6', 18))} a month in 2026, and the cells for over 20 years and beyond repeat that amount. An E-6 who stays to 20 and retires under High-3 therefore has a retirement base near that figure. Further raises come only from the yearly pay increase or a promotion to E-7.` },
    { q: 'How much did E-5 pay go up in 2026?', a: `By ${P.pay.raisePct}%, like every grade, on January 1, 2026. For an E-5 over 4 years, that is about ${usd(raise('E-5', 4))} more each month. The previous year, junior enlisted grades up to E-4 also received an extra 10% from April 2025, which did not apply to E-5 and E-6.` },
  ],
  body: (h) => `
<h2>E-5 and E-6 basic pay table, 2026</h2>
${h.table(['Years of service', 'E-5', 'E-6'], YRS.map((y, i) => [colLabel(i), usdx(basePay('E-5', y) ?? 0), usdx(basePay('E-6', y) ?? 0)]), 'Monthly basic pay, DFAS table effective January 1, 2026. Columns follow completed years: "over 4" means more than four full years.', ['l', 'r', 'r'])}
<h2>Where the steps stop</h2>
<p>Basic pay grows with seniority in steps, and each grade has a ceiling written into the table. For an E-5, the last increase comes at over 12 years; an E-5 who is still in that grade at 14 or 20 years earns exactly the same basic pay as at 13. For an E-6 the last step comes at over 18 years. Services use high-year tenure rules that limit how long a member can stay in these grades, which is why the cells beyond the ceiling matter little in practice: the pay table rewards promotion more than time from this point on.</p>
<p>The gap between the two grades is wider than it looks at the start. An E-6 with six years earns ${usd(pay('E-6', 6) - pay('E-5', 6))} a month more than an E-5 with the same seniority, and the difference reaches ${usd(pay('E-6', 18) - pay('E-5', 18))} at 18 years, because the E-6 table keeps climbing six years longer. Over a twenty-year career, an early promotion to E-6 is worth more in basic pay than any single raise Congress has voted in the last decade, and it also raises the retirement base. Reserve and National Guard members are paid from the same table: one drill period is one thirtieth of the monthly amount, so a weekend of four drill periods pays four thirtieths of the monthly figure for your grade and years.</p>
<h2>What an NCO actually takes home</h2>
<p>Basic pay is taxable; the allowances are not. A married E-5 with four years at Naval Station Norfolk receives ${usdx(pay('E-5', 4))} of basic pay, ${usdx(bas('E-5'))} of BAS and ${usd(bah('VA298', 'E-5'))} of BAH, so roughly ${usd(pay('E-5', 4) + bas('E-5') + bah('VA298', 'E-5'))} before taxes, of which only basic pay counts as taxable income. The ${h.a('military-pay-calculator', 'military pay calculator')} does the same sum for any ZIP code and grade.</p>
<h2>E-5 and E-6 in retirement terms</h2>
<p>Under the Blended Retirement System, a member who retires at 20 years receives ${P.retire.brsMult}% of the high-36 average per year of service, so ${multiplier('brs', 20)}%; under High-3 it is ${multiplier('high3', 20)}%. For an E-6 at 20 years whose last three years were paid at the top of the table, that is about ${usd((pay('E-6', 18) * multiplier('brs', 20)) / 100)} a month under BRS and ${usd((pay('E-6', 18) * multiplier('high3', 20)) / 100)} under High-3, before the cost-of-living adjustments. The ${h.a('military-retirement-calculator', 'retirement calculator')} gives the exact figure, and the ${h.a('pay-senior-nco', 'E-7 to E-9 page')} shows what the next promotion changes.</p>`,
  related: ['pay-junior-enlisted', 'pay-senior-nco', 'military-pay-chart', 'military-pay-calculator', 'bas-rates'],
  sources: ['dfasEnlisted', 'dfasBas'],
});
