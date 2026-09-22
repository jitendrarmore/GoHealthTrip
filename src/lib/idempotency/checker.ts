import prisma from '@/lib/prisma';

// In-memory / DB-backed Idempotency store (compatible with Vercel serverless)
export class IdempotencyService {
  static async checkAndLock(idempotencyKey: string, actionName: string): Promise<{ isDuplicate: boolean; existingRecord?: any }> {
    if (!idempotencyKey) {
      return { isDuplicate: false };
    }

    // Check payments or other critical mutations
    if (actionName === 'PAYMENT') {
      const existingPayment = await prisma.payment.findUnique({
        where: { idempotencyKey },
      });
      if (existingPayment) {
        return { isDuplicate: true, existingRecord: existingPayment };
      }
    }

    return { isDuplicate: false };
  }
}
