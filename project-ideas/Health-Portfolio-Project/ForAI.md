# ForAI.md — Health Portfolio Project
*Prompt for Claude Code session*
*Read DBT-Snowflake-Project-Plan.md before starting any work*

---

## Project Brief

Build a production-style dbt analytics engineering project on Snowflake using CMS Hospital Readmissions data. The project is a portfolio piece targeting the Philips UX Telemetry Expert — Adoption & Insights role (Eindhoven second round, two weeks away).

The business question: **Which hospitals show consistently low adoption of discharge protocol improvements, and what patterns in clinical quality metrics predict readmission rates?**

This framing maps directly to the Philips role — clinical workflow adoption is the hospital device equivalent of feature adoption analytics.

---

## Stack

- **Warehouse:** Snowflake (free trial account)
- **Transformation:** dbt Cloud (free developer tier)
- **Dataset:** CMS Hospital Readmissions — kaggle.com/datasets/dansbecker/hospital-readmissions
- **Source control:** GitHub — create a new public repo `hospital-readmissions-dbt`
- **Docs:** dbt docs site generated and linked from README

---

## What to Build

A three-layer dbt project with the following structure:

```
models/
  staging/
    stg_hospital_readmissions.sql
    stg_conditions.sql
  intermediate/
    int_hospital_readmission_rates.sql
    int_hospital_adoption_signals.sql
  marts/
    mart_adoption_summary.sql
    mart_condition_performance.sql
    mart_national_benchmarks.sql
```

Full details of each model's logic are in `DBT-Snowflake-Project-Plan.md` in this folder.

---

## Requirements for Every Model

- Descriptions in `schema.yml` for every model and every column
- Tests: `not_null` and `unique` on primary keys, `accepted_values` on categoricals, `relationships` between layers
- No hardcoded values — use dbt `ref()` and `source()` macros throughout
- Incremental models where appropriate in the intermediate layer

---

## Snowflake Setup (do this first)

1. Create database: `HOSPITAL_ANALYTICS`
2. Create schemas: `RAW`, `STAGING`, `INTERMEDIATE`, `MARTS`
3. Create warehouse: `COMPUTE_WH` — X-Small, auto-suspend 1 minute
4. Load CMS CSV into `RAW.HOSPITAL_READMISSIONS`
5. Connect dbt Cloud to Snowflake — use the dbt Cloud setup wizard

---

## GitHub README Structure

The README must include:

```markdown
# Hospital Readmissions Analytics — dbt + Snowflake

## Business Question
## Dataset
## Architecture (with DAG screenshot from dbt docs)
## How to Run
## Key Findings
## Real-World Extension (MIMIC-III)
```

The **Real-World Extension** section should note that this architecture is compatible with MIMIC-III (PhysioNet) — the gold standard clinical dataset — and explain what additional models that would enable. This signals clinical domain awareness to a Philips interviewer without requiring credentialed access.

---

## Definition of Done

- [ ] All seven models built and running in Snowflake
- [ ] All tests passing (zero failures)
- [ ] schema.yml complete — every model and column documented
- [ ] dbt docs generated (`dbt docs generate && dbt docs serve`)
- [ ] GitHub repo public with clean README
- [ ] DAG screenshot in README showing full lineage
- [ ] Looker Studio dashboard connected to mart_adoption_summary (optional but strong)

---

## Philips Framing

When this project is complete, the GitHub link goes into every Philips-related communication. The business narrative to use in the interview:

*"I built a dbt project on Snowflake using CMS hospital readmissions data — the question I designed it around is which clinical sites consistently underperform on protocol adoption, and what patterns predict that. It is the same analytical question that applies to medical device feature adoption at a hospital level. The architecture uses the same three-layer pattern I would use on Snowflake in production — staging for clean raw data, intermediate for business logic, marts for analytics-ready tables."*

---

## Priority Order for the Session

1. Snowflake setup and data load
2. Staging models + tests
3. Intermediate models + tests
4. Mart models + tests
5. Documentation (schema.yml)
6. README + dbt docs
7. Looker Studio dashboard (if time allows)

Stop after step 4 if time is short — a documented staging and intermediate layer is more impressive than rushed marts.

---

*Target completion: May 10, 2026*
*Career Strategy context: github.com/fredericlabadie/fredericlabadie.github.io/project-ideas/Health-Portfolio-Project*
