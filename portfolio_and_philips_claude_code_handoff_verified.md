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

---

# Philips Microsite Addendum
## Claude Code Handoff for `/philips`

Microsite target: `https://github.com/fredericlabadie/fredericlabadie.github.io/tree/main/philips`  
Target role: Philips UX Telemetry role inside the Usability Center of Excellence  
Primary goal: make the Philips microsite work as a targeted evidence system for this specific role, not as a smaller copy of the general portfolio.

## Important implementation note — corrected after GitHub access

The `/philips` microsite was subsequently accessed successfully in GitHub at:

```text
fredericlabadie/fredericlabadie.github.io/philips/index.html
```

This addendum now reflects file-verified observations from `philips/index.html`, plus the Philips JD pasted in the conversation. Claude Code should still inspect the current repository state before editing, but the earlier caveat that `/philips` could not be inspected is no longer accurate.

Verified existing microsite structure:

- Targeted Philips UX Telemetry Expert pitch at `/philips/`.
- Philips-specific nav: Home, Work, About, Contact.
- Hero explicitly frames the role as the full telemetry cycle, not just analytics outputs.
- Two-column hero proof block: Instrumentation and Methodology & Usability.
- Fit map mapping JD responsibilities to evidence.
- Five case-study mappings:
  - Question formulation / Shadow IT
  - Instrumentation / SSLP Mobile
  - AI workflow design / AI Alert Triage
  - Adoption / SSLP Enablement
  - Mixed-methods research methodology / UX Research Home Services
- Clinical Domain section with explicit caveat: no medical-device portfolio claimed.
- Clinical reasoning table: Completion, Omission, Workaround.
- First 90 Days sketch.
- Contact section and CV link.
- Current meta robots setting is `noindex, nofollow`; keep or change intentionally.

---

# Philips JD Summary

The role is not generic analytics. It is a **product-facing UX Telemetry delivery lead** role.

Philips is looking for someone who can:

- Help product teams define the right UX telemetry questions.
- Translate questions into measurable behaviors.
- Create tracking plans, event definitions, and implementation requirements.
- Coordinate implementation across PMs, designers, engineers, architects, and analysts.
- Build dashboards that reveal behavior, task success, workflow performance, clinical workflow patterns, user journeys, and friction points.
- Present insights to technical and non-technical stakeholders.
- Support data storytelling, data literacy, and cultural adoption.
- Contribute to advanced analytics, predictive analytics, and AI-supported telemetry opportunities.
- Integrate privacy, legal, regulatory, and consent considerations without slowing delivery.
- Operate in complex, cross-functional, partially ambiguous environments.
- Bring affinity with usability and human factors.
- Work across the Philips portfolio from within the Usability Center of Excellence.
- Work in-person at least 3 days per week.

The microsite should therefore answer one question quickly:

```text
Can Frederic make end-to-end UX telemetry real inside Philips product, UX, usability, and engineering teams?
```

---

# Strategic Diagnosis

The main portfolio’s core thesis already fits this role well:

```text
The gap between what users say and what they do is where the work lives.
```

For Philips, however, that thesis needs to be translated into more literal hiring language:

```text
UX telemetry that turns product questions into measurable behavior.
```

The microsite should be narrower, faster, and more role-literal than the main portfolio.


# File-Verified Assessment of Existing `/philips/index.html`

The current microsite is already much stronger than a generic application page. It is tightly targeted, uses the Philips role language, and makes a direct argument that the job is the full telemetry cycle rather than dashboard production.

## What is already working

- The hero clearly understands the JD: the deliverable is helping product teams define questions, translate them into measurable behavior, instrument honestly, and adopt the measurement layer.
- The fit map directly mirrors the JD and maps responsibilities to evidence.
- The page does not overclaim medical-device experience; it explicitly says there is no medical-device portfolio and then explains transferable reasoning.
- The clinical-domain section is strategically useful because it distinguishes completion, omission, and workaround as different telemetry layers.
- The first-90-days section is concrete and appropriately humble: listen, map, land one.
- The Amsterdam / EU authorization / Eindhoven commute feasibility line is practical and removes a hiring concern.
- The five selected cases are appropriate for the role and cover the JD well.

## Main remaining opportunity

The page is persuasive, but it can become more **scan-efficient and less defensive**. It sometimes explains the strategy in long paragraphs where a hiring manager needs fast confirmation. The next edit should preserve the intelligence while adding more structured proof, shorter labels, and clearer above-the-fold evidence.


## Main strategic shift

| From | To |
|---|---|
| Broad analytics architect | Product-facing UX Telemetry delivery lead |
| General proof of analytics depth | Evidence of end-to-end telemetry implementation |
| Instrumentation + methodology as personal philosophy | Instrumentation + methodology as Philips delivery capability |
| Case library breadth | Few tightly mapped Philips-relevant cases |
| General portfolio navigation | Role-specific evidence path |
| Interesting analytics thinker | Person who can make telemetry real inside product teams |

---

# Recommended Information Architecture

The current `/philips/index.html` is already a focused one-page pitch and should not be completely rebuilt. Treat the following as refinement rather than replacement.

## Current structure to preserve

1. Hero
2. Fit Map
3. Case Studies
4. Clinical Domain
5. Close / Why this role
6. First 90 Days
7. Contact

## Recommended refinements

Add or strengthen these within the existing structure:

1. Add a compact telemetry-specific proof strip directly after hero actions.
2. Add a short “Why this role fits” summary before the fit map.
3. Consider adding a standalone “Telemetry Cycle” mini-section or visual flow before the fit map if page length allows.
4. Make case cards more structured with `Question / Translation / Output / Philips relevance`.
5. Keep the Clinical Domain section, but shorten the opening caveat slightly so it reads as confident calibration rather than apology.
6. Keep the First 90 Days section, but add clearer deliverables for each phase.

## Suggested navigation

The current nav points to `/philips/`, `/philips/work/`, `/philips/about/`, and `/philips/contact/`. That is acceptable if those subpages are populated and targeted. For this single-page pitch, also consider in-page anchors or secondary jump links:

```text
Fit
Cases
Clinical Context
First 90 Days
Contact
```

Avoid making the Philips microsite feel like the full general portfolio.

---

# File-Verified Quick Wins

## 1. Update meta description wording

The existing meta description refers to the “Adoption & Insights position.” The pasted JD frames the role as UX Telemetry inside the Usability Center of Excellence. Align the description to the JD wording.

Suggested:

```html
<meta
  name="description"
  content="Targeted pitch for the Philips UX Telemetry Expert role: end-to-end UX telemetry, question framing, behavior modeling, tracking plans, implementation coordination, dashboards, privacy-aware delivery, and adoption inside product teams."
/>
```

## 2. Decide intentionally on `noindex, nofollow`

Current:

```html
<meta name="robots" content="noindex, nofollow" />
```

Options:

- Keep `noindex, nofollow` if the page is only for a direct application link and should not be discoverable.
- Change to `index, follow` if the microsite should be publicly discoverable.
- Use `noindex, follow` if direct sharing is desired but link graph behavior should remain.

Do not leave this accidental.

## 3. Add a proof strip after hero actions

The current hero has strong prose and a two-column diff grid. Add a fast proof strip before the diff grid or immediately after it so the reader sees evidence before reading deeper.

## 4. Reduce “targeted pitch” language slightly

The page title/nav/footer use “pitch.” That is honest, but “pitch” can feel applicant-centered. Consider replacing with “role fit” or “UX Telemetry role fit.”

Examples:

```text
Philips · UX Telemetry Expert role fit
```

instead of:

```text
Philips · UX Telemetry Expert pitch
```

## 5. Tighten the clinical caveat

The clinical section is strong and honest. The only risk is that it spends enough time on what is missing that the reader may anchor there. Keep the caveat, but move quickly into transferable evidence and collaboration with Philips domain experts.


# Hero Rewrite

## Current state

The existing hero already leads with a strong role-specific claim:

```text
The job is the full telemetry cycle, not just the analytics outputs.
```

That is well aligned with the JD. The refinement opportunity is to make the first screen slightly faster and less text-heavy while preserving the idea.

## Recommended hero option

```html
<h1>UX telemetry that turns product questions into measurable behavior.</h1>

<p class="hero-subhead">
  Amsterdam-based analytics architect focused on end-to-end UX telemetry. I help product,
  design, usability, and engineering teams define the right questions, translate them into
  measurable behaviors, coordinate implementation, and build dashboards that reveal user
  journeys, workflow patterns, task success, and friction in complex products.
</p>
```

## Alternative hero if preserving the original philosophical voice

```html
<h1>The gap between what users say and what they do is where UX telemetry becomes useful.</h1>

<p class="hero-subhead">
  I design and deliver telemetry systems for product teams: from question framing and event
  definitions to implementation coordination, dashboarding, insight generation, and adoption.
</p>
```

## Recommended eyebrow

```text
Philips UX Telemetry · Usability Center of Excellence · Amsterdam
```

## Recommended status line

```text
Amsterdam-based · EU work authorization · hybrid-friendly · standard notice applies
```

---

# Telemetry-Specific Proof Strip

Add a proof strip near the top. This is more important on the Philips microsite than on the general portfolio.

## Suggested proof points

```html
<ul class="proof-strip" aria-label="Key UX telemetry proof points">
  <li>
    <span class="proof-value">14 years</span>
    <span class="proof-label">Analytics experience</span>
  </li>
  <li>
    <span class="proof-value">End-to-end</span>
    <span class="proof-label">Telemetry delivery</span>
  </li>
  <li>
    <span class="proof-value">11</span>
    <span class="proof-label">Amplitude credentials</span>
  </li>
  <li>
    <span class="proof-value">Tracking plans</span>
    <span class="proof-label">Event definitions and implementation requirements</span>
  </li>
  <li>
    <span class="proof-value">Dashboards</span>
    <span class="proof-label">Insight generation and adoption</span>
  </li>
  <li>
    <span class="proof-value">Privacy</span>
    <span class="proof-label">Consent and regulated-context exposure</span>
  </li>
  <li>
    <span class="proof-value">EU</span>
    <span class="proof-label">Amsterdam · work authorization</span>
  </li>
</ul>
```

---

# JD-to-Evidence Fit Grid

The microsite should explicitly map JD needs to your evidence. This is likely already present or intended as a `fit-grid`. If present, strengthen it using this structure.

## Recommended columns

```text
Philips need
How I approach it
Evidence
```

## Stronger version

```text
Philips need
Delivery behavior
Evidence from my work
```

This avoids generic “fit” language and makes the mapping feel more concrete.

---

## JD Mapping Table

Use this as the content basis for the fit grid.

| Philips JD requirement | Microsite should prove | Best evidence to use |
|---|---|---|
| End-to-end UX Telemetry implementation | You can own the full cycle, not just analytics outputs | SSLP mobile instrumentation, SSLP enablement, mixed-methods UX research |
| Define objectives and UX telemetry questions | You can facilitate question framing before tracking | Sense-Making methodology, Shadow IT case, mixed-methods UX research |
| Translate UX questions into measurable behaviors | You can map qualitative/product questions into observable events | Mixed-methods UX, mobile telemetry, candidate funnel, content brand GA4 |
| Create tracking plans and event definitions | You can produce technical requirements usable by engineers | SSLP mobile, MQSR schema/SDK debugging, CDP migration |
| Coordinate implementation across PM/design/engineering | You can move telemetry from spec to production | SSLP mobile, client enablement, copilot pipeline |
| Build dashboards for behavior, task success, friction | You can create decision-support dashboards, not just reports | Candidate funnel, MQSR dashboards, SSLP enablement |
| Present insights to technical and non-technical stakeholders | You can translate findings across audiences | Stanley Steemer adoption, executive readouts, Telus/client work |
| Support data storytelling and data literacy | You can help teams change how they work | SSLP enablement, Stanley A/B culture change |
| Advanced analytics / predictive / AI-supported telemetry | You can use AI where it strengthens judgment | AI Alert Triage, Writers Room, Amplitude monitor work |
| Privacy, legal, regulatory, consent | You understand constraints as delivery requirements | HIPAA exposure, OneTrust, TrustArc, consent-aware instrumentation |
| Complex cross-functional ambiguity | You can operate without perfect clarity | Shadow IT, pipeline optimization, product telemetry engagements |
| Usability and Human Factors affinity | You understand behavior, workflows, and friction | SMM, UserZoom, task success, heuristic evaluation |
| Across Philips portfolio / diverse ecosystem | You can generalize telemetry across products and platforms | Cross-platform mobile instrumentation, app/web/CRM telemetry, portfolio of cases |
| 3 days in office / Amsterdam | You are locally viable | Amsterdam, EU authorization, hybrid-friendly |

---

# Fit Grid Copy Draft

```html
<div class="fit-grid">
  <div class="fit-row fit-header">
    <span>Philips need</span>
    <span>How I would deliver it</span>
    <span>Evidence</span>
  </div>

  <div class="fit-row">
    <div class="fit-need">
      <strong>End-to-end UX Telemetry implementation</strong><br>
      From objectives and telemetry questions through tracking, dashboarding, adoption, and iteration.
    </div>
    <div class="fit-bring">
      I treat telemetry as a full delivery cycle: define the question, model the behavior,
      specify the events, coordinate implementation, QA the data, build the dashboard, and
      help the team use the result.
    </div>
    <div class="fit-ref">
      <a href="../work/sslp-mobile.html">Mobile telemetry</a><br>
      <a href="../work/sslp-enablement.html">Enablement</a>
    </div>
  </div>

  <div class="fit-row">
    <div class="fit-need">
      <strong>Translate UX questions into implementable data requirements</strong><br>
      Business, UX, and product needs must become event definitions engineers can build.
    </div>
    <div class="fit-bring">
      My strongest fit is the translation layer: turning ambiguous product questions into
      observable behaviors, event schemas, data-layer requirements, and dashboards that
      product teams can act on.
    </div>
    <div class="fit-ref">
      <a href="../work/ux-research-home-services.html">Mixed-methods UX</a><br>
      <a href="../work/shadow-it.html">Shadow IT discovery</a>
    </div>
  </div>

  <div class="fit-row">
    <div class="fit-need">
      <strong>Support adoption and data storytelling</strong><br>
      Telemetry only matters if product teams understand and use it.
    </div>
    <div class="fit-bring">
      I build for adoption, not just delivery: structured handoffs, dashboard walkthroughs,
      analyst enablement, executive readouts, and documentation that lets the system survive
      beyond the original builder.
    </div>
    <div class="fit-ref">
      <a href="../work/sslp-enablement.html">38 hours/month recovered</a><br>
      <a href="../work/stanley-ab.html">A/B culture change</a>
    </div>
  </div>
</div>
```

---

# Add a Telemetry Delivery Cycle Section

This should be the central conceptual framework of the Philips microsite.

## Suggested section title

```text
How I make UX telemetry real
```

## Suggested structure

```html
<section id="telemetry-cycle">
  <div class="section-head">
    <div class="num">03</div>
    <div class="label">Telemetry cycle</div>
    <div class="title">Question · Behavior · Tracking · Dashboard · Adoption</div>
  </div>

  <div class="section-body">
    <div class="container">
      <p class="section-eyebrow">Delivery model</p>
      <h2 class="section-heading">UX telemetry is a delivery cycle, not a dashboard request.</h2>
      <p class="section-sub">
        The work starts before events exist and ends only when the product team can use the insight.
      </p>

      <div class="flow">
        <div class="flow-step">
          <div class="flow-num">01</div>
          <div class="flow-label">Frame the question</div>
          <div class="flow-desc">Define the UX, usability, product, or workflow question that telemetry should answer.</div>
        </div>
        <div class="flow-step">
          <div class="flow-num">02</div>
          <div class="flow-label">Model the behavior</div>
          <div class="flow-desc">Translate the question into observable actions, journeys, task outcomes, friction points, and omissions.</div>
        </div>
        <div class="flow-step">
          <div class="flow-num">03</div>
          <div class="flow-label">Specify the tracking</div>
          <div class="flow-desc">Create event definitions, data needs, implementation requirements, consent constraints, and QA expectations.</div>
        </div>
        <div class="flow-step">
          <div class="flow-num">04</div>
          <div class="flow-label">Coordinate delivery</div>
          <div class="flow-desc">Work with PM, design, engineering, architecture, and analytics to get the telemetry built correctly.</div>
        </div>
        <div class="flow-step">
          <div class="flow-num">05</div>
          <div class="flow-label">Build the view</div>
          <div class="flow-desc">Create dashboards that reveal task success, journeys, clinical workflow patterns, and experience friction.</div>
        </div>
        <div class="flow-step">
          <div class="flow-num">06</div>
          <div class="flow-label">Drive adoption</div>
          <div class="flow-desc">Help teams interpret the findings, change decisions, and iterate on the telemetry as the product changes.</div>
        </div>
      </div>
    </div>
  </div>
</section>
```

---

# Add a “Clinical / Health-Tech Translation” Section

## Purpose

The JD is health-tech and mentions clinical workflow patterns. You should not overclaim clinical domain expertise if it is not deep, but you should explicitly show why your experience transfers.

## Recommended title

```text
How I would translate my experience into Philips’ clinical context
```

## Suggested copy

```html
<div class="callout">
  <div class="callout-label">Clinical context calibration</div>
  <div class="callout-body">
    My direct background is stronger in analytics architecture, usability-informed telemetry,
    regulated data, and cross-functional implementation than in Philips-specific clinical workflow.
    The transfer point is the delivery pattern: define the workflow question, identify observable
    behaviors and omissions, build privacy-aware telemetry, and help product teams use the evidence.
    I would expect the clinical expertise to come from Philips’ usability, human factors, product,
    and clinical stakeholders; my role is to make those questions measurable and operational.
  </div>
</div>
```

## Why this matters

This avoids overreach while showing mature collaboration with domain experts.

---

# Add a Privacy / Regulatory Delivery Block

## Recommended title

```text
Privacy and regulatory constraints belong inside the delivery plan
```

## Suggested copy

```html
<div class="callout">
  <div class="callout-label">Privacy · consent · regulated environments</div>
  <div class="callout-body">
    I have worked with HIPAA-exposed data and enterprise consent regimes including OneTrust
    and TrustArc. For UX telemetry, I treat privacy, legal, regulatory, and consent requirements
    as part of the implementation path: they shape what gets collected, how it is named, where
    it flows, how it is governed, and how momentum is maintained without bypassing constraints.
  </div>
</div>
```

## JD coverage

This directly addresses:

```text
Integrate privacy, legal, regulatory, and consent-related activities into delivery planning and execution, ensuring they are addressed without losing momentum.
```

---

# Add a Workshop Facilitation Block

## Issue

The JD strongly emphasizes workshops and stakeholder translation. Make this explicit near the top, not buried in case descriptions.

## Suggested section

```html
<section id="workshops">
  <div class="section-body">
    <div class="container">
      <p class="section-eyebrow">Workshop facilitation</p>
      <h2 class="section-heading">From stakeholder questions to implementable telemetry.</h2>
      <p class="section-sub">
        My workshop goal is not to collect wish-list metrics. It is to turn product, UX,
        usability, and engineering perspectives into a shared behavioral model and a tracking
        plan that can actually be implemented.
      </p>

      <div class="card-row card-row-3">
        <div class="card">
          <div class="card-label">Before the workshop</div>
          <div class="card-body">
            Clarify product objectives, current evidence gaps, known workflows, risk areas,
            and decisions the team needs telemetry to support.
          </div>
        </div>
        <div class="card">
          <div class="card-label">During the workshop</div>
          <div class="card-body">
            Translate stakeholder questions into behaviors, task outcomes, friction signals,
            omissions, event definitions, and dashboard needs.
          </div>
        </div>
        <div class="card">
          <div class="card-label">After the workshop</div>
          <div class="card-body">
            Produce a tracking plan, implementation requirements, QA approach, dashboard plan,
            and adoption path for product and UX teams.
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```

---

# Add a First 90 Days Section

If one already exists, align it more directly to the JD.

## Suggested title

```text
First 90 days: making telemetry real without losing momentum
```

## Suggested structure

```html
<div class="first-90">
  <div class="first-90-label">First 90 days</div>
  <div class="first-90-list">
    <div class="first-90-item">
      <div class="first-90-item-label">Days 1–30 · Learn and map</div>
      <p>
        Understand Philips telemetry maturity, product-team needs, current tooling,
        privacy/legal pathways, and where UX, usability, product, and engineering already align or diverge.
      </p>
    </div>
    <div class="first-90-item">
      <div class="first-90-item-label">Days 31–60 · Pilot the cycle</div>
      <p>
        Select one or two product teams, run question-framing workshops, define telemetry questions,
        create tracking plans, and coordinate implementation requirements.
      </p>
    </div>
    <div class="first-90-item">
      <div class="first-90-item-label">Days 61–90 · Prove and package</div>
      <p>
        Deliver the first dashboard and insight readout, document the repeatable telemetry cycle,
        and identify what should become a reusable Center of Excellence playbook.
      </p>
    </div>
  </div>
</div>
```

---

# Tone Calibration

## Keep

- Confident senior IC tone.
- “Build for adoption, not delivery.”
- Instrumentation + methodology dual-positioning.
- Human judgment / AI workflow framing.
- “Question first” principle.

## Soften or avoid

Avoid implying:

```text
I already understand clinical workflows deeply.
```

Use instead:

```text
I know how to make workflow questions measurable, and I would partner with Philips clinical, usability, and product experts for domain interpretation.
```

Avoid:

```text
I will transform Philips telemetry.
```

Use:

```text
I can help product teams make UX telemetry practical, repeatable, and useful for decisions.
```

Avoid:

```text
AI will solve telemetry.
```

Use:

```text
AI-supported analysis is useful when the telemetry model, taxonomy, and human judgment gates are designed well.
```

---

# Suggested Microcopy Replacements

## Replace broad analytics language

Before:

```text
Analytics architect working across instrumentation and qualitative methodology.
```

After:

```text
Analytics architect focused on UX telemetry: question framing, behavior modeling, tracking plans, implementation coordination, dashboards, and adoption.
```

## Replace generic dashboards language

Before:

```text
Build dashboards that support insight generation.
```

After:

```text
Build dashboards that reveal task success, workflow friction, journey patterns, and behavioral evidence product teams can act on.
```

## Replace generic stakeholder language

Before:

```text
Align technical and non-technical stakeholders.
```

After:

```text
Translate between product, usability, design, engineering, architecture, and analytics so telemetry plans are both meaningful and buildable.
```

## Replace generic privacy language

Before:

```text
Privacy-aware instrumentation.
```

After:

```text
Consent and regulatory constraints are included in the tracking plan, data flow, QA path, and delivery timeline rather than handled as late-stage blockers.
```

---

# Case Evidence Recommendations

Use fewer cases than the main portfolio, but map them harder.

## Recommended flagship cases

### 1. SSLP Mobile Instrumentation

Use for:

- end-to-end telemetry
- tracking plans
- implementation coordination
- app/web telemetry
- consent-aware instrumentation
- product-team delivery

### 2. Mixed-Methods UX Research

Use for:

- UX question formulation
- usability / human factors affinity
- translating observed friction into measurement questions
- combining quant + qual

### 3. SSLP Enablement

Use for:

- adoption
- data literacy
- handoff
- dashboards becoming operational
- system surviving turnover

### 4. AI Alert Triage

Use for:

- AI-enabled telemetry opportunities
- human judgment gates
- advanced analytics affinity
- alert taxonomy / operational insight

### 5. Shadow IT Discovery

Use for:

- ambiguous environments
- workflow gaps
- observing what official systems miss
- question-first discovery

## Recommended case-card template

```html
<article class="case-card">
  <div class="case-card-head">
    <span class="case-card-meta">Case · UX telemetry cycle</span>
    <span class="case-card-context">Relevant to Philips: product-facing implementation</span>
  </div>

  <h3 class="case-card-title">
    <a href="../work/sslp-mobile.html">From “what should we measure?” to shipped telemetry.</a>
  </h3>

  <ul class="case-card-proof">
    <li><strong>Question:</strong> What product behaviors and journey friction needed to become visible?</li>
    <li><strong>Translated into:</strong> Event definitions, tracking plan, consent-aware implementation requirements, QA path.</li>
    <li><strong>Coordinated with:</strong> Product, engineering, analytics, and client stakeholders.</li>
    <li><strong>Output:</strong> Production telemetry and dashboards usable by the product team.</li>
    <li><strong>Philips relevance:</strong> Mirrors the full UX telemetry cycle: question → behavior → tracking → implementation → dashboard → adoption.</li>
  </ul>
</article>
```

---

# Advanced Analytics / AI Section

## Why

The JD mentions:

```text
Contribute to advanced analytics, predictive analytics, and AI-enabled telemetry use cases where these can strengthen product understanding and decision-making.
```

## Suggested section

```html
<section id="ai-telemetry">
  <div class="section-body">
    <div class="container">
      <p class="section-eyebrow">AI-enabled telemetry</p>
      <h2 class="section-heading">AI helps when the telemetry model is already thoughtful.</h2>
      <p class="section-sub">
        My approach to AI-enabled analytics is conservative by design: use AI to surface, group,
        summarize, and prioritize signals, while preserving human judgment for diagnosis and action.
      </p>

      <div class="callout">
        <div class="callout-label">Relevant case</div>
        <div class="callout-body">
          In the AI Alert Triage case, a production triage workflow compressed 230 alerts to 39 posts
          and surfaced one critical missed failure. The point was not to outsource thinking to AI;
          it was to design the right gates around where AI assists and where humans decide.
        </div>
      </div>
    </div>
  </div>
</section>
```

---

# Human Factors / Usability Signal

## Issue

The JD says:

```text
Strong affinity with Usability and Human Factors is a pre.
```

Make this visible.

## Suggested copy

```html
<div class="callout">
  <div class="callout-label">Usability and human factors affinity</div>
  <div class="callout-body">
    My strongest usability fit is at the measurement layer: task-based usability thinking,
    neutral questioning, Sense-Making Methodology, heuristic evaluation, and telemetry that
    distinguishes task completion, friction, omission, workaround, and recovery. I am not
    presenting myself as a clinical human-factors specialist; I am strongest as the partner
    who makes usability questions measurable and operational.
  </div>
</div>
```

This is honest, strategically useful, and avoids overclaiming.

---

# SEO / Sharing Checks for `/philips`

Before sharing the microsite:

## Check title

```html
<title>Philips UX Telemetry | Frederic Labadie</title>
```

## Check description

```html
<meta
  name="description"
  content="Targeted Philips microsite showing end-to-end UX telemetry work: question framing, behavior modeling, tracking plans, implementation coordination, dashboards, privacy-aware delivery, and adoption."
/>
```

## Check robots

Use when ready to share publicly:

```html
<meta name="robots" content="index, follow" />
```

Or omit entirely.

If you do not want it indexed but still want it shareable by direct link, choose intentionally and document that choice.

---

# Accessibility / Usability Checks

Because the role is inside a Usability Center of Excellence, the microsite itself should visibly respect usability basics.

## Must-check items

- `<html lang="en">`
- One clear `<h1>`
- Logical heading order
- Skip link works
- Links make sense out of context
- Keyboard navigation works
- Focus states visible
- Mobile nav works with keyboard
- Escape closes mobile nav
- Touch targets are large enough
- No horizontal scrolling at 320px
- Repeated navigation is consistent
- Print view is readable
- Dark callouts print legibly

## Add mobile nav Escape support if missing

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

# Contact Section Rewrite

## Suggested contact copy

```html
<section id="contact">
  <div class="section-body">
    <div class="container">
      <p class="section-eyebrow">Contact</p>
      <h2 class="section-heading">Happy to discuss how I would make UX telemetry practical inside Philips.</h2>
      <p class="contact-body">
        Amsterdam-based, EU work authorization, hybrid-friendly, and selectively open to senior IC
        roles where UX telemetry, analytics architecture, product decision-making, and usability
        evidence overlap. Currently full-time at Telus Digital; standard notice applies.
      </p>
    </div>
  </div>
</section>
```

---

# Footer Rewrite

If the microsite footer mentions plain HTML and CSS, frame it as intentional.

```text
Built intentionally in plain HTML & CSS · GitHub Pages · fast, portable, durable
```

---

# CSS Additions

These are reusable from the main portfolio handoff, adapted for the Philips microsite.

## Proof strip

```css
.proof-strip {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  border-top: 1px solid var(--c-rule);
  border-left: 1px solid var(--c-rule);
  margin-top: 32px;
  list-style: none;
  padding: 0;
}

.proof-strip li,
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

## Case proof list

```css
.case-card-proof {
  list-style: none;
  padding: 0;
  margin: 16px 0 0;
  display: grid;
  gap: 10px;
}

.case-card-proof li {
  font-size: 15.5px;
  line-height: 1.55;
  color: var(--c-ink);
  padding-bottom: 10px;
  border-bottom: 1px solid var(--c-rule-light);
}

.case-card-proof li:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.case-card-proof strong {
  color: var(--c-accent);
  font-weight: 600;
}
```

## Compact role fit callout

```css
.role-fit-callout {
  border-left: 2px solid var(--c-accent);
  background: var(--c-bg-alt);
  padding: 18px 22px;
  margin: 28px 0 32px;
  max-width: 78ch;
}

.role-fit-callout-label {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--c-accent);
  margin-bottom: 8px;
}

.role-fit-callout-body {
  font-size: 15.5px;
  line-height: 1.6;
  color: var(--c-ink);
}
```

---

# Implementation Order for Claude Code

## Phase 1: Verify current repository state

The `/philips/index.html` file has already been inspected once and contains the expected targeted microsite. Before editing, Claude Code should still inspect the latest repo state because the file may have changed.

1. Inspect all files under `/philips`.
2. Confirm whether `/philips/work/`, `/philips/about/`, and `/philips/contact/` are complete and targeted.
3. Confirm CSS dependency: the page currently appears to use shared `/css/style.css`.
4. Preserve existing sections unless there is a clear reason to remove them:
   - hero
   - fit map
   - case studies
   - clinical domain
   - close / first 90 days
   - contact
5. Prefer targeted refinements over a full rebuild.

## Phase 2: Public-readiness fixes

1. Check and update `<title>`.
2. Check and update meta description.
3. Decide whether `robots` should be `index, follow` or intentionally omitted/noindexed.
4. Confirm links to case studies resolve correctly from `/philips`.
5. Confirm email and contact links work.
6. Normalize “currently FTE” to “currently full-time.”
7. Normalize email casing to lowercase if shown.

## Phase 3: Hero and top-of-page conversion

1. Replace or tighten hero with explicit UX telemetry language.
2. Add telemetry-specific proof strip.
3. Add short “Why this role fits” paragraph.
4. Add or revise role-specific reader path if needed.

## Phase 4: JD fit grid

1. Update fit grid to mirror Philips JD language.
2. Ensure each row maps:
   - JD need
   - delivery behavior
   - evidence link
3. Add missing rows for:
   - workshop facilitation
   - privacy/legal/regulatory/consent
   - AI-enabled telemetry
   - usability/human factors affinity
   - adoption/data literacy
   - clinical-context calibration

## Phase 5: Case evidence

1. Put the strongest full-cycle telemetry case first.
2. Standardize case cards using:
   - Question
   - Behavior model
   - Built
   - Adoption
   - Outcome
   - Philips relevance
3. Reduce case count if the page feels too broad.
4. Preserve links to deeper case pages.

## Phase 6: Philips-specific sections

1. Add or strengthen Telemetry Delivery Cycle section.
2. Add or strengthen Workshop Facilitation section.
3. Add or strengthen Privacy / Regulatory Delivery block.
4. Add or strengthen Clinical Context Calibration block.
5. Add or strengthen First 90 Days section.
6. Add or strengthen AI-enabled Telemetry section.
7. Add or strengthen Human Factors / Usability affinity block.

## Phase 7: Usability and accessibility

1. Check heading hierarchy.
2. Check keyboard navigation.
3. Check focus states.
4. Add Escape support to mobile nav if missing.
5. Check 320px mobile reflow.
6. Check print preview.
7. Confirm dark blocks print legibly.

---

# Specific File-Verified Edit List for `/philips/index.html`

## Header / metadata

- Change title from “pitch” language to “role fit” language if desired.
- Update meta description to remove “Adoption & Insights” if that is no longer the exact JD framing.
- Decide whether `noindex, nofollow` is intentional.
- Keep OG/Twitter metadata targeted to Philips UX Telemetry.

## Nav

- Consider changing visible nav-brand role from:

```text
Philips · UX Telemetry Expert pitch
```

to:

```text
Philips · UX Telemetry Expert role fit
```

- If `/philips/work/`, `/philips/about/`, and `/philips/contact/` are complete, keep them.
- If they are thin or duplicative, use in-page anchors instead.

## Hero

- Keep the core claim about the full telemetry cycle.
- Shorten the first paragraph if possible.
- Add proof strip.
- Consider changing “That's exactly the shape of the work I do” to a slightly more grounded phrase:

```text
That is the shape of the work I have delivered across enterprise telemetry, instrumentation, dashboarding, and adoption engagements.
```

## Fit map

The fit map is strong. Add or tighten rows for:

- Workshop facilitation as a separate row, not only inside question formulation.
- Data literacy / adoption as an explicit measurable outcome.
- Cross-portfolio delivery / reusable telemetry pattern.
- Human Factors affinity with careful wording.
- Privacy/legal/regulatory as delivery planning, not compliance theater.

## Case cards

Current case mapping is relevant. Make scanability stronger by adding structured mini-labels:

```text
Question:
Translated into:
Delivered:
Philips relevance:
```

or

```text
Problem:
Telemetry move:
Outcome:
Role relevance:
```

## Clinical Domain

- Preserve the section.
- Shorten the disclaimer.
- Keep Completion / Omission / Workaround.
- Replace “IEC62366” with “IEC 62366” for readability if used.
- Avoid too many named standards unless the phrasing makes clear they are learning areas, not claimed expertise.

## First 90 Days

Current structure is good: Listen / Map / Land one. Add concrete outputs:

- Days 1–30 output: question map, stakeholder map, telemetry maturity scan.
- Days 31–60 output: pilot tracking plan, governance-gap list, dashboard inventory.
- Days 61–90 output: one shipped telemetry cycle, readout, repeatable CoE playbook draft.

## Contact

- The line “I can build a clinical-specific question-formulation example” is good.
- Consider making it even more direct:

```text
I can also prepare a short Philips-style UX telemetry workshop example if useful for the next step.
```

## Footer

- Replace “Targeted pitch” with “Targeted role fit” if making the tone less applicant-centered.
- Frame “plain HTML & CSS” as intentional durability if desired.


# Final Pre-Share Checklist

| Area | Check |
|---|---|
| Hero | Says UX telemetry clearly in first screenful |
| JD fit | Every major JD requirement has mapped evidence |
| Workshop facilitation | Visible, not buried |
| Tracking plans | Explicitly mentioned |
| Dashboards | Framed around task success, workflows, friction, journeys |
| Adoption | Clearly shows enablement and data literacy |
| AI | Positioned as human-gated support, not magic |
| Privacy/regulatory | Included as delivery planning, not generic compliance |
| Clinical context | Honest transfer framing; no overclaiming |
| Human factors | Affinity shown through usability methods and measurement layer |
| Amsterdam | Location, EU authorization, hybrid fit clear |
| Tone | Confident but not overclaiming |
| Mobile | No horizontal scrolling; nav usable |
| Accessibility | Keyboard/focus/headings/link purpose checked |
| SEO | Title/description/robots intentional |
| Links | All relative links from `/philips` work |
| Print | Page prints as a readable handoff document |

---

# Summary Guidance for Claude Code

Do not turn the Philips microsite into a generic job-application page. It should feel like a precise, role-specific extension of the portfolio.

The key editorial rule:

```text
Philips is not hiring generic analytics.
Philips is hiring someone who can make UX telemetry practical inside product teams.
```

Use that rule to decide every edit.

Preferred page behavior:

```text
First 30 seconds: “This is a UX telemetry fit.”
First 3 minutes: “He has done the cycle before.”
Deep read: “The judgment is real, and he understands the adoption/privacy/usability context.”
```

Keep the intellectual identity, but make the evidence path unmistakable.
