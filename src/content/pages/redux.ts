import { definePage } from '../../lib/page-types';
import { P, pay, retiredPay, multiplier, colaPct, usd } from '../../lib/kit';

const base = (g: string, y: number) => pay(g, y - 1);
const R = (g: string, y: number) => retiredPay('redux', base(g, y), y);
const H = (g: string, y: number) => retiredPay('high3', base(g, y), y);
const yrs = [20, 22, 24, 26, 28, 30];

export default definePage({
  id: 'redux',
  group: 'retire',
  kind: 'guide',
  order: 45,
  slug: 'redux-career-status-bonus',
  nav: 'REDUX and the CSB',
  card: 'The career status bonus and REDUX: the reduced multiplier, the reduced COLA and the reset at 62',
  title: 'REDUX Retirement 2026: Career Status Bonus Trade-Off',
  description: `REDUX retirement 2026: ${usd(P.retire.cspBonus)} career status bonus at 15 years, then ${multiplier('redux', 20)}% instead of ${multiplier('high3', 20)}% at 20 years and COLA minus 1 point, with a recomputation at age 62.`,
  h1: 'REDUX and the career status bonus',
  intro: 'What members who took the $30,000 career status bonus give up in retired pay, how much, and what changes at age 62.'.replace('$30,000', usd(P.retire.cspBonus)),
  resume: `REDUX is the retirement option that comes with the career status bonus. Members who entered service after July 31, 1986 and before January 1, 2018 and remained under High-3 can elect, at fifteen years of active service, to receive a ${usd(P.retire.cspBonus)} bonus in exchange for a smaller pension, according to DFAS. The trade-off has two parts. First, the High-3 multiplier of ${P.retire.high3Mult}% a year is reduced by one percentage point for each year short of thirty, so ${multiplier('redux', 20)}% instead of ${multiplier('high3', 20)}% at twenty years, ${multiplier('redux', 25)}% instead of ${multiplier('high3', 25)}% at twenty-five, and no difference at thirty. Second, the yearly cost-of-living adjustment is one point lower: ${colaPct('redux')}% instead of ${colaPct('high3')}% for December 2025. At 62, retired pay is recomputed to the amount High-3 would have paid, with the full adjustments to date, but the reduced adjustment applies again in the following years. For an E-7 retiring at twenty, the pension is about ${usd(R('E-7', 20).monthly)} a month instead of ${usd(H('E-7', 20).monthly)} until 62.`,
  mini: 'redux',
  faqs: [
    { q: 'How much does REDUX reduce military retirement?', a: `At twenty years, the multiplier is ${multiplier('redux', 20)}% instead of ${multiplier('high3', 20)}%, a fifth less pension until age 62; at twenty-five years, ${multiplier('redux', 25)}% instead of ${multiplier('high3', 25)}%; at thirty, no reduction. The cost-of-living adjustment is also one point lower every year for life, apart from the one-time catch-up at 62.` },
    { q: 'What happens to REDUX retired pay at age 62?', a: 'DFAS recomputes retired pay to what it would have been under High-3, with the full multiplier and the full cost-of-living adjustments since retirement. From then on, the yearly adjustment is again one point lower than for High-3 retirees, so the REDUX amount slowly falls behind again in the following decades.' },
    { q: 'Is the career status bonus worth it?', a: `For most members who reach twenty years, no: the ${usd(P.retire.cspBonus)} bonus, taxable when received, is usually worth less than the pension given up before 62 and the lower adjustments after. It can make sense for a member with an urgent use for cash or who invests it with strong returns, but the analysis depends on retirement age, life expectancy and inflation.` },
    { q: 'Does REDUX apply to disability retirees?', a: 'Partly. According to DFAS, members retired for disability who had elected CSB/REDUX do not have their multiplier reduced when disability retired pay is computed, but they do receive the reduced cost-of-living adjustment for life. Reserve and Guard members with a non-regular retirement at 60 also keep the full multiplier but have the reduced adjustment.' },
  ],
  body: (h) => `
<h2>REDUX against High-3 for an E-8</h2>
${h.table(['Years at retirement', 'REDUX multiplier', 'High-3 multiplier', 'REDUX until 62', 'High-3'], yrs.map((y) => [`${y}`, `${multiplier('redux', y)}%`, `${multiplier('high3', y)}%`, usd(R('E-8', y).monthly), usd(H('E-8', y).monthly)]), 'Monthly gross retired pay of an E-8 with the 2026 basic pay of the year before retirement as the base.', ['l', 'r', 'r', 'r', 'r'])}
<p>The gap is largest at twenty years and disappears at thirty, because the REDUX cut is one point per year short of thirty. A member who planned to serve thirty years from the start lost little by taking the bonus, apart from the lower adjustments; a member who retires at twenty loses a fifth of the pension for the years until 62.</p>
<h2>The cost of the lower adjustment</h2>
<p>The second part of the trade-off is less visible but lasts for life. Each December, REDUX retired pay rises by the change in consumer prices minus one point. Over twenty years of retirement before age 62, that compounding gap grows: with prices rising ${P.retire.colaPct}% a year, a pension that rises ${colaPct('redux')}% falls about ${Math.round((1 - Math.pow((1 + colaPct('redux') / 100) / (1 + colaPct('high3') / 100), 20)) * 100)}% behind a High-3 pension over two decades. The recomputation at 62 restores the High-3 amount once, then the gap starts to build again.</p>
<h2>What the bonus is worth</h2>
<p>The ${usd(P.retire.cspBonus)} bonus is paid at fifteen years, in one payment or in installments, and is taxable unless received in a combat zone. Members who elect it agree to serve to twenty years; leaving earlier can mean repaying part of it. In exchange, an E-7 retiring at twenty gives up about ${usd((H('E-7', 20).monthly - R('E-7', 20).monthly) * 12)} a year until 62, before the effect of the lower adjustments. Over the fifteen to twenty years between a typical retirement and age 62, that is many times the bonus.</p>
<h2>A worked example over a retirement</h2>
<p>Take an E-8 retiring at twenty-two years at age 41. Under REDUX, the multiplier is ${multiplier('redux', 22)}% instead of ${multiplier('high3', 22)}%, so the first-year pension is about ${usd(R('E-8', 22).monthly)} a month instead of ${usd(H('E-8', 22).monthly)}, a difference of ${usd((H('E-8', 22).monthly - R('E-8', 22).monthly) * 12)} a year. For the twenty-one years until 62, that difference keeps growing because of the lower adjustment. At 62 the pension jumps back to the High-3 amount, then lags again for the rest of the retiree's life. Against that, the member received the bonus at fifteen years of service, seven years before retiring and about twenty-eight years before the recomputation at 62. Whether the bonus, invested, could have matched the loss depends on returns that few investors achieve over such a long period.</p>
<h2>Who could elect it</h2>
<p>DFAS describes the option as open to members who entered service after July 31, 1986 and before January 1, 2018, when they reach their fifteenth year of active service, and who are under High-3. Members under the Blended Retirement System, which includes everyone who entered from 2018, have no career status bonus; BRS offers continuation pay at mid-career instead. A member who elected REDUX keeps it for good; the election cannot be reversed.</p>
<h2>Using the calculator</h2>
<p>The mini calculator above compares REDUX and High-3 for your high-36 average and years. The ${h.a('military-retirement-calculator', 'military retirement calculator')} includes REDUX among the systems and shows the recomputed amount at 62. For the High-3 base itself, see the ${h.a('high-3-calculator', 'High-3 page')}; for the alternative of new members, the ${h.a('brs-calculator', 'BRS calculator')}.</p>
<p>REDUX retirees who later receive a VA rating of 50% or more are treated like other retirees for CRDP: the restored amount is their REDUX retired pay. For Chapter 61 retirees who had elected REDUX, DFAS notes that the CRDP exemption is limited to what their non-disability retired pay would be with the REDUX reduction, which can make it smaller than the disability retired pay itself.</p>
<p>If you are unsure whether you elected REDUX, the retiree account statement and the LES before retirement show the retirement plan; the bonus also appears on the tax records of the year it was paid.</p>`,
  related: ['military-retirement-calculator', 'high-3-calculator', 'brs-calculator', 'military-retirement-pay', 'crdp'],
  sources: ['dfasRedux', 'usc1409', 'usc1401a'],
});
