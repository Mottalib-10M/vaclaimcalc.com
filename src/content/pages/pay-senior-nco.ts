import { definePage } from '../../lib/page-types';
import { P, pay, basePay, steps, colLabel, colIndex, multiplier, usdx, usd, day, bah } from '../../lib/kit';
import T from '../../data/pay-2026.json';

const G = ['E-7', 'E-8', 'E-9'];
const Y = [0, 8, 10, 12, 16, 20, 22, 24, 26, 30, 34, 38];
const cell = (g: string, y: number) => { const v = basePay(g, y); return v == null ? 'n/a' : usdx(v); };
const ret = (g: string, y: number, plan: 'high3' | 'brs') => (pay(g, y - 1) * multiplier(plan, y)) / 100;

export default definePage({
  id: 'pay-senior-nco',
  group: 'pay',
  kind: 'grade',
  order: 220,
  slug: 'senior-nco-pay-e7-e9',
  nav: 'E-7 to E-9 pay',
  card: 'Sergeant first class to sergeant major (chief to master chief): 2026 pay and the long tables',
  title: `E-7, E-8 and E-9 Pay 2026: Senior NCO Basic Pay by Year`,
  description: `E-7 to E-9 pay 2026: an E-7 over 10 years earns ${usdx(pay('E-7', 10))}, an E-8 over 16 ${usdx(pay('E-8', 16))} and an E-9 over 20 ${usdx(pay('E-9', 20))} a month after the ${P.pay.raisePct}% raise of January.`,
  h1: 'Senior enlisted pay (E-7 to E-9) in 2026',
  intro: 'Basic pay of the senior noncommissioned grades, the years at which each row starts and stops, and what these grades mean for a 20-year retirement.',
  resume: `An E-7 with more than ten years of service earns ${usdx(pay('E-7', 10))} a month of basic pay in 2026, an E-8 with more than sixteen years ${usdx(pay('E-8', 16))} and an E-9 with more than twenty years ${usdx(pay('E-9', 20))}, after the ${P.pay.raisePct}% raise of ${day(P.pay.effective)}. Unlike the junior grades, the senior enlisted tables keep climbing for decades. The E-7 row rises until over ${steps('E-7').lastYears} years, the E-8 row until over ${steps('E-8').lastYears} and the E-9 row until over ${steps('E-9').lastYears}, reaching ${usdx(steps('E-9').top)}. The rows also start late: DFAS shows no E-8 rate before over ${steps('E-8').firstCol.replace('Over ', '')} years and no E-9 rate before over ${steps('E-9').firstCol.replace('Over ', '')}. E-7 is sergeant first class, gunnery sergeant, chief petty officer or master sergeant; E-9 is sergeant major, master gunnery sergeant, master chief petty officer or chief master sergeant. The senior enlisted advisor of each service is paid a single rate, ${usdx(T.seniorEnlistedAdvisor)}.`,
  mini: 'gradePay',
  miniArg: { grades: G },
  faqs: [
    { q: 'How much does an E-9 make in 2026?', a: `Between ${usdx(steps('E-9').firstPay)} a month (${steps('E-9').firstCol.toLowerCase()} years) and ${usdx(steps('E-9').top)} (over ${steps('E-9').lastYears} years) in basic pay. The Sergeant Major of the Army, the Master Chief Petty Officer of the Navy and the other senior enlisted advisors receive ${usdx(T.seniorEnlistedAdvisor)} whatever their years. BAH and BAS come on top.` },
    { q: 'What is E-7 pay with 20 years of service?', a: `${usdx(pay('E-7', 20))} a month of basic pay in 2026 for an E-7 with more than 20 years. Retiring at that point under High-3 would give about ${usd(ret('E-7', 20, 'high3'))} a month, and under the Blended Retirement System about ${usd(ret('E-7', 20, 'brs'))}, using the 2026 rates as the high-36 average.` },
    { q: 'Why does the E-8 pay chart start at 8 years?', a: 'Because no one reaches E-8 with less service: promotion to master sergeant, first sergeant, senior chief or senior master sergeant requires years of time in service set by each branch, and the pay table leaves the earlier cells blank. The same is true of the E-9 row, which starts at over 10 years.' },
    { q: 'Do senior NCOs keep getting raises after 20 years?', a: `Yes, unlike E-5 and E-6. An E-9 gets step increases at over 22, 24, 26, 30, 34 and 38 years, and an E-8 until over ${steps('E-8').lastYears}. The E-7 row stops at over ${steps('E-7').lastYears}. These late steps raise the retirement base for members who serve past 20.` },
  ],
  body: (h) => `
<h2>E-7 to E-9 basic pay, 2026</h2>
${h.table(['Years', ...G], Y.map((y) => [colLabel(colIndex(y)), ...G.map((g) => cell(g, y))]), `Monthly basic pay, DFAS, effective ${day(P.pay.effective)}. n/a: no rate at that seniority.`, ['l', 'r', 'r', 'r'])}
<h2>Long tables, late steps</h2>
<p>The senior enlisted rows are the only enlisted rows that keep rewarding time after twenty years. An E-9 who stays to thirty years earns ${usdx(pay('E-9', 30))} instead of ${usdx(pay('E-9', 20))} at twenty, and the last step, at over thirty-eight years, brings ${usdx(steps('E-9').top)}. Few members get there, because high-year tenure limits time in service for each grade, but the steps between twenty and thirty matter for anyone weighing a few more years against retirement. Each extra year adds to the multiplier as well as to the pay base.</p>
<h2>The retirement arithmetic of a senior NCO</h2>
${h.table(['Grade and years at retirement', 'High-3 (estimate)', 'BRS (estimate)'], [['E-7, 20 years', 'E-7', 20], ['E-8, 22 years', 'E-8', 22], ['E-9, 24 years', 'E-9', 24], ['E-9, 30 years', 'E-9', 30]].map(([l, g, y]) => [l as string, usd(ret(g as string, y as number, 'high3')), usd(ret(g as string, y as number, 'brs'))]), 'Monthly gross retired pay, using the 2026 basic pay of the year before retirement as an estimate of the high-36 average.', ['l', 'r', 'r'])}
<p>The estimate is a little high for a member retiring today, because the high-36 average reaches back three years to lower rates, but it shows the scale. Under High-3, each year adds ${P.retire.high3Mult}% of the pay base; under BRS, ${P.retire.brsMult}%. The ${h.a('military-retirement-calculator', 'retirement calculator')} lets you enter your own average and months of service.</p>
<h2>What the grades are called</h2>
<p>The table is the same for every branch. E-7 is sergeant first class in the Army, gunnery sergeant in the Marine Corps, chief petty officer in the Navy and Coast Guard, master sergeant in the Air Force and Space Force. E-8 is master sergeant or first sergeant in the Army and Marine Corps, senior chief petty officer in the Navy and Coast Guard, senior master sergeant in the Air Force and Space Force. E-9 is sergeant major, command sergeant major or master gunnery sergeant, master chief petty officer, and chief master sergeant.</p>
<p>Housing allowances also rise with these grades, since the DoD prices a larger home for each one; compare a station on the ${h.a('bah-rates', 'BAH rates page')}. The ${h.a('pay-nco', 'E-5 and E-6 page')} covers the grades below, and the ${h.a('pay-warrant', 'warrant officer page')} the path many senior NCOs take.</p>
<h2>Senior NCO, warrant officer or officer?</h2>
<p>Many senior NCOs consider a warrant or a commission around the ten-year mark. The pay tables show what each path is worth at the same seniority, since prior enlisted years count toward the officer and warrant columns.</p>
${h.table(['Path at 12 years of service', 'Basic pay per month'], [['E-7, staying enlisted', usdx(pay('E-7', 12))], ['E-8, after promotion', usdx(pay('E-8', 12))], ['W-2, after appointment', usdx(pay('W-2', 12))], ['O-2E, commissioned with prior service', usdx(pay('O-2E', 12))]], 'DFAS basic pay effective January 1, 2026.', ['l', 'r'])}
<p>The comparison leaves out the length of the remaining career, which differs by path, and the allowances, which rise with grade in all cases. An enlisted member commissioned with more than four years of active enlisted or warrant service is paid at the O-1E to O-3E rates, higher than the regular O-1 to O-3 rates; see the ${h.a('pay-prior-enlisted', 'prior enlisted officer page')}.</p>
<h2>Housing at the senior enlisted grades</h2>
<p>The with-dependents BAH climbs with each grade. In San Antonio in 2026, an E-7 with dependents receives ${usd(bah('TX285', 'E-7'))} a month, an E-8 ${usd(bah('TX285', 'E-8'))} and an E-9 ${usd(bah('TX285', 'E-9'))}; in Honolulu the same grades receive ${usd(bah('HI408', 'E-7'))}, ${usd(bah('HI408', 'E-8'))} and ${usd(bah('HI408', 'E-9'))}. Members stationed at a recruiting post or a joint headquarters far from a base receive the rate of that ZIP code, which can be very different from the nearest installation.</p>`,
  related: ['pay-nco', 'pay-warrant', 'military-pay-chart', 'military-retirement-calculator', 'military-retirement-pay'],
  sources: ['dfasEnlisted', 'usc1409'],
});
