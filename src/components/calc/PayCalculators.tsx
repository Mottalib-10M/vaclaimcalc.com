/**
 * Military pay tools (DFAS tables effective January 1, 2026; DTMO BAH 2026; BAS 2026):
 *  - PayChart: grade and years, monthly and annual basic pay, the row of the grade across seniority;
 *  - PayCalculator: basic pay + BAH at a ZIP code + BAS, the regular monthly compensation;
 *  - BahCalculator: ZIP code, grade and dependents, then every grade of the housing area;
 *  - BahTable: every military housing area, filtered by name or state.
 */
import { useEffect, useMemo, useState } from 'react';
import NumberField from '../ui/NumberField';
import SelectField from '../ui/SelectField';
import Toggle from '../ui/Toggle';
import P from '../../data/params-2026.json';
import Z from '../../data/zipmha-2026.json';
import { GRADES, basePayOrFirst, payRow, colLabel, bas, colIndex } from '../../lib/engine/pay';
import { decodeZips, zipToMha, bahRate, mhaLabel, MHAS, BAH_GRADES, type ZipIndex } from '../../lib/engine/bah';
import { readParams, num, str, updateURL } from '../../lib/url-state';
import { Result, Rows, usd, usd2 } from './parts';

const GRADE_OPTS = GRADES.map((g) => ({ value: g, label: g === 'O-1E' || g === 'O-2E' || g === 'O-3E' ? `${g} (over 4 years enlisted)` : g }));
const yn = [{ value: '0', label: 'No' }, { value: '1', label: 'Yes' }];
let ZIPS: ZipIndex | null = null;
const zipIndex = () => (ZIPS ??= decodeZips(Z));

interface Common { methodHref?: string; idPrefix?: string; grade?: string; years?: number; zip?: string }

export function PayChart({ methodHref = '/en/method/', idPrefix = 'pc', grade = 'E-5', years = 4 }: Common) {
  const [g, setG] = useState(grade);
  const [y, setY] = useState(years);
  useEffect(() => { const u = readParams(window.location.search); const gg = str(u, 'g', grade); if (GRADES.includes(gg)) setG(gg); setY(num(u, 'y', years)); }, [grade, years]);
  useEffect(() => { updateURL({ g, y }); }, [g, y]);
  const r = basePayOrFirst(g, y);
  const row = payRow(g);
  const cells = row.map((v, i) => [colLabel(i), v == null ? '–' : usd2(v)] as [string, string]).filter((_, i) => row[i] != null);
  const sel = colIndex(y);
  return (
    <div className="rechner rounded-xl border border-navy-200 bg-white p-4 sm:p-6 lg:grid lg:grid-cols-2 lg:items-start lg:gap-6">
      <form className="grid gap-x-5 gap-y-4 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        <SelectField id={`${idPrefix}-g`} label="Pay grade" value={g} onChange={setG} options={GRADE_OPTS} />
        <NumberField id={`${idPrefix}-y`} label="Completed years of service" value={y} onChange={setY} unit="yrs" max={45} help="Pay entry base date to today, full years only." />
      </form>
      <Result label={`${g} basic pay, ${colLabel(r.col).toLowerCase()} years`} value={usd2(r.pay)} sub={`${usd(r.pay * 12)} a year before taxes, DFAS table effective January 1, 2026 (+${P.pay.raisePct}%).`} methodHref={methodHref}
        note={r.adjusted ? `The DFAS table has no ${g} rate at ${y} years; the first rate of the grade is shown.` : 'Basic pay only: BAH, BAS and special pays come on top and are not taxed the same way.'}>
        <div className="mt-4 max-h-72 overflow-y-auto">
          <table className="w-full text-sm"><tbody className="divide-y divide-navy-200">
            {cells.map(([l, v]) => <tr key={l} className={l === colLabel(sel) ? 'bg-white font-semibold' : ''}><td className="py-1.5 pr-3 text-navy-700">{l}</td><td className="tabular-nums py-1.5 text-right text-navy-900">{v}</td></tr>)}
          </tbody></table>
        </div>
      </Result>
    </div>
  );
}

export function PayCalculator({ methodHref = '/en/method/', idPrefix = 'mp', grade = 'E-5', years = 4, zip = '23511' }: Common) {
  const [g, setG] = useState(grade);
  const [y, setY] = useState(years);
  const [z, setZ] = useState('');
  const zz = z.length === 5 ? z : zip; // empty field = the example ZIP of the page, shown as placeholder
  const [dep, setDep] = useState('1');
  useEffect(() => { const u = readParams(window.location.search); const gg = str(u, 'g', grade); if (GRADES.includes(gg)) setG(gg); setY(num(u, 'y', years)); setZ(str(u, 'z', '').slice(0, 5)); setDep(str(u, 'd', '1') === '0' ? '0' : '1'); }, [grade, years, zip]);
  useEffect(() => { updateURL({ g, y, z: z || undefined, d: dep }); }, [g, y, z, dep]);
  const base = basePayOrFirst(g, y).pay;
  const code = useMemo(() => zipToMha(zipIndex(), zz), [zz]);
  const housing = code ? bahRate(code, g, dep === '1') ?? 0 : 0;
  const food = bas(g);
  const total = base + housing + food;
  return (
    <div className="rechner rounded-xl border border-navy-200 bg-white p-4 sm:p-6 lg:grid lg:grid-cols-2 lg:items-start lg:gap-6">
      <form className="grid gap-x-5 gap-y-4 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        <SelectField id={`${idPrefix}-g`} label="Pay grade" value={g} onChange={setG} options={GRADE_OPTS} />
        <NumberField id={`${idPrefix}-y`} label="Completed years of service" value={y} onChange={setY} unit="yrs" max={45} />
        <div className="grid grid-rows-subgrid row-span-3 content-start gap-y-0">
          <label htmlFor={`${idPrefix}-z`} className="mb-1 block text-sm font-medium text-navy-700">Duty station ZIP code</label>
          <input id={`${idPrefix}-z`} type="text" inputMode="numeric" maxLength={5} value={z} placeholder={`e.g. ${zip}`} onChange={(e) => setZ(e.target.value.replace(/\D/g, '').slice(0, 5))} className="tabular-nums h-12 w-full rounded-lg border border-navy-300 bg-white px-4 text-lg text-navy-900 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20" />
          <p className="mt-1 text-xs text-navy-500">{code ? `${mhaLabel(code)}${z.length === 5 ? '' : ' (example)'}` : 'ZIP not in the DTMO 2026 file'}</p>
        </div>
        <Toggle id={`${idPrefix}-d`} label="With dependents?" value={dep} onChange={setDep} options={yn} />
      </form>
      <Result label="Regular military compensation, per month" value={usd2(total)} sub={`${usd(total * 12)} a year; BAH and BAS are not taxed.`} methodHref={methodHref}
        note="Basic pay (DFAS, January 1, 2026), BAH 2026 of the duty station (DTMO), BAS 2026. Special and incentive pays, COLA and tax withholding are not included.">
        <Rows rows={[['Basic pay (taxable)', usd2(base)], [`BAH${code ? `, ${mhaLabel(code)}` : ''}`, housing ? usd(housing) : 'enter a ZIP code'], ['BAS', usd2(food)], ['Taxable share', `${Math.round((base / (total || 1)) * 100)}%`]]} />
      </Result>
    </div>
  );
}

export function BahCalculator({ methodHref = '/en/method/', idPrefix = 'bah', grade = 'E-5', zip = '92136' }: Common) {
  const [g, setG] = useState(grade);
  const [z, setZ] = useState('');
  const zz = z.length === 5 ? z : zip; // empty field = the example ZIP of the page, shown as placeholder
  const [dep, setDep] = useState('1');
  useEffect(() => { const u = readParams(window.location.search); const gg = str(u, 'g', grade); if (BAH_GRADES.includes(gg)) setG(gg); setZ(str(u, 'z', '').slice(0, 5)); setDep(str(u, 'd', '1') === '0' ? '0' : '1'); }, [grade, zip]);
  useEffect(() => { updateURL({ g, z: z || undefined, d: dep }); }, [g, z, dep]);
  const code = useMemo(() => zipToMha(zipIndex(), zz), [zz]);
  const rate = code ? bahRate(code, g, dep === '1') : null;
  const other = code ? bahRate(code, g, dep !== '1') : null;
  const rows: Array<[string, string]> = code ? BAH_GRADES.filter((x) => x === g || ['E-1', 'E-4', 'E-5', 'E-6', 'E-7', 'E-9', 'W-2', 'O-1', 'O-3', 'O-4', 'O-5', 'O-6'].includes(x)).map((x) => [`${x}${x === g ? ' (you)' : ''}`, `${usd(bahRate(code, x, true) ?? 0)} with · ${usd(bahRate(code, x, false) ?? 0)} without`]) : [];
  return (
    <div className="rechner rounded-xl border border-navy-200 bg-white p-4 sm:p-6 lg:grid lg:grid-cols-2 lg:items-start lg:gap-6">
      <form className="grid gap-x-5 gap-y-4 sm:grid-cols-3 lg:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-rows-subgrid row-span-3 content-start gap-y-0">
          <label htmlFor={`${idPrefix}-z`} className="mb-1 block text-sm font-medium text-navy-700">Duty station ZIP code</label>
          <input id={`${idPrefix}-z`} type="text" inputMode="numeric" maxLength={5} value={z} placeholder={`e.g. ${zip}`} onChange={(e) => setZ(e.target.value.replace(/\D/g, '').slice(0, 5))} className="tabular-nums h-12 w-full rounded-lg border border-navy-300 bg-white px-4 text-lg text-navy-900 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20" />
          <p className="mt-1 text-xs text-navy-500">{code ? `${mhaLabel(code)} (${code})${z.length === 5 ? '' : ', example'}` : 'ZIP not in the DTMO 2026 file'}</p>
        </div>
        <SelectField id={`${idPrefix}-g`} label="Pay grade" value={g} onChange={setG} options={GRADE_OPTS} />
        <Toggle id={`${idPrefix}-d`} label="With dependents?" value={dep} onChange={setDep} options={yn} />
      </form>
      <Result label={`BAH 2026 per month${code ? `, ${mhaLabel(code)}` : ''}`} value={rate != null ? usd(rate) : '–'} sub={rate != null && other != null ? `${dep === '1' ? 'Without' : 'With'} dependents: ${usd(other)}. ${usd(rate * 12)} a year, tax free.` : 'Enter the ZIP code of your permanent duty station.'} methodHref={methodHref}
        note="DTMO 2026 BAH files: rate by military housing area, pay grade and dependency status. Rate protection keeps an older, higher rate for members already at the station.">
        <Rows rows={rows} />
      </Result>
    </div>
  );
}

export function BahTable({ idPrefix = 'bt' }: Common) {
  const [q, setQ] = useState('');
  const [g, setG] = useState('E-5');
  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    return MHAS.filter((m) => m.w && (!s || m.name.toLowerCase().includes(s) || m.code.toLowerCase().startsWith(s))).sort((a, b) => a.name.localeCompare(b.name));
  }, [q]);
  return (
    <div className="rechner rounded-xl border border-navy-200 bg-white p-4 sm:p-6">
      <form className="grid gap-x-5 gap-y-4 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-rows-subgrid row-span-3 content-start gap-y-0">
          <label htmlFor={`${idPrefix}-q`} className="mb-1 block text-sm font-medium text-navy-700">Search a housing area or state</label>
          <input id={`${idPrefix}-q`} type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Norfolk, TX, Fort…" className="h-12 w-full rounded-lg border border-navy-300 bg-white px-4 text-lg text-navy-900 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20" />
          <p className="mt-1 text-xs text-navy-500">{list.length} of {MHAS.filter((m) => m.w).length} areas</p>
        </div>
        <SelectField id={`${idPrefix}-g`} label="Pay grade" value={g} onChange={setG} options={GRADE_OPTS} />
      </form>
      <div data-resultat className="mt-4 max-h-[28rem] overflow-y-auto">
        <table className="journal w-full text-sm"><thead><tr><th scope="col" className="px-2 py-2 text-left">Housing area</th><th scope="col" className="px-2 py-2 text-right">With dependents</th><th scope="col" className="px-2 py-2 text-right">Without</th></tr></thead>
          <tbody>{list.map((m) => <tr key={m.code}><td className="border-b border-navy-100 px-2 py-1.5 text-navy-800">{mhaLabel(m.code)}</td><td className="tabular-nums border-b border-navy-100 px-2 py-1.5 text-right">{usd(bahRate(m.code, g, true) ?? 0)}</td><td className="tabular-nums border-b border-navy-100 px-2 py-1.5 text-right">{usd(bahRate(m.code, g, false) ?? 0)}</td></tr>)}</tbody>
        </table>
      </div>
    </div>
  );
}
