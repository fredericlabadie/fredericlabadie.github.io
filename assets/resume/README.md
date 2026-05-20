# Resume / CV

## Source of truth

The maintained, version-controlled resume lives in this folder. Two formats are kept in sync:

- `frederic-labadie-cv.md` &mdash; the markdown source, easiest to edit
- `frederic-labadie-cv.html` &mdash; styled, print-ready HTML version (mirrors the `.md` content and uses the site's design system)

Edit the markdown when anything changes &mdash; new role, new cert, new metric &mdash; then mirror the change into the HTML and re-export the PDF.

## PDF export workflow

The site's "Download CV" links point at:

```
/assets/resume/frederic-labadie-cv.pdf
```

Drop the exported PDF in this folder using that exact filename.

**Easiest route &mdash; browser print of the bundled HTML version (no toolchain needed):**

1. Open `frederic-labadie-cv.html` in any browser (double-click the file, or serve the repo locally).
2. `Cmd+P` &rarr; Destination: **Save as PDF** &rarr; Layout: Portrait, Paper size: A4, Margins: **None** (the HTML has its own `@page` margins), Scale: 100%, Headers and footers: **Off**, Background graphics: **On**.
3. Save as `frederic-labadie-cv.pdf` in this folder.

The HTML mirrors the markdown source and uses the same design system as the site (IBM Plex on white, slate + crimson hairlines). Output should fit on 2 A4 pages.

**Alternative routes:**

- **Pandoc + LaTeX** (best typographic control, requires the toolchain):
  ```
  pandoc frederic-labadie-cv.md -o frederic-labadie-cv.pdf \
    --pdf-engine=xelatex \
    -V geometry:margin=1.6cm \
    -V mainfont="IBM Plex Sans" \
    -V monofont="IBM Plex Mono" \
    -V fontsize=10pt \
    -V colorlinks=true \
    -V linkcolor=NavyBlue
  ```
- **VS Code Markdown PDF extension** or **Typora / Obsidian export**: also fine. Aim for a 2-page output.

Keep the file size reasonable (under 1&nbsp;MB).

## When the filename changes

If you change `frederic-labadie-cv.pdf` to anything else, update the `href` in:

- `index.html` &mdash; hero actions, stack-CTA, and contact-list (three references)
- `about/index.html` &mdash; contact-list
- `work/index.html` &mdash; about-preview / deeper-body
- `philips.html` &mdash; hero actions and the dedicated CV row in the contact-list

## Sync to external master CV

The markdown here is the **public, anonymised, targeted** version of the CV &mdash; reflects the portfolio's positioning (analytics architect / product analytics / UX telemetry) and ships with the site.

The **master / source CV** maintained by the knowledge-base agent is a separate document with full client names, salary benchmarks, references, and the gap-response scripts. When this file changes, sync the deltas back to that master so the two don't drift.

Last sync: 19 May 2026 &mdash; reflects all updates from the design system rebuild and the AI alert case production data.
