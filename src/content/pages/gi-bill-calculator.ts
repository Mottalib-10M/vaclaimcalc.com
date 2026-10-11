import { definePage } from '../../lib/page-types';
import { P, giBill, bah, mhaLabel, usd, usdx, day } from '../../lib/kit';

const G = P.gi;
const ex = [
  ['Public university, Austin, full time, 100%', 'TX272', 'public', 11000, 12, 100],
  ['Private university, Boston, full time, 100%', 'MA120', 'private', 58000, 12, 100],
  ['Community college, San Antonio, 9 credits, 80%', 'TX285', 'public', 3500, 9, 80],
  ['Public university, San Diego, full time, 60%', 'CA038', 'public', 9000, 12, 60],
] as Array<[string, string, 'public' | 'private', number, number, number]>;

export default definePage({
  id: 'gi-bill-calculator',
  group: 'edu',
  kind: 'pillar',
  order: 10,
  slug: 'gi-bill-calculator',
  nav: 'GI Bill calculator',
  card: 'Post-9/11 GI Bill for 2026-27: tuition, housing allowance at the campus ZIP code and books',
  title: 'GI Bill Calculator 2026-27: Tuition, Housing and Books',
  description: `GI Bill calculator for 2026-27: Post-9/11 tuition (private cap ${usdx(G.privateCap)}), housing allowance at the E-5 BAH of the campus ZIP code, books up to ${usd(G.books)} by tier.`,
  h1: 'Post-9/11 GI Bill calculator for 2026-27',
  intro: 'Enter your days of service, the school and the campus ZIP code: the calculator applies the VA rates in force from August 1, 2026 to July 31, 2027.',
  resume: `The Post-9/11 GI Bill pays three things, each multiplied by your eligibility tier: tuition and fees sent to the school, a monthly housing allowance paid to you, and up to ${usd(G.books)} a year for books and supplies. For the school year from ${day(G.from)} to ${day(G.to)}, VA pays the full net in-state tuition and fees at a public school, and up to ${usdx(G.privateCap)} a year at a private or foreign school. The housing allowance equals the military BAH for an E-5 with dependents at the ZIP code of the campus where you attend most classes, using the 2026 BAH table, prorated by your rate of pursuit and paid only above half time; for online-only students it is ${usd(G.onlineMha)}, half the national average. At 100%, a full-time student at a public university in Austin would receive the in-state tuition, ${usd(bah('TX272', 'E-5'))} a month for housing and about ${usd(G.books)} for books. The tier depends on your days of active duty after September 10, 2001: ${G.tiers[0][0].toLocaleString('en-US')} days for 100%, down to 90 days for 50%.`,
  tool: 'gi',
  toolProps: { zip: '78712' },
  faqs: [
    { q: 'How much is the GI Bill housing allowance in 2026-27?', a: `It equals the 2026 BAH for an E-5 with dependents at the ZIP code of your campus, for example ${usd(bah('TX272', 'E-5'))} a month in Austin, ${usd(bah('CA038', 'E-5'))} in San Diego and ${usd(bah('TX285', 'E-5'))} in San Antonio at 100%. It is reduced by your tier and rate of pursuit and paid only while you attend more than half time. Online-only study pays ${usd(G.onlineMha)}.` },
    { q: 'What is the GI Bill tuition cap for private schools in 2026-27?', a: `${usdx(G.privateCap)} for the school year from August 1, 2026 to July 31, 2027, for net tuition and mandatory fees at a private or foreign school, multiplied by your tier. At public schools there is no cap on in-state tuition. Above the cap, the Yellow Ribbon Program can cover part or all of the difference if the school participates.` },
    { q: 'What percentage of the GI Bill do I get?', a: `It depends on active-duty days after September 10, 2001: 1,095 days or more gives 100%, 910 days 90%, 730 days 80%, 545 days 70%, 180 days 60% and 90 days 50%. A Purple Heart received on or after September 11, 2001, or a discharge for a service-connected disability after at least 30 continuous days, gives 100% regardless of length.` },
    { q: 'Do I get the GI Bill housing allowance on active duty?', a: 'No. Members on active duty and spouses using benefits transferred by a member still on active duty receive tuition and books but no housing allowance, since they already receive pay and BAH. The allowance is also not paid for half-time or less, for correspondence or flight training, or during school breaks.' },
    { q: 'How long do I have to use the Post-9/11 GI Bill?', a: 'There is no time limit for veterans whose last discharge was on or after January 1, 2013, under the Forever GI Bill. For those discharged before that date, the benefit must be used within fifteen years of the last discharge. The entitlement itself is generally 36 months, enough for four nine-month school years.' },
    { q: 'How are books paid under the GI Bill?', a: `VA pays ${usdx(G.bookPerCredit)} per credit hour, for up to ${G.bookCredits} credits a year, so up to ${usd(G.books)} a year, multiplied by your tier. The money is sent to you at the start of each term. Students in non-college programs receive a monthly amount instead.` },
  ],
  body: (h) => `
<h2>Four students, four totals</h2>
${h.table(['Student', 'Tuition paid', 'Housing per month', 'Books', 'School year total'], ex.map(([l, c, s, t, cr, tier]) => { const r = giBill({ tier, school: s, tuition: t, bahE5: bah(c, 'E-5'), credits: cr, online: false, months: 9 }); return [l, usd(r.tuitionPaid), usd(r.mhaMonthly), usd(r.books), usd(r.total)]; }), 'Post-9/11 GI Bill, August 1, 2026 to July 31, 2027, nine months of classes, books for two terms. Housing at the 2026 E-5 with-dependents BAH of the campus area.', ['l', 'r', 'r', 'r', 'r'])}
<p>The Boston example shows the private cap: tuition above ${usdx(G.privateCap)} is not covered unless the school is in the Yellow Ribbon Program. The San Antonio example shows the rate of pursuit at work: nine credits out of twelve is 75%, rounded by VA to 80%, so the housing allowance is 80% of the full rate, multiplied again by the 80% tier.</p>
<h2>Housing allowance: the campus ZIP code decides</h2>
<p>VA uses the ZIP code of the campus where you attend the majority of your classes, not your home. A student at a university with campuses in two cities can therefore receive different allowances depending on where the classes take place. Students who take at least one class in person while the rest are online receive the in-person rate. The amounts follow the DoD BAH table for an E-5 with dependents, which is why the ${h.a('bah-calculator', 'BAH calculator')} can also be used to check them; the ${h.a('gi-bill-housing-allowance', 'GI Bill housing allowance page')} lists large college towns.</p>
<h2>Other payments under the program</h2>
<p>Beyond the three main payments, the Post-9/11 GI Bill can pay a one-time rural benefit of ${usd(G.rural)} to students who must move from a highly rural area, tutorial assistance of up to ${usd(G.tutorMonth)} a month and ${usd(G.tutorMax)} in total, and licensing and certification test fees up to ${usd(G.testMax)} per test, charged against entitlement. The ${h.a('post-9-11-gi-bill', 'Post-9/11 GI Bill guide')} explains eligibility, transfer to family members and the use of entitlement.</p>
<h2>How entitlement is used up</h2>
<p>The Post-9/11 GI Bill gives ${G.entitlementMonths} months of entitlement. A full-time student uses one month of entitlement for each month in school, so four nine-month academic years use the whole benefit; part-time enrollment uses entitlement more slowly, in proportion to the rate of pursuit. Tests and licensing fees are charged against entitlement too, at the rate set on the VA rates page. A veteran who served less than 56 months on active duty can generally use only one education benefit, which matters for those who also paid into the Montgomery GI Bill.</p>
<h2>Using the calculator</h2>
<p>Enter your days of active duty since September 11, 2001, the type of school and its net tuition after scholarships and aid, the campus ZIP code and your credits per term. The calculator gives the tuition VA pays the school, the monthly housing allowance at your tier and rate of pursuit, and the books stipend for two terms. A school year of nine months is assumed for the housing allowance; summer terms add months at the same rate. For a family member using transferred benefits the rates are the same; a spouse receives no housing allowance while the member is still on active duty, while a child does.</p>`,
  related: ['post-9-11-gi-bill', 'gi-bill-housing-allowance', 'bah-calculator', 'tsp-calculator', 'va-dependents'],
  sources: ['vaGi', 'vaGiAbout', 'vaGiTransfer', 'dtmoBah'],
});
