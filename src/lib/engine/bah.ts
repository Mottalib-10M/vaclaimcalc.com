/**
 * BAH 2026 from the DTMO ASCII files: ZIP code to Military Housing Area (MHA), then the monthly rate for a
 * pay grade with or without dependents. The ZIP list is stored compactly (src/data/zipmha-2026.json):
 * base-36 deltas between consecutive ZIP codes, and runs of "count.mhaIndex".
 */
import B from '../../data/bah-2026.json';

export interface Mha { code: string; name: string; w: number[] | null; wo: number[] | null }
export const MHAS: Mha[] = (B.mha as Array<[string, string, number[] | null, number[] | null]>).map(([code, name, w, wo]) => ({ code, name, w, wo }));
export const BAH_GRADES = B.grades as string[];
const byCode = new Map(MHAS.map((m) => [m.code, m]));
export const mhaByCode = (code: string) => byCode.get(code);

export interface ZipIndex { zips: Int32Array; mha: Int32Array }
/** Decodes the compact ZIP file into two parallel arrays (sorted ZIPs, MHA index). */
export function decodeZips(z: { n: number; d: string; r: string }): ZipIndex {
  const zips = new Int32Array(z.n);
  const mha = new Int32Array(z.n);
  let acc = 0;
  z.d.split(',').forEach((x, i) => { acc += parseInt(x, 36); zips[i] = acc; });
  let k = 0;
  for (const run of z.r.split(',')) {
    const [c, m] = run.split('.').map((x) => parseInt(x, 36));
    for (let j = 0; j < c; j++) mha[k++] = m;
  }
  return { zips, mha };
}

/** MHA code for a 5-digit ZIP, or null when the ZIP is not in the DTMO file. */
export function zipToMha(idx: ZipIndex, zip: string | number): string | null {
  const z = typeof zip === 'number' ? zip : parseInt(String(zip).replace(/\D/g, '').slice(0, 5), 10);
  if (!Number.isFinite(z)) return null;
  let lo = 0, hi = idx.zips.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (idx.zips[mid] === z) return MHAS[idx.mha[mid]].code;
    if (idx.zips[mid] < z) lo = mid + 1; else hi = mid - 1;
  }
  return null;
}

/** Monthly BAH for an MHA and a grade (E-1 … O-10, O-1E … O-3E). */
export function bahRate(code: string, grade: string, withDependents: boolean): number | null {
  const m = byCode.get(code);
  const i = BAH_GRADES.indexOf(grade);
  if (!m || i < 0) return null;
  const row = withDependents ? m.w : m.wo;
  return row ? row[i] : null;
}

/** Title-cased MHA name ("SAN DIEGO, CA" → "San Diego, CA"). */
export const mhaLabel = (code: string) => {
  const n = byCode.get(code)?.name ?? code;
  return n.replace(/\b([A-Z])([A-Z']*)\b/g, (_, a: string, b: string) => a + b.toLowerCase()).replace(/, ([A-Za-z]{2})$/, (_, s: string) => `, ${s.toUpperCase()}`).replace(/\b(Afb|Sfb|Nas|Mcas|Mcb|Nws|Jrb|Ab|Dc)\b/g, (x) => x.toUpperCase());
};
