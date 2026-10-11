/**
 * Post-9/11 GI Bill, academic year August 1, 2026 to July 31, 2027 (VA rates page) and TSP 2026 (IRS, TSP).
 */
import P from '../../data/params-2026.json';

const G = P.gi;
/** Eligibility tier (percent) from days of active duty after September 10, 2001. Purple Heart or a
 *  service-connected discharge after 30 continuous days gives 100%. */
export function giTier(days: number, purpleHeartOrDisability = false): number {
  if (purpleHeartOrDisability) return 100;
  for (const [d, p] of G.tiers) if (days >= d) return p;
  return 0;
}

/** Rate of pursuit rounded to the nearest tenth, as VA does (9 of 12 credits: 75% → 80%). */
export const pursuit = (credits: number, fullTime = 12) => Math.min(100, Math.round((credits / fullTime) * 10) * 10);

export type School = 'public' | 'private';
export interface GiInput {
  tier: number;
  school: School;
  /** Net tuition and mandatory fees for the year (in-state rate for a public school). */
  tuition: number;
  /** Monthly E-5 with-dependents BAH of the campus ZIP (resident MHA), or null. */
  bahE5: number | null;
  credits: number;
  fullTime?: number;
  online: boolean;
  /** Months in school during the year (MHA is paid only while enrolled). */
  months: number;
}
export interface GiResult { tuitionPaid: number; mhaMonthly: number; mhaYear: number; books: number; pursuitPct: number; total: number; capApplied: boolean; mhaReason: string }

export function giBill(i: GiInput): GiResult {
  const t = i.tier / 100;
  const pursuitPct = pursuit(i.credits, i.fullTime ?? 12);
  const cap = i.school === 'private' ? G.privateCap : Infinity;
  const capApplied = i.tuition > cap;
  const tuitionPaid = Math.min(i.tuition, cap) * t;
  let mhaMonthly = 0;
  let mhaReason = '';
  if (pursuitPct <= G.minPursuitForMha) mhaReason = `No housing allowance at ${pursuitPct}% rate of pursuit: it must be more than half time.`;
  else {
    const baseMha = i.online ? G.onlineMha : i.bahE5 ?? 0;
    mhaMonthly = baseMha * t * (pursuitPct / 100);
    mhaReason = i.online ? 'Online-only rate: half the national average.' : 'E-5 with dependents BAH of the campus ZIP code.';
  }
  const books = Math.min(G.bookCredits, i.credits * 2) * G.bookPerCredit * t;
  const mhaYear = mhaMonthly * i.months;
  return { tuitionPaid, mhaMonthly, mhaYear, books, pursuitPct, total: tuitionPaid + mhaYear + books, capApplied, mhaReason };
}

const T = P.tsp;
/** BRS government contributions: 1% automatic plus a match up to 4% (100% of the first 3%, 50% of the next 2%). */
export function brsMatch(contribPct: number) {
  const c = Math.max(0, contribPct);
  const match = Math.min(c, 3) + Math.max(0, Math.min(c, 5) - 3) * 0.5;
  return { auto: T.brsAuto, match, total: T.brsAuto + match };
}

/** Employee limit for 2026 by age in the calendar year: elective deferral plus catch-up (50+), higher catch-up at 60 to 63. */
export function tspLimit(age: number) {
  const catchUp = age >= 60 && age <= 63 ? T.catchUp6063 : age >= 50 ? T.catchUp : 0;
  return { elective: T.elective, catchUp, total: T.elective + catchUp };
}

export interface TspInput { annualPay: number; contribPct: number; brs: boolean; years: number; returnPct: number; balance: number; raisePct: number }
/** Year-by-year projection with end-of-year contributions; employee part capped at the elective limit. */
export function tspProject(i: TspInput) {
  let bal = i.balance;
  let pay = i.annualPay;
  let you = 0, gov = 0;
  for (let y = 0; y < i.years; y++) {
    const emp = Math.min(T.elective, (pay * i.contribPct) / 100);
    const g = i.brs ? (pay * brsMatch(i.contribPct).total) / 100 : 0;
    bal = bal * (1 + i.returnPct / 100) + emp + g;
    you += emp; gov += g;
    pay *= 1 + i.raisePct / 100;
  }
  return { balance: bal, you, gov, growth: bal - i.balance - you - gov };
}
