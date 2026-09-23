import prisma from '@/lib/prisma';
import { CacheService } from '@/lib/cache/redis';

export class IdempotencyService {
  /**
   * Checks for duplicate requests and acquires a distributed lock in Redis / Cache
   */
  static async checkAndLock(idempotencyKey: string, actionName: string): Promise<{ isDuplicate: boolean; existingRecord?: any }> {
    if (!idempotencyKey) {
      return { isDuplicate: false };
    }

    // 1. Check Redis Cache for in-flight or recently processed duplicate
    const cacheKey = `idempotency:${actionName}:${idempotencyKey}`;
    const cachedResponse = await CacheService.get(cacheKey);
    if (cachedResponse) {
      return { isDuplicate: true, existingRecord: cachedResponse };
    }

    // 2. Acquire short-lived lock to prevent concurrent double-clicks
    const lockAcquired = await CacheService.acquireLock(`idempotency_lock:${idempotencyKey}`, 15);
    if (!lockAcquired) {
      return { isDuplicate: true, existingRecord: { status: 'CONCURRENT_REQUEST_IN_PROGRESS' } };
    }

    // 3. Check persistent database
    if (actionName === 'PAYMENT') {
      const existingPayment = await prisma.payment.findUnique({
        where: { idempotencyKey },
      });
      if (existingPayment) {
        await CacheService.set(cacheKey, existingPayment, 86400); // 24h cache
        return { isDuplicate: true, existingRecord: existingPayment };
      }
    }

    return { isDuplicate: false };
  }

  /**
   * Records completed idempotent result into cache
   */
  static async recordResult(idempotencyKey: string, actionName: string, result: any, ttlSeconds = 86400): Promise<void> {
    if (!idempotencyKey) return;
    const cacheKey = `idempotency:${actionName}:${idempotencyKey}`;
    await CacheService.set(cacheKey, result, ttlSeconds);
    await CacheService.releaseLock(`idempotency_lock:${idempotencyKey}`);
  }
}
