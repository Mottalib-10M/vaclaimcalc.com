import { definePage } from '../../lib/page-types';
import { P, comp, concurrent, usd, usdx } from '../../lib/kit';

const BASE61 = 2600;
const ex: Array<[string, number, number, number, number, boolean]> = [
  ['20 years, 40% total, 30% combat', 2600, 40, 30, 20, false],
  ['20 years, 60% total, 40% combat', 2600, 60, 40, 20, false],
  ['20 years, 60% total, 60% combat', 2600, 60, 60, 20, false],
  ['Chapter 61 at 70%, 12 years, all combat-related', BASE61 * 0.7, 70, 70, 12, true],
  ['20 years, 100% total, 50% combat', 3200, 100, 50, 20, false],
];

export default definePage({
  id: 'crsc-calculator',
  group: 'retire',
  kind: 'guide',
  order: 60,
  slug: 'crsc-calculator',
  nav: 'CRSC calculator',
  card: 'Combat-Related Special Compensation: who qualifies, how much, and when it beats CRDP',
  title: 'CRSC Calculator 2026: Combat-Related Special Compensation',
  description: `CRSC calculator 2026: tax-free pay equal to the VA amount of the combat-related rating, capped at the waived retired pay; ${usdx(comp(30))} a month at 30% alone.`,
  h1: 'CRSC: Combat-Related Special Compensation',
  intro: 'The tax-free payment that restores part or all of the retired pay waived for VA compensation, for disabilities linked to combat, and how it compares with CRDP.',
  resume: `Combat-Related Special Compensation is a monthly, tax-free payment for military retirees whose VA disabilities are combat-related, created by 10 U.S.C. 1413a. A disability is combat-related when it is attributable to an injury for which the member received the Purple Heart, or when it was incurred as a direct result of armed conflict, during hazardous service, in the performance of duty under conditions simulating war, or through an instrumentality of war. CRSC pays the VA compensation for the combat-related disabilities, computed as if they were the only ones, but never more than the retired pay the retiree waives for VA compensation. Unlike CRDP, it does not require a 50% rating: a combat-related rating of 10% is enough. It also covers Chapter 61 disability retirees with fewer than 20 years, within a limit tied to their years of service. A retiree must apply to his or her branch, and cannot receive CRSC and CRDP at the same time; DFAS pays the better one. With a combat-related rating of 30% and no dependents, CRSC is ${usdx(comp(30))} a month when the waiver is at least that large.`,
  mini: 'crsc',
  faqs: [
    { q: 'Who qualifies for CRSC?', a: 'A military retiree entitled to retired pay, with a VA rating of at least 10% for a disability the branch finds combat-related, who has waived retired pay to receive VA compensation. That includes 20-year retirees, Chapter 61 disability retirees with any years, retirees under the Temporary Early Retirement Authority, and reservists drawing retired pay at their retirement age.' },
    { q: 'How do I apply for CRSC?', a: 'Apply to your own branch of service, not to VA or DFAS, with DD Form 2860 and evidence linking each disability to combat: the Purple Heart citation, deployment records, line of duty determinations, incident or medical reports from the theater. The branch decides which disabilities are combat-related and sends the result to DFAS, which computes and pays CRSC, with retroactive pay when due.' },
    { q: 'Is CRSC taxable?', a: 'No. CRSC is special compensation, not retired pay, so it is not subject to federal income tax and cannot be divided with a former spouse under the Uniformed Services Former Spouses’ Protection Act. CRDP, by contrast, is taxable retired pay. That is often the deciding point when a retiree qualifies for both.' },
    { q: 'Can I switch between CRSC and CRDP?', a: 'Yes, once a year. DFAS applies the more favorable program in the first year of joint eligibility, then holds an open season each January in which the retiree can elect the other. The choice depends on gross amounts, taxes, any former spouse division and SBP premiums, which DFAS can now deduct from CRSC when retired pay is too small to cover them.' },
  ],
  body: (h) => `
<h2>CRSC in five situations</h2>
${h.table(['Situation', 'Retired pay', 'Waiver', 'CRSC (estimate)', 'CRDP', 'Paid'], ex.map(([l, rp, r, cr, y, c61]) => { const x = concurrent({ retiredPay: rp, rating: r, years: y, combatRating: cr, chapter61: c61, longevityPay: c61 ? (BASE61 * y * P.retire.high3Mult) / 100 : undefined }); return [l, usd(rp), usd(x.waiver), usd(x.crsc), x.crdpEligible ? usd(x.crdp) : 'none', x.best === 'none' ? 'neither' : x.best.toUpperCase()]; }), `Monthly amounts, veteran with no dependents, VA rates effective December 1, 2025. CRSC computed on the combat-related rating alone, capped at the waiver; the Chapter 61 line assumes a retired pay base of ${usd(BASE61)}.`, ['l', 'r', 'r', 'r', 'r', 'l'])}
<p>The table shows the logic. At 40% total, CRDP does not exist and CRSC restores the waiver for the combat-related part. At 60%, CRDP restores the whole waiver, so CRSC wins only if it pays more after tax, which happens when the combat-related part is large or when a former spouse would share CRDP. At 100%, CRDP is usually the larger gross amount unless almost all of the rating is combat-related.</p>
<h2>How the amount is computed</h2>
<p>DFAS takes the VA amount for the combat-related disabilities alone, using the combined rating the branch assigns to them, and compares it with the retired pay waived for VA compensation that month. CRSC is the smaller of the two. For Chapter 61 retirees, a further limit applies: the total of CRSC and the retired pay left after the waiver cannot exceed what the member would have received for longevity, which for members with fewer than 20 years is ${P.retire.high3Mult}% times the years times the retired pay base. A retiree with twelve years and a high disability percentage therefore receives less CRSC than the combat-related VA amount might suggest. The calculator applies the cap of the waiver; the branch and DFAS apply the full rules.</p>
<h2>Which disabilities count as combat-related</h2>
<p>The branch boards look at the cause of each disability, not at where the member served. A back injury from a vehicle rollover during a combat patrol is combat-related; the same injury from a training accident can qualify as "simulating war" or "hazardous service" depending on the circumstances; hearing loss from weapons fire can count as caused by an instrumentality of war. Disabilities without a documented link to one of the four categories, or to a Purple Heart, are not combat-related even if they are service connected.</p>
<h2>The Chapter 61 line of the table, step by step</h2>
<p>The fourth line follows a member retired for disability after twelve years, with a retired pay base of ${usd(BASE61)} and a 70% disability percentage, so disability retired pay of ${usd(BASE61 * 0.7)}. VA rates the same conditions at 70%, all combat-related. The VA waiver takes almost all of the retired pay. CRSC would equal the VA amount at 70%, but the Chapter 61 rule caps the sum of CRSC and the remaining retired pay at what twelve years of longevity would pay, ${P.retire.high3Mult}% times twelve times the base, ${usd((BASE61 * 12 * P.retire.high3Mult) / 100)}. The member therefore receives full VA compensation plus a smaller CRSC. Members in this situation are the reason Congress has repeatedly debated extending concurrent receipt to Chapter 61 retirees with fewer than twenty years.</p>
<h2>CRSC, SBP and taxes</h2>
<p>Because CRSC is tax free, a retiree in a high tax bracket can prefer it to CRDP even when CRDP is a little larger in gross terms. Since 2018, DFAS can deduct Survivor Benefit Plan premiums from CRSC when retired pay is too small to cover them, which used to be a reason some retirees kept CRDP. A former spouse who receives part of retired pay under a court order does not share in CRSC, which is another frequent factor in the choice.</p>
<h2>Retroactive pay</h2>
<p>CRSC can be paid back to June 1, 2003, for months in which all conditions were met, limited by the retirement date and, for disability retirees with fewer than 20 years, to January 1, 2008. DFAS audits the account when the branch approves the claim and pays any amount due; if VA also owes money, DFAS sends the audit to VA.</p>
<p>The ${h.a('crdp', 'CRDP calculator')} explains the other program, and the ${h.a('home', 'VA disability calculator')} gives the total for a retiree with dependents.</p>`,
  related: ['crdp', 'home', 'military-retirement-calculator', 'va-40-percent', 'va-50-percent'],
  sources: ['usc1413a', 'dfasCrsc', 'dfasCompare', 'vaRates'],
});
