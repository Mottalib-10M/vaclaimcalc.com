import { definePage } from '../../lib/page-types';
import { P, bah, giAreas, mhaLabel, usd, day } from '../../lib/kit';

const G = P.gi;
const CITIES: Array<[string, string]> = [['NY219', 'New York City'], ['MA120', 'Boston'], ['CA037', 'Los Angeles'], ['CA038', 'San Diego'], ['DC053', 'Washington DC area'], ['WA309', 'Seattle'], ['IL325', 'Chicago'], ['TX272', 'Austin'], ['CO045', 'Denver'], ['GA071', 'Atlanta'], ['AZ013', 'Phoenix'], ['OH230', 'Columbus, OH'], ['TN269', 'Nashville'], ['TX285', 'San Antonio'], ['FL062', 'Orlando']];
const codes = CITIES.map(([c]) => c);
const mha = (c: string, tier = 100, rop = 100) => (bah(c, 'E-5') * tier * rop) / 10000;

export default definePage({
  id: 'gi-bill-housing-allowance',
  group: 'edu',
  kind: 'guide',
  order: 20,
  slug: 'gi-bill-housing-allowance',
  nav: 'GI Bill housing allowance',
  card: 'The 2026-27 monthly housing allowance by college town, rate of pursuit and tier, and the online rate',
  title: 'GI Bill Housing Allowance 2026-27: MHA by City, Online Rate',
  description: `GI Bill housing allowance 2026-27: the E-5 with-dependents BAH of the campus ZIP code, ${usd(bah('NY219', 'E-5'))} in New York City, ${usd(bah('TX285', 'E-5'))} in San Antonio; ${usd(G.onlineMha)} for online.`,
  h1: 'Post-9/11 GI Bill housing allowance (MHA) for 2026-27',
  intro: 'How much the monthly housing allowance pays in large college towns from August 2026, and how the tier, the credits and online classes change it.',
  resume: `The monthly housing allowance of the Post-9/11 GI Bill is the military Basic Allowance for Housing of an E-5 with dependents at the ZIP code of the campus where the student takes most classes. From ${day(G.from)} to ${day(G.to)}, VA uses the 2026 BAH table, so the allowance at 100% is ${usd(bah('NY219', 'E-5'))} a month in New York City, ${usd(bah('MA120', 'E-5'))} in Boston, ${usd(bah('TX272', 'E-5'))} in Austin and ${usd(bah('OH230', 'E-5'))} in Columbus, Ohio. Two reductions apply: the eligibility tier (50% to 100% by length of service) and the rate of pursuit, the share of a full-time load, rounded by VA to the nearest tenth. Below or at half time, no housing allowance is paid. Students whose classes are all online receive ${usd(G.onlineMha)}, half the national average, and students at a foreign school ${usd(G.foreignMha)}, the national average. The allowance is paid at the end of each month of enrollment, not during breaks between terms, and students who began using the benefit before 2018 may receive a slightly higher grandfathered rate.`,
  mini: 'giMha',
  miniArg: giAreas(codes.slice(0, 10)),
  faqs: [
    { q: 'How is the GI Bill housing allowance calculated?', a: 'VA takes the 2026 BAH for an E-5 with dependents at the campus ZIP code, multiplies it by your eligibility tier and by your rate of pursuit rounded to the nearest tenth, and pays it for each month you are enrolled more than half time. For example, nine credits out of twelve is 75%, rounded to 80% of the full allowance.' },
    { q: 'What is the GI Bill housing allowance for online classes in 2026-27?', a: `${usd(G.onlineMha)} a month at 100% for students who started using the benefit on or after January 1, 2018, half the national average of the housing allowance. Taking at least one class in person, even a single course, qualifies for the full rate of the campus ZIP code instead.` },
    { q: 'Is the GI Bill housing allowance paid during summer break?', a: 'Not during breaks between terms: VA pays only for the days you are enrolled, so the payment for the month in which a term ends or starts is prorated. If you take summer classes more than half time, the allowance continues for those weeks at the same rate.' },
    { q: 'Do I get a higher GI Bill housing allowance with a family?', a: 'No. The allowance is always based on the E-5 with-dependents rate, whatever your own family situation or former grade. A single veteran and a married veteran with children at the same school receive the same amount, which is one reason the allowance is generous for single students in high-cost areas.' },
  ],
  body: (h) => `
<h2>Housing allowance in large college towns, 2026-27</h2>
${h.table(['City (housing area)', '100%, full time', '80% tier', '100%, 9 credits'], CITIES.map(([c, n]) => [`${n} <span class="text-navy-600">(${mhaLabel(c)})</span>`, usd(mha(c)), usd(mha(c, 80)), usd(mha(c, 100, 80))]), 'Monthly allowance at the 2026 E-5 with-dependents BAH, August 1, 2026 to July 31, 2027. 9 credits of 12 = 75%, rounded by VA to 80%.', ['l', 'r', 'r', 'r'])}
<h2>Rate of pursuit: credits matter more than you think</h2>
<p>VA divides your credits by what your school considers full time, often twelve credits for a standard term, and rounds the result to the nearest tenth. Twelve credits or more is 100%. Ten credits is 83%, rounded to 80%. Nine credits is 75%, rounded to 80%. Seven credits is 58%, rounded to 60%. Six credits is exactly half time, and half time pays nothing. A student who drops from seven credits to six during a term therefore loses the entire allowance from the date of the change, and VA may create a debt for amounts already paid. Schools that use clock hours or non-standard terms follow other conversion rules.</p>
<h2>Which ZIP code counts</h2>
<p>The allowance follows the physical location of the campus where you attend the majority of your classes, not your home address and not the school's headquarters. A university with a main campus and branch sites can produce different allowances for students in the same program. If most classes are online but one is in person, VA uses the ZIP code of that in-person location. You can check the BAH area of any ZIP code with the ${h.a('bah-calculator', 'BAH calculator')}, using grade E-5 with dependents.</p>
<h2>Tiers and transferred benefits</h2>
<p>The allowance is multiplied by your eligibility tier, from 100% for 1,095 days of active duty since September 11, 2001 down to 50% for 90 days; see the ${h.a('post-9-11-gi-bill', 'Post-9/11 GI Bill guide')} for the full scale. Spouses using benefits transferred by a member who is still on active duty receive no housing allowance; children using transferred benefits do, even while the parent serves. Members using the benefit themselves on active duty also receive none, since they already draw BAH.</p>
<h2>New York against San Antonio: what the gap means</h2>
<p>The table shows a spread of more than ${usd(Math.floor((bah('NY219', 'E-5') - bah('TX285', 'E-5')) / 100) * 100)} a month between the most and least expensive cities listed. That spread follows rents, and students should not read it as a bonus: a veteran in New York pays far more for an apartment than one in San Antonio. Where the allowance can really change a budget is in the choice between two schools in the same region, for example a campus in the city and one in a cheaper suburb that falls in a different housing area, or between an in-person program and an online one at ${usd(G.onlineMha)}.</p>
<h2>The grandfathered rate</h2>
<p>Since 2018, the housing allowance follows the DoD BAH rates, which include the member cost share of a few percent. Students who began using the Post-9/11 GI Bill before January 1, 2018 continue to receive the slightly higher rates computed without that cost share. VA applies this automatically; the difference is small but can reach several dozen dollars a month in high-cost areas.</p>
<h2>Planning a school year</h2>
<p>The allowance is paid at the end of each month and covers only enrolled days, so the first payment of a fall term often arrives at the beginning of October for classes that started in late August. Budgeting for that gap, and for the break between terms, avoids the most common money problem of student veterans. The ${h.a('gi-bill-calculator', 'GI Bill calculator')} adds tuition and books for your school, and the ${h.a('bah-rates', 'BAH rates page')} lists every housing area.</p>
<p>Students who change schools or campuses mid-year should tell the school certifying official at once: the allowance follows the new campus ZIP code from the first day of classes there.</p>`,
  related: ['gi-bill-calculator', 'post-9-11-gi-bill', 'bah-calculator', 'bah-rates', 'tsp-calculator'],
  sources: ['vaGi', 'dtmoBah'],
});
