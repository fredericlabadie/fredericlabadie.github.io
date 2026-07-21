# fredericlabadie.github.io

Personal site for Frederic Labadie &mdash; analytics architect, Amsterdam.
Live at [fredericlabadie.com](https://fredericlabadie.com).

The site sits at the intersection of instrumentation and Sense-Making methodology &mdash; the gap between what users say and what they actually do. It is now a Jekyll/GitHub Pages portfolio with a core navigation layer, a case library, a working-notes layer, and role-specific microsites:

- [`/`](https://fredericlabadie.com/) &mdash; **landing**: recruiter scan, positioning, selected proof points, and paths into the deeper site.
- [`/work/`](https://fredericlabadie.com/work/) &mdash; **case library**: seven lenses linking to standalone case-study pages at `/work/<slug>.html`. The current library uses sixteen active cases, with six archived/deprecated cases preserved at their original URLs.
- [`/thoughts/`](https://fredericlabadie.com/thoughts/) &mdash; **Current Meditations**: a practitioner's working-thinking archive of drafts, working theories, and open questions on methodology, AI-assisted workflows, schema design, and measurement gaps.
- [`/recruiters/`](https://fredericlabadie.com/recruiters/) &mdash; **recruiter summary**: fast-scan facts, role fit, proof cases, status, and contact routes.
- [`/about/`](https://fredericlabadie.com/about/) &mdash; **bio depth**: extended bio, career arc, credentials, methodology, and working style.
- [`/credentials/`](https://fredericlabadie.com/credentials/) &mdash; **credential stack**: Amplitude, analytics, AI, methodology, data-platform, and education proof.
- [`/contact/`](https://fredericlabadie.com/contact/) &mdash; **contact**: status, response-time expectations, channels, and CV.

Targeted role-fit microsites are preserved separately from the main portfolio flow:

- [`/adyen/`](https://fredericlabadie.com/adyen/) &mdash; Adyen Senior Product Data Analyst microsite, with seven evidence paths around product data ownership, scalable systems, source-of-truth delivery, and experimentation.
- [`/philips/`](https://fredericlabadie.com/philips/) &mdash; Philips UX Telemetry Expert microsite, with a thirteen-case Philips-facing work selection and clinical-domain calibration. Note: `d2c-ga-migration` is archived/deprecated from the main work index but remains intentionally active in the Philips selection where the platform-migration pattern is specifically relevant.
- [`/bol/`](https://fredericlabadie.com/bol/) &mdash; bol Product Analyst (Checkout) microsite, with six evidence paths around experimentation, question discovery, BI enablement, alert engineering, instrumentation, and AI workflows.
- [`/vinted/`](https://fredericlabadie.com/vinted/) &mdash; Vinted Decision Scientist (Marketing Modelling Intelligence) microsite, with five evidence paths led by the Stanley Steemer media mix model / identity-resolution case (`mmm-identity-resolution`).

## Featured projects

- **[Signal Conduit](https://signal-conduit.fredericlabadie.com)** &mdash; an analytics-governance workbench for canonical tracking specs, multi-analyst review, platform mapping, and Claude-ready Jira handoff kits. [source](https://github.com/fredericlabadie/Signal-Conduit)
- **[Dervin's SMM Guide](https://smm.fredericlabadie.com)** &mdash; a practitioner's guide to Brenda Dervin's Sense-Making Methodology, with a working question rewriter (Hugging Face Inference Providers via a small Vercel API). [source](https://github.com/fredericlabadie/DervinsSMM_Course)
- **[Writers Room](https://writersroom.fredericlabadie.com)** &mdash; a multi-agent AI workspace with four room types (Writers, Job Hunt, Career, Publishing), parallel and chained agent calls, pgvector RAG, and read-only review links. [source](https://github.com/fredericlabadie/Writers-room)
- **[VibeReader](https://vibereader.fredericlabadie.com)** &mdash; book &harr; song recommendations that reason about mood, texture, and thematic resonance rather than genre tags. [source](https://github.com/fredericlabadie/VibeReader)

Active reminders &mdash; planned case studies, deferred narratives, design polish &mdash; are tracked in the [Status &amp; roadmap](#status--roadmap) section below. Private grooming notes (anonymisation audits, source-document deltas, individual edit-tone questions) stay in `_drafts/project-ideas/TODO.md`, which is gitignored.

## Deprecation convention

Cases can be deprecated without deletion. Deprecated cases are:

- Removed from the work index navigation (filtered via `deprecated: true` in `_data/cases.yml`)
- Preserved at their original URL — no redirect, no 404
- Documented with a reason comment inside their front matter (`# DEPRECATED [date]: [reason]`)
- Listed below for maintainability

The `work-lens-section.html` template filters out `deprecated: true` entries automatically. Per-lens case counts update accordingly. The work index receipt strip and body copy reflect active cases only.

To un-deprecate a case: update the canonical `work/<slug>.html` source first, remove the archived/deprecated cue and source comment, then regenerate or sync `_data/cases.yml` through the agreed case-data workflow. Do not hand-edit generated case data unless the source-of-truth decision changes.

### Deprecated cases (2026-05-27)

| Slug                          | Lens                | Reason                                                                                         |
| ----------------------------- | ------------------- | ---------------------------------------------------------------------------------------------- |
| `content-brand-ga4`           | Question discovery  | Redundant with shadow-it; execution-level, no distinct signal.                                 |
| `creator-brand-dashboard`     | Adoption/enablement | Execution-under-deadline; no measurable business outcome.                                      |
| `interior-designer-multisite` | Instrumentation     | Procedural GA4 setup; covered by sslp-mobile and hardware-ecommerce-gtm.                       |
| `mqsr-dashboards`             | Experimentation     | Third case on same client; mqsr-schema-sdk and mqsr-errors cover the engagement more strongly. |
| `d2c-ga-migration`            | Instrumentation     | 2019; weaker than hardware-ecommerce-gtm. Active in Philips microsite.                         |
| `oem-ebrochure-analytics`     | Question discovery  | 2017-18; soft outcome. Preserved for automotive/OEM-adjacent role reference.                   |

## Stack

Jekyll/GitHub Pages site using HTML/Liquid layouts and includes, CSS, and a small amount of JavaScript. Hosted on GitHub Pages.

### Design system &mdash; Anchor &middot; Query (May 2026 rebuild)

The site moved from a Fraunces-on-navy serif system to an editorial sans system called **Anchor &middot; Query**:

- **Palette** &mdash; white background, slate (`#2c3e50`) primary, crimson (`#c0392b`) accent, off-white alt surface (`#f1efe9`), near-black ink (`#15181d`). All exposed as `--c-*` CSS custom properties at the top of `css/style.css` &mdash; change them once, the whole site follows.
- **Typography** &mdash; IBM Plex Sans + IBM Plex Mono, via Google Fonts. Mono is used for labels, eyebrows, metadata strips, buttons, and section numbers.
- **Layout language** &mdash; strict hairline rules, big plate numbers on each section opener, sectioned with a metadata strip (`id` / `label` / `title`). Cards have sharp 90° corners, no shadows. Section bands alternate via the `.alt` class. Print stylesheet flattens the grid for clean A4 export.

Asset paths are **relative** (`css/style.css` from home, `../css/style.css` from sub-pages). Both relative and root-relative work on GitHub Pages when the site lives at the repo root; relative was kept so the bundle is also openable as a folder over `file://` for local preview.

The previous design system bundle remains in `_drafts/new-design.zip` for reference.

```
.
├── index.html              # landing / recruiter triage
├── recruiters/index.html   # fast-scan recruiter summary
├── work/
│   ├── index.html          # active case library by lens
│   └── <slug>.html         # canonical case pages: active + archived/deprecated
├── thoughts/index.html     # Current Meditations
├── about/index.html        # extended bio + methodology + career arc
├── credentials/index.html  # credential stack
├── contact/index.html      # contact channels + status
├── adyen/
│   ├── index.html
│   ├── work/index.html
│   ├── about/index.html
│   ├── contact/index.html
│   └── work/<slug>.html    # Adyen-framed case clones
├── philips/
│   ├── index.html
│   ├── work/index.html
│   ├── about/index.html
│   ├── contact/index.html
│   └── work/<slug>.html    # Philips-framed case clones
├── bol/                    # bol microsite (same page structure as adyen/)
├── vinted/                 # Vinted microsite (same page structure as adyen/)
├── _data/
│   └── cases.yml           # generated/synced case index; do not hand-edit by default
├── _includes/              # shared navigation, sections, head, scripts
├── _layouts/               # default, case, and microsite layouts
├── css/                    # main and microsite CSS
├── js/                     # shared JS and microsite JS
├── assets/
│   ├── og/
│   ├── photo/
│   └── resume/
├── robots.txt              # allows fetch; page metadata carries noindex
├── llms.txt                # AI-readable site summary
├── CNAME
└── _drafts/                # working files / private notes where present
```

## Local preview

```bash
# GitHub Pages / Jekyll preview
jekyll serve --livereload
# then visit http://localhost:4000
```

URLs to spot-check during dev:

- `/` &mdash; landing
- `/recruiters/` &mdash; recruiter summary
- `/work/` &mdash; active case library
- `/thoughts/` &mdash; Current Meditations
- `/about/` &mdash; bio depth
- `/credentials/` &mdash; credential stack
- `/contact/` &mdash; contact page
- `/adyen/` &mdash; Adyen microsite
- `/philips/` &mdash; Philips microsite
- `/bol/` &mdash; bol microsite
- `/vinted/` &mdash; Vinted microsite

## Status & roadmap

This README is not the active backlog. Use it for public maintenance notes only; detailed grooming, anonymisation checks, and source-document deltas should stay in the private tracker.

### Current maintenance priorities

- **Case-data sync discipline** &mdash; treat `work/*.html` as the canonical case source unless the project explicitly changes the source-of-truth decision. `_data/cases.yml` should be regenerated or synced from the agreed workflow, not hand-edited casually.
- **Microsite clone discipline** &mdash; Adyen and Philips contain role-framed case clones. When a canonical case changes, check whether either microsite clone needs the same content correction or whether the role-specific framing should intentionally differ.
- **CV export discipline** &mdash; re-export the relevant PDFs in `assets/resume/` only after substantive CV changes, and review them as binary assets before merge.
- **Future case additions** &mdash; new cases should enter the active Work library only after proof, metric context, anonymisation, and source-of-truth checks are complete.
- **Indexing preference** &mdash; the site is public for direct sharing but not intended for search indexing. Keep `robots.txt` fetchable and rely on page-level `noindex, follow` metadata unless that strategy changes deliberately.

### Lower-priority polish

- Per-case OG images for LinkedIn/Twitter sharing.
- RSS/Atom only if `/thoughts/` or `/work/` develops a real publishing cadence.
- A public essay or short video intro only when it strengthens, rather than distracts from, the portfolio evidence.
