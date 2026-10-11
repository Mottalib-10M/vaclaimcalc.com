/**
 * Military basic pay (DFAS tables effective January 1, 2026) and BAS 2026.
 * Years of service follow the DFAS columns: "2 or less", "over 2", "over 3", "over 4", then every two years to "over 40".
 */
import T from '../../data/pay-2026.json';
import P from '../../data/params-2026.json';

export type Grade = (typeof T.grades)[number];
export const GRADES = T.grades as string[];
export const PAY_COLS = T.cols as string[];
const PAY = T.pay as unknown as Record<string, Array<number | null>>;

const STEPS = PAY_COLS.slice(1).map(Number); // 2, 3, 4, 6, 8 … 40
/**
 * Column index for COMPLETED years of service: 4 completed years and a few days is "over 4".
 * 0 or 1 completed year is "2 or less".
 */
export function colIndex(completedYears: number): number {
  const y = Math.max(0, Math.floor(completedYears));
  return STEPS.filter((t) => t <= y).length;
}

/** Monthly basic pay; null when the grade has no rate at that seniority (blank cell of the DFAS table). */
export function basePay(grade: string, years: number): number | null {
  const row = PAY[grade];
  if (!row) return null;
  return row[colIndex(years)] ?? null;
}

/** Monthly basic pay with the nearest defined cell when the exact one is blank (E-9 under 10 years…). */
export function basePayOrFirst(grade: string, years: number): { pay: number; col: number; adjusted: boolean } {
  const row = PAY[grade];
  const c = colIndex(years);
  if (row[c] != null) return { pay: row[c] as number, col: c, adjusted: false };
  const first = row.findIndex((x) => x != null);
  return { pay: row[first] as number, col: first, adjusted: true };
}

export const payRow = (grade: string) => PAY[grade];
export const isOfficer = (grade: string) => grade.startsWith('O') || grade.startsWith('W');
export const bas = (grade: string) => (isOfficer(grade) ? P.pay.bas.officer : P.pay.bas.enlisted);
export const E1_UNDER_4_MONTHS = T.e1Under4Months;
export const CAP_O7 = T.capO7to10;
export const CAP_O6 = T.capO6Below;

/** Column label as DFAS prints it. */
export const colLabel = (i: number) => (i === 0 ? '2 or less' : `Over ${PAY_COLS[i]}`);

/** Lower bound of years for a column (used to pick representative years). */
export const colYears = (i: number) => (i === 0 ? 2 : Number(PAY_COLS[i]) + 1);
