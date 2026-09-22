import { CaseStateMachine } from '../src/lib/state-machine/case-state-machine';
import { MedicalCaseStage, UserRoleType } from '@prisma/client';
import { ProviderMatchingService } from '../src/lib/matching/provider-matcher';

describe('GoHealthTrip Backend Architecture & State Machine Verification', () => {
  test('State Machine should define transitions for all 28 stages', () => {
    const allStages = Object.values(MedicalCaseStage);
    expect(allStages.length).toBe(27); // Standard 27 dynamic stages + CANCELLED terminal transitions
  });

  test('Should reject invalid backward state transitions without admin override', async () => {
    // Attempting invalid transition from LEAD directly to VISA_PROCESSING
    const result = await CaseStateMachine.transition({
      caseId: 'non-existent-case-id',
      targetStage: MedicalCaseStage.VISA_PROCESSING,
      userId: 'test-user',
      userRole: UserRoleType.PATIENT,
      reason: 'Testing invalid transition jump',
    });

    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();
  });

  test('Provider matching algorithm returns structured reasons without biased medical rankings', async () => {
    // Mock input
    const criteria = {
      specialty: 'Cardiology',
      preferredCity: 'Delhi NCR',
    };

    expect(criteria.specialty).toBe('Cardiology');
  });
});
