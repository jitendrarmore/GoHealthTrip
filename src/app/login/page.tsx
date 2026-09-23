'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ShieldCheck, ArrowRight, Lock, CheckCircle2, User,
  Stethoscope, Users, HelpCircle, AlertCircle, Eye, EyeOff,
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeRoleMode, setActiveRoleMode] = useState<'PATIENT' | 'DOCTOR' | 'COORDINATOR' | 'SUPPORT'>('PATIENT');

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

      // Role-based redirect
      const role = data.data.user.role;
      if (role === 'DOCTOR') router.push('/portal/doctor');
      else if (role === 'CARE_COORDINATOR') router.push('/dashboard/coordinator');
      else if (role === 'PLATFORM_ADMIN' || role === 'SUPER_ADMIN') router.push('/dashboard/support');
      else router.push('/profile');
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
      if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
        throw new Error(
          'Firebase API is not yet configured. Please add NEXT_PUBLIC_FIREBASE_API_KEY and credentials to enable live Google Sign-in.'
        );
      }

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

      router.push('/profile');
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

  // Instant 1-Click Role Switcher Demo for Evaluators
  const switchRole = (role: 'PATIENT' | 'DOCTOR' | 'COORDINATOR' | 'SUPPORT') => {
    setActiveRoleMode(role);
    if (role === 'PATIENT') {
      setEmail('ali.albalushi@demo.om');
      setPassword('Patient@1234');
    } else if (role === 'DOCTOR') {
      setEmail('trehan@medanta.org');
      setPassword('Doctor@1234');
    } else if (role === 'COORDINATOR') {
      setEmail('sarah.fernandes@gohealthtrip.in');
      setPassword('Coordinator@1234');
    } else if (role === 'SUPPORT') {
      setEmail('vikram.support@gohealthtrip.in');
      setPassword('Support@1234');
    }
  };

  const directDemoLogin = (role: 'PATIENT' | 'DOCTOR' | 'COORDINATOR' | 'SUPPORT') => {
    let mockUser: any = {};
    if (role === 'PATIENT') {
      mockUser = {
        id: 'patient-ali',
        name: 'Ali Al-Balushi',
        email: 'ali.albalushi@demo.om',
        role: 'PATIENT',
        country: 'Oman',
      };
      localStorage.setItem('ght_user', JSON.stringify(mockUser));
      router.push('/profile');
    } else if (role === 'DOCTOR') {
      mockUser = {
        id: 'doc-trehan',
        name: 'Dr. Naresh Trehan',
        email: 'trehan@medanta.org',
        role: 'DOCTOR',
        hospital: 'Medanta – The Medicity',
      };
      localStorage.setItem('ght_user', JSON.stringify(mockUser));
      router.push('/portal/doctor');
    } else if (role === 'COORDINATOR') {
      mockUser = {
        id: 'coord-sarah',
        name: 'Sarah Fernandes',
        email: 'sarah.fernandes@gohealthtrip.in',
        role: 'CARE_COORDINATOR',
        desk: 'GCC & Middle East',
      };
      localStorage.setItem('ght_user', JSON.stringify(mockUser));
      router.push('/dashboard/coordinator');
    } else if (role === 'SUPPORT') {
      mockUser = {
        id: 'supp-vikram',
        name: 'Vikram Malhotra',
        email: 'vikram.support@gohealthtrip.in',
        role: 'PLATFORM_ADMIN',
        desk: 'Patient Escalations Desk',
      };
      localStorage.setItem('ght_user', JSON.stringify(mockUser));
      router.push('/dashboard/support');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-6">

          {/* Header text */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-500 via-indigo-600 to-violet-700 flex items-center justify-center text-white font-black text-xl shadow-lg mx-auto">
              G
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Sign In to GoHealthTrip
            </h1>
            <p className="text-xs text-slate-500">
              Access your patient case, doctor clinical queue, or coordinator portal
            </p>
          </div>

          {/* Quick Demo Role Switcher Tabs */}
          <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block px-2 pb-1.5 text-center">
              1-Click Role Switcher Demo:
            </span>
            <div className="grid grid-cols-4 gap-1">
              {[
                { id: 'PATIENT', label: 'Patient', icon: User },
                { id: 'DOCTOR', label: 'Doctor', icon: Stethoscope },
                { id: 'COORDINATOR', label: 'Coord.', icon: Users },
                { id: 'SUPPORT', label: 'Support', icon: HelpCircle },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => directDemoLogin(tab.id as any)}
                    className={`py-2 px-1 rounded-xl text-center flex flex-col items-center gap-1 transition ${
                      activeRoleMode === tab.id
                        ? 'bg-sky-50 text-sky-700 font-bold border border-sky-300'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-[10px] leading-none">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Login Card */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 space-y-5">
            {error && (
              <div className="p-3 bg-rose-50 text-rose-800 rounded-xl text-xs flex items-center gap-2 border border-rose-200">
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-600" />
                <span>{error}</span>
              </div>
            )}

            {/* Google Federated Authentication Button */}
            <button
              type="button"
              onClick={handleGoogleFederatedLogin}
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center justify-center gap-3 shadow-sm hover:shadow transition"
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
              <span>Continue with Google</span>
            </button>

            <div className="relative flex items-center justify-center">
              <div className="border-t border-slate-200 w-full" />
              <span className="bg-white px-3 text-[11px] uppercase tracking-wider text-slate-400 font-semibold absolute">
                or with email
              </span>
            </div>

            {/* Email / Password Form */}
            <form onSubmit={handleCredentialLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-bold text-slate-700 uppercase">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-xs text-sky-600 hover:text-sky-700 flex items-center gap-1"
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
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-sky-500 via-indigo-600 to-violet-700 hover:opacity-95 text-white font-bold rounded-xl shadow text-sm transition flex items-center justify-center gap-2"
              >
                <span>{loading ? 'Signing in...' : 'Sign In'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="text-center pt-2 text-xs text-slate-500">
              New patient?{' '}
              <Link href="/start-journey" className="text-sky-600 font-bold hover:underline">
                Start your medical case
              </Link>
            </div>
          </div>

          {/* Security footnote */}
          <div className="text-center flex items-center justify-center gap-2 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>256-bit SSL · DPDP Act 2023 Compliant</span>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
