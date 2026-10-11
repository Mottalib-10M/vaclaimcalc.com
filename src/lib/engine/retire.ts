/**
 * Military retired pay (10 U.S.C. 1409): High-3 2.5% a year, REDUX 2.5% minus 1 point per year under 30
 * (until age 62), BRS 2.0% a year. Concurrent receipt with VA compensation (10 U.S.C. 1414, CRDP) and
 * CRSC (10 U.S.C. 1413a). SBP (10 U.S.C. 1451, 1452). FERS annuity with military deposit (OPM).
 */
import P from '../../data/params-2026.json';
import { compensation, type Dependents, NO_DEPS } from './va';

const R = P.retire;
export type Plan = 'high3' | 'redux' | 'brs';

/** Multiplier in percent for whole years and extra months of creditable service. */
export function multiplier(plan: Plan, years: number, months = 0): number {
  const y = Math.min(R.maxYears, Math.max(0, years + months / 12));
  if (plan === 'brs') return R.brsMult * y;
  const base = R.high3Mult * y;
  if (plan === 'redux' && y < 30) return Math.max(0, base - R.reduxCut * (30 - y));
  return base;
}

export interface RetireResult { multiplierPct: number; monthly: number; annual: number; at62?: number }
/** Gross monthly retired pay from the high-36 average of basic pay. REDUX is recomputed at 62 with the High-3 multiplier. */
export function retiredPay(plan: Plan, high36: number, years: number, months = 0): RetireResult {
  const m = multiplier(plan, years, months);
  const monthly = (high36 * m) / 100;
  const out: RetireResult = { multiplierPct: m, monthly, annual: monthly * 12 };
  if (plan === 'redux') out.at62 = (high36 * multiplier('high3', years, months)) / 100;
  return out;
}

/** Annual COLA applied to retired pay: CPI (2.8% at December 1, 2025); REDUX gets CPI minus 1 point. */
export const colaPct = (plan: Plan) => (plan === 'redux' ? Math.max(0, R.colaPct - R.reduxColaGap) : R.colaPct);

export interface ConcurrentInput {
  retiredPay: number;
  rating: number;
  deps?: Dependents;
  /** Retired for disability under Chapter 61. */
  chapter61?: boolean;
  /** Creditable years (20 or more needed for CRDP). */
  years: number;
  /** Combined rating of the combat-related disabilities only (CRSC), 0 when none. */
  combatRating?: number;
  /** Monthly retired pay the member would get on longevity alone (Chapter 61 cap); defaults to retiredPay. */
  longevityPay?: number;
}
export interface ConcurrentResult {
  va: number;
  waiver: number;
  /** Retired pay paid after the VA waiver, without CRDP or CRSC. */
  afterWaiver: number;
  crdpEligible: boolean;
  crdp: number;
  crscEligible: boolean;
  crsc: number;
  /** Best of the two (DFAS pays the more favorable one; they cannot be combined). */
  best: 'crdp' | 'crsc' | 'none';
  totalMonthly: number;
}

/**
 * VA compensation reduces retired pay dollar for dollar (38 U.S.C. 5304, 5305) unless CRDP restores it:
 * 20+ years and a rating of 50% or more (Chapter 61: only up to the longevity amount). CRSC: tax free,
 * VA amount for the combat-related rating, capped at the waiver (and, for Chapter 61, so that the total does
 * not exceed the longevity retired pay). The estimate uses the same dependents for the combat-related part.
 */
export function concurrent(i: ConcurrentInput): ConcurrentResult {
  const deps = i.deps ?? NO_DEPS;
  const va = compensation(i.rating, deps).monthly;
  const waiver = Math.min(i.retiredPay, va);
  const afterWaiver = i.retiredPay - waiver;
  const longevity = i.longevityPay ?? i.retiredPay;
  const crdpEligible = i.rating >= P.va.crdpMin && i.years >= 20;
  let crdp = 0;
  if (crdpEligible) crdp = i.chapter61 ? Math.max(0, Math.min(waiver, longevity - afterWaiver)) : waiver;
  const cr = i.combatRating ?? 0;
  const crscEligible = cr >= 10 && waiver > 0;
  let crsc = 0;
  if (crscEligible) {
    crsc = Math.min(compensation(Math.min(cr, i.rating), deps).monthly, waiver);
    if (i.chapter61) crsc = Math.max(0, Math.min(crsc, longevity - afterWaiver));
  }
  const best = crdp === 0 && crsc === 0 ? 'none' : crsc > crdp ? 'crsc' : 'crdp';
  const extra = best === 'crsc' ? crsc : best === 'crdp' ? crdp : 0;
  return { va, waiver, afterWaiver, crdpEligible, crdp, crscEligible, crsc, best, totalMonthly: afterWaiver + va + extra };
}

/** SBP: annuity 55% of the base amount, premium 6.5% of the base amount (members who joined after March 1, 1990). */
export function sbp(baseAmount: number) {
  return { annuity: (baseAmount * R.sbpPct) / 100, premium: (baseAmount * R.sbpPremiumPct) / 100 };
}

/** FERS basic annuity (OPM): 1% of high-3 per year, 1.1% at 62+ with 20+ years; MRA+10 reduction 5% a year under 62. */
export function fers(high3: number, civilianYears: number, militaryYearsBought: number, ageAtStart: number, unreducedByService = false) {
  const F = P.fers;
  const years = civilianYears + militaryYearsBought;
  const mult = ageAtStart >= 62 && years >= F.mult62Years ? F.mult62 : F.mult;
  let annual = (high3 * mult * years) / 100;
  let cutPct = 0;
  if (!unreducedByService && ageAtStart < 62 && years >= 10 && years < 30 && !(years >= 20 && ageAtStart >= 60)) {
    cutPct = Math.min(100, F.earlyCutPerYear * (62 - ageAtStart));
    annual *= 1 - cutPct / 100;
  }
  return { years, multPct: mult, annual, monthly: annual / 12, cutPct };
}
/** Military deposit for FERS credit: 3% of military basic pay earned (service after 2000), before interest. */
export const militaryDeposit = (basicPayEarned: number) => (basicPayEarned * P.fers.militaryDepositPct) / 100;
