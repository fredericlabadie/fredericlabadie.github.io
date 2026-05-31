"""
Sample CV generator — follows cv-build-process.md exactly.
General/portfolio axis: Analytics Architect, crimson #c0392b.
Run from this directory: python3 build_sample_cv.py
"""

import os
import sys
from PIL import Image as PILImage

# ── Paths ─────────────────────────────────────────────────────────────────────
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
SITE_ROOT  = os.path.dirname(os.path.dirname(SCRIPT_DIR))  # …/fredericlabadie.github.io
FONT_DIR   = "C:/Windows/Fonts"
PHOTO_SRC  = os.path.join(SCRIPT_DIR, "../photo/frederic-portrait.jpg")
PHOTO_CROP = os.path.join(SCRIPT_DIR, "_photo_cropped_tmp.jpg")
OUT_DIR    = SCRIPT_DIR + "/"

# ── Crop photo (portrait 480×640 → centre-crop 450×600) ──────────────────────
img = PILImage.open(PHOTO_SRC)
w, h = img.size
left   = (w - 450) // 2
top    = (h - 600) // 2
right  = left + 450
bottom = top  + 600
img.crop((left, top, right, bottom)).save(PHOTO_CROP, quality=95)
print(f"Photo cropped -> {PHOTO_CROP}")

# ── ReportLab imports ─────────────────────────────────────────────────────────
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

# ── Register fonts ────────────────────────────────────────────────────────────
pdfmetrics.registerFont(TTFont("CV",  f"{FONT_DIR}/DejaVuSans.ttf"))
pdfmetrics.registerFont(TTFont("CVB", f"{FONT_DIR}/DejaVuSans-Bold.ttf"))
pdfmetrics.registerFont(TTFont("CVI", f"{FONT_DIR}/DejaVuSans-Oblique.ttf"))
F, FB, FI = "CV", "CVB", "CVI"

PHOTO   = PHOTO_CROP
LM = RM = 18 * mm
TM = BM = 12 * mm
FRAME_W = A4[0] - LM - RM

INK  = colors.Color(0.110, 0.118, 0.141)
SOFT = colors.Color(0.353, 0.376, 0.416)


def build(fname, accent_hex, headline, summary, skills, experience, certs):
    r, g, b = [int(accent_hex.lstrip("#")[i : i + 2], 16) / 255 for i in (0, 2, 4)]
    ACCENT = colors.Color(r, g, b)

    def sty():
        return dict(
            NAME   = ParagraphStyle("NM", fontName=FB, fontSize=19, textColor=INK,    leading=23, spaceAfter=1),
            HL     = ParagraphStyle("HL", fontName=F,  fontSize=10, textColor=ACCENT, leading=13, spaceAfter=1),
            CT     = ParagraphStyle("CT", fontName=F,  fontSize=8.5,textColor=SOFT,   leading=12, spaceAfter=1),
            SH     = ParagraphStyle("SH", fontName=FB, fontSize=8.5,textColor=ACCENT, leading=11, spaceBefore=5, spaceAfter=2),
            SUM    = ParagraphStyle("SM", fontName=F,  fontSize=8.8,textColor=INK,    leading=13, spaceAfter=0, alignment=TA_JUSTIFY),
            JT     = ParagraphStyle("JT", fontName=FB, fontSize=9.5,textColor=INK,    leading=12, spaceAfter=0),
            JC     = ParagraphStyle("JC", fontName=FI, fontSize=8.5,textColor=SOFT,   leading=11, spaceAfter=2),
            JD     = ParagraphStyle("JD", fontName=F,  fontSize=8.5,textColor=SOFT,   leading=11, alignment=TA_RIGHT),
            BUL    = ParagraphStyle("BL", fontName=F,  fontSize=8.5,textColor=INK,    leading=12, leftIndent=12, firstLineIndent=-12, spaceAfter=2),
            SKVAL  = ParagraphStyle("SV", fontName=F,  fontSize=8.5,textColor=INK,    leading=12, spaceAfter=2),
            EDUDEG = ParagraphStyle("ED", fontName=FB, fontSize=9,  textColor=INK,    leading=12, spaceAfter=0),
            EDUINS = ParagraphStyle("EI", fontName=F,  fontSize=8.5,textColor=SOFT,   leading=11, spaceAfter=4),
            CERT   = ParagraphStyle("CE", fontName=F,  fontSize=8.5,textColor=INK,    leading=11, leftIndent=12, firstLineIndent=-12, spaceAfter=1),
            REFNM  = ParagraphStyle("RN", fontName=FB, fontSize=8.5,textColor=INK,    leading=11, spaceAfter=0),
            REFDT  = ParagraphStyle("RD", fontName=F,  fontSize=8.5,textColor=SOFT,   leading=11, spaceAfter=5),
        )

    S = sty()

    def sec(label):
        return [
            Paragraph(label.upper(), S["SH"]),
            HRFlowable(width="100%", thickness=0.8, color=ACCENT, spaceAfter=3),
        ]

    def bul(text):
        return Paragraph(f"• {text}", S["BUL"])

    def job(title, co, dates, bullets):
        out = []
        dcol = 52 * mm
        row = Table(
            [[Paragraph(title, S["JT"]), Paragraph(dates, S["JD"])]],
            colWidths=[FRAME_W - dcol, dcol],
        )
        row.setStyle(TableStyle([
            ("VALIGN",  (0, 0), (-1, -1), "TOP"),
            ("TOPPADDING",    (0, 0), (-1, -1), 0),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
            ("LEFTPADDING",   (0, 0), (-1, -1), 0),
            ("RIGHTPADDING",  (1, 0), (1,  0),  0),
        ]))
        out.append(row)
        out.append(Paragraph(co, S["JC"]))
        for b in bullets:
            out.append(bul(b))
        out.append(Spacer(1, 4))
        return out

    doc = SimpleDocTemplate(
        OUT_DIR + fname,
        pagesize=A4,
        leftMargin=LM, rightMargin=RM, topMargin=TM, bottomMargin=BM,
        title=f"Frederic Labadie — {headline}",
        author="Frederic Labadie",
    )
    story = []

    # ── Header ────────────────────────────────────────────────────────────────
    pi = RLImage(PHOTO, width=27 * mm, height=36 * mm)
    hd = Table(
        [
            [pi, Paragraph("Frederic Labadie", S["NAME"])],
            ["",  Paragraph(headline, S["HL"])],
            ["",  Paragraph("+31 6 13 82 86 35  •  frederic.labadie@gmail.com  •  linkedin.com/in/frederic-labadie", S["CT"])],
            ["",  Paragraph("Amsterdam, Netherlands  •  EU Work Authorisation  •  Available Immediately", S["CT"])],
            ["",  Paragraph("fredericlabadie.com", S["CT"])],
        ],
        colWidths=[32 * mm, None],
    )
    hd.setStyle(TableStyle([
        ("SPAN",          (0, 0), (0, 4)),
        ("VALIGN",        (0, 0), (0, 4), "MIDDLE"),
        ("VALIGN",        (1, 0), (1, 4), "TOP"),
        ("TOPPADDING",    (0, 0), (-1, -1), 1),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 1),
        ("LEFTPADDING",   (0, 0), (-1, -1), 0),
        ("RIGHTPADDING",  (0, 0), (0,  4),  0),
    ]))
    story += [hd, Spacer(1, 3), HRFlowable(width="100%", thickness=2.5, color=ACCENT, spaceAfter=5)]

    # ── Summary ───────────────────────────────────────────────────────────────
    story += sec("Professional Summary")
    story.append(Paragraph(summary, S["SUM"]))
    story.append(Spacer(1, 4))

    # ── Skills ────────────────────────────────────────────────────────────────
    story += sec("Core Skills")
    lbl, val = 44 * mm, FRAME_W - 44 * mm
    sk_rows = [
        [Paragraph(f"<b>{l}</b>", S["SKVAL"]), Paragraph(v, S["SKVAL"])]
        for l, v in skills
    ]
    sk = Table(sk_rows, colWidths=[lbl, val])
    sk.setStyle(TableStyle([
        ("VALIGN",        (0, 0), (-1, -1), "TOP"),
        ("TOPPADDING",    (0, 0), (-1, -1), 1),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 1),
        ("LEFTPADDING",   (0, 0), (-1, -1), 0),
        ("RIGHTPADDING",  (0, 0), (0,  -1), 5),
    ]))
    story.append(sk)
    story.append(Spacer(1, 2))

    # ── Experience ────────────────────────────────────────────────────────────
    story += sec("Work Experience")
    for e in experience:
        story.extend(job(e["title"], e["co"], e["dates"], e["bullets"]))

    # ── Education ─────────────────────────────────────────────────────────────
    story += sec("Education")
    for deg, inst in [
        ("Master of Science, Data Analytics — 2020–2023", "Western Governors University"),
        ("Bachelor of Arts, Strategic Communications — 2006–2011",
         "The Ohio State University  •  Minors: Professional Writing, Philosophy"),
    ]:
        story.append(Paragraph(deg, S["EDUDEG"]))
        story.append(Paragraph(inst, S["EDUINS"]))

    # ── Certifications ────────────────────────────────────────────────────────
    story += sec("Certifications")
    for c in certs:
        story.append(Paragraph(f"• {c}", S["CERT"]))
    story.append(Spacer(1, 3))

    # ── References ────────────────────────────────────────────────────────────
    story += sec("References")
    for nm, det in [
        ("Liz Schilling",
         "Director, Data & Digital Strategy — Geben Communications  •  liz.massey.schilling@gmail.com  •  Colleague, Stanley Steemer"),
        ("Jonathan Butcher",
         "Business Intelligence Developer — Stanley Steemer  •  jonboy6257@gmail.com  •  Colleague, Stanley Steemer"),
        ("Gavin Reeves",
         "Lead Product Analyst — Cengage Group  •  greeves1000@gmail.com  •  Colleague, Telus Digital"),
    ]:
        story.append(Paragraph(nm, S["REFNM"]))
        story.append(Paragraph(det, S["REFDT"]))

    doc.build(story)
    print(f"  OK: {fname}")


# ── Content — General / Portfolio CV ─────────────────────────────────────────

HEADLINE = "Senior Data Analyst  ·  Analytics Architect"

SUMMARY = (
    "Analytics architect with 14+ years building measurement infrastructure from scratch, "
    "specialising in the gap between instrumentation and human behaviour. "
    "Expert in GA4, GTM (client- and server-side), BigQuery, Amplitude (11 certifications, "
    "both Expert credentials), and Adobe Analytics. "
    "dbt Fundamentals certified (April 2026); BigQuery/GCP project in active development. "
    "Amsterdam-based, EU work authorisation, available immediately. MSc Data Analytics, WGU. "
    "Portfolio: fredericlabadie.com"
)

SKILLS = [
    ("Analytics platforms",
     "GA4 (certified) · Adobe Analytics Business Practitioner · Amplitude (11 certs, both Experts) "
     "· GTM client- & server-side · Adobe Launch · Mixpanel (vendor evaluation)"),
    ("Data engineering",
     "BigQuery (advanced, 8+ yrs daily) · SQL (advanced) · Python (pandas, scipy) "
     "· dbt Fundamentals · Snowflake (working knowledge) · Databricks Fundamentals · GitHub"),
    ("BI & dashboarding",
     "Looker Studio (advanced) · SSRS (advanced) · Tableau (working knowledge) "
     "· Power BI (developing) · BigQuery-native dashboarding"),
    ("MarTech / CDP",
     "Bloomreach CDP · Oracle Responsys · OneTrust (3 organisations) "
     "· Marketing automation analytics"),
    ("Research methodology",
     "Sense-Making Methodology (Dervin) — focus groups, UX question design, user testing "
     "· A/B test design & statistical evaluation · Hotjar · SurveyMonkey"),
    ("Governance",
     "GDPR & CCPA compliant data collection · OneTrust consent architecture · data quality monitoring"),
]

EXPERIENCE = [
    {
        "title":  "Analytics Architect",
        "co":     "Telus Digital — Multi-client enterprise consultancy  •  Remote",
        "dates":  "2024 – Present",
        "bullets": [
            "Lead end-to-end analytics implementation engagements: measurement planning, SDR creation, "
            "GTM deployment (client- and server-side), QA, and reporting infrastructure.",
            "Built and operated an AI-assisted alert triage system for client product telemetry. "
            "V1 compressed 230 raw Amplitude alerts to 39 findings (83% reduction) while preserving "
            "human-judgement gates. Surfaced one critical feature failure missed in human-only review.",
            "Automated 12+ hours per week of manual reporting per client through SQL pipeline development; "
            "built standardised Looker Studio and BigQuery dashboards aligned to client KPI frameworks.",
            "Lead A/B testing programmes end-to-end: success criteria, guardrails, sample sizing, "
            "statistical analysis, and stakeholder-ready synthesis.",
        ],
    },
    {
        "title":  "Email & SMS Marketing Manager",
        "co":     "A Major Retail Client — Consumer electronics  •  Remote contract (concurrent with Telus)",
        "dates":  "2023 – 2025",
        "bullets": [
            "Led full migration from Oracle Responsys to Bloomreach CDP — redesigned customer data model, "
            "event schemas, segmentation logic, and marketing data flows with zero campaign downtime.",
            "Designed lifecycle event tracking architecture supporting triggered campaign automation. "
            "+10.8% YoY CTR, +5.8% YoY open rate in the first year on the new platform.",
            "Designed and executed A/B tests across lifecycle campaign touchpoints; implemented "
            "data-driven optimisations based on statistical analysis.",
        ],
    },
    {
        "title":  "Analytics Architect / BI Developer",
        "co":     "Stanley Steemer Inc. — National franchise service, 280 locations  •  Dublin, OH",
        "dates":  "2018 – 2023",
        "bullets": [
            "Built the entire marketing analytics and BI layer from scratch for an organisation with "
            "mature operations data but no marketing measurement capability.",
            "Designed data architecture on Azure SQL Server with Python ingestion for Universal Analytics "
            "and a server-side bridge from GA4 → BigQuery back into Azure; established the KPI framework "
            "giving leadership its first reliable cross-location performance view.",
            "Introduced the single-customer concept and householding data model, enabling identity "
            "resolution across 280 locations and unlocking marketing automation for the first time.",
            "Led GA4 beta implementation: measurement plan, SDR, data layer spec, GTM, full QA against "
            "production data before migration from Universal Analytics.",
            "Applied Sense-Making Methodology (Dervin) in user-testing sessions combined with Hotjar "
            "and SurveyMonkey; findings fed directly into tracking specifications and UX recommendations.",
        ],
    },
    {
        "title":  "Web Analyst",
        "co":     "Designory / TBWA Worldwide — Global advertising agency  •  Long Beach, CA",
        "dates":  "2015 – 2018",
        "bullets": [
            "Led GTM migrations and tracking architecture upgrades for clients including Subaru of America, "
            "Securitas, and Booz Allen Hamilton; wrote data layer specifications and deployed custom "
            "JavaScript tracking (video, form abandonment, cross-domain journeys).",
            "Applied Sense-Making Methodology (Dervin) in UX question design and user testing; "
            "implemented OneTrust at agency level for GDPR-compliant consent management.",
            "Grew subscriber base from 20,000 to 50,000 through data-driven acquisition funnel "
            "analysis (Melody Health brand, Planned Parenthood, 2011–2015).",
        ],
    },
]

CERTS = [
    "Amplitude Expert: Analysis — May 2026  |  ID: 4d904c1e-9887-4c29-953f-d11de234565c",
    "Amplitude Expert: Data Management — May 2026",
    "Amplitude Specialist: Experiment, Marketing Analytics, Data Cleanup — Mar 2026",
    "Amplitude Practitioner: Retention, Acquisition, Monetization — Mar 2026",
    "Amplitude Foundations: Analytics, Experiment, Data Management — Mar 2026",
    "dbt Fundamentals — dbt Labs, Apr 2026  |  ID: 178745166",
    "Adobe Analytics Business Practitioner — Adobe, Nov 2024",
    "Google Analytics Certification — Google (expires Aug 2026)",
    "Conversion Optimisation Certification — Google, Aug 2025",
    "Databricks Fundamentals — Feb 2026  |  ID: 173794440",
    "Prompt Design in Vertex AI — Google Cloud, Feb 2026",
    "Sense-Making Methodology (Dervin) — The Ohio State University, Mar 2011",
]

build(
    fname="frederic-labadie-cv-sample.pdf",
    accent_hex="#c0392b",
    headline=HEADLINE,
    summary=SUMMARY,
    skills=SKILLS,
    experience=EXPERIENCE,
    certs=CERTS,
)

# ── Page count check ──────────────────────────────────────────────────────────
from pypdf import PdfReader
pages = len(PdfReader(OUT_DIR + "frederic-labadie-cv-sample.pdf").pages)
print(f"Page count: {pages}")
if pages != 2:
    print(f"WARNING: expected 2 pages, got {pages}. Trim bullets or certs.")

# ── Clean up temp photo ───────────────────────────────────────────────────────
os.remove(PHOTO_CROP)
