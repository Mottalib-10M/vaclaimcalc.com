import { definePage } from '../../lib/page-types';
import { P, bah, bahArg, bah25, bahChange, bahShares, usd, mhaLabel, zipsOf, rankOf, BAH_COST_SHARE } from '../../lib/kit';

const C = 'HI408';
const G = ['E-1', 'E-4', 'E-5', 'E-6', 'E-7', 'E-8', 'E-9', 'W-2', 'W-3', 'O-1', 'O-2', 'O-3', 'O-4', 'O-5', 'O-6'];
const Z = zipsOf(C);
const R = rankOf(C);
const hi: Array<[string, string]> = [['HI408', 'Honolulu County (Oahu)'], ['HI407', 'Maui County'], ['HI409', 'Hawaii County'], ['HI414', 'Kauai County']];

export default definePage({
  id: 'bah-honolulu',
  group: 'bah',
  kind: 'location',
  order: 370,
  slug: 'bah-honolulu',
  nav: 'BAH Hawaii (Oahu)',
  card: 'Oahu 2026 BAH for Pearl Harbor-Hickam, Schofield Barracks and Kaneohe Bay, and the other islands',
  title: `BAH Hawaii 2026: Oahu Rates, ${usd(bah(C, 'E-5'))} for an E-5 With Family`,
  description: `BAH Hawaii 2026: ${usd(bah(C, 'E-5'))} for an E-5 with dependents on Oahu, ${usd(bah(C, 'O-3'))} for an O-3, at Pearl Harbor-Hickam, Schofield Barracks and Kaneohe Bay. All grades listed.`,
  h1: 'BAH in Hawaii (Honolulu County) for 2026',
  intro: 'The 2026 housing allowance on Oahu, one of the highest in the country, how it compares with the neighbor islands, and the cost-of-living allowance that comes on top.',
  resume: `An E-5 with dependents stationed on Oahu receives ${usd(bah(C, 'E-5'))} a month of BAH in 2026 and ${usd(bah(C, 'E-5', false))} without dependents; a married O-3 receives ${usd(bah(C, 'O-3'))}. The whole island forms a single housing area, ${mhaLabel(C)} (${C}) in the Defense Travel Management Office file, ${Z.n} ZIP codes from Honolulu to the North Shore, which covers Joint Base Pearl Harbor-Hickam, Schofield Barracks, Marine Corps Base Hawaii at Kaneohe Bay, Fort Shafter and Camp H. M. Smith. Oahu ranks ${R.rank} of ${R.of} housing areas for the E-5 family rate, among the highest of all, and the table rose about ${bahChange(C, 'E-5').pct}% from 2025. Hawaii is also treated as outside the continental United States for the cost-of-living allowance, which is paid separately from BAH to offset prices for goods and services. Junior enlisted families from E-1 to E-4 receive ${usd(bah(C, 'E-1'))} of BAH.`,
  mini: 'bahLocal',
  miniArg: bahArg(C, 'Oahu'),
  faqs: [
    { q: 'What is BAH for an E-4 with dependents in Hawaii in 2026?', a: `On Oahu, ${usd(bah(C, 'E-4'))} a month, the same as E-1 to E-3, and ${usd(bah(C, 'E-4', false))} without dependents for members authorized to live off base. A cost-of-living allowance is paid on top in Hawaii, at a rate that depends on the island, grade, years of service and dependents.` },
    { q: 'Is BAH the same at Schofield Barracks and Pearl Harbor?', a: `Yes. The whole of Oahu is one housing area in the DTMO file, so a soldier at Schofield Barracks, a sailor at Pearl Harbor and a Marine at Kaneohe Bay with the same grade and status receive the same rate: ${usd(bah(C, 'E-5'))} for an E-5 with dependents in 2026.` },
    { q: 'Do service members in Hawaii get COLA as well as BAH?', a: 'Yes. For allowances, Hawaii and Alaska are treated as outside the continental United States, so members there receive the overseas cost-of-living allowance, set by the Defense Travel Management Office for each location and paid in addition to BAH. Unlike the mainland CONUS COLA, it is not taxable, and its rates are reviewed several times a year.' },
    { q: 'How much did Oahu BAH rise for 2026?', a: `For an E-5 with dependents, from ${usd(bah25(C, 'E-5'))} in 2025 to ${usd(bah(C, 'E-5'))} in 2026, about ${bahChange(C, 'E-5').pct}% more; for an O-3, from ${usd(bah25(C, 'O-3'))} to ${usd(bah(C, 'O-3'))}. The new rates took effect on January 1, 2026, for every member assigned to the island, with no action needed from the member or the family.` },
  ],
  body: (h) => `
<h2>Oahu BAH by grade</h2>
${h.table(['Grade', 'With dependents', 'Without dependents'], G.map((g) => [g, usd(bah(C, g)), usd(bah(C, g, false))]), `Monthly BAH, ${mhaLabel(C)} (${C}), DTMO ${P.bah.year} rates.`, ['l', 'r', 'r'])}
<h2>The four Hawaii housing areas</h2>
${h.table(['Housing area', 'E-5 with dependents', 'E-7 with dependents', 'O-3 with dependents'], hi.map(([c, n]) => [n, usd(bah(c, 'E-5')), usd(bah(c, 'E-7')), usd(bah(c, 'O-3'))]), 'Monthly BAH 2026, DTMO.', ['l', 'r', 'r', 'r'])}
<p>Each county is its own housing area. Most members serve on Oahu, but the Pacific Missile Range Facility on Kauai and smaller activities on the Big Island and Maui have their own rates. Maui's table is higher than Oahu's for several grades, a result of the island's rental market.</p>
<h2>2025 and 2026 on Oahu</h2>
${h.table(['Grade', '2025', '2026', 'Change'], ['E-4', 'E-5', 'E-6', 'E-7', 'E-9', 'O-1', 'O-3', 'O-5'].map((g) => { const x = bahChange(C, g); return [g, usd(x.from), usd(x.to), `${x.diff >= 0 ? '+' : '−'}${usd(Math.abs(x.diff))} (${x.pct >= 0 ? '+' : '−'}${Math.abs(x.pct)}%)`]; }), 'Monthly BAH with dependents, DTMO 2025 and 2026 rates.', ['l', 'r', 'r', 'r'])}
<p>The increases are among the largest in dollars of any area, because a few percent of an Oahu rate is a large sum. They follow the annual survey of rents and utilities, in which rent accounts for about ${bahShares(C)!.rent}% of the measured housing cost on the island and utilities for ${bahShares(C)!.utilities}%; Hawaii's electricity prices are high, but the mild climate limits consumption. The published rate includes the ${BAH_COST_SHARE}% member cost share.</p>
<h2>Living on Oahu on BAH</h2>
<p>Many families on Oahu live in privatized military housing, where the BAH is paid to the housing partner as rent instead of to the member. Those who rent off base choose between the dense neighborhoods near Pearl Harbor and Honolulu and the longer drives to the North Shore or the windward side; the allowance is the same everywhere on the island. The single rate is also high, ${usd(bah(C, 'E-6', false))} for an E-6, but many single junior members live in barracks or aboard ship. The ${h.a('military-pay-calculator', 'military pay calculator')} adds basic pay and BAS to BAH; the cost-of-living allowance must be added from your LES. To compare with the mainland, see ${h.a('bah-san-diego', 'San Diego')} or look up any ZIP code in the ${h.a('bah-calculator', 'BAH calculator')}.</p>
<h2>Officers and senior enlisted on Oahu</h2>
<p>The with-dependents rate climbs steeply with grade on Oahu: ${usd(bah(C, 'E-7'))} for an E-7, ${usd(bah(C, 'E-9'))} for an E-9, ${usd(bah(C, 'O-4'))} for an O-4 and ${usd(bah(C, 'O-6'))} for an O-6. Those figures are above most of the mainland, and they make the step from one grade to the next worth more here than at a lower-cost station: a promotion from O-3 to O-4 adds ${usd(bah(C, 'O-4') - bah(C, 'O-3'))} a month of housing allowance on Oahu, against ${usd(bah('TX286', 'O-4') - bah('TX286', 'O-3'))} at Fort Hood.</p>
<h2>Arriving in Hawaii</h2>
<p>Members on permanent change of station orders to Hawaii start drawing the Oahu rate from the date they report. While they look for a home, they may receive a temporary lodging allowance for a limited number of days, a separate payment from BAH. Pets, vehicles and household goods follow special rules for the islands. A family that moves into privatized housing signs over the BAH as rent, so the amount on this page then goes to the housing company rather than to the family's account.</p>`,
  related: ['bah-calculator', 'bah-san-diego', 'bah-camp-pendleton', 'bah-rates', 'military-pay-calculator'],
  sources: ['dtmoBah', 'dtmoBah2025', 'dtmoComponents'],
});
