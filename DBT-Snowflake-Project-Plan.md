# dbt + Snowflake Portfolio Project Plan
*Hospital Readmissions Analytics — Clinical Quality & Adoption Metrics*
*Target completion: May 10, 2026*

---

## Business Question

Which hospitals show consistently low adoption of discharge protocol improvements, and what patterns in clinical quality metrics predict readmission rates?

This mirrors the analytical challenge in hospital medical device contexts: understanding where clinical workflow changes are not being adopted, and what measurable signals predict poor outcomes. Directly relevant to Philips's focus on hospital medical device analytics and adoption measurement.

---

## Dataset

**CMS Hospital Readmissions Reduction Program data**
Source: kaggle.com/datasets/dansbecker/hospital-readmissions

Real CMS (Centers for Medicare & Medicaid Services) data. Hospital-level readmission rates, excess readmission ratios, discharge counts, and condition categories across US hospitals.

Real-world equivalent: MIMIC-III (PhysioNet) — de-identified ICU clinical data from Beth Israel Deaconess Medical Center. Requires credentialed access (physionet.org) — the architecture of this project is designed to extend directly to MIMIC-III.

---

## Stack

- **Warehouse:** Snowflake (free trial — trial.snowflake.com)
- **Transformation:** dbt Cloud (free developer tier — cloud.getdbt.com)
- **Source control:** GitHub
- **Visualisation:** Looker Studio connected via Snowflake connector

---

## Snowflake Setup

1. Create a free Snowflake trial account at trial.snowflake.com
2. Create a database: `HOSPITAL_ANALYTICS`
3. Create schemas: `RAW`, `STAGING`, `INTERMEDIATE`, `MARTS`
4. Create a warehouse: `COMPUTE_WH` (X-Small, auto-suspend 1 min)
5. Load the CMS CSV data into `RAW.HOSPITAL_READMISSIONS`
6. Connect dbt Cloud to Snowflake via the dbt Cloud setup wizard

---

## Three-Layer Architecture

### Layer 1 — Staging (`staging/`)
Clean and type-cast raw data. No business logic. One model per source table.

**`stg_hospital_readmissions.sql`**
- Cast all fields to correct types
- Standardise hospital name formatting
- Rename columns to snake_case
- Filter out rows with null hospital identifiers

**`stg_conditions.sql`**
- Extract distinct condition categories
- Standardise condition name values

**Tests:** `not_null` and `unique` on hospital identifier. `accepted_values` on condition categories.

### Layer 2 — Intermediate (`intermediate/`)
Apply business logic and calculate derived metrics.

**`int_hospital_readmission_rates.sql`**
- Calculate excess readmission ratio by hospital and condition
- Flag hospitals above national average threshold
- Calculate year-over-year change where multiple periods available

**`int_hospital_adoption_signals.sql`**
- Identify hospitals with consistently high excess readmission ratios across multiple conditions (low protocol adoption signal)
- Classify hospitals into adoption tiers: high / medium / low
- Calculate consistency score across condition categories

**Tests:** `not_null` on all calculated fields. `relationships` between intermediate and staging layers.

### Layer 3 — Marts (`marts/`)
Analytics-ready tables for reporting and visualisation.

**`mart_adoption_summary.sql`**
- One row per hospital
- Adoption tier, overall excess readmission ratio, number of conditions flagged, consistency score
- Primary mart for the Looker Studio dashboard

**`mart_condition_performance.sql`**
- One row per hospital-condition combination
- Excess readmission ratio, national benchmark comparison, performance band
- Supports condition-level drill-down analysis

**`mart_national_benchmarks.sql`**
- Aggregated national averages and percentile bands by condition
- Reference table for benchmark comparisons in the other marts

**Tests:** `unique` on primary keys. `not_null` on all dimension and measure fields.

---

## Documentation

Every model has a description in `schema.yml`. Every column has a description. dbt docs generated and linked from the GitHub README.

The documentation layer is the data catalogue — this directly demonstrates data governance thinking relevant to the Philips analytics engineering role.

---

## The Business Narrative

The project answers a question that hospital medical device teams ask continuously: adoption of protocol improvements does not happen uniformly across hospitals. Some hospitals consistently perform above national benchmarks across multiple conditions — others do not. Understanding which hospitals are in which tier, and what distinguishes them, is the analytical foundation for targeted intervention.

In a Philips device context, this maps directly to: which clinical sites are adopting new device features or workflow changes, and which are not? The dbt architecture here is designed to surface that signal from outcome data — the same pattern applies to telemetry and usage data from medical devices.

---

## Time Estimate

| Task | Time |
|------|------|
| Snowflake setup + data load | 1 hour |
| Staging models + tests | 2 hours |
| Intermediate models + tests | 2 hours |
| Mart models + tests | 1 hour |
| Documentation (schema.yml) | 1 hour |
| README + dbt docs | 30 minutes |
| **Total** | **~7.5 hours** |

Recommended split: two sessions of 3–4 hours each. Session 1: Snowflake setup + staging layer. Session 2: intermediate + marts + documentation.

---

## Build Tool

Use **Claude Code** for all model writing and debugging. Bring architecture decisions and business question framing back to the Career Strategy session.

---

## GitHub README Structure

```
# Hospital Readmissions Analytics — dbt + Snowflake

## Business Question
## Dataset
## Architecture
## How to Run
## Key Findings
## Real-World Extension (MIMIC-III)
```

The "Real-World Extension" section signals domain awareness — notes that this project is architecturally compatible with MIMIC-III and explains what that would unlock. Shows the interviewer you understand the clinical data landscape without needing credentialed access to demonstrate it.

---

## Philips Interview Relevance

This project demonstrates:

- **Analytics engineering** — dbt three-layer architecture on Snowflake, directly relevant to Dutch enterprise analytics stacks
- **Adoption metrics thinking** — the core analytical concept is clinical workflow adoption, mapping directly to "Adoption & Insights" in the Philips role title
- **Data governance** — schema documentation, tests, lineage, single source of truth by design
- **Health domain awareness** — CMS data, readmission metrics, clinical quality benchmarks
- **Stakeholder translation** — business narrative connects the technical model to a question a Philips product manager would recognise immediately

---

*Plan version: May 2026*
*Target role: Philips UX Telemetry Expert — Adoption & Insights, Eindhoven*
*Stack shift from BigQuery to Snowflake addresses the most common gap in NL analytics engineering interviews*
