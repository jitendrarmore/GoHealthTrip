# API Contract & Integration Specifications — GoHealthTrip

## 1. Global API Standards

- **Base URL**: `https://api.gohealthtrip.com/v1`
- **Protocol**: RESTful JSON over HTTPS (TLS 1.3)
- **Authentication**: Bearer JWT (`Authorization: Bearer <token>`) + Session Cookie with CSRF Token for browser portal.
- **Idempotency**: All `POST`, `PUT`, `PATCH` requests accept an optional or required `Idempotency-Key: <UUIDv4>` header.
- **Audit Context**: Internal requests pass `X-Audit-Reason` header when accessing protected health records.

### 1.1 Standard Error Envelope
```json
{
  "success": false,
  "error": {
    "code": "INVALID_STATE_TRANSITION",
    "message": "Cannot transition MedicalCase from LEAD directly to VISA_PROCESSING.",
    "target": "current_stage",
    "details": [
      {
        "field": "current_stage",
        "issue": "Stage must first transition to IDENTITY_VERIFIED and MEDICAL_REVIEW."
      }
    ],
    "request_id": "req_88f91a27e90c41b8",
    "timestamp": "2026-09-22T00:15:34Z"
  }
}
```

---

## 2. API Endpoint Groups

### 2.1 Identity & Access Management (`/auth`, `/identity`)
- `POST /auth/register` — Patient self-registration with country/phone.
- `POST /auth/login` — Login with credential validation; returns MFA challenge if enabled.
- `POST /auth/mfa/verify` — Complete TOTP/SMS MFA challenge; issues scoped JWT.
- `POST /identity/verify/initiate` — Initiate biometric/passport verification via `IdentityVerificationProvider`.
- `POST /identity/verify/webhook` — Webhook receiver for verification provider callbacks.
- `GET /identity/status` — Get caller's KYC status and document verification details.

### 2.2 Medical Case Lifecycle (`/cases`)
- `POST /cases` — Initialize a new medical inquiry/case.
- `GET /cases` — Paginated list of cases (scoped to patient if patient, filtered by role if coordinator/doctor).
- `GET /cases/:id` — Comprehensive case dossier with sub-resources.
- `PATCH /cases/:id/stage` — Transition case stage (Strict FSM verification).
- `POST /cases/:id/assign` — Assign Care Coordinator or Medical Reviewer.

### 2.3 Medical Document Vault (`/cases/:id/documents`)
- `POST /cases/:id/documents/upload-intent` — Generate signed, pre-authorized S3 upload URL.
- `POST /cases/:id/documents/confirm` — Notify backend that upload finished; queues virus scan & AI extraction.
- `GET /cases/:id/documents` — List documents with categories, scan status, and AI extraction summaries.
- `GET /cases/:id/documents/:docId/download` — Issue temporary time-limited pre-signed download URL (Logged in Audit).
- `POST /cases/:id/documents/:docId/extract-ai` — Trigger or re-run AI extraction pipeline.

### 2.4 Clinical Review & Matching (`/cases/:id/clinical-review`, `/matching`)
- `POST /cases/:id/clinical-review` — Medical reviewer records clinical findings, ICD-10 tags, and provider criteria.
- `GET /cases/:id/matching-providers` — Run multi-attribute matching algorithm to retrieve suitable hospitals & doctors.
- `POST /cases/:id/share-dossier` — Dispatch anonymized or authorized case dossier to partner hospital international desks.

### 2.5 Estimates & Treatment Proposals (`/cases/:id/estimates`, `/cases/:id/proposals`)
- `POST /cases/:id/estimates` — Hospital or Care Coordinator submits an estimate (preliminary or hospital quote).
- `POST /cases/:id/proposals` — Formulate a versioned Treatment Proposal.
- `GET /cases/:id/proposals/latest` — Get current active proposal for patient review.
- `POST /cases/:id/proposals/:proposalId/decision` — Patient accepts or declines proposal (requires digital signature/consent).

### 2.6 Visa & Travel Coordination (`/cases/:id/visa`, `/cases/:id/travel`)
- `POST /cases/:id/visa/invitation-letter` — Request hospital-signed Visa Invitation Letter (VIL).
- `GET /cases/:id/visa/checklist` — Fetch country-specific visa document checklist.
- `PUT /cases/:id/visa/status` — Update embassy submission & approval status.
- `POST /cases/:id/travel/plan` — Construct or update flight, hotel, and airport transfer itinerary.
- `GET /cases/:id/travel/itinerary` — Get consolidated itinerary PDF / JSON feed.

### 2.7 In-Hospital Journey & Discharge (`/cases/:id/admission`, `/cases/:id/discharge`)
- `POST /cases/:id/admission` — Record hospital admission, room assignment, and attending surgeon.
- `POST /cases/:id/discharge` — Record discharge, upload discharge summary, and trigger recovery plan.
- `POST /cases/:id/follow-up` — Schedule post-treatment remote consultation with Indian doctor.

### 2.8 Payments & Finance (`/payments`)
- `POST /payments/checkout-session` — Create payment session for platform fee or treatment advance.
- `POST /payments/webhook` — Process asynchronous payment provider event.
- `GET /payments/receipt/:id` — Download official invoice & payment receipt.

### 2.9 Master Config & Catalogs (`/config`, `/catalogs`)
- `GET /config/countries` — Get active countries with localized onboarding rules.
- `GET /catalogs/specialties` — List medical specialties and procedure classifications.
- `GET /catalogs/hospitals` — Public / authorized directory of partner hospitals with NABH/JCI accreditations.
