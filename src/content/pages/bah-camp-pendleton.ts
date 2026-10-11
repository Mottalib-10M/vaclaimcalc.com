import { definePage } from '../../lib/page-types';
import { P, bah, bahArg, bah25, bahChange, bahShares, usd, mhaLabel, zipsOf, rankOf, BAH_COST_SHARE } from '../../lib/kit';

const C = 'CA024';
const SD = 'CA038';
const G = ['E-1', 'E-4', 'E-5', 'E-6', 'E-7', 'E-8', 'E-9', 'W-1', 'W-2', 'O-1', 'O-2', 'O-3', 'O-4', 'O-5', 'O-6'];
const Z = zipsOf(C);
const R = rankOf(C);
const ca: Array<[string, string]> = [['CA024', 'Camp Pendleton'], ['CA038', 'San Diego'], ['CA041', 'Riverside'], ['CA032', 'Twentynine Palms'], ['CA420', 'El Centro']];

export default definePage({
  id: 'bah-camp-pendleton',
  group: 'bah',
  kind: 'location',
  order: 410,
  slug: 'bah-camp-pendleton',
  nav: 'BAH Camp Pendleton',
  card: 'Camp Pendleton and Oceanside: 2026 BAH by grade and how it differs from San Diego',
  title: `BAH Camp Pendleton 2026: Oceanside Rates for Every Grade`,
  description: `BAH Camp Pendleton 2026: ${usd(bah(C, 'E-5'))} for an E-5 with dependents, ${usd(bah(C, 'O-3'))} for an O-3, in Oceanside and north San Diego County, compared with San Diego rates.`,
  h1: 'BAH at Camp Pendleton for 2026',
  intro: 'The 2026 housing allowance of the Camp Pendleton housing area in north San Diego County, one of the highest of the Marine Corps, and how it lines up with San Diego next door.',
  resume: `A Marine E-5 with dependents at Camp Pendleton receives ${usd(bah(C, 'E-5'))} a month of BAH in 2026 and ${usd(bah(C, 'E-5', false))} without dependents; a married O-3 receives ${usd(bah(C, 'O-3'))}. The ${mhaLabel(C)} housing area (${C}) of the Defense Travel Management Office is small, ${Z.n} ZIP codes, centered on Oceanside and the north of San Diego County around the base, including communities such as Vista and Fallbrook. It ranks ${R.rank} of ${R.of} housing areas for the E-5 family rate, near the very top, and its rates sit close to those of the San Diego area just south: the E-5 family rate is ${usd(bah(SD, 'E-5') - bah(C, 'E-5'))} lower, but the O-3 rate is ${usd(bah(C, 'O-3') - bah(SD, 'O-3'))} higher. Junior enlisted families receive ${usd(bah(C, 'E-1'))}. Rates rose about ${bahChange(C, 'E-5').pct}% for an E-5 from 2025, and more for officers.`,
  mini: 'bahLocal',
  miniArg: bahArg(C, 'Camp Pendleton'),
  faqs: [
    { q: 'What is Camp Pendleton BAH for a corporal with dependents?', a: `A corporal is an E-4. With dependents, an E-4 at Camp Pendleton receives ${usd(bah(C, 'E-4'))} a month in 2026, the same as E-1 to E-3. Without dependents, an E-4 authorized to live off base receives ${usd(bah(C, 'E-4', false))}, although most single junior Marines live in the barracks on base.` },
    { q: 'Do Marines at Camp Pendleton get San Diego BAH if they live in San Diego?', a: `No. BAH follows the ZIP code of the permanent duty station, so a Marine assigned to Camp Pendleton receives the Pendleton rate wherever the family lives. For an E-5 with dependents in 2026 that is ${usd(bah(C, 'E-5'))}, against ${usd(bah(SD, 'E-5'))} in the San Diego area. For officers, the Pendleton rate is the higher of the two for several grades.` },
    { q: 'Is Oceanside in the Camp Pendleton housing area?', a: `Yes. The DTMO file puts Oceanside and nearby north county ZIP codes in the Camp Pendleton area, ${Z.n} ZIP codes in all. The line can cut through a city: in Carlsbad, ZIP code 92008 belongs to the Pendleton area while 92009, 92010 and 92011 belong to San Diego. The BAH calculator on this site shows the area of any ZIP code.` },
  ],
  body: (h) => `
<h2>Camp Pendleton BAH by grade</h2>
${h.table(['Grade', 'With dependents', 'Without dependents'], G.map((g) => [g, usd(bah(C, g)), usd(bah(C, g, false))]), `Monthly BAH, ${mhaLabel(C)} (${C}), DTMO ${P.bah.year} rates.`, ['l', 'r', 'r'])}
<h2>Pendleton and San Diego, grade by grade</h2>
${h.table(['Grade', 'Camp Pendleton', 'San Diego', 'Difference'], ['E-4', 'E-5', 'E-6', 'E-7', 'E-9', 'O-1', 'O-3', 'O-5'].map((g) => [g, usd(bah(C, g)), usd(bah(SD, g)), `${bah(C, g) - bah(SD, g) >= 0 ? '+' : '−'}${usd(Math.abs(bah(C, g) - bah(SD, g)))}`]), 'Monthly BAH with dependents, 2026, DTMO.', ['l', 'r', 'r', 'r'])}
<p>The two areas are neighbors and their rates are close, but the differences go both ways and change from grade to grade: in 2026 an E-9 or an O-3 family receives more at Pendleton, an E-4 or an O-5 family less. A Marine who moves from Pendleton to an assignment at Marine Corps Recruit Depot San Diego or Miramar, both in the San Diego area, will see a small change in either direction depending on grade.</p>
<h2>Southern California Marine bases</h2>
${h.table(['Housing area', 'E-5 with dependents', 'E-7 with dependents', 'O-3 with dependents'], ca.map(([c, n]) => [n, usd(bah(c, 'E-5')), usd(bah(c, 'E-7')), usd(bah(c, 'O-3'))]), 'Monthly BAH 2026, DTMO.', ['l', 'r', 'r', 'r'])}
<p>The desert bases are a different world: Twentynine Palms and El Centro pay a fraction of the coastal rates. Riverside covers March Air Reserve Base and inland communities. Orders from Pendleton to the desert lower BAH sharply, while basic pay stays the same.</p>
<h2>2025 to 2026 and what the rate covers</h2>
<p>From 2025, the E-5 family rate went from ${usd(bah25(C, 'E-5'))} to ${usd(bah(C, 'E-5'))} and the O-3 rate from ${usd(bah25(C, 'O-3'))} to ${usd(bah(C, 'O-3'))}. In the DTMO's 2026 component breakdown, rent makes up about ${bahShares(C)!.rent}% of the housing cost of the area and utilities ${bahShares(C)!.utilities}%, a rent share typical of coastal California. The rate is set ${BAH_COST_SHARE}% below that cost. Families in privatized housing on base hand the allowance over as rent. The ${h.a('military-pay-calculator', 'military pay calculator')} adds BAH to basic pay and BAS, and the ${h.a('bah-san-diego', 'San Diego page')} covers the Navy and Marine commands south of the base.</p>
<h2>Where the area boundary runs</h2>
<p>The ${Z.n} ZIP codes of the area run from ${Z.first} to ${Z.last}. Besides Oceanside and the base itself, they include Fallbrook to the east, Vista, San Marcos's northern edge in 92069 and part of Carlsbad. The boundary with the San Diego area is not a city limit: in Carlsbad, the northern ZIP code 92008 is in the Pendleton area, the southern ones in San Diego, and Encinitas (92024) is in San Diego. This matters for Marines and sailors assigned to commands on the edge of the two areas, since the ZIP code of the command, not of the home, sets the rate.</p>
<h2>Junior Marines and the family rate</h2>
<p>Camp Pendleton is home to large numbers of junior enlisted Marines, and the family rate for E-1 to E-4, ${usd(bah(C, 'E-1'))}, is one of the highest junior rates of the Corps. Single Marines in those grades generally live in barracks; when a junior Marine marries, the with-dependents rate starts from the date of the marriage once the finance office has the certificate, and the move out of the barracks follows the command's housing policy.</p>`,
  related: ['bah-san-diego', 'bah-calculator', 'bah-camp-lejeune', 'bah-honolulu', 'military-pay-calculator'],
  sources: ['dtmoBah', 'dtmoBah2025', 'dtmoComponents'],
});
