import { definePage } from '../../lib/page-types';
import { P, comp, concurrent, usdx, usd } from '../../lib/kit';

const RP = 2800;
const rows = [30, 40, 50, 70, 100].map((r) => { const c = concurrent({ retiredPay: RP, rating: r, years: 20 }); return [`${r}%`, usdx(c.va), c.crdpEligible ? 'restored in full' : `−${usdx(c.waiver)}`, usdx(c.totalMonthly)]; });

export default definePage({
  id: 'crdp',
  group: 'retire',
  kind: 'pillar',
  order: 50,
  slug: 'crdp',
  nav: 'CRDP calculator',
  card: 'Concurrent Retirement and Disability Pay: who keeps both checks, and the totals with your rating',
  title: 'CRDP 2026: Concurrent Retirement and Disability Pay Rules',
  description: `CRDP 2026: with 20 years and a VA rating of 50% or more, retirees keep full retired pay plus VA pay (${usdx(comp(50))} at 50%). Below 50%, the VA waiver applies.`,
  h1: 'CRDP: Concurrent Retirement and Disability Pay',
  intro: 'When a military retiree can receive retired pay and VA disability compensation at the same time, how much the waiver takes below 50%, and the special rules of Chapter 61.',
  resume: `Concurrent Retirement and Disability Pay lets a military retiree receive both retired pay and VA disability compensation in full, instead of having retired pay reduced dollar for dollar by the VA amount. Two conditions apply under 10 U.S.C. 1414: at least 20 years of creditable service, and a combined VA rating of ${P.va.crdpMin}% or more, or a grant of individual unemployability. The ten-year phase-in ended on December 31, 2013, so CRDP now restores retired pay in full from the first month of eligibility. A retiree with ${usd(RP)} of retired pay who reaches 50% therefore goes from ${usdx(concurrent({ retiredPay: RP, rating: 40, years: 20 }).totalMonthly)} a month in total at 40% to ${usdx(concurrent({ retiredPay: RP, rating: 50, years: 20 }).totalMonthly)}. CRDP is automatic: DFAS applies it once VA reports the rating. It counts as retired pay, so it is taxable and divisible with a former spouse. Retirees under Chapter 61 have limits, and those with fewer than 20 years do not qualify; CRSC is their route for combat-related conditions.`,
  tool: 'crdp',
  toolProps: { grade: 'E-7', years: 20, plan: 'high3', rating: 50 },
  faqs: [
    { q: 'Who is eligible for CRDP in 2026?', a: `A military retiree entitled to retired pay with at least 20 years of creditable service (active duty, or 20 qualifying years for reservists at retirement age) and a combined VA rating of ${P.va.crdpMin}% or more, or TDIU. Chapter 61 disability retirees qualify only with 20 years, and their CRDP is limited to the retired pay they would have received for longevity.` },
    { q: 'Do I have to apply for CRDP?', a: 'Usually not. VA shares rating information with DFAS, which starts CRDP automatically and pays any amount due back to the effective date of the rating. Reserve and Guard members retired for disability before their retirement age must make sure their branch sends the orders to DFAS. If you think you qualify and nothing happens, file DD Form 827.' },
    { q: 'What happens to retired pay with a 40% VA rating?', a: `It is reduced by the VA amount through the VA waiver: with a 40% rating and no dependents, ${usdx(comp(40))} a month moves from retired pay to VA compensation. The total stays the same, but that part is tax free. If some of the disabilities are combat-related, CRSC can restore part of the waived retired pay even below 50%.` },
    { q: 'Is CRDP taxable?', a: 'Yes. CRDP is not a separate payment but a restoration of retired pay, which is taxable income. VA compensation itself remains tax free. By contrast, CRSC is tax free. That difference matters when a retiree qualifies for both and must choose during the January open season.' },
    { q: 'Can a former spouse get part of my CRDP?', a: 'Yes. Because CRDP restores retired pay, the restored amount can be divided under a court order according to the Uniformed Services Former Spouses’ Protection Act, as part of disposable retired pay. VA compensation and CRSC cannot be divided that way, although courts may consider them as income for support.' },
    { q: 'Can I receive CRDP and CRSC at the same time?', a: 'No. A retiree eligible for both receives one, and DFAS applies the more favorable in the first year of joint eligibility. Each January, an open season lets the retiree switch. CRSC is tax free but covers only combat-related disabilities; CRDP covers all service-connected disabilities but is taxable.' },
  ],
  body: (h) => `
<h2>The effect of the rating on a retiree's total</h2>
${h.table(['VA rating', 'VA compensation', 'Retired pay waiver', 'Total per month'], rows, `Retiree with 20 years, ${usd(RP)} of gross retired pay, no dependents, VA rates effective December 1, 2025.`, ['l', 'r', 'r', 'r'])}
<p>Below 50%, the total does not change with the rating: VA pays more and retired pay falls by the same amount. From 50%, the waiver disappears and the whole VA amount is added. That is why a retiree's interest in the next rating step is concentrated around 50%, and why the combined value matters so much at 40% (see the ${h.a('va-40-percent', '40% page')}).</p>
<h2>Chapter 61 retirees</h2>
<p>Members retired for disability under Chapter 61 receive disability retired pay, computed either with their years of service or with their disability percentage. With 20 or more years, CRDP applies but only up to the amount of retired pay they would have received if retired for longevity; any excess disability retired pay remains subject to the waiver. With fewer than 20 years, there is no CRDP at all and VA compensation replaces disability retired pay dollar for dollar. Those retirees can apply for ${h.a('crsc-calculator', 'CRSC')} for combat-related disabilities.</p>
<h2>Reservists and Guard members</h2>
<p>A reservist with 20 qualifying years who reaches retirement age, usually 60, receives CRDP from the start of retired pay if rated 50% or more. A reservist retired for disability before that age can receive concurrent retired pay only from the age at which non-regular retired pay would have started. DFAS needs the retirement orders from the branch to start it.</p>
<h2>Using the calculator</h2>
<p>Choose your retirement system and grade, or enter your gross retired pay as a high-36 average, then select your VA rating. The result shows gross retired pay, the VA amount without dependents, the waiver when it applies, and the total. For a retiree with dependents, the ${h.a('home', 'VA disability calculator')} has a retiree section that includes them.</p>
<h2>A short history of concurrent receipt</h2>
<p>For most of the twentieth century, a retiree could not receive both payments: VA compensation was paid only by waiving the same amount of retired pay, a rule still written in 38 U.S.C. 5304 and 5305. Congress created CRSC in 2003 for combat-related disabilities and CRDP from January 1, 2004 for retirees rated 50% or more, with the restoration phased in over ten years. Retirees rated 100%, and later those with individual unemployability, received full concurrent receipt earlier. Since January 2014, every eligible retiree at 50% or more receives the full amount. Proposals to extend concurrent receipt to retirees below 50% or to Chapter 61 retirees with fewer than 20 years have been introduced in Congress several times; the calculator applies the law in force as described by DFAS.</p>`,
  related: ['crsc-calculator', 'home', 'va-50-percent', 'military-retirement-calculator', 'va-40-percent', 'tdiu'],
  sources: ['usc1414', 'dfasCrdp', 'dfasCompare', 'vaRates'],
});
