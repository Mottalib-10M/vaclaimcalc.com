import { definePage } from '../../lib/page-types';
import { P, bah, bahArg, usd, mhaLabel, zipsOf, rankOf, bah25, bahChange, bahShares, BAH_COST_SHARE } from '../../lib/kit';

const C = 'VA298';
const NB = 'VA297';
const G = ['E-1', 'E-4', 'E-5', 'E-6', 'E-7', 'E-8', 'E-9', 'W-2', 'O-1', 'O-2', 'O-3', 'O-4', 'O-5', 'O-6'];
const Z = zipsOf(C);
const R = rankOf(C);

export default definePage({
  id: 'bah-norfolk',
  group: 'bah',
  kind: 'location',
  order: 310,
  slug: 'bah-norfolk',
  nav: 'BAH Norfolk',
  card: 'Norfolk, Portsmouth, Virginia Beach and Chesapeake: 2026 BAH by grade, and the Peninsula next door',
  title: `BAH Norfolk 2026: ${usd(bah(C, 'E-5'))} for an E-5 With Dependents`,
  description: `BAH Norfolk 2026: ${usd(bah(C, 'E-5'))} for an E-5 with dependents, ${usd(bah(C, 'O-3'))} for an O-3, across Naval Station Norfolk, Oceana, Little Creek and Portsmouth. All grades.`,
  h1: 'BAH in Norfolk and Hampton Roads for 2026',
  intro: 'The 2026 housing allowance of the Norfolk/Portsmouth housing area, the largest Navy concentration in the country, and how it compares with the Peninsula across the water.',
  resume: `An E-5 with dependents assigned to Naval Station Norfolk receives ${usd(bah(C, 'E-5'))} a month of BAH in 2026, and ${usd(bah(C, 'E-5', false))} without dependents; a married O-3 receives ${usd(bah(C, 'O-3'))}. These are the rates of the housing area that the Defense Travel Management Office calls ${mhaLabel(C)} (${C}), which takes in ${Z.n} ZIP codes on the south side of Hampton Roads: Norfolk, Portsmouth, Virginia Beach and Chesapeake, with Naval Air Station Oceana, Joint Expeditionary Base Little Creek-Fort Story and Norfolk Naval Shipyard. Across the water, the Peninsula forms a separate area, ${mhaLabel(NB)}, where the same E-5 receives ${usd(bah(NB, 'E-5'))}, ${usd(bah(C, 'E-5') - bah(NB, 'E-5'))} less. Junior enlisted members from E-1 to E-4 all receive ${usd(bah(C, 'E-1'))} with a family. Norfolk ranks ${R.rank} of ${R.of} housing areas for the E-5 rate with dependents, close to the middle of the national range.`,
  mini: 'bahLocal',
  miniArg: bahArg(C, 'Norfolk'),
  faqs: [
    { q: 'What is BAH for an E-6 with dependents in Norfolk in 2026?', a: `${usd(bah(C, 'E-6'))} a month, against ${usd(bah(C, 'E-5'))} for an E-5 and ${usd(bah(C, 'E-7'))} for an E-7. Without dependents, an E-6 receives ${usd(bah(C, 'E-6', false))}. The rate applies to members whose permanent duty station is in the Norfolk/Portsmouth area, including ships homeported at Naval Station Norfolk when the member is entitled to BAH.` },
    { q: 'Is Virginia Beach BAH the same as Norfolk BAH?', a: `Yes. Virginia Beach, Norfolk, Portsmouth and Chesapeake share one housing area in the DTMO file, so a sailor at Oceana and one at Naval Station Norfolk receive the same table: ${usd(bah(C, 'E-5'))} for an E-5 with dependents in 2026. Newport News and Hampton, on the Peninsula, belong to another area with lower rates.` },
    { q: 'Do sailors on ships in Norfolk get BAH?', a: 'Sailors with dependents receive BAH at the with-dependents rate of the homeport area. Single sailors in the junior grades assigned to a ship are generally expected to live aboard and do not receive BAH, while more senior single sailors usually can. The command and the personnel support detachment apply the Navy rules on who may live ashore.' },
    { q: 'Does BAH stop when my ship deploys from Norfolk?', a: `No. BAH is tied to the permanent duty station, which for a ship is its homeport, and it continues during deployments and underway periods. A sailor with dependents keeps the Norfolk with-dependents rate for the whole deployment. Family separation allowance may be added after thirty days away, but it is a separate payment, not part of BAH.` },
  ],
  body: (h) => `
<h2>Norfolk BAH by grade</h2>
${h.table(['Grade', 'With dependents', 'Without dependents'], G.map((g) => [g, usd(bah(C, g)), usd(bah(C, g, false))]), `Monthly BAH, ${mhaLabel(C)} (${C}), DTMO ${P.bah.year} rates.`, ['l', 'r', 'r'])}
<h2>Southside and Peninsula: two housing areas</h2>
<p>Hampton Roads is split into housing areas along the water. The Southside area, ${C}, covers ZIP codes from ${Z.first} to ${Z.last}. The Peninsula, home to Joint Base Langley-Eustis and the cities of Hampton and Newport News, is ${NB}, with lower rates for most grades: an O-3 with dependents receives ${usd(bah(NB, 'O-3'))} there against ${usd(bah(C, 'O-3'))} on the Southside. The rate follows the duty station, so a sailor assigned to Norfolk who chooses to live in Hampton still receives the Norfolk rate, and the reverse.</p>
<h2>What changes with a promotion</h2>
<p>In Norfolk the step between E-5 and E-6 is ${usd(bah(C, 'E-6') - bah(C, 'E-5'))} a month with dependents, and the step between E-6 and E-7 ${usd(bah(C, 'E-7') - bah(C, 'E-6'))}. For officers, going from O-3 to O-4 adds ${usd(bah(C, 'O-4') - bah(C, 'O-3'))}. These steps reflect the housing standard the DoD prices for each grade, from a two-bedroom townhouse for junior enlisted families to a detached home for senior grades. The ${h.a('military-pay-calculator', 'military pay calculator')} adds BAH to basic pay and BAS.</p>
<h2>Housing decisions in a Navy town</h2>
<p>Norfolk's rates matter for long sea tours. A family that signs a lease when the sailor reports keeps the same BAH while the ship deploys, because the rate follows the homeport, and BAH continues during deployment. When a ship changes homeport, the BAH changes with it on the effective date of the move. Rate protection keeps an existing rate if the published one goes down while the member stays in the area. The ${h.a('bah-calculator', 'BAH calculator')} checks any ZIP code, and the ${h.a('bah-san-diego', 'San Diego page')} shows the West Coast fleet area for comparison: ${usd(bah('CA038', 'E-5'))} for the same E-5.</p>
<h2>Norfolk against the other East Coast fleet areas</h2>
${h.table(['Housing area', 'E-5 with dependents', 'E-7 with dependents', 'O-3 with dependents'], [['VA298', 'Norfolk/Portsmouth'], ['VA297', 'Hampton/Newport News'], ['FL058', 'Jacksonville (Mayport)'], ['GA074', 'Kings Bay/Brunswick'], ['NC178', 'Camp Lejeune']].map(([c, n]) => [n, usd(bah(c, 'E-5')), usd(bah(c, 'E-7')), usd(bah(c, 'O-3'))]), 'Monthly BAH 2026, DTMO.', ['l', 'r', 'r', 'r'])}
<p>A sailor rotating between East Coast homeports sees the housing allowance move by a few hundred dollars a month, while basic pay stays the same. Jacksonville, which includes Naval Station Mayport and Naval Air Station Jacksonville, and Kings Bay, home of the Atlantic ballistic missile submarines, are the two other large Navy areas in the region. When orders arrive, comparing the two rates before choosing a lease length avoids paying for a home the next allowance cannot cover.</p>
<h2>Officers and warrant officers in Hampton Roads</h2>
<p>Hampton Roads has a large population of officers at sea and ashore, from ensigns in their first ship to captains at fleet headquarters. The with-dependents rate runs from ${usd(bah(C, 'O-1'))} for an O-1 to ${usd(bah(C, 'O-6'))} for an O-6, and warrant officers sit between them, ${usd(bah(C, 'W-2'))} for a CW2. An officer without dependents receives noticeably less, for an O-3 ${usd(bah(C, 'O-3', false))}, because the single rate is priced on an apartment rather than a family home.</p>
<h2>How much Norfolk BAH rose for 2026</h2>
<p>Hampton Roads saw one of the firmer increases among the large Navy areas: the E-5 family rate climbed from ${usd(bah25(C, 'E-5'))} in 2025 to ${usd(bah(C, 'E-5'))}, up ${bahChange(C, 'E-5').pct}%, and the O-3 rate from ${usd(bah25(C, 'O-3'))} to ${usd(bah(C, 'O-3'))}. The increase came automatically on January 1 for every member assigned to the area; nothing has to be requested.</p>
${h.table(['Grade', '2025', '2026', 'Change'], ['E-4', 'E-5', 'E-6', 'E-7', 'E-9', 'O-1', 'O-3', 'O-5'].map((g) => { const x = bahChange(C, g); return [g, usd(x.from), usd(x.to), `${x.diff >= 0 ? '+' : '−'}${usd(Math.abs(x.diff))} (${x.pct >= 0 ? '+' : '−'}${Math.abs(x.pct)}%)`]; }), 'Monthly BAH with dependents, DTMO 2025 and 2026 rates.', ['l', 'r', 'r', 'r'])}
<p>According to the DTMO's 2026 component breakdown, rent accounts for about ${bahShares(C)!.rent}% of the housing cost behind the Norfolk rate and utilities for ${bahShares(C)!.utilities}%, a higher utility share than in Southern California because of heating in winter and air conditioning in the humid summer. Every rate also carries the ${BAH_COST_SHARE}% member cost share built into BAH since 2019.</p>`,
  related: ['bah-calculator', 'bah-san-diego', 'bah-rates', 'military-pay-calculator', 'bah-camp-lejeune'],
  sources: ['dtmoBah', 'dfasBas'],
});
