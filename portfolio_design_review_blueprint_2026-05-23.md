# Portfolio Design Review: Blueprint Handoff vs Current Site

Date: 23 May 2026

## Sources Reviewed

- Existing site repo: `C:\Users\frede\Documents\GitHub\fredericlabadie.github.io`
- Current homepage: `index.html`
- Current shared styles: `css/style.css`
- Current recruiter page: `recruiters/index.html`
- Current contact page: `contact/index.html`
- Current robots policy: `robots.txt`
- Updated design handoff: `C:\Users\frede\Downloads\Portfolio site (1).zip`
- Design handoff files reviewed:
  - `design_handoff_portfolio_blueprint/README.md`
  - `design_handoff_portfolio_blueprint/src/audit.jsx`
  - `design_handoff_portfolio_blueprint/src/home-dashboard.jsx`
  - `design_handoff_portfolio_blueprint/src/page-work.jsx`
  - `design_handoff_portfolio_blueprint/src/page-case.jsx`
  - `design_handoff_portfolio_blueprint/src/page-about.jsx`
  - `design_handoff_portfolio_blueprint/src/page-recruiters.jsx`

## Executive Summary

The Blueprint direction is a meaningful improvement over the current Anchor / Query site. The current site is credible, restrained, and clear, but it can feel flat because many sections use the same rhythm: mono label, large headline, explanatory paragraph, bordered card. The Blueprint handoff gives the portfolio a stronger visual argument: it turns the site into something closer to an analyst's working dossier, with status panels, receipt tiles, case-specific figures, and sharper hierarchy.

The strongest part of the new design is not just the palette or typography. It is the change in proof strategy. The current site tells readers that the work bridges instrumentation and qualitative method. The Blueprint design shows that by pairing each case with a visual form that matches the work: a discovery chain for Shadow IT, a pseudo-query result for SSLP adoption, and a mixed-methods convergence diagram for Stanley Steemer. That is a better portfolio move.

The main risk is reality drift. The design sometimes borrows the visual language of live systems: "auto-updated 14:02 CET", "Now / live", and "last edit / 23 May 2026 / 14:02 CET". Those are only appropriate if the site actually updates them. Otherwise, they risk making a truthful portfolio feel staged. The redesign should keep the monitor/dossier feeling, but use manually maintainable language.

## What Improved

### Stronger hierarchy

The current site uses a disciplined white canvas, slate primary, crimson accent, IBM Plex Sans, IBM Plex Mono, sharp cards, and section strips. It is professional, but the visual hierarchy often treats very different content types similarly.

Blueprint improves this by introducing:

- A pale blue-gray "engineering paper" canvas.
- Deep navy panels for status, code-like proof, and footer areas.
- Serif display type for editorial weight.
- Mono metadata for instrument labels and section markers.
- Receipt tiles that pull the eye toward evidence first.

This makes the portfolio feel more designed around the user's actual work: analytics architecture, research framing, and decision support.

### Better proof framing

The current homepage includes strong claims, including:

- Hospital Readmissions dbt in progress, target 30 May 2026.
- AI Alert Triage V1 shipped in April 2026.
- 230 alerts to 39 posts, 83% reduction.
- 38 analyst hours recovered per month.
- Approximately 50% BigQuery pipeline cost reduction.
- 11 Amplitude credentials.

Blueprint turns these into scannable proof blocks instead of burying them in paragraphs or repeated case cards. That is a real improvement for recruiters and hiring managers, because it lets them read the portfolio as evidence rather than as an essay.

### Better homepage focus

The current homepage has one of its strongest signals in a small line:

`Now building Hospital Readmissions dbt (target 30 May 2026) / last shipped AI Alert Triage V1 (Apr 2026)`

Blueprint correctly promotes this idea into a "Now" panel. That gives the site momentum and makes Frederic look active, current, and shipping. This is stronger than leading only with the abstract "say/do" thesis.

The recommended version should keep the idea, but not use fake automation language. A better label would be:

- `Current status`
- `Updated 23 May 2026`
- `In flight`
- `Last shipped`
- `On bench`

### Better case differentiation

The current selected-work section has strong case writing, but the cards are visually similar. Blueprint improves this by making each case look like the kind of problem it solved:

- Shadow IT becomes a discovery-chain diagram, which is appropriate because the value was noticing and investigating an anomaly, not publishing a clean quantitative chart.
- SSLP enablement becomes a query/result panel, which fits the analytics infrastructure and adoption story.
- Stanley Steemer mixed-methods becomes a two-stream convergence diagram, which fits the quant-plus-qual methodology story.

This is one of the best ideas in the handoff. It makes the site more memorable and reduces the "same card, different paragraph" effect.

### Better recruiter utility

The existing recruiter page is already useful: it states location, work authorisation, availability, role fit, languages, compensation posture, years of experience, and reply time. Blueprint pushes this further by making role fit and evidence easier to scan.

The redesign should preserve the practical recruiter content while reducing repeated thesis language. At the point someone reaches contact or recruiter triage, they need role fit, constraints, proof, and next action more than another philosophical restatement.

## What May Have Drifted Too Far From Reality

### Fake-live language

The design handoff uses phrases like:

- `auto-updated 14:02 CET`
- `Now / live`
- `last edit / 23 May 2026 / 14:02 CET`

These should not ship unless the site actually has an automatic update mechanism. The portfolio is a plain static HTML/CSS GitHub Pages site, so the safer move is to write this as an editorial status panel, not a live monitor.

Recommended replacement:

- `Current status`
- `Updated 23 May 2026`
- `In flight`
- `Last shipped`
- `On bench`

### Hospital Readmissions target date

The current site says Hospital Readmissions dbt has a target date of 30 May 2026. That is fine as of this report date, 23 May 2026, but it becomes stale quickly.

Before implementing the Blueprint homepage, decide what the status should say after 30 May 2026:

- If shipped: change to `Last shipped` or add it to `/work/`.
- If still in progress: update the date and explain the current milestone.
- If paused: move it to `On bench`.

Do not leave an expired target date in the hero.

### Chart-like visuals must avoid invented data

The handoff is careful in one important place: the Shadow IT figure explicitly avoids inventing a chart and instead shows the discovery sequence. That should be preserved.

The risk is that the design language makes everything feel measurable, even where the underlying evidence is qualitative, anonymised, or NDA-limited. Where exact source data cannot be shown, use:

- Process diagrams.
- Architecture diagrams.
- Before/after workflow diagrams.
- Generalised metrics with clear wording.
- Footnotes explaining anonymisation.

Avoid synthetic line charts unless the numbers are real and defensible.

### "Field notes" vs "Current Meditations"

The handoff suggests renaming `Current Meditations` to `Field notes`. "Field notes" is probably clearer and more professional. It sounds less precious and more connected to research practice.

However, this changes navigation language across the site. If implemented, update it consistently in:

- Main nav.
- Notebook page title.
- Meta title and description.
- Any internal links.
- README documentation.

This is a good change, but it should be treated as a deliberate content rename, not a casual label swap.

### Search indexing policy

The portfolio currently has:

- `robots.txt` with `Disallow: /`
- Page-level `noindex, nofollow` metadata across the site

This matches the current policy that only the SMM site should be available from search. The Blueprint redesign should preserve noindex behavior unless that policy changes later.

Do not accidentally remove the noindex tags while porting the new head markup.

### Availability and language claims

The current site is appropriately conservative:

- Based in Amsterdam.
- EU work authorisation.
- Currently full-time at Telus Digital.
- Standard notice applies.
- Dutch A2.

Keep those claims conservative. Avoid upgrading language, availability, or work status unless Frederic explicitly confirms the change. The design can make these easier to scan, but it should not make them sound stronger than they are.

### Role positioning may become too broad

The recruiter page currently lists several role shapes. Blueprint emphasizes role fit, which is useful, but there is a risk of presenting too many roles as equally strong:

- Analytics Architect
- Senior Product Analyst
- Analytics Engineer
- UX Telemetry Lead
- Marketing Analytics Lead

That breadth is true to the background, but recruiters may need a clearer hierarchy. Recommended ordering:

1. Analytics Architect
2. Senior Product / Digital Analytics
3. Analytics Engineering
4. UX Telemetry / Research Measurement
5. Marketing Analytics / Lifecycle Analytics

Use `best fit`, `strong fit`, and `adjacent fit` instead of marking every role as strongest match.

## Recommended Adoption Path

### Adopt the Blueprint visual system

The overall design direction is worth adopting:

- Pale blue-gray canvas.
- Deep navy panels.
- Brick-red signal color.
- Serif editorial headings.
- Mono metadata.
- No shadows.
- Sharp borders.
- Dotted grid background.
- Receipt tiles.
- Case-specific figures.

It better matches the professional identity: analytical, rigorous, research-aware, and built around evidence.

### Keep the static architecture

The handoff itself says the JSX files are design references, not production code. Keep the current stack:

- Plain HTML.
- Shared CSS in `css/style.css`.
- Small JavaScript only where needed for navigation or lightweight interactions.
- GitHub Pages hosting.
- No React migration.
- No build step.

This keeps the site simple, portable, and easy to audit.

### Port selectively, not literally

Do not copy the JSX directly. Treat it as a visual and content blueprint.

Recommended implementation order:

1. Add Blueprint tokens and base typography to CSS.
2. Convert the nav/footer shell.
3. Rebuild the homepage sections.
4. Rebuild `/work/` index with lens rows and receipt strip.
5. Create one redesigned case template using AI Alert Triage.
6. Apply the case template to the remaining cases in batches.
7. Update `/about/`, `/recruiters/`, and `/contact/`.
8. Preserve noindex and analytics consent behavior.

### Replace fake-live wording

Keep the status panel, but make it editorial:

- Use `Current status`, not `Now / live`.
- Use `Updated 23 May 2026`, not `auto-updated 14:02 CET`.
- Only include times if someone will manually maintain them.

This keeps the energy of the design without implying automation that does not exist.

### Preserve search privacy

The redesign must keep:

- `robots.txt` disallowing `/`
- `meta name="robots" content="noindex, nofollow"`

The only site intended for search indexing is the SMM site, not the portfolio.

## Highest-Priority Fixes Before Implementation

- Remove or rewrite all fake-live labels.
- Decide the post-30 May 2026 wording for Hospital Readmissions.
- Decide whether `Current Meditations` becomes `Field notes`.
- Keep Dutch at A2 unless updated by Frederic.
- Keep current employment/notice wording unless updated by Frederic.
- Re-rank role fit so one or two roles clearly lead.
- Preserve noindex and robots policy.
- Ensure all metrics shown in visual tiles map to existing case claims.
- Use process diagrams where data is confidential or unavailable.
- Keep the site static and GitHub Pages compatible.

## Bottom Line

Blueprint is a strong direction. It improves hierarchy, proof density, recruiter usefulness, and case memorability. The design should be adopted, but with a reality pass before implementation.

The implementation principle should be:

> Make it feel like an instrument panel, but tell the truth like a static portfolio.
