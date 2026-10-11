import { definePage } from '../../lib/page-types';
import { P, comp, combinedValue, usdx, usd, day } from '../../lib/kit';

const R = 20;
const paths: Array<[string, number[]]> = [
  ['One condition at 20%', [20]],
  ['Two conditions at 10%', [10, 10]],
  ['20% and 10%', [20, 10]],
  ['Three conditions at 10%', [10, 10, 10]],
  ['20% and 20%', [20, 20]],
];
const famAt30 = comp(30, { spouse: true, kids: 2 });

export default definePage({
  id: 'va-20-percent',
  group: 'va',
  kind: 'rating',
  order: 120,
  slug: 'va-disability-20-percent',
  nav: '20% VA disability',
  card: 'The 20% rate, why two 10% ratings make 20, and what one more rating would add',
  title: '20% VA Disability Pay 2026: Rate, Combinations, Next Step',
  description: `20% VA disability pays ${usdx(comp(R))} a month in 2026, with no extra for dependents; one more 10% rating can mean 30% and ${usdx(famAt30)} for a married parent of two.`,
  h1: '20% VA disability rating: pay and the road to 30%',
  intro: 'The 2026 amount at 20%, the combinations that lead to it, and why the step to 30% matters more than any other for a family.',
  resume: `A 20% VA disability rating pays ${usdx(comp(R))} a month in 2026, ${usd(comp(R) * 12)} a year, and like 10% it pays the same whatever the family, under the rates effective ${day(P.va.ratesEffective)}. It is often reached without any condition rated 20%: two ratings of 10% combine to ${combinedValue([10, 10])}, and VA rounds that to 20%. A single condition at 20%, such as a back with moderate limitation of motion or a shoulder that cannot be raised above shoulder level on the dominant side, gets there alone. The level is a waiting room for many veterans. The next rating does far more than add 10 points: at 30%, a spouse and children start to count, so a married veteran with two children would go from ${usdx(comp(R))} to ${usdx(famAt30)}. That is why a pending claim for a new condition, or for an increase, is worth following closely at 20%.`,
  mini: 'ratingPay',
  miniArg: { rating: R },
  faqs: [
    { q: 'Why do two 10% VA ratings make 20% and not 19%?', a: `They do make 19 as a combined value: the second 10% applies to the 90% of efficiency left, which adds 9. VA then converts the final combined value to the nearest multiple of 10, and 19 becomes 20. The rounding happens only once, after all ratings are combined, so it never compounds from one step to the next (38 CFR 4.25).` },
    { q: 'What rating do I need with a 20% to get to 30%?', a: `Combined with a 20%, a new 10% gives ${combinedValue([20, 10])}, which rounds to 30%. So does any higher rating. If your 20% is itself made of two 10% ratings, a third 10% brings the combined value to ${combinedValue([10, 10, 10])}, also 30%. At that level, VA adds a spouse, children and dependent parents to the payment.` },
    { q: 'Is 20% VA disability enough for VA health care?', a: `Yes. Any service-connected rating opens VA health care, and ratings of 10% and 20% place a veteran in priority group 3 unless another factor gives a higher group. Care for the service-connected conditions themselves is provided without a copay. Enrollment is done on VA Form 10-10EZ or online on va.gov.` },
    { q: 'Can I get VA vocational rehabilitation with a 20% rating?', a: `Yes, a combined rating of 20% or more with an employment handicap meets the basic test of Veteran Readiness and Employment (Chapter 31); at 10% the handicap must be serious. The program can pay for a degree or a training program, with a monthly subsistence allowance, and does not reduce your ${usdx(comp(20))} of compensation. Apply on VA Form 28-1900; there is no deadline for veterans discharged on or after January 1, 2013, and a twelve-year period for the others.` },
  ],
  body: (h) => `
<h2>The many roads to 20%</h2>
${h.table(['Ratings on the decision', 'Combined value', 'Final rating'], paths.map(([l, r]) => [l, `${combinedValue(r)}`, `${Math.floor((combinedValue(r) + 5) / 10) * 10}%`]), 'Combined with 38 CFR 4.25 Table I.', ['l', 'r', 'r'])}
<p>The table shows why a 20% decision tells little about what lies behind it. A veteran with one condition at 20% and another with two at 10% are paid the same, ${usdx(comp(R))}, but they stand at different places: combined values of 20 and 19. Add a 10% rating to each and both reach 30%, and add two 10% ratings to the first and the value climbs to ${combinedValue([20, 10, 10])}, which rounds up to 40%, while the same two ratings bring the second veteran only to ${combinedValue([10, 10, 10, 10])}. VA math rewards the larger ratings.</p>
<h2>Why 30% is the step that changes a family's budget</h2>
<p>Below 30%, a family costs VA nothing extra. From 30%, the basic rate depends on a spouse, a first child and dependent parents, and each further child adds a set amount. For a veteran alone, the move from 20% to 30% adds ${usdx(comp(30) - comp(R))} a month. For a married veteran with two young children it adds ${usdx(famAt30 - comp(R))}, close to three times as much. The ${h.a('va-30-percent', '30% page')} details those amounts, and the ${h.a('va-dependents', 'dependents guide')} explains how to have them recorded.</p>
<h2>Asking for more at 20%</h2>
<p>A veteran rated 20% has two routes upward: an increase for a condition that got worse, supported by recent medical evidence, or a new claim for a condition linked to service, including one secondary to a rated condition, such as a hip problem caused by a rated knee. The ${h.a('home', 'calculator')} shows what each new rating would do to the combined value before you file.</p>
<h2>Back pay and the effective date</h2>
<p>VA pays from the effective date of the award, generally the date it received the claim or the intent to file that preceded it, and the first payment covers every month since. An intent to file, submitted online or by phone, holds that date for one year while you gather evidence. A veteran rated 20% from a claim filed ten months before the decision therefore receives about ${usd(comp(R) * 10)} in one deposit, then ${usdx(comp(R))} each month. Payments start on the first day of the month after the effective date, and each monthly payment arrives at the start of the following month.</p>
<h2>Veteran Readiness and Employment at 20%</h2>
<p>A 20% rating is the general threshold for Veteran Readiness and Employment, the VA program formerly called vocational rehabilitation (Chapter 31): a veteran rated 20% or more with an employment handicap can receive training, education or job placement services, with a subsistence allowance during training. At 10%, the program requires a serious employment handicap. The application is made on VA Form 28-1900. For many veterans at this level, the program is worth more over a few years than the monthly compensation itself, and it does not reduce it.</p>`,
  related: ['va-10-percent', 'va-30-percent', 'va-combined-rating-table', 'va-dependents', 'home'],
  sources: ['vaRates', 'cfr425'],
});
