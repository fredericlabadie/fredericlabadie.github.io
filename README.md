# fredericlabadie.github.io

Personal site for Frederic Labadie &mdash; analytics architect, Amsterdam.
Live at [fredericlabadie.com](https://fredericlabadie.com).

The site sits at the intersection of instrumentation and Sense-Making methodology &mdash; the gap between what users say and what they actually do. It's organised as a three-page portfolio:

- [`/`](https://fredericlabadie.com/) &mdash; **landing**: hero, approach (philosophy + three principles), stack at-a-glance, three selected case studies (one per principle), a brief about-with-portrait, and contact. Designed for a 60-second recruiter scan.
- [`/work/`](https://fredericlabadie.com/work/) &mdash; **case library teaser directory**: seven topic groups (question formulation, instrumentation, experimentation, AI workflow design, adoption, marketing analytics, data engineering) linking out to standalone case-study pages at `/work/<slug>.html`. Eighteen standalone case studies in total, plus the public project work and a GitHub-activity graph.
- [`/notebook/`](https://fredericlabadie.com/notebook/) &mdash; **open notebook**: working entries on methodology, AI-assisted workflows, schema design, and the gaps the official measurement layer doesn't see. Drafts, working theories, open questions.
- [`/about/`](https://fredericlabadie.com/about/) &mdash; **bio depth**: extended bio, endorsements, full skills cluster, eleven Amplitude credentials plus the rest of the certification stack.
- [`/contact/`](https://fredericlabadie.com/contact/) &mdash; **contact**: status, response-time expectations, channels (email, LinkedIn, GitHub), and the resume.

A targeted **four-page microsite** for the Philips UX Telemetry Expert role lives at [`/philips/`](https://fredericlabadie.com/philips/) (Home &middot; Work &middot; About &middot; Contact). The microsite carries Philips-blue accents and a curated ten-case selection at [`/philips/work/`](https://fredericlabadie.com/philips/work/), each with a per-case "Why this is in the Philips selection" relevance callout above the case body.

## Featured projects

- **[Dervin's SMM Guide](https://smm.fredericlabadie.com)** &mdash; a practitioner's guide to Brenda Dervin's Sense-Making Methodology, with a working question rewriter (Hugging Face Inference Providers via a small Vercel API). [source](https://github.com/fredericlabadie/DervinsSMM_Course)
- **[Writers Room](https://writersroom.fredericlabadie.com)** &mdash; a multi-agent AI workspace with four room types (Writers, Job Hunt, Career, Publishing), parallel and chained agent calls, pgvector RAG, and read-only review links. [source](https://github.com/fredericlabadie/Writers-room)
- **[VibeReader](https://vibereader.fredericlabadie.com)** &mdash; book &harr; song recommendations that reason about mood, texture, and thematic resonance rather than genre tags. [source](https://github.com/fredericlabadie/VibeReader)

Active reminders &mdash; planned case studies, deferred narratives, design polish &mdash; are tracked in the [Status &amp; roadmap](#status--roadmap) section below. Private grooming notes (anonymisation audits, source-document deltas, individual edit-tone questions) stay in `_drafts/project-ideas/TODO.md`, which is gitignored.

## Stack

Plain HTML, CSS, and a small amount of JavaScript. Hosted on GitHub Pages.

### Design system &mdash; Anchor &middot; Query (May 2026 rebuild)

The site moved from a Fraunces-on-navy serif system to an editorial sans system called **Anchor &middot; Query**:

- **Palette** &mdash; white background, slate (`#2c3e50`) primary, crimson (`#c0392b`) accent, off-white alt surface (`#f1efe9`), near-black ink (`#15181d`). All exposed as `--c-*` CSS custom properties at the top of `css/style.css` &mdash; change them once, the whole site follows.
- **Typography** &mdash; IBM Plex Sans + IBM Plex Mono, via Google Fonts. Mono is used for labels, eyebrows, metadata strips, buttons, and section numbers.
- **Layout language** &mdash; strict hairline rules, big plate numbers on each section opener, sectioned with a metadata strip (`id` / `label` / `title`). Cards have sharp 90° corners, no shadows. Section bands alternate via the `.alt` class. Print stylesheet flattens the grid for clean A4 export.

Asset paths are **relative** (`css/style.css` from home, `../css/style.css` from sub-pages). Both relative and root-relative work on GitHub Pages when the site lives at the repo root; relative was kept so the bundle is also openable as a folder over `file://` for local preview.

The previous design system bundle remains in `_drafts/new-design.zip` for reference.

```
.
├── index.html              # landing (recruiter triage: hero → 3 marquee cases → about + portrait → contact)
├── work/
│   ├── index.html          # case library teaser directory + projects + GitHub activity graph
│   └── <slug>.html         # 18 standalone case-study pages
├── notebook/index.html     # open notebook (drafts, working theories, open questions)
├── about/index.html        # extended bio + testimonials + skills + certifications
├── contact/index.html      # contact channels + status + response-time expectations
├── philips/
│   ├── index.html          # Philips landing (UX Telemetry Expert 579397 pitch)
│   ├── work/
│   │   ├── index.html      # curated 10-case teaser directory
│   │   └── <slug>.html     # 10 Philips-framed case-study clones (.philips-microsite chrome)
│   ├── about/index.html
│   └── contact/index.html
├── philips.html            # meta-refresh redirect → /philips/
├── css/style.css           # design system + components (shared) + print + philips microsite scope
├── js/main.js              # mobile nav toggle + in-page scroll-spy
├── favicon.svg             # site favicon (ink rounded square + crimson dot)
├── apple-touch-icon.png    # 180×180 iOS touch icon
├── robots.txt              # disallow all (site is noindex while job search is active)
├── assets/
│   ├── og/og-image.png     # 1536×1024 Open Graph / Twitter card (Anchor · Query design, May 2026)
│   ├── photo/              # portrait variants (1x and 2x, lightly desaturated)
│   └── resume/             # frederic-labadie-cv.{md,html,pdf} + export workflow README
├── CNAME                   # custom-domain mapping
└── _drafts/                # working files, source case studies, design bundle archive (gitignored)
```

## Local preview

```bash
# any static server works; e.g.
python3 -m http.server 4000
# then visit http://localhost:4000
```

URLs to spot-check during dev:

- `/` &mdash; landing
- `/work/` &mdash; case library teaser directory (and any `/work/<slug>.html` standalone case)
- `/notebook/` &mdash; open notebook
- `/about/` &mdash; bio depth
- `/contact/` &mdash; contact page
- `/philips/` &mdash; Philips microsite landing (also `/philips/work/`, `/philips/about/`, `/philips/contact/`)

## Status & roadmap

Active development on the site itself, ordered loosely by leverage. Mirrors the curated subset of `_drafts/project-ideas/TODO.md`; that file remains private and carries the deeper grooming notes.

### In flight

- **Hospital Readmissions dbt project** &mdash; three-layer dbt project on Snowflake using CMS Hospital Readmissions Reduction Program data; architectural sketch in `_drafts/project-ideas/Health-Portfolio-Project/`. **Target: 30 May 2026.** Returns to `/work/` as a Topic 07 case once shipped, and re-enters the Philips microsite's clinical-domain section.
- **Self-instrumented portfolio meta-case** &mdash; instrument this site (GA4 + Segment + Amplitude, full stack, consent-aware), run two weeks, write up the gap between design assumptions and visitor behaviour. Doubles as a published artifact in own voice. Goes on `/work/` as a Topic 01 case once written.
- **Resume PDF refresh** &mdash; re-export `assets/resume/frederic-labadie-cv.md` to `frederic-labadie-cv.pdf` on each substantive CV update; export workflow documented in `assets/resume/README.md`.

### Planned case studies

- **Failure case &mdash; "the time I instrumented the wrong question."** Previously a scaffolded card on `/work/`; hidden as of 19 May 2026 until the real engagement narrative is written. Will return as a standalone `/work/failure-wrong-question.html` matching the other case templates.
- **Marketing-mix modelling write-up** &mdash; pick a past engagement and write it up; rounds out Topic 06 for marketing-analytics-leaning readers.
- **Stanley Steemer A/B narrative** &mdash; the specific A/B test that moved leadership toward measurement-first decisions deserves a short narrative card on `/work/` rather than a one-line claim inside the Stanley compact card.
- **Re-add Data Science framing** &mdash; deliberately removed; returns once a model-attached project ships (causal inference, propensity scoring, uplift, time-series &mdash; anything statistically modelled rather than SQL-aggregated).

### Visibility & voice

- **One published essay in own voice** &mdash; ~800-word LinkedIn long-form on the gap between what instrumentation captures and what's actually happening. Link from the Approach section once published.
- **60-second video intro** &mdash; talking-head, philosophy + one engagement. Loom already in the toolkit.
- **Two new recency testimonials** &mdash; request one from the QSR engineering lead and one from the state-regulated-retail product owner / engagement lead. Closes the recency gap on existing endorsements.
- **Career-arc clarity** &mdash; `/contact/` currently lists three role shapes (architect / analytics engineering / UX telemetry). Pick the one you'd stop applying to others for and lead with it; demote the others.

### Open content questions

- **Dutch language path** on `/about/` &mdash; decide: (a) commit to B2 target with a public deadline, (b) remove the A2 line entirely, or (c) state "targeting English-speaking workplaces in NL".
- **Loom training library** cited in two cases but never linked &mdash; either link to one anonymised example or demote the claim.
- **"Two warehouses" wording** on `/about/` certifications heading requires the reader to know "two warehouses" = BigQuery + Snowflake. Consider spelling out inline.
- **Braze automation date ambiguity** on `/work/cs-braze-automation` &mdash; "May 26" reads as either "May 26" or "May 2026"; should be "May 2025" or "26 May 2025" once the actual ship date is confirmed.

### Operational

- **RSS / Atom feed** for `/work/` and `/notebook/` additions &mdash; low priority until publishing cadence is real.
- **Newsletter signup** &mdash; same.
- **Per-case OG images** &mdash; each `/work/<slug>.html` has its own `og:title`, `og:description`, `og:url`, but they all share one `og:image`. Per-case images would be nicer for LinkedIn / Twitter sharing of individual cases, but cost time per render. Lower priority.
- **Edit-sync discipline for Philips clones** &mdash; case content lives in two places (`/work/<slug>.html` canonical + `/philips/work/<slug>.html` Philips-framed clone). When you update a canonical case body, update the Philips clone too. Could be scripted later if maintenance becomes painful; for the current ten clones, manual sync is fine.
