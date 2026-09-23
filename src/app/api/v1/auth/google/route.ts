import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { signAuthToken } from '@/lib/auth/jwt';
import { apiSuccess, apiError } from '@/lib/api/response';
import { recordAuditLog } from '@/lib/audit/logger';
import { AuditAction, UserRoleType } from '@prisma/client';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, name, picture, credential } = body;

    let userEmail = email;
    let userName = name || 'International Patient';
    let userAvatar = picture;

    if (!userEmail && credential) {
      try {
        const parts = credential.split('.');
        if (parts.length === 3) {
          const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString('utf-8'));
          userEmail = payload.email;
          userName = payload.name || userName;
          userAvatar = payload.picture || userAvatar;
        }
      } catch (e) {
        console.warn('Failed to parse Google JWT credential payload, using fallback body');
      }
    }

    if (!userEmail) {
      return apiError('Valid Google email is required for federated authentication', 'MISSING_GOOGLE_EMAIL', 400);
    }

    const nameParts = userName.split(' ');
    const firstName = nameParts[0] || 'Patient';
    const lastName = nameParts.slice(1).join(' ') || 'User';

    // Find or create User in Prisma
    let user = await prisma.user.findUnique({
      where: { email: userEmail },
      include: {
        patient: true,
        careCoordinator: true,
        doctorProfile: true,
      },
    });

    let isNew = false;
    if (!user) {
      isNew = true;

      // Lookup default country & language
      let defaultCountry = await prisma.country.findFirst();
      if (!defaultCountry) {
        defaultCountry = await prisma.country.create({
          data: {
            code: 'OMN',
            name: 'Oman',
            phonePrefix: '+968',
            currencyCode: 'USD',
          },
        });
      }

      let defaultLang = await prisma.language.findFirst();
      if (!defaultLang) {
        defaultLang = await prisma.language.create({
          data: {
            code: 'en',
            name: 'English',
            nativeName: 'English',
          },
        });
      }

      user = await prisma.user.create({
        data: {
          email: userEmail,
          passwordHash: `GOOGLE_FEDERATED_${Date.now()}`,
          role: UserRoleType.PATIENT,
          patient: {
            create: {
              firstName,
              lastName,
              dateOfBirth: new Date('1990-01-01'),
              gender: 'MALE',
              nationalityCountryId: defaultCountry.id,
              residenceCountryId: defaultCountry.id,
              primaryLanguageId: defaultLang.id,
            },
          },
        },
        include: {
          patient: true,
          careCoordinator: true,
          doctorProfile: true,
        },
      });
    }

    // Sign GoHealthTrip Auth JWT
    const token = await signAuthToken({
      userId: user.id,
      email: user.email,
      role: user.role,
      patientId: user.patient?.id,
      coordinatorId: user.careCoordinator?.id,
      doctorId: user.doctorProfile?.id,
    });

    // Record Audit Log
    await recordAuditLog({
      entityName: 'User',
      entityId: user.id,
      userId: user.id,
      action: AuditAction.LOGIN,
      reason: isNew ? 'User registered via Google Federated Auth' : 'User logged in via Google Federated Auth',
    });

    const response = apiSuccess({
      token,
      isNew,
      user: {
        id: user.id,
        email: user.email,
        name: `${firstName} ${lastName}`.trim(),
        role: user.role,
        avatar: userAvatar,
        patient: user.patient,
        careCoordinator: user.careCoordinator,
        doctorProfile: user.doctorProfile,
      },
    });

    // Set secure cookie
    response.cookies.set('ght_token', token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error: any) {
    console.error('Google Federated Auth Error:', error);
    return apiError(error.message || 'Google authentication failed', 'GOOGLE_AUTH_ERROR', 500);
  }
}
