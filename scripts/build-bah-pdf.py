#!/usr/bin/env python3
"""Rebuilds src/data/bah-2025.json (DTMO 2025 BAH rates, PDF) and src/data/bah-components-2026.json
(DTMO 2026 BAH Component Breakdown, PDF) from research/raw/. Requires pypdf."""
import pypdf, re, json, os
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RAW = os.path.join(ROOT, 'research', 'raw'); DATA = os.path.join(ROOT, 'src', 'data')
r = pypdf.PdfReader(os.path.join(RAW, '2025_BAH_Rates.pdf'))
mode = None; w = {}; wo = {}
for p in r.pages:
    for line in p.extract_text().splitlines():
        if 'WITH DEPENDENTS' in line and 'WITHOUT' not in line: mode = 'w'
        if 'WITHOUT DEPENDENTS' in line: mode = 'wo'
        m = re.match(r'^([A-Z]{2}\d{3})\s+(.*?)\s+((?:\d+\s+){23}\d+)\s*$', line)
        if m and mode: (w if mode == 'w' else wo)[m.group(1)] = [int(x) for x in m.group(3).split()]
assert len(w) > 330 and len(wo) > 330
comp = {}
for p in pypdf.PdfReader(os.path.join(RAW, '2026-BAH-Rate-Component-Breakdown.pdf')).pages:
    for line in p.extract_text().splitlines():
        m = re.match(r'^([A-Z]{2}\d{3})\s+(.*?)\s+(\d+)%\s+(\d+)%\s*$', line)
        if m: comp[m.group(1)] = [int(m.group(3)), int(m.group(4))]
assert len(comp) > 290
G = ['E-1','E-2','E-3','E-4','E-5','E-6','E-7','E-8','E-9','W-1','W-2','W-3','W-4','W-5','O-1E','O-2E','O-3E','O-1','O-2','O-3','O-4','O-5','O-6','O-7']
json.dump({'year': 2025, 'grades': G, 'w': w, 'wo': wo}, open(os.path.join(DATA, 'bah-2025.json'), 'w'), separators=(',', ':'))
json.dump({'year': 2026, 'note': 'Average share of rent and utilities in the total housing cost of each MHA, DTMO 2026 BAH Component Breakdown; rates include a five percent member cost sharing.', 'costSharePct': 5, 'mha': comp}, open(os.path.join(DATA, 'bah-components-2026.json'), 'w'), separators=(',', ':'))
print('ok', len(w), len(comp))
