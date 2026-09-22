import { NextRequest } from 'next/server';
import { apiSuccess, apiError } from '@/lib/api/response';
import { verifyAuthToken } from '@/lib/auth/jwt';
import { CaseStateMachine } from '@/lib/state-machine/case-state-machine';
import { MedicalCaseStage, UserRoleType } from '@prisma/client';

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: caseId } = await params;
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');
    const user = token ? await verifyAuthToken(token) : null;

    if (!user) {
      return apiError('Unauthorized', 'UNAUTHORIZED', 401);
    }

    const body = await req.json();
    const { targetStage, reason } = body;

    if (!targetStage || !Object.values(MedicalCaseStage).includes(targetStage)) {
      return apiError('Valid targetStage is required', 'INVALID_STAGE', 400);
    }

    const result = await CaseStateMachine.transition({
      caseId,
      targetStage,
      userId: user.userId,
      userRole: user.role,
      reason: reason || 'Stage updated via API',
    });

    if (!result.success) {
      return apiError(result.error || 'Failed to transition stage', 'INVALID_TRANSITION', 422);
    }

    return apiSuccess(result, 200);
  } catch (error: any) {
    return apiError(error.message || 'Internal server error', 'SERVER_ERROR', 500);
  }
}
