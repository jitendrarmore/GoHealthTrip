import { NextRequest } from 'next/server';
import { apiSuccess, apiError } from '@/lib/api/response';
import { verifyAuthToken } from '@/lib/auth/jwt';
import { MedicalAIService } from '@/lib/ai/medical-ai-service';

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');
    const user = token ? await verifyAuthToken(token) : null;

    if (!user) {
      return apiError('Unauthorized', 'UNAUTHORIZED', 401);
    }

    const body = await req.json();
    const { documentId, documentStorageKey, category } = body;

    if (!documentId) {
      return apiError('documentId is required', 'MISSING_FIELD', 400);
    }

    const extraction = await MedicalAIService.extractDocument({
      documentId,
      documentStorageKey: documentStorageKey || `vault/docs/${documentId}.pdf`,
      category: category || 'DIAGNOSTIC_REPORT',
      userId: user.userId,
    });

    return apiSuccess(extraction, 200);
  } catch (error: any) {
    return apiError(error.message || 'Internal server error', 'SERVER_ERROR', 500);
  }
}
