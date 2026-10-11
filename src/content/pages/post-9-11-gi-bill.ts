import { definePage } from '../../lib/page-types';
import { P, giTier, usd, usdx, day } from '../../lib/kit';

const G = P.gi;
const tierLabel = (i: number) => (i === 0 ? `${G.tiers[0][0].toLocaleString('en-US')} days or more` : `${G.tiers[i][0].toLocaleString('en-US')} to ${(G.tiers[i - 1][0] - 1).toLocaleString('en-US')} days`);

export default definePage({
  id: 'post-9-11-gi-bill',
  group: 'edu',
  kind: 'guide',
  order: 30,
  slug: 'post-9-11-gi-bill',
  nav: 'Post-9/11 GI Bill guide',
  card: 'Eligibility tiers, 36 months of entitlement, expiration, transfer to family and the 2026-27 rates',
  title: 'Post-9/11 GI Bill 2026: Eligibility, Tiers, Transfer, Rates',
  description: `Post-9/11 GI Bill 2026-27: 100% after ${G.tiers[0][0].toLocaleString('en-US')} days of active duty, 36 months of benefits, private tuition cap ${usdx(G.privateCap)}, transfer after 6 years of service.`,
  h1: 'The Post-9/11 GI Bill explained',
  intro: 'Who qualifies, at what percentage, for how long, how benefits pass to a spouse or child, and what they pay in the 2026-27 school year.',
  resume: `The Post-9/11 GI Bill (Chapter 33 of Title 38) pays for college, vocational training and other education for veterans and service members who served on active duty after September 10, 2001. Eligibility is measured in days of active service since that date: ${G.tiers[0][0].toLocaleString('en-US')} days, about 36 months, give 100% of the benefit, and shorter service gives a percentage, down to 50% for 90 days. A Purple Heart received after September 11, 2001, or a discharge for a service-connected disability after at least 30 continuous days, gives 100% regardless of length. The benefit lasts ${G.entitlementMonths} months, generally four academic years. For the year from ${day(G.from)} to ${day(G.to)}, it pays full in-state tuition at public schools or up to ${usdx(G.privateCap)} at private ones, a housing allowance based on the campus BAH, and up to ${usd(G.books)} for books. Veterans whose service ended on or after January 1, 2013 have no deadline to use it. Members with at least six years of service can transfer it to a spouse or children by agreeing to serve four more.`,
  mini: 'giTier',
  faqs: [
    { q: 'Am I eligible for the Post-9/11 GI Bill?', a: 'You are if you served at least 90 days on active duty after September 10, 2001, received a Purple Heart for service after September 11, 2001, or were discharged for a service-connected disability after at least 30 continuous days. You must have an honorable discharge, or still be serving. Reservists qualify through active-duty periods, including some mobilizations and active duty for training.' },
    { q: 'Can I transfer my Post-9/11 GI Bill to my children?', a: 'Yes, if you are still serving, have at least six years of service on the date the transfer is approved and agree to serve four more years. The Department of Defense approves transfers, which must be requested while you are in uniform. Children can start using the benefit once you have ten years of service, and must use it before age 26.' },
    { q: 'Does the Post-9/11 GI Bill expire?', a: 'Not if your service ended on or after January 1, 2013: the Forever GI Bill removed the deadline for those veterans. If your last separation was before January 1, 2013, the benefit expires fifteen years after that date and any unused months are lost. A spouse using transferred benefits follows similar rules tied to the member’s separation date.' },
    { q: 'Can I use the GI Bill for a trade school or apprenticeship?', a: 'Yes. Non-college degree programs, apprenticeships, on-the-job training, flight training, correspondence courses and licensing tests are covered, each with its own rate. Non-college programs are paid up to the same cap as private schools, and apprenticeship and on-the-job training pay a housing allowance that decreases every six months.' },
    { q: 'What is the Yellow Ribbon Program?', a: `A program in which private schools, and public schools for out-of-state students, agree to cover part of the tuition above the GI Bill payment, with VA matching the school's contribution. It is open only to students at the 100% tier, and to some Fry Scholarship recipients, and depends on the school's agreement and the number of places it offers.` },
  ],
  body: (h) => `
<h2>Eligibility tiers</h2>
${h.table(['Active duty after September 10, 2001', 'Percentage of the benefit', 'Private tuition cap at that tier'], G.tiers.map(([d, p], i) => [tierLabel(i), `${p}%`, usd((G.privateCap * p) / 100)]), 'VA Post-9/11 GI Bill rates, August 1, 2026 to July 31, 2027. Purple Heart or service-connected discharge after 30 days: 100%.', ['l', 'r', 'r'])}
<p>Days of active duty count with or without breaks in service, and some reserve service under specific orders counts too. Service members can check their days on the VA's Certificate of Eligibility, which states the percentage and the remaining entitlement.</p>
<h2>What the benefit pays</h2>
<p>Three payments make up the Post-9/11 GI Bill. Tuition and mandatory fees go directly to the school: the full in-state amount at a public institution, and up to ${usdx(G.privateCap)} at a private or foreign school, multiplied by the tier. A monthly housing allowance goes to the student, equal to the E-5 with-dependents BAH of the campus ZIP code for in-person study, ${usd(G.onlineMha)} for online-only study; see the ${h.a('gi-bill-housing-allowance', 'housing allowance page')}. A books and supplies stipend of ${usdx(G.bookPerCredit)} per credit goes to the student, up to ${usd(G.books)} a year. The ${h.a('gi-bill-calculator', 'GI Bill calculator')} adds the three for your school.</p>
<h2>Entitlement and its use</h2>
<p>A student with 100% eligibility has ${G.entitlementMonths} months of entitlement. Each month of full-time enrollment uses one month; part-time enrollment uses less. Someone who served less than 56 months and also qualifies for another GI Bill program, such as the Montgomery GI Bill, can generally use only one, and electing the Post-9/11 GI Bill is irrevocable. Entitlement that runs out in the middle of a term is extended to the end of that term.</p>
<h2>Transferring the benefit</h2>
<p>Transfer of entitlement is a retention tool of the Department of Defense, not a right after discharge. A member must request it while serving, with at least six years of service, and agree to four more; once approved, the member can divide the months among a spouse and children and change the split later. A spouse can use the benefit right away, but receives no housing allowance while the member is on active duty. A child can start after the member reaches ten years, needs a high school diploma or to be 18, and must use it before 26.</p>
<h2>Applying and keeping the payments coming</h2>
<p>A veteran applies online through VA, which issues a Certificate of Eligibility stating the percentage and the months left. The school's certifying official then reports each term's enrollment to VA, which pays tuition to the school and the housing allowance and books to the student. Students verify their enrollment each month, by text message or online, to keep the housing allowance flowing; a missed verification delays the payment. Any change in credits, a withdrawal or a move to online classes must be reported through the school, since it changes the rate of pursuit and the housing allowance, and can create a debt.</p>
<h2>Fry Scholarship</h2>
<p>Children and surviving spouses of members who died in the line of duty after September 10, 2001 can receive the Marine Gunnery Sergeant John David Fry Scholarship, which pays at the 100% level of the Post-9/11 GI Bill for up to 36 months, including the housing allowance and books. It is a separate entitlement from the member's own benefit.</p>
<h2>Other education benefits to know</h2>
<p>Veterans with a service-connected rating may qualify for Veteran Readiness and Employment, which can pay for education with a subsistence allowance and does not use GI Bill entitlement in the same way. Children and spouses of veterans rated permanently and totally disabled can use Dependents' Educational Assistance. The ${h.a('va-20-percent', '20% rating page')} and the ${h.a('va-100-percent', '100% page')} describe those programs.</p>
<p>When in doubt about days, tiers or remaining months, the Certificate of Eligibility is the document VA and schools rely on.</p>`,
  related: ['gi-bill-calculator', 'gi-bill-housing-allowance', 'va-100-percent', 'va-20-percent', 'tsp-calculator'],
  sources: ['vaGi', 'vaGiAbout', 'vaGiTransfer'],
});
