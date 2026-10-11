/**
 * One page = ONE content file (CONTRIBUTING-PAGES.md):
 *  `src/content/pages/<id>.ts` (PageDef): calculators, guides, one page per VA rating, per pay-grade
 *  group and per military housing area. Official figures come from src/data/*.json through the kit.
 * Routes, menus, footer, sitemap, schemas and internal links read these files alone.
 */
import type { Group } from './topics';
import type { Kit } from './kit';

export interface FAQ { q: string; a: string }

/** Writing tools passed to every body: links, formatters, tables, official links, and the data kit. */
export interface Helpers extends Kit {
  /** Internal link by page id ("snap-calculator", "state:texas"…). An unknown id fails the page test. */
  a: (id: string, text: string) => string;
  /** Journal-style table; numbers are formatted, strings are inserted as HTML. */
  table: (headers: string[], rows: Array<Array<string | number>>, caption?: string, align?: Array<'l' | 'r'>) => string;
  /** Link to an official source of params-2026.json (key) with optional text. */
  src: (key: string, text?: string) => string;
  /** Link to any official URL. */
  ext: (url: string, text: string) => string;
  /** Ruled box in the press style. */
  box: (title: string, html: string) => string;
  /** Inline mini-simulator: `<!--mini:kind|arg-->` rendered as an island. */
  mini: (kind: string, arg?: unknown) => string;
}

export type ToolKind = 'va' | 'varates' | 'combined' | 'paychart' | 'pay' | 'bah' | 'bahtable' | 'retire' | 'crdp' | 'fers' | 'gi' | 'tsp';
/** Default values of the calculator on a page (grade, years, rating, MHA, ZIP, plan). */
export interface ToolProps { grade?: string; years?: number; rating?: number; zip?: string; plan?: 'high3' | 'redux' | 'brs' }

export interface PageDef {
  id: string;
  group: Group;
  /** pillar: the full calculator; guide: a question with its mini-simulator; rating: one VA rating;
   *  grade: one group of pay grades; location: one military housing area. */
  kind: 'pillar' | 'guide' | 'rating' | 'grade' | 'location';
  order: number;
  /** URL segment, lowercase and dashes, no year. */
  slug: string;
  nav: string;
  card: string;
  /** 50 to 60 characters, key term first, 2026 included (RECETTE §11). */
  title: string;
  /** 150 to 160 characters, 2026 included. */
  description: string;
  h1: string;
  intro: string;
  /** ONE paragraph of 120 words or more, the direct answer with the figures (RECETTE §21). */
  resume: string;
  faqs: FAQ[];
  body: (h: Helpers) => string;
  /** Full calculator shown after the answer block (pillars). */
  tool?: ToolKind;
  toolProps?: ToolProps;
  /** Mini-simulator after the answer block (guides, thresholds): `src/lib/minis/<kind>.ts`. */
  mini?: string;
  miniArg?: unknown;
  /** Page id the mini-simulators' button leads to (default: the main calculator of the group). */
  miniHref?: string;
  related: string[];
  /** Keys of params-2026.json > sources. */
  sources: string[];
  extraSources?: Array<{ name: string; url: string }>;
}
export const definePage = (p: PageDef): PageDef => p;

