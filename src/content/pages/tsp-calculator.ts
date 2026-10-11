import { definePage } from '../../lib/page-types';
import { P, pay, brsMatch, tspProject, usd } from '../../lib/kit';

const T = P.tsp;
const proj = (g: string, y: number, c: number, n: number, r: number) => tspProject({ annualPay: pay(g, y) * 12, contribPct: c, brs: true, years: n, returnPct: r, balance: 0, raisePct: 0 });

export default definePage({
  id: 'tsp-calculator',
  group: 'edu',
  kind: 'pillar',
  order: 40,
  slug: 'tsp-calculator',
  nav: 'TSP calculator',
  card: 'Thrift Savings Plan projection with the BRS match, your contribution rate and the 2026 limits',
  title: 'TSP Calculator 2026: Military Contributions and BRS Match',
  description: `TSP calculator 2026 for service members: your contribution, the BRS ${T.brsAuto}% automatic and up to ${T.brsMatchMax}% match, the ${usd(T.elective)} limit and a projection of the balance.`,
  h1: 'TSP calculator for service members',
  intro: 'How much goes into your Thrift Savings Plan from your basic pay and from your service under the Blended Retirement System, and what it could grow into.',
  resume: `The Thrift Savings Plan is the retirement savings account of federal employees and members of the uniformed services, managed by the Federal Retirement Thrift Investment Board. Service members contribute a percentage of basic pay, traditional or Roth, up to the IRS limit of ${usd(T.elective)} in 2026, with catch-up contributions from age 50. Members under the Blended Retirement System also receive service contributions: ${T.brsAuto}% of basic pay automatically, and a match of up to ${T.brsMatchMax}% more on their own contributions, which reaches its maximum when the member contributes 5%. An E-5 with six years who contributes 5% puts ${usd(pay('E-5', 6) * 12 * 0.05)} a year into the TSP and receives the same from the service. Over twenty years, at a 5% yearly return and pay held at today's level, those contributions would grow to about ${usd(proj('E-5', 6, 5, 20, 5).balance)}. The calculator lets you change the grade, the rate, the horizon and the return assumed.`,
  tool: 'tsp',
  toolProps: { grade: 'E-5', years: 4 },
  faqs: [
    { q: 'How much should I put in the TSP under BRS?', a: `At least 5% of basic pay, the rate at which the service match reaches its maximum: with 5%, the service adds the full ${brsMatch(5).total}% (the automatic ${T.brsAuto}% plus a ${brsMatch(5).match}% match). At 3% you receive ${brsMatch(3).total}%, and at 0% only the automatic ${T.brsAuto}%. Beyond 5%, your contributions are not matched but still grow tax-advantaged up to the ${usd(T.elective)} limit.` },
    { q: 'How much can a service member put in the TSP in 2026?', a: `Up to ${usd(T.elective)} of employee contributions, traditional and Roth combined, plus ${usd(T.catchUp)} of catch-up contributions from age 50, or ${usd(T.catchUp6063)} in the years you turn 60 to 63. All contributions together, including service contributions and tax-exempt combat-zone pay, are limited to ${usd(T.annualAdditions)}.` },
    { q: 'Should I choose Roth or traditional TSP in the military?', a: 'Roth contributions are made from pay already taxed and come out tax free in retirement if the rules are met; traditional contributions lower taxable pay now and are taxed when withdrawn. Junior members in low tax brackets, and anyone contributing from tax-free combat-zone pay, often find Roth attractive. Service contributions always go to the traditional balance.' },
    { q: 'What happens to my TSP when I leave the military?', a: 'The account stays yours. You can leave it in the TSP, where it keeps growing, combine it with a civilian federal TSP account, or roll it to an IRA or an employer plan. The service automatic contributions vest after two years of service; your own contributions and the matching contributions are always yours. Withdrawals before 59½ may carry a penalty.' },
    { q: 'Can I contribute to the TSP from bonuses and special pay?', a: 'Yes. Members can elect separate percentages for basic pay, incentive pay, special pay and bonuses. Only contributions from basic pay are matched under BRS. Contributions from tax-exempt combat-zone pay can exceed the elective deferral limit, up to the overall annual additions limit, and go to the traditional balance as tax-exempt money.' },
    { q: 'Does the TSP calculator predict my returns?', a: 'No. The return is an assumption you choose. The TSP funds have different risks, from the government securities fund to stock index funds and lifecycle funds, and past performance does not predict future results. The projection keeps pay at the 2026 level, so it understates contributions for members who will be promoted.' },
  ],
  body: (h) => `
<h2>Projections at different contribution rates</h2>
${h.table(['Member', 'Contribution', 'Your money per year', 'Service money per year', 'Balance after 20 years (5%)'], [['E-5, 6 years', 'E-5', 6, 3], ['E-5, 6 years', 'E-5', 6, 5], ['E-5, 6 years', 'E-5', 6, 10], ['O-3, 6 years', 'O-3', 6, 5], ['E-7, 12 years', 'E-7', 12, 5]].map(([l, g, y, c]) => { const yearly = pay(g as string, y as number) * 12; const p = proj(g as string, y as number, c as number, 20, 5); return [l as string, `${c}%`, usd(Math.min(T.elective, (yearly * (c as number)) / 100)), usd((yearly * brsMatch(c as number).total) / 100), usd(p.balance)]; }), 'BRS member, 2026 basic pay held constant, 5% yearly return assumed, contributions at year end.', ['l', 'r', 'r', 'r', 'r'])}
<p>The step from 3% to 5% is the most valuable change most members can make: it adds two points of their own pay and one more point from the service. Going from 5% to 10% doubles the member's own savings but brings nothing more from the service.</p>
<h2>How the BRS contributions work</h2>
<p>The automatic ${T.brsAuto}% is paid on basic pay whether or not the member contributes. The match follows a simple scale: the service matches 100% of the first 3% the member contributes and 50% of the next 2%. Members who joined since October 1, 2020 are enrolled automatically at 5%, so they receive the full match unless they lower it. Members under the legacy High-3 system receive no service contributions at all, which makes their own TSP contributions the only source of savings beyond the pension.</p>
<h2>Where the money goes</h2>
<p>Contributions are invested in the TSP funds you select, or by default in the lifecycle fund matching your expected retirement date. The TSP is known for very low administrative costs. The account can be combined with a civilian federal TSP account later; veterans who become federal employees keep a single account. For the 2026 limits and catch-up rules, see ${h.a('tsp-contribution-limits', 'TSP contribution limits')}; for how the TSP fits with the pension, the ${h.a('brs-calculator', 'BRS calculator')}.</p>
<h2>Reading the projection honestly</h2>
<p>A projection is only as good as its assumptions. The calculator keeps basic pay at the 2026 level, so it leaves out promotions and yearly raises, which would increase contributions over a career. It assumes a constant return, while real returns vary from year to year and can be negative for several years in a row. It ignores fees, which are small in the TSP, and taxes on withdrawal for traditional balances. Used to compare choices, such as 3% against 5%, or starting now against starting in five years, it is reliable; used to promise a balance at retirement, it is not.</p>
<h2>Starting early</h2>
<p>Time matters more than the rate in the long run. An E-3 who contributes 5% from the first year and leaves after six years can leave the account invested for decades; the same contributions started ten years later have far less time to grow. That is the main argument behind automatic enrollment at 5% for new members, and the reason the calculator lets you change the number of years independently of the grade.</p>`,
  related: ['tsp-contribution-limits', 'brs-calculator', 'military-retirement-calculator', 'military-pay-calculator', 'fers-retirement-calculator'],
  sources: ['tspLimits', 'irsCola', 'dfasBrs'],
});
