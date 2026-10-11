/**
 * Data kit for page files (build side only, never imported by a mini-simulator): every official figure a
 * page prints comes from here, never typed by hand (RECETTE §17.4, point 7).
 */
import P from '../data/params-2026.json';
import { combine, combinedValue, compensation, rateCell, aloneRate, RATINGS, type Dependents, NO_DEPS } from './engine/va';
import { basePay, basePayOrFirst, payRow, bas, GRADES, colLabel, colIndex, PAY_COLS, CAP_O6, CAP_O7, E1_UNDER_4_MONTHS } from './engine/pay';
import { bahRate, mhaLabel, MHAS, mhaByCode, BAH_GRADES, decodeZips } from './engine/bah';
import Z from '../data/zipmha-2026.json';
import { multiplier, retiredPay, concurrent, sbp, fers, militaryDeposit, colaPct } from './engine/retire';
import { giTier, giBill, brsMatch, tspLimit, tspProject } from './engine/edu';
import { usd, usdx, pct, num, day, listOf } from './fmt';

export { P, usd, usdx, pct, num, day, listOf };
export const deps = (d: Partial<Dependents> = {}): Dependents => ({ ...NO_DEPS, ...d });
/** Monthly VA compensation for a rating and dependents. */
export const comp = (rating: number, d: Partial<Dependents> = {}) => compensation(rating, deps(d)).monthly;
export { colIndex, combine, combinedValue, rateCell, aloneRate, RATINGS, basePay, basePayOrFirst, payRow, bas, GRADES, colLabel, PAY_COLS, CAP_O6, CAP_O7, E1_UNDER_4_MONTHS };
export { bahRate, mhaLabel, MHAS, mhaByCode, BAH_GRADES, multiplier, retiredPay, concurrent, sbp, fers, militaryDeposit, colaPct, giTier, giBill, brsMatch, tspLimit, tspProject };
/** Average basic pay over the last 36 months for a grade, approximated by the current 2026 cell (method page). */
export const pay = (grade: string, years: number) => basePayOrFirst(grade, years).pay;
/** Mini-simulator argument for one housing area: every grade with and without dependents (DTMO 2026). */
export function bahArg(code: string, name?: string) {
  const m = mhaByCode(code);
  if (!m || !m.w || !m.wo) throw new Error(`Unknown MHA ${code}`);
  return { name: name ?? mhaLabel(code), grades: BAH_GRADES, w: m.w, wo: m.wo };
}
/** BAH of a grade at an MHA, with (default) or without dependents; throws on an unknown pair. */
export function bah(code: string, grade: string, withDependents = true): number {
  const v = bahRate(code, grade, withDependents);
  if (v == null) throw new Error(`No BAH for ${code} ${grade}`);
  return v;
}
/** GI Bill housing allowance (E-5 with dependents) of a list of MHAs, for the giMha mini. */
export const giAreas = (codes: string[]) => ({ areas: codes.map((c) => [mhaLabel(c), bah(c, 'E-5', true)] as [string, number]) });
/** First and last cells of a grade in the DFAS table: where pay starts, the column of the last raise, the ceiling. */
export function steps(grade: string) {
  const r = payRow(grade);
  const first = r.findIndex((v) => v != null);
  let last = first;
  for (let i = first + 1; i < r.length; i++) if (r[i] != null && r[i] !== r[i - 1]) last = i;
  return { firstCol: colLabel(first), firstPay: r[first] as number, lastCol: colLabel(last), top: r[r.length - 1] as number, lastYears: last === 0 ? 0 : Number(PAY_COLS[last]) };
}
const ZI = decodeZips(Z);
/** ZIP codes of a housing area in the DTMO 2026 file: count, first and last (5 digits). */
export function zipsOf(code: string) {
  const i = MHAS.findIndex((m) => m.code === code);
  const list: string[] = [];
  ZI.mha.forEach((m, k) => { if (m === i) list.push(String(ZI.zips[k]).padStart(5, '0')); });
  return { n: list.length, first: list[0], last: list[list.length - 1] };
}
export const KIT = { P, usd, usdx, pct, num, day, listOf, comp, deps, combine, combinedValue, rateCell, aloneRate, basePay, pay, bas, bahRate, mhaLabel, retiredPay, multiplier, concurrent, sbp, fers, giBill, giTier, brsMatch, tspLimit, tspProject, colaPct, bah, bahArg, giAreas, mhaByCode, militaryDeposit, zipsOf, steps };
export type Kit = typeof KIT;
