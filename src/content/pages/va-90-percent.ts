import { definePage } from '../../lib/page-types';
import { P, comp, rateCell, combinedValue, RATINGS, usdx, usd, day } from '../../lib/kit';

const R = 90;
const steps = RATINGS.slice(1).map((r, i) => [`${RATINGS[i]}% to ${r}%`, comp(r) - comp(RATINGS[i])]) as Array<[string, number]>;
const need = (v: number) => [10, 20, 30, 40, 50, 60, 70, 80, 90, 100].find((r) => combinedValue([v, r]) >= 95) ?? 100;

export default definePage({
  id: 'va-90-percent',
  group: 'va',
  kind: 'rating',
  order: 190,
  slug: 'va-disability-90-percent',
  nav: '90% VA disability',
  card: 'The 90% rate, the largest jump of the scale to 100% and the combined value of 95',
  title: '90% VA Disability Pay 2026: Rates and the Jump to 100%',
  description: `90% VA disability pays ${usdx(comp(R))} a month in 2026 alone; 100% pays ${usdx(comp(100))}, a jump of ${usdx(comp(100) - comp(R))}. Only a combined value of 95 or more is rounded up to 100%.`,
  h1: '90% VA disability rating: so close to 100%',
  intro: 'What 90% pays in 2026, why the step to 100% is the largest of the whole scale, and the three ways veterans at 90% end up paid at the full rate.',
  resume: `A 90% VA disability rating pays ${usdx(comp(R))} a month in 2026 to a veteran with no dependents and ${usdx(comp(R, { spouse: true, kids: 1 }))} with a spouse and one child, at the rates effective ${day(P.va.ratesEffective)}. It sits one step below the largest jump of the scale: 100% pays ${usdx(comp(100))} alone, ${usdx(comp(100) - comp(R))} more each month, while every other step of 10 points adds a few hundred dollars at most. The combined values behind 90% run from 85 to 94, and only 95 rounds up to 100%, which is why many veterans stay at a combined 91 to 94 for years: from 94, a 10% rating gives ${combinedValue([94, 10])}, enough, but from 90 a new rating needs to be at least ${need(90)}%. The other routes to the full rate are a single condition rated 100%, individual unemployability, and special monthly compensation on top for specific losses.`,
  mini: 'ratingPay',
  miniArg: { rating: R },
  faqs: [
    { q: 'Why is the jump from 90% to 100% VA disability so big?', a: `The rate schedule of 38 U.S.C. 1114 treats total disability as a separate level rather than one more step, so 100% pays ${usdx(comp(100))} alone in 2026 against ${usdx(comp(90))} at 90%, a difference of ${usdx(comp(100) - comp(90))}. The dependents' amounts also grow at 100%: a child under 18 beyond the first adds ${usdx(rateCell(100, 'addChild'))} instead of ${usdx(rateCell(90, 'addChild'))}.` },
    { q: 'What combined value do I need for 100% VA disability?', a: `95 or more. VA rounds the combined value to the nearest 10 with values ending in 5 going up, so 95 becomes 100 and 94 stays at 90 (38 CFR 4.25). From a combined 94 a new 10% rating is enough; from 90 the smallest rating that reaches 95 is ${need(90)}%. A single disability rated 100% or a grant of TDIU are the other ways to the full rate.` },
    { q: 'Can a veteran at 90% get paid at the 100% rate without a new rating?', a: `Yes, through individual unemployability, if service-connected conditions prevent substantially gainful employment. At 90% the schedular test of 38 CFR 4.16(a) is met in practically every case. TDIU pays the 100% rate, including the 100% amounts for dependents, while the rating on paper stays at 90%. Apply on VA Form 21-8940.` },
    { q: 'Does SMC-K add to a 90% VA rating?', a: `Yes. SMC-K, ${usdx(P.va.smcK)} a month in 2026, is added to the regular compensation at any rating from 0% to 100%, for the loss or loss of use of a creative organ, a hand or a foot, both buttocks, blindness of one eye with only light perception, and some other losses. Up to three SMC-K awards can be paid on top of the 90% rate.` },
  ],
  body: (h) => `
<h2>Every step of the scale, compared</h2>
${h.table(['Step', 'Added per month, veteran alone'], steps.map(([l, v]) => [l, usdx(v)]), 'Difference between consecutive 2026 rates, veteran with no dependents.', ['l', 'r'])}
<p>The table makes the shape of the scale plain: the steps grow slowly from 10% to 90%, then the last one is several times larger than any other. For a married veteran with one child, 90% pays ${usdx(comp(R, { spouse: true, kids: 1 }))} and 100% pays ${usdx(comp(100, { spouse: true, kids: 1 }))}.</p>
<h2>The combined value is what matters at 90%</h2>
<p>Two veterans rated 90% can be at a combined 85 and at a combined 94. The first needs ratings that remove ten more points of efficiency out of fifteen left, which takes a very large new rating. The second needs only one more point out of six. That is why the exact value, which VA does not print on most decision letters, is worth computing before deciding what to claim next. The ${h.a('home', 'VA disability calculator')} shows it, and the ${h.a('va-combined-rating-table', 'combined ratings table')} lets you check each step by hand.</p>
<h2>Three ways to the full rate</h2>
<p>A single condition can be rated 100% under its own diagnostic code, which settles the question. A veteran can be granted TDIU when the conditions prevent steady work, and be paid at 100% while keeping a 90% rating. And special monthly compensation, paid for the loss or loss of use of limbs, blindness, being housebound or the need for daily help, replaces the scale with rates that start above the 100% amount from SMC-L upward; see ${h.a('va-smc-rates', 'SMC rates')}. The ${h.a('va-100-percent', '100% page')} explains what changes once there.</p>
<h2>SMC-K on top of 90%</h2>
<p>Special monthly compensation at level K, ${usdx(P.va.smcK)} a month in 2026, is added to the regular rate at any rating, including 90%, for the anatomical loss or loss of use of a creative organ, of a hand or a foot, or of both buttocks, for blindness of one eye with only light perception, and for some other specific losses. A veteran can receive up to three SMC-K awards on top of the scale. It is often overlooked by veterans at high ratings, because the decision letter mentions it in a separate paragraph.</p>
<h2>Dependents and retirees at 90%</h2>
<p>At 90%, a spouse adds ${usdx(comp(R, { spouse: true }) - comp(R))} a month and each child under 18 beyond the first ${usdx(rateCell(R, 'addChild'))}. A military retiree with 20 years keeps full retired pay through CRDP; a Chapter 61 retiree with fewer than 20 years relies on CRSC for combat-related conditions. In both cases the move to 100%, by rating or by TDIU, raises the VA part without touching retired pay.</p>
<h2>Asking VA for the combined value</h2>
<p>Most decision letters print the final rating, not the combined value. The code sheet lists every rating with its diagnostic code, and that is enough to recompute the value: enter each rating in the calculator with its body part, and the bilateral factor is applied for you. If your result differs from VA's, the most frequent causes are a rating left out of the combination, a bilateral factor not applied, or a 0% rating counted.</p>`,
  related: ['va-80-percent', 'va-100-percent', 'tdiu', 'va-combined-rating-table', 'va-smc-rates'],
  sources: ['vaRates', 'cfr425', 'cfr416'],
});
