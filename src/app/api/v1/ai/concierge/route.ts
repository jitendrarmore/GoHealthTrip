import { NextRequest } from 'next/server';
import { apiSuccess, apiError } from '@/lib/api/response';
import { MedicalAIService } from '@/lib/ai/medical-ai-service';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { query, caseData } = body;

    if (!query) {
      return apiError('query is required', 'MISSING_QUERY', 400);
    }

    const conciergeResult = MedicalAIService.handleConciergeQuery(query, caseData || {});

    return apiSuccess(conciergeResult, 200);
  } catch (error: any) {
    return apiError(error.message || 'Internal server error', 'SERVER_ERROR', 500);
  }
}
