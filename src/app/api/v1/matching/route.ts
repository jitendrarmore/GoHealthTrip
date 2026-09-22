import { NextRequest } from 'next/server';
import { apiSuccess, apiError } from '@/lib/api/response';
import { ProviderMatchingService } from '@/lib/matching/provider-matcher';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { specialty, preferredCity, maxBudgetUsd, languagesPreferred, requiresJciAccreditation } = body;

    if (!specialty) {
      return apiError('Medical specialty is required for matching', 'MISSING_SPECIALTY', 400);
    }

    const matches = await ProviderMatchingService.findMatches({
      specialty,
      preferredCity,
      maxBudgetUsd,
      languagesPreferred,
      requiresJciAccreditation,
    });

    return apiSuccess({
      specialty,
      matchCount: matches.length,
      matches,
      disclaimer: 'Provider suggestions are generated from structured institutional capability data. Final clinical assignment is determined upon formal medical review.',
    });
  } catch (error: any) {
    return apiError(error.message || 'Internal server error', 'SERVER_ERROR', 500);
  }
}
