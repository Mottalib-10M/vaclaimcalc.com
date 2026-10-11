import { definePage } from '../../lib/page-types';
import { P, bah, bahArg, usd, mhaLabel, zipsOf, rankOf, bah25, bahChange, bahShares, BAH_COST_SHARE } from '../../lib/kit';

const C = 'CO046';
const G = ['E-1', 'E-4', 'E-5', 'E-6', 'E-7', 'E-8', 'E-9', 'W-2', 'O-1', 'O-2', 'O-3', 'O-4', 'O-5', 'O-6'];
const Z = zipsOf(C);
const R = rankOf(C);
const co: Array<[string, string]> = [['CO046', 'Colorado Springs'], ['CO045', 'Denver'], ['CO422', 'Boulder'], ['CO047', 'Fort Collins']];

export default definePage({
  id: 'bah-colorado-springs',
  group: 'bah',
  kind: 'location',
  order: 350,
  slug: 'bah-colorado-springs',
  nav: 'BAH Colorado Springs',
  card: 'Fort Carson, Peterson, Schriever and the Air Force Academy: 2026 BAH by grade',
  title: `BAH Colorado Springs 2026: Fort Carson and Peterson Rates`,
  description: `BAH Colorado Springs 2026: ${usd(bah(C, 'E-5'))} for an E-5 with dependents, ${usd(bah(C, 'O-3'))} for an O-3 at Fort Carson, Peterson and Schriever SFB and the U.S. Air Force Academy.`,
  h1: 'BAH in Colorado Springs for 2026',
  intro: 'One housing area for an Army post, two Space Force bases and the Air Force Academy: the 2026 rates for each grade, and Denver for comparison.',
  resume: `An E-5 with dependents stationed in Colorado Springs receives ${usd(bah(C, 'E-5'))} a month of BAH in 2026, ${usd(bah(C, 'E-5', false))} without dependents; a married O-3 receives ${usd(bah(C, 'O-3'))}. The Defense Travel Management Office file puts ${Z.n} ZIP codes of El Paso County and its neighbors in the ${mhaLabel(C)} housing area (${C}), which serves an unusual mix of installations: Fort Carson, Peterson Space Force Base, Schriever Space Force Base, the Air Force Academy and Cheyenne Mountain. Soldiers, guardians, airmen and cadet instructors therefore share one table. The area ranks ${R.rank} of ${R.of} for the E-5 family rate, a little above the middle of the country. Its single rates are high in proportion for officers, because the DoD prices apartments and small homes close to family homes for the upper grades: an O-3 without dependents receives ${usd(bah(C, 'O-3', false))}, only ${usd(bah(C, 'O-3') - bah(C, 'O-3', false))} below the family rate.`,
  mini: 'bahLocal',
  miniArg: bahArg(C, 'Colorado Springs'),
  faqs: [
    { q: 'What is BAH at Fort Carson for an E-4 with dependents?', a: `${usd(bah(C, 'E-4'))} a month in 2026, the same rate as E-1 to E-3, in the Colorado Springs housing area. Without dependents an E-4 authorized to live off base receives ${usd(bah(C, 'E-4', false))}. Fort Carson, Peterson and Schriever Space Force Bases and the Air Force Academy all use this table.` },
    { q: 'Is Denver BAH higher than Colorado Springs BAH?', a: `Yes, for most grades. In 2026 an E-5 with dependents receives ${usd(bah('CO045', 'E-5'))} in the Denver area, home of Buckley Space Force Base, against ${usd(bah(C, 'E-5'))} in Colorado Springs. The rate follows the duty station, so a member assigned to Colorado Springs who lives in the Denver suburbs keeps the Colorado Springs rate.` },
    { q: 'What BAH does an O-5 get at Peterson Space Force Base?', a: `${usd(bah(C, 'O-5'))} a month with dependents and ${usd(bah(C, 'O-5', false))} without in 2026. Peterson is in the Colorado Springs housing area, like Schriever and Fort Carson. An O-6 receives ${usd(bah(C, 'O-6'))} with dependents. Officers living in privatized or government housing on base receive the home instead of the allowance, and the rate changes only with grade or dependency status.` },
  ],
  body: (h) => `
<h2>Colorado Springs BAH by grade</h2>
${h.table(['Grade', 'With dependents', 'Without dependents'], G.map((g) => [g, usd(bah(C, g)), usd(bah(C, g, false))]), `Monthly BAH, ${mhaLabel(C)} (${C}), DTMO ${P.bah.year} rates.`, ['l', 'r', 'r'])}
<h2>Front Range housing areas compared</h2>
${h.table(['Housing area', 'E-5 with dependents', 'E-7 with dependents', 'O-3 with dependents'], co.map(([c, n]) => [n, usd(bah(c, 'E-5')), usd(bah(c, 'E-7')), usd(bah(c, 'O-3'))]), 'Monthly BAH 2026, DTMO.', ['l', 'r', 'r', 'r'])}
<p>Along the Front Range, Boulder and Denver pay the most and Colorado Springs and Fort Collins less. Space Force members assigned to Buckley, recruiters in Denver and reservists on active duty orders at units in the north receive those other tables.</p>
<h2>Many services, one rate</h2>
<p>Colorado Springs is one of the few housing areas where Army, Space Force and Air Force members serve side by side in large numbers. Because BAH depends on grade and dependency status only, a staff sergeant of the Army at Fort Carson and a technical sergeant of the Space Force at Schriever, both E-6, receive the same ${usd(bah(C, 'E-6'))} with dependents. The ZIP codes run from ${Z.first} to ${Z.last}, covering Colorado Springs, Fountain, Monument and the communities east of the city.</p>
<h2>Small single gaps, large grade steps</h2>
<p>The with-dependents rate climbs steadily with grade, ${usd(bah(C, 'E-7') - bah(C, 'E-5'))} from E-5 to E-7 and ${usd(bah(C, 'O-5') - bah(C, 'O-3'))} from O-3 to O-5, while the single rates follow closely for officers. That makes the area relatively favorable to single officers and to dual-military couples without children, each of whom draws the single rate. Combine BAH with basic pay in the ${h.a('military-pay-calculator', 'military pay calculator')}, check another ZIP code in the ${h.a('bah-calculator', 'BAH calculator')}, or compare with ${h.a('bah-san-antonio', 'San Antonio')}, the other large joint community of the Air Force.</p>
<h2>Colorado Springs, 2025 to 2026</h2>
<p>The Colorado Springs table rose only slightly for 2026. The E-5 family rate went from ${usd(bah25(C, 'E-5'))} to ${usd(bah(C, 'E-5'))}, ${bahChange(C, 'E-5').pct}% more, and the O-3 rate from ${usd(bah25(C, 'O-3'))} to ${usd(bah(C, 'O-3'))}. Some grades changed by only a few dollars, a sign that local rents were stable over the survey year.</p>
${h.table(['Grade', '2025', '2026', 'Change'], ['E-4', 'E-5', 'E-6', 'E-7', 'E-9', 'O-1', 'O-3', 'O-5'].map((g) => { const x = bahChange(C, g); return [g, usd(x.from), usd(x.to), `${x.diff >= 0 ? '+' : '−'}${usd(Math.abs(x.diff))} (${x.pct >= 0 ? '+' : '−'}${Math.abs(x.pct)}%)`]; }), 'Monthly BAH with dependents, DTMO 2025 and 2026 rates.', ['l', 'r', 'r', 'r'])}
<p>In the DTMO's 2026 component breakdown, rent accounts for about ${bahShares(C)!.rent}% of the total housing cost behind the Colorado Springs rates and utilities for ${bahShares(C)!.utilities}%, with heating in a cold, high-altitude winter part of the utility bill. The published allowance is set ${BAH_COST_SHARE}% below that total.</p>
<p>Cadets at the Air Force Academy are not entitled to BAH; the rates on this page apply to the permanent party, instructors and staff assigned there. Members in on-base housing at Fort Carson or Peterson receive the housing in place of the allowance.</p>
<p>Guard and reserve members called to active duty for more than thirty days at one of these installations receive the Colorado Springs rate as well; for shorter orders a lower reserve rate usually applies.</p>
<p>Space Force guardians assigned to Peterson and Schriever often move between Colorado Springs and other space installations such as Vandenberg in California or Buckley near Denver; each move resets BAH to the table of the new duty station from the report date.</p>`,
  related: ['bah-calculator', 'bah-san-antonio', 'bah-tacoma', 'bah-rates', 'military-pay-calculator'],
  sources: ['dtmoBah', 'dfasBas'],
});
