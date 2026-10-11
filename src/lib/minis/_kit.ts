/**
 * Shared tools for the mini-simulators (ignored by the registry: "_" prefix).
 * RULE: a mini never imports src/lib/kit.ts nor the BAH engine (100 KB of tables would ship with every page).
 * It may import params-2026.json and the light engines (va, pay, retire, edu). Area figures arrive through `arg`.
 */
import { formatMoney, formatNumber } from '../format';
import P from '../../data/params-2026.json';
export { P };
export const usd = (x: number, d = 0) => formatMoney(x, d);
export const usd2 = (x: number) => formatMoney(x, Number.isInteger(Math.round(x * 100) / 100) ? 0 : 2);
export const num = (x: number, d = 0) => formatNumber(x, d);
export const pc = (x: number, d = 1) => `${formatNumber(x, d)}%`;
export const yesNo = [{ value: '0', label: 'No' }, { value: '1', label: 'Yes' }];
export const counts = (max: number, from = 0) => Array.from({ length: max - from + 1 }, (_, i) => ({ value: String(i + from), label: String(i + from) }));
export const ratingOpts = (from = 10) => [10, 20, 30, 40, 50, 60, 70, 80, 90, 100].filter((r) => r >= from).map((r) => ({ value: String(r), label: `${r}%` }));
export const gradeOpts = (gs: string[]) => gs.map((g) => ({ value: String(gs.indexOf(g)), label: g }));
export function parseArg<T>(arg: string | undefined, fallback: T): T {
  if (!arg) return fallback;
  try { return JSON.parse(arg) as T; } catch { return fallback; }
}
