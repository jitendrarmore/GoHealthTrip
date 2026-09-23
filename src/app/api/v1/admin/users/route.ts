import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyAuthToken } from '@/lib/auth/jwt';
import { CacheService } from '@/lib/cache/redis';
import { apiSuccess, apiError } from '@/lib/api/response';
import { UserRoleType } from '@prisma/client';

export async function GET(req: NextRequest) {
  try {
    const cacheKey = 'admin:users:list';
    const cachedUsers = await CacheService.get(cacheKey);
    if (cachedUsers) {
      return apiSuccess({ users: cachedUsers, _cached: true });
    }

    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        patient: true,
        doctorProfile: true,
        careCoordinator: true,
        userRoles: {
          include: {
            role: {
              include: {
                permissions: {
                  include: {
                    permission: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    const formatted = users.map((u) => {
      let displayName = u.email.split('@')[0];
      if (u.patient) {
        displayName = `${u.patient.firstName} ${u.patient.lastName}`.trim();
      } else if (u.doctorProfile) {
        displayName = `${u.doctorProfile.title} ${u.doctorProfile.firstName} ${u.doctorProfile.lastName}`.trim();
      } else if (u.careCoordinator) {
        displayName = `${u.careCoordinator.firstName} ${u.careCoordinator.lastName}`.trim();
      }

      return {
        id: u.id,
        email: u.email,
        name: displayName,
        role: u.role,
        status: u.status,
        createdAt: u.createdAt,
        patientId: u.patient?.id || null,
        doctorId: u.doctorProfile?.id || null,
        coordinatorId: u.careCoordinator?.id || null,
        specialty: u.doctorProfile?.primarySpecialty || null,
        region: u.careCoordinator?.assignedRegion || null,
        permissions: u.userRoles.flatMap((ur) =>
          ur.role.permissions.map((rp) => rp.permission.code)
        ),
      };
    });

    // Cache in Redis for 30 seconds
    await CacheService.set(cacheKey, formatted, 30);

    return apiSuccess({ users: formatted });
  } catch (error: any) {
    console.error('Admin users API error:', error);
    return apiError(error.message || 'Failed to list users', 'ADMIN_USERS_ERROR', 500);
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, newRole, region, permissions } = body;

    if (!userId || !newRole) {
      return apiError('userId and newRole are required', 'INVALID_INPUT', 400);
    }

    // Verify valid role enum
    if (!Object.values(UserRoleType).includes(newRole as UserRoleType)) {
      return apiError(`Invalid role type: ${newRole}`, 'INVALID_ROLE', 400);
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        patient: true,
        doctorProfile: true,
        careCoordinator: true,
      },
    });

    if (!user) {
      return apiError('User not found', 'NOT_FOUND', 404);
    }

    // 1. Update User's primary role in DB
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { role: newRole as UserRoleType },
    });

    // 2. If promoted to DOCTOR, ensure Doctor profile exists
    if (newRole === 'DOCTOR' && !user.doctorProfile) {
      await prisma.doctor.create({
        data: {
          userId: user.id,
          firstName: user.patient?.firstName || 'Specialist',
          lastName: user.patient?.lastName || 'Consultant',
          title: 'Dr.',
          primarySpecialty: 'Super Specialist',
          subSpecialties: ['Cardiology', 'Oncology'],
          qualifications: 'MBBS, MS, MCh',
          experienceYears: 15,
          languagesSpoken: ['English', 'Arabic', 'Hindi'],
          bio: 'Senior Clinical Specialist and Reviewer',
        },
      });
    }

    // 3. If promoted to CARE_COORDINATOR, ensure CareCoordinator profile exists
    if (newRole === 'CARE_COORDINATOR' && !user.careCoordinator) {
      await prisma.careCoordinator.create({
        data: {
          userId: user.id,
          employeeCode: `GHT-CC-${Math.floor(1000 + Math.random() * 9000)}`,
          firstName: user.patient?.firstName || 'Care',
          lastName: user.patient?.lastName || 'Coordinator',
          assignedRegion: region || 'GCC & Middle East Desk',
          languagesSpoken: ['English', 'Arabic', 'Hindi'],
        },
      });
    }

    // 4. Invalidate Redis Caches
    await CacheService.del('admin:users:list');
    await CacheService.del(`user:profile:${user.id}`);
    await CacheService.del(`user:profile:${user.email}`);

    return apiSuccess({
      message: `User ${user.email} successfully updated to role ${newRole} in Database and Cache.`,
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        role: updatedUser.role,
      },
    });
  } catch (error: any) {
    console.error('Admin PATCH user role error:', error);
    return apiError(error.message || 'Failed to update user role', 'ROLE_UPDATE_ERROR', 500);
  }
}
