# Écrire ou étoffer une page de « VA Claim Calc »

Notice pour les agents qui écrivent une page. À lire en entier avant d'écrire, avec
`~/Documents/GitHub/RECETTE-SITE.md` (§0, §6, §6.5, §7, §9, §9.3, §11, §17.4, §21, §26).

Le site : calculateurs pour anciens combattants et militaires américains, **anglais américain seul**, sous `/en/`.
Dollars, `$` devant, virgule des milliers. Éditeur : la société **Radif Partners** (jamais un nom de personne,
jamais de photo, ni INSEAD, ni Mines, ni LinkedIn). Aucun lien vers un autre site du portefeuille
(`_trame/domaines-ovh.txt`), en particulier **usbenefitscalc.com** (aides sociales US) : aucun lien, aucune phrase reprise.
Pas d'emblème ni de sceau officiel (DoD, VA, armées) : texte seulement.

## Une page = un fichier

`src/content/pages/<id>.ts` (`definePage`), route `/en/<slug>/`. Le plan complet (id, slug, groupe, type, requête
visée) est dans `src/lib/planned.ts` : la page doit y figurer avec le même `id`, `slug`, `group` et `kind` (le test le
vérifie). Routes, menus, pied de page, sitemap, schémas `Article`/`FAQPage`/`BreadcrumbList` et llms.txt lisent ces
fichiers seuls : **ne touchez à aucun fichier du cœur pour ajouter une page.**

Modèles (structure seulement, jamais les phrases) :

| Type (`kind`) | Modèle | Contenu |
|---|---|---|
| `pillar` (calculateur complet) | `va-disability-rates.ts` | `tool` + `toolProps`, chapeau replié, corps 400 mots ou plus hors tableaux |
| `guide` (une question + mini-simulateur) | `bilateral-factor.ts` | `mini`, corps 900 mots ou plus hors tableaux (check-seo veut 1 200 mots sur la page entière) |
| `rating` (une note VA) | `va-70-percent.ts` | `mini: 'ratingPay'`, un tableau, 380 mots ou plus hors tableaux |
| `grade` (un groupe de grades) | `pay-nco.ts` | `mini: 'gradePay'`, tableau DFAS des grades, 380 mots ou plus |
| `location` (une zone BAH) | `bah-san-diego.ts` | `mini: 'bahLocal'` avec `bahArg(code)`, tableau DTMO, 380 mots ou plus |

## Les champs

| Champ | Règle |
|---|---|
| `title` | **50 à 60 caractères**, contient 2026, **terme-clé en tête** (« BAH San Diego 2026: … », « 50% VA Disability Pay 2026: … »). Jamais en tête : Calculator, How, What, Can, Is, US, USA, American. Pas de tiret cadratin ni demi-cadratin, pas d'espace avant `:`. Unique. |
| `description` | **150 à 160 caractères**, avec 2026 et un chiffre **calculé** par le kit. Unique. |
| `h1` | sans année de préférence. `intro` : une phrase. |
| `resume` | **UN** paragraphe de **120 mots ou plus** (viser 130 à 180) : la réponse directe, chiffres compris. La première phrase porte le message (chapeau replié sur les piliers). Ne pas commencer la 2ᵉ phrase par un chiffre. |
| `faqs` | piliers 6 à 8, autres 3 à 5. Vraies questions telles qu'on les tape, réponses de **45 à 85 mots** (le test compte 42 à 88), avec le chiffre, la condition et la source. **Une question n'existe qu'une fois sur tout le site** (le test le vérifie, accueil compris). |
| `body(h)` | HTML : `h2`, `h3`, `p`, `ul`, `ol`, `h.table(...)`. Deux à cinq `<h2>` propres à la page. |
| `related` | 3 à 6 ids existants ou planifiés (`home`, `method` acceptés). |
| `sources` | clés de `src/data/params-2026.json > sources` (piliers 3 ou plus, autres 2 ou plus). |

## La règle des chiffres (non négociable, RECETTE §17.4 point 7)

Aucun taux, montant, seuil ou date qui existe dans les données n'est tapé en dur : il se lit dans le kit
(`src/lib/kit.ts`, aussi passé au corps sous `h.`).

```ts
import { P, comp, rateCell, combinedValue, combine, pay, basePay, bas, bah, bahArg, retiredPay, concurrent, sbp, fers, giBill, giTier, brsMatch, tspLimit, usd, usdx, pct, day } from '../../lib/kit';
comp(70, { spouse: true, kids: 2, school: 1, parents: 1, spouseAA: true })  // VA mensuel 2026
rateCell(100, 'addSchool')        // cellule de la table VA : alone, spouse, c, cs, addChild, addSchool, aa…
pay('E-5', 4)                     // solde de base DFAS 2026, 4 années accomplies (« over 4 »)
bah('CA038', 'E-5', true)         // BAH 2026 avec personnes à charge
P.gi.privateCap, P.tsp.elective, P.retire.colaPct, P.va.smc['L']  // paramètres
```

Une **hypothèse d'exemple** (« $2,800 of retired pay ») peut s'écrire `usd(2800)`. Un chiffre **absent des données ne
s'écrit pas**, sauf s'il vient d'un document officiel que vous lisez vous-même (et alors il va dans `params-2026.json`
avec sa source). **Un point incertain ne se publie pas** : pas de loyers de marché, pas de noms de quartiers inventés,
pas de chiffres d'effectifs des bases, pas d'histoire des noms de bases sans source.

## Ton et langue

- Anglais américain, voix humaine, phrases de longueur variable, le chiffre d'abord.
- **Interdits** (le test les refuse) : tiret cadratin « — », demi-cadratin « – », « it's important to note »,
  « dive into », « whether you're », « Moreover », « Additionally », « Furthermore », « navigate the », « delve ».
- **Unicité** (§6) : `check-unique` compare toutes les pages (chiffres neutralisés, seuil 30 %, fenêtre des 12 000
  premiers caractères). Dans une famille (notes, grades, zones), ouvrir chaque page sur ce qui n'appartient qu'à elle
  (le seuil propre à la note, le plafond propre au grade, la particularité de la zone), avec un vocabulaire différent.

## Contrôles

```bash
cd ~/Documents/GitHub/a-publier/Mottalib-10M/vaclaimcalc.com
PAGE_FILES=<id>,<id> ALLOW_PLANNED=1 npx vitest run tests/pages.test.ts   # une page
npx vitest run                                                           # tout
npm run build && python3 scripts/check-seo.py . && python3 scripts/check-unique.py dist && python3 scripts/check-trame.py .
```

Les données officielles se reconstruisent avec `python3 scripts/build-data.py` depuis `research/raw/` (copies des
pages VA, DFAS, DTMO et eCFR lues le 2026-10-11 ; dfas.mil et travel.dod.mil répondent 403 hors des États-Unis, leurs
pages ont été lues sur l'Internet Archive).

## Ce qu'on ne fait pas

- Pas de dépôt GitHub, pas de push, pas de DNS sans validation de l'éditeur.
- Ne pas toucher à `_trame` ni à la RECETTE : les suggestions vont dans le compte rendu.
- Aucun lead, aucun avocat, aucun consultant de réclamation, aucune affiliation.
