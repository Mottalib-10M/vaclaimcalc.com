import { definePage } from '../../lib/page-types';
import { P, usdx, usd, day } from '../../lib/kit';

const B = P.pay.bas;
const B25 = P.pay.bas2025;
const pctUp = (a: number, b: number) => `${(((a - b) / b) * 100).toFixed(1)}%`;

export default definePage({
  id: 'bas-rates',
  group: 'pay',
  kind: 'guide',
  order: 30,
  slug: 'bas-rates',
  nav: 'BAS 2026',
  card: 'Basic Allowance for Subsistence: 2026 rates for officers, enlisted members and BAS II',
  title: 'BAS Rates 2026: Basic Allowance for Subsistence by Status',
  description: `BAS rates 2026: ${usdx(B.enlisted)} a month for enlisted members, ${usdx(B.officer)} for officers and ${usdx(B.basII)} for BAS II, from ${day(P.pay.effective)}. Who receives it and how it is taxed.`,
  h1: 'Basic Allowance for Subsistence (BAS) in 2026',
  intro: 'The food allowance every service member receives, how much it is in 2026, why officers get less, and when the dining facility takes part of it back.',
  resume: `The Basic Allowance for Subsistence is a monthly, tax-free payment meant to cover a service member's own meals, not the family's. In 2026 it is ${usdx(B.enlisted)} for enlisted members and ${usdx(B.officer)} for officers and warrant officers, from ${day(P.pay.effective)}, up from ${usdx(B25.enlisted)} and ${usdx(B25.officer)} in 2025, an increase of ${pctUp(B.enlisted, B25.enlisted)}. The amount does not depend on grade within each group, on seniority or on the number of dependents. Enlisted members in rare situations where government meals are not available and their quarters have no kitchen can receive BAS II, twice the enlisted rate, ${usdx(B.basII)}. BAS follows the cost of food: by law it changes each year with the Department of Agriculture's moderate-cost food plan for a man aged 20 to 50. Enlisted members who eat in a dining facility under an essential station messing arrangement pay for their meals out of it.`,
  mini: 'bas',
  faqs: [
    { q: 'Why do officers get less BAS than enlisted members?', a: `Because the two rates have different histories. The enlisted rate was raised in the late 1990s and early 2000s to match the food cost benchmark, while the officer rate rises each year by the same percentage. In 2026 officers receive ${usdx(B.officer)} and enlisted members ${usdx(B.enlisted)}. Officers were never entitled to free meals in the dining facility, which is why their allowance was set separately.` },
    { q: 'Is BAS taxable?', a: 'No. BAS is a tax-free allowance: it is not included in wages on the W-2, so it escapes federal and state income tax and Social Security and Medicare taxes. That tax advantage is part of what the Department of Defense counts in regular military compensation, along with basic pay and the housing allowance.' },
    { q: 'Do I lose BAS when I eat at the dining facility?', a: 'Officers and enlisted members who receive BAS pay for meals they eat in a dining facility at the meal rate. Enlisted members assigned to essential station messing, typically junior members living in barracks, have the cost of meals deducted from their BAS. Members in basic training receive no BAS because the government provides all meals.' },
    { q: 'Does BAS increase with dependents?', a: 'No. BAS covers only the member’s own meals and is the same for a single member and for one with a large family. Family needs are reflected in the housing allowance, which is higher with dependents, and in programs such as the Basic Needs Allowance for low-income members with dependents.' },
  ],
  body: (h) => `
<h2>BAS rates over the last years</h2>
${h.table(['Year', 'Officers', 'Enlisted', 'BAS II'], [['2026', usdx(B.officer), usdx(B.enlisted), usdx(B.basII)], ['2025', usdx(B25.officer), usdx(B25.enlisted), usdx(B25.enlisted * 2)]], 'Monthly rates effective January 1 of each year, DFAS.', ['l', 'r', 'r', 'r'])}
<p>Over a year, the 2026 rates come to ${usd(B.enlisted * 12)} for an enlisted member and ${usd(B.officer * 12)} for an officer, tax free. For a junior enlisted member, BAS adds about a sixth to basic pay; for a senior officer, much less in proportion.</p>
<h2>How BAS is set each year</h2>
<p>Title 37 of the U.S. Code ties BAS to food prices. Each January, the rate changes by the percentage increase in the monthly cost of the moderate-cost food plan for a male in the 20 to 50 age group, published by the Department of Agriculture. The enlisted rate was brought up to that benchmark by a transition that ended in the early 2000s; since then both rates move with it. A year of slower food inflation produces a smaller increase, and the rate has occasionally stayed flat, as in 2019.</p>
<h2>Who receives BAS, and who does not</h2>
<p>Officers receive BAS at all times, since they are expected to pay for their own meals. Enlisted members receive it when they are not provided meals at government expense: most enlisted members living off base, and many living on base. Members in basic training, at sea on ships where meals are provided, or in the field with rations generally receive no BAS or have meals deducted. Enlisted members on essential station messing receive BAS but pay for their meals in the dining facility through a deduction, so the cash they see is smaller.</p>
<h2>BAS II</h2>
<p>BAS II is an uncommon rate for enlisted members at a permanent duty station who are assigned to single government quarters without adequate food storage or preparation facilities, where no government mess is available and meals cannot otherwise be provided. It is twice the standard enlisted rate, ${usdx(B.basII)} in 2026, and must be authorized by the Secretary of the military department.</p>
<h2>BAS on the LES</h2>
<p>BAS appears as an entitlement on the Leave and Earnings Statement, with any meal deduction listed separately. Reservists on active duty for more than a few days receive it under the same rules; during inactive duty training periods they usually do not. When a member is hospitalized, BAS can be reduced for the days meals are provided. If BAS is missing from your LES, the finance office needs to know your meal status: whether you are assigned to essential station messing, in government quarters with a kitchen or living off base.</p>
<h2>BAS in the full pay picture</h2>
<p>BAS is the smallest of the three parts of regular military compensation. Basic pay depends on grade and years, BAH on grade, dependents and duty station, while BAS is almost a constant. The ${h.a('military-pay-calculator', 'military pay calculator')} adds the three for your situation, the ${h.a('military-pay-chart', '2026 pay chart')} gives basic pay for every grade, and the ${h.a('bah-calculator', 'BAH calculator')} the housing allowance by ZIP code.</p>
<h2>A practical example</h2>
<p>A junior enlisted member who moves out of the barracks after marrying sees BAS change from a deducted amount to a full cash payment of ${usdx(B.enlisted)}, on top of the new housing allowance at the with-dependents rate. A newly commissioned officer straight from a service academy receives the officer rate of ${usdx(B.officer)} from the first day of commissioned service, whatever the meal arrangement, and pays for any dining facility meal at the posted rate.</p>
<h2>Dual-military couples and BAS</h2>
<p>When two service members are married to each other, each receives BAS in their own right, at the rate of their own status: an enlisted spouse ${usdx(B.enlisted)}, an officer spouse ${usdx(B.officer)}. Their BAH follows separate rules, with at most one with-dependents rate when they have children, but BAS is never shared or reduced because of the marriage, and each spouse sees it on their own Leave and Earnings Statement. A couple of two enlisted members therefore receives ${usd(B.enlisted * 2 * 12)} a year of BAS in total. The same applies to reservists on active duty orders, who receive BAS for the days of the orders.</p>`,
  related: ['military-pay-calculator', 'military-pay-chart', 'bah-calculator', 'pay-junior-enlisted', 'pay-nco'],
  sources: ['dfasBas', 'dfasEnlisted'],
});
