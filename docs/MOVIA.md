# MOVIA — Cambodia's Mobility Intelligence Platform
**Tagline:** *Every journey teaches the city.*  
**Vision:** Transform fragmented mobility information into trusted intelligence that empowers citizens, businesses, and governments to make safer, smarter, and more sustainable movement decisions.

---

## 1. Problem Statement

### Daily Scenario
At 7:00 AM, an electric motorcycle rider arrives at a charging station. He wonders:  
*"Is the charger working today?"*  

He checks Google Maps, Facebook groups, and Telegram chats — but the information is incomplete, outdated, or contradictory. Every wrong decision costs **time, fuel, income, and confidence**.

### Core Insight
Cambodia does not lack EV demand. It lacks **trustworthy mobility information**.

### Pain Points
- **EV Riders:** Need reliable charging info, safer routes, reduced uncertainty.  
- **EV Commuters & Owners:** Manual, unreliable trip planning; charging anxiety discourages adoption.  
- **Operators & Institutions:** Fragmented data, difficult to prioritize investments and policies for green urban development.

### Barriers
| Barrier | Description |
|---|---|
| ⚡ Charging Uncertainty | No shared network shows real-time charger availability |
| 📡 Fragmented Information | Traffic, charging, rider behavior, and infrastructure data exist separately |
| ⚠️ Compounded Risk | Congestion, unsafe roads, and charging uncertainty multiply |

---

## 2. Why Now

- **EV Growth:** 313 EVs (2023) → 10,568 (2025) → 14,534 (Feb 2026).  
- **National Target:** 720,000 electric motorcycles + 30,000 cars by 2030.  
- **Climate Commitment:** 41.7% emissions reduction by 2030; up to 55% by 2035.  
- **Mobility Risk:** 18.8 road deaths per 100k (2023), above Asia-Pacific averages.  
- **Gap:** No localized platform for Cambodian safety, flooding, or EV needs.

---

## 3. Proposed Solution

### Core Hypothesis
If people receive **trustworthy mobility intelligence at the moment they need it**, they will make better travel decisions. Everything else — carbon reporting, insurance, dashboards, AI — follows downstream.

### Three Products
1. **Live Mobility Intelligence Feed** — hazards, floods, closures, chargers, verified in one view.  
2. **Intelligent Journey Assistant** — actionable recommendations (e.g., “leave in 18 minutes, use Road B, charger at AEON is available”).  
3. **Mobility Intelligence Dashboard** — government, businesses, utilities, insurers.

---

## 4. Product Pyramid

| Layer | Product | Value |
|---|---|---|
| 4 | Mobility Intelligence Platform | Revenue (Gov, Utilities, Insurance) |
| 3 | Journey Intelligence AI | Stickiness |
| 2 | Live Hazard & Charging Feed | Daily value |
| 1 | Community Reports | Trust |

---

## 5. MVP

- **Report a hazard**  
- **Verify a hazard**  
- **Receive hazard alerts**  

Pilot: 100 riders on NR6A corridor. Target ≥3 signals per charger/day.

---

## 6. Intelligence Architecture

### Design Principles
1. Collect only what improves decisions.  
2. Privacy by design — raw location is never the product.  
3. Crowdsourced first, official second.  
4. Partnership over replacement.  
5. One decision per feature.

### System Flows
- **Data:** GPS, citizen reports, partner feeds, public records.  
- **Intelligence:** Fused into scored insights via Intelligence Graph.  
- **Decisions:** Citizens, businesses, governments act with confidence.

### Intelligence Graph Layers
- Human (experience)  
- Mobility (movement)  
- Infrastructure (performance)  
- Sustainability (impact)  
- Energy (efficiency)

---

## 7. Charger Confidence Engine (SPEC-01)

### Data Model
- **Signals:** Append-only, never updated or deleted.  
- **Confidence:** Derived from reporter weight, signal type, and decay.  
- **States:** UNKNOWN, OFFLINE, CONFIRMED, REPORTED, BUSY.  

### Decay Model
Busy chargers stale in ~20–30 min; rural chargers hold longer. Confidence decays with time since last signal.

### Reporter Reputation
- Corroboration increases weight.  
- Contradiction decreases weight.  
- Clamp between 0.1 and 2.0 to prevent domination.

### Passive Signals
- **DWELL:** Inferred from charging sessions ≥15 min.  
- Privacy preserved — only charger ID and timestamp uploaded.

### Operator Channel
Operators self-report uptime. Weighted highly but still decays.

---

## 8. Business Model

**B2C2B2G — users never pay. Institutions do.**

| Layer | Who Pays | What They Buy |
|---|---|---|
| Community | No one | Trust & data density |
| Live Feed | Charging/repair partners | Referral fees, demand forecasting |
| Journey AI | Insurers, fleets, businesses | Risk scoring API, dashboards |
| Dashboard | Government, businesses | ESG dashboards, urban planning |

---

## 9. Market Opportunity

- **Cambodia:** 17M population, 3–5M urban commuters, 2.5M Phnom Penh (beachhead).  
- **Regional Expansion:** Laos, Myanmar, Vietnam — similar two-wheeler dominance, same intelligence gap.

---

## 10. Roadmap

1. Foundation — Crowdsourcing  
2. Connectivity — Partners  
3. Coordination — Emergency  
4. Intelligence — Government  
5. Prediction — AI  
6. Infrastructure — Digital Twin  

---

## 11. Team

- **Veysean Kem** — Product & Technology Lead  
- **Kheankeo Babera** — Intelligence & Infrastructure Lead  
- **Sovannita Yim** — Strategy, Policy & System Lead  
- **Sokunmealea Soy** — Partnerships, Sales & Marketing Lead  
- **Noucheav Phorn** — Media & Communications Lead  

---

## 12. Policy Alignment

- **National EV Policy 2024–2030** — 720,000 motorcycles target.  
- **Cambodia NDC 3.0** — 41.7% emissions reduction by 2030.  
- **National Energy Efficiency Policy 2022–2030** — 19% efficiency improvement.  
- **SDG Alignment:** SDG 3, 7, 9, 11, 13, 17.

---

## 13. Research Methodology

- Literature review of EV policy, NDC 3.0, NEEP.  
- Field observation along NR6A.  
- Rider interviews.  
- Policy analysis & stakeholder mapping.  
- Systems thinking + design thinking frameworks.

---

## 14. Closing Vision

- **Today:** Helping one rider find one charger.  
- **Tomorrow:** Helping Cambodia understand how people move.  
- **Future:** MOVIA becomes Cambodia’s **mobility intelligence layer**, not just an app.

> Every journey teaches the city.
