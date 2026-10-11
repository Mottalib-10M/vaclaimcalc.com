import { definePage } from '../../lib/page-types';
import { P, bah, bahArg, usd, mhaLabel, zipsOf, rankOf, bah25, bahChange, bahShares, BAH_COST_SHARE } from '../../lib/kit';

const C = 'TX285';
const G = ['E-1', 'E-4', 'E-5', 'E-6', 'E-7', 'E-8', 'E-9', 'W-2', 'O-1', 'O-2', 'O-3', 'O-4', 'O-5', 'O-6'];
const Z = zipsOf(C);
const R = rankOf(C);

export default definePage({
  id: 'bah-san-antonio',
  group: 'bah',
  kind: 'location',
  order: 360,
  slug: 'bah-san-antonio',
  nav: 'BAH San Antonio',
  card: 'Joint Base San Antonio (Fort Sam Houston, Lackland, Randolph): 2026 BAH and the gap with Austin',
  title: `BAH San Antonio 2026: JBSA Rates for Every Grade and Status`,
  description: `BAH San Antonio 2026: ${usd(bah(C, 'E-5'))} for an E-5 with dependents, ${usd(bah(C, 'O-3'))} for an O-3 at Joint Base San Antonio, including Fort Sam Houston, Lackland and Randolph.`,
  h1: 'BAH in San Antonio for 2026',
  intro: 'The 2026 housing allowance of the San Antonio housing area, where Joint Base San Antonio trains airmen and medics from every service, and how far it is from Austin.',
  resume: `An E-5 with dependents at Joint Base San Antonio receives ${usd(bah(C, 'E-5'))} a month of BAH in 2026 and ${usd(bah(C, 'E-5', false))} without dependents; a married O-3 receives ${usd(bah(C, 'O-3'))}. The ${mhaLabel(C)} housing area (${C}) of the Defense Travel Management Office covers ${Z.n} ZIP codes in Bexar County and the surrounding counties, which take in the three main parts of the joint base: Fort Sam Houston, home of military medical training, Lackland, where every enlisted airman starts basic training, and Randolph, a pilot instructor training base. The area ranks ${R.rank} of ${R.of} for the E-5 family rate, in the lower half of the country despite the size of the city. Its officer rates are compressed: an O-3 with dependents receives ${usd(bah(C, 'O-3'))}, almost the same as an E-7, ${usd(bah(C, 'E-7'))}. Austin, an hour north, pays an E-5 family ${usd(bah('TX272', 'E-5'))}.`,
  mini: 'bahLocal',
  miniArg: bahArg(C, 'San Antonio'),
  faqs: [
    { q: 'What is BAH at Lackland for an E-5 in 2026?', a: `${usd(bah(C, 'E-5'))} a month with dependents and ${usd(bah(C, 'E-5', false))} without. Lackland is part of Joint Base San Antonio, in the San Antonio housing area of the DTMO file, like Fort Sam Houston and Randolph. Trainees in basic training live in government quarters and do not receive the single rate; their families may receive the with-dependents rate of their home area.` },
    { q: 'Why is an O-3 BAH close to an E-7 BAH in San Antonio?', a: `Because the DoD prices a housing standard for each grade and, in San Antonio, the homes priced for an E-7 and for an O-3 with dependents rent for similar sums. In 2026 the rates are ${usd(bah(C, 'E-7'))} and ${usd(bah(C, 'O-3'))}. In other areas the gap is larger; the standards are national but the rents are local.` },
    { q: 'Do medical students and residents at Fort Sam Houston get BAH?', a: `Officers in graduate medical education and military medical training receive BAH like other members, at the rate of their grade and dependency status in the San Antonio area: ${usd(bah(C, 'O-3'))} for an O-3 with dependents in 2026. Students on temporary duty for a course of less than twenty weeks often keep the rate of their permanent station instead.` },
  ],
  body: (h) => `
<h2>San Antonio BAH by grade</h2>
${h.table(['Grade', 'With dependents', 'Without dependents'], G.map((g) => [g, usd(bah(C, g)), usd(bah(C, g, false))]), `Monthly BAH, ${mhaLabel(C)} (${C}), DTMO ${P.bah.year} rates.`, ['l', 'r', 'r'])}
<h2>A training city with compressed rates</h2>
<p>San Antonio's table is flatter than most. From E-6 to O-3, the with-dependents rates stay within a narrow band, from ${usd(bah(C, 'E-6'))} to ${usd(bah(C, 'O-3'))}, before rising for field grade officers: ${usd(bah(C, 'O-4'))} for an O-4 and ${usd(bah(C, 'O-5'))} for an O-5. The single rates follow the same pattern. For members assigned to the joint base after a tour in a high-cost area, the drop in BAH can be steep, but rents in the area are among the lowest of the large metropolitan areas in the country.</p>
<h2>San Antonio and Austin</h2>
${h.table(['Grade', 'San Antonio', 'Austin', 'Difference'], ['E-4', 'E-5', 'E-7', 'O-3', 'O-5'].map((g) => [g, usd(bah(C, g)), usd(bah('TX272', g)), usd(bah('TX272', g) - bah(C, g))]), 'Monthly BAH with dependents, 2026, DTMO.', ['l', 'r', 'r', 'r'])}
<p>Austin is a separate housing area with much higher rates. Recruiters, ROTC cadre at the University of Texas and members of the Army's headquarters units in Austin receive that table. A member assigned to San Antonio who commutes from the Austin side receives the San Antonio rate, since the duty station decides.</p>
<h2>Where the area reaches</h2>
<p>The ZIP codes run from ${Z.first} to ${Z.last}, including suburbs such as Schertz, Universal City and Converse near Randolph, and communities west of Lackland. Use the ${h.a('bah-calculator', 'BAH calculator')} to check a ZIP code, the ${h.a('military-pay-calculator', 'military pay calculator')} for the full monthly figure, and the ${h.a('bah-fort-hood', 'Fort Hood page')} for the other large Texas installation.</p>
<h2>Why San Antonio BAH went down in 2026</h2>
<p>San Antonio is one of the areas where the 2026 table fell. The E-5 family rate dropped from ${usd(bah25(C, 'E-5'))} in 2025 to ${usd(bah(C, 'E-5'))}, a change of ${bahChange(C, 'E-5').pct}%, and the O-3 rate from ${usd(bah25(C, 'O-3'))} to ${usd(bah(C, 'O-3'))}. The DTMO's yearly survey found lower median rents for the housing standards it prices in the area.</p>
${h.table(['Grade', '2025', '2026', 'Change'], ['E-4', 'E-5', 'E-6', 'E-7', 'E-9', 'O-1', 'O-3', 'O-5'].map((g) => { const x = bahChange(C, g); return [g, usd(x.from), usd(x.to), `${x.diff >= 0 ? '+' : '−'}${usd(Math.abs(x.diff))} (${x.pct >= 0 ? '+' : '−'}${Math.abs(x.pct)}%)`]; }), 'Monthly BAH with dependents, DTMO 2025 and 2026 rates.', ['l', 'r', 'r', 'r'])}
<h2>Rate protection after a decrease</h2>
<p>A decrease does not cut the allowance of members already in the area. Under individual rate protection, a member entitled to BAH in San Antonio on December 31, 2025 keeps the 2025 rate in 2026, as long as the member stays at the same duty station, keeps the same dependency status and is not reduced in grade. Members who arrive in 2026, or whose status changes, receive the new rate. Rent makes up about ${bahShares(C)!.rent}% of the housing cost behind the rate and utilities ${bahShares(C)!.utilities}%, before the ${BAH_COST_SHARE}% member cost share.</p>
<p>For trainees, the situation is different again: members in basic or initial training who have dependents usually receive the with-dependents rate of the place where the family lives, not the San Antonio rate, until they reach their first permanent duty station.</p>
<p>Instructors at the Defense Language Institute English Language Center and the medical education commands at Fort Sam Houston serve long tours, so rate protection after the 2026 decrease matters to many families here.</p>`,
  related: ['bah-calculator', 'bah-fort-hood', 'bah-colorado-springs', 'bah-rates', 'military-pay-calculator'],
  sources: ['dtmoBah', 'dfasBas'],
});
