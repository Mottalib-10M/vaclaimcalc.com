import { definePage } from '../../lib/page-types';
import { comp, combine, combinedValue, usdx } from '../../lib/kit';

const legs = (l: number, r: number, others: number[] = []) => combine([{ rating: l, limb: 'leg', side: 'left' }, { rating: r, limb: 'leg', side: 'right' }, ...others.map((x) => ({ rating: x }))]);
const ex = [
  { label: 'Both knees 10%', c: legs(10, 10), plain: combinedValue([10, 10]) },
  { label: 'Knees 10% and 20%', c: legs(10, 20), plain: combinedValue([10, 20]) },
  { label: 'Knees 20% and 20%, back 40%', c: legs(20, 20, [40]), plain: combinedValue([40, 20, 20]) },
  { label: 'Knees 30% and 10%, PTSD 50%', c: legs(30, 10, [50]), plain: combinedValue([50, 30, 10]) },
  { label: 'Feet 10% and 10%, PTSD 70%, back 20%', c: legs(10, 10, [70, 20]), plain: combinedValue([70, 20, 10, 10]) },
];
const reg = combine([{ rating: 60 }, { rating: 20 }, { rating: 10, limb: 'leg', side: 'left' }, { rating: 10, limb: 'leg', side: 'right' }]);
const up = legs(20, 20, [40]);

export default definePage({
  id: 'bilateral-factor',
  group: 'va',
  kind: 'guide',
  order: 30,
  slug: 'bilateral-factor',
  nav: 'Bilateral factor',
  card: 'How VA adds 10% when both arms or both legs are rated, with worked examples',
  title: 'Bilateral Factor VA 2026: How the 10% Is Added, Examples',
  description: `Bilateral factor VA in 2026: both knees at 10% become ${legs(10, 10).bilateral}, not 19, under 38 CFR 4.26. Worked examples, the exception rule and a calculator for your own ratings.`,
  h1: 'The VA bilateral factor, explained with numbers',
  intro: 'When both arms or both legs are rated, VA adds 10% before combining anything else. Here is what that changes, and when it changes your rating step.',
  resume: `The bilateral factor is a rule of 38 CFR 4.26: when a veteran has compensable ratings on both arms, or both legs, or paired skeletal muscles, VA first combines those ratings, then adds 10% of the result, and treats the total as one disability before combining the others. Two knees at 10% combine to 19; the factor adds 1.9, so the bilateral disability counts as ${legs(10, 10).bilateral}. The amount is small on its own, but it lands at the top of the combination, where it can push the combined value over a rounding line: knees at 20% and 20% with a back rated 40% give a combined value of ${up.value} with the factor and ${combinedValue([40, 20, 20])} without it, which is the difference between ${up.rating}% and ${Math.floor((combinedValue([40, 20, 20]) + 5) / 10) * 10}%, or ${usdx(comp(up.rating) - comp(Math.floor((combinedValue([40, 20, 20]) + 5) / 10) * 10))} a month for a veteran alone in 2026. The calculator below applies it to your own ratings.`,
  mini: 'bilateral',
  faqs: [
    { q: 'Does the bilateral factor apply to tinnitus or hearing loss?', a: 'No. Tinnitus has a single rating whatever the number of ears, and hearing loss is already rated for both ears together under the hearing tables. The bilateral factor of 38 CFR 4.26 covers the upper and lower extremities (an arm and its hand, a leg and its foot) and paired skeletal muscles. Eyes and ears have their own rules.' },
    { q: 'Do I need the same condition on both sides for the bilateral factor?', a: 'No. The regulation speaks of disabilities affecting the use of paired extremities "regardless of location or specified type of impairment": a right knee and a left foot qualify together, as do an amputation on one side and flat feet on the other. What matters is a compensable rating, at least 10%, on each side of the pair.' },
    { q: 'Can the bilateral factor lower my VA rating?', a: 'It should not. Paragraph (d) of 38 CFR 4.26, added in 2023, tells VA to leave a bilateral disability out of the factor and combine it separately when that gives a better result. Our calculator tries every grouping and keeps the most favorable one, so the result shown is never below the plain combination of the same ratings.' },
    { q: 'How does VA show the bilateral factor on my rating decision?', a: 'The code sheet and the narrative usually mention "bilateral factor" next to the affected conditions, with the percentage it added. If your knees, hips, feet or arms are rated on both sides and nothing is said about it, compare the combined rating with our calculator; a missing bilateral factor is a clear error that can be raised in a higher-level review.' },
  ],
  body: (h) => `
<h2>The rule in four steps</h2>
<ol>
<li>Take every compensable disability of the paired extremities: both arms (shoulder to hand) or both legs (hip to foot). If all four limbs are affected, all of them go in the same group.</li>
<li>Combine them with the combined ratings table as if they were alone.</li>
<li>Add 10% of that combined value, without combining it, and round to a whole number.</li>
<li>Put the result in the list of your other ratings as one disability, in order of severity, and combine everything as usual. Round to the nearest 10 only at the very end.</li>
</ol>
<p>The regulation gives its own example: ratings of 60%, 20%, 10% and 10%, the two 10% being bilateral. The two 10% combine to 19, plus 1.9, so ${reg.bilateral}. The order of severity becomes 60, ${reg.bilateral} and 20; 60 and ${reg.bilateral} combine to 68, and 68 and 20 to ${reg.value}, which becomes ${reg.rating}%. The calculator reproduces that example exactly; it is one of the tests the site runs before each update.</p>
<h2>Worked examples</h2>
${h.table(['Ratings', 'Bilateral value', 'Combined value', 'Rating', 'Without the factor'], ex.map((x) => [x.label, `${x.c.bilateral}`, `${x.c.value}`, `${x.c.rating}%`, `${x.plain} → ${Math.floor((x.plain + 5) / 10) * 10}%`]), 'Combined with 38 CFR 4.25 Table I after the 38 CFR 4.26 bilateral factor.', ['l', 'r', 'r', 'r', 'r'])}
<p>In most of these cases the final step does not move: the factor adds one or two points of combined value, and a rating changes only when those points cross a line that ends in 5. That is why veterans often hear that the bilateral factor "does nothing". It does something every time; whether you see it in dollars depends on where your combined value sits. A veteran at a combined 64 has everything to gain from one more point, a veteran at 66 has nothing.</p>
<h2>Which conditions count</h2>
<p>The paired extremities are the arms and the legs taken as wholes. A shoulder and the opposite wrist count together, a hip and the opposite ankle too. Paired skeletal muscles are the muscle groups VA rates on both sides of the body. Knees are the most common case: veterans who served long years carrying loads often have a rating on each knee, and both are compensable at 10% for painful motion. Radiculopathy of both legs, rated as nerve damage, also falls under the factor, which matters for back injuries that send pain down both sides.</p>
<p>What does not count: the spine itself, which is one body part; hearing loss and tinnitus; eyes; and any side rated 0%, since the regulation requires compensable disability on each side. When one knee is at 10% and the other at 0%, there is no bilateral factor at all. If the second knee is later raised to 10%, the factor starts with that new rating, so the gain is larger than the 10% alone suggests.</p>
<h2>Why the factor exists</h2>
<p>The combined ratings table measures how much efficiency a person keeps. Losing the use of one knee leaves the other to carry the load; losing part of the use of both leaves no healthy side to compensate. A plain combination would treat the two knees like two unrelated conditions, a knee and an ear, and understate the effect on walking, standing and climbing. The 10% added by the factor is the rough correction the rating schedule chose for that loss of a compensating limb, and it has been in the schedule since 1964 in almost the same words.</p>
<p>The factor also explains a pattern many veterans notice on their decision: a group of small limb ratings weighs a little more than the same ratings scattered across the body. Two ankles at 10% count as ${legs(10, 10).bilateral}, while an ankle at 10% and a wrist at 10% on the same side combine to only ${combinedValue([10, 10])}, because the wrist is an arm and the ankle a leg, and neither has a rated partner on the other side.</p>
<h2>A step-by-step case</h2>
<p>Take a veteran with PTSD at 50%, a lower back at 20%, the right knee at 10% and the left knee at 20%. The knees combine first: 20 and 10 give ${combinedValue([20, 10])}, and 10% of that is ${(combinedValue([20, 10]) / 10).toFixed(1)}, so the bilateral value is ${legs(20, 10).bilateral}. The order of severity is now 50, ${legs(20, 10).bilateral} and 20. Fifty and ${legs(20, 10).bilateral} combine to ${combinedValue([50, legs(20, 10).bilateral])}; that value and 20 combine to ${legs(20, 10, [50, 20]).value}. The final rating is ${legs(20, 10, [50, 20]).rating}%, worth ${usdx(comp(legs(20, 10, [50, 20]).rating))} a month for a veteran alone in 2026. Without the factor the four ratings would combine to ${combinedValue([50, 20, 20, 10])}.</p>
<h2>The exception of paragraph (d)</h2>
<p>Since a 2023 amendment, paragraph (d) of ${h.src('cfr426', '38 CFR 4.26')} says that if the combined evaluation is lower with a bilateral disability inside the factor than outside it, VA must leave it out and combine it separately. This happens in unusual mixes of high and low ratings, where grouping a small limb rating with a large one changes the order of severity. You do not have to work it out: our engine tries each grouping of your limb ratings and keeps the best. VA raters are supposed to do the same, and a decision that applies the factor against the veteran can be challenged.</p>
<h2>How to check your own decision</h2>
<p>Write down each rating from the code sheet of your decision, mark the ones on the left and right arms and legs, and enter them in the ${h.a('home', 'VA disability calculator')} with the body part. The result shows the bilateral value, the combined value and the final rating. If VA's combined rating is lower, look first at whether every limb rating was included in the group; then at whether a 0% side was counted by mistake. The ${h.a('va-combined-rating-table', 'combined ratings table')} lets you redo the steps one at a time, and the ${h.a('va-disability-rates', '2026 rate chart')} gives the monthly amount at each step.</p>`,
  related: ['va-combined-rating-table', 'home', 'va-disability-rates', 'va-20-percent', 'tdiu'],
  sources: ['cfr426', 'cfr425', 'vaRatings'],
});
