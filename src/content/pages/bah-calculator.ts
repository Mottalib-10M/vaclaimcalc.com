import { definePage } from '../../lib/page-types';
import { P, bah, bah25, bahChange, usd, mhaLabel, MHAS, BAH_COST_SHARE } from '../../lib/kit';

const withRates = MHAS.filter((m) => m.w);
const e5 = withRates.map((m) => ({ c: m.code, v: m.w![4] })).sort((a, b) => b.v - a.v);
const hi = e5[0], lo = e5[e5.length - 1];
const median = e5[Math.floor(e5.length / 2)];

export default definePage({
  id: 'bah-calculator',
  group: 'bah',
  kind: 'pillar',
  order: 10,
  slug: 'bah-calculator',
  nav: 'BAH calculator 2026',
  card: 'Your 2026 housing allowance from the duty station ZIP code, grade and dependents, with every grade of the area',
  title: 'BAH Calculator 2026: Housing Allowance by ZIP Code and Grade',
  description: `BAH calculator 2026 by duty station ZIP code, grade and dependents: ${usd(lo.v)} to ${usd(hi.v)} for an E-5 with family, from the official DTMO 2026 rate files by grade.`,
  h1: 'BAH calculator 2026',
  intro: 'Enter the ZIP code of your permanent duty station, your grade and whether you have dependents: the calculator reads the official 2026 rate and shows every grade of the housing area.',
  resume: `The Basic Allowance for Housing is set by three things: the ZIP code of your permanent duty station, your pay grade and whether you have dependents. In 2026 an E-5 with dependents receives anything from ${usd(lo.v)} a month in the lowest housing area, ${mhaLabel(lo.c)}, to ${usd(hi.v)} in the highest, ${mhaLabel(hi.c)}, with a median around ${usd(median.v)}. The calculator below uses the files the Defense Travel Management Office publishes for ${P.bah.year}: ${P.bah.zips.toLocaleString('en-US')} ZIP codes assigned to ${withRates.length} military housing areas, and for each area a rate with dependents and a rate without dependents for every grade from E-1 to O-10. The rates took effect on January 1, 2026; they are designed to cover the median rent and average utilities of a home of the standard set for each grade, minus a ${BAH_COST_SHARE}% share members pay themselves. BAH is not taxed. Members in government quarters do not receive it, and members already at a station keep a higher 2025 rate through rate protection.`,
  tool: 'bah',
  toolProps: { grade: 'E-5', zip: '92136' },
  faqs: [
    { q: 'How is BAH calculated for 2026?', a: `The DTMO surveys median rents and average utility costs for six housing profiles, from apartments to detached houses, in each housing area every year. Each grade is matched to a profile, with and without dependents, and the total cost is reduced by the ${BAH_COST_SHARE}% member cost share. The result is the rate for that area, grade and status, effective January 1.` },
    { q: 'Which ZIP code do I use for BAH?', a: 'The ZIP code of your permanent duty station, the unit or installation on your orders, not the ZIP code of your home. A member assigned to a base who lives in a neighboring housing area still receives the base rate. For a ship, it is the homeport; for recruiters and other members far from an installation, the ZIP code of their office.' },
    { q: 'Does the number of dependents change BAH?', a: 'No. There are only two rates per grade: with dependents and without. A spouse alone and a spouse with five children give the same with-dependents rate. Child support paid for a child who does not live with the member can, in some cases, qualify for the with-dependents rate or a differential, under rules set in the Joint Travel Regulations.' },
    { q: 'What happens to my BAH if the rate goes down?', a: 'Nothing, as long as you stay at the same duty station with the same dependency status and are not reduced in grade. Individual rate protection keeps the higher rate you were entitled to on December 31 of the previous year. A promotion keeps the protection and gives the higher of the protected rate and the new grade rate.' },
    { q: 'Is BAH paid during deployment?', a: 'Yes. BAH is tied to the permanent duty station and continues while a member deploys or goes on temporary duty, so the family keeps the same allowance at home. Single members who give up their off-base housing during a long deployment may see different rules applied by their command.' },
    { q: 'Do dual-military couples both get BAH?', a: 'Yes, each member draws BAH, but only one can receive the with-dependents rate for the same children. Without children, both receive the without-dependents rate of their own grade. When both are assigned to the same area and live together, each still receives their own allowance.' },
  ],
  body: (h) => `
<h2>What the calculator shows</h2>
<p>After you type a ZIP code, the calculator finds its military housing area in the DTMO's ZIP code file, then reads the rate of your grade, with or without dependents. It also lists the rates of the other grades in the same area, so that you can see what a promotion would change. If the ZIP code is not in the file, which happens for some post office boxes and new ZIP codes, try the ZIP code of the main gate of your installation.</p>
<h2>The housing standards behind each grade</h2>
<p>The DoD prices each grade on a type of home. With dependents, junior enlisted members are priced on a two-bedroom townhouse, and the standard rises with grade to a detached house with four bedrooms for the most senior members. Without dependents, the standards are apartments and smaller homes. That is why, in many areas, the rates of E-1 to E-4 with dependents are identical, and why the single rate falls further behind the family rate where family homes are expensive.</p>
<h2>Changes from 2025</h2>
<p>Most areas rose for 2026, some fell. In San Diego the E-5 family rate went from ${usd(bah25('CA038', 'E-5'))} to ${usd(bah('CA038', 'E-5'))}; at Fort Hood from ${usd(bah25('TX286', 'E-5'))} to ${usd(bah('TX286', 'E-5'))}, ${bahChange('TX286', 'E-5').pct}% more; in San Antonio it went down, from ${usd(bah25('TX285', 'E-5'))} to ${usd(bah('TX285', 'E-5'))}. Pages for the large housing areas show every grade: ${h.a('bah-san-diego', 'San Diego')}, ${h.a('bah-norfolk', 'Norfolk')}, ${h.a('bah-fort-bragg', 'Fort Bragg')}, ${h.a('bah-fort-hood', 'Fort Hood')}, ${h.a('bah-tacoma', 'JBLM')}, ${h.a('bah-washington-dc', 'Washington DC')} and others. The full list of areas is on the ${h.a('bah-rates', 'BAH rates page')}.</p>
<h2>BAH, basic pay and the GI Bill</h2>
<p>BAH is one of three parts of regular military compensation; the ${h.a('military-pay-calculator', 'military pay calculator')} adds basic pay and BAS. The same table also sets the Post-9/11 GI Bill housing allowance, which equals the E-5 with-dependents rate of the school's ZIP code: see the ${h.a('gi-bill-housing-allowance', 'GI Bill housing allowance page')}.</p>
<h2>Three cases the calculator does not cover</h2>
<p>Members assigned overseas receive the overseas housing allowance, which reimburses actual rent up to a ceiling and is not part of the BAH files; Hawaii and Alaska, by contrast, have BAH rates like the rest of the country. Members on temporary duty keep the BAH of their permanent station. And partial BAH, a small amount paid to some single members living in government quarters, is a fixed national figure not shown here. For everything else, the rate in the calculator is the one finance offices apply.</p>`,
  related: ['bah-rates', 'military-pay-calculator', 'bah-san-diego', 'bah-norfolk', 'gi-bill-housing-allowance', 'bah-fort-bragg'],
  sources: ['dtmoBah', 'dtmoBah2025', 'dtmoComponents', 'dfasBas'],
});
