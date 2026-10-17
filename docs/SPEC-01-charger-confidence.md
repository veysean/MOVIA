# SPEC-01 — Charger Status & Confidence Engine

**Status:** Draft for review
**Implements:** Appendix G (Trust & Validation Model), Feature 1, Feature 2
**Depends on:** nothing — this is the foundation layer

Feature 2 (Road Alerts) reuses this engine unchanged; only the entity being observed differs. Build this once.

---

## 1. Data model

### `charger`
| Field | Type | Notes |
|---|---|---|
| `id` | uuid | |
| `lat`, `lng` | float | |
| `operator_id` | uuid, nullable | links to operator channel |
| `connector_type` | enum | |
| `power_kw` | float | |
| `price_per_kwh` | decimal, nullable | |
| `open_hours` | jsonb | |
| `volatility_score` | float | learned; drives decay half-life (§3) |

### `signal` — append-only, never updated or deleted
| Field | Type | Notes |
|---|---|---|
| `id` | uuid | |
| `charger_id` | uuid | |
| `rider_id` | uuid, nullable | null for operator/concierge |
| `type` | enum | `TAP` \| `DWELL` \| `OPERATOR` \| `CONCIERGE` |
| `observation` | enum | `WORKING` \| `BUSY` \| `BROKEN` |
| `created_at` | timestamptz | |
| `reporter_weight_at_creation` | float | **snapshot**, not a live join |
| `trip_id` | uuid, nullable | for `DWELL` provenance |

Two decisions worth defending:

**Append-only.** Confidence is always *derived*, never stored as truth. This gives a real audit trail and lets you recompute history when the algorithm improves. For a product whose entire thesis is trustworthy information, the ability to answer "why did you tell me this charger worked?" is not optional.

**Weight snapshotting.** A signal carries the reporter's weight *at the time it was made*. Recomputing retroactively would silently rewrite past confidence values and make the audit trail meaningless.

### `rider`
| Field | Type | Notes |
|---|---|---|
| `id` | uuid | |
| `reputation_weight` | float | clamped `[0.1, 2.0]`, starts at `1.0` |
| `corroborated_count` | int | |
| `contradicted_count` | int | |

### `charger_status` — derived cache, not source of truth
`charger_id`, `state`, `confidence`, `last_signal_at`, `distinct_sources_in_window`, `computed_at`

Safe to drop and rebuild from `signal` at any time.

---

## 2. Signal type weights

| Type | Weight | Rationale |
|---|---|---|
| `CONCIERGE` | 2.0 | manually verified by the team during pilot |
| `OPERATOR` | 1.5 | ground truth, but can be self-serving or stale |
| `TAP` | 1.0 | deliberate rider action |
| `DWELL` | 0.7 | implicit — weaker individually, far more numerous |

`DWELL` is weighted lowest per signal and still expected to dominate total evidence by volume. That is the intended design: it is the mechanism that makes density achievable (Appendix G §5).

---

## 3. Decay

```
decay(age) = exp(-age_minutes / half_life_minutes)
half_life = clamp(90 / volatility_score, 20, 360)   # default volatility_score = 1.0
```

A busy urban charger flips state often, earns a high volatility score, and goes stale in ~20–30 minutes. A quiet rural one holds for hours. Seed every charger at `1.0` and learn volatility from observed state-flip frequency after the pilot has data — do **not** hand-tune per charger.

---

## 4. Confidence

Take all signals for a charger within a 6-hour lookback. For each:

```
contribution = reporter_weight_at_creation × type_weight × decay(age)
```

Group by `observation`, sum contributions per group:

```
winner        = observation with the highest sum
evidence      = sum of contributions for winner
agreement     = evidence / (sum of all contributions)
confidence    = agreement × (1 - exp(-evidence / 1.5))
```

The second term is the part that matters. Agreement alone would score a single unopposed report as `1.0` — perfectly confident on one data point. The saturating factor means confidence approaches agreement only as real evidence accumulates. `k = 1.5` puts roughly two independent taps at ~74% of the agreement ceiling; tune against pilot data.

---

## 5. State derivation

| State | Condition |
|---|---|
| `UNKNOWN` | no signal in window, **or** `confidence < 0.25` |
| `OFFLINE` | winner = `BROKEN` and `confidence ≥ 0.40` |
| `CONFIRMED` | winner = `WORKING`, `distinct_sources ≥ 2`, `confidence ≥ 0.50` |
| `REPORTED` | winner = `WORKING`, single source |
| `BUSY` | winner = `BUSY`, thresholds as `WORKING` |

**The asymmetry is deliberate.** `BROKEN` clears at 0.40 while `WORKING` needs 0.50 and two sources. A rider stranded at a dead charger is a far worse outcome than a rider who skips a working one. The engine fails toward caution.

`UNKNOWN` is a first-class state and must render as "Unknown — last seen 4h ago," never as a blank or an optimistic default.

---

## 6. Reporter weight update

When a signal is later corroborated or contradicted by a *different* source within the window:

```
delta  = (corroborated_count - contradicted_count) / sqrt(max(total_count, 1))
weight = clamp(1.0 + 0.1 × delta, 0.1, 2.0)
```

The `sqrt` damping stops a high-volume reporter from dominating. The `[0.1, 2.0]` clamp means no single rider — honest or malicious — can ever swing a charger's state alone. New riders start at `1.0` with no penalty.

---

## 7. Deriving `DWELL` signals

Emit `DWELL` / `WORKING` when **all** hold:
- trip endpoint within **30 m** of a known charger (GPS tolerance)
- stationary **≥ 15 minutes**
- rider's vehicle is an EV per profile

**Do not** infer `BROKEN` from a short stop. A rider who arrives and leaves in two minutes may have checked the price, found a queue, or taken a call. Emit no signal rather than a wrong one — over-inference is exactly the failure mode this product exists to fix.

**Privacy:** derive dwell on-device and upload only `(charger_id, observation, timestamp)`. Never the trip trace. The pitch promises trips strengthen the network *anonymously*; this is where that promise is either kept or broken.

---

## 8. Open questions — need your input

1. **Lookback window (6h)** — is a charger confirmed 5 hours ago still useful to a Phnom Penh rider, or should this be 3h?
2. **Dwell threshold (15 min)** — what is a realistic minimum charge session for an e-moto on NR6A? If typical sessions are 45+ min, raise it and cut false positives.
3. **Operator trust** — should an operator marking their own charger `WORKING` be capped below a rider `CONFIRMED` state? There is an obvious incentive to overstate uptime.
4. **Sprint 1 coverage math** — how many active chargers on NR6A? This determines whether ≥3 signals/charger/day is achievable with 100 riders, and it is the single number that decides whether Feature 1 works at pilot scale.

---

## 9. What this does not cover

Routing, battery modelling, and hazard weighting (Features 3–4, deferred to V1.5/V2). Road Alerts reuse §§1–6 with `observation` swapped for alert type and a shorter half-life — flooding clears faster than a charger gets repaired.
