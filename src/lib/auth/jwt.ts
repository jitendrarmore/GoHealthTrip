import { SignJWT, jwtVerify } from 'jose';
import { UserRoleType } from '@prisma/client';

const JWT_SECRET = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET || 'ght_super_secret_session_key_production_grade_32_bytes'
);

export interface AuthPayload {
  userId: string;
  email: string;
  role: UserRoleType;
  patientId?: string;
  coordinatorId?: string;
  doctorId?: string;
}

export async function signAuthToken(payload: AuthPayload): Promise<string> {
  return await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(JWT_SECRET);
}

export async function verifyAuthToken(token: string): Promise<AuthPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as AuthPayload;
  } catch (error) {
    return null;
  }
}
