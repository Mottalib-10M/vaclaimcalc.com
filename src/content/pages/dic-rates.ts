import { definePage } from '../../lib/page-types';
import { P, usdx, usd, day } from '../../lib/kit';

const D = P.va.dic;
const total = (kids: number, eight: boolean, aa: boolean, hb: boolean, first2: boolean) => D.base + kids * D.child + (eight ? D.eightYear : 0) + (aa ? D.aa : hb ? D.housebound : 0) + (first2 && kids ? D.transitional : 0);
const cases: Array<[string, number, boolean, boolean, boolean, boolean]> = [
  ['Spouse alone', 0, false, false, false, false],
  ['Spouse, 8-year provision', 0, true, false, false, false],
  ['Spouse, 1 child, first 2 years', 1, false, false, false, true],
  ['Spouse, 2 children, after 2 years', 2, false, false, false, false],
  ['Spouse on Aid and Attendance', 0, false, true, false, false],
  ['Spouse housebound, 8-year provision', 0, true, false, true, false],
];

export default definePage({
  id: 'dic-rates',
  group: 'va',
  kind: 'guide',
  order: 80,
  slug: 'dic-rates',
  nav: 'DIC rates 2026',
  card: 'Dependency and Indemnity Compensation for surviving spouses and children, with the added amounts',
  title: 'DIC Rates 2026: Surviving Spouse and Children, Added Amounts',
  description: `DIC rates 2026: ${usdx(D.base)} a month for a surviving spouse, ${usdx(D.child)} per child under 18, plus ${usdx(D.eightYear)} under the 8-year provision and ${usdx(D.aa)} for Aid and Attendance.`,
  h1: 'Dependency and Indemnity Compensation (DIC) rates for 2026',
  intro: 'What VA pays the family of a service member or veteran whose death is connected to service, and the amounts that come on top of the basic rate.',
  resume: `Dependency and Indemnity Compensation is the tax-free monthly payment VA makes to the surviving spouse, children and sometimes parents of a service member who died on active duty or in training, or of a veteran whose death resulted from a service-connected condition. For deaths on or after January 1, 1993, a surviving spouse receives ${usdx(D.base)} a month from ${day(P.va.ratesEffective)}, whatever the veteran's rank. VA adds ${usdx(D.child)} for each child under 18, a transitional benefit of ${usdx(D.transitional)} a month during the first two years when there are children under 18, ${usdx(D.eightYear)} under the 8-year provision when the veteran was rated totally disabled for eight years before death and the couple was married throughout, and ${usdx(D.aa)} if the spouse needs Aid and Attendance, or ${usdx(D.housebound)} if housebound. DIC is also paid, under 38 U.S.C. 1318, when a veteran rated totally disabled for ten years dies of an unrelated cause.`,
  mini: 'dic',
  faqs: [
    { q: 'How much is DIC for a surviving spouse in 2026?', a: `${usdx(D.base)} a month from December 1, 2025, for a veteran who died on or after January 1, 1993. Added amounts can raise it: ${usdx(D.child)} for each child under 18, ${usdx(D.eightYear)} under the 8-year provision, ${usdx(D.aa)} for Aid and Attendance or ${usdx(D.housebound)} if housebound, and ${usdx(D.transitional)} for two years after the death when there are young children.` },
    { q: 'Can a surviving spouse remarry and keep DIC?', a: 'A surviving spouse who remarries at age 55 or older keeps DIC; remarriage before 55 ends it, though it can be restored if the new marriage ends by death or divorce. Living with another person as if married also suspends DIC. The age-55 rule applies to remarriages after the law changed in 2021; VA can confirm an individual case.' },
    { q: 'Does DIC reduce the Survivor Benefit Plan annuity?', a: 'Not anymore. The offset that reduced the military SBP annuity by the amount of DIC was phased out and ended in January 2023, so a surviving spouse now receives both in full. Before that, the Special Survivor Indemnity Allowance partly compensated for the offset; it stopped when the offset ended.' },
    { q: 'Is DIC paid if the veteran did not die of a service-connected condition?', a: 'Yes, in three cases under 38 U.S.C. 1318: the veteran was rated totally disabled, including TDIU, for at least ten years before death; or continuously from release from active duty for at least five years before death; or for at least one year as a former prisoner of war who died after September 30, 1999. Otherwise, the death must be service connected.' },
  ],
  body: (h) => `
<h2>DIC amounts for common situations</h2>
${h.table(['Situation', 'Per month', 'Per year'], cases.map(([l, k, e, aa, hb, f]) => [l, usdx(total(k, e, aa, hb, f)), usd(total(k, e, aa, hb, f) * 12)]), 'DIC for deaths on or after January 1, 1993, VA rates effective December 1, 2025.', ['l', 'r', 'r'])}
<h2>Who receives DIC</h2>
<p>A surviving spouse qualifies when married to the veteran for at least one year, or for any length of time if a child was born of the marriage, or if the marriage took place within fifteen years after the end of the period of service in which the disease or injury began; in general the spouse must also have lived with the veteran continuously until the death. Children qualify on their own when there is no eligible spouse, or alongside the spouse: unmarried and under 18, or 18 to 23 in school, or permanently incapable of self-support before 18. Parents can receive a separate, income-based Parents' DIC.</p>
<h2>The added amounts, one by one</h2>
<ul>
<li><strong>Children under 18</strong>: ${usdx(D.child)} each, paid to the surviving spouse with the DIC.</li>
<li><strong>Transitional benefit</strong>: ${usdx(D.transitional)} a month for the first two years after the death, for a spouse with one or more children under 18, under 38 CFR 3.461(b). It stops earlier if the last child turns 18.</li>
<li><strong>8-year provision</strong>: ${usdx(D.eightYear)} when the veteran was rated totally disabled, including TDIU, for a continuous period of at least eight years immediately before death, and the spouse was married to the veteran for those same eight years.</li>
<li><strong>Aid and Attendance</strong>: ${usdx(D.aa)} when the surviving spouse needs the regular help of another person, is a patient in a nursing home, or is blind or nearly so.</li>
<li><strong>Housebound</strong>: ${usdx(D.housebound)} when the spouse is substantially confined to the home by a permanent disability. It is not paid together with Aid and Attendance.</li>
</ul>
<p>VA's own example: a surviving spouse with two children under 18, the 8-year provision and Aid and Attendance receives ${usdx(total(2, true, true, false, true))} a month during the first two years and ${usdx(total(2, true, true, false, false))} afterwards.</p>
<h2>Deaths before 1993</h2>
<p>For deaths before January 1, 1993, VA still uses the old method: DIC depends on the veteran's pay grade, from ${usdx(D.base)} for grades E-1 to E-6 to several thousand dollars for the highest officer grades, if that amount is higher than the current flat rate. Surviving spouses in that situation receive the higher of the two.</p>
<h2>How to apply</h2>
<p>A surviving spouse or child applies on VA Form 21P-534EZ, which covers DIC, the Survivors Pension and accrued benefits together; a parent uses VA Form 21P-535. VA needs the death certificate showing the cause of death, the marriage certificate and the children's birth certificates. When the veteran was already rated 100% or TDIU for long periods, mention it: it can open DIC under 38 U.S.C. 1318 and the 8-year provision even if the cause of death is unrelated to service. Claims filed within a year of the death are paid from the first day of the month of death.</p>
<h2>DIC and the rest of the family's income</h2>
<p>DIC is not taxed and is not reduced by the spouse's earnings. The military Survivor Benefit Plan, if the veteran was a retiree enrolled in it, is now paid in full alongside DIC, since the offset ended in 2023; the ${h.a('sbp-calculator', 'SBP calculator')} shows that annuity. The veteran's ratings during life, and especially a ${h.a('va-100-percent', '100% rating')} or ${h.a('tdiu', 'TDIU')}, decide which of these rules apply.</p>
<h2>Children who receive DIC in their own right</h2>
<p>When there is no eligible surviving spouse, the children receive DIC directly, in amounts set for one, two or more children, and a child aged 18 to 23 in school can receive DIC while enrolled. A child who became permanently incapable of self-support before 18 continues to receive it at any age. Children who use the Dependents' Educational Assistance program after 18 cannot receive DIC as a school child for the same period; the family chooses the higher of the two.</p>
<h2>Parents' DIC</h2>
<p>Parents of a veteran whose death was service connected can receive Parents' DIC, a separate benefit with an income limit and amounts that fall as the parents' income rises. It is paid whether or not the veteran had a spouse or children, and each parent can qualify, including adoptive parents and those who stood in the place of a parent. The application is VA Form 21P-535, with the parents' income for the year.</p>`,
  related: ['sbp-calculator', 'va-100-percent', 'tdiu', 'va-pension-rates', 'va-dependents'],
  sources: ['vaDic', 'usc1451'],
});
