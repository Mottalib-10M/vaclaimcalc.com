import { route, ROUTES, type Locale } from './routes';
import { PAGES, pageById } from '../lib/pages';
import { GROUPS } from '../lib/topics';
export interface NavLink { href: string; label: string } export interface NavCategory { label: string; links: NavLink[] }
const CORE: Record<string, string> = { home: 'VA disability calculator', method: 'How we calculate', about: 'About', widget: 'Embed a calculator', contact: 'Contact', editorial: 'Editorial policy', privacy: 'Privacy', terms: 'Legal notice', cookies: 'Cookies' };
export const label = (id: string, _lang?: Locale) => CORE[id] ?? pageById(id)?.nav ?? id;
const link = (id: string, lang: Locale): NavLink => ({ href: route(id, lang), label: label(id) });
/** Menus: calculators and guides of each group; per-rating, per-grade and per-location pages live in the footer rows. */
export function navCategories(lang: Locale): NavCategory[] {
  return GROUPS.map((g) => ({ label: g.short, links: [...(g.id === 'va' ? [link('home', lang)] : []), ...PAGES.filter((p) => p.group === g.id && (p.kind === 'pillar' || p.kind === 'guide')).map((p) => link(p.id, lang))] })).filter((c) => c.links.length);
}
export const navDirect = (lang: Locale): NavLink[] => [link('method', lang)];
export const footerColumns = (lang: Locale): NavCategory[] => [
  ...GROUPS.map((g) => ({ label: g.label, links: PAGES.filter((p) => p.group === g.id && (p.kind === 'pillar' || p.kind === 'guide')).map((p) => link(p.id, lang)) })).filter((c) => c.links.length),
  { label: 'This site', links: ['home', 'method', 'about', 'contact', 'editorial', 'widget', 'terms', 'privacy', 'cookies'].map((i) => link(i, lang)) },
];
/** Every rating, grade and housing-area page in the footer row: one click from anywhere (RECETTE §18.2). */
export const popularLinks = (lang: Locale): NavLink[] => PAGES.filter((p) => p.kind === 'rating' || p.kind === 'grade' || p.kind === 'location').map((p) => ({ href: route(p.id, lang), label: p.nav }));
export const hasRoute = (id: string) => ROUTES.some((r) => r.id === id);
