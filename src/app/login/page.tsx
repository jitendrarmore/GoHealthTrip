'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ShieldCheck, ArrowRight, Lock, CheckCircle2, User,
  AlertCircle, Eye, EyeOff, Loader2, Sparkles, HeartHandshake,
  Briefcase
} from 'lucide-react';
import Logo from '@/components/Logo';

export default function PatientLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCredentialLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Invalid credentials');
      }

      localStorage.setItem('ght_token', data.data.token);
      localStorage.setItem('ght_user', JSON.stringify(data.data.user));

      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleFederatedLogin = async () => {
    setLoading(true);
    setError('');

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
        throw new Error(data.message || 'Google federated login failed');
      }

      localStorage.setItem('ght_token', data.data.token);
      localStorage.setItem('ght_user', JSON.stringify(data.data.user));

      router.push('/dashboard');
    } catch (err: any) {
      if (err?.code === 'auth/popup-closed-by-user') {
        setError('Sign-in cancelled: Google account selection was closed.');
      } else if (err?.code === 'auth/unauthorized-domain') {
        setError(
          'Domain not authorized: Please add "gohealthtrip.vercel.app" to Firebase Console -> Authentication -> Settings -> Authorized Domains.'
        );
      } else {
        setError(err.message || 'Google federated sign-in failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-slate-100 font-sans">
      <Header />

      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <Logo variant="icon" theme="dark" className="w-20 h-12 mx-auto mb-1" />
            <span className="text-xs font-bold text-teal-400 uppercase tracking-widest block">
              Patient Portal Sign-In
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Welcome to GoHealthTrip
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm mx-auto">
              Access your confidential treatment plan, surgeon opinions, and Indian medical visa documents.
            </p>
          </div>

          {/* Tab Switcher: Sign In vs Sign Up */}
          <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-800/80 border border-slate-700/80 rounded-2xl shadow-md">
            <button
              type="button"
              className="py-2.5 px-4 rounded-xl text-xs font-bold bg-teal-500 text-white shadow-sm transition"
            >
              Sign In
            </button>
            <Link
              href="/signup"
              className="py-2.5 px-4 rounded-xl text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-700/60 transition text-center flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-teal-400" />
              <span>Create Account (Sign Up)</span>
            </Link>
          </div>

          {/* Login Card */}
          <div className="bg-slate-800/90 border border-slate-700/80 rounded-3xl p-8 shadow-2xl space-y-6 backdrop-blur-sm">
            {error && (
              <div className="p-3.5 bg-rose-500/10 border border-rose-500/20 text-rose-300 rounded-xl text-xs flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400" />
                <span>{error}</span>
              </div>
            )}

            {/* Google Federated Authentication Button */}
            <div>
              <button
                type="button"
                onClick={handleGoogleFederatedLogin}
                disabled={loading}
                className="w-full py-3.5 px-4 rounded-xl border border-slate-600 bg-white hover:bg-slate-100 text-slate-800 font-bold text-sm flex items-center justify-center gap-3 shadow-md hover:shadow-lg transition-all"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
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
                <span>Continue with Google</span>
              </button>
              <p className="text-[11px] text-slate-400 text-center mt-2">
                1-click instant login with your verified Google account
              </p>
            </div>

            <div className="relative flex items-center justify-center">
              <div className="border-t border-slate-700 w-full" />
              <span className="bg-slate-800 px-3 text-[11px] uppercase tracking-wider text-slate-400 font-semibold absolute">
                or sign in with email
              </span>
            </div>

            {/* Email / Password Form */}
            <form onSubmit={handleCredentialLogin} className="space-y-4">
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
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-xs text-teal-400 hover:text-teal-300 flex items-center gap-1"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    <span>{showPassword ? 'Hide' : 'Show'}</span>
                  </button>
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-700 text-sm focus:outline-none focus:border-teal-500 bg-slate-900/80 text-white placeholder-slate-500 font-mono"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-teal-500/20 text-sm transition flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
                <span>Sign In as Patient</span>
              </button>
            </form>

            <div className="text-center pt-2 text-xs text-slate-400">
              Don't have an account?{' '}
              <Link href="/signup" className="text-teal-400 font-bold hover:underline">
                Sign up with Mobile Number or Email ➔
              </Link>
            </div>
          </div>

          {/* Distinct Enterprise / Staff Navigation Callout */}
          <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 flex-shrink-0">
                <Briefcase className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">Hospital Staff or Coordinator?</div>
                <div className="text-[11px] text-slate-400">Doctors, Coordinators & Admins have a dedicated portal</div>
              </div>
            </div>
            <Link
              href="/staff/login"
              className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold whitespace-nowrap shadow-sm transition"
            >
              Staff Portal ➔
            </Link>
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
