# GoHealthTrip Platform

> **Production-grade international medical tourism platform headquartered in India.**

GoHealthTrip coordinates the end-to-end patient journey for international patients traveling to India for medical treatment across accredited hospitals (JCI, NABH).

---

## ⚠️ Clinical Disclaimer
The platform is **NOT** a medical diagnosis engine and must never independently diagnose, prescribe, guarantee treatment outcomes, or replace a registered medical practitioner. All medical evaluations, recommendations, and procedures are performed by qualified registered doctors and accredited hospitals in India.

---

## 📚 Platform Architecture & Specifications
Comprehensive documentation and system specifications are located in [`docs/`](./docs):

- **[01. System Architecture](./docs/01_ARCHITECTURE.md)**: Modular Clean Architecture, Ports & Adapters, Edge Security, and Compliance (DPDP 2023, ABDM).
- **[02. Product Requirements Document (PRD)](./docs/02_PRD.md)**: 14 Primary Actors, Core Modules (A through AB), and Country-specific Engine.
- **[03. Domain Model & Ubiquitous Language](./docs/03_DOMAIN_MODEL.md)**: Aggregate roots, entities, value objects, and domain events.
- **[04. Database Schema & ERD](./docs/04_DATABASE_ERD.md)**: Complete PostgreSQL entity relationship diagram, indexing, encryption, and auditability.
- **[05. API Contract & Specification](./docs/05_API_CONTRACT.md)**: RESTful API contracts, idempotency, and error handling standard.
- **[06. RBAC & ABAC Access Control Matrix](./docs/06_RBAC_MATRIX.md)**: Role permissions and object-level patient isolation safeguards.
- **[07. Medical Case State Machine](./docs/07_STATE_MACHINES.md)**: 28-stage deterministic state machine with strict transition guards and audit logging.
- **[08. Project Roadmap & Repository Structure](./docs/08_PROJECT_ROADMAP_STRUCTURE.md)**: Monorepo layout, MVP, Phase 2, and Phase 3 scope.

---

## 🧭 Complete Patient Journey
1. **Discovery & Registration**
2. **Identity & KYC Verification**
3. **Medical Document Upload & AI Extraction**
4. **Clinical Review by Medical Team**
5. **Hospital & Doctor Structured Matching**
6. **Preliminary Estimates & Hospital Quotation**
7. **Treatment Proposal & Patient Consent**
8. **Platform Payment & Billing**
9. **Medical Visa (MED & MED-X) Coordination**
10. **Flight, Hotel & Airport Transfer Logistics**
11. **Hospital Inpatient Admission & Surgery**
12. **Discharge & Hotel Post-Op Recovery**
13. **Return Travel & Tele-Consultation Follow-Up**

---

## 🛠️ Tech Stack (Target Architecture)
- **Frontend**: Next.js 15 (App Router), React 19, TailwindCSS, TypeScript
- **Backend**: Node.js / TypeScript (Clean Architecture / Hexagonal Ports & Adapters)
- **Database**: PostgreSQL 16+ with Row-Level Security (RLS) & Prisma ORM
- **Cache / Locks**: Redis (Distributed locks, session, idempotency)
- **Object Storage**: AWS S3 + KMS Envelope Encryption & ClamAV virus scanning
- **Security & Privacy**: Zero-Trust Gateway, DPDP 2023, ABDM Ready
