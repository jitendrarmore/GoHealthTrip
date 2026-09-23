'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ShieldCheck, ArrowRight, Lock, CheckCircle2, User, Phone, Mail,
  AlertCircle, MessageSquare, Send, RefreshCw, Loader2, Sparkles,
  Smartphone, Globe
} from 'lucide-react';

export default function PatientSignUpPage() {
  const router = useRouter();

  // Mode: 'PHONE' or 'EMAIL'
  const [method, setMethod] = useState<'PHONE' | 'EMAIL'>('PHONE');
  const [phoneChannel, setPhoneChannel] = useState<'WHATSAPP' | 'SMS'>('WHATSAPP');

  // Form inputs
  const [fullName, setFullName] = useState('');
  const [phonePrefix, setPhonePrefix] = useState('+91');
  const [phoneBody, setPhoneBody] = useState('');
  const [email, setEmail] = useState('');

  // OTP State
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [demoCode, setDemoCode] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(60);
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Countdown timer
  useEffect(() => {
    let timer: any;
    if (otpSent && countdown > 0) {
      timer = setInterval(() => setCountdown((c) => c - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [otpSent, countdown]);

  const targetRecipient = method === 'PHONE' ? `${phonePrefix}${phoneBody}`.trim() : email.trim();

  const handleSendOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (method === 'PHONE' && !phoneBody.trim()) {
      setError('Please enter your mobile phone number.');
      return;
    }
    if (method === 'EMAIL' && !email.trim()) {
      setError('Please enter your email address.');
      return;
    }

    setSending(true);

    try {
      const res = await fetch('/api/v1/auth/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipient: targetRecipient,
          channel: method === 'PHONE' ? phoneChannel : 'EMAIL',
          fullName: fullName.trim() || 'Patient',
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to send verification code');
      }

      setOtpSent(true);
      setCountdown(60);
      setSuccessMsg(data.data.message || 'Verification code sent!');
      if (data.data.demoOtp) {
        setDemoCode(data.data.demoOtp);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to send verification code.');
    } finally {
      setSending(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setVerifying(true);

    try {
      const res = await fetch('/api/v1/auth/otp/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipient: targetRecipient,
          otp: otp.trim(),
          fullName: fullName.trim() || 'Patient',
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Invalid verification code');
      }

      localStorage.setItem('ght_token', data.data.token);
      localStorage.setItem('ght_user', JSON.stringify(data.data.user));

      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Verification failed. Please check the code.');
    } finally {
      setVerifying(false);
    }
  };

  // Google 1-click fallback
  const handleGoogleSignUp = async () => {
    setError('');
    setSending(true);
    try {
      const { signInWithPopup } = await import('firebase/auth');
      const { auth, googleProvider } = await import('@/lib/firebase');

      const result = await signInWithPopup(auth, googleProvider);
      const googleUser = result.user;
      const idToken = await googleUser.getIdToken();

      const res = await fetch('/api/v1/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: googleUser.email,
          name: googleUser.displayName || 'Google Patient',
          picture: googleUser.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&q=80',
          googleId: googleUser.uid,
          idToken,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Google sign-up failed');
      }

      localStorage.setItem('ght_token', data.data.token);
      localStorage.setItem('ght_user', JSON.stringify(data.data.user));

      router.push('/dashboard');
    } catch (err: any) {
      if (err?.code === 'auth/popup-closed-by-user') {
        setError('Sign-up cancelled: Google window closed.');
      } else {
        setError(err.message || 'Google sign-up failed');
      }
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-slate-100 font-sans">
      <Header />

      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-600 via-teal-500 to-emerald-500 flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-teal-500/20 mx-auto border-2 border-white/20">
              G
            </div>
            <span className="text-xs font-bold text-teal-400 uppercase tracking-widest block">
              Patient Registration
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Create Your Patient Account
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm mx-auto">
              Sign up with Mobile Number (WhatsApp / SMS) or Email to access accredited Indian hospital care.
            </p>
          </div>

          {/* Sign Up Card */}
          <div className="bg-slate-800/90 border border-slate-700/80 rounded-3xl p-8 shadow-2xl space-y-6 backdrop-blur-sm">
            {/* Error & Info Alerts */}
            {error && (
              <div className="p-3.5 bg-rose-500/10 border border-rose-500/20 text-rose-300 rounded-xl text-xs flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400" />
                <span>{error}</span>
              </div>
            )}

            {successMsg && (
              <div className="p-3.5 bg-teal-500/10 border border-teal-500/20 text-teal-300 rounded-xl text-xs flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-teal-400" />
                <span>{successMsg}</span>
              </div>
            )}

            {/* Simulated Verified OTP Banner for Frictionless Testing */}
            {demoCode && otpSent && (
              <div className="p-4 rounded-xl bg-teal-950/60 border border-teal-500/40 text-center animate-fadeIn">
                <div className="text-[11px] font-bold uppercase tracking-wider text-teal-400 mb-1">
                  Verified Verification Code
                </div>
                <div className="text-2xl font-mono font-black text-white tracking-widest bg-slate-900/80 py-1.5 px-4 rounded-lg inline-block border border-teal-500/30">
                  {demoCode}
                </div>
                <p className="text-[11px] text-slate-400 mt-1.5">
                  Enter this 6-digit code below to complete instant verification.
                </p>
              </div>
            )}

            {/* 1-Click Google Sign-Up Button */}
            {!otpSent && (
              <div>
                <button
                  type="button"
                  onClick={handleGoogleSignUp}
                  disabled={sending}
                  className="w-full py-3 px-4 rounded-xl border border-slate-600 bg-white hover:bg-slate-100 text-slate-800 font-bold text-xs flex items-center justify-center gap-3 shadow-md hover:shadow-lg transition-all"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>1-Click Sign Up with Google</span>
                </button>

                <div className="relative flex items-center justify-center my-4">
                  <div className="border-t border-slate-700 w-full" />
                  <span className="bg-slate-800 px-3 text-[10px] uppercase tracking-wider text-slate-400 font-semibold absolute">
                    or register with mobile / email
                  </span>
                </div>
              </div>
            )}

            {/* STEP 1: Enter Info & Request OTP */}
            {!otpSent ? (
              <form onSubmit={handleSendOtp} className="space-y-4">
                {/* Method Switcher Tabs */}
                <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-900 border border-slate-700 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setMethod('PHONE')}
                    className={`py-2 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                      method === 'PHONE'
                        ? 'bg-teal-500 text-white shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>Mobile Phone</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setMethod('EMAIL')}
                    className={`py-2 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                      method === 'EMAIL'
                        ? 'bg-teal-500 text-white shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Email Address</span>
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Tariq Al-Harthy"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-700 text-sm focus:outline-none focus:border-teal-500 bg-slate-900/80 text-white placeholder-slate-500"
                  />
                </div>

                {method === 'PHONE' ? (
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                      Mobile Number
                    </label>
                    <div className="flex gap-2">
                      <select
                        value={phonePrefix}
                        onChange={(e) => setPhonePrefix(e.target.value)}
                        className="w-24 px-2 py-2.5 rounded-xl border border-slate-700 text-xs font-semibold focus:outline-none focus:border-teal-500 bg-slate-900 text-white"
                      >
                        <option value="+91">🇮🇳 +91</option>
                        <option value="+968">🇴🇲 +968</option>
                        <option value="+971">🇦🇪 +971</option>
                        <option value="+966">🇸🇦 +966</option>
                        <option value="+254">🇰🇪 +254</option>
                        <option value="+234">🇳🇬 +234</option>
                        <option value="+255">🇹🇿 +255</option>
                        <option value="+44">🇬🇧 +44</option>
                        <option value="+1">🇺🇸 +1</option>
                        <option value="+1">🇨🇦 +1</option>
                      </select>
                      <input
                        type="tel"
                        required
                        value={phoneBody}
                        onChange={(e) => setPhoneBody(e.target.value)}
                        placeholder="9123 4567"
                        className="flex-1 px-4 py-2.5 rounded-xl border border-slate-700 text-sm focus:outline-none focus:border-teal-500 bg-slate-900/80 text-white placeholder-slate-500 font-mono"
                      />
                    </div>

                    {/* Delivery Channel Radio Pills */}
                    <div className="mt-3">
                      <span className="text-[11px] font-semibold text-slate-400 block mb-1.5">
                        Deliver OTP via:
                      </span>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setPhoneChannel('WHATSAPP')}
                          className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                            phoneChannel === 'WHATSAPP'
                              ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                              : 'bg-slate-900/60 border-slate-700 text-slate-400 hover:text-white'
                          }`}
                        >
                          <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                          <span>WhatsApp OTP</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setPhoneChannel('SMS')}
                          className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                            phoneChannel === 'SMS'
                              ? 'bg-teal-500/20 border-teal-500/40 text-teal-300'
                              : 'bg-slate-900/60 border-slate-700 text-slate-400 hover:text-white'
                          }`}
                        >
                          <Smartphone className="w-3.5 h-3.5 text-teal-400" />
                          <span>SMS Text OTP</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="patient@example.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-700 text-sm focus:outline-none focus:border-teal-500 bg-slate-900/80 text-white placeholder-slate-500"
                    />
                    <p className="text-[11px] text-slate-400 mt-1">
                      A 6-digit verification code will be sent to your inbox.
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full py-3 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-teal-500/20 text-sm transition flex items-center justify-center gap-2"
                >
                  {sending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending Verification Code...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Verification Code</span>
                    </>
                  )}
                </button>
              </form>
            ) : (
              /* STEP 2: Enter & Verify OTP */
              <form onSubmit={handleVerifyOtp} className="space-y-5 animate-fadeIn">
                <div className="text-center">
                  <div className="text-xs text-slate-400">
                    We sent a 6-digit code to{' '}
                    <span className="font-bold text-teal-300 font-mono">{targetRecipient}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5 text-center">
                    Enter 6-Digit Verification Code
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    autoFocus
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    placeholder="••••••"
                    className="w-full py-3 px-4 rounded-xl border border-teal-500/60 text-center text-2xl font-mono tracking-[0.5em] focus:outline-none focus:border-teal-400 bg-slate-950 text-white shadow-inner"
                  />
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400">
                  <button
                    type="button"
                    onClick={() => {
                      setOtpSent(false);
                      setDemoCode(null);
                    }}
                    className="text-slate-400 hover:text-white underline"
                  >
                    Change Number/Email
                  </button>

                  <button
                    type="button"
                    disabled={countdown > 0 || sending}
                    onClick={() => handleSendOtp()}
                    className={`flex items-center gap-1 font-semibold ${
                      countdown > 0 ? 'text-slate-500 cursor-not-allowed' : 'text-teal-400 hover:underline'
                    }`}
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>{countdown > 0 ? `Resend in ${countdown}s` : 'Resend Code'}</span>
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={verifying || otp.length < 6}
                  className="w-full py-3 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 disabled:opacity-50 text-white font-bold rounded-xl shadow-lg shadow-teal-500/20 text-sm transition flex items-center justify-center gap-2"
                >
                  {verifying ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Verifying & Setting Up Dossier...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Verify & Access Dashboard</span>
                    </>
                  )}
                </button>
              </form>
            )}

            <div className="text-center pt-2 text-xs text-slate-400 border-t border-slate-700">
              Already registered?{' '}
              <Link href="/login" className="text-teal-400 font-bold hover:underline">
                Sign in to your account
              </Link>
            </div>
          </div>

          {/* Security Notice */}
          <div className="text-center">
            <p className="text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>HIPAA Compliant · DPDP 2023 Protected · 256-Bit SSL Encryption</span>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
