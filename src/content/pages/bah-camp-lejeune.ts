import { definePage } from '../../lib/page-types';
import { P, bah, bahArg, bah25, bahChange, bahShares, usd, mhaLabel, zipsOf, rankOf, BAH_COST_SHARE } from '../../lib/kit';

const C = 'NC178';
const G = ['E-1', 'E-3', 'E-4', 'E-5', 'E-6', 'E-7', 'E-8', 'E-9', 'W-1', 'W-2', 'O-1', 'O-2', 'O-3', 'O-4', 'O-5', 'O-6'];
const Z = zipsOf(C);
const R = rankOf(C);

export default definePage({
  id: 'bah-camp-lejeune',
  group: 'bah',
  kind: 'location',
  order: 380,
  slug: 'bah-camp-lejeune',
  nav: 'BAH Camp Lejeune',
  card: 'Camp Lejeune and MCAS New River: 2026 BAH by grade, one of the smallest housing areas',
  title: `BAH Camp Lejeune 2026: Jacksonville NC Rates by Grade`,
  description: `BAH Camp Lejeune 2026: ${usd(bah(C, 'E-5'))} for an E-5 with dependents, ${usd(bah(C, 'E-3'))} for an E-3, ${usd(bah(C, 'O-3'))} for an O-3 at Camp Lejeune and MCAS New River in Jacksonville, NC.`,
  h1: 'BAH at Camp Lejeune for 2026',
  intro: 'The 2026 housing allowance of the Camp Lejeune housing area around Jacksonville, North Carolina, where Marines of every grade draw from one of the lowest tables on the East Coast.',
  resume: `A Marine E-5 with dependents at Camp Lejeune receives ${usd(bah(C, 'E-5'))} a month of BAH in 2026 and ${usd(bah(C, 'E-5', false))} without dependents; a married E-3 receives ${usd(bah(C, 'E-3'))} and a married O-3 ${usd(bah(C, 'O-3'))}. The Defense Travel Management Office groups only ${Z.n} ZIP codes in the ${mhaLabel(C)} housing area (${C}), centered on Jacksonville and covering the base and Marine Corps Air Station New River. It is one of the lowest tables of any large installation: ${R.rank} of ${R.of} housing areas for the E-5 family rate. The most striking feature is at the bottom of the scale, where an E-5 family receives only ${usd(bah(C, 'E-5') - bah(C, 'E-4'))} more than an E-1 to E-4 family, ${usd(bah(C, 'E-4'))}. The jump comes at E-6: ${usd(bah(C, 'E-6'))}, because the housing standard the DoD prices for that grade is a larger home. The table rose about ${bahChange(C, 'E-5').pct}% for an E-5 from 2025.`,
  mini: 'bahLocal',
  miniArg: bahArg(C, 'Camp Lejeune'),
  faqs: [
    { q: 'What is Camp Lejeune BAH for a lance corporal with a family?', a: `A lance corporal is an E-3. With dependents, an E-3 at Camp Lejeune receives ${usd(bah(C, 'E-3'))} a month of BAH in 2026, the same as E-1, E-2 and E-4. Single Marines in those grades usually live in the barracks; those authorized to live off base receive ${usd(bah(C, 'E-3', false))}.` },
    { q: 'Does MCAS New River use the Camp Lejeune BAH rate?', a: `Yes. Marine Corps Air Station New River is in the Camp Lejeune housing area, so its Marines and sailors receive the same table: ${usd(bah(C, 'E-5'))} for an E-5 and ${usd(bah(C, 'O-3'))} for an O-3 with dependents in 2026. Marine Corps Air Station Cherry Point, farther up the coast, has its own housing area and rates.` },
    { q: 'Why do E-5 and E-4 families get almost the same BAH at Camp Lejeune?', a: `Because in the Jacksonville rental market the homes the DoD prices for those two grades cost nearly the same. In 2026 the rates are ${usd(bah(C, 'E-4'))} and ${usd(bah(C, 'E-5'))}. The standards differ more from E-6 upward, which is why a sergeant who becomes a staff sergeant gains ${usd(bah(C, 'E-6') - bah(C, 'E-5'))} a month.` },
  ],
  body: (h) => `
<h2>Camp Lejeune BAH by grade</h2>
${h.table(['Grade', 'With dependents', 'Without dependents'], G.map((g) => [g, usd(bah(C, g)), usd(bah(C, g, false))]), `Monthly BAH, ${mhaLabel(C)} (${C}), DTMO ${P.bah.year} rates.`, ['l', 'r', 'r'])}
<h2>A small area in a military town</h2>
<p>With ${Z.n} ZIP codes, from ${Z.first} to ${Z.last}, the Camp Lejeune housing area is compact: Jacksonville, Sneads Ferry, Hubert, Richlands and the communities around the New River. The DTMO surveys rents for each housing profile in those ZIP codes every year, and the rate follows what it finds there rather than state or national averages. Coastal towns farther away, such as Wilmington, form other areas with higher rates; a Marine assigned to Camp Lejeune keeps the Lejeune rate wherever the family chooses to live.</p>
<h2>From 2025 to 2026</h2>
${h.table(['Grade', '2025', '2026', 'Change'], ['E-3', 'E-5', 'E-6', 'E-7', 'E-9', 'O-1', 'O-3', 'O-5'].map((g) => { const x = bahChange(C, g); return [g, usd(x.from), usd(x.to), `${x.diff >= 0 ? '+' : '−'}${usd(Math.abs(x.diff))} (${x.pct >= 0 ? '+' : '−'}${Math.abs(x.pct)}%)`]; }), 'Monthly BAH with dependents, DTMO 2025 and 2026 rates.', ['l', 'r', 'r', 'r'])}
<p>The E-5 family rate moved from ${usd(bah25(C, 'E-5'))} to ${usd(bah(C, 'E-5'))}. Behind it, rent accounts for about ${bahShares(C)!.rent}% of the housing cost measured by the DTMO in the area and utilities for ${bahShares(C)!.utilities}%, and the published rate carries the ${BAH_COST_SHARE}% cost share that every member pays out of pocket by design.</p>
<h2>Marines, sailors and the junior grades</h2>
<p>Camp Lejeune has a young population, and the junior enlisted rate matters to more families here than at most installations. An E-3 family receives ${usd(bah(C, 'E-3'))}, a figure that, with basic pay and BAS, makes up most of a young Marine's income; the ${h.a('military-pay-calculator', 'military pay calculator')} adds the three. Navy corpsmen and chaplains assigned to Marine units receive the same rates as Marines of the same grade. A Marine who is promoted to staff sergeant, or who marries, should check that the finance office updates the rate from the effective date: the change is not retroactive without the paperwork. For North Carolina's Army post, see ${h.a('bah-fort-bragg', 'Fort Bragg')}, and for the West Coast Marine base, ${h.a('bah-camp-pendleton', 'Camp Pendleton')}.</p>
<h2>Officers at Camp Lejeune</h2>
<p>Officer rates rise from ${usd(bah(C, 'O-1'))} for an O-1 to ${usd(bah(C, 'O-6'))} for an O-6 with dependents. Without dependents, an O-3 receives ${usd(bah(C, 'O-3', false))}. Warrant officers, including Marine gunners, draw ${usd(bah(C, 'W-1'))} as a WO1 and ${usd(bah(C, 'W-2'))} as a CWO2 with a family.</p>
<h2>Camp Lejeune and Cherry Point</h2>
<p>Marines often move between the two North Carolina air and ground bases. Cherry Point's housing area pays an E-5 family ${usd(bah('NC177', 'E-5'))} in 2026 and an O-3 family ${usd(bah('NC177', 'O-3'))}, against ${usd(bah(C, 'E-5'))} and ${usd(bah(C, 'O-3'))} at Camp Lejeune. Cherry Point pays more for both grades, ${usd(bah('NC177', 'E-5') - bah(C, 'E-5'))} a month more for the E-5 family. A transfer between them changes BAH from the report date at the new command, so a family that keeps the same rental home after a move from Cherry Point to Camp Lejeune sees the allowance fall while the rent stays the same.</p>
<p>Marines reporting to the School of Infantry East or to a unit at Camp Lejeune for a course of less than twenty weeks are usually on temporary duty and keep the BAH of their permanent station instead of this table.</p>`,
  related: ['bah-calculator', 'bah-fort-bragg', 'bah-camp-pendleton', 'bah-norfolk', 'military-pay-calculator'],
  sources: ['dtmoBah', 'dtmoBah2025', 'dtmoComponents'],
});
