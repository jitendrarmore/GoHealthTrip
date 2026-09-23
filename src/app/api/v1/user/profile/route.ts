import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyAuthToken } from '@/lib/auth/jwt';
import { CacheService } from '@/lib/cache/redis';
import { apiSuccess, apiError } from '@/lib/api/response';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const queryEmail = searchParams.get('email');
    
    // Check Authorization header or cookie
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '') || req.cookies.get('ght_token')?.value;

    let targetEmail: string | undefined = queryEmail || undefined;
    let targetUserId: string | undefined;

    if (token) {
      const payload = await verifyAuthToken(token);
      if (payload) {
        targetUserId = payload.userId;
        targetEmail = payload.email || targetEmail;
      }
    }

    if (!targetEmail && !targetUserId) {
      return apiError('Authentication or email is required', 'UNAUTHORIZED', 401);
    }

    const cacheKey = `user:profile:${targetUserId || targetEmail}`;
    const cachedProfile = await CacheService.get(cacheKey);
    if (cachedProfile) {
      return apiSuccess({ ...cachedProfile, _cached: true });
    }

    // Query Prisma DB
    const user = await prisma.user.findFirst({
      where: targetUserId ? { id: targetUserId } : { email: targetEmail as string },
      include: {
        patient: {
          include: {
            companions: true,
          },
        },
        careCoordinator: true,
        doctorProfile: true,
        userRoles: {
          include: {
            role: true,
          },
        },
      },
    });

    if (!user) {
      return apiError('User profile not found', 'NOT_FOUND', 404);
    }

    // Also fetch patient's active cases if patient exists
    let activeCases: any[] = [];
    if (user.patient) {
      activeCases = await prisma.medicalCase.findMany({
        where: { patientId: user.patient.id },
        orderBy: { createdAt: 'desc' },
        take: 5,
      });
    }

    const profileData = {
      id: user.id,
      email: user.email,
      phone: user.phone || '',
      role: user.role,
      status: user.status,
      firstName: user.patient?.firstName || '',
      lastName: user.patient?.lastName || '',
      dateOfBirth: user.patient?.dateOfBirth ? user.patient.dateOfBirth.toISOString().split('T')[0] : '',
      gender: user.patient?.gender || 'PREFER_NOT_TO_SAY',
      emergencyContactName: user.patient?.emergencyContactName || '',
      emergencyContactPhone: user.patient?.emergencyContactPhone || '',
      emergencyContactRel: user.patient?.emergencyContactRel || '',
      medicalAllergies: user.patient?.medicalAllergies || '',
      chronicConditions: user.patient?.chronicConditions || '',
      companions: user.patient?.companions.map((c) => ({
        id: c.id,
        fullName: `${c.firstName} ${c.lastName}`.trim(),
        relationship: c.relationship,
        isTravelling: c.isTravelling,
        requiresAttendantVisa: c.requiresAttendantVisa,
      })) || [],
      activeCases: activeCases.map((c) => ({
        id: c.id,
        caseNumber: c.caseNumber,
        condition: c.primaryCondition,
        stage: c.currentStage,
        priority: c.priority,
        treatment: c.requestedTreatment,
        createdAt: c.createdAt,
      })),
      careCoordinator: user.careCoordinator ? {
        id: user.careCoordinator.id,
        name: `${user.careCoordinator.firstName} ${user.careCoordinator.lastName}`,
        region: user.careCoordinator.assignedRegion,
      } : null,
      doctorProfile: user.doctorProfile ? {
        id: user.doctorProfile.id,
        name: `${user.doctorProfile.title} ${user.doctorProfile.firstName} ${user.doctorProfile.lastName}`.trim(),
        specialty: user.doctorProfile.primarySpecialty,
      } : null,
    };

    // Cache in Redis / Memory for 5 minutes
    await CacheService.set(cacheKey, profileData, 300);

    return apiSuccess(profileData);
  } catch (error: any) {
    console.error('Error fetching user profile:', error);
    return apiError(error.message || 'Failed to fetch user profile', 'SERVER_ERROR', 500);
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      email,
      userId,
      firstName,
      lastName,
      phone,
      dateOfBirth,
      gender,
      emergencyContactName,
      emergencyContactPhone,
      emergencyContactRel,
      medicalAllergies,
      chronicConditions,
      companions,
    } = body;

    // Check Authorization header or cookie
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '') || req.cookies.get('ght_token')?.value;

    let targetEmail: string | undefined = email || undefined;
    let targetUserId: string | undefined = userId || undefined;

    if (token) {
      const payload = await verifyAuthToken(token);
      if (payload) {
        targetUserId = payload.userId;
        targetEmail = payload.email || targetEmail;
      }
    }

    if (!targetEmail && !targetUserId) {
      return apiError('Authentication or email is required to update profile', 'UNAUTHORIZED', 401);
    }

    // Find User in DB
    const existingUser = await prisma.user.findFirst({
      where: targetUserId ? { id: targetUserId } : { email: targetEmail as string },
      include: { patient: true },
    });

    if (!existingUser) {
      return apiError('User not found in database', 'NOT_FOUND', 404);
    }

    // Update User phone
    if (phone !== undefined) {
      await prisma.user.update({
        where: { id: existingUser.id },
        data: { phone },
      });
    }

    // Update or Create Patient record
    if (existingUser.patient) {
      await prisma.patient.update({
        where: { id: existingUser.patient.id },
        data: {
          firstName: firstName !== undefined ? firstName : existingUser.patient.firstName,
          lastName: lastName !== undefined ? lastName : existingUser.patient.lastName,
          dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : existingUser.patient.dateOfBirth,
          gender: gender ? gender : existingUser.patient.gender,
          emergencyContactName: emergencyContactName !== undefined ? emergencyContactName : existingUser.patient.emergencyContactName,
          emergencyContactPhone: emergencyContactPhone !== undefined ? emergencyContactPhone : existingUser.patient.emergencyContactPhone,
          emergencyContactRel: emergencyContactRel !== undefined ? emergencyContactRel : existingUser.patient.emergencyContactRel,
          medicalAllergies: medicalAllergies !== undefined ? medicalAllergies : existingUser.patient.medicalAllergies,
          chronicConditions: chronicConditions !== undefined ? chronicConditions : existingUser.patient.chronicConditions,
        },
      });
    }

    // Invalidate Redis Cache
    const cacheKey = `user:profile:${existingUser.id}`;
    const emailCacheKey = `user:profile:${existingUser.email}`;
    await CacheService.del(cacheKey);
    await CacheService.del(emailCacheKey);

    return apiSuccess({
      message: 'Profile updated and saved to Database & Cache successfully',
      userId: existingUser.id,
      email: existingUser.email,
    });
  } catch (error: any) {
    console.error('Error updating user profile:', error);
    return apiError(error.message || 'Failed to update user profile in DB', 'SERVER_ERROR', 500);
  }
}
