import { definePage } from '../../lib/page-types';
import { P, pay, basePay, steps, colLabel, colIndex, bah, usdx, usd, day, CAP_O7, CAP_O6 } from '../../lib/kit';

const G = ['O-7', 'O-8', 'O-9', 'O-10'];
const Y = [0, 6, 10, 14, 18, 20, 22, 24, 26, 30, 34, 38];
const cell = (g: string, y: number) => { const v = basePay(g, y); return v == null ? 'n/a' : usdx(v); };

export default definePage({
  id: 'pay-general',
  group: 'pay',
  kind: 'grade',
  order: 270,
  slug: 'general-officer-pay-o7-o10',
  nav: 'O-7 to O-10 pay',
  card: 'General and flag officer pay in 2026 and the Executive Schedule cap that flattens it',
  title: `O-7 to O-10 Pay 2026: General Officer Pay and the Cap`,
  description: `General officer pay 2026: an O-7 tops out at ${usdx(steps('O-7').top)} a month and O-8 to O-10 are capped at ${usdx(CAP_O7)}, Level II of the Executive Schedule. Tables and rules.`,
  h1: 'General and flag officer pay (O-7 to O-10) in 2026',
  intro: 'The basic pay of brigadier generals to four-star generals and admirals, and why the pay cap makes most of the table identical.',
  resume: `General and flag officers are paid from the same DFAS table as everyone else, but most of their row is flattened by a cap. In 2026 basic pay for grades O-7 to O-10 cannot exceed Level II of the Executive Schedule, ${usdx(CAP_O7)} a month. A brigadier general or rear admiral lower half (O-7) starts at ${usdx(steps('O-7').firstPay)} and reaches ${usdx(steps('O-7').top)} at over ${steps('O-7').lastYears} years, below the cap. A major general or rear admiral (O-8) reaches the cap from over ${steps('O-8').lastYears} years. Lieutenant generals and vice admirals (O-9) and generals and admirals (O-10) are paid the capped amount in every column, because the table starts at over 20 years and the uncapped rates would exceed it. The cap also applies to the four-star officers who lead the services and to the Chairman of the Joint Chiefs of Staff. Grades O-6 and below have a lower cap, ${usdx(CAP_O6)}, Level V of the Executive Schedule.`,
  mini: 'gradePay',
  miniArg: { grades: G },
  faqs: [
    { q: 'How much does a four-star general make in 2026?', a: `${usdx(pay('O-10', 30))} a month of basic pay, the cap for grades O-7 to O-10, which equals Level II of the Executive Schedule. Allowances come on top: officer BAS, BAH or government quarters, and for some positions a personal money allowance. Basic pay is the same for every O-10 whatever the years of service, because of the cap.` },
    { q: 'Why do O-9 and O-10 have the same basic pay?', a: `Because the pay cap of ${usdx(CAP_O7)} a month in 2026 is lower than the uncapped O-9 and O-10 rates in every column of the DFAS table. Both grades are paid the cap. The difference between three and four stars shows in responsibilities, allowances and the uncapped rates that the law takes into account in some retirement computations, depending on the retirement date.` },
    { q: 'What is brigadier general pay in 2026?', a: `An O-7 earns ${usdx(steps('O-7').firstPay)} a month in the first column and ${usdx(pay('O-7', 26))} at more than twenty-six years, up to ${usdx(steps('O-7').top)} at over ${steps('O-7').lastYears}. The O-7 row stays below the ${usdx(CAP_O7)} cap in 2026. In practice, officers are selected for O-7 after more than twenty years of service.` },
    { q: 'Do general officers get BAH?', a: `Only when they do not live in government quarters. Many general and flag officers occupy designated quarters on an installation, and members assigned to government quarters do not draw BAH. Those who live off base receive the O-7 to O-10 rate of their duty station, the highest rates of the DTMO table, and the officer rate of BAS like every officer.` },
  ],
  body: (h) => `
<h2>O-7 to O-10 basic pay, 2026</h2>
${h.table(['Years', ...G], Y.map((y) => [colLabel(colIndex(y)), ...G.map((g) => cell(g, y))]), `Monthly basic pay, DFAS, effective ${day(P.pay.effective)}, capped at ${usdx(CAP_O7)} (Level II of the Executive Schedule).`, ['l', 'r', 'r', 'r', 'r'])}
<h2>How the cap works</h2>
<p>Title 37 limits military basic pay to a level of the civilian Executive Schedule, the pay scale of senior political appointees. For general and flag officers, the limit is Level II; for everyone else, Level V. When the Executive Schedule is frozen or rises less than military pay, the cap bites into more cells of the table. In 2026, it leaves the O-7 row untouched, flattens the upper part of the O-8 row from over ${steps('O-8').lastYears} years, and covers the whole O-9 and O-10 rows. DFAS publishes the capped amounts directly, so the table above is what officers are actually paid.</p>
<p>The cap applies to basic pay only. General and flag officers receive the officer rate of BAS, BAH where they do not live in government quarters, and in certain positions a personal money allowance for official entertainment. Many live in designated quarters on an installation and therefore do not draw BAH. When they do, the O-7 rate is the highest of the DTMO table: with dependents, ${usd(bah('DC053', 'O-7'))} a month in the Washington area in 2026.</p>
<h2>Retirement above the cap</h2>
<p>Retired pay of general and flag officers is computed from the high-36 average of basic pay. Whether that average uses the capped or the uncapped rates of the table has changed several times in law, and the answer depends on the date of retirement, so DFAS applies the rule in force for each officer. The ${h.a('military-retirement-calculator', 'retirement calculator')} works from the capped 2026 rates and should be read as an estimate for these grades.</p>
<h2>Grade titles</h2>
<p>O-7 is brigadier general in the Army, Air Force, Marine Corps and Space Force, and rear admiral lower half in the Navy and Coast Guard. O-8 is major general or rear admiral. O-9 is lieutenant general or vice admiral, O-10 general or admiral. The grades O-9 and O-10 are tied to positions designated by the President and confirmed by the Senate. The ${h.a('pay-field-grade', 'O-4 to O-6 page')} covers the grades below, and the ${h.a('military-pay-chart', '2026 pay chart')} every grade of the table.</p>
<p>For the same reason, a pay raise voted for the military does not always reach general and flag officers in full: when the Executive Schedule rises less than the military table, the capped grades gain only what the Executive Schedule gains, and the gap between uncapped and paid amounts widens.</p>
<p>One consequence is easy to miss: in 2026 a long-serving O-7 and an O-10 draw basic pay only ${usdx(CAP_O7 - steps('O-7').top)} a month apart, and the same amount once the O-7 is promoted to O-8 with enough years, while their duties differ enormously. Pay at this level is a matter of law and positions, not of the seniority columns.</p>`,
  related: ['pay-field-grade', 'military-pay-chart', 'military-retirement-calculator', 'pay-junior-officer'],
  sources: ['dfasOfficer', 'usc1409'],
});
