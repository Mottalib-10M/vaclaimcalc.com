import { definePage } from '../../lib/page-types';
import { P, pay, retiredPay, sbp, usd, day } from '../../lib/kit';

const est = (g: string, y: number, plan: 'high3' | 'brs') => retiredPay(plan, pay(g, y - 1), y).monthly;
const grid: Array<[string, number]> = [['E-6', 20], ['E-7', 20], ['E-7', 24], ['E-8', 22], ['E-9', 24], ['E-9', 30], ['W-3', 20], ['W-4', 24], ['W-5', 30], ['O-3', 20], ['O-4', 20], ['O-5', 22], ['O-5', 26], ['O-6', 26], ['O-6', 30]];

export default definePage({
  id: 'military-retirement-pay',
  group: 'retire',
  kind: 'guide',
  order: 20,
  slug: 'military-retirement-pay',
  nav: 'Military retirement pay chart',
  card: 'Estimated monthly retired pay by grade and years under High-3 and BRS, and what is deducted',
  title: 'Military Retirement Pay 2026: Chart by Grade and Years',
  description: `Military retirement pay 2026 by grade: about ${usd(est('E-7', 20, 'high3'))} a month for an E-7 at 20 years under High-3, ${usd(est('O-5', 22, 'high3'))} for an O-5 at 22. BRS figures and the ${P.retire.colaPct}% COLA.`,
  h1: 'Military retirement pay in 2026, grade by grade',
  intro: 'What a regular military retirement is worth each month at the most common retirement points, under High-3 and the Blended Retirement System, and what comes out of it.',
  resume: `A military retiree's monthly pay depends on three numbers: the high-36 average of basic pay, the years of service and the retirement system. At 2026 rates, an E-7 retiring at twenty years would receive about ${usd(est('E-7', 20, 'high3'))} a month under High-3 and ${usd(est('E-7', 20, 'brs'))} under the Blended Retirement System; an E-9 at twenty-four years about ${usd(est('E-9', 24, 'high3'))} and ${usd(est('E-9', 24, 'brs'))}; an O-5 at twenty-two years about ${usd(est('O-5', 22, 'high3'))} and ${usd(est('O-5', 22, 'brs'))}. These estimates take the 2026 basic pay of the year before retirement as the high-36 average, which is close to the actual figure for members retiring in the next few years. Retired pay is adjusted every December by the change in consumer prices; the adjustment on ${day(P.retire.colaEffective)} was ${P.retire.colaPct}%. It is taxable at the federal level, and the Survivor Benefit Plan premium and any VA waiver reduce what is paid.`,
  mini: 'retPayGrade',
  faqs: [
    { q: 'How much is military retirement pay for an O-4 at 20 years?', a: `About ${usd(est('O-4', 20, 'high3'))} a month under High-3 and ${usd(est('O-4', 20, 'brs'))} under BRS, using the 2026 O-4 basic pay of the nineteenth year as the high-36 average. A major or lieutenant commander who serves to twenty-two years raises the High-3 figure to about ${usd(est('O-4', 22, 'high3'))}, from both the higher multiplier and the higher pay base.` },
    { q: 'Is military retirement pay for life?', a: 'Yes. Regular retired pay is paid monthly for the rest of the retiree’s life, adjusted each December for inflation. It stops at death; a surviving spouse continues to receive income only through the Survivor Benefit Plan if the retiree elected it at retirement. Retirees remain subject to recall in some circumstances, though this is rare.' },
    { q: 'Is military retirement pay taxed?', a: 'Retired pay is subject to federal income tax and DFAS withholds it based on the W-4P election. Many states exempt military retired pay fully or partially, and a few states have no income tax at all. Disability retired pay can be partly excluded, and VA compensation received through the waiver is tax free.' },
    { q: 'When does military retirement pay start?', a: 'For an active-duty retiree, the first payment covers the first month after the retirement date and is made on the first business day of the following month. Reserve and Guard members with a non-regular retirement start drawing retired pay at 60, or earlier if they served qualifying active duty after January 28, 2008, and must apply to their branch.' },
    { q: 'How much does SBP cost a military retiree?', a: `${P.retire.sbpPremiumPct}% of the base amount chosen, which can be the full gross retired pay or a lower amount. With a base of ${usd(3000)}, the premium is ${usd(sbp(3000).premium)} a month and the surviving spouse would receive ${usd(sbp(3000).annuity)} a month, adjusted for inflation. Premiums stop after 360 payments once the retiree reaches 70.` },
  ],
  body: (h) => `
<h2>Estimated retired pay chart, 2026</h2>
${h.table(['Grade at retirement', 'Years', 'High-3 per month', 'BRS per month'], grid.map(([g, y]) => [g, `${y}`, usd(est(g, y, 'high3')), usd(est(g, y, 'brs'))]), 'Gross monthly retired pay estimated with the 2026 DFAS basic pay of the year before retirement as the high-36 average; 10 U.S.C. 1409 multipliers.', ['l', 'r', 'r', 'r'])}
<h2>How to read the chart</h2>
<p>The figures are gross, before taxes, the Survivor Benefit Plan premium and any VA waiver. They describe a member who reaches the grade early enough to have spent the last three years in it; a member promoted shortly before retirement may have a lower high-36 average, and an officer who has not served three years in the grade of O-5 or above may retire in the previous grade. The BRS column applies to members who joined from 2018 or opted in during 2018; at twenty years most of today's retirees are still under High-3.</p>
<h2>From gross to net</h2>
<p>Take a married E-7 retiring at twenty years under High-3 with about ${usd(est('E-7', 20, 'high3'))} of gross retired pay. If the retiree elects full SBP coverage, ${usd(sbp(est('E-7', 20, 'high3')).premium)} a month goes to the premium, which is excluded from taxable income. If the retiree has a VA rating below 50%, the VA amount is deducted from retired pay and paid separately, tax free. Federal income tax is withheld from the rest. A former spouse with a court order under the Uniformed Services Former Spouses' Protection Act may receive part of disposable retired pay directly from DFAS.</p>
<h2>COLA, and why the first one is smaller</h2>
<p>Retired pay rises each December by the same percentage as Social Security benefits, measured on consumer prices for wage earners. The increase for December 2025 was ${P.retire.colaPct}%. A member who retired during the year receives a prorated first increase, so as not to receive both the full pay raise of the year and the full adjustment. REDUX retirees receive one point less each year, with a catch-up at 62.</p>
<h2>Disability retirement: two methods</h2>
<p>Members retired for disability under Chapter 61 have their retired pay computed both ways and receive the larger: the disability percentage assigned by the service times the retired pay base, or ${P.retire.high3Mult}% times the years of service times the base, with a ceiling of 75% of the base. A member with twelve years retired at 60% therefore receives 60% of the base rather than 30%. Part or all of that pay can be excluded from taxable income in some cases, and a VA rating changes the picture through the waiver and CRSC.</p>
<h2>Beyond thirty years</h2>
<p>Under High-3 the multiplier keeps growing past thirty years, by ${P.retire.high3Mult} points a year, up to 100% at forty years; under BRS, by ${P.retire.brsMult} points, to 80%. Few members serve that long, mostly senior officers and a handful of senior enlisted leaders, but for them each extra year still adds both multiplier and pay base. An E-9 at thirty years under High-3 would receive about ${usd(est('E-9', 30, 'high3'))} a month at 2026 rates.</p>
<h2>Health care and other benefits in retirement</h2>
<p>A regular retiree keeps access to TRICARE for the family, with enrollment fees that depend on the plan and the date of entry into service, and to commissaries and exchanges. At 65, TRICARE For Life works with Medicare Part B. These benefits have no direct dollar value in the chart, but they weigh heavily when comparing a military retirement with leaving service before twenty years.</p>
<h2>Where to go next</h2>
<p>For your own figure, enter your grade, years and months, or your exact high-36 average, in the ${h.a('military-retirement-calculator', 'military retirement calculator')}. To choose between systems, see the ${h.a('brs-calculator', 'BRS page')}; to see what a VA rating does to the total, the ${h.a('crdp', 'CRDP calculator')}; to plan survivor income, the ${h.a('sbp-calculator', 'SBP calculator')}. Grade groups each have a pay page, for example ${h.a('pay-senior-nco', 'E-7 to E-9')} and ${h.a('pay-field-grade', 'O-4 to O-6')}.</p>
<p>One last point on timing: retirement dates fall on the first day of a month, and the choice of month can change the high-36 average by a pay raise. Retiring just after January 1 includes the new year's raise in the last month of service, and moving the date by a few months can also cross a seniority step of the pay table, which the calculator lets you test with years and months.</p>`,
  related: ['military-retirement-calculator', 'brs-calculator', 'high-3-calculator', 'sbp-calculator', 'crdp', 'pay-senior-nco'],
  sources: ['usc1409', 'usc1401a', 'usc1452', 'dfasEnlisted'],
});
