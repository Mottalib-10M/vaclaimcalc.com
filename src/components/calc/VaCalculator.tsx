/**
 * VA disability calculator: ratings (with the limb and side for the bilateral factor), dependents, and for a
 * military retiree the effect on retired pay (CRDP, VA waiver, CRSC). Modes:
 *  - full: everything (home page);
 *  - combined: ratings only, combined value and rounded rating (VA math page);
 *  - rates: one rating chosen directly, dependents, monthly amount (rates page).
 */
import { useEffect, useMemo, useState } from 'react';
import NumberField from '../ui/NumberField';
import SelectField from '../ui/SelectField';
import Toggle from '../ui/Toggle';
import { combine, compensation, tdiuSchedular, type Condition, type Limb, type Side } from '../../lib/engine/va';
import { concurrent } from '../../lib/engine/retire';
import { readParams, num, str, updateURL } from '../../lib/url-state';
import { Result, Rows, usd2, usd } from './parts';

type Mode = 'full' | 'combined' | 'rates';
interface Props { mode?: Mode; methodHref?: string; idPrefix?: string; rating?: number; crdpHref?: string }
interface Row { r: number; where: string }
const RATING_OPTS = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((x) => ({ value: String(x), label: x === 0 ? 'Choose a rating' : `${x}%` }));
const WHERE = [
  { value: '', label: 'Not an arm or leg' },
  { value: 'arm-left', label: 'Left arm or hand' }, { value: 'arm-right', label: 'Right arm or hand' },
  { value: 'leg-left', label: 'Left leg or foot' }, { value: 'leg-right', label: 'Right leg or foot' },
];
const DEFAULT_ROWS: Row[] = [{ r: 50, where: '' }, { r: 30, where: '' }, { r: 10, where: 'leg-left' }, { r: 10, where: 'leg-right' }];
const count = (n: number, max = 10) => Array.from({ length: max + 1 }, (_, i) => ({ value: String(i), label: String(i) }));
const yn = [{ value: '0', label: 'No' }, { value: '1', label: 'Yes' }];

const toCond = (x: Row): Condition => {
  const [limb, side] = x.where ? (x.where.split('-') as [Limb, Side]) : [undefined, undefined];
  return { rating: x.r, limb, side };
};
const encodeRows = (rows: Row[]) => rows.filter((x) => x.r > 0).map((x) => `${x.r}${x.where ? x.where[0] + x.where.split('-')[1][0] : ''}`).join('.');
function decodeRows(s: string): Row[] | null {
  const out = s.split('.').map((t) => { const m = /^(\d{2,3})(a|l)?(l|r)?$/.exec(t); if (!m) return null; const r = Number(m[1]); if (r % 10 || r > 100) return null; return { r, where: m[2] ? `${m[2] === 'a' ? 'arm' : 'leg'}-${m[3] === 'l' ? 'left' : 'right'}` : '' }; });
  return out.every(Boolean) && out.length ? (out as Row[]) : null;
}

export default function VaCalculator({ mode = 'full', methodHref = '/en/method/', idPrefix = 'va', rating = 70, crdpHref = '/en/crdp/' }: Props) {
  const [rows, setRows] = useState<Row[]>(DEFAULT_ROWS);
  const [direct, setDirect] = useState(rating);
  const [spouse, setSpouse] = useState('1');
  const [kids, setKids] = useState(1);
  const [school, setSchool] = useState(0);
  const [parents, setParents] = useState(0);
  const [aa, setAa] = useState('0');
  const [retiree, setRetiree] = useState('0');
  const [retPay, setRetPay] = useState(2800);
  const [years, setYears] = useState(20);
  const [ch61, setCh61] = useState('0');
  const [combat, setCombat] = useState(0);
  useEffect(() => {
    const u = readParams(window.location.search);
    const rr = decodeRows(str(u, 'r', '')); if (rr) setRows(rr);
    setDirect(num(u, 'rt', rating)); setSpouse(str(u, 's', '1') === '0' ? '0' : '1'); setKids(num(u, 'k', 1)); setSchool(num(u, 'sc', 0)); setParents(num(u, 'p', 0)); setAa(str(u, 'aa', '0') === '1' ? '1' : '0');
    setRetiree(str(u, 'ret', '0') === '1' ? '1' : '0'); setRetPay(num(u, 'rp', 2800)); setYears(num(u, 'y', 20)); setCh61(str(u, 'c61', '0') === '1' ? '1' : '0'); setCombat(num(u, 'cb', 0));
  }, [rating]);
  useEffect(() => {
    updateURL({ r: mode !== 'rates' ? encodeRows(rows) : undefined, rt: mode === 'rates' ? direct : undefined, s: mode !== 'combined' ? spouse : undefined, k: mode !== 'combined' ? kids : undefined, sc: school || undefined, p: parents || undefined, aa: aa === '1' ? 1 : undefined, ret: retiree === '1' ? 1 : undefined, rp: retiree === '1' ? retPay : undefined, y: retiree === '1' ? years : undefined, c61: ch61 === '1' ? 1 : undefined, cb: combat || undefined });
  }, [mode, rows, direct, spouse, kids, school, parents, aa, retiree, retPay, years, ch61, combat]);

  const comb = useMemo(() => combine(rows.map(toCond)), [rows]);
  const finalRating = mode === 'rates' ? direct : comb.rating;
  const d = { spouse: spouse === '1', kids, school, parents, spouseAA: spouse === '1' && aa === '1' };
  const c = useMemo(() => compensation(finalRating, d), [finalRating, spouse, kids, school, parents, aa]);
  const conc = useMemo(() => (retiree === '1' && mode === 'full' ? concurrent({ retiredPay: retPay, rating: finalRating, deps: d, years, chapter61: ch61 === '1', combatRating: combat }) : null), [retiree, retPay, finalRating, years, ch61, combat, spouse, kids, school, parents, aa, mode]);
  const p = idPrefix;
  const setRow = (i: number, patch: Partial<Row>) => setRows((o) => o.map((x, j) => (j === i ? { ...x, ...patch } : x)));
  const ratingsUsed = rows.map((x) => x.r).filter((x) => x > 0);

  const ratingLines: Array<[string, string]> = [
    ['Ratings, in order of severity', comb.order.length ? comb.order.map((x) => `${x}${x === comb.bilateral && comb.bilateral ? ' (bilateral)' : ''}`).join(', ') : 'none'],
    ...(comb.bilateral ? [[`Bilateral group ${comb.bilateralParts.join(' + ')}`, `${comb.bilateral} (10% added)`] as [string, string]] : []),
    ['Combined value (38 CFR 4.25 Table I)', `${comb.value}`],
    ['Rounded to the nearest 10', `${comb.rating}%`],
  ];
  const tdiu = ratingsUsed.length > 0 && finalRating < 100 && tdiuSchedular(comb.bilateral ? comb.order : ratingsUsed, finalRating);

  return (
    <div className="rechner rounded-xl border border-navy-200 bg-white p-4 sm:p-6">
      <form onSubmit={(e) => e.preventDefault()}>
        {mode !== 'rates' && (
          <fieldset>
            <legend className="mb-2 text-sm font-semibold text-navy-900">Your service-connected ratings</legend>
            <div className="space-y-3">
              {rows.map((x, i) => (
                <div key={i} className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)_auto] gap-x-3">
                  <SelectField id={`${p}-r${i}`} label={`Rating ${i + 1}`} value={String(x.r)} onChange={(v) => setRow(i, { r: Number(v) })} options={RATING_OPTS} />
                  <SelectField id={`${p}-w${i}`} label="Body part" value={x.where} onChange={(v) => setRow(i, { where: v })} options={WHERE} />
                  <button type="button" onClick={() => setRows((o) => (o.length > 1 ? o.filter((_, j) => j !== i) : o))} className="row-span-3 mt-6 h-12 self-start rounded-lg border border-navy-300 px-3 text-sm text-navy-700 hover:bg-navy-50" aria-label={`Remove rating ${i + 1}`}>Remove</button>
                </div>
              ))}
            </div>
            {rows.length < 12 && <button type="button" onClick={() => setRows((o) => [...o, { r: 10, where: '' }])} className="mt-1 rounded-lg border border-accent-500 px-3 py-2 text-sm font-medium text-accent-700 hover:bg-accent-50">Add a rating</button>}
          </fieldset>
        )}
        {mode === 'rates' && (
          <div className="grid gap-x-5 gap-y-4 sm:grid-cols-2">
            <SelectField id={`${p}-rt`} label="Combined rating" value={String(direct)} onChange={(v) => setDirect(Number(v))} options={RATING_OPTS.slice(1)} />
          </div>
        )}
        {mode !== 'combined' && (
          <fieldset className="mt-5">
            <legend className="mb-2 text-sm font-semibold text-navy-900">Dependents (they count from a 30% rating)</legend>
            <div className="grid gap-x-5 gap-y-4 sm:grid-cols-3">
              <Toggle id={`${p}-s`} label="Married?" value={spouse} onChange={setSpouse} options={yn} />
              <SelectField id={`${p}-k`} label="Children under 18" value={String(kids)} onChange={(v) => setKids(Number(v))} options={count(10)} />
              <SelectField id={`${p}-sc`} label="Children 18 to 23 in school" value={String(school)} onChange={(v) => setSchool(Number(v))} options={count(6)} />
              <SelectField id={`${p}-p`} label="Dependent parents" value={String(parents)} onChange={(v) => setParents(Number(v))} options={count(2)} />
              {spouse === '1' && <Toggle id={`${p}-aa`} label="Spouse needs Aid and Attendance?" value={aa} onChange={setAa} options={yn} />}
              {mode === 'full' && <Toggle id={`${p}-ret`} label="Military retiree?" value={retiree} onChange={setRetiree} options={yn} />}
            </div>
          </fieldset>
        )}
        {mode === 'full' && retiree === '1' && (
          <fieldset className="mt-5">
            <legend className="mb-2 text-sm font-semibold text-navy-900">Retired pay</legend>
            <div className="grid gap-x-5 gap-y-4 sm:grid-cols-2">
              <NumberField id={`${p}-rp`} label="Gross retired pay per month" value={retPay} onChange={setRetPay} unit="$" max={30000} help="Before the VA waiver, from your retiree account statement." />
              <NumberField id={`${p}-y`} label="Years of creditable service" value={years} onChange={setYears} unit="yrs" max={45} />
              <Toggle id={`${p}-c61`} label="Retired for disability (Chapter 61)?" value={ch61} onChange={setCh61} options={yn} />
              <SelectField id={`${p}-cb`} label="Combat-related part of the rating (CRSC)" value={String(combat)} onChange={(v) => setCombat(Number(v))} options={[{ value: '0', label: 'None or not applied' }, ...RATING_OPTS.slice(1)]} />
            </div>
          </fieldset>
        )}
      </form>

      {mode === 'combined' ? (
        <Result label="Your combined VA rating" value={`${comb.rating}%`} sub={`Combined value ${comb.value}, rounded to the nearest 10 (5 goes up)`} methodHref={methodHref}
          note="38 CFR 4.25 Table I, checked against all 684 cells, and the bilateral factor of 38 CFR 4.26 when both arms or both legs are rated. VA's rating decision is final.">
          <Rows rows={ratingLines} />
        </Result>
      ) : (
        <Result label={`Monthly VA compensation at ${finalRating}%`} value={usd2(c.monthly)} sub={`${usd(c.monthly * 12)} a year, tax free. Rates effective December 1, 2025.`} methodHref={methodHref}
          note={finalRating < 30 ? 'At 10% and 20%, VA pays one rate whatever your family situation.' : 'VA basic rate for your family, plus each extra child and the Aid and Attendance amount, exactly as va.gov adds them.'}>
          <Rows rows={[...(mode === 'full' ? ratingLines.slice(-2) : []), ...c.lines.map(([l, v]) => [l, usd2(v)] as [string, string])]} />
          {tdiu && mode === 'full' && <p className="mt-3 text-sm text-navy-800">Your ratings meet the schedular threshold of 38 CFR 4.16(a) for individual unemployability (TDIU). If you cannot keep substantially gainful work, TDIU pays the 100% rate: {usd2(compensation(100, d).monthly)} a month for your family.</p>}
          {conc && (
            <div className="mt-4 border-t border-accent-200 pt-3">
              <p className="text-sm font-semibold text-navy-900">With your retired pay: {usd2(conc.totalMonthly)} a month in total</p>
              <Rows rows={[
                ['Retired pay before the waiver', usd2(retPay)],
                ['VA compensation', usd2(conc.va)],
                ['VA waiver (dollar for dollar)', `−${usd2(conc.waiver)}`],
                ['CRDP restored', conc.crdpEligible ? usd2(conc.crdp) : `not eligible (${finalRating < 50 ? 'rating under 50%' : 'under 20 years'})`],
                ['CRSC (estimate, tax free)', conc.crscEligible ? usd2(conc.crsc) : 'none entered'],
                ['Paid to you', conc.best === 'none' ? 'retired pay after waiver + VA' : `${conc.best.toUpperCase()} applies (the larger one)`],
              ]} />
              <p className="mt-2 text-xs text-navy-600">CRDP and CRSC cannot be combined; DFAS applies the more favorable one. <a className="underline" href={crdpHref}>How CRDP and CRSC work</a>.</p>
            </div>
          )}
        </Result>
      )}
    </div>
  );
}
