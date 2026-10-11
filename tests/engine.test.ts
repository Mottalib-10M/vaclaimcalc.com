/**
 * Engines against official references: every cell of 38 CFR 4.25 Table I, the examples printed in 38 CFR 4.25
 * and 4.26, the worked examples of va.gov (rates and SMC pages), DFAS 2026 cells, DTMO ZIP file samples,
 * and the statutory formulas of retired pay, GI Bill and TSP.
 */
import { describe, it, expect } from 'vitest';
import table from './fixtures/cfr425.json';
import zipSample from './fixtures/zip-sample.json';
import Z from '../src/data/zipmha-2026.json';
import { combineTwo, combinedValue, toTens, combine, compensation, tdiuSchedular } from '../src/lib/engine/va';
import { basePay, colIndex, bas } from '../src/lib/engine/pay';
import { decodeZips, zipToMha, bahRate, mhaLabel, MHAS } from '../src/lib/engine/bah';
import { multiplier, retiredPay, concurrent, sbp, fers, militaryDeposit, colaPct } from '../src/lib/engine/retire';
import { giTier, pursuit, giBill, brsMatch, tspLimit, tspProject } from '../src/lib/engine/edu';

describe('38 CFR 4.25 combined ratings', () => {
  it('reproduces all 684 cells of Table I', () => {
    let n = 0;
    for (const [row, cols] of Object.entries(table as Record<string, Record<string, number>>)) {
      for (const [col, v] of Object.entries(cols)) { expect(combineTwo(Number(row), Number(col)), `${row} with ${col}`).toBe(v); n++; }
    }
    expect(n).toBe(684);
  });
  it('examples printed in 4.25(a)', () => {
    expect(combinedValue([50, 30])).toBe(65); expect(toTens(65)).toBe(70);
    expect(combinedValue([40, 20])).toBe(52); expect(toTens(52)).toBe(50);
    expect(combinedValue([60, 40, 20])).toBe(81); expect(toTens(81)).toBe(80);
    expect(combinedValue([60, 30])).toBe(72);
    expect(combinedValue([10, 10])).toBe(19);
  });
  it('rounding happens once, at the end', () => {
    expect(combine([{ rating: 30 }, { rating: 20 }, { rating: 10 }]).value).toBe(50);
    expect(combine([{ rating: 70 }, { rating: 50 }, { rating: 30 }, { rating: 10 }]).rating).toBe(90);
    expect(combine([{ rating: 100 }, { rating: 10 }]).rating).toBe(100);
    expect(combine([{ rating: 0 }]).rating).toBe(0);
  });
  it('4.26 bilateral factor: the regulation example 60, 20, 10 and 10 bilateral gives 70', () => {
    const r = combine([{ rating: 60 }, { rating: 20 }, { rating: 10, limb: 'leg', side: 'left' }, { rating: 10, limb: 'leg', side: 'right' }]);
    expect(r.bilateral).toBe(21); expect(r.order).toEqual([60, 21, 20]); expect(r.value).toBe(74); expect(r.rating).toBe(70);
  });
  it('bilateral factor only with both paired extremities', () => {
    const r = combine([{ rating: 10, limb: 'leg', side: 'left' }, { rating: 10, limb: 'arm', side: 'right' }]);
    expect(r.bilateral).toBe(0); expect(r.value).toBe(19);
    expect(combine([{ rating: 10, limb: 'leg', side: 'left' }, { rating: 10, limb: 'leg', side: 'right' }]).value).toBe(21);
  });
  it('4.26(d): never less favorable than without the factor', () => {
    const cs = [{ rating: 40, limb: 'arm' as const, side: 'left' as const }, { rating: 10, limb: 'arm' as const, side: 'right' as const }, { rating: 10, limb: 'leg' as const, side: 'left' as const }, { rating: 30 }];
    expect(combine(cs).value).toBeGreaterThanOrEqual(combinedValue([40, 10, 10, 30]));
  });
  it('TDIU schedular thresholds of 38 CFR 4.16(a)', () => {
    expect(tdiuSchedular([60], 60)).toBe(true);
    expect(tdiuSchedular([40, 30, 30], 70)).toBe(true);
    expect(tdiuSchedular([30, 30, 30, 20], 70)).toBe(false);
  });
});

describe('VA compensation, rates effective December 1, 2025', () => {
  it('table cells', () => {
    expect(compensation(10).monthly).toBe(180.42);
    expect(compensation(20, { spouse: true, kids: 2, school: 0, parents: 0, spouseAA: false }).monthly).toBe(356.66);
    expect(compensation(30).monthly).toBe(552.47);
    expect(compensation(30, { spouse: true, kids: 0, school: 0, parents: 0, spouseAA: false }).monthly).toBe(617.47);
    expect(compensation(100).monthly).toBe(3938.58);
    expect(compensation(100, { spouse: true, kids: 1, school: 0, parents: 0, spouseAA: false }).monthly).toBe(4318.99);
    expect(compensation(60, { spouse: false, kids: 0, school: 0, parents: 2, spouseAA: false }).monthly).toBe(1645.02);
  });
  it('va.gov worked example: 70%, spouse, 3 children under 18, spouse on A&A = $2,367.45', () => {
    expect(compensation(70, { spouse: true, kids: 3, school: 0, parents: 0, spouseAA: true }).monthly).toBe(2367.45);
  });
  it('school children: added at the school amount (38 U.S.C. 1115(1)(F))', () => {
    expect(compensation(100, { spouse: true, kids: 3, school: 1, parents: 0, spouseAA: false }).monthly).toBeCloseTo(4318.99 + 2 * 109.11 + 352.45, 2);
    expect(compensation(100, { spouse: false, kids: 0, school: 1, parents: 0, spouseAA: false }).monthly).toBeCloseTo(3938.58 + 352.45, 2);
  });
  it('2.8% COLA over the 2025 table', () => expect(Math.round((180.42 / 175.51 - 1) * 1000) / 10).toBe(2.8));
});

describe('DFAS basic pay, January 1, 2026', () => {
  it('columns for completed years', () => {
    expect(colIndex(0)).toBe(0); expect(colIndex(1)).toBe(0); expect(colIndex(2)).toBe(1); expect(colIndex(4)).toBe(3);
    expect(colIndex(5)).toBe(3); expect(colIndex(6)).toBe(4); expect(colIndex(20)).toBe(11); expect(colIndex(45)).toBe(21);
  });
  it('cells read on the DFAS tables', () => {
    expect(basePay('E-5', 0)).toBe(3342.9); expect(basePay('E-5', 4)).toBe(3946.8);
    expect(basePay('E-9', 3)).toBeNull();
    expect(basePay('O-10', 20)).toBe(18999.9);
    expect(basePay('O-1E', 4)).toBe(5222.4);
    expect(bas('E-4')).toBe(476.95); expect(bas('O-3')).toBe(328.48); expect(bas('W-2')).toBe(328.48);
  });
});

describe('DTMO BAH 2026', () => {
  const idx = decodeZips(Z);
  it('decodes every ZIP of the file', () => {
    expect(idx.zips.length).toBe(40959);
    for (const [z, m] of Object.entries(zipSample as Record<string, string>)) expect(zipToMha(idx, Number(z)), z).toBe(m);
  });
  it('rates', () => {
    expect(zipToMha(idx, '92101')).toBe('CA038');
    expect(bahRate('CA038', 'E-5', true)).toBe(3975);
    expect(bahRate('CA038', 'E-5', false)).toBe(3147);
    expect(bahRate('NC182', 'E-5', true)).toBe(1806);
    expect(zipToMha(idx, '00000')).toBeNull();
    expect(mhaLabel('CA038')).toBe('San Diego, CA');
    expect(MHAS.length).toBeGreaterThan(330);
  });
});

describe('retired pay', () => {
  it('multipliers of 10 U.S.C. 1409', () => {
    expect(multiplier('high3', 20)).toBe(50); expect(multiplier('brs', 20)).toBe(40);
    expect(multiplier('redux', 20)).toBe(40); expect(multiplier('redux', 30)).toBe(75);
    expect(multiplier('high3', 40)).toBe(100); expect(multiplier('high3', 45)).toBe(100);
    expect(retiredPay('high3', 6000, 20).monthly).toBe(3000);
    expect(retiredPay('redux', 6000, 20).at62).toBe(3000);
    expect(colaPct('high3')).toBe(2.8); expect(colaPct('redux')).toBeCloseTo(1.8, 5);
  });
  it('concurrent receipt (DFAS example: $800 retired pay, 50%, full concurrent receipt)', () => {
    const r = concurrent({ retiredPay: 800, rating: 50, years: 20 });
    expect(r.crdpEligible).toBe(true); expect(r.totalMonthly).toBeCloseTo(800 + 1132.9, 2);
    const low = concurrent({ retiredPay: 2500, rating: 40, years: 20 });
    expect(low.crdp).toBe(0); expect(low.waiver).toBe(795.84); expect(low.totalMonthly).toBeCloseTo(2500, 2);
    const c = concurrent({ retiredPay: 2500, rating: 40, years: 20, combatRating: 30 });
    expect(c.best).toBe('crsc'); expect(c.crsc).toBe(552.47);
    const ch61 = concurrent({ retiredPay: 1500, rating: 60, years: 12, chapter61: true });
    expect(ch61.crdpEligible).toBe(false);
  });
  it('SBP 55% and 6.5%', () => { expect(sbp(2000)).toEqual({ annuity: 1100, premium: 130 }); });
  it('FERS', () => {
    expect(fers(90000, 20, 0, 62).annual).toBeCloseTo(19800, 5);
    expect(fers(90000, 15, 4, 57).cutPct).toBe(25);
    expect(fers(90000, 26, 4, 57).cutPct).toBe(0);
    expect(militaryDeposit(150000)).toBe(4500);
  });
});

describe('GI Bill and TSP', () => {
  it('tiers and rate of pursuit', () => {
    expect(giTier(1095)).toBe(100); expect(giTier(1000)).toBe(90); expect(giTier(200)).toBe(60); expect(giTier(89)).toBe(0); expect(giTier(10, true)).toBe(100);
    expect(pursuit(9)).toBe(80); expect(pursuit(12)).toBe(100); expect(pursuit(6)).toBe(50);
  });
  it('private cap and MHA', () => {
    const r = giBill({ tier: 100, school: 'private', tuition: 45000, bahE5: 3975, credits: 12, online: false, months: 9 });
    expect(r.tuitionPaid).toBe(30908.34); expect(r.capApplied).toBe(true); expect(r.mhaMonthly).toBe(3975);
    expect(r.books).toBeCloseTo(1000, 0);
    const half = giBill({ tier: 100, school: 'public', tuition: 9000, bahE5: 3975, credits: 6, online: false, months: 9 });
    expect(half.mhaMonthly).toBe(0);
    const on = giBill({ tier: 60, school: 'public', tuition: 9000, bahE5: null, credits: 12, online: true, months: 9 });
    expect(on.mhaMonthly).toBeCloseTo(1261 * 0.6, 5);
  });
  it('TSP limits and BRS match', () => {
    expect(tspLimit(40).total).toBe(24500); expect(tspLimit(55).total).toBe(32500); expect(tspLimit(61).total).toBe(35750); expect(tspLimit(64).total).toBe(32500);
    expect(brsMatch(5).total).toBe(5); expect(brsMatch(3).total).toBe(4); expect(brsMatch(0).total).toBe(1); expect(brsMatch(10).total).toBe(5);
    const p = tspProject({ annualPay: 40000, contribPct: 5, brs: true, years: 1, returnPct: 0, balance: 0, raisePct: 0 });
    expect(p.balance).toBe(4000);
  });
});
