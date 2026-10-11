#!/usr/bin/env python3
"""Rebuilds the official data files of the site from the raw documents kept in research/raw/.

Sources (read on 2026-10-11):
- DFAS basic pay tables "Effective January 1, 2026" (EM, WO, CO, CO with over 4 years enlisted) and BAS page,
  archived copies of dfas.mil (the site answers 403 outside the US);
- DTMO BAH ASCII files 2026 (bahw26.txt, bahwo26.txt, mhanames26.txt, sorted_zipmha26.txt);
- 38 CFR 4.25 Table I from the eCFR API (XML);
- va.gov veteran compensation rates effective December 1, 2025.
Run: python3 scripts/build-data.py   (writes src/data/pay-2026.json, bah-2026.json, zipmha-2026.json,
va-rates-2026.json and tests/fixtures/cfr425.json).
"""
import html, json, os, re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RAW = os.path.join(ROOT, 'research', 'raw')
DATA = os.path.join(ROOT, 'src', 'data')
FIX = os.path.join(ROOT, 'tests', 'fixtures')
os.makedirs(FIX, exist_ok=True)


def text(cell):
    return re.sub(r'\s+', ' ', html.unescape(re.sub(r'<[^>]+>', ' ', cell))).strip()


# ---------- DFAS basic pay ----------
COLS = ['<2', '2', '3', '4', '6', '8', '10', '12', '14', '16', '18', '20', '22', '24', '26', '28', '30', '32', '34', '36', '38', '40']


def pay_table(name):
    s = open(os.path.join(RAW, name), errors='ignore').read()
    s = re.sub(r'<script.*?</script>|<style.*?</style>', '', s, flags=re.S)
    assert 'Effective January 1, 2026' in s, name
    out = {}
    for tb in re.findall(r'<table.*?</table>', s, re.S):
        hdr = None
        for r in re.findall(r'<tr.*?</tr>', tb, re.S):
            cells = [text(c) for c in re.findall(r'<t[dh][^>]*>(.*?)</t[dh]>', r, re.S)]
            if cells and cells[0].startswith('Pay Grade'):
                hdr = cells[1:]
                continue
            if hdr and cells and re.match(r'^[EOW]-\d', cells[0]):
                g = re.match(r'^([EOW]-\d+E?)', cells[0]).group(1)
                vals = [float(v.replace(',', '')) if re.match(r'^[\d,.]+$', v) and float(v.replace(',', '')) > 0 else None for v in cells[1:]]
                out.setdefault(g, []).extend(vals)
    for g, v in out.items():
        assert len(v) == 22, (name, g, len(v))
    return out


pay = {}
for f in ['em26.htm.raw', 'wo26.htm.raw', 'co26.htm.raw', 'cofe26.htm.raw']:
    pay.update(pay_table(f))
order = ['E-1', 'E-2', 'E-3', 'E-4', 'E-5', 'E-6', 'E-7', 'E-8', 'E-9', 'W-1', 'W-2', 'W-3', 'W-4', 'W-5',
         'O-1E', 'O-2E', 'O-3E', 'O-1', 'O-2', 'O-3', 'O-4', 'O-5', 'O-6', 'O-7', 'O-8', 'O-9', 'O-10']
assert sorted(order) == sorted(pay.keys()), sorted(pay.keys())
json.dump({'effective': '2026-01-01', 'cols': COLS, 'grades': order, 'pay': {g: pay[g] for g in order},
           'e1Under4Months': 2225.70, 'seniorEnlistedAdvisor': 11166.90, 'capO7to10': 18999.90, 'capO6Below': 15408.30},
          open(os.path.join(DATA, 'pay-2026.json'), 'w'), separators=(',', ':'))

# ---------- DTMO BAH 2026 ----------
names = dict(l.strip().split(';', 1) for l in open(os.path.join(RAW, 'mhanames26.txt')) if ';' in l)
w = {l.split(',')[0]: [round(float(x)) for x in l.strip().split(',')[1:]] for l in open(os.path.join(RAW, 'bahw26.txt')) if l.strip()}
wo = {l.split(',')[0]: [round(float(x)) for x in l.strip().split(',')[1:]] for l in open(os.path.join(RAW, 'bahwo26.txt')) if l.strip()}
zips = [(int(l.split()[0]), l.split()[1]) for l in open(os.path.join(RAW, 'sorted_zipmha26.txt')) if l.strip()]
mhas = sorted(set(m for _, m in zips) | set(w.keys()))
for m in w:
    assert len(w[m]) == 27 and len(wo[m]) == 27, m
json.dump({'year': 2026, 'grades': order,
           'mha': [[m, names.get(m, m), w.get(m), wo.get(m)] for m in mhas]},
          open(os.path.join(DATA, 'bah-2026.json'), 'w'), separators=(',', ':'))
idx = {m: i for i, m in enumerate(mhas)}


def b36(n):
    s = '0123456789abcdefghijklmnopqrstuvwxyz'
    o = ''
    while True:
        o = s[n % 36] + o
        n //= 36
        if n == 0:
            return o


deltas = [zips[0][0]] + [zips[i][0] - zips[i - 1][0] for i in range(1, len(zips))]
runs = []
for _, m in zips:
    if runs and runs[-1][1] == m:
        runs[-1][0] += 1
    else:
        runs.append([1, m])
json.dump({'n': len(zips), 'd': ','.join(b36(d) for d in deltas), 'r': ','.join(f'{b36(c)}.{b36(idx[m])}' for c, m in runs)},
          open(os.path.join(DATA, 'zipmha-2026.json'), 'w'), separators=(',', ':'))
json.dump({str(z): m for z, m in zips[::97]}, open(os.path.join(FIX, 'zip-sample.json'), 'w'))

# ---------- 38 CFR 4.25 ----------
s = open(os.path.join(RAW, '425.xml')).read()
rows = [[text(c) for c in re.findall(r'<T[DH][^>]*>(.*?)</T[DH]>', r, re.S)] for r in re.findall(r'<TR>(.*?)</TR>', s, re.S)]
cols = [int(c) for c in rows[0][1:]]
table = {r[0]: dict(zip([str(c) for c in cols], [int(v) for v in r[1:]])) for r in rows[1:]}
assert len(table) == 76
json.dump(table, open(os.path.join(FIX, 'cfr425.json'), 'w'))

# ---------- va.gov compensation rates (effective December 1, 2025) ----------
s = open(os.path.join(RAW, 'va-rates.htm.raw'), errors='ignore').read()
t = re.sub(r'\s+', ' ', html.unescape(re.sub(r'<[^>]+>', ' ', re.sub(r'<script.*?</script>|<style.*?</style>', '', s, flags=re.S))))
assert 'Effective December 1, 2025' in t
num = r'([\d,]+\.\d\d)'
def grab(label, n=4, start=0):
    m = re.compile(re.escape(label) + r'[^\d]*' + r'\s+'.join([num] * n)).search(t, start)
    assert m, label
    return [float(x.replace(',', '')) for x in m.groups()], m.end()
m10 = re.search(r'10% ' + num + r' 20% ' + num, t)
low = {'10': float(m10.group(1)), '20': float(m10.group(2))}
def block(start, labels):
    out = {}
    pos = start
    for key, lab in labels:
        v, pos = grab(lab, 4, pos)
        out[key] = v
    return out, pos
p0 = t.find('With a dependent spouse or parent, but no children')
nochild_lo, p = block(p0, [('alone', 'Veteran alone (no dependents)'), ('spouse', 'With spouse (no parents or children)'), ('spouse1p', 'With spouse and 1 parent (no children)'), ('spouse2p', 'With spouse and 2 parents (no children)'), ('p1', 'With 1 parent (no spouse or children)'), ('p2', 'With 2 parents (no spouse or children)'), ('aa', 'Spouse receiving Aid and Attendance')])
nochild_hi, p = block(p, [('alone', 'Veteran alone (no dependents)'), ('spouse', 'With spouse (no parents or children)'), ('spouse1p', 'With spouse and 1 parent (no children)'), ('spouse2p', 'With spouse and 2 parents (no children)'), ('p1', 'With 1 parent (no spouse or children)'), ('p2', 'With 2 parents (no spouse or children)'), ('aa', 'Spouse receiving Aid and Attendance')])
child_lo, p = block(p, [('c', 'Veteran with 1 child only (no spouse or parents)'), ('cs', 'With 1 child and spouse (no parents)'), ('cs1p', 'With 1 child, spouse, and 1 parent'), ('cs2p', 'With 1 child, spouse, and 2 parents'), ('c1p', 'With 1 child and 1 parent (no spouse)'), ('c2p', 'With 1 child and 2 parents (no spouse)'), ('addChild', 'Each additional child under age 18'), ('addSchool', 'Each additional child over age 18 in a qualifying school program')])
child_hi, p = block(p, [('c', 'Veteran with child only (no spouse or parents)'), ('cs', 'With 1 child and spouse (no parents)'), ('cs1p', 'With 1 child, spouse and 1 parent'), ('cs2p', 'With 1 child, spouse and 2 parents'), ('c1p', 'With 1 child and 1 parent'), ('c2p', 'With 1 child and 2 parents (no spouse)'), ('addChild', 'Each additional child under age 18'), ('addSchool', 'Each additional child over age 18 in a qualifying school program')])
rates = {}
for lo, hi, ratings in [(nochild_lo, child_lo, [30, 40, 50, 60]), (nochild_hi, child_hi, [70, 80, 90, 100])]:
    for i, r in enumerate(ratings):
        rates[str(r)] = {k: v[i] for k, v in {**lo, **hi}.items()}
json.dump({'effective': '2025-12-01', 'low': low, 'rates': rates}, open(os.path.join(DATA, 'va-rates-2026.json'), 'w'), indent=1)
print('ok: pay', len(pay), 'grades; bah', len(w), 'MHA,', len(zips), 'ZIP; 4.25', len(table), 'rows; VA rates', sorted(rates))
