import { definePage } from '../../lib/page-types';
import { P, pay, multiplier, retiredPay, colaPct, usdx, usd, day } from '../../lib/kit';

const cases: Array<[string, string, number]> = [['E-7 at 20 years', 'E-7', 20], ['E-8 at 24 years', 'E-8', 24], ['E-9 at 26 years', 'E-9', 26], ['W-4 at 22 years', 'W-4', 22], ['O-4 at 20 years', 'O-4', 20], ['O-5 at 24 years', 'O-5', 24]];
const est = (g: string, y: number, plan: 'high3' | 'brs' | 'redux') => retiredPay(plan, pay(g, y - 1), y).monthly;

export default definePage({
  id: 'military-retirement-calculator',
  group: 'retire',
  kind: 'pillar',
  order: 10,
  slug: 'military-retirement-calculator',
  nav: 'Military retirement calculator',
  card: 'High-3, BRS or REDUX retired pay from your grade or high-36 average, with the VA effect',
  title: 'Military Retirement Calculator 2026: High-3, BRS and REDUX',
  description: `Military retirement calculator 2026: High-3 pays ${P.retire.high3Mult}% a year, BRS ${P.retire.brsMult}%. An E-7 at 20 years gets about ${usd(est('E-7', 20, 'high3'))} a month (High-3), ${usd(est('E-7', 20, 'brs'))} a month under BRS.`,
  h1: 'Military retirement calculator 2026',
  intro: 'Choose your retirement system, grade and years: the calculator applies the multiplier of 10 U.S.C. 1409 to your high-36 average and shows the effect of a VA rating on the monthly total.',
  resume: `Military retired pay is the retired pay base, the average of the highest 36 months of basic pay, multiplied by a percentage that depends on the retirement system and the years of service. Under High-3, for members who joined between September 8, 1980 and December 31, 2017, it is ${P.retire.high3Mult}% a year, so 50% at twenty years and 75% at thirty. Under the Blended Retirement System, mandatory for those who joined from January 1, 2018 and chosen by many who served before, it is ${P.retire.brsMult}% a year, so 40% at twenty, with TSP matching to make up the difference. Under REDUX, for members who took the ${usd(P.retire.cspBonus)} career status bonus at fifteen years, the High-3 multiplier is reduced by one point for each year short of thirty, until age 62. An E-7 retiring at twenty years in 2026 would receive about ${usd(est('E-7', 20, 'high3'))} a month under High-3 and ${usd(est('E-7', 20, 'brs'))} under BRS. Retired pay rose ${P.retire.colaPct}% on ${day(P.retire.colaEffective)}.`,
  tool: 'retire',
  toolProps: { grade: 'E-7', years: 20, plan: 'high3' },
  faqs: [
    { q: 'How is military retirement pay calculated?', a: `Retired pay equals the high-36 average of basic pay times the multiplier: ${P.retire.high3Mult}% per year of service under High-3, ${P.retire.brsMult}% under the Blended Retirement System, and the High-3 rate minus one point per year under thirty for REDUX before age 62. Allowances such as BAH and BAS are not part of the average. Months of service count as twelfths of a year.` },
    { q: 'How much retirement does an E-7 get after 20 years?', a: `About ${usd(est('E-7', 20, 'high3'))} a month under High-3 and ${usd(est('E-7', 20, 'brs'))} under BRS, using the 2026 basic pay of an E-7 in the nineteenth year as the high-36 average. The exact figure depends on the three years actually served. Retired pay is taxable and rises each December with the cost-of-living adjustment.` },
    { q: 'What is the difference between High-3 and BRS retirement?', a: `High-3 pays ${multiplier('high3', 20)}% of the high-36 average at twenty years and has no government TSP contribution. BRS pays ${multiplier('brs', 20)}% at twenty years, but adds a 1% automatic TSP contribution and up to 4% matching, continuation pay at mid-career, and the option of a lump sum at retirement. Members who leave before twenty years get nothing from High-3, but keep their TSP under BRS.` },
    { q: 'Can I retire from the military before 20 years?', a: 'A regular non-disability retirement needs twenty years of active service. Members retired for disability under Chapter 61 can receive retired pay with fewer years, and the Temporary Early Retirement Authority, when a service uses it, allows retirement between fifteen and twenty years with a reduced multiplier. Reservists qualify with twenty good years and draw retired pay at 60, or earlier with qualifying active duty after 2008.' },
    { q: 'How much did military retired pay go up in 2026?', a: `${P.retire.colaPct}% on ${day(P.retire.colaEffective)}, the same cost-of-living adjustment as Social Security and VA compensation, first paid in January 2026. REDUX retirees received ${colaPct('redux')}%, one point less, until their recomputation at 62. Members who retired during 2025 receive a prorated first adjustment.` },
    { q: 'Does a VA disability rating reduce military retirement pay?', a: `Below a 50% rating, VA compensation is deducted from retired pay dollar for dollar, so the total does not change but part of it becomes tax free. From 50% with twenty years, CRDP restores retired pay in full. Combat-related disabilities can qualify for CRSC at any rating. The calculator shows the total for the VA rating you select.` },
  ],
  body: (h) => `
<h2>Estimated retired pay at common retirement points</h2>
${h.table(['Grade and years', 'High-3', 'BRS', 'REDUX (until 62)'], cases.map(([l, g, y]) => [l, usd(est(g, y, 'high3')), usd(est(g, y, 'brs')), usd(est(g, y, 'redux'))]), 'Monthly gross retired pay, using the 2026 basic pay of the year before retirement as the high-36 estimate. 10 U.S.C. 1409 multipliers.', ['l', 'r', 'r', 'r'])}
<p>The estimate uses the 2026 pay table, so it describes the value of a retirement in today's dollars rather than the exact amount of a member retiring this year, whose high-36 average reaches back to 2023 and 2024 rates. Enter your own average in the calculator for a precise figure.</p>
<h2>The three multipliers</h2>
<p><strong>High-3</strong> applies to members who first entered service on or after September 8, 1980 and before January 1, 2018 and did not opt into BRS. Each year of service is worth ${P.retire.high3Mult}% of the retired pay base, up to 40 years and 100%. <strong>BRS</strong> applies to everyone who entered from January 1, 2018 and to those who opted in during 2018; each year is worth ${P.retire.brsMult}%. <strong>REDUX</strong> applies to High-3 members who accepted the career status bonus at fifteen years: the multiplier loses one percentage point for each year short of thirty, so ${multiplier('redux', 20)}% at twenty years, and is restored to the High-3 figure at age 62. The ${h.a('brs-calculator', 'BRS page')}, the ${h.a('high-3-calculator', 'High-3 page')} and the ${h.a('redux', 'REDUX page')} detail each one.</p>
<h2>What comes off retired pay</h2>
<p>Gross retired pay is not what reaches the bank. The Survivor Benefit Plan premium, ${P.retire.sbpPremiumPct}% of the base amount chosen, is deducted for members who elect it (see the ${h.a('sbp-calculator', 'SBP calculator')}); federal income tax is withheld, and state tax depending on the state; a VA waiver applies below 50% (see ${h.a('crdp', 'CRDP')}); and a court order can divide retired pay with a former spouse. The ${h.a('military-retirement-pay', 'military retirement pay page')} shows typical figures by grade.</p>
<h2>Twenty years and a day, or twenty-two?</h2>
<p>Each extra year adds ${P.retire.high3Mult} points of multiplier under High-3 and ${P.retire.brsMult} under BRS, and it usually raises the pay base too, because the last three years are paid at a higher column of the table. For an E-7, retiring at twenty-two instead of twenty raises the High-3 estimate from ${usd(est('E-7', 20, 'high3'))} to ${usd(est('E-7', 22, 'high3'))} a month; for an O-5, retiring at twenty-four instead of twenty raises it from ${usd(est('O-5', 20, 'high3'))} to ${usd(est('O-5', 24, 'high3'))}. Over a retirement that can last forty years, a few more years of service weigh heavily, which the calculator lets you test with years and months.</p>
<h2>Reserve and Guard retirements</h2>
<p>Non-regular retirements use points rather than years: the number of points divided by 360 gives the years of service used in the multiplier, and retired pay usually starts at 60, earlier for those with qualifying active duty after January 2008. The pay base is the high-36 average of the basic pay a member would receive on active duty in the grade and years at the start of retired pay. The calculator works for them if you enter the equivalent years.</p>`,
  related: ['military-retirement-pay', 'brs-calculator', 'high-3-calculator', 'crdp', 'sbp-calculator', 'tsp-calculator'],
  sources: ['usc1409', 'usc1407', 'usc1401a', 'dfasBrs', 'dfasRedux'],
});
