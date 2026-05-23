# Fix Progress — Portfolio Review 2026-05-23

Status key: ✅ Done | 🔄 In progress | ⬜ Not started | ⏭ Skipped/deferred

---

## A — Broken links

| ID  | Task                                                             | Status |
| --- | ---------------------------------------------------------------- | ------ |
| A1  | `work/ai-alert-triage.html` nav: `../notebook/` → `../thoughts/` | ✅     |
| A1  | `work/pipeline-optimization.html` nav: same                      | ✅     |
| A1  | `work/sslp-enablement.html` nav: same                            | ✅     |

## B — Analytics fixes (js/analytics.js)

| ID  | Task                                                                                                          | Status |
| --- | ------------------------------------------------------------------------------------------------------------- | ------ |
| B1a | `landingSection()`: `/notebook` → `/thoughts`                                                                 | ✅     |
| B1b | `visitorIntent()`: `/notebook` → `/thoughts`                                                                  | ✅     |
| B1c | `attachNotebookTracking()`: path check + property names (`TopicId`→`TopicLabel`)                              | ✅     |
| B1d | `attachNotebookSectionTracking()`: path check + property names (`SectionId`→`SectionLabel`, add `TopicLabel`) | ✅     |
| B2  | `attachLensTracking()`: selector `.case-toc-item a` → `a.bp-lens-card`                                        | ✅     |
| B3  | `ResumeVersion: "2025"` → `"2026"`                                                                            | ✅     |
| B4  | `/philips/` path references: add clarifying comment                                                           | ✅     |

## C — Nav capitalisation

| ID  | Task                                                                                  | Status      |
| --- | ------------------------------------------------------------------------------------- | ----------- |
| C1  | All non-home pages: `/ Current Meditations` → `/ current meditations` in `<nav>` only | ✅ 20 files |

## D — Stale content

| ID  | Task                                                         | Status                       |
| --- | ------------------------------------------------------------ | ---------------------------- |
| D1  | Hospital Readmissions status panel: update after 30 May 2026 | ⏭ deferred — action ~31 May |

## E — Readability

| ID  | Task                                                                               | Status |
| --- | ---------------------------------------------------------------------------------- | ------ |
| E1  | Homepage headline: add em-dash before "that is the measurement problem"            | ✅     |
| E2  | `work/index.html` `<h1>`: "Fourteen years" → "14 years"                            | ✅     |
| E3  | `work/index.html` `bp-work-note`: add lens-numbering framing sentence              | ✅     |
| E4  | `thoughts/index.html` panel: replace Route/Nav title rows with Entries/Last posted | ✅     |
| E5  | `contact/index.html` panel: shorten "Other invitations" to avoid duplication       | ✅     |

## F — Housekeeping

| ID  | Task                                                                | Status |
| --- | ------------------------------------------------------------------- | ------ |
| F1  | `notebook/index.html`: remove stale `class="eyebrow"`               | ✅     |
| F2  | Homepage footer: align with other pages (or update others to match) | ✅     |

---

## Session checkpoint

**ALL ITEMS COMPLETE** (D1 deferred by design — action ~31 May 2026)

Files changed:

- `work/ai-alert-triage.html` — nav link
- `work/pipeline-optimization.html` — nav link
- `work/sslp-enablement.html` — nav link
- `js/analytics.js` — B1a–B4: path checks, property names, selector, version, comments
- 20 HTML files — C1: nav capitalisation (Python bulk replace)
- `index.html` — E1 headline, F2 footer
- `work/index.html` — E2 h1, E3 lens framing
- `thoughts/index.html` — E4 panel rows
- `contact/index.html` — E5 panel copy
- `notebook/index.html` — F1 stale class
