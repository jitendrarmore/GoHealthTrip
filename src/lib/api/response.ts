import { NextResponse } from 'next/server';

export interface ApiErrorDetail {
  field?: string;
  issue: string;
}

export function apiSuccess<T>(data: T, status = 200, meta?: Record<string, any>) {
  return NextResponse.json(
    {
      success: true,
      data,
      ...(meta && { meta }),
      timestamp: new Date().toISOString(),
    },
    { status }
  );
}

export function apiError(
  message: string,
  code = 'BAD_REQUEST',
  status = 400,
  details?: ApiErrorDetail[]
) {
  return NextResponse.json(
    {
      success: false,
      error: {
        code,
        message,
        details: details || [],
        timestamp: new Date().toISOString(),
      },
    },
    { status }
  );
}
