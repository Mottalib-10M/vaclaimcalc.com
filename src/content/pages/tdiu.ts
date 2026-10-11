import { definePage } from '../../lib/page-types';
import { P, comp, combinedValue, usdx, usd } from '../../lib/kit';

const ex: Array<[string, number[]]> = [['60% back condition', [60]], ['70% PTSD', [70]], ['40%, 30%, 20%', [40, 30, 20]], ['50%, 30%', [50, 30]], ['30%, 30%, 30%, 20%', [30, 30, 30, 20]], ['40%, 40%', [40, 40]]];

export default definePage({
  id: 'tdiu',
  group: 'va',
  kind: 'guide',
  order: 50,
  slug: 'tdiu-individual-unemployability',
  nav: 'TDIU (unemployability)',
  card: 'Who can be paid at the 100% rate without a 100% rating, the thresholds and the evidence',
  title: 'TDIU 2026: Individual Unemployability Pays the 100% Rate',
  description: `TDIU in 2026 pays the VA 100% rate, ${usdx(comp(100))} a month alone, to veterans rated lower who cannot work: one condition at 60%, or 70% combined with one at 40%.`,
  h1: 'TDIU: individual unemployability',
  intro: 'How a veteran rated 60%, 70% or more can be paid at the full rate, what VA means by substantially gainful work, and what the claim needs.',
  resume: `Total disability based on individual unemployability, TDIU or IU, lets VA pay the 100% rate to a veteran whose combined rating is lower, when service-connected conditions prevent substantially gainful employment. In 2026 that rate is ${usdx(comp(100))} a month for a veteran alone and ${usdx(comp(100, { spouse: true, kids: 1 }))} with a spouse and a child, against ${usdx(comp(70, { spouse: true, kids: 1 }))} for the same family at 70%. The rule is 38 CFR 4.16. Its paragraph (a) sets the schedular thresholds: one service-connected disability rated at least 60%, or two or more with a combined rating of at least 70% and one of them at 40% or more. Disabilities of both arms or both legs, or from a common cause, count as one. Veterans below the thresholds can still be considered under paragraph (b). The claim is made on VA Form 21-8940, and VA looks at work, not only at medical findings.`,
  mini: 'tdiuCheck',
  faqs: [
    { q: 'How much does TDIU pay in 2026?', a: `Exactly the 100% rate: ${usdx(comp(100))} a month for a veteran alone, ${usdx(comp(100, { spouse: true }))} with a spouse, and the 100% added amounts for children, students, parents and a spouse on Aid and Attendance. The payment is tax free, like all disability compensation, and it rises each December with the cost-of-living adjustment.` },
    { q: 'Can I work part time and receive TDIU?', a: 'Only if the work is marginal: earnings below the poverty threshold for one person set by the Census Bureau, or work in a protected environment such as a family business or a sheltered workshop, even above that line. VA asks TDIU recipients to report employment, and earnings from substantially gainful work end the award, though the underlying ratings stay.' },
    { q: 'Does age count against a TDIU claim?', a: 'No. VA must not consider age, or disabilities that are not service connected, when deciding whether service-connected conditions prevent work. A 68-year-old veteran can receive TDIU if the service-connected conditions alone would keep a person of the same education and experience from substantially gainful work. Retirement from a job for age reasons is not, by itself, a bar.' },
    { q: 'Can TDIU become permanent?', a: 'Yes. When VA finds the unemployability permanent and total, the decision says so, routine reviews stop and the family gains access to Dependents’ Educational Assistance and, for dependents without TRICARE, CHAMPVA, as with a permanent 100% rating. VA may still ask for an employment questionnaire, VA Form 21-4140.' },
    { q: 'Do military retirees on TDIU get CRDP?', a: 'Yes. A retiree with 20 or more years who receives TDIU is paid CRDP in full, so retired pay and the 100% VA rate run together. The rule has applied to unemployability since 2005. A Chapter 61 retiree with fewer than 20 years does not receive CRDP but can apply for CRSC if the disabilities are combat-related.' },
  ],
  body: (h) => `
<h2>The two schedular thresholds</h2>
${h.table(['Ratings', 'Combined', 'Schedular test of 4.16(a)'], ex.map(([l, r]) => { const v = combinedValue(r); const rt = Math.floor((v + 5) / 10) * 10; const ok = (r.length === 1 && r[0] >= 60) || (r.length > 1 && rt >= 70 && Math.max(...r) >= 40); return [l, `${v} → ${rt}%`, ok ? 'met' : 'not met']; }), 'Combined values from 38 CFR 4.25; thresholds of 38 CFR 4.16(a).', ['l', 'r', 'l'])}
<p>The table shows that the rule is not just "70% or more". A veteran with four ratings that combine to 70% without a single one at 40% does not meet it, and a veteran with two ratings of 40% combines only to ${combinedValue([40, 40])}, short of 70. A single condition at 60% is enough on its own.</p>
<h2>What "one disability" means</h2>
<p>For these thresholds, 38 CFR 4.16(a) treats several conditions as one disability in five cases: disabilities of one or both upper extremities, or of one or both lower extremities, including the bilateral factor; disabilities resulting from a common cause or a single accident; disabilities affecting one body system, such as orthopedic or cardiovascular; multiple injuries incurred in action; and multiple disabilities incurred as a prisoner of war. A veteran with a knee at 30% and an ankle at 20% on the same leg, for example, can argue that they form one disability of the lower extremity at their combined value, which can create the 40% anchor needed for the second threshold.</p>
<h2>Substantially gainful employment</h2>
<p>VA's question is whether the service-connected conditions make the veteran unable to secure and follow a substantially gainful occupation. Gainful means earnings above the poverty threshold for one person. Marginal employment, below that line, or work in a protected setting where the employer makes allowances no ordinary employer would, does not count against the claim. VA considers the veteran's education, training and work history: a former infantryman with a high school diploma and a severe back condition is in a different position from an engineer with the same rating who can work from a desk.</p>
<h2>The evidence that carries a claim</h2>
<ol>
<li><strong>VA Form 21-8940</strong>, the veteran's application for increased compensation based on unemployability, listing jobs held in the last five years worked, dates, hours and earnings, and the education completed.</li>
<li><strong>VA Form 21-4192</strong>, sent by VA to the last employers, which confirms dates, earnings and the reasons the job ended.</li>
<li>Medical evidence describing functional limits, such as how long the veteran can stand, sit, concentrate or interact with others, rather than diagnoses alone.</li>
<li>When available, a decision from the Social Security Administration on disability benefits, which VA considers without being bound by it.</li>
</ol>
<h2>Paragraph (b): below the thresholds</h2>
<p>Veterans who are unemployable but fall short of the percentages are not excluded. 38 CFR 4.16(b) states that all veterans unable to secure and follow a substantially gainful occupation because of service-connected disabilities should be rated totally disabled, and directs the regional office to submit such cases to the Director of Compensation Service. These claims take longer and depend heavily on the work evidence.</p>
<h2>TDIU, 100% and money</h2>
<p>For a married veteran with one child at 70%, TDIU raises the monthly payment from ${usdx(comp(70, { spouse: true, kids: 1 }))} to ${usdx(comp(100, { spouse: true, kids: 1 }))}, about ${usd((comp(100, { spouse: true, kids: 1 }) - comp(70, { spouse: true, kids: 1 })) * 12)} a year. Survivors also benefit: if the veteran received TDIU or a 100% rating for ten continuous years before death, the family can receive ${h.a('dic-rates', 'DIC')} even when the death is not service connected. The ${h.a('home', 'VA disability calculator')} flags the schedular threshold when you enter your ratings, and the pages for ${h.a('va-60-percent', '60%')} and ${h.a('va-70-percent', '70%')} detail the two routes.</p>
<h2>Common reasons TDIU claims are denied</h2>
<p>Most denials come from the work side of the file rather than the medical side. The first is incomplete employment information on the 21-8940, which leaves VA to guess. The second is evidence that blames the inability to work on age, a non-service-connected illness or a general labor market, none of which VA may consider. The third is current work above the poverty threshold, even part time, without evidence that the job is protected or accommodated. The fourth is a medical opinion that describes symptoms without saying what tasks the veteran cannot do. A denial can be appealed through a supplemental claim with new evidence, a higher-level review, or the Board of Veterans' Appeals.</p>
<h2>Keeping TDIU</h2>
<p>Once granted, TDIU continues as long as the veteran does not return to substantially gainful work. VA may send VA Form 21-4140 to confirm employment status; it must be returned on time, or the award can be suspended. A veteran who tries to work and fails can generally return to TDIU, and protections apply after twenty years.</p>`,
  related: ['va-60-percent', 'va-70-percent', 'va-100-percent', 'home', 'dic-rates'],
  sources: ['cfr416', 'vaRates', 'cfr425'],
});
