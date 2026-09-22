import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { apiSuccess, apiError } from '@/lib/api/response';
import { verifyAuthToken } from '@/lib/auth/jwt';
import { MedicalCaseStage, UserRoleType, CasePriority } from '@prisma/client';
import { recordAuditLog } from '@/lib/audit/logger';
import { AuditAction } from '@prisma/client';

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');
    const user = token ? await verifyAuthToken(token) : null;

    if (!user) {
      return apiError('Unauthorized: Valid Bearer token required', 'UNAUTHORIZED', 401);
    }

    const { searchParams } = new URL(req.url);
    const stage = searchParams.get('stage') as MedicalCaseStage | null;
    const priority = searchParams.get('priority') as CasePriority | null;
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const skip = (page - 1) * limit;

    // ABAC Scope: Patients can only view their own cases
    const where: any = {};
    if (user.role === UserRoleType.PATIENT) {
      if (!user.patientId) {
        return apiError('Patient profile not linked', 'FORBIDDEN', 403);
      }
      where.patientId = user.patientId;
    }

    if (stage) where.currentStage = stage;
    if (priority) where.priority = priority;
    if (search) {
      where.OR = [
        { caseNumber: { contains: search, mode: 'insensitive' } },
        { primaryCondition: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [total, cases] = await Promise.all([
      prisma.medicalCase.count({ where }),
      prisma.medicalCase.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          patient: {
            include: { nationalityCountry: true },
          },
          assignedCoordinator: true,
          treatmentProposals: {
            take: 1,
            orderBy: { version: 'desc' },
            include: { hospital: true },
          },
        },
      }),
    ]);

    return apiSuccess(cases, 200, {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error: any) {
    return apiError(error.message || 'Internal server error', 'SERVER_ERROR', 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');
    const user = token ? await verifyAuthToken(token) : null;

    if (!user) {
      return apiError('Unauthorized', 'UNAUTHORIZED', 401);
    }

    const body = await req.json();
    const { primaryCondition, requestedTreatment, symptomsDescription, preferredHospitalLocation, budgetMinUsd, budgetMaxUsd } = body;

    if (!primaryCondition) {
      return apiError('Primary medical condition is required', 'MISSING_FIELD', 400);
    }

    const caseNumber = `GHT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newCase = await prisma.medicalCase.create({
      data: {
        caseNumber,
        patientId: user.patientId || body.patientId,
        primaryCondition,
        requestedTreatment,
        symptomsDescription,
        preferredHospitalLocation,
        budgetMinUsd,
        budgetMaxUsd,
        currentStage: MedicalCaseStage.LEAD,
      },
      include: {
        patient: true,
      },
    });

    await recordAuditLog({
      entityName: 'MedicalCase',
      entityId: newCase.id,
      userId: user.userId,
      action: AuditAction.CREATE,
      reason: 'Patient created initial medical inquiry',
      newValues: newCase,
    });

    return apiSuccess(newCase, 201);
  } catch (error: any) {
    return apiError(error.message || 'Internal server error', 'SERVER_ERROR', 500);
  }
}
