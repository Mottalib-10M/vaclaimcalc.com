import { definePage } from '../../lib/page-types';
import { P, pay, retiredPay, multiplier, brsMatch, tspProject, usd, day } from '../../lib/kit';

const h3 = (g: string, y: number) => retiredPay('high3', pay(g, y - 1), y).monthly;
const brs = (g: string, y: number) => retiredPay('brs', pay(g, y - 1), y).monthly;
const careerMatch = tspProject({ annualPay: pay('E-5', 6) * 12, contribPct: 5, brs: true, years: 20, returnPct: 0, balance: 0, raisePct: 0 }).gov;
const grown = tspProject({ annualPay: pay('E-5', 6) * 12, contribPct: 5, brs: true, years: 20, returnPct: 5, balance: 0, raisePct: 0 });

export default definePage({
  id: 'brs-calculator',
  group: 'retire',
  kind: 'guide',
  order: 30,
  slug: 'brs-calculator',
  nav: 'BRS calculator',
  card: 'Blended Retirement System: the 2% pension, the 5% TSP match, continuation pay and the lump sum',
  title: 'BRS Calculator 2026: Blended Retirement Pension and TSP',
  description: `BRS calculator 2026: the Blended Retirement System pays ${P.retire.brsMult}% of the high-36 per year (${multiplier('brs', 20)}% at 20) plus up to 5% of basic pay in TSP money. Compare it with High-3.`,
  h1: 'Blended Retirement System (BRS) calculator',
  intro: 'What the Blended Retirement System gives up in pension, what it adds in TSP money, and how the two compare with High-3 over a career.',
  resume: `The Blended Retirement System, in force since ${day(P.retire.brsStart)} for everyone who joined from that date and chosen in 2018 by many members already serving, combines a smaller pension with government money in the Thrift Savings Plan. The pension multiplier is ${P.retire.brsMult}% of the high-36 average per year of service, so ${multiplier('brs', 20)}% at twenty years against ${multiplier('high3', 20)}% under High-3: for an E-7 retiring at twenty, about ${usd(brs('E-7', 20))} a month instead of ${usd(h3('E-7', 20))}. In exchange, the service puts ${P.tsp.brsAuto}% of basic pay into the member's TSP automatically and matches the member's contributions up to ${P.tsp.brsMatchMax}% more, so a member who contributes 5% receives 5% from the service. Members who leave before twenty years, the large majority, keep that TSP money, while High-3 would have given them nothing. BRS also pays continuation pay at mid-career and allows a lump sum at retirement in exchange for a reduced pension until full Social Security retirement age.`,
  mini: 'brsVsHigh3',
  faqs: [
    { q: 'How much does BRS pay at 20 years?', a: `${multiplier('brs', 20)}% of the high-36 average of basic pay, against ${multiplier('high3', 20)}% under High-3. For an E-7 at twenty years, that is about ${usd(brs('E-7', 20))} a month at 2026 rates, and for an O-4 about ${usd(brs('O-4', 20))}. The pension is adjusted each December for inflation, like High-3 retired pay.` },
    { q: 'How does the BRS TSP match work?', a: `After 60 days of service the member receives an automatic ${P.tsp.brsAuto}% of basic pay in the TSP. When matching applies, the service adds 100% of the first 3% the member contributes and 50% of the next 2%, so contributing 5% brings the full ${brsMatch(5).total}% from the service. Contributing less leaves money on the table: at 3%, the service total is ${brsMatch(3).total}%.` },
    { q: 'Is BRS better than High-3?', a: 'For a member who stays twenty years or more, High-3 usually pays more over a lifetime, unless TSP returns are strong and the member contributes at least 5% throughout. For a member who leaves earlier, BRS is better, because High-3 pays nothing before twenty years. The choice is closed today: new members are in BRS and the 2018 opt-in window has ended.' },
    { q: 'What is BRS continuation pay?', a: 'A one-time cash payment to members under BRS who agree to serve additional years at mid-career, generally between eight and twelve years of service. The multiple is set by each service: 2.5 to 13 times monthly basic pay for active members, less for reservists. It is taxable and paid in addition to the TSP match.' },
    { q: 'What is the BRS lump sum option?', a: 'At retirement, a BRS member can take 25% or 50% of the discounted value of retired pay up to full Social Security retirement age as a lump sum. Retired pay is then reduced by 25% or 50% until that age, when it returns to the full amount with its adjustments. The election must be made at least 90 days before retirement.' },
  ],
  body: (h) => `
<h2>BRS and High-3 at common retirement points</h2>
${h.table(['Grade and years', 'High-3 per month', 'BRS per month', 'Pension gap per year'], [['E-6', 20], ['E-7', 20], ['E-8', 24], ['O-4', 20], ['O-5', 24]].map(([g, y]) => [`${g} at ${y} years`, usd(h3(g as string, y as number)), usd(brs(g as string, y as number)), usd((h3(g as string, y as number) - brs(g as string, y as number)) * 12)]), 'Gross retired pay, 2026 basic pay of the year before retirement as the high-36 estimate.', ['l', 'r', 'r', 'r'])}
<h2>What the TSP match has to make up</h2>
<p>The pension gap above lasts for life, so the question is whether the TSP money closes it. A member who serves twenty years with an average basic pay close to an E-5 with six years, ${usd(pay('E-5', 6))} a month, and contributes 5% receives about ${usd(careerMatch)} from the service over the career before any growth. At a 5% yearly return, the member's and the service's contributions together would grow to about ${usd(grown.balance)} after twenty years. The comparison depends heavily on the return assumed, on how long the member lives and on whether the member actually contributes 5% every year, which is why the calculator above lets you vary the inputs rather than giving a single verdict.</p>
<h2>Leaving before twenty years</h2>
<p>This is where BRS changes the most. Under High-3, a member who leaves at eight or twelve years walks away with no pension at all. Under BRS, the TSP account is the member's: the member's own contributions and the matching contributions belong to the member immediately, and the automatic ${P.tsp.brsAuto}% vests after two years of service. A member who served six years, contributed 5% and received the full match leaves with ten percent of six years of basic pay in the TSP, plus the growth, which can stay invested or be rolled into an IRA or a civilian employer's plan. For the majority of members, who serve less than twenty years, BRS is a clear gain.</p>
<h2>BRS for reservists</h2>
<p>Reserve and Guard members under BRS earn the same ${P.retire.brsMult}% multiplier, applied to the years computed from their retirement points (points divided by 360), with retired pay starting at 60 or earlier for qualifying active duty. The TSP match is paid on the basic pay they actually earn in drills and on active duty, which is smaller than for active members, and continuation pay multiples are lower. For a reservist, the TSP part of BRS can still add up over a long career of drills and mobilizations.</p>
<h2>Who is in BRS</h2>
<p>Every member who first entered the uniformed services on or after January 1, 2018 is in BRS. Members serving on December 31, 2017 with fewer than twelve years of service (or fewer than 4,320 retirement points for reservists) could opt in during calendar year 2018; those who did not remain under High-3, and those with more years were not eligible. The election was irrevocable. Today a member's system appears on the LES and in the service's personnel records.</p>
<h2>Automatic enrollment and the 5% rule</h2>
<p>Members who joined since October 1, 2020 are enrolled automatically at 5% of basic pay, which captures the full match. Those enrolled earlier at 3%, or who lowered their contribution, should check: the match stops at 5%, and contributions beyond it are not matched but still count toward the yearly limit of ${usd(P.tsp.elective)} in 2026. Catch-up contributions from age 50 are allowed on top. See the ${h.a('tsp-contribution-limits', 'TSP contribution limits')}.</p>
<h2>The lump sum, carefully</h2>
<p>The lump sum is computed with a discount rate published each year by the Department of Defense, and it is usually worth much less than the retired pay given up. It is taxable in the year received unless part of it is rolled over. It can make sense for a retiree with a precise use for the money, but it lowers retired pay for many years, often until age 67. The ${h.a('military-retirement-calculator', 'retirement calculator')} shows the full monthly pension, and the ${h.a('tsp-calculator', 'TSP calculator')} projects the investment side.</p>`,
  related: ['military-retirement-calculator', 'tsp-calculator', 'high-3-calculator', 'tsp-contribution-limits', 'military-retirement-pay'],
  sources: ['usc1409', 'dfasBrs', 'tspLimits'],
});
