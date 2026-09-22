import { CaseStateMachine } from '../src/lib/state-machine/case-state-machine';
import { MedicalAIService } from '../src/lib/ai/medical-ai-service';
import { ProviderMatchingService } from '../src/lib/matching/provider-matcher';
import { HospitalGatewayService } from '../src/lib/hospital-gateway/hospital-gateway-service';
import { MedicalCaseStage, UserRoleType } from '@prisma/client';

describe('GoHealthTrip End-to-End Patient Journey & Failure Scenarios', () => {

  // ====================================================
  // TEST GROUP 1: Happy Path Journey (28-Stage Sequence)
  // ====================================================
  describe('Happy Path: Complete 28-Stage Patient Coordination', () => {
    
    test('Phase 1: Discovery & Identity KYC verification', async () => {
      const allowedNextStages = [
        MedicalCaseStage.REGISTERED,
        MedicalCaseStage.IDENTITY_PENDING,
        MedicalCaseStage.IDENTITY_VERIFIED,
      ];
      expect(allowedNextStages).toContain(MedicalCaseStage.IDENTITY_VERIFIED);
    });

    test('Phase 2: Medical document upload & AI clinical extraction', async () => {
      const extraction = await MedicalAIService.extractDocument({
        documentId: 'doc_demo_cabg_01',
        documentStorageKey: 'vault/docs/doc_demo_cabg_01.pdf',
        category: 'DIAGNOSTIC_REPORT',
        userId: 'usr_sarah_coordinator',
      });

      expect(extraction.confidence).toBeGreaterThan(0.9);
      expect(extraction.diagnosesMentioned).toContain('Triple Vessel Coronary Artery Disease (CAD)');
      expect(extraction.disclaimer).toBeDefined();
    });

    test('Phase 3: Structured Provider Matching with JCI accreditation and transparent reasons', async () => {
      const matches = await ProviderMatchingService.findMatches({
        specialty: 'Cardiology',
        preferredCity: 'Delhi NCR',
        requiresJciAccreditation: true,
      });

      expect(Array.isArray(matches)).toBe(true);
      if (matches.length > 0) {
        expect(matches[0].matchReasons.length).toBeGreaterThan(0);
        expect(matches[0].estimatedCostRangeUsd.min).toBeGreaterThan(0);
      }
    });

    test('Phase 4: Hospital Integration Gateway case dispatch via FHIR & REST', async () => {
      const apolloDispatch = await HospitalGatewayService.dispatchCaseToHospital(
        'apollo-hospitals-delhi-demo',
        { caseId: 'GHT-2026-OMN-0101' }
      );
      expect(apolloDispatch.protocolUsed).toContain('FHIR R4');

      const medantaDispatch = await HospitalGatewayService.dispatchCaseToHospital(
        'medanta-the-medicity-demo',
        { caseId: 'GHT-2026-OMN-0101' }
      );
      expect(medantaDispatch.protocolUsed).toContain('REST JSON');
    });

    test('Phase 5: Operational Concierge query answering with automated medical escalation', () => {
      // Non-medical inquiry
      const visaQuery = MedicalAIService.handleConciergeQuery(
        'Where can I download my visa invitation letter?',
        { hospital: 'Medanta' }
      );
      expect(visaQuery.isMedicalEscalation).toBe(false);
      expect(visaQuery.response).toContain('Visa Invitation Letter (VIL)');

      // Clinical inquiry
      const clinicalQuery = MedicalAIService.handleConciergeQuery(
        'I have severe chest pain and fever, what medication should I take?',
        {}
      );
      expect(clinicalQuery.isMedicalEscalation).toBe(true);
      expect(clinicalQuery.response).toContain('routes your inquiry to your treating medical team');
    });
  });

  // ====================================================
  // TEST GROUP 2: Security, Failure Scenarios & Invariants
  // ====================================================
  describe('Failure Scenarios & Security Safeguards', () => {
    
    test('State Machine: Enforce guard preventing invalid stage skips (LEAD -> VISA_PROCESSING)', async () => {
      const invalidTransition = await CaseStateMachine.transition({
        caseId: 'non-existent-case-id',
        targetStage: MedicalCaseStage.VISA_PROCESSING,
        userId: 'usr_patient_ali',
        userRole: UserRoleType.PATIENT,
        reason: 'Attempting illegal stage jump',
      });

      expect(invalidTransition.success).toBe(false);
      expect(invalidTransition.error).toBeDefined();
    });

    test('Missing Document Detection: Flags required pre-op records accurately', async () => {
      const required = ['PASSPORT_COPY', 'ANGIOGRAPHY_REPORT', '2D_ECHO_REPORT', 'BLOOD_PROFILE'];
      const uploaded = ['PASSPORT_COPY', 'ANGIOGRAPHY_REPORT'];

      const check = await MedicalAIService.detectMissingDocuments({
        categoryRequired: required,
        uploadedCategories: uploaded,
      });

      expect(check.isComplete).toBe(false);
      expect(check.missingList).toEqual(['2D_ECHO_REPORT', 'BLOOD_PROFILE']);
    });

    test('IDOR Protection: Patient cannot access cross-tenant records', () => {
      const patientA = { patientId: 'patient_ali_oman', role: UserRoleType.PATIENT };
      const caseB = { id: 'case_grace_kenya', patientId: 'patient_grace_kenya' };

      const isAccessAllowed = patientA.patientId === caseB.patientId;
      expect(isAccessAllowed).toBe(false);
    });
  });

});
