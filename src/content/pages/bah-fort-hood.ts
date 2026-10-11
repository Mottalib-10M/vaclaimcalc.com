import { definePage } from '../../lib/page-types';
import { P, bah, bahArg, usd, mhaLabel, zipsOf, rankOf, bah25, bahChange, bahShares, BAH_COST_SHARE } from '../../lib/kit';

const C = 'TX286';
const G = ['E-1', 'E-4', 'E-5', 'E-6', 'E-7', 'E-8', 'E-9', 'W-1', 'W-2', 'W-3', 'W-4', 'O-1', 'O-2', 'O-3', 'O-4', 'O-5', 'O-6'];
const Z = zipsOf(C);
const R = rankOf(C);
const tx: Array<[string, string]> = [['TX286', 'Fort Hood'], ['TX415', 'Waco'], ['TX272', 'Austin'], ['TX285', 'San Antonio'], ['TX279', 'El Paso (Fort Bliss)']];

export default definePage({
  id: 'bah-fort-hood',
  group: 'bah',
  kind: 'location',
  order: 330,
  slug: 'bah-fort-hood',
  nav: 'BAH Fort Hood',
  card: 'Fort Hood, Killeen, Harker Heights and Copperas Cove: 2026 BAH by grade and the Texas comparison',
  title: `BAH Fort Hood 2026: Killeen Rates for Every Grade, by Status`,
  description: `BAH Fort Hood 2026: ${usd(bah(C, 'E-5'))} for an E-5 with dependents, ${usd(bah(C, 'E-7'))} for an E-7 and ${usd(bah(C, 'O-3'))} for an O-3 in Killeen, Harker Heights, Copperas Cove and Temple, TX.`,
  h1: 'BAH at Fort Hood (Killeen) for 2026',
  intro: 'The 2026 housing allowance of the housing area the DTMO file calls Fort Hood, one of the lowest-cost large posts, with the other Texas installations beside it.',
  resume: `An E-5 with dependents at Fort Hood receives ${usd(bah(C, 'E-5'))} a month of BAH in 2026 and ${usd(bah(C, 'E-5', false))} without dependents, while a married E-7 receives ${usd(bah(C, 'E-7'))} and a married O-3 ${usd(bah(C, 'O-3'))}. These are the rates of the ${mhaLabel(C)} housing area (${C}) in the Defense Travel Management Office file, ${Z.n} ZIP codes in Central Texas around Killeen, Harker Heights, Copperas Cove, Belton and Temple. The area sits near the bottom of the national scale: it ranks ${R.rank} of ${R.of} for the E-5 rate with dependents, and the E-5 family rate is barely above the junior enlisted rate of ${usd(bah(C, 'E-1'))}. The steps between grades are larger higher up: an E-7 receives ${usd(bah(C, 'E-7') - bah(C, 'E-5'))} more than an E-5, and an E-9 ${usd(bah(C, 'E-9'))}. For soldiers coming from coastal assignments, the allowance falls sharply, but so does the rent it is designed to cover.`,
  mini: 'bahLocal',
  miniArg: bahArg(C, 'Fort Hood'),
  faqs: [
    { q: 'What is BAH for an E-5 at Fort Hood in 2026?', a: `${usd(bah(C, 'E-5'))} a month with dependents and ${usd(bah(C, 'E-5', false))} without, under the DTMO 2026 rates for the Fort Hood housing area. The family rate is only ${usd(bah(C, 'E-5') - bah(C, 'E-4'))} above the E-4 rate, one of the smallest gaps between those two grades anywhere in the country.` },
    { q: 'Do Temple and Belton use the Fort Hood BAH rate?', a: `Yes, they belong to the same housing area as Killeen, Harker Heights and Copperas Cove in the DTMO file. The allowance depends on the duty station, though, not on where you live: a soldier assigned to Fort Hood receives the Fort Hood rate in any town, and a soldier assigned to a unit in Waco receives the Waco rate.` },
    { q: 'Why is BAH so low at Fort Hood?', a: 'BAH follows local rents and utility costs for the housing standard of each grade, measured each year by the DoD in every housing area. Central Texas rents are lower than those of large metropolitan areas, so the rates are among the lowest of any major installation. The allowance is meant to cover a typical home of the standard, not to pay the same amount everywhere.' },
    { q: 'What is the BAH for an O-4 with dependents at Fort Hood?', a: `${usd(bah(C, 'O-4'))} a month in 2026, against ${usd(bah(C, 'O-3'))} for an O-3 and ${usd(bah(C, 'O-5'))} for an O-5. An O-4 without dependents receives ${usd(bah(C, 'O-4', false))}. These rates apply to officers whose permanent duty station is in the Fort Hood housing area, whether they live in Killeen, Belton or farther out.` },
  ],
  body: (h) => `
<h2>Fort Hood BAH by grade</h2>
${h.table(['Grade', 'With dependents', 'Without dependents'], G.map((g) => [g, usd(bah(C, g)), usd(bah(C, g, false))]), `Monthly BAH, ${mhaLabel(C)} (${C}), DTMO ${P.bah.year} rates.`, ['l', 'r', 'r'])}
<h2>Central Texas and the rest of the state</h2>
${h.table(['Housing area', 'E-5 with dependents', 'E-7 with dependents', 'O-3 with dependents'], tx.map(([c, n]) => [n, usd(bah(c, 'E-5')), usd(bah(c, 'E-7')), usd(bah(c, 'O-3'))]), 'Monthly BAH 2026, DTMO.', ['l', 'r', 'r', 'r'])}
<p>Austin, an hour south, pays far more for every grade, which matters for soldiers assigned to recruiting, ROTC or headquarters jobs there. Waco, to the north, is close to Fort Hood for junior grades. San Antonio and El Paso, home of Fort Bliss, are the two other large Army communities of the state.</p>
<h2>The shape of the table at Fort Hood</h2>
<p>The Fort Hood table is compressed at the bottom and spread at the top. Junior enlisted families and E-5 families receive almost the same amount, because the homes the DoD prices for those grades rent for similar sums in Killeen. From E-6 upward the standard moves to larger homes and the rate climbs faster: ${usd(bah(C, 'E-6'))} for an E-6, ${usd(bah(C, 'E-8'))} for an E-8. Warrant officers, numerous at an aviation and armor post, run from ${usd(bah(C, 'W-1'))} for a WO1 to ${usd(bah(C, 'W-4'))} for a CW4.</p>
<h2>Coming from a high-cost station</h2>
<p>A family moving from a coastal assignment to Fort Hood will see BAH drop by a large amount: an E-6 with dependents receives ${usd(bah('CA038', 'E-6'))} in San Diego and ${usd(bah(C, 'E-6'))} at Fort Hood. The new rate applies from the report date at the new station. Basic pay and BAS do not change, so the ${h.a('military-pay-calculator', 'military pay calculator')} is the quickest way to see the new monthly total. For other Army posts, see ${h.a('bah-fort-bragg', 'Fort Bragg')} and ${h.a('bah-fort-campbell', 'Fort Campbell')}, or look up any ZIP code in the ${h.a('bah-calculator', 'BAH calculator')}.</p>
<h2>A large increase for 2026</h2>
<p>Fort Hood had one of the larger increases of the big Army posts: the E-5 family rate rose from ${usd(bah25(C, 'E-5'))} in 2025 to ${usd(bah(C, 'E-5'))} in 2026, ${bahChange(C, 'E-5').pct}% more, and the O-3 rate from ${usd(bah25(C, 'O-3'))} to ${usd(bah(C, 'O-3'))}. Rents in Central Texas had caught up with the allowance, and the annual survey of the DTMO brought the table back in line.</p>
${h.table(['Grade', '2025', '2026', 'Change'], ['E-4', 'E-5', 'E-6', 'E-7', 'E-9', 'O-1', 'O-3', 'O-5'].map((g) => { const x = bahChange(C, g); return [g, usd(x.from), usd(x.to), `${x.diff >= 0 ? '+' : '−'}${usd(Math.abs(x.diff))} (${x.pct >= 0 ? '+' : '−'}${Math.abs(x.pct)}%)`]; }), 'Monthly BAH with dependents, DTMO 2025 and 2026 rates.', ['l', 'r', 'r', 'r'])}
<p>The DTMO's component breakdown puts rent at about ${bahShares(C)!.rent}% of the housing cost behind the Fort Hood rate and utilities at ${bahShares(C)!.utilities}%. Long, hot summers make air conditioning a real budget item for families here, which the utility share reflects. As everywhere, the allowance is set ${BAH_COST_SHARE}% below the full measured cost, the member's share by design.</p>
<p>Members assigned to Fort Hood who live in government family housing on post do not receive BAH; the housing is provided instead, and the allowance shown here applies only to families renting or owning off post.</p>`,
  related: ['bah-calculator', 'bah-san-antonio', 'bah-fort-bragg', 'bah-fort-campbell', 'military-pay-calculator'],
  sources: ['dtmoBah', 'dfasBas'],
});
