import { definePage } from '../../lib/page-types';
import { P, comp, usd, day } from '../../lib/kit';

const N = P.va.pension;
const mapr = (deps: number, k: 'basic' | 'housebound' | 'aa') => (deps === 0 ? N.alone[k] : N.oneDep[k] + Math.max(0, deps - 1) * N.addDep);

export default definePage({
  id: 'va-pension-rates',
  group: 'va',
  kind: 'guide',
  order: 70,
  slug: 'va-pension-rates',
  nav: 'VA pension rates 2026',
  card: 'Veterans Pension limits (MAPR) with Housebound and Aid and Attendance, and how income reduces them',
  title: 'VA Pension Rates 2026: MAPR, Aid and Attendance, Net Worth',
  description: `VA pension rates 2026: the MAPR is ${usd(N.alone.basic)} a year for a veteran alone, ${usd(N.alone.aa)} with Aid and Attendance; net worth limit ${usd(N.netWorthLimit)}. Pension = MAPR minus income.`,
  h1: 'Veterans Pension rates for 2026',
  intro: 'The needs-based VA pension for wartime veterans: the 2026 limits, how countable income and medical expenses set the payment, and the net worth test.',
  resume: `The Veterans Pension is a needs-based benefit for wartime veterans with limited income who are 65 or older or permanently disabled, and it works nothing like disability compensation. VA starts from a yearly limit set by Congress, the Maximum Annual Pension Rate or MAPR, and pays the difference between that limit and the household's countable income. From ${day(N.from)}, the MAPR is ${usd(N.alone.basic)} for a veteran with no dependents, ${usd(N.oneDep.basic)} with one dependent, and higher when the veteran is housebound (${usd(N.alone.housebound)} alone) or needs Aid and Attendance (${usd(N.alone.aa)} alone, ${usd(N.oneDep.aa)} with a dependent). A veteran alone with ${usd(12000)} of Social Security receives ${usd(N.alone.basic - 12000)} a year, about ${usd((N.alone.basic - 12000) / 12)} a month. Medical expenses above 5% of the MAPR are deducted from income, which is why Aid and Attendance pensions often help veterans paying for assisted living. Net worth must stay under ${usd(N.netWorthLimit)}.`,
  mini: 'pension',
  faqs: [
    { q: 'What is the VA pension with Aid and Attendance in 2026?', a: `The Maximum Annual Pension Rate with Aid and Attendance is ${usd(N.alone.aa)} a year for a veteran alone and ${usd(N.oneDep.aa)} with one dependent, from ${day(N.from)}. The pension paid is that limit minus countable income after deductible medical expenses. A veteran with no income after expenses would receive about ${usd(N.alone.aa / 12)} a month alone.` },
    { q: 'What is the net worth limit for VA pension?', a: `${usd(N.netWorthLimit)} from ${day(N.from)} to November 30, 2026. Net worth is the sum of assets and yearly income of the veteran and spouse; the home and its lot, a vehicle and personal effects are excluded. Assets given away for less than fair value within the three-year look-back period can lead to a penalty period of up to five years.` },
    { q: 'Can I get VA pension and disability compensation at the same time?', a: 'No. A veteran eligible for both receives one of them, and VA pays whichever is greater unless the veteran chooses otherwise. Compensation is often higher and has no income test. A veteran with a low disability rating and little income may receive more from pension, especially with Aid and Attendance.' },
    { q: 'Which medical expenses lower countable income for the VA pension?', a: `Unreimbursed medical expenses paid during the year, above 5% of the MAPR, ${usd(Math.floor(N.alone.basic * 0.05))} for a veteran alone: health insurance premiums including Medicare Part B, in-home care, assisted living or nursing home costs when care is needed, prescriptions and medical travel. They are reported on the pension application or on VA Form 21P-8416.` },
  ],
  body: (h) => `
<h2>Maximum Annual Pension Rates from December 1, 2025</h2>
${h.table(['Dependents', 'Basic', 'Housebound', 'Aid and Attendance'], [0, 1, 2, 3].map((d) => [d === 0 ? 'None' : `${d}`, usd(mapr(d, 'basic')), usd(mapr(d, 'housebound')), usd(mapr(d, 'aa'))]), `Yearly limits, VA Veterans Pension rates. Each dependent beyond the first adds ${usd(N.addDep)}.`, ['l', 'r', 'r', 'r'])}
<h2>Who can receive the pension</h2>
<p>The veteran must have served on active duty for at least 90 days, with at least one day during a wartime period as Congress defines them (for recent veterans, the Gulf War period that began on August 2, 1990 and has not been closed), or 24 months for those who entered after September 7, 1980, and must have been discharged other than dishonorably. On top of that, the veteran must be 65 or older, permanently and totally disabled, a patient in a nursing home for long-term care, or receiving Social Security disability. Income and net worth limits then apply.</p>
<h2>How the payment is computed</h2>
<p>VA counts the household's yearly income from every source: Social Security, pensions, wages, interest. It subtracts unreimbursed medical expenses above 5% of the MAPR that applies to the veteran. The pension is the MAPR minus what remains, paid in twelve monthly installments. Take a married veteran who needs Aid and Attendance, with ${usd(30000)} of income and ${usd(24000)} a year of assisted living costs. The MAPR is ${usd(N.oneDep.aa)}; the medical deduction is ${usd(24000 - Math.floor(N.oneDep.aa * 0.05))}; countable income falls to ${usd(30000 - (24000 - Math.floor(N.oneDep.aa * 0.05)))}, and the pension is ${usd(Math.max(0, N.oneDep.aa - (30000 - (24000 - Math.floor(N.oneDep.aa * 0.05)))))} a year. Without the care costs, the same couple would receive nothing.</p>
<h2>Housebound and Aid and Attendance</h2>
<p>These are not separate benefits but higher limits for veterans already eligible for pension. Housebound applies to a veteran substantially confined to the home because of a permanent disability, or with one disability rated 100% and another at 60%. Aid and Attendance applies to a veteran who needs the help of another person for daily activities, who is bedridden, who lives in a nursing home because of disability, or whose eyesight is limited to 5/200 or a field of 5 degrees. VA Form 21-2680, completed by a physician, documents the need; for a nursing home, VA Form 21-0779.</p>
<h2>Net worth and the look-back</h2>
<p>Since October 2018, VA uses a single net worth limit, tied to the maximum Medicaid community spouse resource allowance and adjusted each year with the cost of living: ${usd(N.netWorthLimit)} for the year that began on ${day(N.from)}. Net worth adds the household's countable assets and yearly income. The primary residence on a lot up to two acres, a vehicle, household goods and personal effects do not count. Assets transferred for less than fair market value in the three years before the claim are added back when they would have pushed net worth over the limit, and VA imposes a penalty period of up to five years, computed with a monthly penalty rate.</p>
<h2>Pension or compensation</h2>
<p>A veteran entitled to both receives the greater one. With a rating of 10% or 20%, compensation of ${usd(comp(10))} or ${usd(comp(20))} a month may be smaller than a pension with Aid and Attendance, but compensation is not income-tested and continues whatever the veteran earns or owns. The ${h.a('va-disability-rates', 'compensation rates')} and the ${h.a('home', 'VA disability calculator')} give the other side of the comparison; survivors have a separate needs-based Survivors Pension, distinct from ${h.a('dic-rates', 'DIC')}.</p>
<h2>Survivors Pension, briefly</h2>
<p>A surviving spouse or unmarried child of a wartime veteran can receive a Survivors Pension under the same logic: a yearly limit minus countable income, with higher limits for a survivor who is housebound or needs Aid and Attendance, and the same net worth test. It is a separate benefit from DIC, which is not income-based and is paid when the death is connected to service. A survivor eligible for both receives the greater.</p>
<h2>Reporting changes</h2>
<p>Because the pension depends on income and net worth, changes have to be reported: a new source of income, a Social Security increase beyond the normal adjustment, an inheritance, the sale of a property, the death of a spouse. VA can adjust the payment and recover overpayments. Medical expenses work the other way: if they rise during the year, reporting them can increase the pension, and expenses paid during the year can be reported after it ends.</p>
<p>Pension payments are made monthly, like compensation, and the first payment covers the months since the effective date. For a claim filed within a year of the date a veteran became permanently and totally disabled, VA can set the effective date at the onset of the disability when the delay was caused by the disability itself.</p>`,
  related: ['va-disability-rates', 'dic-rates', 'va-smc-rates', 'home', 'va-dependents'],
  sources: ['vaPension', 'vaRates'],
});
