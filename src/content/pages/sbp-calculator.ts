import { definePage } from '../../lib/page-types';
import { P, pay, retiredPay, sbp, usd } from '../../lib/kit';

const rp = (g: string, y: number) => retiredPay('high3', pay(g, y - 1), y).monthly;
const ex: Array<[string, number]> = [['E-6 at 20 years', rp('E-6', 20)], ['E-7 at 20 years', rp('E-7', 20)], ['E-9 at 24 years', rp('E-9', 24)], ['O-4 at 20 years', rp('O-4', 20)], ['O-5 at 24 years', rp('O-5', 24)]];

export default definePage({
  id: 'sbp-calculator',
  group: 'retire',
  kind: 'guide',
  order: 70,
  slug: 'sbp-calculator',
  nav: 'SBP calculator',
  card: 'Survivor Benefit Plan: the 55% annuity, the 6.5% premium, the paid-up rule and the end of the DIC offset',
  title: 'SBP Calculator 2026: Survivor Benefit Plan Cost and Annuity',
  description: `SBP calculator 2026: the Survivor Benefit Plan pays a surviving spouse ${P.retire.sbpPct}% of the base amount for life and costs ${P.retire.sbpPremiumPct}% of it. Full cover on ${usd(3000)} costs ${usd(sbp(3000).premium)}.`,
  h1: 'Survivor Benefit Plan (SBP) calculator',
  intro: 'What the Survivor Benefit Plan costs a military retiree, what it pays a surviving spouse, and the decisions that must be made at retirement.',
  resume: `Military retired pay stops when the retiree dies. The Survivor Benefit Plan is the way to keep part of it going for a spouse, a former spouse or children: the beneficiary receives ${P.retire.sbpPct}% of the base amount chosen by the retiree, for life for a spouse, adjusted each year for inflation (10 U.S.C. 1451). The cost, for members who joined after March 1, 1990, is ${P.retire.sbpPremiumPct}% of that base amount, deducted from retired pay before tax (10 U.S.C. 1452). With full coverage on ${usd(3000)} of retired pay, the premium is ${usd(sbp(3000).premium)} a month and the surviving spouse would receive ${usd(sbp(3000).annuity)} a month. The base amount can be anything from ${usd(P.retire.sbpMinBase)} to the full gross retired pay. Married members are enrolled at the maximum unless the spouse consents in writing to less or to no coverage, before retirement. Premiums stop once the retiree has paid for 30 years and reached 70. Since January 2023, the annuity is no longer reduced by VA Dependency and Indemnity Compensation.`,
  mini: 'sbp',
  faqs: [
    { q: 'How much does SBP cost in 2026?', a: `${P.retire.sbpPremiumPct}% of the base amount for retirees who first joined after March 1, 1990, deducted from retired pay. With full coverage on a gross retired pay of ${usd(2500)}, the premium is ${usd(sbp(2500).premium)} a month. Premiums are not taxed, because they come out of retired pay before income tax, and they increase with the yearly cost-of-living adjustment.` },
    { q: 'How much does SBP pay a surviving spouse?', a: `${P.retire.sbpPct}% of the base amount chosen, for life, adjusted each December like retired pay. A retiree with full coverage on ${usd(3200)} of retired pay leaves a spouse ${usd(sbp(3200).annuity)} a month at today's figures. A spouse who remarries before 55 loses the annuity, which can be restored if that marriage ends.` },
    { q: 'Does DIC still reduce the SBP annuity?', a: 'No. The offset that reduced SBP by the amount of VA Dependency and Indemnity Compensation was phased out from 2021 and ended in January 2023. A surviving spouse who qualifies for both now receives SBP and DIC in full. The Special Survivor Indemnity Allowance, which partly compensated for the offset, ended with it.' },
    { q: 'When do SBP premiums stop?', a: 'When the retiree has made 360 monthly payments, thirty years of premiums, and has reached age 70: coverage continues without further cost. Premiums also stop if the beneficiary dies or, for spouse coverage, after a divorce if the retiree asks DFAS to stop them and no court orders former spouse coverage.' },
    { q: 'Can I cancel SBP after I retire?', a: 'Only during a one-year window between the second and third anniversaries of the start of retired pay, with the spouse’s written consent; premiums already paid are not refunded and the decision is permanent. Outside that window, coverage changes are limited to events such as marriage, divorce, death of the beneficiary or a child reaching the age limit.' },
  ],
  body: (h) => `
<h2>Cost and annuity at common retirement points</h2>
${h.table(['Retiree', 'Gross retired pay', 'Premium (full coverage)', 'Spouse annuity'], ex.map(([l, v]) => [l, usd(v), usd(sbp(v).premium), usd(sbp(v).annuity)]), `Monthly amounts with the full retired pay as the base amount; premium ${P.retire.sbpPremiumPct}%, annuity ${P.retire.sbpPct}%. Retired pay estimated under High-3 with 2026 basic pay.`, ['l', 'r', 'r', 'r'])}
<h2>How long until SBP pays for itself</h2>
<p>A year of annuity equals about ${Math.round((P.retire.sbpPct / P.retire.sbpPremiumPct) * 10) / 10} years of premiums, since the annuity is ${P.retire.sbpPct}% of the base and the premium ${P.retire.sbpPremiumPct}%. A retiree who pays premiums for twenty years and leaves a spouse who survives more than about ${Math.round((20 / (P.retire.sbpPct / P.retire.sbpPremiumPct)) * 10) / 10} years has, in simple terms, recovered the cost; with inflation adjustments on both sides the comparison holds roughly the same. Life insurance can replace part of SBP for some families, but it does not adjust for inflation, it requires good health to buy, and its price rises with age, which SBP premiums do not.</p>
<h2>Choices at retirement</h2>
<ul>
<li><strong>Spouse coverage</strong>: the default for married members, at the full base amount. Anything less requires the spouse's notarized consent before the retirement date.</li>
<li><strong>Spouse and child coverage</strong>: children receive the annuity if the spouse dies or loses eligibility, at a small additional cost based on ages.</li>
<li><strong>Child only coverage</strong>: for members without a spouse or with the spouse's consent; children are covered until 18, or 22 if in school, or for life if disabled before those ages.</li>
<li><strong>Former spouse coverage</strong>: often required by a divorce decree; it must be elected within a year of the decree or the former spouse must ask DFAS for a deemed election.</li>
<li><strong>Insurable interest</strong>: for a single member with no children, coverage for a person with a financial interest in the member's life, at a higher cost.</li>
</ul>
<h2>Reserve Component SBP</h2>
<p>Reservists who complete twenty qualifying years receive a notice of eligibility for retired pay at 60 and must decide then whether to join the Reserve Component Survivor Benefit Plan, which protects the family during the gray-area years before retired pay starts. Three options exist: decline, coverage starting at 60, or immediate coverage that pays a survivor even if the member dies before 60. The immediate option costs more, an extra premium on top of the standard ${P.retire.sbpPremiumPct}%, collected once retired pay begins. If no election is made within 90 days, a married reservist is enrolled in immediate coverage by default.</p>
<h2>Choosing the base amount</h2>
<p>The base amount can be the full gross retired pay or any lower amount down to ${usd(P.retire.sbpMinBase)}. A lower base lowers both the premium and the annuity in proportion. Some retirees choose a base that, with expected Social Security and other income, would leave the surviving spouse enough; others take full coverage because it protects against inflation. Under High-3, the premium and the annuity both follow the retired pay's yearly adjustments.</p>
<h2>SBP with a VA rating or CRSC</h2>
<p>Premiums are taken from retired pay. When the VA waiver leaves too little retired pay to cover them, DFAS deducts them from CRSC if the retiree receives it, or bills the retiree. A retiree who dies of a service-connected condition may leave the spouse both SBP and ${h.a('dic-rates', 'DIC')}, now without offset. The ${h.a('military-retirement-calculator', 'military retirement calculator')} gives the gross retired pay to use as the base, and the ${h.a('crdp', 'CRDP page')} explains the waiver.</p>
<p>A last practical step: keep the beneficiary information current with DFAS after any marriage, divorce or death in the family, and make sure the spouse knows how to report the death and start the annuity. DFAS can start SBP payments only after it receives the death notice and the claim from the beneficiary, and delays in either push back the first payment.</p>`,
  related: ['military-retirement-calculator', 'dic-rates', 'military-retirement-pay', 'crdp', 'crsc-calculator'],
  sources: ['usc1451', 'usc1452', 'dfasSbp', 'vaDic'],
});
