import { definePage } from '../../lib/page-types';
import { P, bah, bah25, usd, mhaLabel, MHAS, BAH_COST_SHARE } from '../../lib/kit';

const withRates = MHAS.filter((m) => m.w);
const by = (g: number) => withRates.map((m) => ({ c: m.code, v: m.w![g] })).sort((a, b) => b.v - a.v);
const top = by(4).slice(0, 10);
const bottom = by(4).slice(-10).reverse();
const ups = withRates.map((m) => ({ c: m.code, d: m.w![4] - bah25(m.code, 'E-5') })).sort((a, b) => b.d - a.d);
const nUp = ups.filter((x) => x.d > 0).length, nDown = ups.filter((x) => x.d < 0).length;

export default definePage({
  id: 'bah-rates',
  group: 'bah',
  kind: 'pillar',
  order: 20,
  slug: 'bah-rates',
  nav: 'BAH rates 2026',
  card: 'Every 2026 housing area with its rates, the highest and lowest areas and the changes from 2025',
  title: 'BAH Rates 2026: Every Military Housing Area, All Grades',
  description: `BAH rates 2026 for all ${withRates.length} military housing areas: highest ${usd(top[0].v)} and lowest ${usd(bottom[0].v)} for an E-5 with dependents. ${nUp} areas rose from 2025, ${nDown} went down.`,
  h1: 'BAH rates 2026 for every housing area',
  intro: 'Search the 2026 BAH of every military housing area for any grade, then see which areas pay the most and the least and how the rates moved from 2025.',
  resume: `The Defense Travel Management Office published 2026 BAH rates for ${withRates.length} military housing areas in the United States, effective January 1, 2026. For an E-5 with dependents, the highest rate is ${usd(top[0].v)} a month in ${mhaLabel(top[0].c)} and the lowest ${usd(bottom[0].v)} in ${mhaLabel(bottom[0].c)}. Compared with 2025, the E-5 family rate rose in ${nUp} areas and fell in ${nDown}, the others staying flat; members already in an area where the rate fell keep the 2025 amount through rate protection. Each rate covers the median rent and average utilities of the housing standard set for the grade, minus a ${BAH_COST_SHARE}% member cost share. The table below lets you search any area by name or state and change the grade; the tables after it rank the areas and list the largest changes. For a single ZIP code, the BAH calculator finds the area for you.`,
  tool: 'bahtable',
  faqs: [
    { q: 'Where is BAH the highest in 2026?', a: `For an E-5 with dependents, in ${mhaLabel(top[0].c)} at ${usd(top[0].v)} a month, followed by ${mhaLabel(top[1].c)} (${usd(top[1].v)}) and ${mhaLabel(top[2].c)} (${usd(top[2].v)}). High rates follow high rents: the San Francisco Bay Area, the New York area, Boston and Maui lead the list, with San Diego just behind. The ranking can differ slightly for other grades.` },
    { q: 'Where is BAH the lowest in 2026?', a: `For an E-5 with dependents, in ${mhaLabel(bottom[0].c)} at ${usd(bottom[0].v)} a month, then ${mhaLabel(bottom[1].c)} (${usd(bottom[1].v)}) and ${mhaLabel(bottom[2].c)} (${usd(bottom[2].v)}). Low rates follow low local rents and are mostly found around installations in the South and the Plains, such as Fort Polk, Fort Sill and Fort Riley.` },
    { q: 'When do BAH rates change?', a: 'Once a year, on January 1, after the annual survey of rents and utilities in every housing area. The DTMO publishes the new rates in December. Your own rate also changes when you are promoted, when your dependency status changes or when you move to a new permanent duty station.' },
    { q: 'Why did BAH go down in some areas in 2026?', a: `Because the survey found lower median rents or utility costs for the housing profiles priced in those areas. In ${nDown} areas the E-5 family rate is lower than in 2025. Members who were entitled to BAH there on December 31, 2025 keep their 2025 rate under rate protection; newcomers receive the 2026 rate.` },
    { q: 'Are BAH rates the same for all services?', a: 'Yes. Army, Navy, Air Force, Marine Corps, Space Force and Coast Guard members, and the commissioned officers of the Public Health Service and NOAA, receive the same BAH for the same grade, dependency status and duty station. The rates are set by the Department of Defense for all uniformed services.' },
    { q: 'Do reservists get the full BAH rate?', a: 'Reserve and Guard members on active duty orders of more than 30 days receive the full BAH of their duty station. For orders of 30 days or less, they receive a lower reserve component rate, which does not depend on location, unless the orders support a contingency operation.' },
  ],
  body: (h) => `
<h2>The ten highest housing areas</h2>
${h.table(['Housing area', 'E-5 with dependents', 'O-3 with dependents'], top.map((x) => [mhaLabel(x.c), usd(x.v), usd(bah(x.c, 'O-3'))]), 'Monthly BAH 2026, DTMO, ranked by the E-5 rate with dependents.', ['l', 'r', 'r'])}
<h2>The ten lowest housing areas</h2>
${h.table(['Housing area', 'E-5 with dependents', 'O-3 with dependents'], bottom.map((x) => [mhaLabel(x.c), usd(x.v), usd(bah(x.c, 'O-3'))]), 'Monthly BAH 2026, DTMO, lowest first.', ['l', 'r', 'r'])}
<h2>Largest changes from 2025</h2>
${h.table(['Housing area', '2025', '2026', 'Change'], [...ups.slice(0, 5), ...ups.slice(-5).reverse()].map((x) => [mhaLabel(x.c), usd(bah25(x.c, 'E-5')), usd(bah(x.c, 'E-5')), `${x.d >= 0 ? '+' : '−'}${usd(Math.abs(x.d))}`]), 'E-5 with dependents, monthly, DTMO 2025 and 2026 rates: five largest increases, then five largest decreases.', ['l', 'r', 'r', 'r'])}
<h2>Reading the rates</h2>
<p>A housing area is a group of ZIP codes where members of one or several installations live. Names follow the installation or the main city, and some keep historic names. The rates differ by grade because the DoD prices a different home for each grade, and by dependency status because members with dependents are priced on larger homes. To find the area of a duty station, use the ${h.a('bah-calculator', 'BAH calculator')}; to combine BAH with basic pay and BAS, the ${h.a('military-pay-calculator', 'military pay calculator')}. Pages for the large areas explain their own particularities: ${h.a('bah-honolulu', 'Hawaii')}, ${h.a('bah-camp-pendleton', 'Camp Pendleton')}, ${h.a('bah-colorado-springs', 'Colorado Springs')}, ${h.a('bah-san-antonio', 'San Antonio')}, ${h.a('bah-camp-lejeune', 'Camp Lejeune')} and ${h.a('bah-fort-campbell', 'Fort Campbell')}.</p>
<h2>How the areas are drawn</h2>
<p>The DTMO keeps a file that assigns each of the ${P.bah.zips.toLocaleString('en-US')} ZIP codes it uses to one housing area. Areas are built around installations and the commuting zones of their members, so a large metropolitan area may hold one area or several, and a remote installation can have its own area even in a thinly populated county. ZIP codes far from any installation are grouped by county into cost groups, which is why some names in the table read "County Cost Group" rather than a city. Recruiters, ROTC instructors and others stationed far from a base fall into those groups.</p>
<h2>Using the search table</h2>
<p>Type part of a name, such as "Fort", "AFB" or a two-letter state code, to filter the list; change the grade to see the rates of any grade from E-1 to O-10. The two columns give the monthly rate with dependents and without dependents. The ranking tables below use the E-5 rate with dependents, the grade most often quoted, but the order can differ for officers because the housing profiles priced for each grade follow different segments of the local rental market.</p>
<h2>What moved the rates in 2026</h2>
<p>The annual survey measures rents for each housing profile in every area, along with electricity, heating fuel and water costs. Areas where rents for family homes rose saw the largest increases; areas where new supply or softer demand lowered rents saw decreases. Because the member cost share is fixed at ${BAH_COST_SHARE}%, the change in the published rate follows the change in measured cost closely. The two lists below show the extremes for the E-5 family rate; most areas moved by a few percent.</p>`,
  related: ['bah-calculator', 'military-pay-calculator', 'bah-honolulu', 'bah-washington-dc', 'gi-bill-housing-allowance'],
  sources: ['dtmoBah', 'dtmoBah2025', 'dtmoComponents'],
});
