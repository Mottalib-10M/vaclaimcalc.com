import { definePage } from '../../lib/page-types';
import { P, pay, basePay, steps, colLabel, colIndex, bah, multiplier, usdx, usd, day, CAP_O6 } from '../../lib/kit';

const G = ['O-4', 'O-5', 'O-6'];
const Y = [10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30];
const cell = (g: string, y: number) => { const v = basePay(g, y); return v == null ? 'n/a' : usdx(v); };
const ret = (g: string, y: number, plan: 'high3' | 'brs') => (pay(g, y - 1) * multiplier(plan, y)) / 100;

export default definePage({
  id: 'pay-field-grade',
  group: 'pay',
  kind: 'grade',
  order: 260,
  slug: 'field-grade-officer-pay-o4-o6',
  nav: 'O-4 to O-6 pay',
  card: 'Major to colonel (lieutenant commander to captain): 2026 pay, the O-6 cap and retirement',
  title: `O-4 to O-6 Pay 2026: Major, Lieutenant Colonel, Colonel`,
  description: `O-4 to O-6 pay 2026: an O-4 over 12 years earns ${usdx(pay('O-4', 12))}, an O-5 over 18 ${usdx(pay('O-5', 18))}, an O-6 over 22 ${usdx(pay('O-6', 22))} a month; the O-6 row is capped at ${usdx(CAP_O6)}.`,
  h1: 'Field grade officer pay (O-4 to O-6) in 2026',
  intro: 'Basic pay of majors, lieutenant colonels and colonels (lieutenant commanders, commanders and Navy captains), with the 2026 cap and what these grades mean at retirement.',
  resume: `An O-4, major or lieutenant commander, with more than twelve years earns ${usdx(pay('O-4', 12))} a month of basic pay in 2026; an O-5, lieutenant colonel or commander, with more than eighteen years ${usdx(pay('O-5', 18))}; and an O-6, colonel or Navy captain, with more than twenty-two years ${usdx(pay('O-6', 22))}, after the ${P.pay.raisePct}% raise of ${day(P.pay.effective)}. The field grade rows run long: the O-4 row rises until over ${steps('O-4').lastYears} years, the O-5 row until over ${steps('O-5').lastYears} and the O-6 row until over ${steps('O-6').lastYears}. The O-6 row meets a ceiling written in law: basic pay for O-6 and below cannot exceed Level V of the Executive Schedule, ${usdx(CAP_O6)} a month in 2026, and the DFAS table shows the capped amounts in its last columns. These are the grades at which most officers retire, typically as an O-5 at twenty to twenty-four years or an O-6 at twenty-six to thirty, so their tables decide most officer pensions.`,
  mini: 'gradePay',
  miniArg: { grades: G },
  faqs: [
    { q: 'How much does a lieutenant colonel make in 2026?', a: `An O-5 earns ${usdx(pay('O-5', 16))} a month with more than sixteen years and ${usdx(pay('O-5', 20))} with more than twenty, in basic pay. With officer BAS and BAH, for example ${usd(bah('DC053', 'O-5'))} with dependents in the Washington area, monthly compensation in that area exceeds ${usd(Math.floor((pay('O-5', 20) + bah('DC053', 'O-5')) / 1000) * 1000)} before taxes.` },
    { q: 'What is the pay cap for an O-6 in 2026?', a: `Basic pay for grades O-6 and below is limited to Level V of the Executive Schedule, ${usdx(CAP_O6)} a month in 2026. The cap affects only the longest-serving colonels and Navy captains: the O-6 row reaches it at over ${steps('O-6').lastYears} years. General and flag officers have a higher cap, tied to Level II.` },
    { q: 'How much is O-5 retirement pay at 20 years?', a: `Using the 2026 rate of the nineteenth year, ${usdx(pay('O-5', 19))}, as an estimate of the high-36 average, an O-5 retiring at twenty years would receive about ${usd(ret('O-5', 20, 'high3'))} a month under High-3 and ${usd(ret('O-5', 20, 'brs'))} under the Blended Retirement System, before the yearly cost-of-living adjustments and the Survivor Benefit Plan premium.` },
    { q: 'Is a Navy captain paid the same as an Army captain?', a: `No. A Navy captain is an O-6, paid like an Army, Air Force or Marine Corps colonel: ${usdx(pay('O-6', 22))} at more than twenty-two years in 2026. An Army captain is an O-3. The grade, not the title, decides the pay, and the same DFAS table applies to every service.` },
  ],
  body: (h) => `
<h2>O-4 to O-6 basic pay, 2026</h2>
${h.table(['Years', ...G], Y.map((y) => [colLabel(colIndex(y)), ...G.map((g) => cell(g, y))]), `Monthly basic pay, DFAS, effective ${day(P.pay.effective)}, with the Level V cap of ${usdx(CAP_O6)}.`, ['l', 'r', 'r', 'r'])}
<h2>Promotion points and pay</h2>
<p>Field grade promotions come later and less surely than junior ones. An officer typically becomes an O-4 around the tenth year, an O-5 around the sixteenth and, for a minority, an O-6 around the twenty-second, with variations by service and career field. Each promotion moves the officer to a higher row at the same seniority: at sixteen years, the O-4 rate is ${usdx(pay('O-4', 16))} and the O-5 rate ${usdx(pay('O-5', 16))}, ${usdx(pay('O-5', 16) - pay('O-4', 16))} more a month. Officers who are not selected twice for the next grade generally have to leave unless they are close to retirement, which is why these steps matter for planning.</p>
<h2>The officer retirement at these grades</h2>
${h.table(['Retirement', 'High-3 (estimate)', 'BRS (estimate)'], [['O-4 at 20 years', 'O-4', 20], ['O-5 at 22 years', 'O-5', 22], ['O-6 at 26 years', 'O-6', 26], ['O-6 at 30 years', 'O-6', 30]].map(([l, g, y]) => [l as string, usd(ret(g as string, y as number, 'high3')), usd(ret(g as string, y as number, 'brs'))]), 'Monthly gross retired pay with the 2026 basic pay of the year before retirement as the high-36 estimate.', ['l', 'r', 'r'])}
<p>Officers in the grades of O-5 and above must normally serve three years in the grade to retire in it; retiring earlier usually means retiring in the previous grade, which lowers the pension even though the high-36 average already reflects the higher pay. The ${h.a('military-retirement-calculator', 'retirement calculator')} accepts your own high-36 average and months of service, and the ${h.a('military-retirement-pay', 'military retirement pay page')} shows the figures for other grades.</p>
<h2>Allowances at field grade</h2>
<p>BAH at these grades is priced on larger homes, so it is the highest of the officer table below the general officer grades: with dependents, an O-5 receives ${usd(bah('CA038', 'O-5'))} in San Diego, ${usd(bah('VA298', 'O-5'))} in Norfolk and ${usd(bah('CO046', 'O-5'))} in Colorado Springs in 2026. The ${h.a('bah-rates', 'BAH rates page')} lists every area. The grades above O-6 have their own page: ${h.a('pay-general', 'general and flag officer pay')}.</p>
<h2>Where the O-6 cap starts to matter</h2>
<p>The Level V cap is ${usdx(CAP_O6)} a month in 2026. The uncapped O-6 rate would pass it only in the last columns, so the cap concerns colonels and Navy captains with very long careers, generally beyond twenty-six years. For them, the yearly raise may be partly or entirely absorbed by the cap if the Executive Schedule rises less than military pay. Officers at lower grades are not affected at all, and the O-4 and O-5 rows stay well below the cap at every seniority.</p>
<h2>Field grade officers with prior enlisted service</h2>
<p>The O-1E to O-3E rates end at promotion to O-4. A major who was a sergeant for six years is paid from the same O-4 row as any other major, with the years of enlisted service counted in the column. At fourteen years, that is ${usdx(pay('O-4', 14))} a month, whatever the path to the grade.</p>
<p>Reserve component field grade officers are paid from the same rows during active duty and by drill periods otherwise, one thirtieth of the monthly rate for each period, which is why the table also appears in reserve pay calculations.</p>`,
  related: ['pay-junior-officer', 'pay-general', 'military-pay-chart', 'military-retirement-calculator', 'military-retirement-pay'],
  sources: ['dfasOfficer', 'usc1409'],
});
