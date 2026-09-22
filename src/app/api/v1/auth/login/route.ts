import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { signAuthToken } from '@/lib/auth/jwt';
import { apiSuccess, apiError } from '@/lib/api/response';
import { recordAuditLog } from '@/lib/audit/logger';
import { AuditAction } from '@prisma/client';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return apiError('Email and password are required', 'MISSING_CREDENTIALS', 400);
    }

    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        patient: true,
        careCoordinator: true,
        doctorProfile: true,
      },
    });

    if (!user) {
      return apiError('Invalid email or password', 'INVALID_CREDENTIALS', 401);
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      return apiError('Invalid email or password', 'INVALID_CREDENTIALS', 401);
    }

    // Generate JWT
    const token = await signAuthToken({
      userId: user.id,
      email: user.email,
      role: user.role,
      patientId: user.patient?.id,
      coordinatorId: user.careCoordinator?.id,
      doctorId: user.doctorProfile?.id,
    });

    // Record login audit
    await recordAuditLog({
      entityName: 'User',
      entityId: user.id,
      userId: user.id,
      action: AuditAction.LOGIN,
      reason: 'User logged in via credentials',
    });

    return apiSuccess({
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        patient: user.patient,
        careCoordinator: user.careCoordinator,
      },
    });
  } catch (error: any) {
    return apiError(error.message || 'Internal server error', 'SERVER_ERROR', 500);
  }
}
