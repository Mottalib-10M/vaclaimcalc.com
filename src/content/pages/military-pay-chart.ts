import { definePage } from '../../lib/page-types';
import { P, pay, basePay, steps, GRADES, colLabel, colIndex, usdx, day, E1_UNDER_4_MONTHS, CAP_O7, CAP_O6 } from '../../lib/kit';

const Y = [0, 2, 3, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40];
const cell = (g: string, y: number) => { const v = basePay(g, y); return v == null ? 'n/a' : usdx(v); };
const tbl = (gs: string[], h: { table: (a: string[], b: Array<Array<string | number>>, c?: string, d?: Array<'l' | 'r'>) => string }, cap: string) =>
  h.table(['Years', ...gs], Y.map((y) => [colLabel(colIndex(y)), ...gs.map((g) => cell(g, y))]), cap, ['l', ...gs.map(() => 'r' as const)]);
const EN = GRADES.filter((g) => g.startsWith('E'));
const WO = GRADES.filter((g) => g.startsWith('W'));
const OF = ['O-1', 'O-2', 'O-3', 'O-4', 'O-5', 'O-6', 'O-7', 'O-8', 'O-9', 'O-10'];
const OE = ['O-1E', 'O-2E', 'O-3E'];

export default definePage({
  id: 'military-pay-chart',
  group: 'pay',
  kind: 'pillar',
  order: 10,
  slug: 'military-pay-chart',
  nav: 'Military pay chart 2026',
  card: 'The complete DFAS basic pay tables for 2026: enlisted, warrant, officer and O-1E to O-3E',
  title: 'Military Pay Chart 2026: Basic Pay by Grade and Years',
  description: `Military pay chart 2026 with the ${P.pay.raisePct}% raise: E-1 ${usdx(pay('E-1', 1))}, E-5 over 4 years ${usdx(pay('E-5', 4))}, O-3 over 6 ${usdx(pay('O-3', 6))} a month. Full DFAS tables and a lookup tool.`,
  h1: 'Military pay chart 2026',
  intro: 'Monthly basic pay for every grade and every step of seniority, from the DFAS tables effective January 1, 2026, with a lookup for your own grade.',
  resume: `Military basic pay rose by ${P.pay.raisePct}% on ${day(P.pay.effective)} for every grade, active duty and reserve alike. In 2026 an E-1 with at least four months of service earns ${usdx(pay('E-1', 1))} a month, an E-5 with more than four years ${usdx(pay('E-5', 4))}, an E-7 with more than ten years ${usdx(pay('E-7', 10))}, an O-1 ${usdx(pay('O-1', 0))} on commissioning, an O-3 with more than six years ${usdx(pay('O-3', 6))} and a W-2 with more than eight years ${usdx(pay('W-2', 8))}. The tables below are the DFAS tables, read on dfas.mil, for enlisted members, warrant officers, commissioned officers and officers with more than four years of prior enlisted or warrant service (O-1E to O-3E). Basic pay is only part of military compensation: the housing allowance, the subsistence allowance and special pays come on top, and the first two are not taxed. The lookup gives one cell and the whole row of your grade.`,
  tool: 'paychart',
  toolProps: { grade: 'E-5', years: 4 },
  faqs: [
    { q: 'How much was the military pay raise for 2026?', a: `${P.pay.raisePct}%, effective ${day(P.pay.effective)}, for all grades. It followed the April 2025 increase of 10% that applied only to junior enlisted grades E-1 to E-4, so those grades received two raises within a year. Basic Allowance for Subsistence rose to ${usdx(P.pay.bas.enlisted)} for enlisted members in 2026.` },
    { q: 'What is E-1 pay in 2026?', a: `${usdx(pay('E-1', 1))} a month for an E-1 with four months of service or more, and ${usdx(E1_UNDER_4_MONTHS)} during the first four months. E-1 pay does not rise with seniority: the whole row of the table holds the same amount. Promotion to E-2, usually after six months, brings ${usdx(pay('E-2', 1))}.` },
    { q: 'How are years of service counted in the pay chart?', a: 'From the pay entry base date, which counts all creditable service in the uniformed services, active or reserve. A column applies once you have more than the number of years it shows: "over 4" starts the day after your fourth anniversary. Officer training at a service academy does not count, but prior enlisted service does.' },
    { q: 'Is there a maximum for military basic pay in 2026?', a: `Yes. Basic pay is capped at Level II of the Executive Schedule, ${usdx(CAP_O7)} a month, for general and flag officers (O-7 to O-10), and at Level V, ${usdx(CAP_O6)}, for grades O-6 and below. The DFAS tables already show the capped amounts, which is why O-9 and O-10 have the same figure in every column.` },
    { q: 'Do reservists use the same military pay chart?', a: 'Yes. Reserve and National Guard members are paid from the same tables: for each drill period they receive one thirtieth of the monthly basic pay of their grade and years, so a typical weekend of four drill periods pays four thirtieths. On active duty orders, they receive the monthly amounts in full, with the allowances.' },
    { q: 'What does O-1E mean on the officer pay chart?', a: `O-1E, O-2E and O-3E are the rates for officers in those grades who have more than four years of active enlisted or warrant officer service. They are higher than the regular O-1 to O-3 rates: an O-3E with more than ten years earns ${usdx(pay('O-3E', 10))} against ${usdx(pay('O-3', 10))} for an O-3. The higher rates stop at promotion to O-4.` },
  ],
  body: (h) => `
<h2>Enlisted basic pay, 2026</h2>
${tbl(EN, h, 'Monthly basic pay, DFAS, effective January 1, 2026. n/a: no rate at that seniority. E-1 with less than four months: ' + usdx(E1_UNDER_4_MONTHS) + '.')}
<h2>Warrant officer basic pay, 2026</h2>
${tbl(WO, h, 'Monthly basic pay, DFAS, effective January 1, 2026.')}
<h2>Commissioned officer basic pay, 2026</h2>
${tbl(OF, h, `Monthly basic pay, DFAS, effective January 1, 2026, with the caps of ${usdx(CAP_O7)} (O-7 to O-10) and ${usdx(CAP_O6)} (O-6 and below).`)}
<h2>Officers with prior enlisted service (O-1E to O-3E)</h2>
${tbl(OE, h, 'Monthly basic pay for officers with more than four years of active enlisted or warrant service, DFAS, effective January 1, 2026.')}
<h2>How to read the chart</h2>
<p>Find your grade at the top of the column and your years of service on the left. The column "2 or less" applies during your first two years, then "over 2", "over 3", "over 4" and every two years after that. Each grade has a ceiling: the E-5 row stops rising at over ${steps('E-5').lastYears} years, the E-6 row at over ${steps('E-6').lastYears}, the E-7 row at over ${steps('E-7').lastYears}, the O-3 row at over ${steps('O-3').lastYears}. Some cells are empty because nobody is paid at that grade with so few years: the E-9 row starts at ${steps('E-9').firstCol.toLowerCase()} years, the W-5 row at ${steps('W-5').firstCol.toLowerCase()}.</p>
<p>Basic pay is taxable income. The housing allowance (${h.a('bah-calculator', 'BAH by ZIP code')}) and the subsistence allowance (${h.a('bas-rates', 'BAS 2026')}) are not, which is why comparing a military salary with a civilian one on basic pay alone understates it. The ${h.a('military-pay-calculator', 'military pay calculator')} adds them for your duty station. Grade groups have their own pages, such as ${h.a('pay-junior-enlisted', 'E-1 to E-4 pay')} or ${h.a('pay-junior-officer', 'O-1 to O-3 pay')}.</p>
<h2>What the 2026 raise did to each grade</h2>
<p>The ${P.pay.raisePct}% increase applies to every cell of the table, so the gain in dollars grows with grade and seniority. For an E-4 over 3 years, it is about ${usdx(pay('E-4', 3) - pay('E-4', 3) / (1 + P.pay.raisePct / 100))} a month; for an E-7 over 14, about ${usdx(pay('E-7', 14) - pay('E-7', 14) / (1 + P.pay.raisePct / 100))}; for an O-5 over 18, about ${usdx(pay('O-5', 18) - pay('O-5', 18) / (1 + P.pay.raisePct / 100))}. The rule behind the percentage is set in Title 37 of the U.S. Code: the yearly raise follows the change in private-sector wages measured by the Employment Cost Index unless Congress sets another figure in the defense authorization act. Officers at the caps gain less, because the cap itself moves with the Executive Schedule.</p>
<h2>When basic pay is paid</h2>
<p>Active duty members are paid twice a month, on the 1st and the 15th, each payment being half of the monthly entitlements minus deductions; when the date falls on a weekend or a federal holiday, the money arrives the business day before. The Leave and Earnings Statement shows basic pay, allowances, taxes, TSP contributions and the pay entry base date that sets your column. Reservists are paid for drills after the month in which they are performed.</p>
<p>The Coast Guard, the commissioned corps of the Public Health Service and the NOAA Corps use the same basic pay tables as the Army, Navy, Air Force, Marine Corps and Space Force, so a lieutenant in any of these services with the same years earns the same basic pay.</p>`,
  related: ['military-pay-calculator', 'bas-rates', 'pay-nco', 'pay-junior-officer', 'bah-calculator', 'military-retirement-calculator'],
  sources: ['dfasEnlisted', 'dfasOfficer', 'dfasWarrant', 'dfasOE', 'dfasBas'],
});
