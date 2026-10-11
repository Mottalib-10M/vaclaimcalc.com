import { definePage } from '../../lib/page-types';
import { P, comp, rateCell, combinedValue, usdx, usd, day } from '../../lib/kit';

const R = 60;
const fams: Array<[string, object]> = [['Veteran alone', {}], ['Married', { spouse: true }], ['Married, 1 child', { spouse: true, kids: 1 }], ['Married, 2 children', { spouse: true, kids: 2 }], ['Single parent, 2 children', { kids: 2 }], ['Married, spouse on Aid and Attendance', { spouse: true, spouseAA: true }]];

export default definePage({
  id: 'va-60-percent',
  group: 'va',
  kind: 'rating',
  order: 160,
  slug: 'va-disability-60-percent',
  nav: '60% VA disability',
  card: 'The 60% rate and the one-condition route to unemployability at the 100% rate',
  title: '60% VA Disability Pay 2026: Monthly Rates and the TDIU Route',
  description: `60% VA disability pays ${usdx(comp(R))} a month in 2026, ${usdx(comp(R, { spouse: true, kids: 1 }))} with a spouse and a child; one condition at 60% meets the TDIU test, which pays ${usdx(comp(100))}.`,
  h1: '60% VA disability rating: pay and unemployability',
  intro: 'The 2026 amounts at 60%, and why a single condition rated 60% is the shortest path to being paid at the 100% rate.',
  resume: `A 60% VA disability rating pays ${usdx(comp(R))} a month in 2026 to a veteran alone and ${usdx(comp(R, { spouse: true, kids: 1 }))} with a spouse and a child, at the rates effective ${day(P.va.ratesEffective)}. Sixty matters for one reason above all: under 38 CFR 4.16(a), a veteran with one service-connected disability rated 60% or more meets the schedular test for total disability based on individual unemployability. If that condition keeps the veteran from substantially gainful work, VA can pay the 100% rate, ${usdx(comp(100))} a month alone, more than twice the 60% amount. With several conditions the bar is higher, a combined 70% with one at 40%, so whether a 60% comes from one condition or from a combination changes the options. Conditions rated 60% on their own include some heart, lung and kidney conditions, and intervertebral disc syndrome with incapacitating episodes totaling at least six weeks in a year.`,
  mini: 'ratingPay',
  miniArg: { rating: R },
  faqs: [
    { q: 'Can I get TDIU with one condition rated 60%?', a: `Yes. 38 CFR 4.16(a) allows unemployability for a single disability rated at least 60% when it prevents substantially gainful employment. VA then pays the 100% rate, ${usdx(comp(100))} a month for a veteran alone in 2026, against ${usdx(comp(60))} at 60%. Apply on VA Form 21-8940 with your employment history for the last five years you worked.` },
    { q: 'What does 60% VA disability pay with a wife and one child?', a: `${usdx(comp(60, { spouse: true, kids: 1 }))} a month in 2026. Each additional child under 18 adds ${usdx(rateCell(60, 'addChild'))}, a child aged 18 to 23 in school adds ${usdx(rateCell(60, 'addSchool'))}, and a spouse who needs Aid and Attendance adds ${usdx(rateCell(60, 'aa'))}. Without dependents the rate is ${usdx(comp(60))}, so the family accounts for more than a tenth of the payment.` },
    { q: 'Does a combined 60% from several conditions qualify for TDIU?', a: `Not under the schedular rule. With two or more disabilities, the test is a combined 70% with one disability at 40% or more. Conditions of both arms or both legs, or arising from one accident, count as one disability for this purpose. Below that, VA can still refer the case to the Director of Compensation Service for an extraschedular decision.` },
    { q: 'What counts as substantially gainful employment for TDIU?', a: `VA looks at whether the work pays more than the poverty threshold for one person set by the Census Bureau, and whether it is ordinary work rather than sheltered work, such as a family business that accommodates the veteran. Odd jobs and part-time work under that line are marginal employment and do not bar TDIU. VA also considers education and work history, but not age or non-service-connected illness.` },
  ],
  body: (h) => `
<h2>60% for each family</h2>
${h.table(['Family', 'Per month', 'At 100% (or TDIU)'], fams.map(([l, d]) => [l, usdx(comp(R, d)), usdx(comp(100, d))]), 'VA compensation, rates effective December 1, 2025.', ['l', 'r', 'r'])}
<h2>One condition or several</h2>
<p>A decision that reads "60%" can hide very different situations. A veteran with a heart condition rated 60% alone qualifies for the schedular TDIU test right away. A veteran with 40% and 30% (combined ${combinedValue([40, 30])}) also holds a 60% rating, yet needs more before TDIU is possible: the combined rating must reach 70%. The same goes for 50% and 20% (${combinedValue([50, 20])}). The calculator flags the threshold when your ratings meet it.</p>
<p>The rule on "one disability" is broader than it looks. Disabilities of one or both upper extremities, or of one or both lower extremities, including the bilateral factor, count as one. So do disabilities resulting from a common cause or a single accident, those affecting one body system, and multiple injuries incurred in action or as a prisoner of war. A veteran with a knee at 40% and a hip at 30% on the same leg can therefore argue for a single disability of the lower extremity.</p>
<h2>Substantially gainful work</h2>
<p>TDIU is about work, not only medicine. VA looks at whether the service-connected conditions, not age or other illnesses, keep the veteran from a job that pays more than the federal poverty threshold for one person. Part-time work in a protected setting, such as a family business, can be marginal employment that does not bar TDIU. The ${h.a('tdiu', 'TDIU guide')} lists the evidence that carries these claims, and the ${h.a('va-70-percent', '70% page')} covers the combined route.</p>
<h2>What TDIU changes at 60%, in numbers</h2>
<p>The difference between the 60% rate and the 100% rate paid under TDIU grows with the family, because both the basic rate and the added amounts are higher at 100%.</p>
${h.table(['Family', '60%', 'TDIU (100% rate)', 'Difference per year'], fams.slice(0, 4).map(([l, d]) => [l, usdx(comp(R, d)), usdx(comp(100, d)), usd((comp(100, d) - comp(R, d)) * 12)]), 'Rates effective December 1, 2025.', ['l', 'r', 'r', 'r'])}
<p>Those amounts explain why VA examines TDIU claims closely and asks every so often for an employment questionnaire. A veteran who returns to substantially gainful work must report it; the award then ends, while the 60% rating itself remains. Earnings below the poverty threshold for one person are treated as marginal and do not end TDIU.</p>
<h2>The extraschedular door</h2>
<p>Veterans who are unable to work but do not meet either percentage of 38 CFR 4.16(a) are not shut out. Paragraph (b) of the same regulation says that all veterans who are unemployable because of service-connected disabilities should be rated totally disabled, and asks regional offices to send such cases to the Director of Compensation Service. The evidence is the same as for a schedular claim: work history, education, medical opinions on functional limits. It is a slower path, which is one more reason why a single 60% condition, or a combined 70% with a 40% anchor, carries weight.</p>`,
  related: ['va-50-percent', 'va-70-percent', 'tdiu', 'va-100-percent', 'va-disability-rates'],
  sources: ['vaRates', 'cfr416'],
});
