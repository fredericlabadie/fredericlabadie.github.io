---
title: CV Build Process — Frederic Labadie
type: procedure
slug: cv-build-process
tags: [career, job-search, portfolio, automation]
created: 2026-05-24
updated: 2026-05-24
---

# CV Build Process

Procedure for generating tailored, two-page PDF CVs and cover letters matching
the established design system. Executable in Claude Code or any environment with
Python 3, ReportLab, Pillow, and Node.js available.

---

## Environment requirements

```
python3
pip install reportlab pillow pypdf --break-system-packages
npm install docx                          # for cover letters
apt-get install libreoffice-headless      # for DOCX → PDF conversion
```

Font available at runtime:
```
/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf
/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf
/usr/share/fonts/truetype/dejavu/DejaVuSans-Oblique.ttf
```

IBM Plex Sans is **not** available as TTF in this environment (Google Fonts serves
woff2 only; npm @ibm/plex contains no TTF). Use DejaVu Sans throughout.

---

## Source files

| File | Purpose |
|------|---------|
| `Frederic_Labadie_Resume_photo.jpg` | Original 812×616px landscape photo |
| `Frederic_Labadie_MASTER_CV.docx` | Source of all experience, skills, certs |
| `Frederic_Labadie_Portfolio_KBase_v3.md` | Proficiency levels, pipeline, context |
| `Frederic_Labadie_Career_Brief_v4.md` | Financial constraints, priorities, gaps |

Photo crop (run once per session if `/home/claude/photo_cropped.jpg` doesn't exist):

```python
from PIL import Image
img = Image.open('Frederic_Labadie_Resume_photo.jpg')
cropped = img.crop((175, 0, 625, 600))   # 450×600px centre crop
cropped.save('photo_cropped.jpg', quality=95)
```

---

## Design system

| Token | Value |
|-------|-------|
| Font | DejaVu Sans (Regular, Bold, Oblique) |
| Page | A4, margins 18mm L/R, 12mm T/B |
| Accent | Role-specific (see colour guide below) |
| Ink | `#1C1C1C` |
| Soft | `#595959` |
| Photo | 27mm × 36mm in header (3:4 ratio) |
| Header photo span | SPAN(0,0)(0,4) — covers all 5 header rows |

### Accent colour guide

| Role type | Hex |
|-----------|-----|
| Analytics Architect / general | `#c0392b` crimson |
| Data Analyst (fintech/data) | `#14487A` navy |
| Senior Marketing Analyst | `#0F4C75` dark blue |
| Product Analyst | `#C05020` warm orange |
| Agentic AI / AI Specialist | `#0F4C75` dark blue |
| Senior Manager / corporate | `#111827` near-black |
| Adyen | `#0A6B45` dark green |
| GoSpooky | `#4C1D95` deep purple |
| Hunkemöller | `#722F4A` burgundy |
| Remobi / Adobe Analytics | `#1A4F7A` steel blue |
| Patagonia / sustainability | `#1D6B56` forest green |
| Tracking / implementation | `#2471A3` mid blue |
| Portfolio / general | `#c0392b` crimson |

---

## CV build function — copy this into any build script

```python
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.units import mm
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    HRFlowable, Image as RLImage,
)
from reportlab.lib.enums import TA_JUSTIFY, TA_RIGHT
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from PIL import Image as PILImage

# ── Register fonts ────────────────────────────────────────────────────────
pdfmetrics.registerFont(TTFont('CV',  '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'))
pdfmetrics.registerFont(TTFont('CVB', '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'))
pdfmetrics.registerFont(TTFont('CVI', '/usr/share/fonts/truetype/dejavu/DejaVuSans-Oblique.ttf'))
F, FB, FI = 'CV', 'CVB', 'CVI'

PHOTO   = '/home/claude/photo_cropped.jpg'
OUT_DIR = '/mnt/user-data/outputs/'
LM = RM = 18*mm
TM = BM = 12*mm
FRAME_W = A4[0] - LM - RM

INK  = colors.Color(0.110, 0.118, 0.141)
SOFT = colors.Color(0.353, 0.376, 0.416)


def build(fname, accent_hex, headline, summary, skills, experience, certs):
    """
    fname        : output filename e.g. 'Frederic_Labadie_Adyen_CV.pdf'
    accent_hex   : hex string e.g. '#0A6B45'
    headline     : mirrors exact job title from JD
    summary      : string, British English, max ~60 words
    skills       : list of (label, value) tuples — 6-8 rows
    experience   : list of dicts — see schema below
    certs        : list of strings — most relevant first, max ~12
    """
    r, g, b = [int(accent_hex.lstrip('#')[i:i+2], 16)/255 for i in (0,2,4)]
    ACCENT = colors.Color(r, g, b)

    def sty():
        return dict(
            NAME   = ParagraphStyle('NM', fontName=FB, fontSize=19, textColor=INK,    leading=23, spaceAfter=1),
            HL     = ParagraphStyle('HL', fontName=F,  fontSize=10, textColor=ACCENT, leading=13, spaceAfter=1),
            CT     = ParagraphStyle('CT', fontName=F,  fontSize=8.5,textColor=SOFT,   leading=12, spaceAfter=1),
            SH     = ParagraphStyle('SH', fontName=FB, fontSize=8.5,textColor=ACCENT, leading=11, spaceBefore=5, spaceAfter=2),
            SUM    = ParagraphStyle('SM', fontName=F,  fontSize=8.8,textColor=INK,    leading=13, spaceAfter=0, alignment=TA_JUSTIFY),
            JT     = ParagraphStyle('JT', fontName=FB, fontSize=9.5,textColor=INK,    leading=12, spaceAfter=0),
            JC     = ParagraphStyle('JC', fontName=FI, fontSize=8.5,textColor=SOFT,   leading=11, spaceAfter=2),
            JD     = ParagraphStyle('JD', fontName=F,  fontSize=8.5,textColor=SOFT,   leading=11, alignment=TA_RIGHT),
            BUL    = ParagraphStyle('BL', fontName=F,  fontSize=8.5,textColor=INK,    leading=12, leftIndent=12, firstLineIndent=-12, spaceAfter=2),
            SKVAL  = ParagraphStyle('SV', fontName=F,  fontSize=8.5,textColor=INK,    leading=12, spaceAfter=2),
            EDUDEG = ParagraphStyle('ED', fontName=FB, fontSize=9,  textColor=INK,    leading=12, spaceAfter=0),
            EDUINS = ParagraphStyle('EI', fontName=F,  fontSize=8.5,textColor=SOFT,   leading=11, spaceAfter=4),
            CERT   = ParagraphStyle('CE', fontName=F,  fontSize=8.5,textColor=INK,    leading=11, leftIndent=12, firstLineIndent=-12, spaceAfter=1),
            REFNM  = ParagraphStyle('RN', fontName=FB, fontSize=8.5,textColor=INK,    leading=11, spaceAfter=0),
            REFDT  = ParagraphStyle('RD', fontName=F,  fontSize=8.5,textColor=SOFT,   leading=11, spaceAfter=5),
        )

    S = sty()

    def sec(label):
        return [Paragraph(label.upper(), S['SH']),
                HRFlowable(width='100%', thickness=0.8, color=ACCENT, spaceAfter=3)]

    def bul(text):
        return Paragraph(f'\u2022\u2002{text}', S['BUL'])

    def job(title, co, dates, bullets):
        out = []
        dcol = 52*mm
        row = Table([[Paragraph(title, S['JT']), Paragraph(dates, S['JD'])]],
                    colWidths=[FRAME_W - dcol, dcol])
        row.setStyle(TableStyle([
            ('VALIGN',(0,0),(-1,-1),'TOP'),
            ('TOPPADDING',(0,0),(-1,-1),0),('BOTTOMPADDING',(0,0),(-1,-1),0),
            ('LEFTPADDING',(0,0),(-1,-1),0),('RIGHTPADDING',(1,0),(1,0),0)]))
        out.append(row)
        out.append(Paragraph(co, S['JC']))
        for b in bullets:
            out.append(bul(b))
        out.append(Spacer(1, 4))
        return out

    doc = SimpleDocTemplate(
        OUT_DIR + fname, pagesize=A4,
        leftMargin=LM, rightMargin=RM, topMargin=TM, bottomMargin=BM,
        title=f'Frederic Labadie \u2014 {headline}',
        author='Frederic Labadie'
    )
    story = []

    # ── Header (5 rows, photo spans all) ──────────────────────────────────
    pi = RLImage(PHOTO, width=27*mm, height=36*mm)
    hd = Table([
        [pi,  Paragraph('Frederic Labadie', S['NAME'])],
        ['',  Paragraph(headline, S['HL'])],
        ['',  Paragraph('+31 6 13 82 86 35  |  Frederic.Labadie@gmail.com  |  linkedin.com/in/frederic-labadie', S['CT'])],
        ['',  Paragraph('Amsterdam, Netherlands  |  EU Work Authorisation  |  Available Immediately', S['CT'])],
        ['',  Paragraph('fredericlabadie.com  |  github.com/fredericlabadie', S['CT'])],
    ], colWidths=[32*mm, None])
    hd.setStyle(TableStyle([
        ('SPAN',(0,0),(0,4)), ('VALIGN',(0,0),(0,4),'MIDDLE'),
        ('VALIGN',(1,0),(1,4),'TOP'),
        ('TOPPADDING',(0,0),(-1,-1),1),('BOTTOMPADDING',(0,0),(-1,-1),1),
        ('LEFTPADDING',(0,0),(-1,-1),0),('RIGHTPADDING',(0,0),(0,4),0),
    ]))
    story += [hd, Spacer(1,3), HRFlowable(width='100%', thickness=2.5, color=ACCENT, spaceAfter=5)]

    # ── Summary ───────────────────────────────────────────────────────────
    story += sec('Professional Summary')
    story.append(Paragraph(summary, S['SUM']))
    story.append(Spacer(1,4))

    # ── Skills ────────────────────────────────────────────────────────────
    story += sec('Core Skills')
    lbl, val = 44*mm, FRAME_W - 44*mm
    sk_rows = [[Paragraph(f'<b>{l}</b>', S['SKVAL']), Paragraph(v, S['SKVAL'])] for l, v in skills]
    sk = Table(sk_rows, colWidths=[lbl, val])
    sk.setStyle(TableStyle([
        ('VALIGN',(0,0),(-1,-1),'TOP'),
        ('TOPPADDING',(0,0),(-1,-1),1),('BOTTOMPADDING',(0,0),(-1,-1),1),
        ('LEFTPADDING',(0,0),(-1,-1),0),('RIGHTPADDING',(0,0),(0,-1),5)]))
    story.append(sk)
    story.append(Spacer(1,2))

    # ── Experience ────────────────────────────────────────────────────────
    story += sec('Work Experience')
    for e in experience:
        story.extend(job(e['title'], e['co'], e['dates'], e['bullets']))

    # ── Education ─────────────────────────────────────────────────────────
    story += sec('Education')
    for deg, inst in [
        ('Master of Science, Data Analytics  \u2014  2020\u20132023', 'Western Governors University'),
        ('Data Science Continuing Education Certificate  \u2014  2018', 'University of California, Irvine'),
        ('Bachelor of Arts, Strategic Communications  \u2014  2006\u20132011',
         'The Ohio State University  |  Minors: Professional Writing, Philosophy'),
    ]:
        story.append(Paragraph(deg, S['EDUDEG']))
        story.append(Paragraph(inst, S['EDUINS']))

    # ── Certifications ────────────────────────────────────────────────────
    story += sec('Certifications')
    for c in certs:
        story.append(Paragraph(f'\u2022\u2002{c}', S['CERT']))
    story.append(Spacer(1,3))

    # ── References ────────────────────────────────────────────────────────
    story += sec('References')
    for nm, det in [
        ('Liz Schilling',    'Director, Data & Digital Strategy \u2014 Geben Communications  |  Liz.massey.schilling@gmail.com  |  Colleague, Stanley Steemer'),
        ('Jonathan Butcher', 'Business Intelligence Developer \u2014 Stanley Steemer  |  jonboy6257@gmail.com  |  Colleague, Stanley Steemer'),
        ('Gavin Reeves',     'Lead Product Analyst \u2014 Cengage Group  |  greeves1000@gmail.com  |  Colleague, Telus Digital'),
    ]:
        story.append(Paragraph(nm, S['REFNM']))
        story.append(Paragraph(det, S['REFDT']))

    doc.build(story)
    print(f'  \u2713 {fname}')
```

---

## Experience entry schema

Each entry in the `experience` list is a dict:

```python
{
    'title':   'Analytics Architect',                    # role title
    'co':      'Telus Digital \u2014 Consultancy | Remote',  # company + context line
    'dates':   '2024 \u2013 Present',                    # date range
    'bullets': [                                         # 3-5 strings
        'First bullet text.',
        'Second bullet text.',
    ]
}
```

**Bullet selection rules:**
- 3 bullets for older/supporting roles (Designory, Planned Parenthood)
- 4–6 bullets for primary roles (Telus Digital, Stanley Steemer)
- Lead with the most role-relevant bullet, not chronologically
- Include one metric or outcome per major role where possible
- Never fabricate metrics — pull only from MASTER_CV or KBase

---

## Skills table rules

- 6–8 rows maximum
- Left column: short category label (plain text, bolded via `<b>`)
- Right column: comma/middot-separated tool list with honest proficiency notes
- If a tool is a documented gap, name it with `— not primary` or `— working knowledge`
- Never list a tool not in the MASTER_CV or KBase
- Order rows: primary stack first, supporting tools last, gaps at bottom

**Gap framing examples:**

```
'Power BI (working knowledge \u2014 developing)'
'QuickSight: not primary \u2014 Looker Studio is functional equivalent, rapid ramp'
'SEMrush: not a primary tool \u2014 equivalent experience via GA4 organic reporting'
'Azure (GCP-native; limited Azure)'
```

---

## Certifications selection guide

Pull from this master list. Select the most relevant 8–12 for each role.

**Always include (if role is technical):**
- dbt Fundamentals — dbt Labs (April 2026) | Credential ID: 178745166
- Google Analytics Certification — Google (expires August 2026)

**Include when AI tooling is relevant:**
- Introduction to Model Context Protocol — Anthropic (May 2026) | Credential ID: kphfbnowwcfw
- Claude Code in Action — Anthropic (May 2026) | Credential ID: tiaor7e7qitf
- Introduction to Agent Skills — Anthropic (May 2026) | Credential ID: 86223gpssufw
- Prompt Design in Vertex AI — Google Cloud (February 2026)

**Include when product analytics is relevant:**
- Amplitude Expert: Analysis (May 2026) | Credential ID: 4d904c1e-9887-4c29-953f-d11de234565c
- Amplitude Expert: Data Management (April 2026)
- Amplitude Specialist: Experiment, Marketing Analytics, Data Cleanup (March 2026)
- Amplitude Practitioner: Retention, Acquisition, Monetization (March 2026)
- Amplitude Foundations: Analytics, Experiment, Data Management (March 2026)

**Include when Adobe Analytics is relevant:**
- Adobe Analytics Business Practitioner — Adobe (November 2024)

**Include when CDP/Bloomreach is relevant:**
- Bloomreach Engagement Foundations (August 2024)
- Bloomreach SMS Course (July 2024)
- Bloomreach Jinja Jumpstart (July 2024)
- Bloomreach Engagement Crash Course (July 2024)

**Include when data engineering/architecture is relevant:**
- Databricks Fundamentals — Databricks Academy (February 2026) | Credential ID: 173794440
- Data Mesh Architecture: Core Concepts — LinkedIn (March 2026)

**Include when experimentation/optimisation is relevant:**
- Conversion Optimisation Certification — Google (August 2025)

**Include when research methodology is relevant:**
- Sense-Making Methodology (Dervin) — Ohio State University (March 2011)

**Supporting (include when space allows):**
- Decision Science Fundamentals — LinkedIn (August 2025)
- Foundations of Neuroscience — Johns Hopkins (April 2026)

---

## Summary writing rules

- British English throughout: organisation, optimisation, behaviour, authorisation,
  modelling, colour, analyse
- Max ~70 words
- Open with role identity + years of experience
- Name the primary stack for this role specifically
- Close with: Amsterdam-based, EU work authorisation, available immediately, MSc Data Analytics
- Include `fredericlabadie.com` if this is a portfolio-directed application
- Never use: "passionate about," "driven by," "excited to," or any superlative
- Always include one honest gap acknowledgement if the role has a material mismatch

---

## Cover letter function (Node.js / docx)

```javascript
const { Document, Packer, Paragraph, TextRun, AlignmentType } = require('docx');
const fs = require('fs');
const FONT = 'Arial';

function p(text, opts = {}) {
  return new Paragraph({
    alignment: AlignmentType.LEFT,
    spacing: { after: opts.after ?? 200, line: 280 },
    children: [new TextRun({
      text, font: FONT, size: opts.size ?? 20,
      bold: opts.bold ?? false,
      italics: opts.italic ?? false,
      color: opts.color ?? '1C1C1C',
    })]
  });
}

// Usage:
const doc = new Document({ sections: [{ properties: {
  page: { size: { width: 11906, height: 16838 },
          margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } }
}, children: [
  p('Frederic Labadie', { size: 34, bold: true, after: 60 }),
  p('Frederic.Labadie@gmail.com  \u2022  +31 6 13 82 86 35  \u2022  Amsterdam, Netherlands',
    { color: '555555', after: 60 }),
  p('linkedin.com/in/frederic-labadie  \u2022  fredericlabadie.com',
    { color: '555555', after: 280 }),
  p('May 2026', { italic: true, after: 280 }),
  p('Recruiter Name / Company', { after: 380 }),
  p('Dear [Name / Hiring Team],', { after: 260 }),
  // ... paragraphs ...
  p('Kind regards,', { after: 240 }),
  p('Frederic Labadie', { bold: true }),
]}]});

Packer.toBuffer(doc).then(b => {
  fs.writeFileSync('/mnt/user-data/outputs/Frederic_Labadie_ROLE_CoverLetter.docx', b);
  console.log('Done');
});
```

Convert DOCX to PDF:
```bash
libreoffice --headless --convert-to pdf FILE.docx --outdir /mnt/user-data/outputs/
```

---

## Cover letter structure rules

| Para | Content |
|------|---------|
| 1 | State role. Name the 1–2 things that make this a genuine fit. No warm-up. |
| 2 | Strongest evidence — specific outcome with numbers. |
| 3 | Secondary evidence or differentiator (GDPR at 3 orgs, coaching, build-from-scratch). |
| 4 | Gaps — one sentence each, never omitted. |
| 5 | Amsterdam-based, EU work authorisation, available immediately. Nothing more. |

- Sign-off: **Kind regards** (never Warm regards)
- Address named recruiter where available
- British English throughout
- Maximum five paragraphs
- Never mention salary in the cover letter

---

## Page count verification

```python
from pypdf import PdfReader
pages = len(PdfReader('output.pdf').pages)
assert pages == 2, f'Expected 2 pages, got {pages}'
```

If over 2 pages: reduce bullets per role (drop to 3 for older roles), trim
certifications to 8, consolidate Designory/Xivic into one entry.

---

## Output naming convention

```
Frederic_Labadie_{Company}_CV.pdf
Frederic_Labadie_{Company}_CoverLetter.docx
Frederic_Labadie_{Company}_CoverLetter.pdf   # libreoffice conversion
```

Portfolio files (no role targeting):
```
frederic-labadie-cv.pdf          → assets/resume/ in GitHub repo
resume/index.html                → resume/ directory in GitHub repo
```

---

## What not to include in CVs

- Audi experience (brief assignment — removed from all docs)
- Vision by Granicus (CMS migration, not analytics)
- Telus Digital client names beyond Dairy Queen (QSR) — others are confidential
- BigQuery or Looker Studio at Micro Center (stack was Snowflake/Bloomreach/Excel)
- 14 years SQL claim — correct claim is 8+ years
- 30% ruling — does not apply
- AI/development skills on tracking-implementation-axis CVs

---

## Common honest gaps and how to frame them

| Gap | Framing |
|-----|---------|
| Power BI | "working knowledge — developing; primary BI is Looker Studio and SSRS" |
| Snowflake | "working knowledge, not production primary; BigQuery-native" |
| AWS / Azure | "GCP-native; limited AWS/Azure exposure" |
| Looker (enterprise) | "primary is Looker Studio; Looker enterprise working knowledge" |
| Tableau | "working knowledge; primary visualisation is Looker Studio" |
| QuickSight | "not primary — Looker Studio is functional equivalent, rapid ramp" |
| SEMrush | "not primary — equivalent via GA4 organic reporting and Search Console" |
| dbt production | "hands-on BigQuery/GCP project in development" |
| SFCC | "not in background" |
| Dutch language | "A2 — actively studying; day-to-day meetings in Dutch a stretch" |
| People management | "2 direct reports (Micro Center) — real but limited scope" |
