import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { apiSuccess } from '@/lib/api/response';
import { CacheService } from '@/lib/cache/redis';

export async function GET() {
  const CACHE_KEY = 'catalogs:hospitals:all';

  const hospitals = await CacheService.getOrSet(
    CACHE_KEY,
    async () => {
      return await prisma.hospital.findMany({
        where: { isActive: true },
        include: {
          hospitalDoctors: {
            include: { doctor: true },
          },
          country: true,
        },
      });
    },
    3600 // 1 hour TTL
  );

  return apiSuccess(hospitals, 200, {
    cached: true,
    cacheTtlSeconds: 3600,
    total: hospitals.length,
  });
}
