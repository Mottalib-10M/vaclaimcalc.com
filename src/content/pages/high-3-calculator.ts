import { definePage } from '../../lib/page-types';
import { P, pay, retiredPay, multiplier, usd, usdx, day } from '../../lib/kit';

/** High-36 average of a member retiring at `y` years in grade `g`, assuming 36 months in grade at 2026 rates. */
const avg36 = (g: string, y: number) => (pay(g, y - 3) + pay(g, y - 2) + pay(g, y - 1)) / 3;

export default definePage({
  id: 'high-3-calculator',
  group: 'retire',
  kind: 'guide',
  order: 40,
  slug: 'high-3-calculator',
  nav: 'High-3 calculator',
  card: 'How the high-36 month average is built, why it is not your final pay, and the High-3 pension',
  title: 'High-3 Calculator 2026: High-36 Average and Military Pension',
  description: `High-3 calculator 2026: the pension is ${P.retire.high3Mult}% per year of the highest 36 months of basic pay. An E-8 at 22 years averages about ${usd(avg36('E-8', 22))} a month at 2026 rates.`,
  h1: 'High-3: the high-36 average and the pension it gives',
  intro: 'How the retired pay base of the High-3 system is computed from your last three years of basic pay, and what that average turns into at twenty years and beyond.',
  resume: `Under the High-3 system, which applies to members who joined between September 8, 1980 and December 31, 2017 and did not move to BRS, retired pay is ${P.retire.high3Mult}% of the retired pay base for each year of service. The base is the average of the 36 highest months of basic pay, usually the last three years, as set by 10 U.S.C. 1407. Because pay rises over those three years through yearly raises and seniority steps, the average is lower than final pay: for an E-8 retiring at twenty-two years who spent the last three years in grade, the average at 2026 rates is about ${usd(avg36('E-8', 22))} against a final monthly basic pay of ${usdx(pay('E-8', 21))}. At twenty years the multiplier is ${multiplier('high3', 20)}%, at thirty ${multiplier('high3', 30)}%, and it can reach 100% at forty. Allowances such as BAH and BAS, special pays and bonuses are not part of the average. The calculator below averages three years of basic pay that you enter and shows the pension under High-3 and BRS.`,
  mini: 'high3avg',
  faqs: [
    { q: 'What is the high-36 month average for military retirement?', a: 'It is the average of the 36 months in which you received the highest basic pay, divided by 36, under 10 U.S.C. 1407. For most members these are the last three years before retirement. Only basic pay counts; BAH, BAS, special and incentive pays and bonuses are excluded. A month of partial service counts proportionally.' },
    { q: 'Why is my High-3 pension lower than half my final pay?', a: `Because the base is the average of 36 months, not the last month. Yearly raises, such as the ${P.pay.raisePct}% of 2026, and seniority steps make the earlier months lower. An E-8 retiring at twenty-two years with a final basic pay of ${usdx(pay('E-8', 21))} has an average near ${usd(avg36('E-8', 22))} at 2026 rates, so the pension is ${multiplier('high3', 22)}% of that average rather than of final pay.` },
    { q: 'Does a promotion just before retirement count in High-3?', a: 'Only for the months served in the new grade. If you are promoted twelve months before retirement, twelve of the 36 months are at the higher rate and twenty-four at the lower one. Officers must also normally serve three years in the grades of O-5 and above to retire in that grade, although the high-36 uses the pay actually received.' },
    { q: 'Who is under the High-3 system?', a: 'Members who first entered the uniformed services on or after September 8, 1980 and before January 1, 2018, unless they opted into the Blended Retirement System in 2018 or elected the career status bonus with REDUX. Members who entered before September 8, 1980 are under the older Final Pay system, based on the final month of basic pay.' },
  ],
  body: (h) => `
<h2>From three years of pay to a pension</h2>
${h.table(['Retirement', 'Final basic pay', 'High-36 average', 'High-3 pension'], [['E-7', 20], ['E-8', 22], ['E-9', 26], ['W-4', 24], ['O-5', 22], ['O-6', 26]].map(([g, y]) => { const a = avg36(g as string, y as number); return [`${g} at ${y} years`, usdx(pay(g as string, (y as number) - 1)), usd(a), usd(retiredPay('high3', a, y as number).monthly)]; }), 'Monthly amounts at 2026 rates, assuming the last 36 months in the same grade; yearly raises are not included, which would lower the average a little more.', ['l', 'r', 'r', 'r'])}
<p>The table holds the pay table fixed at 2026 rates and moves only the seniority, so the gap between final pay and the average comes from seniority steps alone. In real life the yearly raises add to it: a member retiring in 2027 averages months paid at 2024, 2025 and 2026 rates, each lower than the next.</p>
<h2>How the 36 months are counted</h2>
<p>DFAS takes the 36 months with the highest basic pay, which need not be consecutive, although they almost always are the last ones. A month in which the member was paid only part of the month counts proportionally. For reservists retiring at 60, the base uses the basic pay rates in effect during the 36 months before retired pay begins, applied to the grade and years the member would have, which can give a higher base than their actual drill pay suggests. Members who entered before September 8, 1980 use their final month of basic pay instead.</p>
<h2>The multiplier and the years</h2>
<p>Each year of creditable service is worth ${P.retire.high3Mult}%, and each extra month one twelfth of that. Twenty years and six months gives ${multiplier('high3', 20, 6)}%. The multiplier is capped at 100%, reached at forty years. For members under REDUX, the same base is used but the multiplier is cut by one point per year short of thirty until age 62; see the ${h.a('redux', 'REDUX page')}. For BRS, the base is the same but each year is worth ${P.retire.brsMult}%; see the ${h.a('brs-calculator', 'BRS calculator')}.</p>
<h2>Timing a High-3 retirement</h2>
<p>Because the base averages three years, the months just before retirement matter less than members often think, and a late promotion adds only a third of its value to the base for each year served in grade. What moves the pension most is the number of years, through the multiplier, and the seniority steps reached in the last three years. A member near a step, for example just before "over 22" in the pay table, gains twice by staying past it: a higher multiplier and higher months in the average. The ${h.a('military-retirement-calculator', 'military retirement calculator')} lets you test those dates, and the ${h.a('military-pay-chart', '2026 pay chart')} shows where the steps fall for your grade.</p>
<h2>Final Pay, High-3, BRS: three bases in one force</h2>
<p>Today's retirees are paid under three different rules depending on when they first entered service. Those who entered before September 8, 1980 use their final month of basic pay, which gives the highest base for the same career. Those who entered later use the high-36 average described here, whether under High-3 or REDUX. Members under the Blended Retirement System use the same high-36 base but a ${P.retire.brsMult}% multiplier. Two members retiring the same day in the same grade can therefore receive noticeably different pensions, and the date of first entry, shown in personnel records, decides which rule applies.</p>
<h2>What happens after retirement</h2>
<p>The pension computed from the base rises each December with the cost-of-living adjustment, ${P.retire.colaPct}% on ${day(P.retire.colaEffective)}, and the first adjustment is prorated for members who retired during the year. The base itself never changes after retirement. Deductions such as the Survivor Benefit Plan premium and any VA waiver come off the gross amount; see the ${h.a('sbp-calculator', 'SBP calculator')} and ${h.a('crdp', 'CRDP')}.</p>
<p>Members who expect a court-ordered division of retired pay should know that, for divorces after December 23, 2016, the share of a former spouse is generally computed on the high-36 and years of service at the date of the divorce, increased by the cost-of-living adjustments since, rather than on the base at retirement.</p>`,
  related: ['military-retirement-calculator', 'brs-calculator', 'redux', 'military-retirement-pay', 'military-pay-chart'],
  sources: ['usc1407', 'usc1409', 'dfasEnlisted'],
});
