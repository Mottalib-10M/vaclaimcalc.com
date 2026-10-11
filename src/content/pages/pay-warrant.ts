import { definePage } from '../../lib/page-types';
import { P, pay, basePay, steps, colLabel, colIndex, bas, bah, multiplier, usdx, usd, day } from '../../lib/kit';

const G = ['W-1', 'W-2', 'W-3', 'W-4', 'W-5'];
const Y = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 30];
const cell = (g: string, y: number) => { const v = basePay(g, y); return v == null ? 'n/a' : usdx(v); };

export default definePage({
  id: 'pay-warrant',
  group: 'pay',
  kind: 'grade',
  order: 230,
  slug: 'warrant-officer-pay',
  nav: 'Warrant officer pay',
  card: 'W-1 to W-5 basic pay in 2026, officer BAS, and how prior enlisted years count',
  title: `Warrant Officer Pay 2026: W-1 to W-5 Basic Pay by Year`,
  description: `Warrant officer pay 2026: W-1 starts at ${usdx(pay('W-1', 0))} a month, a W-2 over 8 years earns ${usdx(pay('W-2', 8))} and a W-5 tops out at ${usdx(steps('W-5').top)}, after the ${P.pay.raisePct}% raise of 2026.`,
  h1: 'Warrant officer pay (W-1 to W-5) in 2026',
  intro: 'The warrant officer pay table for 2026, why most warrant officers enter it high on the seniority scale, and what changes in allowances compared with the enlisted grades.',
  resume: `A warrant officer 1 starts at ${usdx(pay('W-1', 0))} a month of basic pay in 2026, a chief warrant officer 2 with more than eight years earns ${usdx(pay('W-2', 8))}, a CW3 with more than fourteen years ${usdx(pay('W-3', 14))}, a CW4 with more than twenty years ${usdx(pay('W-4', 20))}, and a CW5 reaches ${usdx(steps('W-5').top)} at the top of the table, after the ${P.pay.raisePct}% raise of ${day(P.pay.effective)}. Warrant officers are technical and tactical specialists, such as Army aviators, Marine Corps gunners, Navy and Coast Guard technical experts; the Air Force reintroduced warrant officers in cyber and IT fields in 2024. Most come from the enlisted ranks after several years, and those years count for pay: a staff sergeant appointed W-1 with eight years of service is paid in the "over 8" column, not in the first one. Warrant officers receive the officer rate of BAS, ${usdx(bas('W-1'))}, lower than the enlisted rate, and BAH at the warrant officer rates of their duty station.`,
  mini: 'gradePay',
  miniArg: { grades: G },
  faqs: [
    { q: 'How much does a W-2 make in 2026?', a: `Basic pay for a CW2 runs from ${usdx(steps('W-2').firstPay)} with two years or less to ${usdx(steps('W-2').top)} at the top of the table, over ${steps('W-2').lastYears} years. A typical CW2 with ten years of total service earns ${usdx(pay('W-2', 10))}. Officer BAS of ${usdx(bas('W-2'))} and BAH, for example ${usd(bah('TX286', 'W-2'))} with dependents at Fort Hood, come on top.` },
    { q: 'Does an enlisted soldier lose pay by becoming a warrant officer?', a: `Rarely. Prior enlisted years count toward the warrant officer table, and W-1 rates at a given seniority are close to or above the E-6 and E-7 rates: with ten years, a W-1 earns ${usdx(pay('W-1', 10))} against ${usdx(pay('E-6', 10))} for an E-6 and ${usdx(pay('E-7', 10))} for an E-7. BAS falls to the officer rate, ${usdx(bas('W-1'))} instead of ${usdx(bas('E-7'))}, so the net gain is smaller than the basic pay gap.` },
    { q: 'When does warrant officer pay stop increasing?', a: `Each row has its own ceiling: W-1 at over ${steps('W-1').lastYears} years, W-2 at over ${steps('W-2').lastYears}, W-3 at over ${steps('W-3').lastYears}, W-4 at over ${steps('W-4').lastYears} and W-5 at over ${steps('W-5').lastYears}. After the ceiling, the yearly raise and promotion are the only increases. The W-5 row also starts late, at over 20 years.` },
    { q: 'How is warrant officer retired pay computed?', a: `Like that of every other member: the high-36 average of basic pay times the multiplier. A CW4 retiring at 22 years under High-3 with a high-36 near ${usdx(pay('W-4', 21))} would receive about ${usd((pay('W-4', 21) * multiplier('high3', 22)) / 100)} a month; under BRS about ${usd((pay('W-4', 21) * multiplier('brs', 22)) / 100)}. Warrant officers can also count enlisted years toward the twenty needed to retire.` },
  ],
  body: (h) => `
<h2>Warrant officer basic pay, 2026</h2>
${h.table(['Years', ...G], Y.map((y) => [colLabel(colIndex(y)), ...G.map((g) => cell(g, y))]), `Monthly basic pay, DFAS, effective ${day(P.pay.effective)}. n/a: no rate at that seniority.`, ['l', 'r', 'r', 'r', 'r', 'r'])}
<h2>Entering the table in the middle</h2>
<p>The warrant officer table is designed for people who arrive with experience. An Army aviator who enters flight school straight from civilian life starts at the "2 or less" column, ${usdx(pay('W-1', 0))}, but a sergeant first class with twelve years who is appointed W-1 starts at ${usdx(pay('W-1', 12))}, because the pay entry base date includes the enlisted years. Promotion to CW2 normally follows two years after appointment, which moves that same member to ${usdx(pay('W-2', 14))} at fourteen years of service. Warrant officers with long enlisted careers therefore reach the upper columns of the W-3 and W-4 rows by the time they retire.</p>
<p>The same rule makes comparisons with enlisted pay tricky. At ten years, the W-2 rate is ${usdx(pay('W-2', 10))} and the E-7 rate ${usdx(pay('E-7', 10))}; at twenty years, a CW3 earns ${usdx(pay('W-3', 20))} and an E-8 ${usdx(pay('E-8', 20))}. The warrant path pays more, but the real difference also depends on how long each career lasts and on bonuses, such as aviation incentive pay, that this page does not include.</p>
<h2>Allowances: officer BAS, warrant BAH</h2>
<p>The subsistence allowance of warrant officers is the officer rate, ${usdx(bas('W-1'))} in 2026, against ${usdx(bas('E-7'))} for enlisted members, a difference of ${usdx(bas('E-7') - bas('W-1'))} a month. The housing allowance has its own warrant officer columns in the DTMO file. With dependents in Norfolk, a W-1 receives ${usd(bah('VA298', 'W-1'))}, a W-3 ${usd(bah('VA298', 'W-3'))} and a W-5 ${usd(bah('VA298', 'W-5'))}; the ${h.a('bah-calculator', 'BAH calculator')} gives the rate at any ZIP code.</p>
<h2>W-1 to W-5 in each service</h2>
<p>The Army has the largest warrant officer corps, from WO1 to CW5, in aviation and in technical fields. The Marine Corps, Navy and Coast Guard appoint chief warrant officers mostly from senior enlisted ranks, with W-1 used little or not at all in some of them. The Air Force, which had not appointed warrant officers since the late 1950s, reintroduced them in 2024 for cyber and information technology specialties. All are paid from the same DFAS table. For the grades many warrant officers come from, see the ${h.a('pay-senior-nco', 'E-7 to E-9 page')}; for officers with prior enlisted service, the ${h.a('pay-prior-enlisted', 'O-1E to O-3E page')}.</p>
<h2>Retirement for warrant officers</h2>
<p>A warrant officer can retire after twenty years of total service, enlisted years included. High-3 and BRS work the same way as for other members, and a member who held a higher grade earlier, enlisted or officer, can in some cases be advanced on the retired list. The ${h.a('military-retirement-calculator', 'military retirement calculator')} starts from the W-grade of your choice.</p>`,
  related: ['pay-senior-nco', 'pay-prior-enlisted', 'military-pay-chart', 'military-retirement-calculator', 'bah-calculator'],
  sources: ['dfasWarrant', 'dfasBas', 'dtmoBah'],
});
