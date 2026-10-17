# MOVIA — Understand Movement
### The Intelligence Layer Behind Every Journey

> A concept developed through the Tsinghua Global SDG Case Competition, based on field research along National Road 6A, Phnom Penh.
> **Tagline:** *Every journey teaches the city.*

---

## 1. The Problem

**Scenario:** Every morning, an electric motorcycle rider stops at a charging hub on National Road 6A, unsure whether the charger is working. Before deciding where to go, he checks multiple Facebook groups for updates — information that is often outdated or wrong. Every wrong decision costs fuel, time, income, and confidence.

**Core insight:**
> Cambodia does not lack EV demand. It lacks trustworthy mobility information.

**Field evidence (rider interview, National Road 6A):**
Switching to an electric motorcycle cut daily fuel costs by more than 70%, but charging remains stressful — riders check several Facebook groups daily just to find working chargers, and want one reliable system instead.

### The Mobility Gap — Three Barriers
| Barrier | Description |
|---|---|
| ⚡ Charging Uncertainty | No shared network shows real-time charger availability |
| 📡 Fragmented Information | Traffic, charging, rider behavior, and infrastructure data exist separately across organizations |
| ⚠️ Compounded Risk | Congestion, unsafe roads, and charging uncertainty multiply each other |

**Root cause:** Not a technology gap — an **information trust gap**.

---

## 2. Why Now

- **EV Growth:** Registered EVs grew from **1,614 (June 2024)** to **14,534 (February 2026)**, including 3,449 electric motorcycles.
- **National Target:** 720,000 electric motorcycles by 2030.
- **Climate Commitment (Cambodia's NDC 3.0):** 41.7% emissions reduction by 2030; up to 55% by 2035.
- **Opportunity:** Infrastructure is growing — but the intelligence layer connecting it all is missing.

---

## 3. The Missing Layer

Most mobility platforms answer *"How do I get there?"*
**MOVIA answers:** *"What is happening across the mobility system?"*

MOVIA transforms fragmented movement into shared intelligence through a five-stage loop:

**Observe → Understand → Explain → Predict → Guide**

> The charger is Version 1. Understanding movement is the vision.

---

## 4. MOVIA Version 1 — Live Charging Intelligence

| Moment | Function |
|---|---|
| **Morning** | See nearby chargers: Available / Occupied / Broken |
| **Travel** | Recommended route, charging stop, safety considerations |
| **Contribute** | One-tap: confirm charger, report hazard, share checkpoint |
| **Understand** | Daily dashboard: time saved, fuel saved, safety score |

> Every trip anonymously strengthens the mobility network.

---

## 5. Competitive Positioning

| Player | Focus |
|---|---|
| Google Maps | Optimizes navigation |
| Grab | Optimizes jobs |
| Charging Apps | List charging stations |
| Government | Builds infrastructure |
| **MOVIA** | **Connects everything into one trusted intelligence layer** |

---

## 6. Intelligence Layer / Ecosystem

**Center:** MOVIA
**Connected stakeholders:** Motorcycle riders, delivery riders, charging stations, road infrastructure, traffic, weather, telecom, banks, insurance, universities, government, EnergyLab, MPWT, citizens

**Result:** Everything becomes → **Better Decisions**

---

## 7. Why MOVIA Can Exist Now

- **Research:** Built from Tsinghua SDG fieldwork
- **Community:** Existing relationships through CADT, EnergyLab, government, and the delivery ecosystem
- **Technology:** Lightweight, crowdsourced model — no expensive hardware required
- **Policy alignment:** Supports NDC 3.0, National EV Policy, Digital Government, and Smart Cities initiatives
- **Trust:** Built *with* riders, not simply *for* riders

---

## 8. Go-To-Market Roadmap

| Phase | Description |
|---|---|
| **Phase 0 — Concierge** | Telegram + Google Forms + manual charger map |
| **Phase 1 — 100 Riders** | Pilot on National Road 6A (food delivery + motorcycle taxis) |
| **Phase 2 — Mobile App** | Live charger status, route guidance, safety reporting |
| **Phase 3 — Institution Dashboard** | Charging operators, fleet companies, banks, government |
| **Phase 4 — Mobility Intelligence Platform** | Infrastructure planning, climate reporting, urban mobility insights |

---

## 9. Measuring Success (Pilot — 100 Riders)

- **Weekly Active Users:** 60%
- **Daily Reports:** Charging, hazards, routes
- **Key Outcomes:** Less waiting, less uncertainty, more confidence, better planning
- **Long-term Goal:** Support Cambodia's mobility transition through evidence-based decision-making

---

## 10. Team Structure

Five roles forming one continuous learning loop: **Observe → Understand → Explain → Design → Improve**

| Role | Focus |
|---|---|
| Founder | Systems architecture, vision, research, policy |
| Software Engineer | Platform, backend, mobile |
| Mobility Intelligence Lead | GIS, research, data analytics |
| Community & Storytelling Lead | Education, user trust, content |
| Partnership & Growth Lead | Government, universities, delivery platforms, industry |

---

## 11. The Road Ahead

- **Today:** Helping one rider find one charger.
- **Tomorrow:** Helping Cambodia understand how people move.
- **Vision:** One corridor. One community. One intelligence layer.

**Looking for:** Partners, pilot riders, charging operators, delivery platforms, researchers, government, investors.

> Every journey teaches the city.

---

## Appendix A — Policy Alignment

**National Policy on the Development of Electric Vehicles 2024–2030**
- National target of 720,000 electric motorcycles by 2030
- Expansion of charging infrastructure
- Development of EV monitoring and data systems

**Cambodia NDC 3.0**
- 41.7% emissions reduction by 2030; up to 55% by 2035
- Sustainable transport identified as a priority sector

**National Energy Efficiency Policy (NEEP) 2022–2030**
- Improve national energy efficiency by at least 19% by 2030
- Promote data-driven energy management
- Support electrification and efficient transport systems

**SDG Alignment:** SDG 3 (Health), SDG 7 (Clean Energy), SDG 9 (Industry & Infrastructure), SDG 11 (Sustainable Cities), SDG 13 (Climate Action), SDG 17 (Partnerships)

---

## Appendix B — Research Methodology

- Literature review of Cambodia's EV Policy, NDC 3.0, and NEEP 2022–2030
- Field observation along National Road 6A
- Semi-structured interviews with EV riders
- Policy analysis and stakeholder mapping
- Systems thinking approach (informed by Donella Meadows, Vaclav Smil, Buckminster Fuller)
- Design Thinking framework for iterative solution development

---

## Appendix C — Product Architecture (MOVIA V1.0 MVP Guideline)

**North Star:** *Understand Movement. Guide Better Journeys.*

**What the first product is NOT:** Google Maps, Waze, Grab
**What it IS:** The trusted mobility companion for EV riders.

### Version Roadmap

#### V0 — Concierge MVP (0–1 Month)
No coding. Validate rider behavior first.
- **Telegram Community** ("NR6A EV Riders") for live charger status, road hazards, flooding, accidents, broken chargers
- **Google Form** capturing: Location, Type (Charger/Flood/Traffic/Accident/Hazard), Status (Working/Busy/Broken), optional Photo, automatic Timestamp
- **Live Google Map** manually updated with status icons (🟢 Working, 🟡 Busy, 🔴 Broken, ⚠ Flood, 🚧 Construction)
- **Success Metric:** 100 riders, 30 daily reports, 10 daily active users → signals product-market fit

#### Version 1 — MVP App

**Ship scope is two features, not six.** Feature 1 is the killer feature; Feature 2 is nearly free because it reuses the same reporting and confidence pipeline. Everything else is deferred until Feature 1 demonstrably works. Shipping six features would contradict the discipline that makes V0 credible.

Simple, single-glance home screen: greeting, nearest charger status, weather, fuel saved, time saved.

**Feature 1 — Live Charger Intelligence** *(killer feature — V1)*
Nearby chargers shown with status, confidence, and age of last signal (see Appendix G), plus distance, price, charging speed, open hours, navigate option. Users verify status with a single tap (Working/Busy/Broken) in ~2 seconds. Status is never displayed without its freshness — an unconfirmed charger reads **Unknown**, not Available.

**Feature 2 — Road Alerts** *(V1 — shares Feature 1's pipeline)*
Report: Flood, Construction, Accident, Traffic, Police, Road Damage, Animals, Broken Traffic Light, Blocked Road. Tap → submit → visible to other users, carrying the same confidence and decay rules as charger status.

**Minimal Profile** *(V1 — stub only)*
Vehicle model and battery capacity. Nothing else. These two fields are the minimum required for Feature 4 later.

---

##### Deferred — build only after Feature 1 holds up in the pilot

**Feature 3 — Trip Planner** *(V1.5)*
Input destination → MOVIA suggests fastest, safest, lowest battery usage, or fewest hazards route, including charging stops along the way. Philosophy: optimize for "Best Journey," not just shortest distance. Requires routing and hazard-weighting infrastructure that does not exist at V1.

**Feature 4 — Battery Assistant** *(V2 — needs battery modelling)*
Input current battery % → MOVIA predicts whether destination is reachable, whether charging is needed, recommended charger, estimated remaining battery, and weather/elevation/traffic impact. Future: battery degradation tracking, charging history, battery health.

**Feature 5 — Journey Dashboard** *(V1.5 — retention lever)*
Daily and monthly stats: distance, money saved, fuel equivalent, CO₂ avoided, time saved, hazards avoided, safety score — presented like a "Spotify Wrapped" style summary. Deferred deliberately: at V1 the reward for contributing is that chargers are accurate. Add the dashboard once there is retention worth compounding.

**Full Profile** *(V1.5)*
Charging preference, favorite chargers, driving style, emergency contact, insurance.

#### Version 2 — Mobility Layer
Shift from helping one rider to helping everyone:
- **Heatmaps:** traffic, hazards, charging demand, flooding, congestion, unsafe roads
- **Predictions:** busy charging hours, flood probability, traffic, battery demand
- **Recommendations:** where to build chargers, repair roads, add traffic lights

#### Version 3 — Institution Dashboard
New customer base: government, fleets, banks, insurance.
Dashboard covers: EV growth, charging demand, road safety, congestion, carbon reduction, energy consumption, travel time, peak hours, demand forecast → becomes **MOVIA Intelligence**.

#### Version 4 — Mobility OS
Full ecosystem integration: Citizens → Road Sensors → Traffic Cameras → Telecom → Charging Stations → Ride-hailing → Government → MOVIA → **Urban Intelligence**.

> Eventually, MOVIA stops being an app. It becomes Cambodia's mobility intelligence layer — exactly like Google Maps became the Google Mobility Platform.

---

## Appendix D — User Flows

**Opening App:** Open → Home → Nearby Chargers → Status → Navigate → Arrive → Charge → Confirm Status → Journey Complete → Dashboard Updated

**Reporting Flow:** See hazard → Tap + → Choose type (Flood/Traffic/Accident/Broken Charger) → Optional photo → Submit → Map updated → Community benefits

**Navigation Flow:** Destination → Battery % → Weather → Traffic → MOVIA Analysis → Recommended Route → Charging Stop → Safe Arrival

**Information Architecture:**
```
HOME
├── Nearby Chargers
├── Route Planner
├── Road Alerts
├── Battery
├── Dashboard
└── Profile
```

**Data Flow:**
```
Users → Crowdsourced Reports → Validation → Verified Layer
→ Live Map → Analytics Engine → Government Dashboard → Infrastructure Planning
```

---

## Appendix E — Team Sprint Plan (MVP Build)

| Sprint | Goal | Output |
|---|---|---|
| 1 | Validate problem | Telegram + Google Map + Google Form |
| 2 | UX research | Rider interviews + wireframes |
| 3 | UI design | Figma prototype |
| 4 | Mobile MVP | Flutter/React Native build |
| 5 | Pilot | 100 riders on NR6A |
| 6 | Measure | Retention, reports, trust metrics |
| 7 | Iterate | Improve based on feedback |
| 8 | Prepare partnerships | MPWT, EnergyLab, delivery platforms |

---

## Appendix F — Architectural Philosophy

**Key strategic insight:** Don't think of MOVIA as an app with features. Think of it as a **five-layer intelligence system**:

1. **Observe** — Collect signals (charger status, hazards, traffic, weather, rider reports)
2. **Understand** — Turn raw data into patterns and explain what's happening
3. **Explain** — Present clear, actionable insights to riders and stakeholders
4. **Predict** — Forecast congestion, charging demand, battery needs, and risk
5. **Guide** — Recommend the best decisions for individuals and eventually for cities

This progression is difficult to copy because it functions as a philosophy as much as a product roadmap, echoing systems thinkers Donella Meadows (feedback loops), Vaclav Smil (infrastructure perspective), and Buckminster Fuller (design science). As the platform matures, every new feature should strengthen one of these five layers rather than exist in isolation.

---

## Appendix G — Trust & Validation Model

**The objection this answers:** MOVIA claims to close an information *trust* gap using crowdsourced data — which is itself trust-dependent. Left undefined, the thesis is circular. This appendix defines the mechanism.

**Governing principle:** *MOVIA earns trust by being honest about uncertainty.* Existing sources show confident, stale information. MOVIA shows confidence **and** age. A product built to solve a trust gap must visibly refuse to overclaim — that refusal is the product, not a limitation of it.

### 1. Every status carries confidence and age
Never display "Available." Always display **"Available — confirmed 12 min ago, 3 riders."**

| State | Meaning |
|---|---|
| **Confirmed** | 2+ independent signals within the freshness window |
| **Reported** | 1 signal — shown, but marked single-source |
| **Unknown** | Decayed; no recent signal. Shown as Unknown, never as Available |
| **Offline** | Reported broken |

### 2. Freshness decay
Confidence decays with time since last signal. The decay rate is per-charger, tuned to observed volatility: a busy urban charger goes stale in minutes, a low-traffic rural one holds longer. Past threshold, status becomes **Unknown**. Decayed data is never presented as live.

### 3. Corroboration over volume
Two independent agreeing reports outweigh five reports from one rider.

### 4. Reporter weight
Riders whose reports are later corroborated gain weight; those repeatedly contradicted lose it. This resists casual abuse without moderation staff, and costs nothing to compute.

### 5. Passive signals — the density solution
A trip that ends at a charger with a 15+ minute dwell is implicit evidence the charger works. **No tap required.** This is the most important mechanism in this appendix: most riders will never tap, but every rider charges. Active reporting alone cannot produce the signal density Feature 1 needs; passive signals can.

### 6. Operator channel
Charging operators get a free status dashboard and self-report uptime. This supplies ground truth *and* gives operators their own reason to participate — they want riders to arrive. Operator reports carry high weight but still decay.

### Cold-start: density per charger, not total users
The metric that matters is **signals per charger per day**, not user count. This is why the pilot deliberately concentrates 100 riders on a single corridor rather than spreading them across Phnom Penh.

- **To verify in Sprint 1:** count of active chargers on NR6A against 100 riders. Target ≥3 signals per charger per day.
- **During pilot:** remaining gaps filled by concierge (manual check) and the operator channel.
- **When neither is available:** the status reads Unknown. That is the honest fallback, and it is acceptable.

### What this actually makes defensible
Not "connecting everything into one layer" — anyone can claim that, and Google Maps already lists charging stations. The moat is local and compounding: a Khmer-language rider community on a specific corridor, reporter-reputation data that transfers nowhere else, and direct operator relationships.

Google Maps can show you where a charger is. It cannot show you that a rider you trust confirmed it eight minutes ago.
