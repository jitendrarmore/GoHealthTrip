# GoHealthTrip Platform

> **Production-Grade International Medical Tourism Platform Headquartered in New Delhi, India.**

GoHealthTrip coordinates the complete cross-border journey for international patients seeking specialized, accredited healthcare in India (JCI, NABH).

---

## ⚠️ Clinical Boundary Disclaimer
GoHealthTrip is strictly an administrative facilitation and healthcare travel coordination platform. It is **NOT** a medical diagnosis engine and never independently diagnoses, prescribes, guarantees treatment outcomes, or replaces a registered medical practitioner (RMP).

---

## 📚 Complete Platform Specifications & Documentation

| Document | Description |
|---|---|
| **[01. System Architecture](./docs/01_ARCHITECTURE.md)** | Modular Clean Architecture, Hexagonal Ports & Adapters, Edge Security, DPDP 2023 / ABDM. |
| **[02. Product Requirements Document (PRD)](./docs/02_PRD.md)** | 14 Primary Actors, Core Modules (A through AB), Country Configuration Schema. |
| **[03. Domain Model & Ubiquitous Language](./docs/03_DOMAIN_MODEL.md)** | Aggregate Roots, Entities, Value Objects, Domain Events. |
| **[04. Database Schema & ERD](./docs/04_DATABASE_ERD.md)** | PostgreSQL Schema, Indexes, Foreign Keys, Encryption & Audit Logs. |
| **[05. API Contract & OpenAPI Specification](./docs/05_API_CONTRACT.md)** | RESTful API Endpoints, Idempotency, Standard Error Envelopes. |
| **[06. RBAC & ABAC Access Control Matrix](./docs/06_RBAC_MATRIX.md)** | Granular Permission Mapping & Object-Level Patient Isolation (IDOR Defense). |
| **[07. Medical Case State Machine](./docs/07_STATE_MACHINES.md)** | Deterministic 28-Stage FSM with Transition Guards & Audit Logging. |
| **[08. Project Roadmap & Monorepo Structure](./docs/08_PROJECT_ROADMAP_STRUCTURE.md)** | Monorepo layout, MVP Scope, Phase 2, and Phase 3 roadmaps. |
| **[09. Security Review & Threat Model](./docs/09_SECURITY_REVIEW_AND_THREAT_MODEL.md)** | STRIDE Threat Model, Data Classification, Anti-Malware Upload Pipeline, DPDP Act 2023. |
| **[10. Comprehensive Product Audit Report](./docs/10_PRODUCT_AUDIT_REPORT.md)** | 10-Stakeholder Evaluation (Patient, Coordinator, Doctor, Hospital IPD, Finance, Admin). |

---

## 🧭 Live Web Interfaces & Portals

- **🏠 Patient Home**: [`/`](http://localhost:3000)
- **🔍 Find Treatment & Cost Catalog**: [`/find-treatment`](http://localhost:3000/find-treatment)
- **🏥 Accredited Hospitals & Specialists Directory**: [`/hospitals`](http://localhost:3000/hospitals)
- **📝 8-Step Patient Onboarding Wizard**: [`/start-journey`](http://localhost:3000/start-journey)
- **📊 Interactive Patient Case & Timeline Dashboard**: [`/my-case`](http://localhost:3000/my-case)
- **🌟 Live Demo Case Journey (Ali Al-Balushi - CABG)**: [`/demo-case`](http://localhost:3000/demo-case)
- **🎛️ Operations Command Center (14 KPIs & Task Queue)**: [`/dashboard`](http://localhost:3000/dashboard)
- **💼 Coordinator Case Workspace**: [`/dashboard/cases/GHT-2026-OMN-0101`](http://localhost:3000/dashboard/cases/GHT-2026-OMN-0101)
- **⚡ Hospital Integration Gateway (FHIR R4 / REST)**: [`/dashboard/hospital-gateway`](http://localhost:3000/dashboard/hospital-gateway)
- **📖 OpenAPI 3.0 Specification Endpoint**: [`/api/v1/openapi`](http://localhost:3000/api/v1/openapi)

---

## 🛠️ Technology Stack
- **Framework**: Next.js 15 (App Router), React 19, TypeScript
- **Database & ORM**: PostgreSQL 16+ with Prisma ORM 5.22
- **Styling**: TailwindCSS 4, Lucide Icons
- **Security & Crypto**: `jose` (JWT), `bcryptjs`, AES-256 KMS Envelope Encryption
- **CI/CD**: GitHub Actions (`.github/workflows/ci.yml`)
- **Hosting Target**: Vercel (Edge / Serverless Node.js Runtime)

---

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Generate Prisma client & validate schema
npx prisma generate
npx prisma validate

# 3. Seed Demo Data (Accredited Hospitals, Doctors, Countries, Demo Journey)
npm run db:seed

# 4. Run Development Server
npm run dev

# 5. Build for Production
npm run build
```
