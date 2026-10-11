import { definePage } from '../../lib/page-types';
import { P, bah, bahArg, usd, mhaLabel, MHAS, zipsOf } from '../../lib/kit';
const Zs = zipsOf('CA038');

const C = 'CA038';
const G = ['E-1', 'E-4', 'E-5', 'E-6', 'E-7', 'E-8', 'E-9', 'W-2', 'W-3', 'O-1', 'O-2', 'O-3', 'O-4', 'O-5', 'O-6'];
const rank = MHAS.filter((m) => m.w).sort((a, b) => (b.w![4] - a.w![4])).findIndex((m) => m.code === C) + 1;

export default definePage({
  id: 'bah-san-diego',
  group: 'bah',
  kind: 'location',
  order: 300,
  slug: 'bah-san-diego',
  nav: 'BAH San Diego',
  card: 'San Diego housing allowance 2026 for every grade, with and without dependents',
  title: `BAH San Diego 2026: ${usd(bah(C, 'E-5'))} for an E-5 With Dependents`,
  description: `BAH San Diego 2026: ${usd(bah(C, 'E-5'))} for an E-5 with dependents, ${usd(bah(C, 'O-3'))} for an O-3, for Naval Base San Diego, North Island, Miramar and the rest of the county area.`,
  h1: 'BAH in San Diego for 2026',
  intro: 'The 2026 housing allowance of the San Diego military housing area, grade by grade, and what changes when you have a family.',
  resume: `An E-5 with dependents stationed in San Diego receives ${usd(bah(C, 'E-5'))} a month of BAH in 2026, and ${usd(bah(C, 'E-5', false))} without dependents; an O-3 receives ${usd(bah(C, 'O-3'))} or ${usd(bah(C, 'O-3', false))}. These are the rates of the San Diego military housing area (${C}) in the Defense Travel Management Office file for ${P.bah.year}, which covers the ZIP codes of the county south of Camp Pendleton, from Naval Base San Diego and Naval Air Station North Island to Marine Corps Air Station Miramar and Naval Base Point Loma. Junior enlisted members from E-1 to E-4 all receive ${usd(bah(C, 'E-1'))} with a family, because the DoD prices their housing on the same standard home. San Diego ranks ${rank} among the housing areas of the United States for the E-5 rate with dependents, so the allowance is one of the highest a sailor or Marine will see in a career.`,
  mini: 'bahLocal',
  miniArg: bahArg(C, 'San Diego'),
  faqs: [
    { q: 'What is BAH for an E-4 with dependents in San Diego in 2026?', a: `${usd(bah(C, 'E-4'))} a month, the same as E-1 to E-3, because the DoD sets junior enlisted housing on one standard. Without dependents, an E-4 living off base receives ${usd(bah(C, 'E-4', false))}, although many single junior sailors and Marines live in barracks or on a ship and receive no BAH at all.` },
    { q: 'Is Camp Pendleton BAH the same as San Diego BAH?', a: `No. Camp Pendleton is its own housing area with its own rates: ${usd(bah('CA024', 'E-5'))} for an E-5 with dependents in 2026, against ${usd(bah(C, 'E-5'))} in the San Diego area. The rate follows the ZIP code of your permanent duty station, not where you choose to live, so a Marine at Pendleton who rents in San Diego still receives the Pendleton rate.` },
    { q: 'Does San Diego BAH go down if rents fall?', a: `The published rate can go down from one year to the next, but rate protection keeps your current rate as long as you stay at the same duty station with the same dependency status and do not lose a grade. A new arrival after a decrease receives the new, lower rate. Rates for ${P.bah.year} took effect on January 1.` },
    { q: 'Which ZIP codes use the San Diego BAH rate?', a: `The DTMO 2026 file assigns ${Zs.n} ZIP codes to the San Diego housing area, from ${Zs.first} to ${Zs.last}, covering the city, Coronado, the South Bay and inland communities. Your rate depends on the ZIP code of your permanent duty station, not of your home: Naval Base San Diego, Naval Air Station North Island and Miramar all fall in this area, while Camp Pendleton has its own table.` },
  ],
  body: (h) => `
<h2>San Diego BAH by grade</h2>
${h.table(['Grade', 'With dependents', 'Without dependents', 'Difference'], G.map((g) => [g, usd(bah(C, g)), usd(bah(C, g, false)), usd(bah(C, g) - bah(C, g, false))]), `Monthly BAH, ${mhaLabel(C)} (${C}), DTMO ${P.bah.year} rates.`, ['l', 'r', 'r', 'r'])}
<h2>Where the San Diego rate applies</h2>
<p>The DTMO file assigns each ZIP code to one military housing area, and the San Diego area takes most of the county: downtown and the bay, Coronado, the South Bay toward the border, and inland communities such as El Cajon and Santee. Your rate is set by the ZIP code of your permanent duty station, so a sailor whose ship is homeported at Naval Base San Diego and a pilot at Miramar receive the same table even if they live thirty miles apart. The ${h.a('bah-calculator', 'BAH calculator')} finds the housing area of any ZIP code. North of Oceanside, the ${h.a('bah-camp-pendleton', 'Camp Pendleton area')} starts with its own table.</p>
<h2>Family or no family: the gap at each grade</h2>
<p>The with-dependents rate is built on a larger home than the single rate, so the difference is the price of that extra space. In San Diego it is ${usd(bah(C, 'E-5') - bah(C, 'E-5', false))} a month for an E-5 and ${usd(bah(C, 'O-3') - bah(C, 'O-3', false))} for an O-3, one of the wider gaps of the country because family homes there cost much more than apartments. Two service members married to each other and both stationed here each draw BAH: one at the with-dependents rate if they have a child, the other at the single rate, or both at the single rate if they have no children. It does not matter how many dependents you have: a spouse alone and a spouse with four children give the same rate.</p>
<h2>What BAH does not cover in San Diego</h2>
<p>BAH is designed to cover a typical rent and utilities for your grade in the area, minus a small share the member is expected to pay. It is not adjusted for the neighborhood you choose, and it stops if you move into government quarters. For the total pay picture, combine it with basic pay and BAS in the ${h.a('military-pay-calculator', 'military pay calculator')}, and compare with another station on the ${h.a('bah-rates', 'BAH rates page')}.</p>
<p>Moving between San Diego and an East Coast fleet concentration area shows how much of a sailor's income BAH can be. The same E-5 with a family receives ${usd(bah('VA298', 'E-5'))} in Norfolk, so a transfer from San Diego to Norfolk lowers the housing allowance by ${usd(bah(C, 'E-5') - bah('VA298', 'E-5'))} a month while basic pay does not change. Rents differ in proportion, which is the point of the allowance, but the numbers are worth knowing before you sign a lease that runs past your projected rotation date.</p>
<p>Officers see the same logic at a higher level: an O-1 with dependents receives ${usd(bah(C, 'O-1'))}, an O-4 ${usd(bah(C, 'O-4'))} and an O-6 ${usd(bah(C, 'O-6'))}, while warrant officers sit between the senior enlisted and the company grade officers.</p>
<h2>Checking the rate on your LES</h2>
<p>The Leave and Earnings Statement shows BAH as an entitlement line with the housing area code and your dependency status. If the amount differs from the table, the usual reasons are a status that was not updated after a marriage or a divorce, a member still drawing the rate of a previous station during a permanent change of station, or rate protection from an earlier year. The finance office corrects it with a copy of your orders and the marriage or birth certificate.</p>`,
  related: ['bah-camp-pendleton', 'bah-calculator', 'bah-rates', 'military-pay-calculator', 'bah-honolulu'],
  sources: ['dtmoBah', 'dfasBas'],
});
