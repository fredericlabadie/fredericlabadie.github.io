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

Plain HTML, CSS, and a small amount of JavaScript. Fonts via Google Fonts (Fraunces serif, DM Sans, DM Mono). Hosted on GitHub Pages.

All asset paths are root-relative (`/css/style.css`, `/js/main.js`, `/assets/...`) so the three pages can share the same chrome without per-page path edits.

```
.
├── index.html              # landing (recruiter triage: hero → 3 marquee cases → about + portrait → contact)
├── work/index.html         # full case library + projects + GitHub activity graph
├── about/index.html        # extended bio + testimonials + skills + certifications + contact
├── philips.html            # targeted pitch for Philips UX Telemetry Expert (579397)
├── css/style.css           # design system + components (shared across all pages)
├── js/main.js              # mobile nav toggle + in-page scroll-spy
├── favicon.svg             # site favicon (dark navy rounded square + cool-blue dot)
├── apple-touch-icon.png    # 180×180 iOS touch icon
├── robots.txt              # disallow all (site is noindex while job search is active)
├── assets/
│   ├── og/og-image.png     # 1536×1024 Open Graph / Twitter card
│   ├── photo/              # portrait variants (1x and 2x, lightly desaturated for the dark palette)
│   └── resume/             # drop frederic-labadie-cv.pdf here — referenced as /assets/resume/frederic-labadie-cv.pdf
├── CNAME                   # custom-domain mapping
└── _drafts/                # working files, source case studies (gitignored)
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
