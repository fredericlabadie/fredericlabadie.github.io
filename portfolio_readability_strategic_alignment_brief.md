# Portfolio Readability + Strategic Alignment Review
## Implementation Brief for Claude Code

Repository: `fredericlabadie/fredericlabadie.github.io`  
Primary objective: optimize the portfolio for peer sharing and job applications, with emphasis on readability, strategic alignment, and fast role-fit recognition.

---

## Executive Summary

The portfolio is already strong. It presents a distinctive senior positioning: analytics architecture at the intersection of instrumentation, qualitative methodology, UX telemetry, and decision systems. The work is substantive, the cases are concrete, and the public projects add credible evidence of independent building.

The main opportunity is not basic polish. The site needs **conversion tuning**:

- Make the first minute easier for hiring readers.
- Reduce the synthesis burden.
- Route readers by role/use case.
- Keep the deeper peer-facing substance intact.
- Make practical sharing/search details production-ready.

The site should work in two modes:

1. **Peer credibility mode:** thoughtful, rigorous, distinctive, deep.
2. **Job application mode:** fast, role-explicit, proof-forward, easy to scan.

---

# Highest-Priority Changes

## 1. Remove or change `noindex, nofollow`

### Issue
Several pages include:

```html
<meta name="robots" content="noindex, nofollow" />
```

This is fine while drafting, but it is counterproductive once the site is shared for job applications or peer discovery.

### Recommendation

Replace with:

```html
<meta name="robots" content="index, follow" />
```

Or remove the robots meta entirely.

### Pages to check

- `index.html`
- `work/index.html`
- `about/index.html`
- `contact/index.html`
- `notebook/index.html`
- All case study pages under `work/`

### Priority
Critical before public sharing.

---

## 2. Add a proof strip near the top of the homepage

### Issue
The site has many strong proof points, but they are distributed across the homepage, Work page, About page, and case studies. A fast reader should see the scale immediately.

### Recommended placement
Homepage, directly after the hero actions and before Selected Work.

### Suggested content

```text
14 years analytics
18 case studies
83% alert reduction
~50% BigQuery cost reduction
38 analyst hours/month recovered
11 Amplitude credentials
EU work authorization
```

### Suggested HTML structure

```html
<div class="proof-strip" aria-label="Portfolio proof points">
  <div class="proof-item">
    <span class="proof-value">14 years</span>
    <span class="proof-label">Analytics experience</span>
  </div>
  <div class="proof-item">
    <span class="proof-value">18</span>
    <span class="proof-label">Case studies</span>
  </div>
  <div class="proof-item">
    <span class="proof-value">83%</span>
    <span class="proof-label">Alert reduction</span>
  </div>
  <div class="proof-item">
    <span class="proof-value">~50%</span>
    <span class="proof-label">BigQuery cost reduction</span>
  </div>
  <div class="proof-item">
    <span class="proof-value">38 hrs/mo</span>
    <span class="proof-label">Recovered analyst time</span>
  </div>
  <div class="proof-item">
    <span class="proof-value">11</span>
    <span class="proof-label">Amplitude credentials</span>
  </div>
  <div class="proof-item">
    <span class="proof-value">EU</span>
    <span class="proof-label">Work authorization</span>
  </div>
</div>
```

### Intent
Make credibility obvious before the reader encounters the more conceptual framing.

---

## 3. Add role-based reader paths

### Issue
The site is currently organized around the author’s conceptual model: methodology, instrumentation, adoption, AI workflow design, marketing analytics, data engineering, etc. That is strong for peers but less direct for hiring readers.

### Recommendation
Add a “Start here based on what you’re hiring for” section.

### Recommended placement
Homepage near top and Work page near top.

### Suggested copy

```html
<section id="reader-paths" class="alt">
  <div class="section-head">
    <div class="num">00</div>
    <div class="label">Start here</div>
    <div class="title">Role-based paths</div>
  </div>
  <div class="section-body">
    <div class="container">
      <p class="section-eyebrow">Short on time?</p>
      <h2 class="section-heading">Start with the evidence most relevant to your role.</h2>

      <div class="reader-path-grid">
        <a class="reader-path-card" href="work/ai-alert-triage.html">
          <span class="reader-path-label">Product Analytics / AI Workflows</span>
          <span class="reader-path-title">AI Alert Triage</span>
          <span class="reader-path-body">Production alert triage with explicit human decision gates; 230 alerts compressed to 39 posts.</span>
        </a>

        <a class="reader-path-card" href="work/pipeline-optimization.html">
          <span class="reader-path-label">Analytics Engineering</span>
          <span class="reader-path-title">Pipeline Optimization</span>
          <span class="reader-path-body">BigQuery architecture redesign; repeated scans collapsed; ~50% cost reduction.</span>
        </a>

        <a class="reader-path-card" href="work/ux-research-home-services.html">
          <span class="reader-path-label">UX Telemetry / Research</span>
          <span class="reader-path-title">Mixed-Methods UX Research</span>
          <span class="reader-path-body">Quantitative funnel telemetry paired with Sense-Making-informed qualitative research.</span>
        </a>

        <a class="reader-path-card" href="work/cdp-migration.html">
          <span class="reader-path-label">Marketing Analytics / Lifecycle</span>
          <span class="reader-path-title">CDP Migration</span>
          <span class="reader-path-body">Responsys to Bloomreach migration with redesigned customer data model and zero campaign downtime.</span>
        </a>
      </div>
    </div>
  </div>
</section>
```

### Intent
Reduce cognitive load. Give hiring readers a guided path instead of making them infer which cases matter.

---

## 4. Make the hero subhead more role-explicit

### Current strength
The hero headline is memorable:

```text
The gap between what users say and what they do is where the work lives.
```

Keep it.

### Issue
The supporting copy could be more explicit for recruiters and hiring managers.

### Suggested replacement / refinement

```text
Analytics architect for product, marketing, and UX teams. I design trustworthy instrumentation, analytics pipelines, and research-informed measurement systems that turn user behavior into better product decisions.
```

### Intent
Preserve the conceptual identity while making the role category instantly legible.

---

## 5. Add “Short on time? Read these three first.”

### Issue
The site is deep. That is good, but it can feel like a lot.

### Recommendation
Add a compact shortcut block to the homepage and/or Work page.

### Suggested copy

```html
<div class="shortcut-callout">
  <p class="shortcut-label">Short on time?</p>
  <p class="shortcut-body">
    Read these three first:
    <a href="work/ai-alert-triage.html">AI Alert Triage</a>,
    <a href="work/pipeline-optimization.html">Pipeline Optimization</a>,
    and
    <a href="work/ux-research-home-services.html">Mixed-Methods UX Research</a>.
  </p>
</div>
```

### Intent
Give readers permission not to read everything.

---

# Content + Positioning Improvements

## 6. Reduce repeated thesis language by 15–20%

### Issue
The central thesis is strong, but variants of the same idea appear frequently:

- “gap between what users say and what they do”
- “surface the question, not just the number”
- “measurement layer as research instrument”
- “human question underneath the metric”

These are good, but repetition can make the site feel like it is circling the same point.

### Recommendation
Keep the thesis in three core places:

1. Hero
2. Approach section
3. One or two flagship case intros

Elsewhere, shift to direct evidence and outcomes.

### Suggested alternate wording for repeated areas

Instead of:

```text
measurement layer that surfaces the question, not just the number
```

Use:

```text
analytics systems that reduce ambiguity: cleaner event schemas, more reliable pipelines, clearer user behavior, and faster decisions
```

---

## 7. Reframe “what I’m still growing into” as role calibration

### Issue
The honesty is good, but “what I’m still growing into” can read as a limitation when placed prominently.

### Suggested label

```text
Role calibration: strongest fit / growth edges
```

### Suggested rewrite

```text
Strongest fit: senior IC analytics architecture, product telemetry, cross-functional measurement design, analytics engineering, and research-informed instrumentation.

Growth edges: people management at larger scale, production ML ownership, and Dutch fluency beyond A2.
```

### Intent
Keep the maturity and honesty, but frame it as fit guidance rather than disqualification.

---

## 8. Normalize availability language

### Issue
“Open to next role” and “Currently FTE” are understandable but could be sharper.

### Suggested homepage availability line

```text
Amsterdam-based · EU work authorization · selectively open to senior IC roles
```

### Suggested contact/about phrasing

Replace:

```text
Currently FTE at Telus Digital; standard notice period applies.
```

With:

```text
Currently employed full-time at Telus Digital; standard notice applies.
```

Or:

```text
Currently full-time at Telus Digital; standard notice applies.
```

### Intent
Sound intentional and polished.

---

## 9. Add a “Best fit” section

### Suggested copy

```html
<div class="fit-summary">
  <p class="fit-summary-label">Best fit</p>
  <p>
    Senior individual-contributor roles where analytics architecture, product telemetry,
    experimentation, analytics engineering, and stakeholder enablement overlap.
  </p>
  <p>
    Strongest match: Analytics Architect, Senior Product Analyst, Analytics Engineer,
    UX Telemetry Lead, Marketing Analytics Lead.
  </p>
  <p>
    Less ideal: pure dashboard production, pure data science modeling, or people-management-first roles.
  </p>
</div>
```

### Intent
Help hiring readers quickly determine fit.

---

# Work Page Improvements

## 10. Standardize case card summaries

### Issue
The Work page has strong cards, but many blurbs are paragraph-dense. A repeatable structure would improve scanability.

### Recommended card structure

```text
Problem: what was broken
Built: what I created or changed
Result: quantified or strategic outcome
Why it matters: what the case proves
```

### Example rewrite: AI Alert Triage

```html
<p class="case-card-body">
  <strong>Problem:</strong> Noisy alert channel hid critical failures.
</p>
<p class="case-card-body">
  <strong>Built:</strong> AI-assisted triage with explicit human decision gates.
</p>
<p class="case-card-body">
  <strong>Result:</strong> 230 alerts compressed to 39 posts; one critical missed failure surfaced.
</p>
<p class="case-card-body">
  <strong>Why it matters:</strong> Reduced noise without outsourcing judgment.
</p>
```

### Alternative compact version

```html
<ul class="case-card-proof">
  <li><strong>Problem:</strong> Noisy alert channel hid critical failures.</li>
  <li><strong>Built:</strong> AI-assisted triage with explicit human decision gates.</li>
  <li><strong>Result:</strong> 230 alerts compressed to 39 posts; one critical missed failure surfaced.</li>
  <li><strong>Why it matters:</strong> Reduced noise without outsourcing judgment.</li>
</ul>
```

### Intent
Make the index fast while preserving deep case pages.

---

## 11. Reconsider visible topic numbering

### Issue
The Work page orders topics by impact, but the topic numbers are non-sequential in display order. This may confuse fast readers.

### Options

#### Option A: Rename “Topic” to “Lens”

```text
Lens 04 — AI Workflow Design
```

This makes non-linear ordering feel intentional.

#### Option B: Remove visible numbers

Use:

```text
AI Workflow Design
Data Engineering & Architecture
Instrumentation & Cross-Platform Telemetry
```

### Recommendation
For job applications, remove visible topic numbers or make them secondary.

---

## 12. Keep the deep case pages mostly intact

### Rationale
The case pages are a major differentiator. They contain real architecture, judgment, tradeoffs, and metrics. Do not overcompress them.

### Principle
- Homepage = decisive
- Work index = fast
- Case pages = deep

---

# Notebook / Field Notes Improvements

## 13. Rename Notebook

### Issue
The Notebook content is strategically useful, but the label may undersell it.

### Current content strength
The posts show live thinking about:

- qualitative vs quantitative sequencing
- AI workflow gate structure
- A/B test pre-mortems
- deliberate omission as a signal
- analytics shadow IT

### Recommended rename

Best option:

```text
Field Notes
```

Other options:

```text
Working Notes
Research Notes
Method Notes
Thinking in Public
```

### Recommendation
Use **Field Notes** in the nav and page title.

### Suggested title rewrite

Current:

```text
Questions I'm currently chasing.
```

Suggested:

```text
Field notes on measurement, method, and AI-assisted analytics.
```

### Suggested intro

```text
Working notes from the edge of analytics practice: instrumentation design, Sense-Making methodology, AI-assisted workflows, and the gaps official measurement layers miss.
```

### Intent
Make the page sound less like a notebook dump and more like a practitioner’s public thinking archive.

---

# Public Projects Improvements

## 14. Add “Professional signal” lines to each public project

### Issue
The projects are interesting, but hiring readers may not immediately know why they belong in an analytics portfolio.

### Suggested additions

#### Dervin’s SMM

```text
Professional signal: methodology translation, research tooling, and the ability to make qualitative frameworks operational.
```

#### Writers Room

```text
Professional signal: AI workflow architecture, RAG, agent orchestration, and human-in-the-loop product judgment.
```

#### VibeReader

```text
Professional signal: model-selection judgment, API integration, and experience design around subjective matching.
```

### Intent
Bridge side projects to professional credibility.

---

# About Page Improvements

## 15. Add an About page snapshot before the long bio

### Issue
The About page is rich but long. A snapshot would help fast readers.

### Suggested structure

```html
<aside class="about-snapshot" aria-label="Professional snapshot">
  <dl>
    <dt>Current</dt>
    <dd>Analytics Architect, Telus Digital</dd>

    <dt>Location</dt>
    <dd>Amsterdam, Netherlands</dd>

    <dt>Authorization</dt>
    <dd>EU work authorization</dd>

    <dt>Core</dt>
    <dd>Instrumentation, analytics engineering, product telemetry, Sense-Making methodology</dd>

    <dt>Proof</dt>
    <dd>14 years, 11 Amplitude credentials, MSc Data Analytics, HIPAA exposure</dd>

    <dt>Best fit</dt>
    <dd>Senior IC analytics, product, telemetry, and analytics engineering roles</dd>
  </dl>
</aside>
```

### Intent
Make the About page readable in 30 seconds before the longer narrative.

---

# Contact Page Improvements

## 16. Normalize email casing

### Current visible email

```text
Frederic.Labadie@gmail.com
```

### Suggested visible email

```text
frederic.labadie@gmail.com
```

The mailto can remain equivalent. Lowercase is visually cleaner and more conventional.

---

## 17. Add “what to contact me about”

### Suggested addition

```html
<p class="contact-fit">
  Best conversations: senior analytics architecture, product telemetry, analytics engineering,
  UX measurement, experimentation systems, and AI-assisted analytics workflows.
</p>
```

### Intent
The Contact page should reinforce fit at the point of conversion.

---

# Code / UX / Accessibility Improvements

## 18. Add Escape-key support for mobile nav

### Current strength
The mobile nav toggles `aria-expanded` and closes when a nav link is clicked.

### Suggested enhancement

```js
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    navLinks.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }
});
```

### Possible fuller implementation

```js
if (toggle && navLinks) {
  const closeNav = () => {
    navLinks.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  };

  toggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeNav);
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeNav();
  });
}
```

---

## 19. Clean CSS comments that read like revision notes

### Issue
Some CSS comments describe past changes, such as “Bumped from...” or “Replaces inline...” These are useful during iteration but read like internal history if a technical peer reviews the repo.

### Recommendation
Change comments from revision-history style to intent style.

### Example

Replace:

```css
/* Bumped from 14.5px / soft-ink to 15.5px / full ink. */
```

With:

```css
/* Case-card summaries are primary scan content, so keep them at body-reading size. */
```

Replace:

```css
/* Replaces inline `color: inherit; text-decoration: none;` once carried by every marquee case-card-title <a>. */
```

With:

```css
/* Case-card titles act as primary links; underline only on hover for cleaner scanning. */
```

### Intent
Make the source read as stable production code.

---

## 20. Frame “plain HTML & CSS” as intentional

### Current footer idea
The footer says the site is built in plain HTML & CSS.

### Issue
That is charming, but some readers may not know whether it is a limitation or a deliberate choice.

### Suggested footer variant

```text
Built intentionally in plain HTML & CSS · GitHub Pages · fast, portable, durable
```

### Intent
Turn simplicity into a design decision.

---

## 21. Preserve and possibly advertise print friendliness

### Current strength
The print stylesheet is thoughtful: it strips chrome, flattens grids, adapts dark blocks, and opens details.

### Suggested small addition
On relevant case pages or CV area:

```text
Case pages are print-friendly for forwarding or review.
```

### Intent
Make a hidden strength visible.

---

# Suggested CSS Additions

These are optional starting points for Claude Code.

## Proof strip

```css
.proof-strip {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  border-top: 1px solid var(--c-rule);
  border-left: 1px solid var(--c-rule);
  margin-top: 32px;
}

.proof-item {
  padding: 18px 16px;
  border-right: 1px solid var(--c-rule);
  border-bottom: 1px solid var(--c-rule);
  background: var(--c-bg);
}

.proof-value {
  display: block;
  font-family: var(--font-sans);
  font-weight: 600;
  font-size: clamp(22px, 2.8vw, 34px);
  line-height: 1;
  color: var(--c-ink);
  letter-spacing: -0.02em;
  margin-bottom: 8px;
}

.proof-label {
  display: block;
  font-family: var(--font-mono);
  font-size: 10.5px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--c-ink-soft);
  line-height: 1.35;
}

@media (max-width: 980px) {
  .proof-strip { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 520px) {
  .proof-strip { grid-template-columns: 1fr; }
}
```

---

## Reader path cards

```css
.reader-path-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border-top: 1px solid var(--c-rule);
  border-left: 1px solid var(--c-rule);
}

.reader-path-card {
  display: grid;
  grid-template-rows: auto auto 1fr;
  gap: 10px;
  padding: 24px;
  border-right: 1px solid var(--c-rule);
  border-bottom: 1px solid var(--c-rule);
  background: var(--c-bg);
  text-decoration: none;
}

.reader-path-card:hover {
  background: var(--c-bg-alt);
  text-decoration: none;
}

.reader-path-label {
  font-family: var(--font-mono);
  font-size: 10.5px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--c-accent);
  line-height: 1.4;
}

.reader-path-title {
  font-family: var(--font-sans);
  font-weight: 600;
  font-size: 21px;
  line-height: 1.18;
  letter-spacing: -0.012em;
  color: var(--c-ink);
}

.reader-path-body {
  font-size: 15.5px;
  line-height: 1.55;
  color: var(--c-ink);
}

@media (max-width: 1080px) {
  .reader-path-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 620px) {
  .reader-path-grid { grid-template-columns: 1fr; }
}
```

---

## Shortcut callout

```css
.shortcut-callout {
  border-left: 2px solid var(--c-accent);
  background: var(--c-bg-alt);
  padding: 18px 22px;
  margin: 28px 0 32px;
  max-width: 78ch;
}

.shortcut-label {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--c-accent);
  margin-bottom: 8px;
}

.shortcut-body {
  font-size: 15.5px;
  line-height: 1.6;
  color: var(--c-ink);
}

.shortcut-body a {
  color: var(--c-ink);
  border-bottom: 1px solid var(--c-rule-light);
}

.shortcut-body a:hover {
  text-decoration: none;
  border-bottom-color: var(--c-ink);
}
```

---

## Professional signal line

```css
.project-signal {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px dashed var(--c-rule-light);
  font-size: 14.5px;
  line-height: 1.55;
  color: var(--c-ink);
}

.project-signal strong {
  font-family: var(--font-mono);
  font-size: 10.5px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--c-accent);
  font-weight: 500;
}
```

---

# Suggested Implementation Order

## Phase 1: Public-readiness fixes

1. Remove/change `noindex, nofollow`.
2. Normalize email casing.
3. Replace “Currently FTE” language.
4. Rename Notebook to Field Notes.
5. Add Escape-key support for mobile nav.

## Phase 2: Homepage conversion improvements

1. Add proof strip.
2. Add role-based reader paths.
3. Tighten hero subhead.
4. Add “Short on time?” shortcut.
5. Add Best Fit block or short role-fit summary.

## Phase 3: Work page scanability

1. Add role-based reader paths to Work page.
2. Remove or revise visible topic numbering.
3. Standardize case card summaries into Problem / Built / Result / Why.
4. Preserve case pages as deep content.

## Phase 4: Strategic polish

1. Add professional signal lines to public projects.
2. Add About page snapshot.
3. Add “what to contact me about” to Contact.
4. Clean CSS comments.
5. Reframe plain HTML & CSS footer as intentional durability.

---

# Things to Preserve

Do not flatten the site into a generic portfolio. Preserve:

- The central thesis around the gap between stated intent and observed behavior.
- The instrumentation + methodology dual-positioning.
- The deep case pages.
- The quantified outcomes.
- The honesty/calibration section, but reframe it.
- The public projects, especially if each gets a professional signal.
- The print stylesheet.
- The restrained visual language: IBM Plex, hairline rules, white/slate/crimson palette.

---

# Strategic Principle

Use this rule when editing:

```text
Homepage: decisive.
Work index: fast.
Case pages: deep.
About page: credible.
Field Notes: thoughtful.
Contact: conversion-focused.
```

The portfolio should still feel like Frederic: rigorous, reflective, systems-oriented, and intellectually alive. The goal is not to make it simpler in substance; the goal is to make the first read easier and the evidence paths more obvious.
