import { definePage } from '../../lib/page-types';
import { P, comp, rateCell, RATINGS, usdx, usd, day } from '../../lib/kit';

const R3 = RATINGS.filter((r) => r >= 30);

export default definePage({
  id: 'va-dependents',
  group: 'va',
  kind: 'guide',
  order: 40,
  slug: 'va-disability-dependents',
  nav: 'Dependents and VA pay',
  card: 'What a spouse, each child, a student and a parent add at every rating, and how to add them',
  title: 'VA Disability With Dependents 2026: What Each One Adds',
  description: `VA disability with dependents in 2026: a spouse adds ${usdx(comp(100, { spouse: true }) - comp(100))} a month at 100%, each extra child ${usdx(rateCell(100, 'addChild'))}, a college student ${usdx(rateCell(100, 'addSchool'))}. Rules, forms, dates.`,
  h1: 'VA disability compensation with dependents',
  intro: 'Who counts as a dependent for VA, what each one adds at each rating in 2026, and the forms and deadlines that decide whether the money arrives.',
  resume: `From a combined rating of 30%, VA adds compensation for a spouse, children and dependent parents, in amounts that rise with the rating under 38 U.S.C. 1115. In 2026, at 100%, a spouse adds ${usdx(comp(100, { spouse: true }) - comp(100))} a month to the veteran-alone rate of ${usdx(comp(100))}, a first child ${usdx(comp(100, { spouse: true, kids: 1 }) - comp(100, { spouse: true }))} for a married veteran, each further child under 18 ${usdx(rateCell(100, 'addChild'))}, each child aged 18 to 23 in school ${usdx(rateCell(100, 'addSchool'))}, and a spouse who needs Aid and Attendance ${usdx(rateCell(100, 'aa'))}. At 30% the same people are worth about a third of that. A child in school is paid at the school amount instead of the child amount, because the statute says so "notwithstanding" the other rules, so a veteran whose only child is in college receives the rate without children plus the school amount. None of it is paid until VA has the dependent on record, through VA Form 21-686c, which is why so many veterans are underpaid.`,
  mini: 'depsEffect',
  faqs: [
    { q: 'Who counts as a dependent for VA disability compensation?', a: 'A spouse in a marriage VA recognizes; children under 18; children aged 18 to 23 who attend a VA-approved school; children who became permanently incapable of self-support before 18, at any age; and parents who depend on the veteran financially. Stepchildren count when they live with the veteran or are supported by the veteran. Grandchildren and siblings do not count.' },
    { q: 'How long does VA take to add a dependent?', a: 'Adding a dependent through the online form on va.gov is often processed within weeks, much faster than a disability claim, and VA pays the added amount back to the right date. When the dependent existed at the effective date of your rating, or when you report a new one within a year of the marriage, birth or adoption, the money is paid from that date.' },
    { q: 'Does VA pay more for a child in college?', a: `Yes. A child aged 18 to 23 who attends an approved school is paid the school amount, ${usdx(rateCell(100, 'addSchool'))} a month at 100% in 2026 against ${usdx(rateCell(100, 'addChild'))} for a younger child. You certify the enrollment on VA Form 21-674, each school year. If the child uses Dependents' Educational Assistance (Chapter 35), the school amount stops while DEA is paid.` },
    { q: 'What happens to VA dependent pay after a divorce?', a: 'The spouse amount stops: report the divorce to VA, which will reduce the payment from the first day of the month after the divorce. Children keep counting, even if they live with the other parent, and VA can pay part of the compensation directly to them through an apportionment when the veteran does not support them.' },
    { q: 'Can I add my dependent parents at a 20% rating?', a: `No. Dependent parents, like a spouse and children, count only from a combined rating of 30%. At 30% one dependent parent adds ${usdx(comp(30, { parents: 1 }) - comp(30))} a month in 2026, and at 100% ${usdx(comp(100, { parents: 1 }) - comp(100))}. VA pays for two parents at most and checks their income and net worth on VA Form 21P-509.` },
  ],
  body: (h) => `
<h2>What each dependent adds, rating by rating</h2>
${h.table(['Rating', 'Spouse', 'First child (married)', 'Each extra child under 18', 'Each child in school', 'One parent', 'Spouse on A&A'], R3.map((r) => [`<strong>${r}%</strong>`, usdx(comp(r, { spouse: true }) - comp(r)), usdx(comp(r, { spouse: true, kids: 1 }) - comp(r, { spouse: true })), usdx(rateCell(r, 'addChild')), usdx(rateCell(r, 'addSchool')), usdx(comp(r, { parents: 1 }) - comp(r)), usdx(rateCell(r, 'aa'))]), 'Monthly amounts added to the veteran-alone rate, VA tables effective December 1, 2025.', ['l', 'r', 'r', 'r', 'r', 'r', 'r'])}
<p>Below 30% the columns would all read zero: at 10% and 20%, VA pays one rate, ${usdx(comp(10))} and ${usdx(comp(20))}, whatever the family. The amounts in the table come from 38 U.S.C. 1115, which sets the dependents' rates for a totally disabled veteran and scales them down in proportion to the rating, rounded down to the dollar, before each year's cost-of-living adjustment.</p>
<h2>How the basic rate and the added amounts fit together</h2>
<p>The VA tables are built in two parts. The basic rate covers the veteran with a spouse, up to two dependent parents and one child under 18. Then come the added amounts: each child under 18 beyond the first, each child in school, and the Aid and Attendance amount for a spouse who needs it. A veteran rated 70% with a spouse and three young children receives the basic rate for a spouse and one child, ${usdx(rateCell(70, 'cs'))}, plus two extra children at ${usdx(rateCell(70, 'addChild'))}, which is ${usdx(comp(70, { spouse: true, kids: 3 }))}; with a spouse on Aid and Attendance, VA's own worked example on its rate page, the total is ${usdx(comp(70, { spouse: true, kids: 3, spouseAA: true }))}.</p>
<p>The school amount works differently from what many veterans expect. It does not come on top of the child amount: it replaces it, because 38 U.S.C. 1115(1)(F) sets the amount payable "on account of" a school child notwithstanding the other provisions. In practice, a veteran rated 100% and married, with one child of 16 and one of 20 in college, receives the basic rate for a spouse and one child plus the full school amount: ${usdx(comp(100, { spouse: true, kids: 1, school: 1 }))}. A veteran whose only child is in college receives the rate for a spouse without children plus the school amount, ${usdx(comp(100, { spouse: true, school: 1 }))} at 100%.</p>
<h2>The forms</h2>
<ul>
<li><strong>VA Form 21-686c</strong>, Application Request to Add and/or Remove Dependents: marriage, birth, adoption, stepchildren, divorce, death. It can be filed online in a few minutes and asks for Social Security numbers and dates.</li>
<li><strong>VA Form 21-674</strong>, Request for Approval of School Attendance: for each child aged 18 to 23 in school, at the start of each school year.</li>
<li><strong>VA Form 21P-509</strong>, Statement of Dependency of Parent(s): the parent's income, expenses and net worth.</li>
<li><strong>VA Form 21-2680</strong>, examination for housebound status or permanent need for regular aid and attendance: used to show that a spouse needs Aid and Attendance.</li>
</ul>
<h2>Dates: when the extra money starts and stops</h2>
<p>VA ties dependents to the effective date of the award. If the dependent already existed when your rating of 30% or more took effect and you report it with the claim or within a year of the notice, VA pays from that date. A new dependent reported within a year of the event is paid from the first day of the month after the marriage, birth or adoption. Reported later, payment starts from the date VA receives the form. Stopping works the same way in reverse: the spouse amount ends after a divorce or death, the child amount at 18 unless a school certification is on file, and the school amount at 23 or when the child leaves school. Payments made after those dates are overpayments VA will collect, so report the changes as promptly as the additions.</p>
<h2>Common mistakes</h2>
<p>The most frequent error is never adding the family at all: a veteran rated 10% at discharge who later reaches 50% through increases may still be paid as single. The second is the eighteenth birthday of a child in college: without a new 21-674, VA drops the child and the payment falls by the child amount. The third concerns parents: a parent who lives with the veteran and has little income often qualifies, but few veterans ask. The ${h.a('home', 'VA disability calculator')} shows the amount you should be receiving with your family; compare it with your award letter.</p>
<h2>Dependents and other benefits</h2>
<p>The dependents on your award also count elsewhere. CRSC uses the VA amount of the combat-related rating, and the ${h.a('crdp', 'CRDP calculator')} shows the effect of dependents on a retiree's total. A permanent and total rating opens Dependents' Educational Assistance and CHAMPVA for the family; see the ${h.a('va-100-percent', '100% page')}. After the veteran's death, survivors may receive ${h.a('dic-rates', 'DIC')}, which has its own amounts for children.</p>`,
  related: ['home', 'va-disability-rates', 'va-30-percent', 'va-100-percent', 'dic-rates'],
  sources: ['vaRates', 'usc1115'],
});
