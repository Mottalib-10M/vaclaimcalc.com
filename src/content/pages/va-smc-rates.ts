import { definePage } from '../../lib/page-types';
import { P, comp, usdx, usd, day } from '../../lib/kit';

const S = P.va.smc as Record<string, number>;
const SS = P.va.smcSpouse as Record<string, number>;
const levels = Object.keys(S);

export default definePage({
  id: 'va-smc-rates',
  group: 'va',
  kind: 'guide',
  order: 60,
  slug: 'va-smc-rates',
  nav: 'SMC rates 2026',
  card: 'Special monthly compensation from SMC-K to SMC-R.2, who qualifies and the 2026 amounts',
  title: 'VA SMC Rates 2026: Special Monthly Compensation K to S',
  description: `VA SMC rates 2026: SMC-K adds ${usdx(P.va.smcK)}, SMC-S pays ${usdx(S.S)}, SMC-L ${usdx(S.L)} and SMC-R.2 ${usdx(S['R.2/T'])} a month for a veteran alone, effective December 1, 2025.`,
  h1: 'Special monthly compensation (SMC) rates for 2026',
  intro: 'The 2026 amounts of each SMC level, the losses and situations that lead to them, and how SMC fits with the regular rating and the family.',
  resume: `Special monthly compensation is a second scale of VA payments, above or beside the regular 10% to 100% rates, for specific losses: the loss or loss of use of hands, feet, arms, legs or eyes, blindness, deafness, being housebound, or needing another person's help every day. In 2026, SMC-K adds ${usdx(P.va.smcK)} a month to the regular rate at any rating, up to three times. SMC-S, for a veteran rated 100% with another condition at 60% or who is housebound, pays ${usdx(S.S)} alone. The lettered levels from SMC-L to SMC-O replace the 100% rate with ${usdx(S.L)} to ${usdx(S['O/P'])}, and SMC-R.1 and R.2, for veterans who need aid and attendance, reach ${usdx(S['R.1'])} and ${usdx(S['R.2/T'])}. The rates follow the same cost-of-living adjustment as the regular scale and took effect on ${day(P.va.ratesEffective)}. A spouse, children and parents add to the SMC rate as they do to the 100% rate.`,
  mini: 'smc',
  faqs: [
    { q: 'What is SMC-K and how much does it pay in 2026?', a: `SMC-K is an add-on of ${usdx(P.va.smcK)} a month for the loss or loss of use of a creative organ, a hand, a foot or both buttocks, for blindness in one eye with only light perception, complete deafness in both ears, loss of breast tissue and loss of voice, among others. It is added to the regular rate from 0% to 100% and to every SMC level except O, Q and R, and a veteran can receive up to three.` },
    { q: 'Who qualifies for SMC-S, the housebound rate?', a: `A veteran with one service-connected disability rated 100% who also has other service-connected disabilities rated 60% or more on their own, or who is permanently housebound because of service-connected conditions. SMC-S pays ${usdx(S.S)} a month alone in 2026, against ${usdx(comp(100))} at 100%. The extra conditions must be separate from the 100% condition.` },
    { q: 'What is the difference between SMC-L and SMC-R?', a: `SMC-L covers losses such as both feet, a hand and a foot, blindness in both eyes, being bedridden, or needing regular aid and attendance: ${usdx(S.L)} a month alone in 2026. SMC-R.1 is paid to a veteran at the highest SMC levels who also needs regular aid and attendance, ${usdx(S['R.1'])}, and R.2 when that care must be given by a health professional, ${usdx(S['R.2/T'])}.` },
    { q: 'Does SMC count for dependents like the regular rate?', a: `Yes. The SMC tables include the same family situations as the regular tables, and the added amounts at 100% apply: ${usdx(SS.L - S.L)} more a month for a spouse at SMC-L in 2026, plus the 100% amounts for each extra child and each child in school. A spouse who needs Aid and Attendance adds the same amount as at 100%.` },
  ],
  body: (h) => `
<h2>SMC rates in 2026</h2>
${h.table(['Level', 'Veteran alone', 'With spouse', 'Above the 100% rate (alone)'], levels.map((k) => [`SMC-${k}`, usdx(S[k]), usdx(SS[k]), usdx(S[k] - comp(100))]), `Monthly rates effective ${day(P.va.ratesEffective)}, VA special monthly compensation tables. SMC-K (${usdx(P.va.smcK)}) is added separately.`, ['l', 'r', 'r', 'r'])}
<h2>How the levels are built</h2>
<p>SMC is written in 38 U.S.C. 1114, subsections (k) to (t), which is why the levels carry letters. Each letter is a fixed amount for a defined situation. The scale climbs with the number and severity of the losses: SMC-L for a single serious loss or a need for aid and attendance, SMC-M for more extensive losses such as both hands or both legs above the knee, SMC-N for losses higher on the limbs or combined with blindness, and SMC-O for the most severe combinations, such as the loss of use of both arms at levels preventing a prosthesis. Half steps, written L 1/2, M 1/2 and N 1/2, cover situations between two letters, and a further step applies when a veteran at one level has another independent disability rated 100% or two at 50%.</p>
<p>SMC-K stands apart: it is a small add-on rather than a level, and it can be combined with almost everything, including the regular rates. Up to three SMC-K awards can be paid together, for example for the loss of use of a creative organ and the loss of use of one foot.</p>
<h2>The housebound rate, SMC-S</h2>
<p>SMC-S is the most common route above 100% for veterans without amputations. It requires a single disability rated 100%, so a total rating reached by combination or TDIU based on several conditions does not qualify unless one condition can carry the 100% alone, plus either additional service-connected disabilities independently ratable at 60% or more, or actual confinement to the home or its immediate area because of service-connected conditions. The additional 60% cannot overlap the 100% condition. At ${usdx(S.S)} for a veteran alone, it pays ${usdx(S.S - comp(100))} a month more than 100%.</p>
<h2>Aid and attendance for the veteran</h2>
<p>A veteran who needs the regular help of another person to dress, eat, bathe, take medication or stay safe can qualify for SMC-L on that basis alone. When the veteran already receives the highest levels and also needs that help, SMC-R.1 applies; when the care must be provided by a licensed health professional or under one's supervision, SMC-R.2. This is different from the spouse Aid and Attendance amount, which is a dependent's allowance added to the veteran's rate.</p>
<h2>How to ask for SMC</h2>
<p>VA should consider SMC on its own whenever the evidence shows a qualifying loss, but it is often missed, especially SMC-K and SMC-S. A veteran can raise it in a claim for increase or in a higher-level review of a decision that did not address it. Medical evidence must describe the loss of use in functional terms: whether a hand can grasp, a foot can propel, whether any remaining function is no better than a prosthesis would give. For aid and attendance, VA Form 21-2680 completed by a physician is the usual document.</p>
<h2>SMC and other payments</h2>
<p>SMC is compensation, so it is tax free and counts as the VA amount for a military retiree's waiver; with 20 years and a rating of 50% or more, CRDP restores retired pay as usual. Survivors of a veteran who received SMC can receive ${h.a('dic-rates', 'DIC')}. For the regular scale, see the ${h.a('va-disability-rates', '2026 rate chart')} and the ${h.a('va-100-percent', '100% page')}.</p>
<h2>Loss of use, in practice</h2>
<p>Most SMC levels turn on "loss of use", a legal term with a precise meaning: no effective function remains other than what would be equally well served by an amputation with a suitable prosthesis. For a foot, the question is balance and propulsion; for a hand, grasping and manipulation. Severe nerve damage of a leg from a back injury, complete paralysis of a nerve, or a stroke can meet that test without any amputation. Because the standard is functional, the medical evidence should say what the limb can and cannot do, for example that the veteran cannot stand without bracing or cannot hold a cup, rather than only naming the diagnosis.</p>
<h2>Why SMC matters for the family</h2>
<p>SMC rates include the same family situations as the regular scale, so a married veteran at SMC-L receives ${usdx(SS.L)} a month rather than ${usdx(S.L)}. They also matter after the veteran's death, since a long period of total disability, of which SMC is evidence, can open DIC for survivors.</p>`,
  related: ['va-100-percent', 'va-disability-rates', 'va-90-percent', 'dic-rates', 'home'],
  sources: ['vaSmc', 'vaRates'],
});
