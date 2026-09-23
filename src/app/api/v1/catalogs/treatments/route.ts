import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { apiSuccess } from '@/lib/api/response';
import { CacheService } from '@/lib/cache/redis';

export async function GET() {
  const CACHE_KEY = 'catalogs:treatments:all';

  const treatments = await CacheService.getOrSet(
    CACHE_KEY,
    async () => {
      return await prisma.treatment.findMany({
        where: { isActive: true },
        include: {
          procedures: true,
          packages: true,
        },
      });
    },
    3600 // 1 hour TTL
  );

  return apiSuccess(treatments, 200, {
    cached: true,
    cacheTtlSeconds: 3600,
    total: treatments.length,
  });
}
