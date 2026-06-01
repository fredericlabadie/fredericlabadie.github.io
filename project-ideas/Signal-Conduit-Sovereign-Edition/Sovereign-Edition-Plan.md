# Signal Conduit — Sovereign Edition Planning Handoff

_A parallel EU-sovereign deployment profile for the analytics-governance workbench_
_Status: planning · no code changes yet · public demo preserved_

---

## Repo-grounded corrections (verified against `fredericlabadie/Signal-Conduit`)

> This block was added on top of the original handoff after reading the live backend. The handoff below is **directionally accurate** — these are the specifics a cold implementer must get right. Where this block and the body disagree, **this block wins.**

1. **Live generative surfaces — there are four, not three.** The body lists `village`/`audit`/`health`. The real client (`api.js` → `window.AVLive`) also ships **`POST /api/parse-spec`** (spec intake) plus **`GET /api/me`**. The provider abstraction must cover `parse-spec` too, or imported-spec parsing silently stays on Anthropic in sovereign mode. Surfaces to migrate: `village`, `audit`, `health`, `parse-spec`.

2. **Real current model-call signature** (preserve this exactly in Phase 1; the body's `generateStructuredJSON(...)` is a _target_ rename, not what exists):

   ```js
   // api/_lib/anthropic.js
   generateJSON({ groundingBlock, user, tool, maxTokens, model, userKey }) → Promise<object>
   ```

   Note `userKey` (BYOK) and `tool` (a Claude tool-use schema object, `{name, description, input_schema}`). The provider interface must either keep `tool` or translate it — Scaleway/Mistral has no native Anthropic tool-use; structured JSON there needs JSON-mode/function-calling or a schema-in-prompt + repair. The repair layer (`api/_lib/shapes.js`) already exists and is provider-agnostic — **lean on it harder for non-Anthropic providers.**

3. **BYOK is more sovereignty-hostile than the body states.** In `api/_lib/surface.js`, a valid `X-SC-User-Key` (regex `^sk-ant-[\w\-]{10,}$`, line 61) does two things: routes the call to Anthropic with the user's key **and bypasses the daily spend cap** (line 82, `if (!userKey) dailyCap()`). So BYOK is both an Anthropic coupling _and_ a cap-bypass. The body's "disable BYOK in sovereign MVP" is correct — reinforced: a `sk-ant-*` key in a sovereign deployment would route data to the US control plane **and** skip the local guardrail. Disable hard.

4. **Two timeouts, and one disappears on Scaleway.** Client aborts at `TIMEOUT_MS = 15000` (`api.js:15`). Server aborts at `50000ms` (`anthropic.js:47`) specifically to beat the **60s Vercel function wall** before it orphans a billing call. On Scaleway containers/instances there is no 60s wall — the 50s server abort can be relaxed/retuned. Don't copy the 50s constant blindly; it's a Vercel artifact.

5. **Model allowlist is real and must be mirrored.** `ALLOWED_MODELS` (`anthropic.js:7`) hard-validates `SC_MODEL` against a Claude-only list and falls back to `claude-sonnet-4-6`. The Scaleway provider needs its **own** allowlist (Mistral/open-weight ids) or `SC_MODEL=mistral-*` will silently fall back to Claude — a sovereignty break that looks like it's working.

6. **Surface lifecycle is already clean and provider-neutral except the one import.** `runSurface` (`surface.js:42`) is: origin-guard → rate-limit → cache → daily-cap → `generateJSON` → `repair` → cache. Only line 8 (`import { generateJSON } from "./anthropic.js"`) is the hard coupling. **Phase 1 is genuinely small** — swap that import for a provider index. The body's "smallest safe PR" instinct is right and the code supports it.

7. **Where the other US dependencies actually live (for Phase 0):**
   - Anthropic: `api/_lib/anthropic.js`, imported only by `api/_lib/surface.js:8`.
   - Vercel: implicit — `req/res` handler shape, the 60s wall (#4), no `vercel.json` coupling beyond runtime.
   - Amplitude: `analytics.js` (dynamic import after consent) + shared `fl-consent.js` from the portfolio site.
   - Redis/Upstash: `api/_lib/redis.js`, used by `api/_lib/cache.js` and `api/_lib/ratelimit.js`.
   - Grounding/system preamble: `api/_lib/grounding.js` (`SYSTEM_PREAMBLE`, prompt-cached) — provider-specific cache_control; Scaleway won't honor Anthropic `cache_control`, strip it there.

---

## Purpose

We are planning an alternative **EU-sovereign stack version** of Signal Conduit.

Signal Conduit is currently a public portfolio demo for an analytics-governance workbench. The current public demo should remain live and usable. This work is **not** a replacement of the public demo. It is a parallel deployment profile designed to demonstrate EU-sovereign / EU-control-plane architecture for AI-enabled analytics governance.

The goal is to create a portfolio-ready proof artifact that shows:

- analytics governance
- measurement architecture
- AI-assisted review workflows
- GDPR-aware instrumentation
- EU-sovereign infrastructure thinking
- model/provider abstraction
- practical tradeoff documentation

The end result should let Frederic show the same product in two governance profiles:

```text
Public Demo:
Vercel + GitHub + Anthropic + Amplitude EU + Upstash

Sovereign Edition:
Scaleway + Forgejo + Scaleway Generative APIs / Mistral + Matomo On-Premise + EU-hosted Valkey/Redis
```

## Current project context

Repository: `fredericlabadie/Signal-Conduit`
Live public demo: `https://signal-conduit.fredericlabadie.com`

Current public demo characteristics:

- Static React SPA (no build step; React UMD + hand-authored `createElement`).
- Optional Vercel serverless backend.
- Live surfaces: `POST /api/village`, `POST /api/audit`, `POST /api/health`, **`POST /api/parse-spec`**, `GET /api/me`. _(corrected — see top block #1)_
- Current model provider: Anthropic / Claude.
- Current model wrapper: `api/_lib/anthropic.js`.
- Current backend lifecycle: `api/_lib/surface.js`.
- Current cache/rate limiting: Redis / Upstash-compatible (`api/_lib/redis.js`, `cache.js`, `ratelimit.js`).
- Current analytics: Amplitude, EU ingestion, consent-gated.
- Current consent layer: shared `fl-consent.js` from `fredericlabadie.com`.
- Current analytics wrapper: `analytics.js`.
- Current posture: public-linked, `noindex, follow`, portfolio demo, not search-oriented.

**Preserve the current public demo unless explicitly changing it. The Sovereign Edition is additive.**

## Why this matters

This should not become a generic "we switched from Claude to Mistral" project. The professional story is stronger:

> Signal Conduit demonstrates the same analytics-governance workflow across two deployment profiles: a fast public portfolio demo and an EU-sovereign edition with reduced US control-plane dependency, self-hosted analytics, EU model inference, and documented data-flow boundaries.

This aligns with Frederic's positioning as an analytics architect / senior IC who bridges business questions, behavioural data, instrumentation, data pipelines, analytics governance, qualitative method, stakeholder adoption, and AI-enabled workflows.

## Definition of "sovereign" for this project

Strict but honest:

```text
No US-controlled service in the active runtime, model, analytics, cache, source-control, or CI/CD path.
```

GitHub may remain as a public mirror for portfolio discoverability, but it should not be the canonical source or deployment control plane for the Sovereign Edition. **Do not claim "fully sovereign" until all relevant layers are moved.**

| Tier | Name              | Meaning                                                                                                  | Claim                |
| ---- | ----------------- | -------------------------------------------------------------------------------------------------------- | -------------------- |
| 1    | EU-aware          | Consent-gated analytics, EU region where possible, privacy notice                                        | GDPR-aware           |
| 2    | Sovereign-aligned | EU model API, EU analytics, EU runtime, but GitHub/Vercel may still be involved                          | EU-sovereign-aligned |
| 3    | Sovereign Edition | EU runtime, EU model, EU cache, Matomo On-Premise, Forgejo canonical repo, EU CI/CD, no US control plane | Sovereign Edition    |

Target: **Tier 3** as a parallel deployment profile.

## Locked sovereign stack decisions

| Layer              | Decision                                                          |
| ------------------ | ----------------------------------------------------------------- |
| Runtime / hosting  | Scaleway or equivalent EU-controlled infrastructure               |
| Backend runtime    | Scaleway container / instance / Kubernetes, not Vercel            |
| Model inference    | Scaleway Generative APIs using Mistral or open-weight models      |
| Analytics          | Matomo On-Premise                                                 |
| Cache / rate limit | Self-hosted Valkey or Redis-compatible cache on EU infrastructure |
| Source control     | Forgejo canonical repo                                            |
| Public mirror      | GitHub mirror only                                                |
| CI/CD              | Forgejo Actions or Woodpecker CI                                  |
| Secrets            | Scaleway Secret Manager or EU-hosted secret management            |
| Logs               | EU-hosted logs with short retention                               |
| Session replay     | Disabled in Sovereign Edition                                     |
| Static fallback    | Preserved                                                         |

## Architecture target

```text
Signal Conduit Sovereign Edition

User browser
  ├─ Static frontend served from EU hosting
  ├─ Matomo On-Premise tracker
  └─ POST /api/village | /api/audit | /api/health | /api/parse-spec

EU backend on Scaleway
  ├─ Origin guard
  ├─ Request validation
  ├─ Rate limit via EU-hosted Valkey/Redis
  ├─ Cache lookup via EU-hosted Valkey/Redis
  ├─ Provider abstraction
  └─ Scaleway Generative APIs
       └─ Mistral / open-weight model

Source and deployment
  ├─ Canonical repo: Forgejo
  ├─ CI/CD: Forgejo Actions or Woodpecker
  ├─ Deployment target: Scaleway
  └─ Public mirror: GitHub
```

## Main implementation principle

Do not fork the product logic unnecessarily. Create **deployment profiles** and **provider abstractions** so the same product runs as `SC_PROFILE=public` or `SC_PROFILE=sovereign`. The frontend should not need to know the low-level model provider unless we deliberately expose it as a demo/proof feature.

## Current model integration issue

The current backend is hard-coded around Anthropic. The coupling is a **single import**: `api/_lib/surface.js:8` → `import { generateJSON } from "./anthropic.js"`. The Anthropic wrapper forces structured JSON via `tool_choice` (guaranteed schema match). Keep it for the public demo.

For the Sovereign Edition, replace the direct Anthropic dependency with a provider layer:

```text
api/_lib/llm/
  index.js
  anthropic.js
  scaleway.js
  local.js
```

Possible future TS migration: same tree with `.ts`.

**Keep the real current interface stable** (see top block #2 — `tool`/`userKey` are real and load-bearing):

```js
generateJSON({
  groundingBlock,
  user,
  tool,
  maxTokens,
  model,
  userKey,
  provider,
});
```

Output contracts that must remain stable: `FINDINGS`, `AUDIT`, `HEALTH`, plus the parse result (`{events, parseNotes, confidence, warnings}`). The UI must not break if the provider changes. The repair layer (`api/_lib/shapes.js`) is the safety net — for providers without native tool-use, generate JSON best-effort and let repair coerce to contract.

## Provider mode design

```text
SC_PROVIDER=anthropic
SC_PROVIDER=scaleway
SC_PROVIDER=static
```

Optional later: `mistral`, `local`.

Sovereign env:

```env
SC_PROFILE=sovereign
SC_PROVIDER=scaleway
SC_MODEL=mistral-small-3.2-24b-instruct-2506
SC_LLM_BASE_URL=<scaleway-generative-api-base-url>
SC_LLM_API_KEY=<secret>
```

Public env:

```env
SC_PROFILE=public
SC_PROVIDER=anthropic
SC_MODEL=<current Claude model, e.g. claude-sonnet-4-6>
ANTHROPIC_API_KEY=<secret>
```

**Each provider needs its own model allowlist** (top block #5) — a sovereign `SC_MODEL` that isn't in the Scaleway allowlist must error or refuse, never silently fall back to Claude.

## BYOK decision

Current BYOK is Anthropic-specific _and_ bypasses the daily spend cap (top block #3). For Sovereign Edition:

1. **Disable BYOK in Sovereign Edition MVP.** A `sk-ant-*` key would route to the US control plane and skip the cap.
2. Keep BYOK in the public Anthropic demo.
3. Later, if BYOK returns, make it provider-specific (Anthropic / Mistral / Scaleway keys), each validated against the right key format and confined to its provider's boundary.

## Analytics decision

Public demo keeps Amplitude EU. Sovereign Edition uses **Matomo On-Premise**: no Amplitude, no session replay, no heatmaps by default, no third-party analytics SaaS. Track only minimal operational events.

Recommended Matomo taxonomy:

| Event                    | Properties                                     |
| ------------------------ | ---------------------------------------------- |
| `stage_viewed`           | `stage_id`, `previous_stage_id`                |
| `surface_run_started`    | `surface`, `provider`, `model_family`          |
| `surface_run_completed`  | `surface`, `provider`, `cache_state`, `status` |
| `cache_hit`              | `surface`, `provider`                          |
| `provider_selected`      | `provider`, `profile`                          |
| `privacy_choices_opened` | `source`                                       |
| `demo_fallback_used`     | `surface`, `reason`                            |
| `sovereign_mode_loaded`  | `profile`, `analytics_mode`                    |

Do not track: prompt text · generated notes · generated audit/health bodies · BYOK values · raw API keys · free-text user input · raw client IP · session replay · heatmaps · user profiles. **Preserve the event-allowlist pattern from the current `analytics.js` wrapper.**

## Cache and rate limiting

Current pattern is good; change infrastructure, preserve design. Cache key is `cacheKey(task, opts)` (`api/_lib/cache.js`) — **Phase 0 must confirm `opts` carries no raw prompt/spec text into the key.** Rate limiting is bucketed; static fallback exists if live surfaces fail.

Sovereign target: self-hosted Valkey/Redis-compatible cache on Scaleway/EU. Document: cache TTL · rate-limit window · IP usage · raw-vs-hashed IP · retention · failure mode.

Privacy improvement: **hash IP for rate-limit keys with a server-side salt.**

## Source control and CI/CD

Forgejo canonical (open-source; aligns with Dutch public-sector digital-sovereignty direction). GitHub stays a public mirror for portfolio visibility. The active deploy pipeline must not rely on GitHub Actions.

```text
Canonical source: Forgejo
Public mirror: GitHub
CI/CD: Forgejo Actions or Woodpecker CI
Deploy target: Scaleway
```

Don't overbuild this before the app is provider-abstracted. Document clearly.

## Documentation to add (lives in the `Signal-Conduit` repo)

`SOVEREIGN.md` · `PRIVACY.md` · `DATA-FLOW.md` · `MODEL-EVAL.md` · `PUBLIC-DEMO-VS-SOVEREIGN.md`

- **`SOVEREIGN.md`** — sovereign edition: active stack, what's removed from active path, what remains as mirror, deployment profile, limitations, future work.
- **`PRIVACY.md`** — plain-language demo privacy: collected / not collected, analytics provider, model provider, cache/rate limiting, IP handling, cookies/local/session storage, retention, deletion route, "not legal advice" boundary.
- **`DATA-FLOW.md`** — two diagrams: public demo flow, sovereign edition flow.
- **`MODEL-EVAL.md`** — Anthropic vs Scaleway/Mistral on the same tasks: test cases, scoring rubric, shape validity, finding usefulness, hallucination risk, latency, cost, quality, recommendation.
- **`PUBLIC-DEMO-VS-SOVEREIGN.md`** — recruiter-readable comparison table:

| Dimension      | Public demo                    | Sovereign edition                |
| -------------- | ------------------------------ | -------------------------------- |
| Runtime        | Vercel                         | Scaleway                         |
| Model          | Anthropic                      | Scaleway Gen APIs / Mistral      |
| Analytics      | Amplitude EU                   | Matomo On-Premise                |
| Cache          | Upstash                        | EU-hosted Valkey/Redis           |
| Source         | GitHub                         | Forgejo canonical, GitHub mirror |
| CI/CD          | GitHub/Vercel                  | Forgejo Actions / Woodpecker     |
| Session replay | current public analytics setup | Disabled                         |
| Claim          | GDPR-aware public demo         | EU-sovereign edition             |

## Feature additions for the app

**Required for MVP:** provider abstraction · Scaleway provider · Matomo wrapper · sovereign profile config · no session replay · privacy/demo-data page or modal · data-flow docs · static fallback preserved · public demo unaffected.

**Strongly recommended:** provider metadata in response headers/debug panel (provider, model, cache state, profile) · "Sovereign mode" UI indicator · privacy choices link · AI governance notes panel · model-eval harness · privacy regression tests.

**Optional later:** Forgejo canonical migration · Woodpecker CI · Matomo dashboard screenshots · IP hashing for rate-limit keys · local model mode · direct Mistral provider · model comparison UI.

## Suggested UI additions

Status panel / footer:

```text
Deployment profile: Sovereign Edition
Runtime: EU-hosted
Model provider: Scaleway Generative APIs
Model family: Mistral / open model
Analytics: Matomo On-Premise
Session replay: Off
```

Plus a "Privacy & demo data" link and an AI-governance note: _"Generated reviews are advisory. Human review is required before using the Jira handoff output."_

## Model evaluation plan

Don't assume Scaleway/Mistral is good enough because it's sovereign-aligned. Build a small deterministic eval suite for Manifold notes, Audit/redline, Health/drift. Score per run:

| Area                   | Question                                                                    |
| ---------------------- | --------------------------------------------------------------------------- |
| Shape validity         | Does output match the expected schema?                                      |
| Repair required        | Did `repair*` need to fix it? _(measurable today — instrument `shapes.js`)_ |
| Specificity            | Findings concrete and tied to input?                                        |
| Analytics accuracy     | Catches real tracking/spec issues?                                          |
| False positives        | Invents risks?                                                              |
| GDPR/consent awareness | Identifies consent/currency/identity risks?                                 |
| Tone                   | Sounds like a governance workbench?                                         |
| Latency                | Completes within runtime constraints?                                       |
| Cost                   | Approximate token cost?                                                     |
| Failure mode           | Static fallback works when provider fails?                                  |

Output `MODEL-EVAL.md` comparing Claude/Anthropic · Scaleway Gen APIs/Mistral · Static fallback. _(The "repair required" metric is especially cheap to capture — the repair functions already exist; just count coercions per run.)_

## Privacy hardening checklist

- [ ] No Amplitude loaded in sovereign profile.
- [ ] No session replay in sovereign profile.
- [ ] Matomo events use allowlisted payload fields only.
- [ ] Prompt text is not sent to analytics.
- [ ] Generated notes/audits are not sent to analytics.
- [ ] API keys are never logged.
- [ ] BYOK disabled or clearly provider-specific.
- [ ] Cache keys do not contain raw prompts.
- [ ] Rate-limit keys have documented retention.
- [ ] IP handling is documented.
- [ ] Logs have documented retention.
- [ ] Static fallback works.
- [ ] Model provider is disclosed.
- [ ] Human review requirement is visible.
- [ ] Public demo and sovereign edition are clearly distinguished.
- [ ] README does not overclaim "fully sovereign" unless all layers are active.

## Implementation phases

### Phase 0 — Baseline audit

Understand current code paths before changing them. Inspect `api/_lib/anthropic.js`, `surface.js`, `cache.js`, `ratelimit.js`, `redis.js`, `grounding.js`, `analytics.js`, `index.html`. Confirm live-surface contracts and shape repair/tests. Confirm `cacheKey(task, opts)` carries no raw prompt. Document current public demo data flow.
**Deliverable:** `CURRENT-STACK-NOTES.md`. _(Much of this is pre-answered in the top corrections block — fold it in.)_

### Phase 1 — Provider abstraction

Remove the hard dependency from `surface.js:8` to Anthropic. Create `api/_lib/llm/index.js`; move current Anthropic logic behind the provider interface **preserving `generateJSON({groundingBlock,user,tool,maxTokens,model,userKey})`**; env-driven provider selection; keep public demo behaviour identical; smoke-check the Anthropic path; ensure static fallback still works.
**Acceptance:** public demo still works · Anthropic output shape unchanged · no UI regression · provider switchable by env · `surface.js` no longer imports `anthropic.js` directly.

### Phase 2 — Scaleway provider

Add `api/_lib/llm/scaleway.js` (OpenAI-compatible / Scaleway style). Support structured JSON output (no Anthropic tool-use — use JSON mode/function calling or schema-in-prompt + repair). Preserve timeout handling (retune the 50s Vercel abort, top block #4). Add a **Scaleway model allowlist** (top block #5). Strip Anthropic `cache_control` from the grounding block. Add provider metadata.
**Acceptance:** `SC_PROVIDER=scaleway` runs all four live surfaces · output passes existing repair/shape checks · errors degrade to static fallback · no prompt/body content logged.

### Phase 3 — Sovereign deployment profile

Add `SC_PROFILE=public|sovereign`; profile-based analytics loading, provider selection, UI status. Docs for the profiles.
**Acceptance:** public profile = existing stack · sovereign profile = Scaleway + Matomo · configs don't bleed.

### Phase 4 — Matomo analytics

Add `matomo.js` / profile-aware adapter. Keep event allowlist. Minimal operational events only. Session replay off. Matomo config via env/static. Update privacy text.
**Acceptance:** no Amplitude requests in sovereign profile · Matomo gets only allowlisted events · no prompt/generated content in analytics · privacy page accurate.

### Phase 5 — EU cache/rate limit

Redis client against EU-hosted Valkey/Redis. Document TTL, rate-limit key format, IP hashing-with-salt, no raw prompt in cache keys, intentional response caching.
**Acceptance:** cache/rate limit on EU infra · retention documented · failure mode documented.

### Phase 6 — Forgejo + CI/CD

Forgejo canonical; mirror to/from GitHub; decide canonical direction; Forgejo Actions or Woodpecker; deploy to Scaleway from EU CI/CD; document GitHub as mirror only.
**Acceptance:** sovereign deploy builds/deploys without GitHub Actions · GitHub not required for active deploy · docs distinguish canonical from mirror.

### Phase 7 — Portfolio documentation

Add `SOVEREIGN.md`, `PRIVACY.md`, `DATA-FLOW.md`, `MODEL-EVAL.md`, `PUBLIC-DEMO-VS-SOVEREIGN.md`. README sovereign section. Portfolio case-study copy.
**Acceptance:** a hiring manager understands the tradeoff in 60 seconds · no overclaim · value visible without reading source.

## Suggested README addition (Signal-Conduit repo)

```markdown
## Sovereign Edition

Signal Conduit also has a planned EU Sovereign Edition: a parallel deployment profile
designed to reduce US control-plane dependencies across runtime, model inference,
analytics, cache/rate limiting, source control, and CI/CD.

The public demo optimises for easy review and fast sharing. The sovereign edition
optimises for jurisdictional control and governance clarity.

Target sovereign stack:

- Runtime: Scaleway
- Model inference: Scaleway Generative APIs using Mistral/open models
- Analytics: Matomo On-Premise
- Cache/rate limiting: EU-hosted Valkey/Redis
- Source control: Forgejo canonical repo, GitHub mirror
- CI/CD: Forgejo Actions or Woodpecker
- Session replay: disabled
- Data posture: no prompt text, generated notes, API keys, or free-text user input in analytics

See `SOVEREIGN.md`, `PRIVACY.md`, and `PUBLIC-DEMO-VS-SOVEREIGN.md`.
```

## Suggested portfolio case framing (for fredericlabadie.com later)

```text
Signal Conduit — Sovereign Edition

A parallel EU-sovereign deployment profile for an analytics-governance workbench.
The project compares a fast public demo stack with a sovereign-oriented stack using
Scaleway runtime/model inference, Matomo On-Premise analytics, Forgejo source control,
EU-hosted cache/rate limiting, and documented data-flow boundaries.

The point is not simply to swap model vendors. It is to show how the same AI-enabled
analytics workflow changes when jurisdiction, control plane, observability, retention,
and human review are treated as product requirements.
```

## Important wording constraints

Do **not** say: "Fully GDPR compliant" · "Legally certified sovereign" · "Dutch government approved" · "EU AI Act compliant" — unless supported by legal review or certification.

Prefer: GDPR-aware · EU-sovereign-oriented · EU-control-plane-reduced · Sovereign Edition · Privacy-aware analytics instrumentation · Documented data-flow boundaries · Human-review AI workflow.

## Open questions for implementation

1. Provider abstraction in JavaScript or migrate backend lib code to TypeScript?
2. Simplest Scaleway runtime target: Serverless Containers, Instances, or Kubernetes?
3. Sovereign frontend and backend deployed together or separately?
4. Matomo on the same infra or a separate EU host?
5. IP rate-limit keys raw, truncated, or salted hashes?
6. Cache generated AI outputs in sovereign edition, or disable cache for max privacy?
7. Expose provider/model details in the UI?
8. Disable BYOK entirely in sovereign mode? _(Strong recommend: yes — top block #3.)_
9. GitHub mirror automatic or manual?
10. Include a local model mode later?

## Immediate next task for the implementing agent

```text
Review the Signal Conduit repo and produce an implementation plan for a Sovereign
Edition without changing code yet. Focus on:
1. Where Anthropic is hard-coded.        → api/_lib/surface.js:8 (single import)
2. Where Vercel assumptions exist.        → req/res shape + 60s wall (anthropic.js:47)
3. Where Amplitude is loaded.             → analytics.js (dynamic, post-consent)
4. Where Redis/Upstash assumptions exist. → api/_lib/redis.js via cache.js + ratelimit.js
5. What changes for provider abstraction.
6. What changes for Matomo On-Premise.
7. What docs to add first.
8. The smallest safe Phase 1 PR.

Do not refactor broadly. Preserve the public demo. Return a staged plan with files,
risks, and acceptance criteria.
```

_(The arrows above are pre-resolved from this doc's top corrections block — the agent can verify rather than rediscover.)_

## First PR recommendation

Safest first PR = documentation + provider-abstraction scaffolding, **not** a Scaleway deployment.

```text
PR 1: Add Sovereign Edition planning docs and provider abstraction skeleton
```

Files: `SOVEREIGN.md`, `PRIVACY.md`, `DATA-FLOW.md`, `PUBLIC-DEMO-VS-SOVEREIGN.md`, `api/_lib/llm/index.js`, `api/_lib/llm/anthropic.js`.

Goal: move current Anthropic implementation behind the provider interface; behaviour unchanged; docs define the target sovereign stack; no Scaleway deploy yet.

**Acceptance:** public demo still works · `shapes.js` tests still pass · `surface.js` no longer imports `anthropic.js` directly · README links `SOVEREIGN.md` · no claim says "fully sovereign" before the alternative stack exists.

## Final principle

This project demonstrates that AI architecture is not only about model quality. It is about: where data flows · who controls the runtime · who controls source and deployment · what analytics are collected · how long data is retained · what happens on failure · how human review stays in the loop · how claims are bounded and evidenced. Signal Conduit Sovereign Edition makes that visible.
