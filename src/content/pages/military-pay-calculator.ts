import { definePage } from '../../lib/page-types';
import { P, pay, bas, bah, mhaLabel, usdx, usd, day } from '../../lib/kit';

const ex = [
  ['E-3, 2 years, single, Fort Hood', 'E-3', 2, 'TX286', false],
  ['E-5, 4 years, married, Norfolk', 'E-5', 4, 'VA298', true],
  ['E-7, 14 years, married, San Antonio', 'E-7', 14, 'TX285', true],
  ['O-3, 6 years, married, Colorado Springs', 'O-3', 6, 'CO046', true],
  ['W-2, 8 years, single, Tacoma', 'W-2', 8, 'WA311', false],
  ['O-5, 18 years, married, Washington DC', 'O-5', 18, 'DC053', true],
] as Array<[string, string, number, string, boolean]>;
const rmc = (g: string, y: number, c: string, d: boolean) => pay(g, y) + bas(g) + bah(c, g, d);

export default definePage({
  id: 'military-pay-calculator',
  group: 'pay',
  kind: 'pillar',
  order: 20,
  slug: 'military-pay-calculator',
  nav: 'Military pay calculator',
  card: 'Basic pay, BAH at your ZIP code and BAS: your 2026 monthly compensation in one figure',
  title: 'Military Pay Calculator 2026: Basic Pay, BAH and BAS by ZIP',
  description: `Military pay calculator 2026: basic pay, BAH at your duty station ZIP code and BAS. A married E-5 with 4 years in Norfolk gets ${usd(rmc('E-5', 4, 'VA298', true))} a month before tax.`,
  h1: 'Military pay calculator 2026',
  intro: 'Choose a grade, your years of service and the ZIP code of your duty station: the calculator adds basic pay, the housing allowance and the subsistence allowance.',
  resume: `A married E-5 with four years of service stationed in Norfolk, Virginia, receives ${usdx(pay('E-5', 4))} of basic pay, ${usd(bah('VA298', 'E-5'))} of BAH and ${usdx(bas('E-5'))} of BAS in 2026, about ${usd(rmc('E-5', 4, 'VA298', true))} a month before taxes. Those three amounts make up what the Department of Defense calls regular military compensation, the core of a service member's income. Basic pay comes from the DFAS table effective ${day(P.pay.effective)}, after a ${P.pay.raisePct}% raise. BAH depends on the ZIP code of the permanent duty station, the grade and whether the member has dependents, and comes from the 2026 file of the Defense Travel Management Office for ${P.bah.zips.toLocaleString('en-US')} ZIP codes. BAS is a flat amount, ${usdx(P.pay.bas.enlisted)} for enlisted members and ${usdx(P.pay.bas.officer)} for officers. Only basic pay is taxed, so the gross figure goes further than a civilian salary of the same size.`,
  tool: 'pay',
  toolProps: { grade: 'E-5', years: 4, zip: '23511' },
  faqs: [
    { q: 'How much does an E-4 make a month with BAH?', a: `It depends on the duty station. Basic pay for an E-4 over 2 years is ${usdx(pay('E-4', 2))} in 2026 and BAS ${usdx(bas('E-4'))}. With dependents, BAH adds ${usd(bah('NC182', 'E-4'))} at Fort Bragg and ${usd(bah('CA038', 'E-4'))} in San Diego, so the monthly total ranges from about ${usd(rmc('E-4', 2, 'NC182', true))} to ${usd(rmc('E-4', 2, 'CA038', true))}.` },
    { q: 'Is BAH taxable income?', a: 'No. BAH and BAS are tax-free allowances: they do not appear as wages on your W-2 and are not subject to federal or state income tax or to Social Security and Medicare taxes. Basic pay, special pays and most bonuses are taxable, except when earned in a combat zone, where enlisted pay is fully excluded and officer pay up to a cap.' },
    { q: 'What is regular military compensation?', a: 'Regular military compensation (RMC) is the sum of basic pay, BAH, BAS and the tax advantage that comes from the allowances being tax free. The Department of Defense uses it to compare military pay with civilian salaries. This calculator shows the first three; the tax advantage depends on your filing status and state.' },
    { q: 'Do single service members living in barracks get BAH?', a: 'Generally no. A member assigned to government quarters, such as barracks or a ship, does not receive BAH, except in some cases a small partial rate. Single members who are authorized to live off base receive BAH at the without-dependents rate. Members with dependents receive the with-dependents rate whether or not the family lives at the duty station, in most cases.' },
    { q: 'Does the military pay calculator include special pays?', a: 'No. Hazardous duty pay, flight pay, sea pay, special duty assignment pay, bonuses, family separation allowance and cost-of-living allowances vary too much from one member to another to be guessed. Add them from your orders or your LES. The calculator gives the three amounts every member on active duty receives.' },
    { q: 'How much more does a married service member get?', a: `Basic pay and BAS are the same; only BAH changes. In 2026 an E-5 stationed in San Diego receives ${usd(bah('CA038', 'E-5'))} with dependents against ${usd(bah('CA038', 'E-5', false))} without, ${usd(bah('CA038', 'E-5') - bah('CA038', 'E-5', false))} a month more. The number of dependents does not matter: one child or five give the same rate.` },
  ],
  body: (h) => `
<h2>Six members, six totals</h2>
${h.table(['Member', 'Basic pay', 'BAH', 'BAS', 'Total per month'], ex.map(([l, g, y, c, d]) => [l, usdx(pay(g, y)), usd(bah(c, g, d)), usdx(bas(g)), usd(rmc(g, y, c, d))]), 'Monthly amounts in 2026: DFAS basic pay (January 1, 2026), DTMO BAH 2026, BAS 2026.', ['l', 'r', 'r', 'r', 'r'])}
<p>The table shows how much of a member's income depends on the station. Between the single E-3 at Fort Hood and the O-5 in Washington, basic pay explains most of the gap, but BAH alone runs from ${usd(bah('TX286', 'E-3', false))} to ${usd(bah('DC053', 'O-5'))} a month.</p>
<h2>What the calculator adds, and what it leaves out</h2>
<p>The calculator reads the basic pay of your grade and column, finds the military housing area of the ZIP code in the DTMO file and the BAH for your grade and dependency status, and adds BAS. It does not compute taxes, because withholding depends on your W-4, your state of legal residence and other income; remember only that the allowances are excluded. It does not include the TSP contribution, which is taken from basic pay, or special pays, which you can add from your orders. For BAH, the ZIP code to use is that of your permanent duty station, not your home; the ${h.a('bah-calculator', 'BAH calculator')} shows the rates of all grades for that area.</p>
<h2>From pay to retirement</h2>
<p>Basic pay is also the base of the retirement systems: High-3 and BRS pensions are computed on the average basic pay of the highest 36 months, without the allowances. The ${h.a('military-retirement-calculator', 'retirement calculator')} starts from the same table, and the ${h.a('tsp-calculator', 'TSP calculator')} shows what a percentage of basic pay grows into with the BRS match. The full tables are on the ${h.a('military-pay-chart', '2026 pay chart')}.</p>
<h2>Why the duty station changes everything</h2>
<p>Two members with the same grade and years can differ by more than a thousand dollars a month because of BAH alone. An O-3 with a family receives ${usd(bah('NC182', 'O-3'))} at Fort Bragg and ${usd(bah('CA038', 'O-3'))} in San Diego in 2026; a married E-6 receives ${usd(bah('TX286', 'E-6'))} at Fort Hood and ${usd(bah('DC053', 'E-6'))} in the Washington area. The allowance follows the cost of renting a home of the standard set for each grade, so it is not a raise but a compensation for local prices. Still, it decides what is left at the end of the month: housing near Fort Hood often costs less than the allowance for members who choose a modest home, while in high-cost areas the allowance is designed to cover a typical home, not any home.</p>
<h2>Moving to a new station</h2>
<p>BAH changes with the permanent change of station: the new rate applies from the date you report, with special rules during travel and while the family stays at the old location. Use the calculator with the ZIP code of the new duty station to see the difference before you move, and remember that BAH is set by the station's ZIP code even if you choose to live across a state line. Overseas, BAH is replaced by the overseas housing allowance, which this calculator does not cover.</p>`,
  related: ['military-pay-chart', 'bah-calculator', 'bas-rates', 'tsp-calculator', 'military-retirement-calculator', 'pay-nco'],
  sources: ['dfasEnlisted', 'dfasOfficer', 'dtmoBah', 'dfasBas'],
});
