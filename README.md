# fredericlabadie.github.io

Personal site for Frederic Labadie &mdash; analytics architect, Amsterdam.
Live at [fredericlabadie.com](https://fredericlabadie.com).

The site sits at the intersection of instrumentation and Sense-Making methodology &mdash; the gap between what users say and what they actually do. It's organised as a three-page portfolio:

- [`/`](https://fredericlabadie.com/) &mdash; **landing**: hero, approach (philosophy + three principles), stack at-a-glance, three selected case studies (one per principle), a brief about-with-portrait, and contact. Designed for a 60-second recruiter scan.
- [`/work/`](https://fredericlabadie.com/work/) &mdash; **full case library**: fourteen years of engagements grouped into seven topic groups (question formulation, instrumentation, experimentation, AI workflow design, adoption, marketing analytics, data engineering) &mdash; sixteen cases total &mdash; plus the public project work and a GitHub-activity graph.
- [`/about/`](https://fredericlabadie.com/about/) &mdash; **bio depth**: extended bio, endorsements, full skills cluster, eleven Amplitude credentials plus the rest of the certification stack, and contact.

A targeted single-page pitch for the Philips UX Telemetry Expert role ([`/philips.html`](https://fredericlabadie.com/philips.html)) lives alongside the main portfolio, mapping the same case studies directly to that job description and adding a clinical-domain honesty section.

## Featured projects

- **[Dervin's SMM Guide](https://smm.fredericlabadie.com)** &mdash; a practitioner's guide to Brenda Dervin's Sense-Making Methodology, with a working question rewriter (Hugging Face Inference Providers via a small Vercel API). [source](https://github.com/fredericlabadie/DervinsSMM_Course)
- **[Writers Room](https://writersroom.fredericlabadie.com)** &mdash; a multi-agent AI workspace with four room types (Writers, Job Hunt, Career, Publishing), parallel and chained agent calls, pgvector RAG, and read-only review links. [source](https://github.com/fredericlabadie/Writers-room)
- **[VibeReader](https://vibereader.fredericlabadie.com)** &mdash; book &harr; song recommendations that reason about mood, texture, and thematic resonance rather than genre tags. [source](https://github.com/fredericlabadie/VibeReader)

Working notes &mdash; deferred case studies, design improvements, post-launch additions, and the Marketing-mix Modelling backlog &mdash; live in [`_drafts/project-ideas/TODO.md`](./_drafts/project-ideas/TODO.md).

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
├── work/index.html         # full case library + projects + GitHub activity graph
├── about/index.html        # extended bio + testimonials + skills + certifications + contact
├── philips.html            # targeted pitch for Philips UX Telemetry Expert (579397)
├── css/style.css           # design system + components (shared across all pages) + print + philips additions
├── js/main.js              # mobile nav toggle + in-page scroll-spy
├── favicon.svg             # site favicon (ink rounded square + crimson dot — matches new palette)
├── apple-touch-icon.png    # 180×180 iOS touch icon
├── robots.txt              # disallow all (site is noindex while job search is active)
├── assets/
│   ├── og/og-image.png     # 1536×1024 Open Graph / Twitter card (still the previous serif design — see TODO)
│   ├── photo/              # portrait variants (1x and 2x, lightly desaturated)
│   └── resume/             # drop frederic-labadie-cv.pdf here — referenced as assets/resume/frederic-labadie-cv.pdf
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
- `/work/` &mdash; case library
- `/about/` &mdash; bio depth
- `/philips.html` &mdash; targeted Philips pitch
