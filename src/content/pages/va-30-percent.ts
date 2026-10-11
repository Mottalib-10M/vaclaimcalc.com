import { definePage } from '../../lib/page-types';
import { P, comp, rateCell, usdx, usd, day } from '../../lib/kit';

const R = 30;
const rows: Array<[string, Parameters<typeof comp>[1]]> = [
  ['Veteran alone', {}],
  ['Married', { spouse: true }],
  ['Married, 1 child', { spouse: true, kids: 1 }],
  ['Married, 3 children', { spouse: true, kids: 3 }],
  ['Single, 1 child', { kids: 1 }],
  ['Married, 1 dependent parent', { spouse: true, parents: 1 }],
  ['Married, 1 child, 1 in college', { spouse: true, kids: 1, school: 1 }],
];

export default definePage({
  id: 'va-30-percent',
  group: 'va',
  kind: 'rating',
  order: 130,
  slug: 'va-disability-30-percent',
  nav: '30% VA disability',
  card: 'The first rating where VA pays for a spouse, children and parents, family by family',
  title: '30% VA Disability Pay 2026: When Dependents Start to Count',
  description: `30% VA disability pays ${usdx(comp(R))} a month alone in 2026 and ${usdx(comp(R, { spouse: true, kids: 1 }))} with a spouse and a child: the first rating where VA adds pay for each dependent you have.`,
  h1: '30% VA disability rating: dependents enter the payment',
  intro: 'At 30%, VA starts paying for a spouse, children and dependent parents. Here is what each one adds in 2026, and what you must send VA for it.',
  resume: `A 30% VA disability rating pays ${usdx(comp(R))} a month in 2026 to a veteran with no dependents and ${usdx(comp(R, { spouse: true }))} to a married veteran, under the rates effective ${day(P.va.ratesEffective)}. Thirty is the line drawn by 38 U.S.C. 1115: from this combined rating, VA adds compensation for a spouse, children and dependent parents, in amounts that grow with the rating. At 30% a spouse is worth ${usdx(comp(R, { spouse: true }) - comp(R))} a month, a first child ${usdx(comp(R, { kids: 1 }) - comp(R))} for a veteran without a spouse, each further child under 18 ${usdx(rateCell(R, 'addChild'))} and each child aged 18 to 23 in school ${usdx(rateCell(R, 'addSchool'))}. Those amounts reach the payment only when the dependents are on VA's records, which many veterans who were rated lower years ago never did. Thirty percent also moves a veteran into VA health care priority group 2.`,
  mini: 'ratingPay',
  miniArg: { rating: R },
  faqs: [
    { q: 'How do I add my wife and kids to my VA disability at 30%?', a: `File VA Form 21-686c, online on va.gov or by mail, with your spouse's and children's details; for a child aged 18 to 23 in school add VA Form 21-674. If the marriage or birth is recent, VA pays from the first day of the month after the event when you report it within one year. At 30% a spouse adds ${usdx(comp(30, { spouse: true }) - comp(30))} a month.` },
    { q: 'How much is 30% VA disability with a spouse and two children?', a: `${usdx(comp(30, { spouse: true, kids: 2 }))} a month in 2026: the basic rate for a spouse and one child, ${usdx(rateCell(30, 'cs'))}, plus ${usdx(rateCell(30, 'addChild'))} for the second child under 18, as long as both are on VA's records. Without the family the rate would be ${usdx(comp(30))}. A third child under 18 would add another ${usdx(rateCell(30, 'addChild'))}.` },
    { q: 'Can I claim my parents as dependents for VA disability?', a: `Yes, from a combined 30%, if a parent depends on you financially. VA looks at the parent's income and net worth on VA Form 21P-509. At 30% a dependent parent adds ${usdx(comp(30, { parents: 1 }) - comp(30))} a month, and VA pays for two parents at most. The amount rises with your rating.` },
    { q: 'Do I keep the dependent amounts if my rating drops below 30%?', a: `No. If a reduction brings your combined rating to 20% or 10%, the single rate applies and the family amounts stop. VA must propose the reduction first and give you 60 days to respond with evidence, and a rating held for 20 years or more is protected from falling below that level.` },
  ],
  body: (h) => `
<h2>30% for each family</h2>
${h.table(['Family on VA records', 'Per month', 'Per year'], rows.map(([l, d]) => [l, usdx(comp(R, d)), usd(comp(R, d) * 12)]), 'VA compensation at 30%, rates effective December 1, 2025.', ['l', 'r', 'r'])}
<h2>The paperwork that turns dependents into dollars</h2>
<p>VA does not learn about a marriage, a birth or an adoption by itself. A veteran who was rated 10% or 20% at discharge and later reaches 30% through an increase often has a spouse and children who never appeared in any claim. The rating decision then pays the veteran-alone rate. The fix is VA Form 21-686c, the declaration of dependents, which asks for dates of marriage and birth and, for a former spouse, how the marriage ended. Children who are 18 to 23 and in school need VA Form 21-674 each school year. Parents need VA Form 21P-509, with their income.</p>
<p>The timing rule is generous if you act fast. When the dependent existed at the date the 30% rating took effect, or when you report a new dependent within a year of the event, VA pays back to that date. After a year, payment starts only from the date VA receives the form.</p>
<h2>How 30% is reached</h2>
<p>A single condition at 30% is common in some body systems, such as migraines with characteristic prostrating attacks once a month or a mental health condition with occasional decrease in work efficiency. More often it is the combination of smaller ratings: 20% and 10%, or three ratings of 10%. Use the ${h.a('home', 'VA disability calculator')} to check yours. The ${h.a('va-dependents', 'dependents guide')} compares what a family adds at every rating, and the ${h.a('va-40-percent', '40% page')} shows the next step.</p>
<h2>Beyond the check: travel and hiring at 30%</h2>
<p>Two federal rules use 30% as their line. VA beneficiary travel reimburses mileage to VA appointments for veterans rated 30% or more, for any care, not only for the rated conditions; below 30% the reimbursement is limited to the service-connected conditions or to low-income veterans. And federal agencies may hire a veteran rated 30% or more without competition, under the noncompetitive appointment authority for disabled veterans in 5 CFR part 316, either in a temporary job or in one that can become permanent.</p>
<p>At 30%, enrollment in VA health care moves from priority group 3 to priority group 2; group 1, the highest, starts at 50%. The group decides the order of enrollment when VA restricts it and which copays apply to care for conditions that are not service connected.</p>
<h2>A worked example</h2>
<p>A veteran rated 20% marries in March, and a later claim for a new condition brings the combined rating to 30% from May. If the marriage is reported on the form 21-686c within a year, VA pays the married rate from the first month the 30% applies, ${usdx(comp(R, { spouse: true }))} a month instead of ${usdx(comp(R))}. Had the veteran waited eighteen months to report it, the spouse amount would start only from the date VA received the form, and the earlier months would be lost.</p>`,
  related: ['va-20-percent', 'va-40-percent', 'va-dependents', 'va-disability-rates', 'home'],
  sources: ['vaRates', 'usc1115'],
});
