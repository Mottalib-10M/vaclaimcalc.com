import { definePage } from '../../lib/page-types';
import { P, bah, bahArg, bah25, bahChange, bahShares, usd, mhaLabel, zipsOf, rankOf, BAH_COST_SHARE } from '../../lib/kit';

const C = 'KY106';
const G = ['E-1', 'E-4', 'E-5', 'E-6', 'E-7', 'E-8', 'E-9', 'W-1', 'W-2', 'W-3', 'O-1', 'O-2', 'O-3', 'O-4', 'O-5', 'O-6'];
const Z = zipsOf(C);
const R = rankOf(C);

export default definePage({
  id: 'bah-fort-campbell',
  group: 'bah',
  kind: 'location',
  order: 400,
  slug: 'bah-fort-campbell',
  nav: 'BAH Fort Campbell',
  card: 'Fort Campbell and Clarksville, on the Kentucky and Tennessee line: 2026 BAH by grade',
  title: `BAH Fort Campbell 2026: Clarksville Rates for Every Grade`,
  description: `BAH Fort Campbell 2026: ${usd(bah(C, 'E-5'))} for an E-5 with dependents, ${usd(bah(C, 'O-3'))} for an O-3, one rate for Clarksville, Tennessee and Oak Grove and Hopkinsville, Kentucky.`,
  h1: 'BAH at Fort Campbell for 2026',
  intro: 'The 2026 housing allowance of the Fort Campbell housing area, which spans two states, and how it compares with Nashville and the year before.',
  resume: `An E-5 with dependents at Fort Campbell receives ${usd(bah(C, 'E-5'))} a month of BAH in 2026 and ${usd(bah(C, 'E-5', false))} without dependents; a married O-3 receives ${usd(bah(C, 'O-3'))}. The post sits on the line between Kentucky and Tennessee, and so does its housing area: the Defense Travel Management Office file lists ${Z.n} ZIP codes in the ${mhaLabel(C)} area (${C}), from Clarksville, Tennessee, where many families live, to Oak Grove and Hopkinsville in Kentucky. One table applies on both sides of the state line. The area ranks ${R.rank} of ${R.of} for the E-5 family rate, and the 2026 rates barely moved from 2025 for the junior grades: the E-5 rate rose by ${usd(bahChange(C, 'E-5').diff)}. Officer and warrant rates rose more, which matters at a post with a large aviation brigade. Nashville, an hour away, pays an E-5 family ${usd(bah('TN269', 'E-5'))}.`,
  mini: 'bahLocal',
  miniArg: bahArg(C, 'Fort Campbell'),
  faqs: [
    { q: 'Is Fort Campbell BAH different in Kentucky and Tennessee?', a: `No. The Fort Campbell housing area covers ZIP codes in both states, and the rate depends on the duty station, not on the state where you live. In 2026 an E-5 with dependents receives ${usd(bah(C, 'E-5'))} whether the family rents in Clarksville, Tennessee, or in Oak Grove, Kentucky. State income tax rules on pay, by contrast, do differ between the two states.` },
    { q: 'What is BAH for a CW2 with dependents at Fort Campbell?', a: `${usd(bah(C, 'W-2'))} a month in 2026, and ${usd(bah(C, 'W-2', false))} without dependents. A WO1 receives ${usd(bah(C, 'W-1'))} and a CW3 ${usd(bah(C, 'W-3'))} with dependents. Warrant officers are numerous at Fort Campbell because of the Army aviation units on post, and they are paid BAH under the same rules as other members of their grade and status.` },
    { q: 'Did Fort Campbell BAH go up in 2026?', a: `Slightly for most grades. The E-5 family rate went from ${usd(bah25(C, 'E-5'))} in 2025 to ${usd(bah(C, 'E-5'))}, while the O-3 rate rose from ${usd(bah25(C, 'O-3'))} to ${usd(bah(C, 'O-3'))}. Any member whose rate would have fallen keeps the 2025 amount under rate protection while staying at Fort Campbell with the same status.` },
  ],
  body: (h) => `
<h2>Fort Campbell BAH by grade</h2>
${h.table(['Grade', 'With dependents', 'Without dependents'], G.map((g) => [g, usd(bah(C, g)), usd(bah(C, g, false))]), `Monthly BAH, ${mhaLabel(C)} (${C}), DTMO ${P.bah.year} rates.`, ['l', 'r', 'r'])}
<h2>One rate across a state line</h2>
<p>The ZIP codes of the area run from ${Z.first}, in Tennessee, to ${Z.last}, in Kentucky. The DoD draws housing areas around where members live, not around state borders, so soldiers of the same unit can pay rent in two states while drawing the same allowance. What the state line does change is state income tax for members who are legal residents of the state where they live: Tennessee has no state income tax on wages, Kentucky does, and military pay rules differ by state. Neither touches BAH, which is not taxed anywhere.</p>
<h2>2025 and 2026 at Fort Campbell</h2>
${h.table(['Grade', '2025', '2026', 'Change'], ['E-4', 'E-5', 'E-6', 'E-7', 'W-2', 'O-1', 'O-3', 'O-5'].map((g) => { const x = bahChange(C, g); return [g, usd(x.from), usd(x.to), `${x.diff >= 0 ? '+' : '−'}${usd(Math.abs(x.diff))} (${x.pct >= 0 ? '+' : '−'}${Math.abs(x.pct)}%)`]; }), 'Monthly BAH with dependents, DTMO 2025 and 2026 rates.', ['l', 'r', 'r', 'r'])}
<p>The pattern of 2026 is uneven: junior enlisted rates almost flat, officer and warrant rates up by larger amounts. The DTMO prices each grade on a different housing profile, and the rents of those profiles did not move together. In the area, rent makes up about ${bahShares(C)!.rent}% of the measured housing cost and utilities ${bahShares(C)!.utilities}%, before the ${BAH_COST_SHARE}% member cost share.</p>
<h2>Nashville and Fort Knox for comparison</h2>
<p>Soldiers assigned to recruiting or to units in Nashville receive the Nashville table, much higher: ${usd(bah('TN269', 'O-3'))} for an O-3 with dependents against ${usd(bah(C, 'O-3'))} at Fort Campbell. Kentucky's other Army post, Fort Knox, has its own area: ${usd(bah('KY110', 'E-5'))} for an E-5 with dependents. The ${h.a('bah-calculator', 'BAH calculator')} checks any ZIP code, and the ${h.a('military-pay-calculator', 'military pay calculator')} adds basic pay and BAS. For the other large airborne post, see ${h.a('bah-fort-bragg', 'Fort Bragg')}.</p>
<h2>Warrant officers and aviators</h2>
<p>With dependents, the warrant officer rates at Fort Campbell run from ${usd(bah(C, 'W-1'))} for a WO1 to ${usd(bah(C, 'W-3'))} for a CW3, between the senior enlisted and the field grade officer rates. Aviation incentive pay comes on top of basic pay for rated aviators, but it is taxable and is not part of BAH. A WO1 just out of flight school who arrives single receives ${usd(bah(C, 'W-1', false))}.</p>
<p>Members who live in on-post family housing at Fort Campbell receive the home instead of the allowance. When a soldier moves off post, the full rate of the grade starts from the date the housing office releases the family, so the timing of a move-out can matter for the first month's budget.</p>
<p>For dual-military couples, each soldier draws BAH: at most one at the with-dependents rate when they have children, the other at the single rate, both under the Fort Campbell table as long as both are assigned there.</p>
<p>Soldiers of the 101st Airborne Division who move between Fort Campbell and Fort Bragg for successive assignments will notice that the two airborne posts pay close rates for junior grades, with Fort Campbell paying more for most officers.</p>`,
  related: ['bah-calculator', 'bah-fort-bragg', 'bah-fort-hood', 'military-pay-calculator', 'pay-warrant'],
  sources: ['dtmoBah', 'dtmoBah2025', 'dtmoComponents'],
});
