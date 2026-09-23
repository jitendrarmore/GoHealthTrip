import nodemailer from 'nodemailer';

export interface SendOtpEmailParams {
  to: string;
  otp: string;
  fullName?: string;
}

/**
 * Sends a 6-digit OTP verification email using Gmail SMTP or Resend API fallback.
 */
export async function sendOtpEmail({ to, otp, fullName = 'Patient' }: SendOtpEmailParams) {
  const gmailUser = process.env.GMAIL_USER || 'gohealthtripcom@gmail.com';
  const gmailPass = process.env.GMAIL_APP_PASSWORD;

  // 1. Primary: Gmail SMTP (gohealthtripcom@gmail.com)
  if (gmailPass) {
    try {
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // SSL for port 465
        auth: {
          user: gmailUser,
          pass: gmailPass.replace(/\s+/g, ''), // Strip spaces from Google App Password
        },
        connectionTimeout: 10000,
        greetingTimeout: 10000,
        socketTimeout: 15000,
      });

      const info = await transporter.sendMail({
        from: `"GoHealthTrip India" <${gmailUser}>`,
        to,
        subject: `Your GoHealthTrip Verification Code: ${otp}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 28px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff;">
            <div style="text-align: center; margin-bottom: 24px;">
              <h2 style="color: #0d9488; margin: 0; font-size: 26px; font-weight: 800; letter-spacing: -0.5px;">GoHealthTrip India</h2>
              <p style="color: #64748b; font-size: 13px; margin: 6px 0 0 0; font-weight: 500;">Accredited Healthcare & Medical Tourism Platform</p>
            </div>
            <p style="color: #334155; font-size: 15px; margin-bottom: 12px;">Hello <strong>${fullName}</strong>,</p>
            <p style="color: #475569; font-size: 14px; line-height: 1.6; margin-bottom: 20px;">
              Thank you for registering with GoHealthTrip. Please use the following 6-digit verification code to complete your registration and access your medical travel dossier:
            </p>
            <div style="background: #f0fdfa; border: 2px solid #0d9488; padding: 20px; text-align: center; border-radius: 12px; margin: 24px 0;">
              <span style="font-size: 38px; font-weight: 900; letter-spacing: 10px; color: #0f766e; font-family: 'Courier New', Courier, monospace;">${otp}</span>
            </div>
            <p style="font-size: 12px; color: #64748b; line-height: 1.5; margin-bottom: 24px;">
              This code will expire in <strong>5 minutes</strong>. If you did not request this verification code, please ignore this email or contact support.
            </p>
            <hr style="border: none; border-top: 1px solid #f1f5f9; margin: 24px 0;" />
            <p style="font-size: 11px; color: #94a3b8; text-align: center; margin: 0;">
              GoHealthTrip India · NABH / JCI Accredited Hospital Partner Network<br />
              New Delhi · Mumbai · Bengaluru · Chennai · Hyderabad
            </p>
          </div>
        `,
      });

      console.log('Gmail SMTP dispatch succeeded:', info.messageId);
      return { success: true, messageId: info.messageId, provider: 'GMAIL_SMTP' };
    } catch (smtpErr: any) {
      console.error('Gmail SMTP dispatch failed:', smtpErr.message);
    }
  }

  // 2. Fallback: Resend API (if configured)
  if (process.env.RESEND_API_KEY) {
    try {
      const apiKey = process.env.RESEND_API_KEY.startsWith('re_')
        ? process.env.RESEND_API_KEY
        : `re_${process.env.RESEND_API_KEY}`;

      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: process.env.EMAIL_FROM || 'GoHealthTrip <auth@gohealthtrip.com>',
          to,
          subject: `Your GoHealthTrip Verification Code: ${otp}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2 style="color: #0d9488;">GoHealthTrip India · Patient Verification</h2>
              <p>Hello ${fullName},</p>
              <p>Your verification code is: <strong>${otp}</strong> (valid for 5 minutes).</p>
            </div>
          `,
        }),
      });

      const resendJson = await res.json();
      return { success: res.ok, data: resendJson, provider: 'RESEND' };
    } catch (resendErr: any) {
      console.warn('Resend fallback skipped or failed:', resendErr.message);
    }
  }

  return { success: false, reason: 'No email service credentials configured' };
}
