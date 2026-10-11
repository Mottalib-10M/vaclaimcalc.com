import { definePage } from '../../lib/page-types';
import { P, bah, bahArg, usd, mhaLabel, zipsOf, rankOf, bah25, bahChange, bahShares, BAH_COST_SHARE } from '../../lib/kit';

const C = 'WA311';
const G = ['E-1', 'E-4', 'E-5', 'E-6', 'E-7', 'E-8', 'E-9', 'W-2', 'W-3', 'O-1', 'O-2', 'O-3', 'O-4', 'O-5', 'O-6'];
const Z = zipsOf(C);
const R = rankOf(C);
const wa: Array<[string, string]> = [['WA311', 'Tacoma (JBLM)'], ['WA309', 'Seattle'], ['WA306', 'Bremerton'], ['WA307', 'Everett'], ['WA312', 'Whidbey Island'], ['WA310', 'Spokane']];

export default definePage({
  id: 'bah-tacoma',
  group: 'bah',
  kind: 'location',
  order: 340,
  slug: 'bah-jblm-tacoma',
  nav: 'BAH JBLM (Tacoma)',
  card: 'Joint Base Lewis-McChord and Tacoma: 2026 BAH by grade and the Puget Sound areas compared',
  title: `BAH JBLM 2026: Tacoma Rates by Grade, ${usd(bah(C, 'E-5'))} for an E-5`,
  description: `BAH JBLM 2026: ${usd(bah(C, 'E-5'))} for an E-5 with dependents, ${usd(bah(C, 'O-3'))} for an O-3, in the Tacoma housing area of Joint Base Lewis-McChord, with Seattle and Bremerton.`,
  h1: 'BAH at Joint Base Lewis-McChord (Tacoma) for 2026',
  intro: 'The 2026 housing allowance of the Tacoma housing area that covers Joint Base Lewis-McChord, and why moving a few miles north into the Seattle area changes it.',
  resume: `An E-5 with dependents assigned to Joint Base Lewis-McChord receives ${usd(bah(C, 'E-5'))} a month of BAH in 2026, ${usd(bah(C, 'E-5', false))} without dependents; a married O-3 receives ${usd(bah(C, 'O-3'))}. JBLM falls in the housing area the Defense Travel Management Office calls ${mhaLabel(C)} (${C}), ${Z.n} ZIP codes in Pierce County and the South Sound, including Lakewood, DuPont, Spanaway, Puyallup and Tacoma itself. It ranks ${R.rank} of ${R.of} housing areas for the E-5 family rate, in the upper half of the country, but well below Seattle, where the same E-5 would receive ${usd(bah('WA309', 'E-5'))}. The family-to-single gap is wide for the middle grades: an E-6 receives ${usd(bah(C, 'E-6'))} with dependents and ${usd(bah(C, 'E-6', false))} without. Puget Sound has several housing areas side by side, so the duty station's ZIP code, not the town you live in, decides the rate.`,
  mini: 'bahLocal',
  miniArg: bahArg(C, 'Tacoma (JBLM)'),
  faqs: [
    { q: 'What is BAH at JBLM for an E-6 with dependents?', a: `${usd(bah(C, 'E-6'))} a month in 2026, under the DTMO rates of the Tacoma housing area. Without dependents an E-6 receives ${usd(bah(C, 'E-6', false))}. An E-5 with dependents receives ${usd(bah(C, 'E-5'))} and an E-7 ${usd(bah(C, 'E-7'))}, so a promotion to E-6 adds ${usd(bah(C, 'E-6') - bah(C, 'E-5'))} a month of housing allowance.` },
    { q: 'Is JBLM BAH the same for Lewis and McChord?', a: `Yes. Both parts of the joint base are in the Tacoma housing area, so soldiers on Lewis and airmen on McChord Field receive the same rates: ${usd(bah(C, 'E-5'))} for an E-5 with dependents and ${usd(bah(C, 'O-3'))} for an O-3 in 2026. The rate depends on the duty station's ZIP code.` },
    { q: 'Do I get Seattle BAH if I live in Seattle and work at JBLM?', a: `No. BAH is set by the ZIP code of the permanent duty station, so a member assigned to JBLM receives the Tacoma rate wherever the family lives. In 2026 the Seattle rate for an E-5 with dependents is ${usd(bah('WA309', 'E-5'))}, ${usd(bah('WA309', 'E-5') - bah(C, 'E-5'))} more than Tacoma, but it applies only to members stationed in the Seattle area.` },
  ],
  body: (h) => `
<h2>JBLM and Tacoma BAH by grade</h2>
${h.table(['Grade', 'With dependents', 'Without dependents'], G.map((g) => [g, usd(bah(C, g)), usd(bah(C, g, false))]), `Monthly BAH, ${mhaLabel(C)} (${C}), DTMO ${P.bah.year} rates.`, ['l', 'r', 'r'])}
<h2>Six housing areas around Puget Sound</h2>
${h.table(['Housing area', 'E-5 with dependents', 'E-7 with dependents', 'O-3 with dependents'], wa.map(([c, n]) => [n, usd(bah(c, 'E-5')), usd(bah(c, 'E-7')), usd(bah(c, 'O-3'))]), 'Monthly BAH 2026, DTMO.', ['l', 'r', 'r', 'r'])}
<p>Washington State has housing areas close together with very different rates. Sailors at Naval Base Kitsap use the Bremerton table, those at Naval Station Everett the Everett table, and aviators at Whidbey Island their own; Fairchild Air Force Base falls under Spokane. A member who moves from Bremerton to JBLM, a short distance on the map, can see the allowance change by a large amount in either direction depending on grade.</p>
<h2>Where the single rate falls behind</h2>
<p>In the Tacoma area the single rates trail the family rates by a wide margin for staff sergeants and sergeants first class, because family homes in the South Sound cost much more than apartments. The difference reaches ${usd(bah(C, 'E-6') - bah(C, 'E-6', false))} a month at E-6 and ${usd(bah(C, 'E-7') - bah(C, 'E-7', false))} at E-7. For officers it is narrower at O-3, ${usd(bah(C, 'O-3') - bah(C, 'O-3', false))}, and wider again at O-5, ${usd(bah(C, 'O-5') - bah(C, 'O-5', false))}. A soldier who marries while stationed at JBLM sees the family rate from the date of the marriage, once the finance office has the certificate.</p>
<h2>Planning a move to JBLM</h2>
<p>Coming from a low-cost post, the higher allowance is offset by higher rents and, in Washington, by the absence of a state income tax on pay, which helps families whose state of legal residence is Washington. The ${h.a('military-pay-calculator', 'military pay calculator')} adds BAH to basic pay and BAS, and the ${h.a('bah-calculator', 'BAH calculator')} checks other ZIP codes around the Sound. For another West Coast installation, see ${h.a('bah-camp-pendleton', 'Camp Pendleton')}.</p>
<h2>Tacoma BAH in 2025 and 2026</h2>
<p>The South Sound table rose moderately for 2026. The E-5 family rate went from ${usd(bah25(C, 'E-5'))} to ${usd(bah(C, 'E-5'))}, ${bahChange(C, 'E-5').pct}% more, and the O-3 rate from ${usd(bah25(C, 'O-3'))} to ${usd(bah(C, 'O-3'))}. For members who arrived before 2026, rate protection would have kept any higher 2025 rate, but here most grades went up and the new rate simply replaced the old one.</p>
${h.table(['Grade', '2025', '2026', 'Change'], ['E-4', 'E-5', 'E-6', 'E-7', 'E-9', 'O-1', 'O-3', 'O-5'].map((g) => { const x = bahChange(C, g); return [g, usd(x.from), usd(x.to), `${x.diff >= 0 ? '+' : '−'}${usd(Math.abs(x.diff))} (${x.pct >= 0 ? '+' : '−'}${Math.abs(x.pct)}%)`]; }), 'Monthly BAH with dependents, DTMO 2025 and 2026 rates.', ['l', 'r', 'r', 'r'])}
<p>Rent makes up about ${bahShares(C)!.rent}% of the housing cost the DTMO measured for the Tacoma area in 2026 and utilities ${bahShares(C)!.utilities}%. Mild summers keep cooling costs low, and the allowance carries the standard ${BAH_COST_SHARE}% member cost share.</p>
<p>A last practical point: JBLM is large, and the commute from the southern edge of the housing area can be long, but every ZIP code in the area pays the same rate. Families choose between price, schools and distance knowing the allowance will not change with the address.</p>
<p>Airmen of the airlift wings at McChord Field and soldiers of I Corps at Lewis draw the same table, as do sailors and coast guardsmen stationed at commands in Tacoma itself, since all of them have duty stations within the Tacoma housing area.</p>`,
  related: ['bah-calculator', 'bah-camp-pendleton', 'bah-colorado-springs', 'bah-rates', 'military-pay-calculator'],
  sources: ['dtmoBah', 'dfasBas'],
});
