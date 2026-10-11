import { definePage } from '../../lib/page-types';
import { P, comp, rateCell, RATINGS, usdx, usd, day, pct } from '../../lib/kit';

const cols = ['alone', 'spouse', 'spouse1p', 'p1', 'c', 'cs', 'cs1p', 'c1p'] as const;
const colName: Record<string, string> = { alone: 'Alone', spouse: 'Spouse', spouse1p: 'Spouse, 1 parent', p1: '1 parent', c: '1 child', cs: 'Spouse, 1 child', cs1p: 'Spouse, child, parent', c1p: 'Child, 1 parent' };

export default definePage({
  id: 'va-disability-rates',
  group: 'va',
  kind: 'pillar',
  order: 10,
  slug: 'va-disability-rates',
  nav: 'VA disability rates 2026',
  card: 'Every 2026 rate from 10% to 100%, for each family situation, with the added amounts',
  title: 'VA Disability Rates 2026: Monthly Pay Chart, 10% to 100%',
  description: `VA disability rates 2026 after the ${P.va.colaPct}% COLA: ${usdx(comp(10))} at 10% to ${usdx(comp(100))} at 100%, with spouse, children and parents, effective December 1, 2025, all ratings.`,
  h1: 'VA disability rates for 2026',
  intro: 'The official monthly amounts for every rating and every family situation, and a calculator that adds your extra children for you.',
  resume: `VA disability compensation pays ${usdx(comp(10))} a month at 10%, ${usdx(comp(50))} at 50% and ${usdx(comp(100))} at 100% for a veteran with no dependents, under the rates that took effect on ${day(P.va.ratesEffective)} and apply through November 2026. They rose by ${pct(P.va.colaPct)}, the same cost-of-living adjustment as Social Security, from ${usdx(P.va.prev10)} at 10% the year before. From a 30% rating, the amount also depends on the family: a spouse, dependent parents, children under 18 and children aged 18 to 23 in school each change the rate, and a spouse who needs Aid and Attendance adds a further amount. The chart below gives the basic rate for the most common situations; the calculator applies the added amounts that va.gov asks you to add by hand. The payment is tax free and arrives on the first business day of the month for the month before.`,
  tool: 'varates',
  toolProps: { rating: 70 },
  faqs: [
    { q: 'When do the 2026 VA disability rates take effect?', a: `On ${day(P.va.ratesEffective)}, so the first payment at the new rate was the one made at the start of January 2026, which pays for December. They stay in force until the next adjustment on December 1, 2026, which will follow the Social Security cost-of-living change announced in October. VA applies the change automatically; no form is needed.` },
    { q: 'What is the VA disability rate for 70% with a spouse and one child?', a: `${usdx(comp(70, { spouse: true, kids: 1 }))} a month in 2026. A second child under 18 adds ${usdx(rateCell(70, 'addChild'))}, a child aged 18 to 23 in an approved school adds ${usdx(rateCell(70, 'addSchool'))}, and a spouse who needs Aid and Attendance adds ${usdx(rateCell(70, 'aa'))}. Without dependents, 70% pays ${usdx(comp(70))}, so the family amounts are worth more than a tenth of the payment.` },
    { q: 'How much did VA disability pay go up for 2026?', a: `${pct(P.va.colaPct)} on every rate. At 10% the monthly amount went from ${usdx(P.va.prev10)} to ${usdx(comp(10))}; at 100% for a veteran alone it is now ${usdx(comp(100))}. The increase follows the Social Security COLA by law, which itself follows the consumer price index for wage earners between the third quarters of 2024 and 2025.` },
    { q: 'Are dependent parents paid at every VA rating?', a: `Only from 30%, like a spouse and children. A dependent parent adds ${usdx(comp(30, { parents: 1 }) - comp(30))} a month at 30% and ${usdx(comp(100, { parents: 1 }) - comp(100))} at 100%, and VA pays for two parents at most. The parent must depend on you financially; VA checks the parent's income and net worth on VA Form 21P-509.` },
    { q: 'Is VA disability compensation taxable?', a: `No. Disability compensation is not taxable income for federal tax purposes, and VA does not issue a 1099 for it. That is also why some military retirees accept the dollar-for-dollar VA waiver: the same amount moves from taxable retired pay to tax-free compensation. States generally follow the federal treatment, but check your state's rules for retired pay.` },
    { q: 'Why does my VA payment not match the chart?', a: `Most often a dependent is missing from VA's records, a child turned 18 without a school certification, or the rating change has a later effective date. Debts being collected and the VA waiver of retired pay also reduce the deposit. Compare the dependents listed in your award letter with your family and update them on va.gov if needed.` },
  ],
  body: (h) => `
<h2>The 2026 rate chart</h2>
<p>The table gives the basic monthly rate for the situations VA lists, effective ${day(P.va.ratesEffective)}. Ratings of 10% and 20% have one rate. For each rating of 30% and more, find your family in the columns. If you have more than one child under 18, or children in school, or a spouse on Aid and Attendance, use the second table or the calculator above.</p>
${h.table(['Rating', ...cols.map((c) => colName[c])], RATINGS.filter((r) => r >= 30).map((r) => [`<strong>${r}%</strong>`, ...cols.map((c) => usdx(rateCell(r, c)))]), `Monthly basic rates in dollars, va.gov. 10% pays ${usdx(comp(10))} and 20% pays ${usdx(comp(20))} whatever the family.`, ['l', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r'])}
<h2>Added amounts</h2>
<p>These amounts come on top of the basic rate. The rate for "1 child" already pays for one child under 18; each further child under 18 adds the first column. A child aged 18 to 23 in a VA-approved school program is paid at the school amount, the second column, instead of the child amount. The third column is paid when your spouse needs the regular help of another person.</p>
${h.table(['Rating', 'Each extra child under 18', 'Each child 18 to 23 in school', 'Spouse on Aid and Attendance'], RATINGS.filter((r) => r >= 30).map((r) => [`<strong>${r}%</strong>`, usdx(rateCell(r, 'addChild')), usdx(rateCell(r, 'addSchool')), usdx(rateCell(r, 'aa'))]), 'Monthly added amounts, va.gov, effective December 1, 2025.', ['l', 'r', 'r', 'r'])}
<h2>Reading the chart without mistakes</h2>
<p>Three points cause most of the questions VA receives about the amount. First, the rating in the chart is the combined rating on your decision letter, not one of your individual ratings and not their sum; if you have several, ${h.a('va-combined-rating-table', 'combine them first')}. Second, VA counts a dependent only once it is on your record: a marriage or a birth after your claim has to be reported, and the extra amount usually starts the month after the event, not the day you report it, provided you report it within a year. Third, a child stops counting at 18 unless VA has a school certification (VA Form 21-674) and stops at 23 in any case; a child who became permanently unable to support himself or herself before 18 keeps counting as a child under 18.</p>
<p>The worked example VA prints on its own rate page is a good check of the method: a veteran at 70% with a spouse who needs Aid and Attendance and three children under 18 receives ${usdx(comp(70, { spouse: true, kids: 3, spouseAA: true }))}, which is the basic rate for a spouse and one child, plus two extra children, plus the Aid and Attendance amount. The calculator gives the same figure to the cent.</p>
<h2>What is not in these rates</h2>
<p>Special monthly compensation for the loss of a limb, blindness or the need for daily help is a separate scale, from ${usdx(P.va.smcK)} for SMC-K to more than ${usd(Math.floor(P.va.smc['R.2/T'] / 1000) * 1000)} a month at the highest level: see ${h.a('va-smc-rates', 'SMC rates')}. Individual unemployability pays the 100% rate to a veteran rated lower: see ${h.a('tdiu', 'TDIU')}. Survivors receive Dependency and Indemnity Compensation, not these rates: see ${h.a('dic-rates', 'DIC rates')}. Each rating also has its own page, for example ${h.a('va-50-percent', '50% VA disability')} or ${h.a('va-100-percent', '100% VA disability')}.</p>`,
  related: ['va-combined-rating-table', 'va-dependents', 'va-100-percent', 'va-70-percent', 'tdiu', 'va-smc-rates'],
  sources: ['vaRates', 'vaRates2025', 'usc1115', 'vaSmc'],
});
