import prisma from '@/lib/prisma';
import { AuditAction } from '@prisma/client';
import { headers } from 'next/headers';

export interface AuditParams {
  entityName: string;
  entityId: string;
  action: AuditAction;
  userId?: string;
  oldValues?: any;
  newValues?: any;
  reason?: string;
  ipAddress?: string;
  userAgent?: string;
}

export async function recordAuditLog(params: AuditParams) {
  try {
    let clientIp = params.ipAddress;
    let clientUserAgent = params.userAgent;

    if (!clientIp || !clientUserAgent) {
      try {
        const reqHeaders = await headers();
        clientIp = clientIp || reqHeaders.get('x-forwarded-for') || reqHeaders.get('x-real-ip') || '127.0.0.1';
        clientUserAgent = clientUserAgent || reqHeaders.get('user-agent') || 'GoHealthTrip-Client';
      } catch (e) {
        // Fallback if called outside request context
        clientIp = clientIp || '127.0.0.1';
        clientUserAgent = clientUserAgent || 'System-Event';
      }
    }

    return await prisma.auditLog.create({
      data: {
        entityName: params.entityName,
        entityId: params.entityId,
        userId: params.userId,
        action: params.action,
        oldValuesJson: params.oldValues ? JSON.parse(JSON.stringify(params.oldValues)) : undefined,
        newValuesJson: params.newValues ? JSON.parse(JSON.stringify(params.newValues)) : undefined,
        reason: params.reason,
        ipAddress: clientIp,
        userAgent: clientUserAgent,
      },
    });
  } catch (error) {
    console.error('⚠️ Failed to record audit log:', error);
    // Note: In high-compliance environments, audit failures can be routed to a dead-letter queue or fail-open/fail-closed per policy
  }
}
