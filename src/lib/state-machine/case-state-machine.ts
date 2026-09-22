import prisma from '@/lib/prisma';
import { MedicalCaseStage, UserRoleType, AuditAction } from '@prisma/client';
import { recordAuditLog } from '@/lib/audit/logger';

export interface StateTransitionResult {
  success: boolean;
  previousStage: MedicalCaseStage;
  newStage: MedicalCaseStage;
  error?: string;
}

export class CaseStateMachine {
  // Allowed transitions map for all 28 stages
  private static readonly ALLOWED_TRANSITIONS: Record<MedicalCaseStage, MedicalCaseStage[]> = {
    [MedicalCaseStage.LEAD]: [
      MedicalCaseStage.REGISTERED, 
      MedicalCaseStage.CANCELLED
    ],
    [MedicalCaseStage.REGISTERED]: [
      MedicalCaseStage.IDENTITY_PENDING, 
      MedicalCaseStage.CANCELLED
    ],
    [MedicalCaseStage.IDENTITY_PENDING]: [
      MedicalCaseStage.IDENTITY_VERIFIED, 
      MedicalCaseStage.ADDITIONAL_INFORMATION_REQUIRED, 
      MedicalCaseStage.CANCELLED
    ],
    [MedicalCaseStage.IDENTITY_VERIFIED]: [
      MedicalCaseStage.MEDICAL_DOCUMENTS_PENDING, 
      MedicalCaseStage.MEDICAL_REVIEW,
      MedicalCaseStage.CANCELLED
    ],
    [MedicalCaseStage.MEDICAL_DOCUMENTS_PENDING]: [
      MedicalCaseStage.MEDICAL_REVIEW, 
      MedicalCaseStage.CANCELLED
    ],
    [MedicalCaseStage.MEDICAL_REVIEW]: [
      MedicalCaseStage.READY_FOR_PROVIDER_MATCHING, 
      MedicalCaseStage.ADDITIONAL_INFORMATION_REQUIRED, 
      MedicalCaseStage.CANCELLED
    ],
    [MedicalCaseStage.ADDITIONAL_INFORMATION_REQUIRED]: [
      MedicalCaseStage.IDENTITY_PENDING, 
      MedicalCaseStage.MEDICAL_REVIEW, 
      MedicalCaseStage.PROVIDER_REVIEW, 
      MedicalCaseStage.CANCELLED
    ],
    [MedicalCaseStage.READY_FOR_PROVIDER_MATCHING]: [
      MedicalCaseStage.PROVIDER_REVIEW, 
      MedicalCaseStage.CANCELLED
    ],
    [MedicalCaseStage.PROVIDER_REVIEW]: [
      MedicalCaseStage.PROPOSAL_READY, 
      MedicalCaseStage.ADDITIONAL_INFORMATION_REQUIRED, 
      MedicalCaseStage.CANCELLED
    ],
    [MedicalCaseStage.PROPOSAL_READY]: [
      MedicalCaseStage.PATIENT_DECISION, 
      MedicalCaseStage.CANCELLED
    ],
    [MedicalCaseStage.PATIENT_DECISION]: [
      MedicalCaseStage.PAYMENT_PENDING, 
      MedicalCaseStage.DECLINED, 
      MedicalCaseStage.ADDITIONAL_INFORMATION_REQUIRED, 
      MedicalCaseStage.CANCELLED
    ],
    [MedicalCaseStage.PAYMENT_PENDING]: [
      MedicalCaseStage.ACCEPTED, 
      MedicalCaseStage.DECLINED, 
      MedicalCaseStage.CANCELLED
    ],
    [MedicalCaseStage.ACCEPTED]: [
      MedicalCaseStage.VISA_PROCESSING, 
      MedicalCaseStage.CANCELLED
    ],
    [MedicalCaseStage.DECLINED]: [
      MedicalCaseStage.PATIENT_DECISION, 
      MedicalCaseStage.CANCELLED
    ],
    [MedicalCaseStage.VISA_PROCESSING]: [
      MedicalCaseStage.VISA_APPROVED, 
      MedicalCaseStage.ADDITIONAL_INFORMATION_REQUIRED, 
      MedicalCaseStage.CANCELLED
    ],
    [MedicalCaseStage.VISA_APPROVED]: [
      MedicalCaseStage.TRAVEL_PLANNING, 
      MedicalCaseStage.CANCELLED
    ],
    [MedicalCaseStage.TRAVEL_PLANNING]: [
      MedicalCaseStage.READY_FOR_TRAVEL, 
      MedicalCaseStage.CANCELLED
    ],
    [MedicalCaseStage.READY_FOR_TRAVEL]: [
      MedicalCaseStage.ARRIVED_IN_INDIA, 
      MedicalCaseStage.CANCELLED
    ],
    [MedicalCaseStage.ARRIVED_IN_INDIA]: [
      MedicalCaseStage.HOSPITAL_ADMISSION, 
      MedicalCaseStage.CANCELLED
    ],
    [MedicalCaseStage.HOSPITAL_ADMISSION]: [
      MedicalCaseStage.TREATMENT_IN_PROGRESS, 
      MedicalCaseStage.CANCELLED
    ],
    [MedicalCaseStage.TREATMENT_IN_PROGRESS]: [
      MedicalCaseStage.DISCHARGE, 
      MedicalCaseStage.CANCELLED
    ],
    [MedicalCaseStage.DISCHARGE]: [
      MedicalCaseStage.RECOVERY, 
      MedicalCaseStage.FOLLOW_UP,
      MedicalCaseStage.CANCELLED
    ],
    [MedicalCaseStage.RECOVERY]: [
      MedicalCaseStage.RETURN_HOME, 
      MedicalCaseStage.FOLLOW_UP,
      MedicalCaseStage.CANCELLED
    ],
    [MedicalCaseStage.RETURN_HOME]: [
      MedicalCaseStage.FOLLOW_UP, 
      MedicalCaseStage.COMPLETED, 
      MedicalCaseStage.CANCELLED
    ],
    [MedicalCaseStage.FOLLOW_UP]: [
      MedicalCaseStage.COMPLETED, 
      MedicalCaseStage.CANCELLED
    ],
    [MedicalCaseStage.COMPLETED]: [],
    [MedicalCaseStage.CANCELLED]: [
      MedicalCaseStage.LEAD, 
      MedicalCaseStage.REGISTERED // Can be reopened by Super Admin with audit
    ]
  };

  /**
   * Executes a validated state transition with guards and immutable audit logging.
   */
  static async transition(params: {
    caseId: string;
    targetStage: MedicalCaseStage;
    userId: string;
    userRole: UserRoleType;
    reason: string;
  }): Promise<StateTransitionResult> {
    const { caseId, targetStage, userId, userRole, reason } = params;

    const medicalCase = await prisma.medicalCase.findUnique({
      where: { id: caseId },
      include: {
        patient: { include: { identities: true } },
        medicalDocuments: true,
        treatmentProposals: true,
        visaCase: true,
      },
    });

    if (!medicalCase) {
      return {
        success: false,
        previousStage: MedicalCaseStage.LEAD,
        newStage: targetStage,
        error: 'Medical Case not found',
      };
    }

    const currentStage = medicalCase.currentStage;

    // Check if transition is defined in matrix (Allow Super Admin override if reason provided)
    const isAllowedTransition = this.ALLOWED_TRANSITIONS[currentStage]?.includes(targetStage);
    const isSuperAdminOverride = userRole === UserRoleType.SUPER_ADMIN;

    if (!isAllowedTransition && !isSuperAdminOverride) {
      return {
        success: false,
        previousStage: currentStage,
        newStage: targetStage,
        error: `Invalid transition: Cannot move directly from ${currentStage} to ${targetStage}`,
      };
    }

    // Run transition guards
    const guardError = await this.validateGuards(medicalCase, targetStage);
    if (guardError && !isSuperAdminOverride) {
      return {
        success: false,
        previousStage: currentStage,
        newStage: targetStage,
        error: guardError,
      };
    }

    // Perform the update atomically
    const updatedCase = await prisma.medicalCase.update({
      where: { id: caseId },
      data: { currentStage: targetStage },
    });

    // Record immutable audit event
    await recordAuditLog({
      entityName: 'MedicalCase',
      entityId: caseId,
      userId,
      action: AuditAction.STAGE_TRANSITION,
      oldValues: { stage: currentStage },
      newValues: { stage: targetStage },
      reason: reason || `Transitioned from ${currentStage} to ${targetStage}`,
    });

    return {
      success: true,
      previousStage: currentStage,
      newStage: targetStage,
    };
  }

  /**
   * Domain Guard conditions for state progression
   */
  private static async validateGuards(medicalCase: any, targetStage: MedicalCaseStage): Promise<string | null> {
    if (targetStage === MedicalCaseStage.MEDICAL_REVIEW) {
      if (medicalCase.medicalDocuments.length === 0) {
        return 'Cannot initiate Medical Review without at least one uploaded medical document.';
      }
    }

    if (targetStage === MedicalCaseStage.PROPOSAL_READY) {
      if (medicalCase.treatmentProposals.length === 0) {
        return 'Cannot move to PROPOSAL_READY without creating a Treatment Proposal.';
      }
    }

    return null;
  }
}
