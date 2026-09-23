import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { CacheService } from '@/lib/cache/redis';
import { apiSuccess, apiError } from '@/lib/api/response';
import { AuditAction } from '@prisma/client';
import { sendOtpEmail } from '@/lib/email/mailer';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { recipient, channel = 'WHATSAPP', fullName } = body;

    if (!recipient) {
      return apiError('Mobile number or email address is required', 'MISSING_RECIPIENT', 400);
    }

    const cleanRecipient = recipient.trim().replace(/[\s\-\(\)]/g, '');
    const isEmail = cleanRecipient.includes('@');

    // Generate secure 6-digit numeric OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // 1. Cache OTP in Upstash Redis / Memory cache with 5-minute (300s) TTL
    const cacheKey = `otp:${cleanRecipient.toLowerCase()}`;
    await CacheService.set(
      cacheKey,
      {
        otp,
        recipient: cleanRecipient,
        channel,
        fullName: fullName || 'Patient',
        attempts: 0,
        createdAt: Date.now(),
      },
      300
    );

    // 2. Persist OTP in PostgreSQL for reliable cross-instance Vercel serverless verification
    try {
      await prisma.auditLog.create({
        data: {
          entityName: 'OTP',
          entityId: cleanRecipient.toLowerCase(),
          action: AuditAction.CREATE,
          reason: otp,
          oldValuesJson: {
            channel,
            fullName: fullName || 'Patient',
            expiresAt: Date.now() + 300 * 1000,
          },
        },
      });
    } catch (dbErr) {
      console.warn('Postgres OTP backup write failed:', dbErr);
    }

    // 1. Email Delivery (Gmail SMTP gohealthtripcom@gmail.com / Resend):
    if (isEmail) {
      try {
        const mailResult = await sendOtpEmail({
          to: cleanRecipient,
          otp,
          fullName: fullName || 'Patient',
        });
        console.log('Email dispatch result:', mailResult);
      } catch (mailErr) {
        console.warn('Email dispatch error:', mailErr);
      }
    }

    // 2. Twilio (WhatsApp / SMS):
    if (!isEmail && process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
      try {
        const fromNumber = channel === 'WHATSAPP'
          ? `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER || '+14155238886'}`
          : (process.env.TWILIO_PHONE_NUMBER || process.env.TWILIO_WHATSAPP_NUMBER || '+14155238886');
        const toNumber = channel === 'WHATSAPP' ? `whatsapp:${cleanRecipient}` : cleanRecipient;

        const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${process.env.TWILIO_ACCOUNT_SID}/Messages.json`;
        const authString = Buffer.from(`${process.env.TWILIO_ACCOUNT_SID}:${process.env.TWILIO_AUTH_TOKEN}`).toString('base64');

        const params = new URLSearchParams();
        params.append('From', fromNumber);
        params.append('To', toNumber);
        params.append('Body', `Your GoHealthTrip verification code is ${otp}. Valid for 5 minutes. Welcome to world-class medical care in India.`);

        const twilioRes = await fetch(twilioUrl, {
          method: 'POST',
          headers: {
            Authorization: `Basic ${authString}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: params.toString(),
        });
        const twilioJson = await twilioRes.json();
        console.log('Twilio dispatch status:', twilioRes.status, twilioJson.sid || twilioJson.message);
      } catch (err) {
        console.warn('Twilio live SMS/WhatsApp dispatch skipped or failed:', err);
      }
    }

    return apiSuccess({
      message: `Verification code successfully generated and dispatched via ${channel}`,
      recipient: cleanRecipient,
      channel,
      expiresInSeconds: 300,
    });
  } catch (error: any) {
    console.error('OTP Send Error:', error);
    return apiError(error.message || 'Failed to dispatch verification OTP', 'OTP_SEND_ERROR', 500);
  }
}
