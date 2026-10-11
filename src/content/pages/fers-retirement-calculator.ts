import { definePage } from '../../lib/page-types';
import { P, fers, militaryDeposit, usd, usdx } from '../../lib/kit';

const F = P.fers;
const ex = [
  ['20 years, starts at 62', 90000, 20, 0, 62],
  ['16 years + 4 military, starts at 62', 90000, 16, 4, 62],
  ['26 years + 4 military, starts at 57', 90000, 26, 4, 57],
  ['12 years + 6 military, starts at 60', 75000, 12, 6, 60],
  ['30 years, starts at 60', 110000, 30, 0, 60],
] as Array<[string, number, number, number, number]>;

export default definePage({
  id: 'fers-retirement-calculator',
  group: 'retire',
  kind: 'pillar',
  order: 90,
  slug: 'fers-retirement-calculator',
  nav: 'FERS retirement calculator',
  card: 'FERS basic annuity for federal employees, with the military buy-back and its 3% deposit',
  title: 'FERS Retirement Calculator 2026: Annuity, Military Buy-Back',
  description: `FERS retirement calculator 2026: ${F.mult}% of high-3 per year, ${F.mult62}% at 62 with 20 years, and the military buy-back at ${F.militaryDepositPct}% of basic pay. For veterans in federal service.`,
  h1: 'FERS retirement calculator with military service credit',
  intro: 'For veterans working for the federal government: the FERS basic annuity from your high-3 salary and years, and what buying back your military years adds.',
  resume: `The Federal Employees Retirement System pays a basic annuity of ${F.mult}% of the high-3 average salary for each year of creditable service, or ${F.mult62}% when the employee retires at 62 or later with at least ${F.mult62Years} years, under the formula published by OPM. Many federal employees are veterans, and their military service can count toward FERS too, but only after they pay a deposit: ${F.militaryDepositPct}% of the military basic pay earned during the service, plus interest if paid late. A veteran with a high-3 of ${usd(90000)} who retires at 62 with sixteen civilian years and four military years bought back receives ${usd(fers(90000, 16, 4, 62).annual)} a year instead of ${usd(fers(90000, 16, 0, 62).annual)}. The deposit for those four years, if basic pay totaled ${usd(110000)}, would be ${usd(militaryDeposit(110000))}. Retirees drawing military retired pay generally must waive it to count the same years, unless it is based on a combat disability or Chapter 1223 reserve retirement.`,
  tool: 'fers',
  faqs: [
    { q: 'How is the FERS basic annuity calculated?', a: `High-3 average salary times years of creditable service times ${F.mult}%, or ${F.mult62}% if you are 62 or older at separation with at least ${F.mult62Years} years. Fractions of a month are dropped. An employee retiring at the minimum retirement age with 10 to 29 years has the annuity reduced by 5% for each year under 62, unless 20 years and age 60 apply.` },
    { q: 'Is the FERS military buy-back worth it?', a: `Usually, if you will retire under FERS with an immediate annuity. Each military year bought adds ${F.mult}% or ${F.mult62}% of your high-3 to the yearly annuity for life, while the deposit is ${F.militaryDepositPct}% of the basic pay earned in that year. With a high-3 of ${usd(90000)}, one year adds ${usd((90000 * F.mult) / 100)} or more a year; the deposit for a year of junior enlisted pay is typically a little over a thousand dollars.` },
    { q: 'When do I have to pay the military deposit?', a: 'Before you separate from federal service; after retirement it cannot be paid. Interest starts after an initial grace period of three years from your first FERS appointment, so paying early costs less. You request the estimated earnings from your branch with Form RI 20-97 and pay through your agency payroll office.' },
    { q: 'Can I get military retired pay and a FERS annuity for the same years?', a: 'Generally no. To count military service in a FERS annuity, a military retiree must waive military retired pay, except when it is awarded for a disability incurred in combat or caused by an instrumentality of war, or is a reserve retirement under Chapter 1223 paid at age 60. A reservist can count active duty periods without giving up a later reserve retirement for other years.' },
    { q: 'What is the FERS minimum retirement age?', a: 'It depends on the year of birth, rising from 55 for those born before 1948 to 57 for those born in 1970 or later. At the MRA you can retire with an unreduced annuity after 30 years, or with 10 to 29 years with a reduction of 5% per year under 62. At 60 with 20 years, and at 62 with 5 years, the annuity is not reduced.' },
    { q: 'Does the FERS calculator include the supplement and Social Security?', a: 'No. The FERS annuity supplement, paid to some retirees before 62 to bridge to Social Security, and the Social Security benefit itself are separate calculations. The calculator also leaves out the survivor annuity reduction of 10% for a full survivor benefit, and the cost-of-living adjustments that start at 62 for most FERS retirees.' },
  ],
  body: (h) => `
<h2>Examples with and without military years</h2>
${h.table(['Situation', 'High-3', 'Annual annuity', 'Monthly'], ex.map(([l, h3, c, m, a]) => { const r = fers(h3, c, m, a); return [l, usd(h3), usd(r.annual), usdx(Math.round(r.monthly))]; }), 'FERS basic annuity before survivor reduction, OPM formula. Military years count only after the deposit is paid.', ['l', 'r', 'r', 'r'])}
<h2>The military deposit, step by step</h2>
<p>To credit post-1956 military service toward FERS, a federal employee pays a deposit of ${F.militaryDepositPct}% of the military basic pay earned during that service (the rate was slightly higher for 1999 and 2000). The steps are: ask your branch for a statement of military earnings, give it to your agency's human resources office, which computes the deposit and any interest, and pay it in a lump sum or by payroll deduction before separating. The service must have ended under honorable conditions. Once paid, the years count for the annuity amount and for retirement eligibility.</p>
<h2>Why the 62 rule matters for veterans</h2>
<p>The ${F.mult62}% multiplier needs two things at separation: age 62 and 20 years of service. Military years bought back count toward the 20. A veteran who joined federal service at 45 after four years in uniform would reach 20 years at 61 with the buy-back, and qualify for ${F.mult62}% by working one more year, instead of needing 20 civilian years alone. The calculator shows the multiplier applied in each case.</p>
<p>Veterans with a military retirement should compare the two options with care: waiving retired pay to count the years in FERS gives up a pension that started years earlier and carries full cost-of-living adjustments. The ${h.a('military-retirement-calculator', 'military retirement calculator')} gives the other side. TSP balances from military and civilian service can be combined in one account; see the ${h.a('tsp-calculator', 'TSP calculator')}.</p>
<h2>Special categories and the CSRS component</h2>
<p>Law enforcement officers, firefighters, air traffic controllers and some other employees have higher FERS multipliers for their covered service and earlier retirement ages; the calculator uses the regular formula and does not apply them. Employees with service before 1984 who moved from CSRS to FERS have a CSRS component computed separately, and military service performed before the transfer follows CSRS deposit rules at 7% of basic pay. If any of these applies to you, use the calculator as a first approximation and ask your agency for an official estimate.</p>
<h2>Military time and the FERS supplement</h2>
<p>The FERS annuity supplement, paid from retirement to age 62 to employees who retire on an immediate unreduced annuity before that age, is based on civilian service only: bought-back military years raise the basic annuity but not the supplement. That is one more reason to look at the basic annuity and the supplement separately when planning a retirement before 62.</p>`,
  related: ['military-retirement-calculator', 'tsp-calculator', 'tsp-contribution-limits', 'military-retirement-pay', 'sbp-calculator'],
  sources: ['opmFers', 'opmCredit', 'tspLimits'],
});
