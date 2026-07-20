---
name: seo
description: Technical and on-page SEO audit and optimization for websites — meta tags, canonical/hreflang, JSON-LD structured data, robots.txt and sitemap, Core Web Vitals, rendering strategy for JS sites, local SEO, and AI-search (GEO/AEO) readiness. Use whenever the user asks for an SEO audit, to optimize a site for search, improve indexing or rankings, fix meta tags or structured data, set up Search Console, get cited by AI search (ChatGPT, Perplexity, AI Overviews), or improve local search visibility. Do NOT use for paid ads (SEM) or pure content copywriting without an SEO goal.
---

# SEO Audit & Optimization

Act as a senior SEO engineer. The deliverable is always two things: **fixed files** (when you have access to the site code) and an **audit report** listing each issue, its severity (critical / important / minor), and what was changed or recommended.

## 1. Study the site first

Read every HTML file (or fetch key pages if it's a live URL), plus robots.txt and sitemap.xml. Establish: language(s), target country/region, topic, domain, full URL list, and how the site renders (static HTML vs client-side JavaScript). Everything downstream depends on this — never audit page-by-page before you understand the whole.

## 2. Per-page audit checklist

**Meta tags:**
- `title` — unique per page, primary keyword near the front, ~50–60 characters as a guideline (Google truncates by pixel width, so treat this as a target, not a law)
- `meta description` — unique, ~150–160 characters, written to earn the click
- `rel="canonical"` — absolute URL, self-referencing on every indexable page; a canonical pointing at a different page silently deindexes this one, so check this first
- `hreflang` — for multilingual sites: reciprocal annotations where every page lists all language variants **including itself**, plus `x-default`. Missing reciprocity is the most common hreflang failure
- robots meta — only add `noindex` deliberately; remember robots.txt controls *crawling*, not *indexing*

**Open Graph / Twitter:** `og:type, og:url, og:title, og:description, og:image` (1200×630, <5 MB), `og:locale, og:site_name`; `twitter:card=summary_large_image` + title/description/image.

**Content structure:** exactly one H1 containing the primary keyword; H2s for sections; descriptive alt text on meaningful images (decorative images get `alt=""`); `loading="lazy"` on below-the-fold images only — never on the LCP image.

Do NOT add `geo.region`/`geo.position`/`ICBM` meta tags — search engines ignore them. Local relevance comes from LocalBusiness structured data and Google Business Profile (section 5).

## 3. Structured data (JSON-LD)

Use one `<script type="application/ld+json">` with an `@graph` array. JSON-LD is Google's recommended format — don't use microdata/RDFa.

- All pages: `Organization` (name, url, logo, contactPoint); `BreadcrumbList` on internal pages
- Home: `WebSite`; plus `LocalBusiness` (geo coordinates, openingHours, areaServed) if it's a local business
- By page type: `FAQPage` (real Q&A on the page), `HowTo`, `Product` (offers, price, availability), `Article`, or the industry-specific type (`FinancialService`, `MedicalClinic`, …)

Validate every distinct template with Google's Rich Results Test (search.google.com/test/rich-results). Markup that doesn't match visible page content risks a manual action — never mark up content that isn't on the page.

## 4. Rendering & Core Web Vitals

**Rendering:** if important content only appears after JavaScript executes, flag it. Google renders JS but other engines and most AI crawlers largely don't. Recommend pre-rendered HTML: static generation (SSG) or server-side rendering. Dynamic rendering (bot-sniffing via Rendertron/prerender.io) is officially deprecated by Google — do not recommend it for new builds.

**Core Web Vitals** (75th percentile, per pagespeed.web.dev):
- LCP ≤ 2.5 s — preload the hero image, no lazy-loading on it, inline critical CSS
- INP ≤ 200 ms (replaced FID in 2024 — don't audit FID)
- CLS ≤ 0.1 — explicit width/height or aspect-ratio on images, `font-display: swap`, reserve space for async content

## 5. Local SEO (only if the business serves a geographic area)

- `LocalBusiness` JSON-LD with geo coordinates, openingHours, areaServed
- City landing pages only when there's genuinely distinct content per city (unique H1, local proof, city-specific LocalBusiness markup, internal links). Warn against thin doorway pages — Google's spam policies target them
- Google Business Profile is the gate to the Local Pack: business.google.com → complete profile, category, description, 5+ photos, review collection cadence
- 3–5 reputable local/industry directories for citations — pick ones relevant to the site's actual country, don't reuse a fixed list

## 6. AI search / GEO (Generative Engine Optimization)

Google's own guidance: optimizing for AI Overviews/AI Mode is "still SEO" — no special files or markup required. Evidence-based actions only:

- Ensure robots.txt does **not** block AI crawlers the user wants citations from: `GPTBot`, `OAI-SearchBot`, `PerplexityBot`, `ClaudeBot`, `Google-Extended`
- Content patterns measurably lifting generative-engine visibility (Princeton GEO study): concrete statistics, quotable statements, cited sources, clear question-shaped headings with direct answers
- Ranking still matters: the large majority of AI Overview citations come from pages already in the top 10
- `llms.txt`: Google has confirmed it does not use it. Creating one is harmless but promise nothing; never present it as a ranking factor

## 7. robots.txt and sitemap.xml

robots.txt — minimal unless there's a reason: `User-agent: *`, `Allow: /`, `Sitemap: <absolute URL>` (verify the domain is correct).

sitemap.xml — only canonical, indexable, 200-status URLs; accurate `lastmod` (`YYYY-MM-DD`) only for pages that actually changed. Omit `priority`/`changefreq` — Google ignores them.

## 8. Hand-off instructions (include in the report)

1. **Google Search Console**: verify ownership (HTML meta tag or DNS) → submit sitemap → URL Inspection → Request Indexing for key pages (~10/day limit) → monitor Page Indexing report and fix errors
2. **Bing Webmaster Tools**: add site, import from GSC, submit sitemap (Bing also feeds ChatGPT search)
3. **Monitoring**: GSC (queries, indexing), GA4 (traffic, conversions), pagespeed.web.dev (CWV — all green at the 75th percentile)
4. Local business → Google Business Profile setup from section 5

## Final checklist

- [ ] Unique title and meta description on every page
- [ ] One H1 with the primary keyword; alt text on meaningful images
- [ ] Self-referencing canonical on every indexable page
- [ ] hreflang reciprocal + x-default (multilingual only)
- [ ] JSON-LD: Organization everywhere; WebSite (+LocalBusiness if local) on home; page-type schemas where content supports them; validated in Rich Results Test
- [ ] robots.txt correct + doesn't block wanted AI crawlers; sitemap has only canonical 200 URLs with honest lastmod
- [ ] LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1
- [ ] JS-only content flagged with an SSG/SSR recommendation
- [ ] GSC + Bing WMT + GA4 instructions delivered
- [ ] Audit report lists every issue with severity and the fix applied
