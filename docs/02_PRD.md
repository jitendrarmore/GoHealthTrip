# Product Requirements Document (PRD) — GoHealthTrip

## 1. Product Mission & Boundaries

GoHealthTrip is an enterprise-grade medical tourism coordination platform headquartered in India. Its goal is to make cross-border healthcare navigation transparent, predictable, clinically validated, and culturally compassionate for international patients traveling to India.

### 1.1 Legal & Clinical Guardrails
1. **No Autonomous Clinical Diagnosis**: The platform will never diagnose symptoms, prescribe medication, or give unsolicited medical advice.
2. **Human-in-the-Loop Clinical Review**: All medical records and treatment options are validated and approved by qualified Care Coordinators, Medical Reviewers, and licensed hospital doctors in India.
3. **Transparent Financial Boundaries**: Clear demarcation between platform facilitation fees, hospital treatment costs (paid directly or through regulated escrow/remittance mechanisms), and third-party logistics (flights, hotels, transport).

---

## 2. Primary Platform Actors

| Actor | Role Summary | Key Capabilities |
|---|---|---|
| **Patient** | International individual seeking medical care in India | Case creation, KYC verification, document upload, proposal review/acceptance, payment, visa tracking, timeline monitoring, messaging. |
| **Patient Companion / Attendant** | Family member/caretaker traveling with patient | Linked profile, co-KYC, attendant visa (MED-X) tracking, accommodation preferences. |
| **Care Coordinator** | Internal operations manager assigned to case | Case triaging, lead management, document completeness check, hospital matching orchestration, logistics coordination, patient escalation. |
| **Medical Reviewer** | Qualified internal physician/nurse | Medical document analysis, AI summary validation, clinical inquiry generation, specialty classification, provider requirement definition. |
| **Hospital Doctor** | Treating physician/surgeon at Indian partner hospital | Review case dossiers, request diagnostic clarifications, submit clinical recommendations, treatment plans, and post-op plans. |
| **Hospital International Desk (IPD)** | Administrative team at partner hospital | Review inquiries, verify doctor availability, issue formal Treatment Quotations, generate Visa Invitation Letters (VIL), coordinate admission and discharge. |
| **Hospital Administrator** | Executive at partner hospital | Manage hospital profile, department accreditations, doctor rosters, SLA tracking, billing reconciliation. |
| **Visa Coordinator** | Operations specialist handling Indian Medical Visa (e-Med Visa / MED / MED-X) | Verification of passport/photos, issuing checklist, reviewing embassy/portal submissions, tracking FRRO registration. |
| **Travel Coordinator** | Logistics desk specialist | Managing flights, emergency medical air-ambulance if needed, itinerary creation. |
| **Hotel Partner** | Dedicated partner hotel near hospital | Manage patient-adapted room inventory (wheelchair accessible, dietary needs), booking confirmations. |
| **Transport Partner** | Airport transfer & local transport provider | Airport pickup/drop, hospital shuttle dispatch, driver assignment, vehicle tracking. |
| **Finance Administrator** | Internal platform accounting team | Invoicing, payment reconciliation, platform fee collection, partner commission settlements, refund processing. |
| **Platform Administrator** | Platform operations manager | Country config management, provider catalogs, user management, audit logs, SLA monitoring. |
| **Super Administrator** | System root / compliance officer | Master security configurations, role permissions, encryption key rotation, compliance audits. |

---

## 3. Core Functional Modules (A to AB)

- **Module A: Patient Web Portal**: Multilingual, responsive web portal for seamless case onboarding, dashboard tracking, document vault, and messaging.
- **Module B: Patient Case Management**: Central case entity lifecycle engine managing 28 discrete stages from lead to post-treatment follow-up.
- **Module C: Identity/KYC Verification**: Multi-provider passport/national ID verification abstraction with fraud scoring and manual fallback.
- **Module D: Medical Document Management**: S3-backed, KMS-encrypted vault supporting PDF, DICOM, JPG, PNG, DOCX with versioning and anti-virus screening.
- **Module E: AI Medical Document Extraction**: Clinical pipeline extracting diagnoses, procedures, medications, lab metrics, and flagging missing records with strict disclaimer labeling.
- **Module F: Clinical Review Workflow**: Multi-tier review queue for internal medical team before routing to external hospital desks.
- **Module G & H: Doctor & Hospital Management**: Master directory of accredited hospitals (JCI/NABH), departments, doctor qualifications, languages spoken, and international desk SLAs.
- **Module I: Treatment/Procedure Catalog**: ICD-10 and CPT mapped catalog of medical specialties, procedures, typical stay durations, and standard clinical requirements.
- **Module J: Structured Provider Matching**: Attribute-driven ranking engine matching patient case criteria (specialty, urgency, budget, location, hospital capability) without biased medical ranking.
- **Module K & L: Multi-tier Estimates & Treatment Proposals**: Version-controlled estimates clearly separating preliminary indicative ranges from binding hospital quotations, bundled into actionable Treatment Proposals.
- **Module M: Consent Management**: Legally binding, versioned digital consents for data processing (DPDP), cross-border medical data sharing, and travel facilitation.
- **Module N: Payment Management**: Multi-currency payment gateway integration supporting card payments, wire transfers, split invoicing, and refund lifecycles.
- **Module O: Visa Case Management**: Specialized workflow for Indian Medical Visa (e-Med Visa) & Medical Attendant Visa (e-Med Attendant) with Visa Invitation Letter (VIL) generation and FRRO compliance tracking.
- **Module P, Q, R: Travel, Hotel & Transport Management**: Comprehensive logistics suite for flights, hospital-proximate hotel bookings, airport ambulance/cab pickups, and master itinerary generation.
- **Module S: Hospital Integration Gateway**: Interoperability bridge supporting FHIR R4, REST APIs, HL7, and manual secure portal fallback with full idempotency.
- **Module T: Patient Journey & Timeline**: Unified real-time visual milestone tracker showing completed, active, pending, and blocked journey stages.
- **Module U, V, W: Notifications, Messaging & Customer Support**: Push, WhatsApp, SMS, and email alerts; secure role-scoped chat; and ticketed customer support.
- **Module X & Y: Partner & Commission Management**: B2B partner portal for referring doctors, global travel agents, and commission settlement tracking.
- **Module Z, AA, AB: Reporting, Audit Logging & Security Compliance**: Executive analytics, tamper-evident audit trails (21 CFR Part 11 / DPDP compliant), and RBAC/ABAC enforcement.

---

## 4. Configuration-Driven Country Engine Schema

The platform parameterizes all cross-border rules in a JSON-backed Country Configuration schema:

```json
{
  "country_code": "OMN",
  "country_name": "Oman",
  "nationality": "Omani",
  "primary_languages": ["ar", "en"],
  "currency": "OMR",
  "phone_country_code": "+968",
  "identity_provider": "VERIFF",
  "passport_validity_min_months": 6,
  "visa_type_required": "INDIAN_E_MEDICAL_VISA",
  "visa_attendants_allowed": 2,
  "requires_official_translation": false,
  "allowed_payment_methods": ["CREDIT_CARD", "INTERNATIONAL_WIRE_TRANSFER", "FLYWIRE"],
  "medical_document_requirements": [
    "CURRENT_DIAGNOSTIC_REPORTS",
    "ATTENDING_PHYSICIAN_SUMMARY",
    "IMAGING_SCANS_OR_REPORTS"
  ],
  "local_partner_required": false
}
```
