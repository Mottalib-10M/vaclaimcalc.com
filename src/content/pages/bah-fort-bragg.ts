import { definePage } from '../../lib/page-types';
import { P, bah, bahArg, pay, bas, usd, usdx, mhaLabel, zipsOf, rankOf, bah25, bahChange, bahShares, BAH_COST_SHARE } from '../../lib/kit';

const C = 'NC182';
const G = ['E-1', 'E-4', 'E-5', 'E-6', 'E-7', 'E-8', 'E-9', 'W-1', 'W-2', 'W-3', 'O-1', 'O-2', 'O-3', 'O-4', 'O-5', 'O-6'];
const Z = zipsOf(C);
const R = rankOf(C);
const nc: Array<[string, string]> = [['NC182', 'Fort Bragg/Pope'], ['NC178', 'Camp Lejeune'], ['NC177', 'Cherry Point'], ['NC183', 'Seymour Johnson AFB'], ['NC185', 'Raleigh']];

export default definePage({
  id: 'bah-fort-bragg',
  group: 'bah',
  kind: 'location',
  order: 320,
  slug: 'bah-fort-bragg',
  nav: 'BAH Fort Bragg',
  card: 'Fort Bragg and Pope Army Airfield 2026 BAH for every grade, and how far it goes around Fayetteville',
  title: `BAH Fort Bragg 2026: ${usd(bah(C, 'E-5'))} for an E-5, All Grades`,
  description: `BAH Fort Bragg 2026: ${usd(bah(C, 'E-5'))} for an E-5 with dependents, ${usd(bah(C, 'E-5', false))} without, ${usd(bah(C, 'O-3'))} for an O-3. DTMO rates for Fayetteville, Pope Field and every pay grade.`,
  h1: 'BAH at Fort Bragg for 2026',
  intro: 'The 2026 housing allowance of the Fort Bragg/Pope housing area in North Carolina, grade by grade, with the other North Carolina installations for comparison.',
  resume: `An E-5 with dependents stationed at Fort Bragg receives ${usd(bah(C, 'E-5'))} a month of BAH in 2026, ${usd(bah(C, 'E-5', false))} without dependents, and a married O-3 receives ${usd(bah(C, 'O-3'))}. Those are the rates of the housing area the Defense Travel Management Office names ${mhaLabel(C)} (${C}), which groups ${Z.n} ZIP codes around Fayetteville, Spring Lake, Hope Mills, Raeford and the surrounding counties, and covers Pope Army Airfield as well as the post itself. With one of the largest populations of soldiers in the Army, the area has rates well below the coasts: it ranks ${R.rank} of ${R.of} housing areas for the E-5 rate with dependents. The gap between the family rate and the single rate is also narrow, ${usd(bah(C, 'E-5') - bah(C, 'E-5', false))} for an E-5, because family homes and apartments are priced closer together than in large cities. Junior enlisted families from E-1 to E-4 receive ${usd(bah(C, 'E-1'))}.`,
  mini: 'bahLocal',
  miniArg: bahArg(C, 'Fort Bragg'),
  faqs: [
    { q: 'What is BAH at Fort Bragg for an E-4 with dependents?', a: `${usd(bah(C, 'E-4'))} a month in 2026, the same as for E-1 to E-3, since the DoD prices junior enlisted family housing on one standard. Without dependents, an E-4 authorized to live off post receives ${usd(bah(C, 'E-4', false))}. Most single junior soldiers at Fort Bragg live in the barracks and draw no BAH.` },
    { q: 'Does Pope Army Airfield have its own BAH rate?', a: `No. Pope Army Airfield is inside the Fort Bragg/Pope housing area of the DTMO file, so airmen and soldiers assigned there receive the same rates, ${usd(bah(C, 'E-5'))} for an E-5 with dependents in 2026. The rate follows the ZIP code of the permanent duty station.` },
    { q: 'How much does a Fort Bragg E-6 make with BAH?', a: `An E-6 with eight years receives ${usdx(pay('E-6', 8))} of basic pay, ${usd(bah(C, 'E-6'))} of BAH with dependents and ${usdx(bas('E-6'))} of BAS in 2026, about ${usd(pay('E-6', 8) + bah(C, 'E-6') + bas('E-6'))} a month before taxes. Only basic pay is taxable. Special pays such as parachute duty pay come on top.` },
    { q: 'Is BAH higher at Camp Lejeune or Fort Bragg?', a: `In 2026 Fort Bragg pays slightly more for most grades: ${usd(bah(C, 'E-5'))} for an E-5 with dependents against ${usd(bah('NC178', 'E-5'))} at Camp Lejeune, and ${usd(bah(C, 'O-3'))} against ${usd(bah('NC178', 'O-3'))} for an O-3. Both areas sit in the lower part of the national range, with housing markets dominated by military families.` },
  ],
  body: (h) => `
<h2>Fort Bragg BAH by grade</h2>
${h.table(['Grade', 'With dependents', 'Without dependents'], G.map((g) => [g, usd(bah(C, g)), usd(bah(C, g, false))]), `Monthly BAH, ${mhaLabel(C)} (${C}), DTMO ${P.bah.year} rates.`, ['l', 'r', 'r'])}
<h2>A large area for a large post</h2>
<p>The housing area stretches over ZIP codes from ${Z.first} to ${Z.last}, which take in most of the places where Fort Bragg families actually live, from Fayetteville neighborhoods to rural communities in Harnett, Hoke, Moore and Cumberland counties. Because the whole area shares one rate, a family renting a larger home farther from post receives exactly the same allowance as one renting closer in, and the trade-off between space and commute is left to the family. The ${h.a('bah-calculator', 'BAH calculator')} confirms which area a ZIP code belongs to.</p>
<h2>North Carolina installations compared</h2>
${h.table(['Housing area', 'E-5 with dependents', 'E-7 with dependents', 'O-3 with dependents'], nc.map(([c, n]) => [n, usd(bah(c, 'E-5')), usd(bah(c, 'E-7')), usd(bah(c, 'O-3'))]), 'Monthly BAH 2026, DTMO.', ['l', 'r', 'r', 'r'])}
<p>Raleigh, the state capital, shows what a larger city does to the rates; soldiers assigned to a recruiting station or a reserve center there receive the Raleigh rate, not the Fort Bragg one. Marines at Camp Lejeune and Cherry Point and airmen at Seymour Johnson each have their own table.</p>
<h2>Promotions and the narrow single gap</h2>
<p>At Fort Bragg the with-dependents rate rises by ${usd(bah(C, 'E-6') - bah(C, 'E-5'))} from E-5 to E-6 and by ${usd(bah(C, 'O-4') - bah(C, 'O-3'))} from O-3 to O-4. The single rates are close behind the family rates for junior grades, which is typical of areas where apartments and small homes rent for similar amounts. For a single E-6 living off post, the allowance is ${usd(bah(C, 'E-6', false))}, against ${usd(bah(C, 'E-6'))} for a married one. Combine it with basic pay in the ${h.a('military-pay-calculator', 'military pay calculator')}, or compare with ${h.a('bah-fort-campbell', 'Fort Campbell')}, the other home of an airborne division.</p>
<h2>Fort Bragg rates, 2025 and 2026</h2>
<p>The Fort Bragg table moved modestly for 2026. The E-5 family rate went from ${usd(bah25(C, 'E-5'))} to ${usd(bah(C, 'E-5'))}, a change of ${bahChange(C, 'E-5').pct}%, while some officer grades rose a little more: the O-3 rate went from ${usd(bah25(C, 'O-3'))} to ${usd(bah(C, 'O-3'))}. Over two years, the ranking of the area against the rest of the country hardly changes.</p>
${h.table(['Grade', '2025', '2026', 'Change'], ['E-4', 'E-5', 'E-6', 'E-7', 'E-9', 'O-1', 'O-3', 'O-5'].map((g) => { const x = bahChange(C, g); return [g, usd(x.from), usd(x.to), `${x.diff >= 0 ? '+' : '−'}${usd(Math.abs(x.diff))} (${x.pct >= 0 ? '+' : '−'}${Math.abs(x.pct)}%)`]; }), 'Monthly BAH with dependents, DTMO 2025 and 2026 rates.', ['l', 'r', 'r', 'r'])}
<h2>What the rate is made of</h2>
<p>The DTMO measures rents and utility costs in each housing area every year. Around Fort Bragg, utilities account for about ${bahShares(C)!.utilities}% of the total housing cost behind the allowance and rent for ${bahShares(C)!.rent}%, a utility share well above that of coastal California: a smaller rent bill leaves the power bill a larger part of the total. The published rate is then reduced by the ${BAH_COST_SHARE}% cost share that members are expected to cover themselves.</p>`,
  related: ['bah-calculator', 'bah-camp-lejeune', 'bah-fort-campbell', 'bah-rates', 'military-pay-calculator'],
  sources: ['dtmoBah', 'dfasEnlisted'],
});
