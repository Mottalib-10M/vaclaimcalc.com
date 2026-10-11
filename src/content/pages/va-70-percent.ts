import { definePage } from '../../lib/page-types';
import { P, comp, rateCell, combinedValue, usdx, usd, day } from '../../lib/kit';

const R = 70;
const fam = [
  ['Veteran alone', comp(R)],
  ['With spouse', comp(R, { spouse: true })],
  ['Spouse and 1 child', comp(R, { spouse: true, kids: 1 })],
  ['Spouse and 2 children', comp(R, { spouse: true, kids: 2 })],
  ['Spouse, 1 child and 1 in college', comp(R, { spouse: true, kids: 1, school: 1 })],
  ['Single parent, 1 child', comp(R, { kids: 1 })],
] as Array<[string, number]>;

export default definePage({
  id: 'va-70-percent',
  group: 'va',
  kind: 'rating',
  order: 170,
  slug: 'va-disability-70-percent',
  nav: '70% VA disability',
  card: 'The 70% rate for each family, the TDIU threshold and the ratings that add up to 70',
  title: '70% VA Disability Pay 2026: Rates With Dependents, TDIU',
  description: `70% VA disability pays ${usdx(comp(R))} a month in 2026 for a veteran alone and ${usdx(comp(R, { spouse: true, kids: 1 }))} with a spouse and a child; 70% combined is also the TDIU threshold.`,
  h1: '70% VA disability rating: pay and what it opens',
  intro: 'What a 70% combined rating pays each month in 2026, for each family, and why it is the rating where unemployability enters the picture.',
  resume: `A 70% VA disability rating pays ${usdx(comp(R))} a month in 2026 to a veteran with no dependents, ${usdx(comp(R, { spouse: true }))} with a spouse and ${usdx(comp(R, { spouse: true, kids: 1 }))} with a spouse and one child under 18, under the rates in force since ${day(P.va.ratesEffective)}. Each further child under 18 adds ${usdx(rateCell(R, 'addChild'))}, each child aged 18 to 23 in school ${usdx(rateCell(R, 'addSchool'))}. Seventy is also the combined rating at which individual unemployability becomes possible for a veteran with several conditions: if one of them is rated at least ${P.va.tdiuSecondary}% and the veteran cannot hold a steady job because of them, VA can pay the 100% rate, ${usdx(comp(100))} alone. Many 70% ratings are reached with a combined value of 65 to 74, so a single new 10% rating can be enough to move to 80%, or not, depending on where in that band the value sits.`,
  mini: 'ratingPay',
  miniArg: { rating: R },
  faqs: [
    { q: 'How much does a 70% VA rating pay with a spouse and two kids?', a: `${usdx(comp(R, { spouse: true, kids: 2 }))} a month in 2026: the basic rate for a spouse and one child, ${usdx(rateCell(R, 'cs'))}, plus ${usdx(rateCell(R, 'addChild'))} for the second child under 18. If one of the two children is 18 to 23 and enrolled in an approved school, the total is ${usdx(comp(R, { spouse: true, kids: 1, school: 1 }))} instead.` },
    { q: 'Can I get TDIU with a 70% combined rating?', a: `Yes, if at least one disability is rated ${P.va.tdiuSecondary}% or more and your service-connected conditions keep you from substantially gainful employment (38 CFR 4.16(a)). TDIU pays the 100% rate, ${usdx(comp(100))} a month for a veteran alone. You apply on VA Form 21-8940 with your work history; marginal employment below the poverty line does not count as gainful.` },
    { q: 'What combined value rounds to a 70% VA rating?', a: `Any combined value from 65 to 74. VA rounds once, to the nearest 10, with 5 going up: 65 becomes 70 and 74 stays at 70. A veteran at 74 needs only a small additional rating to reach 75 and therefore 80%, while one at 65 needs much more. The calculator shows your exact combined value, not only the rounded rating.` },
    { q: 'Does a 70% rating qualify for CRDP?', a: `Yes, if you retired with 20 or more years of service: from a 50% combined rating, Concurrent Retirement and Disability Pay restores your retired pay in full on top of the ${usdx(comp(R))} or more paid by VA. A Chapter 61 disability retiree with fewer than 20 years does not qualify for CRDP but can apply for CRSC if the disabilities are combat-related.` },
  ],
  body: (h) => `
<h2>The 70% rate for each family</h2>
${h.table(['Family', 'Per month', 'Per year'], fam.map(([l, v]) => [l, usdx(v), usd(v * 12)]), 'VA compensation at 70%, rates effective December 1, 2025. Tax free.', ['l', 'r', 'r'])}
<p>The step from 60% to 70% adds ${usdx(comp(R) - comp(60))} a month for a veteran alone and ${usdx(comp(R, { spouse: true, kids: 1 }) - comp(60, { spouse: true, kids: 1 }))} for a veteran with a spouse and a child: the family amounts grow with the rating, which is why a dependent is worth more at 70% than at 30%. A spouse alone adds ${usdx(comp(R, { spouse: true }) - comp(R))} a month at this rating, against ${usdx(comp(30, { spouse: true }) - comp(30))} at 30%. If your marriage or a child's birth happened after your last claim, VA pays the added amount only once you report it, and back to the date of the event only if you report it within a year.</p>
<h2>How veterans usually reach 70%</h2>
<p>Few conditions are rated 70% on their own; the general rating formula for mental disorders is one of them, with occupational and social impairment in most areas. More often, 70% is the sum of several ratings combined in VA math. A 50% rating and a 40% rating combine to ${combinedValue([50, 40])}, which rounds to 70. Three ratings of 50%, 30% and 10% give ${combinedValue([50, 30, 10])}, also 70. A veteran with 40%, 30%, 20% and 10% lands at ${combinedValue([40, 30, 20, 10])}, the same step again. ${h.a('va-combined-rating-table', 'The combined ratings table')} shows each step. The practical consequence is that two veterans rated 70% can be far apart: one with a combined value of 65 is one small rating away from dropping back if a condition improves, the other at 74 is a single 10% rating away from 80% (74 and 10 combine to ${combinedValue([74, 10])}).</p>
<h2>The unemployability threshold</h2>
<p>For a veteran with two or more service-connected disabilities, a combined 70% with one disability at 40% or more meets the schedular test for individual unemployability. TDIU is not automatic: VA looks at your education, your work history and whether your conditions prevent a job that pays more than the poverty threshold. When it is granted, the payment rises to the 100% rate, and with a spouse and a child that is ${usdx(comp(100, { spouse: true, kids: 1 }))} a month instead of ${usdx(comp(R, { spouse: true, kids: 1 }))}. The ${h.a('tdiu', 'TDIU page')} explains the evidence VA asks for.</p>
<h2>Health care and other benefits at 70%</h2>
<p>A rating of 50% or more puts a veteran in VA health care priority group 1, with no copays for care or medications. At 70% you can also count on the state benefits that many states tie to a high rating, such as property tax relief, but each state sets its own threshold. For a military retiree with 20 years, a 70% rating keeps both checks through CRDP, and the payments add up without any waiver: ${h.a('crdp', 'see the CRDP calculator')}.</p>
<p>A 70% rating made of a mental health condition at 70% alone also differs from a 70% made of several ratings in one respect: the general rating formula for mental disorders describes occupational impairment, so the evidence used for the rating often supports an unemployability claim too.</p>`,
  related: ['va-60-percent', 'va-80-percent', 'tdiu', 'va-disability-rates', 'crdp', 'va-combined-rating-table'],
  sources: ['vaRates', 'cfr416', 'cfr425'],
});
