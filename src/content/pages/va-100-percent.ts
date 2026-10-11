import { definePage } from '../../lib/page-types';
import { P, comp, rateCell, usdx, usd, day } from '../../lib/kit';

const R = 100;
const fams: Array<[string, object]> = [
  ['Veteran alone', {}], ['Married', { spouse: true }], ['Married, 1 child', { spouse: true, kids: 1 }], ['Married, 2 children', { spouse: true, kids: 2 }],
  ['Married, 3 children', { spouse: true, kids: 3 }], ['Married, 1 child, 1 in college', { spouse: true, kids: 1, school: 1 }], ['Married, spouse on Aid and Attendance', { spouse: true, spouseAA: true }], ['Single, 2 dependent parents', { parents: 2 }],
];

export default definePage({
  id: 'va-100-percent',
  group: 'va',
  kind: 'rating',
  order: 200,
  slug: 'va-disability-100-percent',
  nav: '100% VA disability',
  card: 'The 100% rate for each family, schedular, TDIU and permanent and total ratings',
  title: '100% VA Disability Pay 2026: Rates With Family, P&T, TDIU',
  description: `100% VA disability pays ${usdx(comp(R))} a month in 2026 alone and ${usdx(comp(R, { spouse: true, kids: 2 }))} with a spouse and two children, whether reached by rating, TDIU or a P&T decision.`,
  h1: '100% VA disability: what it pays and what it opens',
  intro: 'The 2026 amounts at 100% for each family, and the difference between a 100% schedular rating, unemployability and a permanent and total decision.',
  resume: `A 100% VA disability rating pays ${usdx(comp(R))} a month in 2026 to a veteran alone, ${usdx(comp(R, { spouse: true }))} with a spouse and ${usdx(comp(R, { spouse: true, kids: 2 }))} with a spouse and two children under 18, at the rates effective ${day(P.va.ratesEffective)}. That is ${usd(comp(R) * 12)} a year, tax free, before any special monthly compensation. The same amount is paid whether the 100% comes from the combined ratings (a combined value of 95 or more), from a single condition rated 100%, or from individual unemployability, which pays the 100% rate to a veteran rated lower who cannot keep steady work. What differs is what comes with it. A rating VA marks "permanent and total" is not expected to improve and is not scheduled for future exams; it opens Dependents' Educational Assistance (Chapter 35) for a spouse and children and, for family members who have no TRICARE, the CHAMPVA health program.`,
  mini: 'ratingPay',
  miniArg: { rating: R },
  faqs: [
    { q: 'How much is 100% VA disability with a spouse and 3 children?', a: `${usdx(comp(100, { spouse: true, kids: 3 }))} a month in 2026: the basic rate for a spouse and one child, ${usdx(rateCell(100, 'cs'))}, plus two more children under 18 at ${usdx(rateCell(100, 'addChild'))} each. A child aged 18 to 23 in school is paid ${usdx(rateCell(100, 'addSchool'))} instead, and a spouse who needs Aid and Attendance adds ${usdx(rateCell(100, 'aa'))}.` },
    { q: 'What is the difference between 100% and 100% permanent and total?', a: 'The monthly amount is the same. "Permanent and total" means VA does not expect improvement and does not plan routine future exams, so the rating is protected from the usual re-examination. It also opens benefits for the family that a temporary 100% does not: Dependents’ Educational Assistance under Chapter 35 and, for dependents without TRICARE, CHAMPVA health coverage. The P&T status appears on the decision letter.' },
    { q: 'Does TDIU pay the same as a 100% VA rating?', a: `Yes, individual unemployability is paid at the 100% rate, ${usdx(comp(100))} a month alone in 2026, with the 100% amounts for dependents. The rating itself stays at its combined level, and a veteran on TDIU must not hold substantially gainful employment; VA asks for an employment questionnaire from time to time. TDIU can also be declared permanent.` },
    { q: 'Can I work with a 100% VA disability rating?', a: 'With a 100% schedular rating, yes: the rating is based on the medical criteria, not on employment, with exceptions for some conditions such as mental health ratings where the evidence of work matters. With TDIU, no substantially gainful work is allowed; earnings above the poverty threshold for one person can lead VA to end the award. Marginal or sheltered work is allowed.' },
    { q: 'Do my children get school benefits if I am 100% disabled?', a: `If your total rating is permanent and total, your children and spouse can use Dependents' Educational Assistance (Chapter 35), which pays a monthly allowance for college, technical school or apprenticeships. A temporary 100% rating does not open it. Children generally use it between 18 and 26, and the benefit is separate from any GI Bill you transferred to them.` },
  ],
  body: (h) => `
<h2>The 100% rate for each family</h2>
${h.table(['Family on VA records', 'Per month', 'Per year'], fams.map(([l, d]) => [l, usdx(comp(R, d)), usd(comp(R, d) * 12)]), 'VA compensation at 100%, rates effective December 1, 2025. Tax free.', ['l', 'r', 'r'])}
<h2>Three roads, one payment</h2>
<p><strong>Schedular 100%.</strong> The combined value reaches 95 or more, or one condition is rated 100% under its diagnostic code. Some 100% ratings are temporary by nature, for example after surgery requiring convalescence or during a hospital stay of more than 21 days for a service-connected condition; VA then sets a date to reduce or review.</p>
<p><strong>Individual unemployability.</strong> The veteran meets the threshold of 38 CFR 4.16, one condition at 60% or a combined 70% with one at 40%, and the service-connected conditions prevent substantially gainful work. Payment is at the 100% rate while the rating stays lower. See ${h.a('tdiu', 'TDIU')}.</p>
<p><strong>Above 100%.</strong> Special monthly compensation applies to specific losses, such as both feet, sight, or the need for the daily help of another person, with rates that start at ${usdx(P.va.smc.S)} for SMC-S and ${usdx(P.va.smc.L)} for SMC-L for a veteran alone. See ${h.a('va-smc-rates', 'SMC rates')}.</p>
<h2>Permanent and total, and the family</h2>
<p>When the decision says the 100% (or the TDIU) is permanent and total, the family gains two programs. Dependents' Educational Assistance pays a monthly education allowance to a spouse or child in school. CHAMPVA covers health care for a spouse and children who are not eligible for TRICARE, which matters for veterans who did not retire from the military. Many states add property tax relief, vehicle registration and hunting license benefits for 100% P&T veterans, each with its own rules.</p>
<h2>Military retirees at 100%</h2>
<p>A retiree with 20 years and a 100% rating, or TDIU, receives full retired pay and full VA compensation through CRDP. For a retiree with ${usd(3000)} of retired pay and a spouse, that means ${usdx(3000 + comp(R, { spouse: true }))} a month in total. The ${h.a('crdp', 'CRDP calculator')} handles the Chapter 61 cases, and the ${h.a('home', 'VA disability calculator')} checks your combined rating.</p>
<h2>What 100% means for survivors</h2>
<p>A veteran rated totally disabled, by schedule or TDIU, for ten continuous years before death, or since release from service for at least five years, gives the surviving spouse and children access to Dependency and Indemnity Compensation even when the death itself is not service connected (38 U.S.C. 1318). DIC starts at ${usdx(P.va.dic.base)} a month in 2026 for a surviving spouse, and the 8-year provision adds ${usdx(P.va.dic.eightYear)} when the veteran was rated totally disabled for the eight years before death and the couple was married throughout. The ${h.a('dic-rates', 'DIC page')} computes both.</p>`,
  related: ['va-90-percent', 'tdiu', 'va-smc-rates', 'va-dependents', 'crdp', 'dic-rates'],
  sources: ['vaRates', 'cfr416', 'vaSmc'],
});
