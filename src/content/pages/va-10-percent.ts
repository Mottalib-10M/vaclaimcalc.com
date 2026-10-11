import { definePage } from '../../lib/page-types';
import { P, comp, combinedValue, usdx, usd, day } from '../../lib/kit';

const R = 10;
const stack = [1, 2, 3, 4, 5, 6].map((n) => [n, combinedValue(Array(n).fill(10))]);

export default definePage({
  id: 'va-10-percent',
  group: 'va',
  kind: 'rating',
  order: 110,
  slug: 'va-disability-10-percent',
  nav: '10% VA disability',
  card: 'The single 10% rate, what is usually rated 10% and how 10% ratings stack up',
  title: '10% VA Disability Pay 2026: Monthly Rate and How It Stacks',
  description: `10% VA disability pays ${usdx(comp(R))} a month in 2026, the same for every family. See how several 10% ratings combine, from ${combinedValue([10, 10])} to ${combinedValue(Array(6).fill(10))}, and what each one leads to.`,
  h1: '10% VA disability rating: the first step',
  intro: 'What a 10% service-connected rating pays in 2026, why the family makes no difference, and what happens when several 10% ratings add up.',
  resume: `A 10% VA disability rating pays ${usdx(comp(R))} a month in 2026, or ${usd(comp(R) * 12)} a year, tax free, under the rates in force since ${day(P.va.ratesEffective)}. It is the same for a single veteran and for one with a spouse and four children: VA adds amounts for dependents only from a combined 30%. Ten percent is the most frequent rating VA awards, because the rating schedule puts many common conditions there, from tinnitus, whose maximum rating is 10%, to knees or ankles with painful motion and scars. The rating also counts beyond the check: it opens VA health care for the rated condition and puts the veteran in priority group 3 when no other factor applies, and two 10% ratings combine to ${combinedValue([10, 10])}, which VA rounds to 20%.`,
  mini: 'ratingPay',
  miniArg: { rating: R },
  faqs: [
    { q: 'Does VA pay more at 10% if I am married?', a: `No. At 10% and 20% the law sets one rate for everyone: ${usdx(comp(10))} a month at 10% in 2026, whatever your family. Additional compensation for a spouse, children and dependent parents starts at a combined 30% (38 U.S.C. 1115). Report your dependents anyway when you file, so that VA adds them as soon as your rating reaches that level.` },
    { q: 'How many 10% ratings does it take to reach 50%?', a: `Six. VA combines them on remaining efficiency rather than adding: two make ${combinedValue([10, 10])} (rounded to 20%), three ${combinedValue([10, 10, 10])}, four ${combinedValue(Array(4).fill(10))}, five ${combinedValue(Array(5).fill(10))} and six ${combinedValue(Array(6).fill(10))}, which rounds to 50%. Ten ratings of 10% reach only ${combinedValue(Array(10).fill(10))}, rounded to 70%, far from 100%.` },
    { q: 'Is a 10% VA rating worth filing for?', a: `Over a year, 10% is ${usd(comp(10) * 12)} tax free, and it raises with the cost-of-living adjustment each December. It also makes the condition service connected, which matters later: if it gets worse you ask for an increase rather than proving the connection again, and a 10% rating is one of the inputs of the combined rating if other conditions follow.` },
  ],
  body: (h) => `
<h2>One rate, whatever the family</h2>
<p>The 10% amount is fixed by statute for the veteran alone. The tables of VA have no column for a spouse or children at this level, and a veteran who reads "with spouse" next to 30% often assumes the same applies to 10%. It does not. Since ${day(P.va.ratesEffective)}, the rate is ${usdx(comp(R))}; the year before it was ${usdx(P.va.prev10)}, and the difference is the ${P.va.colaPct}% cost-of-living adjustment that VA applies automatically.</p>
<h2>Conditions VA often rates at 10%</h2>
<p>The rating schedule of 38 CFR Part 4 sets 10% as the first compensable level for a large number of diagnostic codes. Recurrent tinnitus is rated 10% and cannot be rated higher, whether one ear or both are affected. Limitation of motion of a joint, painful motion of a knee or an ankle, scars that are painful or unstable, and mild symptoms under several body systems commonly land at 10%. Hearing loss, by contrast, is often rated 0% even when it is service connected, because the hearing tables require marked loss before they pay anything.</p>
<h2>How 10% ratings stack</h2>
${h.table(['Number of 10% ratings', 'Combined value', 'Rating'], stack.map(([n, v]) => [`${n}`, `${v}`, `${Math.floor((v + 5) / 10) * 10}%`]), 'Combined with 38 CFR 4.25 Table I, rounded once at the end.', ['l', 'r', 'r'])}
<p>Each new 10% rating applies to what is left of your efficiency, so the gains shrink. Two ratings reach 20%, three reach 30%, the first level where a family counts. That third 10% is therefore worth more than the first two: for a married veteran with a child, going from 20% to 30% raises the payment from ${usdx(comp(20))} to ${usdx(comp(30, { spouse: true, kids: 1 }))}. If two of the ratings are on both knees or both legs, the ${h.a('bilateral-factor', 'bilateral factor')} adds a little more.</p>
<h2>Beyond the monthly check</h2>
<p>A service-connected rating of 10% gives VA health care for the rated condition and, for many veterans, enrollment in priority group 3, which reduces or removes copays for care related to the condition. Some states and employers give preferences to veterans with any compensable rating, starting at 10%. To see what your ratings combine to, use the ${h.a('home', 'VA disability calculator')}; the next step up is described on the ${h.a('va-20-percent', '20% page')}.</p>
<h2>When 0% ratings add up to 10%</h2>
<p>A service-connected condition can be rated 0%: VA recognizes the link to service but finds no compensable level of disability. A single 0% rating pays nothing. Several of them can, under 38 CFR 3.324: when a veteran has two or more separate permanent service-connected disabilities rated 0% that clearly interfere with normal employability, VA may assign a 10% rating, but only if there is no other compensable rating in the decision. The rule is little known, and it is one of the few ways to reach ${usdx(comp(R))} a month without any condition meeting a 10% criterion on its own. A 0% rating also keeps its value for the future: if the condition worsens, the veteran files for an increase instead of proving service connection again.</p>
<h2>What a compensable rating opens besides the payment</h2>
<p>Veterans who receive VA compensation at any rating, including 10%, do not pay the VA home loan funding fee, which otherwise runs from about one to more than three percent of the loan amount; the exemption is stated on the certificate of eligibility. Since 2020, every veteran with a service-connected rating can also shop at commissaries and military exchanges with a Veteran Health Identification Card. And a 10% rating counts in the federal hiring preference: a veteran with a compensable service-connected disability receives the 10-point preference for competitive federal jobs, against 5 points for other eligible veterans.</p>`,
  related: ['va-20-percent', 'va-30-percent', 'va-combined-rating-table', 'bilateral-factor', 'va-disability-rates'],
  sources: ['vaRates', 'cfr425', 'usc1115'],
});
