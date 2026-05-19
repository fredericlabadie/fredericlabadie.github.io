# ForAI.md — Health Portfolio Project
*Prompt for Claude Code session*
*Read DBT-BigQuery-Project-Plan.md before starting any work*

---

## Project Brief

Build a production-style dbt analytics engineering project on BigQuery using CMS Hospital Readmissions data. The project is a portfolio piece targeting the Philips UX Telemetry Expert — Adoption & Insights role (Eindhoven second round, ~May 19).

The business question: **Which hospitals show consistently low adoption of discharge protocol improvements, and what patterns in clinical quality metrics predict readmission rates?**

This framing maps directly to the Philips role — clinical workflow adoption is the hospital device equivalent of feature adoption analytics.

---

## Stack

- **Warehouse:** BigQuery (GCP — existing account)
- **Transformation:** dbt Cloud (free developer tier — cloud.getdbt.com)
- **Dataset:** CMS Hospital Readmissions — kaggle.com/datasets/dansbecker/hospital-readmissions
- **Source control:** GitHub — create a new public repo `hospital-readmissions-dbt`
- **Docs:** dbt docs site generated and linked from README

---

## What to Build

A three-layer dbt project:

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

Full model logic is in `DBT-BigQuery-Project-Plan.md` in this folder.

---

## Requirements for Every Model

- Descriptions in `schema.yml` for every model and every column
- Tests: `not_null` and `unique` on primary keys, `accepted_values` on categoricals, `relationships` between layers
- Use `ref()` and `source()` macros throughout — no hardcoded references

---

## BigQuery Setup (do this first)

1. Create dataset: `hospital_analytics` in GCP
2. Load CMS CSV into `hospital_analytics.raw_hospital_readmissions`
3. Connect dbt Cloud to BigQuery via service account
4. Set project and dataset in profiles.yml

---

## Definition of Done

- [ ] All seven models built and running in BigQuery
- [ ] All tests passing (zero failures)
- [ ] schema.yml complete — every model and column documented
- [ ] dbt docs generated and served
- [ ] GitHub repo public with clean README
- [ ] DAG screenshot in README

---

## Philips Framing

When complete, the interview narrative is: "I built a dbt project on BigQuery using CMS hospital readmissions data. The question I designed it around is which clinical sites consistently underperform on protocol adoption, and what patterns predict that. It is the same analytical question that applies to medical device feature adoption at hospital level. The architecture uses the standard three-layer pattern — staging for clean raw data, intermediate for business logic, marts for analytics-ready tables."

---

## Priority Order

1. BigQuery setup and data load
2. Staging models + tests
3. Intermediate models + tests
4. Mart models + tests
5. Documentation (schema.yml)
6. README + dbt docs

---

*Target completion: 30 May 2026*
*Stack: BigQuery (native GCP — no setup friction, production-equivalent)*
