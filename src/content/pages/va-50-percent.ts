import { definePage } from '../../lib/page-types';
import { P, comp, rateCell, concurrent, usdx, usd, day, combinedValue } from '../../lib/kit';

const R = 50;
const pays = [1800, 2600, 3400, 4500];

export default definePage({
  id: 'va-50-percent',
  group: 'va',
  kind: 'rating',
  order: 150,
  slug: 'va-disability-50-percent',
  nav: '50% VA disability',
  card: 'The 50% rate, full concurrent receipt for 20-year retirees and priority group 1',
  title: '50% VA Disability Pay 2026: Rates and Full CRDP for Retirees',
  description: `50% VA disability pays ${usdx(comp(R))} a month in 2026 alone and ${usdx(comp(R, { spouse: true, kids: 1 }))} with a spouse and child, and 20-year retirees keep full retired pay through CRDP.`,
  h1: '50% VA disability rating: the concurrent receipt line',
  intro: 'At 50%, a 20-year military retiree stops losing retired pay to VA compensation, and VA health care becomes copay free. The 2026 amounts, family by family.',
  resume: `A 50% VA disability rating pays ${usdx(comp(R))} a month in 2026 to a veteran with no dependents and ${usdx(comp(R, { spouse: true, kids: 1 }))} with a spouse and one child, at the rates effective ${day(P.va.ratesEffective)}. For most veterans that is the whole story, but 50% is the line in two federal rules. First, a military retiree with 20 or more years of service who reaches a combined 50% receives Concurrent Retirement and Disability Pay: the VA waiver that used to take compensation back from retired pay is restored in full, so both payments arrive at once (10 U.S.C. 1414). A retiree with ${usd(2600)} of retired pay therefore goes from ${usdx(concurrent({ retiredPay: 2600, rating: 40, years: 20 }).totalMonthly)} a month in total at 40% to ${usdx(concurrent({ retiredPay: 2600, rating: R, years: 20 }).totalMonthly)} at 50%. Second, a rating of 50% or more places a veteran in VA health care priority group 1, without copays.`,
  mini: 'ratingPay',
  miniArg: { rating: R },
  faqs: [
    { q: 'Do I get full retired pay and VA disability at 50%?', a: `Yes, if you retired with at least 20 years of creditable service: CRDP restores retired pay in full from a combined 50%, and DFAS applies it automatically once VA reports the rating. A Chapter 61 disability retiree with 20 years gets it only up to the longevity amount, and one with fewer than 20 years does not qualify; CRSC is the route for combat-related conditions.` },
    { q: 'How much is 50% VA disability with a spouse and two children?', a: `${usdx(comp(50, { spouse: true, kids: 2 }))} a month in 2026, which is the basic rate for a spouse and one child, ${usdx(rateCell(50, 'cs'))}, plus ${usdx(rateCell(50, 'addChild'))} for the second child under 18, if both are listed on your award. Without dependents the rate is ${usdx(comp(50))}. A spouse who needs Aid and Attendance would add ${usdx(rateCell(50, 'aa'))}.` },
    { q: 'Is VA health care free at a 50% rating?', a: `For enrolled veterans rated 50% or more, VA health care is in priority group 1, which carries no copays for outpatient care, hospital care or medications, including for conditions that are not service connected. Dental care depends on other criteria. Enrollment uses VA Form 10-10EZ.` },
    { q: 'Does CRDP at 50% start automatically?', a: `In most cases, yes. VA reports the rating to DFAS, and DFAS restores retired pay from the effective date of the 50% rating, with retroactive pay when the decision comes later. Reservists who retired for disability before the age at which retired pay normally starts must ask their branch to send the retirement orders to DFAS. If nothing changes within a few months, file DD Form 827 with DFAS.` },
  ],
  body: (h) => `
<h2>The 50% rate in 2026</h2>
${h.table(['Family', 'Per month', 'Per year'], [['Veteran alone', {}], ['Married', { spouse: true }], ['Married, 1 child', { spouse: true, kids: 1 }], ['Married, 2 children', { spouse: true, kids: 2 }], ['Married, 2 dependent parents', { spouse: true, parents: 2 }]].map(([l, d]) => [l as string, usdx(comp(R, d as object)), usd(comp(R, d as object) * 12)]), 'VA compensation at 50%, rates effective December 1, 2025.', ['l', 'r', 'r'])}
<h2>What CRDP changes for a retiree</h2>
<p>The table below follows a retiree with 20 years and no dependents across the line. At 40%, the VA payment is subtracted from retired pay, so the monthly total equals retired pay; only the tax treatment changes. At 50%, nothing is subtracted.</p>
${h.table(['Gross retired pay', 'Total at 40%', 'Total at 50%', 'Gain'], pays.map((p) => { const a = concurrent({ retiredPay: p, rating: 40, years: 20 }).totalMonthly; const b = concurrent({ retiredPay: p, rating: R, years: 20 }).totalMonthly; return [usd(p), usdx(a), usdx(b), usdx(b - a)]; }), 'Monthly totals, retired pay plus VA compensation, veteran with no dependents.', ['r', 'r', 'r', 'r'])}
<p>The gain is the whole VA amount at 50%, ${usdx(comp(R))} or more with a family, every month. CRDP has had no phase-in since the end of 2013: the restoration is complete from the first month at 50%. It counts as retired pay, so it is taxable and can be divided with a former spouse, unlike CRSC. The ${h.a('crdp', 'CRDP page')} covers the Chapter 61 cases.</p>
<h2>Reaching 50%</h2>
<p>Combined values from 45 to 54 round to 50%. A veteran at 40% needs a new rating large enough to push the value to 45: from a single 40%, one more 10% is enough. Under the general rating formula for mental disorders, 50% describes occupational and social impairment with reduced reliability and productivity, a frequent level for PTSD and depression claims. The ${h.a('home', 'calculator')} shows your exact combined value, and the ${h.a('va-60-percent', '60% page')} the next step.</p>
<h2>CRDP or CRSC at 50%</h2>
<p>A retiree at 50% with combat-related conditions may qualify for both programs, and DFAS pays the more favorable one, never both. CRDP restores the whole waiver but counts as retired pay, taxable and divisible with a former spouse. CRSC is tax free but covers only the combat-related part of the rating. With ${usd(2600)} of retired pay and a combat-related rating of 30% inside the 50%, CRSC would pay ${usdx(concurrent({ retiredPay: 2600, rating: R, years: 20, combatRating: 30 }).crsc)} tax free, while CRDP restores ${usdx(concurrent({ retiredPay: 2600, rating: R, years: 20 }).crdp)}. DFAS applies the larger amount the first year and sends an election form; each January's open season lets a retiree switch. The ${h.a('crsc-calculator', 'CRSC page')} compares them.</p>
<h2>Chapter 61 retirees and the 20-year question</h2>
<p>A member retired for disability under Chapter 61 with fewer than 20 years of service does not receive CRDP at 50% or at any rating: VA compensation still replaces the disability retired pay dollar for dollar, and CRSC is the only concurrent payment available, for combat-related disabilities. With 20 years or more, CRDP restores retired pay only up to what a longevity retirement would have paid. The ${h.a('crdp', 'CRDP calculator')} handles both cases.</p>
<h2>A 50% rating that comes from many small ones</h2>
<p>Six ratings of 10% combine to a value of ${combinedValue([10, 10, 10, 10, 10, 10])}, which rounds up to 50%: a veteran with tinnitus, two knees, an ankle, a scar and a shoulder, each at 10%, holds the same rating as a veteran with one condition at 50%, with the same payment and the same CRDP rights. The difference shows later, when one condition changes, because a value of ${combinedValue([10, 10, 10, 10, 10, 10])} is only two points above the rounding line.</p>`,
  related: ['va-40-percent', 'va-60-percent', 'crdp', 'va-disability-rates', 'military-retirement-calculator'],
  sources: ['vaRates', 'usc1414', 'dfasCrdp'],
});
