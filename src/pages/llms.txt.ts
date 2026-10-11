/** llms.txt (RECETTE §21), generated at build from the page registry: always in sync with the site. */
import { PAGES } from '../lib/pages';
import { SITE_URL, LAST_UPDATED, SITE_NAMES } from '../data/site-config';
import { route } from '../i18n/routes';
import { GROUPS } from '../lib/topics';
export function GET() {
  const lines = [
    `# ${SITE_NAMES.en}`,
    '',
    `> Calculators for US veterans and service members: VA disability compensation with the rates effective December 1, 2025, the combined ratings table of 38 CFR 4.25 and the bilateral factor, dependents, SMC, pension and DIC; the DFAS 2026 basic pay tables and BAS; BAH 2026 for every ZIP code from the DTMO files; military retired pay (High-3, REDUX, BRS), CRDP, CRSC, SBP and the FERS military deposit; Post-9/11 GI Bill 2026-27 and TSP 2026 limits. Figures from VA, DFAS, DTMO, the eCFR, the IRS and OPM, cited and dated on each page. Calculations run in the browser. Estimates; VA and DFAS decide. Published by Radif Partners. Last updated ${LAST_UPDATED}.`,
    '',
    `- [Home: VA disability calculator](${SITE_URL}${route('home', 'en')})`,
    ...GROUPS.flatMap((g) => { const xs = PAGES.filter((p) => p.group === g.id); return xs.length ? ['', `## ${g.label}`, ...xs.map((p) => `- [${p.nav}](${SITE_URL}${route(p.id, 'en')}): ${p.card}`)] : []; }),
    '',
    '## About',
    `- [How we calculate](${SITE_URL}${route('method', 'en')})`,
    `- [About](${SITE_URL}${route('about', 'en')})`,
  ];
  return new Response(lines.join('\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
