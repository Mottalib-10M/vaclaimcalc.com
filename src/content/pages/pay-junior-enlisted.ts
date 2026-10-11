import { definePage } from '../../lib/page-types';
import { P, pay, basePay, bas, bah, steps, colLabel, usdx, usd, day, E1_UNDER_4_MONTHS } from '../../lib/kit';

const G = ['E-1', 'E-2', 'E-3', 'E-4'];
const Y = [0, 2, 3, 4, 6];

export default definePage({
  id: 'pay-junior-enlisted',
  group: 'pay',
  kind: 'grade',
  order: 200,
  slug: 'junior-enlisted-pay',
  nav: 'E-1 to E-4 pay',
  card: 'Private to specialist and corporal: 2026 basic pay, the two raises of 2025 and 2026, and BAH',
  title: `E-1 to E-4 Pay 2026: ${usdx(pay('E-1', 1))} to ${usdx(steps('E-4').top)} a Month`,
  description: `E-1 to E-4 pay 2026: ${usdx(pay('E-1', 1))} for an E-1, ${usdx(pay('E-3', 2))} for an E-3 over 2 years, up to ${usdx(steps('E-4').top)} for an E-4, after a 10% raise in 2025 and ${P.pay.raisePct}% in January 2026.`,
  h1: 'Junior enlisted pay (E-1 to E-4) in 2026',
  intro: 'Basic pay for the first four enlisted grades, why it rose twice in a year, and what a junior member really receives with the allowances.',
  resume: `An E-1 with four months of service or more earns ${usdx(pay('E-1', 1))} a month of basic pay in 2026, an E-2 ${usdx(pay('E-2', 1))}, an E-3 between ${usdx(steps('E-3').firstPay)} and ${usdx(steps('E-3').top)}, and an E-4 between ${usdx(steps('E-4').firstPay)} and ${usdx(steps('E-4').top)}. These grades received two raises in a row: an extra 10% on April 1, 2025, voted by Congress for junior enlisted members only, then the ${P.pay.raisePct}% raise of ${day(P.pay.effective)} that applied to everyone. The four grades cover the ranks from private or seaman recruit to specialist, corporal, petty officer third class, senior airman and the equivalents in the Space Force and Coast Guard. Their tables are short: E-1 and E-2 pay the same amount whatever the years, E-3 stops rising at over ${steps('E-3').lastYears} years and E-4 at over ${steps('E-4').lastYears}. Most junior members also receive BAS of ${usdx(bas('E-1'))} and, when they live off base, BAH.`,
  mini: 'gradePay',
  miniArg: { grades: G },
  faqs: [
    { q: 'How much does a private make in the Army in 2026?', a: `A private (E-1) earns ${usdx(pay('E-1', 1))} a month of basic pay after four months of service and ${usdx(E1_UNDER_4_MONTHS)} before. A private (E-2) earns ${usdx(pay('E-2', 1))}. On top come ${usdx(bas('E-1'))} of BAS when meals are not provided and BAH for those authorized to live off base, both tax free.` },
    { q: 'Why did junior enlisted pay go up 10% in 2025?', a: 'Congress included an extra 10% raise for grades E-1 to E-4 in the defense authorization act for fiscal year 2025, effective April 1, 2025, on top of the general raise of January 2025. The aim was to close the gap between junior enlisted pay and comparable civilian wages. The 2026 raise was then applied to the new, higher table.' },
    { q: 'What is E-4 BAH with dependents?', a: `It depends on the duty station: E-1 to E-4 receive the same with-dependents rate in each area. In 2026 that is ${usd(bah('TX286', 'E-4'))} at Fort Hood, ${usd(bah('VA298', 'E-4'))} in Norfolk and ${usd(bah('CA038', 'E-4'))} in San Diego. Without dependents, the E-4 rate is lower and many single junior members live in barracks without BAH.` },
    { q: 'When does an E-3 get a pay raise for time in service?', a: `The E-3 row has only two steps after the start: over 2 and over 3 years, ${usdx(pay('E-3', 2))} and ${usdx(pay('E-3', 3))}. After three years, only the yearly raise or a promotion to E-4 increases basic pay. Most members are promoted to E-4 well before that point.` },
  ],
  body: (h) => `
<h2>E-1 to E-4 basic pay, 2026</h2>
${h.table(['Years', ...G], Y.map((y, i) => [colLabel(i), ...G.map((g) => usdx(basePay(g, y) ?? 0))]), `Monthly basic pay, DFAS, effective ${day(P.pay.effective)}. E-1 with less than four months: ${usdx(E1_UNDER_4_MONTHS)}. Rows do not change after the columns shown.`, ['l', 'r', 'r', 'r', 'r'])}
<h2>A short table that rewards promotion</h2>
<p>Seniority counts for little in the junior grades. The E-1 and E-2 rows are flat, the E-3 row adds two small steps, the E-4 row a few more. What moves a junior member's pay is promotion, and the services promote quickly at this level: an E-1 typically becomes E-2 after six months, E-3 after a year and E-4 after two to three years, with variations by service and specialty. Going from E-2 to E-4 over 2 years raises basic pay by ${usdx(pay('E-4', 2) - pay('E-2', 2))} a month.</p>
<h2>What a junior member actually receives</h2>
<p>A single E-3 living in the barracks receives basic pay and little else in cash: no BAH, and BAS that may be deducted for dining facility meals. A married E-3 living off base receives the with-dependents BAH of the duty station on top. At Fort Bragg in 2026 that means ${usdx(pay('E-3', 2))} of basic pay, ${usd(bah('NC182', 'E-3'))} of BAH and ${usdx(bas('E-3'))} of BAS, about ${usd(pay('E-3', 2) + bah('NC182', 'E-3') + bas('E-3'))} a month, of which only basic pay is taxed. The ${h.a('military-pay-calculator', 'military pay calculator')} does this sum for any station.</p>
<h2>Saving early: the TSP match</h2>
<p>Members who joined on or after January 1, 2018 are in the Blended Retirement System. The service puts 1% of basic pay into the Thrift Savings Plan automatically and matches the member's own contributions with up to 4% more once matching applies, and members who joined since October 1, 2020 are enrolled at 5% of basic pay by default. For an E-4 over 2 years, contributing 5% costs ${usdx(pay('E-4', 2) * 0.05)} a month and, with the full match, brings the same amount from the service. The ${h.a('tsp-calculator', 'TSP calculator')} shows where that leads.</p>
<p>The next grades, sergeant and staff sergeant or petty officer second and first class, are on the ${h.a('pay-nco', 'E-5 and E-6 page')}.</p>
<h2>Junior pay and the grade titles of each service</h2>
<p>The same table covers every branch, only the titles change. E-1 is private in the Army and Marine Corps, seaman recruit in the Navy and Coast Guard, airman basic in the Air Force and specialist 1 in the Space Force. E-4 is specialist or corporal in the Army, lance corporal is E-3 in the Marine Corps, petty officer third class in the Navy and Coast Guard, senior airman in the Air Force and specialist 4 in the Space Force. An Army corporal and an Army specialist earn the same basic pay, although the corporal is a noncommissioned officer.</p>
<p>Members in their first enlistment also see their pay entry base date set on the day they enter active duty or a reserve component, so the columns of the table count from that date even when part of the time was spent in training.</p>`,
  related: ['pay-nco', 'military-pay-chart', 'military-pay-calculator', 'bas-rates', 'tsp-calculator'],
  sources: ['dfasEnlisted', 'dfasBas', 'dtmoBah'],
});
