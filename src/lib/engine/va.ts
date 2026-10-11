/**
 * VA disability compensation: combined rating (38 CFR 4.25), bilateral factor (38 CFR 4.26) and the
 * monthly amount with dependents (38 U.S.C. 1114 and 1115, rates effective December 1, 2025).
 * Pure functions, tested in tests/engine.test.ts against every cell of Table I.
 */
import R from '../../data/va-rates-2026.json';

/** Half-up rounding to an integer, as Table I does (25 combined with 90 is 92.5, printed 93). */
const roundHalfUp = (x: number) => Math.floor(x + 0.5 + 1e-9);

/** One cell of Table I: a whole-number combined value with the next rating. */
export function combineTwo(value: number, next: number): number {
  return roundHalfUp(value + (next * (100 - value)) / 100);
}

/** Combined value of several ratings, in order of severity, exactly as found in Table I (not yet rounded to 10). */
export function combinedValue(ratings: number[]): number {
  const r = ratings.filter((x) => x > 0).sort((a, b) => b - a);
  if (!r.length) return 0;
  return r.slice(1).reduce((acc, x) => combineTwo(acc, x), r[0]);
}

/** Conversion to the nearest degree divisible by 10, final 5s upward (4.25(a)), done once per decision. */
export const toTens = (v: number) => Math.min(100, Math.floor((v + 5) / 10) * 10);

export type Limb = 'arm' | 'leg';
export type Side = 'left' | 'right';
export interface Condition { rating: number; limb?: Limb; side?: Side }

/** Bilateral value: the bilateral ratings combined, plus 10% of that value, added (not combined), whole number. */
export function bilateralValue(ratings: number[]): number {
  const c = combinedValue(ratings);
  return c ? roundHalfUp(c * 1.1) : 0;
}

/** True when a set of limb conditions has compensable disabilities of both paired extremities (4.26(c)). */
function paired(cs: Condition[]) {
  const has = (limb: Limb, side: Side) => cs.some((c) => c.rating > 0 && c.limb === limb && c.side === side);
  return (has('arm', 'left') && has('arm', 'right')) || (has('leg', 'left') && has('leg', 'right'));
}

export interface CombinedResult {
  /** Exact combined value (Table I). */
  value: number;
  /** Final rating, rounded to the nearest 10. */
  rating: number;
  /** Ratings actually combined, in order (the bilateral group counted as one). */
  order: number[];
  /** Value of the bilateral group with its 10%, or 0 when it does not apply. */
  bilateral: number;
  /** Ratings kept in the bilateral group. */
  bilateralParts: number[];
}

function evaluate(cs: Condition[], group: Condition[]): CombinedResult {
  const useGroup = group.length >= 2 && paired(group);
  const bilParts = useGroup ? group.map((c) => c.rating) : [];
  const bil = useGroup ? bilateralValue(bilParts) : 0;
  const others = cs.filter((c) => !(useGroup && group.includes(c))).map((c) => c.rating).filter((x) => x > 0);
  const order = [...others, ...(bil ? [bil] : [])].sort((a, b) => b - a);
  const value = combinedValue(order);
  return { value, rating: toTens(value), order, bilateral: bil, bilateralParts: bilParts };
}

/**
 * The whole decision: bilateral factor first on the limb conditions, then every rating in order of severity.
 * 4.26(d): when leaving some bilateral disabilities out of the factor gives a higher evaluation, they are
 * combined separately; we try every subset and keep the most favorable result.
 */
export function combine(conditions: Condition[]): CombinedResult {
  const cs = conditions.filter((c) => c.rating > 0);
  const limbs = cs.filter((c) => c.limb && c.side);
  let best = evaluate(cs, []);
  if (limbs.length >= 2 && paired(limbs)) {
    const n = limbs.length;
    for (let mask = 1; mask < 1 << n; mask++) {
      const g = limbs.filter((_, i) => mask & (1 << i));
      const r = evaluate(cs, g);
      if (r.value > best.value || (r.value === best.value && r.bilateral > best.bilateral && r.rating >= best.rating)) best = r;
    }
  }
  return best;
}

export interface Dependents {
  spouse: boolean;
  /** Children under 18 (or helpless children). */
  kids: number;
  /** Children 18 to 23 in a VA-approved school program. */
  school: number;
  /** Dependent parents, 0 to 2. */
  parents: number;
  /** Spouse who needs Aid and Attendance. */
  spouseAA: boolean;
}
export const NO_DEPS: Dependents = { spouse: false, kids: 0, school: 0, parents: 0, spouseAA: false };

type Row = Record<string, number>;
const rates = R.rates as unknown as Record<string, Row>;
const low = R.low as Record<string, number>;

export interface CompResult { monthly: number; base: number; lines: Array<[string, number]>; dependentsCount: boolean }

/**
 * Monthly compensation. 10% and 20%: one rate, no dependents. 30% and up: the basic rate for spouse, parents
 * and one child under 18, plus each additional child under 18, plus each school child at the school amount
 * (38 U.S.C. 1115(1)(F): "notwithstanding", the amount on account of a school child is the school amount, so an
 * only child in school is added to the rate without children), plus the spouse Aid and Attendance amount.
 */
export function compensation(rating: number, d: Dependents = NO_DEPS): CompResult {
  if (rating <= 0) return { monthly: 0, base: 0, lines: [], dependentsCount: false };
  if (rating < 30) { const v = low[String(rating)]; return { monthly: v, base: v, lines: [[`${rating}% rating, no added amount for dependents`, v]], dependentsCount: false }; }
  const r = rates[String(Math.min(100, rating))];
  const p = Math.max(0, Math.min(2, d.parents));
  const kid = d.kids > 0;
  const key = kid
    ? (d.spouse ? (p ? `cs${p}p` : 'cs') : (p ? `c${p}p` : 'c'))
    : (d.spouse ? (p ? `spouse${p}p` : 'spouse') : (p ? `p${p}` : 'alone'));
  const base = r[key];
  const lines: Array<[string, number]> = [[basicLabel(rating, d.spouse, p, kid), base]];
  let total = base;
  const extraKids = Math.max(0, d.kids - 1);
  if (extraKids) { const v = extraKids * r.addChild; lines.push([`${extraKids} more child${extraKids > 1 ? 'ren' : ''} under 18`, v]); total += v; }
  if (d.school > 0) { const v = d.school * r.addSchool; lines.push([`${d.school} child${d.school > 1 ? 'ren' : ''} 18 to 23 in school`, v]); total += v; }
  if (d.spouse && d.spouseAA) { lines.push(['Spouse receiving Aid and Attendance', r.aa]); total += r.aa; }
  return { monthly: Math.round(total * 100) / 100, base, lines, dependentsCount: true };
}

function basicLabel(rating: number, spouse: boolean, parents: number, kid: boolean) {
  const who = [spouse ? 'spouse' : '', kid ? '1 child' : '', parents ? `${parents} parent${parents > 1 ? 's' : ''}` : ''].filter(Boolean);
  return `Basic rate at ${rating}%${who.length ? `, with ${who.join(', ')}` : ', veteran alone'}`;
}

/** Monthly rate with no dependents. */
export const aloneRate = (rating: number) => compensation(rating).monthly;
/** One cell of the official table, by key (alone, spouse, c, cs, addChild, addSchool, aa…). */
export const rateCell = (rating: number, key: string) => (rating < 30 ? low[String(rating)] : rates[String(rating)][key]);
export const RATINGS = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

/** TDIU schedular threshold (38 CFR 4.16(a)): one disability at 60%, or 70% combined with one at 40%. */
export function tdiuSchedular(ratings: number[], combinedRating: number) {
  const max = Math.max(0, ...ratings);
  return max >= 60 || (combinedRating >= 70 && max >= 40);
}
