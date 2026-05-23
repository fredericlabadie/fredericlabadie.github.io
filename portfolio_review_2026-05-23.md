# Portfolio Review — Readability, Consistency & Gaps

**Date:** 2026-05-23  
**Scope:** All live pages post-Blueprint migration + analytics instrumentation  
**Not in scope:** CSS / visual design, Philips sub-site

---

## Quick summary

The Blueprint migration landed well. The structure, proof framing, and copy voice are solid. What follows is a prioritised list of fixable issues — three broken nav links, five analytics tracking gaps (all silently broken), one site-wide nav capitalisation inconsistency, and a handful of readability and stale-content items.

Issues are grouped by effort and impact.

---

## A — Broken links (fix immediately)

### A1 — Three case study navs still point to `/notebook/` instead of `/thoughts/`

The redirect at `/notebook/` catches these, so visitors don't 404, but it's an unnecessary bounce and creates a redirect chain when analytics tries to resolve the path.

**Files affected:**

- `work/ai-alert-triage.html` — line 44
- `work/pipeline-optimization.html` — line 44
- `work/sslp-enablement.html` — line 44

**Change:** `href="../notebook/"` → `href="../thoughts/"` in all three.

All other case studies and all top-level pages already use `../thoughts/` or `/thoughts/` correctly.

---

## B — Analytics: silently broken tracking

`analytics.js` is a well-structured ESM module and the amplitude + Cookiebot consent wiring is correct. These are stale path/selector references from before the migration, not structural problems.

### B1 — Notebook/thoughts tracking never fires

`attachNotebookTracking()` and `attachNotebookSectionTracking()` gate on `path().includes("/notebook")`. The page now lives at `/thoughts/`. Both functions exit early on every visit to Current Meditations and fire nothing.

**Fix:** Replace `/notebook` path checks in both functions (and the `landingSection()`/`visitorIntent()` helpers) with `/thoughts`.

**Lines affected in `js/analytics.js`:**

- `landingSection()` — line 35: `if (p.includes("/notebook")) return "notebook";`
- `visitorIntent()` — line 46: `if (path().includes("/notebook")) return "content";`
- `attachNotebookTracking()` — line 219: `const isNotebook = path().includes("/notebook");`
- `attachNotebookSectionTracking()` — line 235: `if (!path().includes("/notebook")) return;`

Also update the `notebookTopicOpened` / `notebookSectionReached` events to use `TopicLabel` / `SectionLabel` property names — that's what the handoff doc specifies, but the implementation uses `TopicId` / `SectionId` instead. Not a functional break but creates a schema mismatch versus the documented event plan.

### B2 — `portfolioLensSelected` never fires

`attachLensTracking()` listens for clicks on `.case-toc-item a`. That class does not exist in the Blueprint work page. The lens index uses `.bp-lens-card` anchor elements.

**Fix:** Change the selector to `a.bp-lens-card` and derive `LensName` from the card's `h2` text content rather than the href.

### B3 — `ResumeVersion` is hardcoded to `"2025"`

`resumeDownloaded` event has `ResumeVersion: "2025"` on line 289. Should be `"2026"` or — better — derived from a constant at the top of the file so it doesn't need to be found and changed in the middle of an event payload next year.

### B4 — `/philips/` path references are dead code

`analytics.js` references `/philips/` paths in four places (lines 119, 135, 179, 189, 196) — `caseStudyOpened`, `caseStudyCompleted`, `caseLibraryContinued`. The Philips sub-site directory still exists in the repo but is not linked from the main navigation. If those pages are not actively maintained or surfaced, the `/philips/` branch of these conditions is never reached and can be removed to reduce confusion when reading the file later.

If the Philips sub-site is intentionally kept as a direct-link-only page, the path references should stay — but document that intent in a comment.

---

## C — Navigation consistency

### C1 — "Current Meditations" is Title Case on pages where all other nav items are lowercase

Every non-home page uses lowercase nav labels: `/ home`, `/ work`, `/ about`, `/ recruiters`, `/ contact`. "Current Meditations" is consistently Title Case on all of these pages and stands out as the only exception.

The homepage nav is all Title Case (`/ Work`, `/ About`, etc.) so "Current Meditations" fits there. On every other page it breaks the lowercase pattern.

**Options:**

1. Change to `/ current meditations` on non-home pages (matches the lowercase pattern, small readability loss since the name is a proper phrase).
2. Accept it as a deliberate proper noun exception and leave it. This is defensible — "Current Meditations" functions as a title, not a section label.

Either is fine; the current state is just inconsistent by accident rather than by design.

---

## D — Stale content (time-sensitive)

### D1 — Hospital Readmissions "In flight" item expires ~30 May 2026

The homepage status panel shows the Hospital Readmissions dbt project with "Status: active build." The prior design review flagged 30 May 2026 as the target date. That's 7 days from today.

No action needed this week. But set a reminder: after 30 May, update the "In flight" item to either "Last shipped" (if it completed) or update the description if the timeline slipped. The current "In flight / Last shipped / On bench" structure requires the items to be manually rotated — this one is next in the queue.

---

## E — Readability

### E1 — Homepage headline comma splice

> "Where users _say_ meets what they actually do, that is the measurement problem."

The comma splice is a rhetorical choice, but reads slightly rushed. The em-dash version lands cleaner without changing the voice:

> "Where users _say_ meets what they actually do — that is the measurement problem."

Low priority. Leave it if the splice is intentional.

### E2 — "Fourteen years" vs "14 years" across the site

Both forms appear within pages that visitors read consecutively:

| Location            | Form                                      |
| ------------------- | ----------------------------------------- |
| Homepage hero       | "14 years in"                             |
| Homepage tags       | "14 yrs analytics"                        |
| Work page `<h1>`    | "Fourteen years of engagements"           |
| Work stat strip     | "14 yrs"                                  |
| About `<h2>` in bio | "Fourteen years across analytics systems" |
| Recruiters hero     | "fourteen years in"                       |

Neither form is wrong, but the mix makes it look like the pages were written separately without a shared voice pass. A simple rule: use the numeral form ("14 years") in data/tag contexts and the spelled-out form in prose. What's currently there is mostly already following that pattern — the Work page `<h1>` is the most visible mismatch since it sits beside the stat strip that says "14 yrs".

### E3 — Work page lens index: non-sequential numbering needs one line of framing

The lens cards display in impact order (04, 07, 02, 05, 06, 03, 01), not taxonomy order. The "ordered by impact" tag in the section strip is small. A first-time visitor looking at "Lens 04" as the first card may assume the other lenses are simply lower-numbered and scrolled past.

The `bp-work-note` section already explains the page structure. One sentence addition there would close the gap:

> "Lens numbers reflect the problem taxonomy, not the display order. The page leads with the highest-impact evidence."

### E4 — Thoughts panel contains internal documentation, not content

The `bp-thoughts-panel` on `thoughts/index.html` has two rows that read as developer notes rather than visitor-useful information:

- `Route: /thoughts/`
- `Nav title: Current Meditations`

Every other panel on the site (About, Contact, Recruiters, Case files) presents role-relevant facts — current status, availability, what to send. These two rows describe the page's own URL and nav label, which a visitor already knows from having navigated there.

**Suggested replacements:**

- `Route` → `Entries` (count: 5 currently)
- `Nav title` → `Last posted` (date of most recent entry: 15 May 2026)

### E5 — Contact page repeats "other invitations" copy almost verbatim

The panel row ("Other invitations: Speaking, podcast, or workshop invitations on instrumentation, AI-assisted analytics workflows, or Sense-Making methodology") and the fit-aside section ("Also: speaking, podcast, or workshop invitations on instrumentation paired with qualitative methodology, AI-assisted analytics workflows, or how Sense-Making methodology changes question design in measurement") cover the same ground, one sentence apart on the page.

The panel row is a summary; the fit-aside is the full version. That structure works — but the panel row is so close in wording to the aside that it feels like duplication rather than a summary. Consider shortening the panel row to just: `Speaking / podcast / workshop: yes.` and leave the full framing to the aside.

---

## F — Minor / housekeeping

### F1 — Redirect page uses stale CSS class

`notebook/index.html` contains `<p class="eyebrow">Moved</p>`. The class `eyebrow` does not exist in the Blueprint CSS (it was from the pre-Blueprint stylesheet). The redirect fires immediately (meta refresh, 0 seconds) so no visitor sees this rendered — but it's dead markup worth cleaning if the redirect page is ever touched.

### F2 — Footer copy on homepage differs from all other pages

Homepage footer: `Built in plain HTML / GitHub Pages / noindex by design`  
All other footers: `Plain HTML + CSS / GitHub Pages`

The homepage version is more informative (the "noindex by design" note is useful context). Consider applying it to all footers or accepting the difference as intentional homepage differentiation.

---

## Summary table

| ID  | Category                                          | Severity | Fix effort       |
| --- | ------------------------------------------------- | -------- | ---------------- |
| A1  | Broken nav link (3 files)                         | High     | 5 min            |
| B1  | Analytics: `/notebook` path → `/thoughts`         | High     | 15 min           |
| B2  | Analytics: wrong selector for lens tracking       | Medium   | 10 min           |
| B3  | Analytics: `ResumeVersion: "2025"`                | Low      | 2 min            |
| B4  | Analytics: dead `/philips/` path references       | Low      | 10 min           |
| C1  | Nav capitalisation inconsistency                  | Low      | 5 min            |
| D1  | Hospital Readmissions item expires ~30 May        | Medium   | Action next week |
| E1  | Headline comma splice                             | Low      | 1 min            |
| E2  | "fourteen" / "14" mixed across pages              | Low      | 15 min           |
| E3  | Lens index non-sequential framing                 | Low      | 5 min            |
| E4  | Thoughts panel: developer notes visible to users  | Low      | 5 min            |
| E5  | Contact page: duplicated "other invitations" copy | Low      | 5 min            |
| F1  | Redirect page stale CSS class                     | Cosmetic | 2 min            |
| F2  | Homepage footer differs from all others           | Cosmetic | 5 min            |

**Recommended order:** A1 → B1 → B2 → D1 (calendar reminder) → everything else.
