import { definePage } from '../../lib/page-types';
import { P, bah, bahArg, bah25, bahChange, bahShares, usd, mhaLabel, zipsOf, rankOf, BAH_COST_SHARE } from '../../lib/kit';

const C = 'DC053';
const G = ['E-1', 'E-4', 'E-5', 'E-6', 'E-7', 'E-8', 'E-9', 'W-2', 'W-4', 'O-1', 'O-2', 'O-3', 'O-4', 'O-5', 'O-6', 'O-7'];
const Z = zipsOf(C);
const R = rankOf(C);
const ncr: Array<[string, string]> = [['DC053', 'Washington DC metro'], ['VA296', 'Quantico/Woodbridge'], ['MD133', 'Fort Meade'], ['MD128', 'Annapolis'], ['MD135', 'Patuxent River']];

export default definePage({
  id: 'bah-washington-dc',
  group: 'bah',
  kind: 'location',
  order: 390,
  slug: 'bah-washington-dc',
  nav: 'BAH Washington DC',
  card: 'The Washington DC metro area: 2026 BAH for the Pentagon, Bethesda and the joint bases, and the areas around it',
  title: `BAH Washington DC 2026: Pentagon Area Rates by Grade`,
  description: `BAH Washington DC 2026: ${usd(bah(C, 'E-5'))} for an E-5 with dependents, ${usd(bah(C, 'O-4'))} for an O-4, in the DC metro housing area of the Pentagon, Bethesda and the joint bases.`,
  h1: 'BAH in the Washington DC area for 2026',
  intro: 'The 2026 housing allowance of the Washington DC metro housing area, the largest in the DTMO file, and the neighboring areas of Quantico, Fort Meade and Annapolis.',
  resume: `An E-5 with dependents assigned in the Washington DC metro area receives ${usd(bah(C, 'E-5'))} a month of BAH in 2026, ${usd(bah(C, 'E-5', false))} without dependents; a married O-4, a common grade on the Pentagon staff, receives ${usd(bah(C, 'O-4'))}. The ${mhaLabel(C)} housing area (${C}) is by far the largest in the Defense Travel Management Office file, with ${Z.n} ZIP codes across the District and the inner counties of Maryland and Virginia. It covers the Pentagon, Joint Base Anacostia-Bolling, Joint Base Myer-Henderson Hall, Walter Reed National Military Medical Center in Bethesda and the many headquarters in between. The area ranks ${R.rank} of ${R.of} for the E-5 family rate, and its rates rose about ${bahChange(C, 'E-5').pct}% for an E-5 from 2025, one of the larger increases of 2026. Quantico, Fort Meade, Annapolis and Patuxent River are separate housing areas with their own tables, so the duty station's ZIP code matters even inside the region.`,
  mini: 'bahLocal',
  miniArg: bahArg(C, 'the Washington DC area'),
  faqs: [
    { q: 'What is Pentagon BAH for an O-4 with dependents in 2026?', a: `${usd(bah(C, 'O-4'))} a month, the rate of the Washington DC metro housing area, and ${usd(bah(C, 'O-4', false))} without dependents. An O-5 receives ${usd(bah(C, 'O-5'))} with dependents. The Pentagon's ZIP codes are in that area, like most of the District and the close-in suburbs of Arlington, Alexandria and Bethesda.` },
    { q: 'Is Fort Meade BAH the same as Washington DC BAH?', a: `No. Fort Meade is its own housing area in the DTMO file: in 2026 an E-5 with dependents receives ${usd(bah('MD133', 'E-5'))} there against ${usd(bah(C, 'E-5'))} in the DC metro area. The rate follows the ZIP code of the duty station, so a member at Fort Meade who lives in the District still receives the Fort Meade rate.` },
    { q: 'How much did DC BAH increase in 2026?', a: `For an E-5 with dependents, from ${usd(bah25(C, 'E-5'))} in 2025 to ${usd(bah(C, 'E-5'))} in 2026, about ${bahChange(C, 'E-5').pct}%; for an O-4, from ${usd(bah25(C, 'O-4'))} to ${usd(bah(C, 'O-4'))}. The increase applied on January 1, 2026, to every member assigned in the area, without any request, and appears on the first LES of the year.` },
    { q: 'Do I get DC BAH on a short assignment to the Pentagon?', a: 'Only if it is a permanent change of station. Members on temporary duty keep the BAH of their permanent duty station and receive per diem for lodging and meals in Washington. Students at schools in the area for less than twenty weeks also usually keep their old rate, while longer courses can be a permanent assignment.' },
  ],
  body: (h) => `
<h2>Washington DC metro BAH by grade</h2>
${h.table(['Grade', 'With dependents', 'Without dependents'], G.map((g) => [g, usd(bah(C, g)), usd(bah(C, g, false))]), `Monthly BAH, ${mhaLabel(C)} (${C}), DTMO ${P.bah.year} rates.`, ['l', 'r', 'r'])}
<h2>The national capital region, area by area</h2>
${h.table(['Housing area', 'E-5 with dependents', 'E-7 with dependents', 'O-4 with dependents'], ncr.map(([c, n]) => [n, usd(bah(c, 'E-5')), usd(bah(c, 'E-7')), usd(bah(c, 'O-4'))]), 'Monthly BAH 2026, DTMO.', ['l', 'r', 'r', 'r'])}
<p>Marines at Quantico, NSA and Cyber Command personnel at Fort Meade, midshipmen's instructors at the Naval Academy in Annapolis and test pilots at Patuxent River all serve within commuting distance of the capital but draw their own tables. Members moving between these commands, which is frequent in a staff career, should check the rate of the new duty station before renewing a lease.</p>
<h2>2025 to 2026 in the DC area</h2>
${h.table(['Grade', '2025', '2026', 'Change'], ['E-4', 'E-5', 'E-6', 'E-7', 'E-9', 'O-3', 'O-4', 'O-6'].map((g) => { const x = bahChange(C, g); return [g, usd(x.from), usd(x.to), `${x.diff >= 0 ? '+' : '−'}${usd(Math.abs(x.diff))} (${x.pct >= 0 ? '+' : '−'}${Math.abs(x.pct)}%)`]; }), 'Monthly BAH with dependents, DTMO 2025 and 2026 rates.', ['l', 'r', 'r', 'r'])}
<p>Rent represents about ${bahShares(C)!.rent}% of the housing cost the DTMO measured in the area for 2026 and utilities ${bahShares(C)!.utilities}%. The published rate is set ${BAH_COST_SHARE}% below that cost, the member share built into every BAH rate.</p>
<h2>Staff officers and the single rate</h2>
<p>The single rates in the DC area are high in absolute terms, ${usd(bah(C, 'O-3', false))} for an O-3 and ${usd(bah(C, 'O-4', false))} for an O-4, but the gap with the family rate is wide for senior enlisted members: ${usd(bah(C, 'E-7') - bah(C, 'E-7', false))} a month at E-7. A member whose family stays at the previous station by choice still receives the with-dependents rate of the DC duty station; the family's location is used only in specific cases, such as orders that do not allow the family to move, and the finance office decides from the orders. The ${h.a('military-pay-calculator', 'military pay calculator')} gives the monthly total, and the ${h.a('bah-calculator', 'BAH calculator')} checks any ZIP code of the region.</p>
<h2>Why one area covers so many ZIP codes</h2>
<p>The DTMO defines housing areas around the places where members of an installation can reasonably live. In the capital region, dozens of commands sit a few miles apart, and their members draw from the same rental market, from apartments in Arlington to houses in Prince George's and Fairfax counties. Grouping them in one area keeps the rate identical for a sailor at the Washington Navy Yard, an airman at Joint Base Andrews and a soldier at the Pentagon. The ZIP codes that fall outside it, around Quantico, Fort Meade or Annapolis, belong to commands whose members live in different markets.</p>
<h2>Senior grades in the capital</h2>
<p>The DC area has an unusual concentration of senior officers and enlisted leaders. With dependents, an O-6 receives ${usd(bah(C, 'O-6'))} a month in 2026 and an O-7 ${usd(bah(C, 'O-7'))}; an E-9 ${usd(bah(C, 'E-9'))}. Many general and flag officers live in government quarters at Fort McNair, Joint Base Myer-Henderson Hall or the Washington Navy Yard and do not draw BAH while they do.</p>`,
  related: ['bah-calculator', 'bah-norfolk', 'bah-rates', 'military-pay-calculator', 'pay-field-grade'],
  sources: ['dtmoBah', 'dtmoBah2025', 'dtmoComponents'],
});
