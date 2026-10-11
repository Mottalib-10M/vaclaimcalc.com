import { definePage } from '../../lib/page-types';
import { P, comp, rateCell, concurrent, combinedValue, usdx, usd, day } from '../../lib/kit';

const R = 40;
const ret = concurrent({ retiredPay: 2600, rating: R, years: 20 });
const ret50 = concurrent({ retiredPay: 2600, rating: 50, years: 20 });
const sets: Array<[string, number[]]> = [['40% alone', [40]], ['30% and 20%', [30, 20]], ['30%, 10% and 10%', [30, 10, 10]], ['20%, 20% and 10%', [20, 20, 10]], ['20% and 20%', [20, 20]]];

export default definePage({
  id: 'va-40-percent',
  group: 'va',
  kind: 'rating',
  order: 140,
  slug: 'va-disability-40-percent',
  nav: '40% VA disability',
  card: 'The 40% rate, its role in the TDIU test and why military retirees look at 50%',
  title: '40% VA Disability Pay 2026: Rates, Retirees and the 50% Line',
  description: `40% VA disability pays ${usdx(comp(R))} a month in 2026 alone, ${usdx(comp(R, { spouse: true }))} married. For a 20-year military retiree, VA pay below 50% still comes out of retired pay.`,
  h1: '40% VA disability rating: amounts and the gap to 50%',
  intro: 'What 40% pays each family in 2026, what a 40% condition does for an unemployability claim, and why retirees feel the difference between 40 and 50.',
  resume: `A 40% VA disability rating pays ${usdx(comp(R))} a month in 2026 to a veteran alone, ${usdx(comp(R, { spouse: true }))} with a spouse and ${usdx(comp(R, { spouse: true, kids: 1 }))} with a spouse and a child, at the rates effective ${day(P.va.ratesEffective)}. The number 40 has two roles beyond the payment. In the individual unemployability test of 38 CFR 4.16(a), a veteran with several conditions needs one of them rated at least 40% and a combined 70%. And for a military retiree with 20 years, 40% is the last step where VA compensation is still taken back from retired pay dollar for dollar: with ${usd(2600)} of retired pay, the total at 40% stays ${usdx(ret.totalMonthly)}, while at 50% CRDP lets both run in full, ${usdx(ret50.totalMonthly)}. For a retiree, the step from 40% to 50% is worth far more than the rate chart says.`,
  mini: 'ratingPay',
  miniArg: { rating: R },
  faqs: [
    { q: 'Does a retiree get both retired pay and VA pay at 40%?', a: `Not in full. Below a 50% combined rating, the VA amount, ${usdx(comp(40))} a month at 40% without dependents, is deducted from retired pay through the VA waiver. The gain is tax: that part becomes tax free. If some disabilities are combat-related, CRSC can restore part of the retired pay at any rating from 10%. CRDP begins at 50% with 20 years of service.` },
    { q: 'What is the VA pay at 40% with a spouse and three kids?', a: `${usdx(comp(40, { spouse: true, kids: 3 }))} a month in 2026, if all three children are on your award: the basic rate for a spouse and a child, ${usdx(rateCell(40, 'cs'))}, plus two extra children at ${usdx(rateCell(40, 'addChild'))} each. If one of them is 18 to 23 and in an approved school, that child is paid ${usdx(rateCell(40, 'addSchool'))} instead.` },
    { q: 'Why does a 40% condition matter for TDIU?', a: `Because 38 CFR 4.16(a) allows individual unemployability for a veteran with two or more disabilities only if one of them is rated at least 40% and the combined rating reaches 70%. A combined 70% made only of 30% and smaller ratings does not meet the schedular test, although VA can still refer the case for extraschedular review.` },
    { q: 'How much more does 50% pay than 40% for a veteran alone?', a: `In 2026, ${usdx(comp(50) - comp(40))} a month: ${usdx(comp(40))} at 40% against ${usdx(comp(50))} at 50%. For a married veteran with one child the gap is ${usdx(comp(50, { spouse: true, kids: 1 }) - comp(40, { spouse: true, kids: 1 }))}. For a military retiree with 20 years, the real gain is larger, because CRDP starts at 50% and stops the deduction of VA pay from retired pay.` },
  ],
  body: (h) => `
<h2>What 40% pays in 2026</h2>
${h.table(['Family', 'Per month', 'Added over 30%'], [['Veteran alone', {}], ['Married', { spouse: true }], ['Married, 1 child', { spouse: true, kids: 1 }], ['Married, 2 children', { spouse: true, kids: 2 }], ['Single parent, 1 child', { kids: 1 }]].map(([l, d]) => [l as string, usdx(comp(R, d as object)), usdx(comp(R, d as object) - comp(30, d as object))]), 'VA compensation at 40%, rates effective December 1, 2025.', ['l', 'r', 'r'])}
<h2>Combinations that give 40%</h2>
${h.table(['Ratings', 'Combined value', 'Rating'], sets.map(([l, r]) => [l, `${combinedValue(r)}`, `${Math.floor((combinedValue(r) + 5) / 10) * 10}%`]), 'Combined values from 38 CFR 4.25 Table I.', ['l', 'r', 'r'])}
<p>A 40% rating covers combined values from 35 to 44, and where you sit in that band decides what the next claim does. Starting from a single 40%, any new 10% rating gives ${combinedValue([40, 10])}, which rounds up to 50%. Starting from 30%, 10% and 10% (a value of ${combinedValue([30, 10, 10])}), the same new 10% gives ${combinedValue([30, 10, 10, 10])}. Starting from 20% and 20% (${combinedValue([20, 20])}), it gives ${combinedValue([20, 20, 10])}. The calculator shows the exact combined value so that you know how far you are from the next line.</p>
<h2>Retirees: the dollar-for-dollar zone</h2>
<p>Military retired pay and VA compensation cannot be paid in full together unless a law allows it. Below 50%, none does for longevity retirees: VA pays its amount and DFAS reduces retired pay by the same amount. The money is not lost, it changes nature, from taxable retired pay to tax-free compensation. At 50% and above with 20 years, Concurrent Retirement and Disability Pay ends the deduction. A retiree at 40% who has a pending claim for a further condition should therefore look at the combined value rather than the rating: the ${h.a('crdp', 'CRDP calculator')} shows both totals, and ${h.a('crsc-calculator', 'CRSC')} covers combat-related disabilities at any rating.</p>
<p>The ${h.a('va-50-percent', '50% page')} shows the amounts on the other side of the line, and the ${h.a('home', 'VA disability calculator')} combines your own ratings.</p>
<h2>A 40% condition as the anchor of an unemployability claim</h2>
<p>For a veteran with several conditions, the schedular TDIU test needs two things at once: a combined 70% and one disability at 40% or more. The table shows how much the anchor matters.</p>
${h.table(['Ratings', 'Combined', 'One at 40%+', 'Schedular TDIU'], [[40, 30, 20], [40, 40], [30, 30, 30, 20], [50, 20, 10], [40, 30, 10, 10]].map((r) => { const v = combinedValue(r); const rr = Math.floor((v + 5) / 10) * 10; const ok = rr >= 70 && Math.max(...r) >= 40; return [r.map((x) => `${x}%`).join(', '), `${v} → ${rr}%`, Math.max(...r) >= 40 ? 'yes' : 'no', ok ? 'met' : 'not met']; }), 'Combined with 38 CFR 4.25; test of 38 CFR 4.16(a).', ['l', 'r', 'l', 'l'])}
<p>The third line is the trap: four ratings that reach a combined 70% without any of them at 40%. Such a veteran does not meet the schedular test, though the rule that counts disabilities of the same limb or from the same accident as one can sometimes create the 40% anchor, for example a knee and an ankle on the same leg. The ${h.a('tdiu', 'TDIU guide')} explains that rule.</p>
<h2>The tax side of the waiver</h2>
<p>For a retiree below 50%, the waiver is not a loss but a swap. Take ${usd(2600)} of gross retired pay and a 40% rating: DFAS pays ${usdx(2600 - comp(R))} of retired pay and VA pays ${usdx(comp(R))} of compensation. The total is unchanged, but the VA part is free of federal income tax, which lowers the tax withheld from retired pay. With a spouse, the VA part is larger, ${usdx(comp(R, { spouse: true }))}, so more of the total escapes tax. Survivor Benefit Plan premiums are still computed on the gross retired pay chosen as the base amount, not on what remains after the waiver.</p>`,
  related: ['va-30-percent', 'va-50-percent', 'crdp', 'crsc-calculator', 'tdiu'],
  sources: ['vaRates', 'cfr416', 'dfasCrdp'],
});
