/**
 * Retirement, GI Bill and TSP tools:
 *  - RetireCalculator: High-3, REDUX or BRS from the grade at retirement (2026 DFAS cell as the high-36
 *    average, or an amount typed), years and months, optional VA rating with CRDP (mode "crdp");
 *  - FersCalculator: FERS basic annuity with military years bought back and the 3% deposit;
 *  - GiCalculator: Post-9/11 GI Bill tuition, housing allowance at the campus ZIP code and books;
 *  - TspCalculator: contributions, BRS match and a projection.
 */
import { useEffect, useMemo, useState } from 'react';
import NumberField from '../ui/NumberField';
import SelectField from '../ui/SelectField';
import Toggle from '../ui/Toggle';
import P from '../../data/params-2026.json';
import Z from '../../data/zipmha-2026.json';
import { GRADES, basePayOrFirst } from '../../lib/engine/pay';
import { decodeZips, zipToMha, bahRate, mhaLabel, type ZipIndex } from '../../lib/engine/bah';
import { retiredPay, concurrent, colaPct, fers, militaryDeposit, type Plan } from '../../lib/engine/retire';
import { giBill, giTier, brsMatch, tspLimit, tspProject } from '../../lib/engine/edu';
import { readParams, num, str, updateURL } from '../../lib/url-state';
import { Result, Rows, usd, usd2, pc } from './parts';

const yn = [{ value: '0', label: 'No' }, { value: '1', label: 'Yes' }];
const PLANS = [{ value: 'high3', label: 'High-3 (joined 1980 to 2017)' }, { value: 'brs', label: 'Blended Retirement System' }, { value: 'redux', label: 'REDUX (took the career status bonus)' }];
const RATING_OPTS = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((x) => ({ value: String(x), label: x === 0 ? 'No VA rating' : `${x}%` }));
const RET_GRADES = GRADES.filter((g) => !['E-1', 'E-2', 'E-3'].includes(g)).map((g) => ({ value: g, label: g }));
let ZIPS: ZipIndex | null = null;
const zipIndex = () => (ZIPS ??= decodeZips(Z));
interface Common { methodHref?: string; idPrefix?: string; grade?: string; years?: number; plan?: Plan; zip?: string; rating?: number }

export function RetireCalculator({ methodHref = '/en/method/', idPrefix = 'rt', grade = 'E-7', years = 20, plan = 'high3', rating = 0, mode = 'retire' }: Common & { mode?: 'retire' | 'crdp' }) {
  const [pl, setPl] = useState<Plan>(plan);
  const [g, setG] = useState(grade);
  const [y, setY] = useState(years);
  const [mo, setMo] = useState(0);
  const [own, setOwn] = useState(0);
  const [rt, setRt] = useState(mode === 'crdp' ? Math.max(rating, 50) : rating);
  useEffect(() => {
    const u = readParams(window.location.search);
    const p = str(u, 'pl', plan); if (p === 'high3' || p === 'brs' || p === 'redux') setPl(p);
    const gg = str(u, 'g', grade); if (GRADES.includes(gg)) setG(gg);
    setY(num(u, 'y', years)); setMo(num(u, 'm', 0)); setOwn(num(u, 'h', 0)); setRt(num(u, 'va', mode === 'crdp' ? Math.max(rating, 50) : rating));
  }, [plan, grade, years, rating, mode]);
  useEffect(() => { updateURL({ pl, g, y, m: mo || undefined, h: own || undefined, va: rt || undefined }); }, [pl, g, y, mo, own, rt]);
  const cell = basePayOrFirst(g, Math.max(0, y - 1)).pay;
  const high36 = own > 0 ? own : cell;
  const r = retiredPay(pl, high36, y, mo);
  const c = rt > 0 ? concurrent({ retiredPay: r.monthly, rating: rt, years: y }) : null;
  const p = idPrefix;
  return (
    <div className="rechner rounded-xl border border-navy-200 bg-white p-4 sm:p-6">
      <form className="grid gap-x-5 gap-y-4 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        <SelectField id={`${p}-pl`} label="Retirement system" value={pl} onChange={(v) => setPl(v as Plan)} options={PLANS} />
        <SelectField id={`${p}-g`} label="Grade at retirement" value={g} onChange={setG} options={RET_GRADES} />
        <NumberField id={`${p}-y`} label="Years of service" value={y} onChange={setY} unit="yrs" max={45} help="20 for an active-duty retirement." />
        <NumberField id={`${p}-m`} label="Extra months" value={mo} onChange={setMo} unit="mo" max={11} />
        <NumberField id={`${p}-h`} label="Your high-36 average (optional)" value={own} onChange={setOwn} unit="$" max={30000} help="Leave empty to use the 2026 basic pay of the grade." />
        <SelectField id={`${p}-va`} label="VA combined rating" value={String(rt)} onChange={(v) => setRt(Number(v))} options={RATING_OPTS} />
      </form>
      <Result label={`Gross retired pay per month (${pl === 'brs' ? 'BRS' : pl === 'redux' ? 'REDUX' : 'High-3'})`} value={usd2(r.monthly)} sub={`${pc(r.multiplierPct)} of ${usd2(high36)}; ${usd(r.annual)} a year before taxes and SBP.`} methodHref={methodHref}
        note={`10 U.S.C. 1409 multipliers. COLA each December: ${pc(colaPct(pl))} at December 1, 2025${pl === 'redux' ? ' (CPI minus 1 point)' : ''}.`}>
        <Rows rows={[
          ['Retired pay base (high-36)', `${usd2(high36)}${own > 0 ? '' : ` (${g} 2026 rate)`}`],
          ['Multiplier', pc(r.multiplierPct)],
          ...(r.at62 ? [['Recomputed at age 62 (High-3 multiplier)', usd2(r.at62)] as [string, string]] : []),
          ...(c ? [
            ['VA compensation, no dependents', usd2(c.va)],
            ['VA waiver', c.crdpEligible ? 'restored by CRDP' : `−${usd2(c.waiver)}`],
            ['Total each month', usd2(c.totalMonthly)],
          ] as Array<[string, string]> : []),
        ]} />
        {c && !c.crdpEligible && <p className="mt-2 text-sm text-navy-800">{rt < 50 ? `Below 50%, VA compensation replaces the same amount of retired pay: CRSC is the only way to keep both, for combat-related disabilities.` : 'CRDP needs 20 years of creditable service.'}</p>}
      </Result>
    </div>
  );
}

export function FersCalculator({ methodHref = '/en/method/', idPrefix = 'fe' }: Common) {
  const [h3, setH3] = useState(85000);
  const [civ, setCiv] = useState(16);
  const [mil, setMil] = useState(4);
  const [age, setAge] = useState(62);
  const [earned, setEarned] = useState(120000);
  useEffect(() => { const u = readParams(window.location.search); setH3(num(u, 'h', 85000)); setCiv(num(u, 'c', 16)); setMil(num(u, 'mil', 4)); setAge(num(u, 'a', 62)); setEarned(num(u, 'e', 120000)); }, []);
  useEffect(() => { updateURL({ h: h3, c: civ, mil, a: age, e: earned }); }, [h3, civ, mil, age, earned]);
  const r = fers(h3, civ, mil, age);
  const without = fers(h3, civ, 0, age);
  const dep = militaryDeposit(earned);
  const gain = r.annual - without.annual;
  return (
    <div className="rechner rounded-xl border border-navy-200 bg-white p-4 sm:p-6">
      <form className="grid gap-x-5 gap-y-4 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        <NumberField id={`${idPrefix}-h`} label="High-3 average salary" value={h3} onChange={setH3} unit="$/yr" max={500000} help="Highest 3 consecutive years of basic pay." />
        <NumberField id={`${idPrefix}-c`} label="Civilian FERS years" value={civ} onChange={setCiv} unit="yrs" max={50} />
        <NumberField id={`${idPrefix}-mil`} label="Military years bought back" value={mil} onChange={setMil} unit="yrs" max={30} help="Only if you are not drawing military retired pay for them." />
        <NumberField id={`${idPrefix}-a`} label="Age when the annuity starts" value={age} onChange={setAge} unit="yrs" min={50} max={80} help="At least your minimum retirement age (57 if born in 1970 or later)." />
        <NumberField id={`${idPrefix}-e`} label="Military basic pay earned in those years" value={earned} onChange={setEarned} unit="$" max={2000000} help="Sum of basic pay, from your earnings statement." />
      </form>
      <Result label="FERS basic annuity per month" value={usd2(r.monthly)} sub={`${usd(r.annual)} a year: ${pc(r.multPct)} × ${r.years} years × ${usd(h3)}${r.cutPct ? `, reduced ${r.cutPct}% for starting before 62` : ''}.`} methodHref={methodHref}
        note="OPM FERS formula: 1% a year, 1.1% when you start at 62 or later with 20 years; MRA+10 reduction of 5% a year under 62. Deposit before interest; the FERS supplement and survivor reduction are not included.">
        <Rows rows={[['Without the military years', `${usd2(without.monthly)} a month`], ['Added by the military buy-back', `${usd(gain)} a year`], ['Deposit (3% of basic pay)', usd(dep)], ['Years to recover the deposit', gain > 0 ? `${Math.max(0.1, Math.round((dep / gain) * 10) / 10)}` : '–']]} />
      </Result>
    </div>
  );
}

export function GiCalculator({ methodHref = '/en/method/', idPrefix = 'gi', zip = '78712' }: Common) {
  const [days, setDays] = useState(1095);
  const [ph, setPh] = useState('0');
  const [school, setSchool] = useState<'public' | 'private'>('public');
  const [tuition, setTuition] = useState(11000);
  const [z, setZ] = useState(zip);
  const [credits, setCredits] = useState(12);
  const [online, setOnline] = useState('0');
  useEffect(() => { const u = readParams(window.location.search); setDays(num(u, 'days', 1095)); setPh(str(u, 'ph', '0') === '1' ? '1' : '0'); setSchool(str(u, 'st', 'public') === 'private' ? 'private' : 'public'); setTuition(num(u, 't', 11000)); setZ(str(u, 'z', zip).slice(0, 5)); setCredits(num(u, 'cr', 12)); setOnline(str(u, 'on', '0') === '1' ? '1' : '0'); }, [zip]);
  useEffect(() => { updateURL({ days, ph: ph === '1' ? 1 : undefined, st: school, t: tuition, z, cr: credits, on: online === '1' ? 1 : undefined }); }, [days, ph, school, tuition, z, credits, online]);
  const tier = giTier(days, ph === '1');
  const code = useMemo(() => (z.length === 5 ? zipToMha(zipIndex(), z) : null), [z]);
  const bahE5 = code ? bahRate(code, 'E-5', true) : null;
  const r = giBill({ tier, school, tuition, bahE5, credits, online: online === '1', months: 9 });
  const p = idPrefix;
  return (
    <div className="rechner rounded-xl border border-navy-200 bg-white p-4 sm:p-6">
      <form className="grid gap-x-5 gap-y-4 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        <NumberField id={`${p}-days`} label="Days of active duty after 9/10/2001" value={days} onChange={setDays} unit="days" max={20000} help="1,095 days (36 months) for 100%." />
        <Toggle id={`${p}-ph`} label="Purple Heart or discharged for a service-connected disability?" value={ph} onChange={setPh} options={yn} />
        <Toggle id={`${p}-st`} label="School" value={school} onChange={(v) => setSchool(v as 'public' | 'private')} options={[{ value: 'public', label: 'Public, in-state' }, { value: 'private', label: 'Private or foreign' }]} />
        <NumberField id={`${p}-t`} label="Net tuition and fees per year" value={tuition} onChange={setTuition} unit="$" max={200000} />
        <div className="grid grid-rows-subgrid row-span-3 content-start gap-y-0">
          <label htmlFor={`${p}-z`} className="mb-1 block text-sm font-medium text-navy-700">Campus ZIP code</label>
          <input id={`${p}-z`} type="text" inputMode="numeric" maxLength={5} value={z} onChange={(e) => setZ(e.target.value.replace(/\D/g, '').slice(0, 5))} className="tabular-nums h-12 w-full rounded-lg border border-navy-300 bg-white px-4 text-lg text-navy-900 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20" />
          <p className="mt-1 text-xs text-navy-500">{code ? `${mhaLabel(code)}: E-5 BAH ${usd(bahE5 ?? 0)}` : z.length === 5 ? 'ZIP not in the DTMO 2026 file' : 'Five digits'}</p>
        </div>
        <NumberField id={`${p}-cr`} label="Credits per term (12 = full time)" value={credits} onChange={setCredits} unit="cr" max={24} />
        <Toggle id={`${p}-on`} label="Online classes only?" value={online} onChange={setOnline} options={yn} />
      </form>
      <Result label={`Post-9/11 GI Bill, 2026-27 school year, at ${tier}%`} value={usd(r.total)} sub={`Tuition paid to the school ${usd(r.tuitionPaid)}, housing ${usd(r.mhaMonthly)} a month for 9 months, books ${usd(r.books)}.`} methodHref={methodHref}
        note={`${r.mhaReason} Rates from August 1, 2026 to July 31, 2027; private cap ${usd2(P.gi.privateCap)}. Yellow Ribbon is not included.`}>
        <Rows rows={[['Eligibility tier', `${tier}%`], ['Rate of pursuit', `${r.pursuitPct}%`], ['Tuition and fees', `${usd(r.tuitionPaid)}${r.capApplied ? ' (capped)' : ''}`], ['Housing per month', usd(r.mhaMonthly)], ['Books (2 terms)', usd(r.books)]]} />
      </Result>
    </div>
  );
}

export function TspCalculator({ methodHref = '/en/method/', idPrefix = 'ts', grade = 'E-5', years = 4 }: Common) {
  const [g, setG] = useState(grade);
  const [y, setY] = useState(years);
  const [pct, setPct] = useState(5);
  const [brs, setBrs] = useState('1');
  const [horizon, setHorizon] = useState(20);
  const [ret, setRet] = useState(6);
  const [bal, setBal] = useState(5000);
  useEffect(() => { const u = readParams(window.location.search); const gg = str(u, 'g', grade); if (GRADES.includes(gg)) setG(gg); setY(num(u, 'y', years)); setPct(num(u, 'c', 5)); setBrs(str(u, 'b', '1') === '0' ? '0' : '1'); setHorizon(num(u, 'n', 20)); setRet(num(u, 'r', 6)); setBal(num(u, 'bal', 5000)); }, [grade, years]);
  useEffect(() => { updateURL({ g, y, c: pct, b: brs, n: horizon, r: ret, bal }); }, [g, y, pct, brs, horizon, ret, bal]);
  const annual = basePayOrFirst(g, y).pay * 12;
  const m = brsMatch(pct);
  const pr = useMemo(() => tspProject({ annualPay: annual, contribPct: pct, brs: brs === '1', years: horizon, returnPct: ret, balance: bal, raisePct: 0 }), [annual, pct, brs, horizon, ret, bal]);
  const yours = Math.min(P.tsp.elective, (annual * pct) / 100);
  const gov = brs === '1' ? (annual * m.total) / 100 : 0;
  const p = idPrefix;
  return (
    <div className="rechner rounded-xl border border-navy-200 bg-white p-4 sm:p-6">
      <form className="grid gap-x-5 gap-y-4 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        <SelectField id={`${p}-g`} label="Pay grade" value={g} onChange={setG} options={GRADES.map((x) => ({ value: x, label: x }))} />
        <NumberField id={`${p}-y`} label="Completed years of service" value={y} onChange={setY} unit="yrs" max={45} />
        <NumberField id={`${p}-c`} label="Your contribution" value={pct} onChange={setPct} unit="%" max={100} help="Share of basic pay." />
        <Toggle id={`${p}-b`} label="Under the Blended Retirement System?" value={brs} onChange={setBrs} options={yn} />
        <NumberField id={`${p}-n`} label="Years of saving" value={horizon} onChange={setHorizon} unit="yrs" max={50} />
        <NumberField id={`${p}-r`} label="Yearly return assumed" value={ret} onChange={setRet} unit="%" max={15} decimals={1} help="Your assumption; past TSP returns do not predict future ones." />
        <NumberField id={`${p}-bal`} label="Current TSP balance" value={bal} onChange={setBal} unit="$" max={5000000} />
      </form>
      <Result label={`Projected TSP balance after ${horizon} years`} value={usd(pr.balance)} sub={`You put in ${usd(pr.you)}, the service ${usd(pr.gov)}, growth ${usd(pr.growth)} (pay held at the 2026 rate).`} methodHref={methodHref}
        note={`2026 limits: ${usd(P.tsp.elective)} of your own contributions, ${usd(P.tsp.annualAdditions)} with matching and tax-exempt combat-zone pay. BRS: 1% automatic plus up to 4% matching.`}>
        <Rows rows={[['Basic pay per year', usd(annual)], ['Your contributions per year', usd(yours)], ['Service contributions per year', brs === '1' ? `${usd(gov)} (${pc(m.total, 0)})` : 'none (legacy High-3)'], ['Match left on the table', brs === '1' && pct < 5 ? `${usd((annual * (5 - m.total)) / 100)} a year: contribute 5%` : 'none'], ['Room under the 2026 limit', usd(Math.max(0, tspLimit(30).elective - yours))]]} />
      </Result>
    </div>
  );
}
