import { definePage } from '../../lib/page-types';
import { P, comp, rateCell, combinedValue, usdx, usd, day } from '../../lib/kit';

const R = 80;
const combos: Array<[string, number[]]> = [['70% and 30%', [70, 30]], ['60%, 40% and 10%', [60, 40, 10]], ['50%, 40% and 20%', [50, 40, 20]], ['50%, 30%, 20% and 10%', [50, 30, 20, 10]], ['70% and 20%', [70, 20]]];
/** Smallest single new rating that brings a combined value to 85 (the 90% step). */
const need = (v: number) => [10, 20, 30, 40, 50, 60, 70, 80, 90, 100].find((r) => combinedValue([v, r]) >= 85) ?? 100;

export default definePage({
  id: 'va-80-percent',
  group: 'va',
  kind: 'rating',
  order: 180,
  slug: 'va-disability-80-percent',
  nav: '80% VA disability',
  card: 'The 80% rate, the band of combined values behind it and what it takes to reach 90',
  title: '80% VA Disability Pay 2026: Rates, Combined Value, Next Step',
  description: `80% VA disability pays ${usdx(comp(R))} a month in 2026 alone and ${usdx(comp(R, { spouse: true, kids: 2 }))} with a spouse and two children; values 75 to 84 round to 80, and 85 is needed for 90.`,
  h1: '80% VA disability rating: amounts and the band behind it',
  intro: 'What 80% pays each family in 2026, which combined values sit behind an 80% decision, and how large the next rating must be to move up.',
  resume: `An 80% VA disability rating pays ${usdx(comp(R))} a month in 2026 to a veteran with no dependents, ${usdx(comp(R, { spouse: true }))} with a spouse and ${usdx(comp(R, { spouse: true, kids: 2 }))} with a spouse and two children under 18, at the rates effective ${day(P.va.ratesEffective)}. Every combined value from 75 to 84 becomes 80%, so two veterans with the same decision can be ten points apart. That gap matters more and more as the rating climbs, because each new rating applies only to the efficiency that remains: at a combined 76, a further ${need(76)}% is needed to reach 85 and the 90% step, while at 84 a ${need(84)}% is enough. Most 80% ratings come from three or four conditions. An 80% veteran with one condition at 40% or more already meets the schedular unemployability test, and a 20-year military retiree keeps full retired pay through CRDP.`,
  mini: 'ratingPay',
  miniArg: { rating: R },
  faqs: [
    { q: 'How much is 80% VA disability with a spouse and 2 kids?', a: `${usdx(comp(80, { spouse: true, kids: 2 }))} a month in 2026: the 80% basic rate for a spouse and one child, ${usdx(rateCell(80, 'cs'))}, plus ${usdx(rateCell(80, 'addChild'))} for the second child. A child aged 18 to 23 in school would be paid ${usdx(rateCell(80, 'addSchool'))} instead of the younger-child amount. Alone, the rate is ${usdx(comp(80))}.` },
    { q: 'What rating do I need to go from 80% to 90%?', a: `It depends on your exact combined value, because you need to reach 85. From 84, any ${need(84)}% rating does it (${combinedValue([84, 10])}). From 80, you need ${need(80)}%: a 20% gives only ${combinedValue([80, 20])}. From 75, the smallest new rating that works is ${need(75)}%. Our calculator shows your combined value before rounding, so you know which case is yours.` },
    { q: 'Is 80% VA disability enough for unemployability?', a: `On the schedule, yes, provided at least one disability is rated 40% or more, which is almost always the case at 80%. TDIU also requires that service-connected conditions prevent substantially gainful work. If granted, the payment rises to the 100% rate, ${usdx(comp(100))} a month for a veteran alone in 2026.` },
    { q: 'Can VA lower my rating from 80%?', a: `Yes, but under strict rules. VA must propose the reduction, explain it and give you 60 days to send evidence. Ratings in place for five years or more need a complete examination showing lasting improvement (38 CFR 3.344), and a rating held for twenty years cannot fall below that level. The combined rating can also drop if one condition improves, which is why the exact combined value matters at 80%.` },
  ],
  body: (h) => `
<h2>80% family by family</h2>
${h.table(['Family', 'Per month', 'Per year'], [['Veteran alone', {}], ['Married', { spouse: true }], ['Married, 1 child', { spouse: true, kids: 1 }], ['Married, 2 children', { spouse: true, kids: 2 }], ['Married, 1 child and 1 in college', { spouse: true, kids: 1, school: 1 }]].map(([l, d]) => [l as string, usdx(comp(R, d as object)), usd(comp(R, d as object) * 12)]), 'VA compensation at 80%, rates effective December 1, 2025.', ['l', 'r', 'r'])}
<h2>Ratings that land on 80%</h2>
${h.table(['Ratings', 'Combined value', 'Rating'], combos.map(([l, r]) => [l, `${combinedValue(r)}`, `${Math.floor((combinedValue(r) + 5) / 10) * 10}%`]), 'Combined values from 38 CFR 4.25 Table I.', ['l', 'r', 'r'])}
<p>The last line shows how fast the rating climbs from a large single condition: 70% and 20% combine to ${combinedValue([70, 20])}, which rounds up to 80%, while 70% and 10% give only ${combinedValue([70, 10])} and stay at 70%. Climbing further from 80% is harder still. Each rating multiplies the efficiency left: a person at a combined 80 keeps 20 points of efficiency, and a new 10% rating removes only 2 of them.</p>
<h2>What separates 80% from 90%</h2>
<p>The 90% step adds ${usdx(comp(90) - comp(R))} a month for a veteran alone and ${usdx(comp(90, { spouse: true, kids: 2 }) - comp(R, { spouse: true, kids: 2 }))} for a married veteran with two children. Whether a pending claim can deliver it depends on the combined value, not the rating: see the second question below and the ${h.a('va-90-percent', '90% page')}. The ${h.a('va-combined-rating-table', 'combined ratings table')} lets you test each scenario, and the ${h.a('home', 'VA disability calculator')} does it with your list of ratings and the bilateral factor.</p>
<h2>Protection of a long-standing 80%</h2>
<p>Ratings that have stood for a long time are harder to reduce. Under 38 CFR 3.344, a rating that has continued at the same level for five years or more can be reduced only on an examination as full as the one that set it, and only if the improvement is likely to last; under 38 CFR 3.951, a rating held for twenty years or more cannot be reduced below that level except for fraud. Those rules protect an 80% built over a career of claims, and they apply to each condition as well as to the combined total, so a veteran who files for a new condition at 80% does not expose the old ratings to a casual reduction.</p>
<h2>Dependents at 80%</h2>
<p>The family amounts rise with the rating. At 80%, a spouse adds ${usdx(comp(R, { spouse: true }) - comp(R))} a month, each child under 18 beyond the first ${usdx(rateCell(R, 'addChild'))}, a child in school ${usdx(rateCell(R, 'addSchool'))}, and a spouse who needs Aid and Attendance ${usdx(rateCell(R, 'aa'))}. A veteran who reached 80% through successive increases should check that every dependent appears on the latest award letter: dependents are attached to the award, and a reorganized claim sometimes drops one. The ${h.a('va-dependents', 'dependents guide')} shows how to add them.</p>
<h2>Retirees at 80%</h2>
<p>A longevity retiree with 20 years keeps full retired pay through CRDP and receives the 80% compensation on top. For a Chapter 61 retiree with fewer than 20 years, CRSC is the only route to keep part of both, and only for combat-related conditions.</p>
<h2>The most common mistake at 80%</h2>
<p>Veterans often add their newest rating to the old combined rating, for example 80% and a new 20%, and expect 100%. The combination is done on the exact values and not on the rounded rating, and a new rating applies only to the efficiency left: 80 and 20 give ${combinedValue([80, 20])}, still an 80% rating. Knowing that before filing helps decide which conditions to document best.</p>`,
  related: ['va-70-percent', 'va-90-percent', 'va-combined-rating-table', 'tdiu', 'crdp'],
  sources: ['vaRates', 'cfr425'],
});
