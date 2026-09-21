# Role-Based & Attribute-Based Access Control (RBAC/ABAC) Matrix — GoHealthTrip

## 1. Access Control Model Overview

GoHealthTrip implements a hybrid **RBAC + ABAC** security architecture:
1. **RBAC**: Controls coarse-grained endpoint permissions (e.g., `cases:read`, `proposals:create`, `documents:upload`).
2. **ABAC / Object-Level Security**: Enforces multi-tenant and patient-level ownership boundaries (e.g., `Patient A` can ONLY access `Case A` owned by `Patient A`; `Doctor B` can ONLY access cases assigned to their hospital department).

---

## 2. Granular Permissions Matrix

| Module / Operation | Patient | Care Coordinator | Medical Reviewer | Hospital Doctor | Hospital IPD Desk | Visa Coord. | Travel Coord. | Finance Admin | Super Admin |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **Self Profile / KYC Upload** | **CRUD (Own)** | R | - | - | - | R (KYC only) | - | - | CRUD |
| **Medical Case View** | **R (Own)** | CRUD (Assigned) | R (Assigned) | R (Assigned) | R (Hospital Cases) | R (Scoped) | R (Scoped) | R (Financial) | CRUD (All) |
| **Medical Case Stage Transition** | - | **U (Guarded)** | U (Guarded) | - | U (Hospital Stages) | U (Visa Stages) | U (Travel Stages) | - | **U (Admin Override)** |
| **Medical Document Upload** | **C (Own)** | C (On behalf) | - | - | C (Clinical Records) | - | - | - | CRUD |
| **Medical Document View/Download** | **R (Own)** | R (Assigned) | **R (Full PHI)** | **R (Assigned)** | R (Hospital Cases) | - (Blocked PHI) | - (Blocked PHI) | - (Blocked PHI) | R (Audited) |
| **AI Extraction Trigger / View** | R (Summary) | R | **CRUD** | R | R | - | - | - | CRUD |
| **Clinical Review Authoring** | - | R | **CRUD** | R | - | - | - | - | CRUD |
| **Provider Matching Execution** | - | **CRUD** | R | - | - | - | - | - | CRUD |
| **Treatment Estimate Creation** | - | C (Preliminary) | - | C (Medical Quote) | **CRUD (Hospital Quote)** | - | - | R | CRUD |
| **Treatment Proposal Formulate** | - | **CRUD** | R | R | R | - | - | R | CRUD |
| **Proposal Acceptance / Decline** | **U (Own)** | - | - | - | - | - | - | - | - |
| **Visa Case Management** | R (Own) | R | - | - | C (VIL Letter) | **CRUD** | - | - | CRUD |
| **Travel & Logistics Booking** | R (Own) | R | - | - | - | - | **CRUD** | - | CRUD |
| **Inpatient Admission & Discharge** | R (Own) | R | - | **CRUD** | **CRUD** | - | - | - | CRUD |
| **Payments Initiation & Execution** | **C (Own)** | - | - | - | - | - | - | **CRUD** | CRUD |
| **Partner Settlement / Commission**| - | - | - | - | - | - | - | **CRUD** | CRUD |
| **Audit Logs Inspection** | - | - | - | - | - | - | - | - | **R (Immutable)** |

---

## 3. ABAC & Isolation Rules

- **Patient Isolation Rule**: `WHERE medical_cases.patient_id = current_user.patient_id` (Violations trigger automated security alerts).
- **PHI Masking Rule**: Visa and Travel coordinators can only view passport and logistical documents; medical records (scans, pathology reports, doctor notes) are strictly redacted.
- **Audit Requirement**: Any action touching `medical_documents` or `patient_identities` writes an immutable record to `audit_logs` before returning payload data.
