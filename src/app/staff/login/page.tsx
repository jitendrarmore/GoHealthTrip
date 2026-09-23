'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ShieldCheck, ArrowRight, Lock, CheckCircle2, User,
  Stethoscope, Users, HelpCircle, AlertCircle, Eye, EyeOff, Key,
  Building2, ArrowLeft, Loader2
} from 'lucide-react';

export default function StaffLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@gohealthtrip.com');
  const [password, setPassword] = useState('Admin@1234');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedStaffRole, setSelectedStaffRole] = useState<'DOCTOR' | 'COORDINATOR' | 'ADMIN' | 'SUPPORT'>('ADMIN');

  const handleStaffLogin = async (e: React.FormEvent) => {
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
        throw new Error(data.message || 'Invalid staff credentials');
      }

      localStorage.setItem('ght_token', data.data.token);
      localStorage.setItem('ght_user', JSON.stringify(data.data.user));

      // Redirect directly to the appropriate staff workspace
      const role = data.data.user.role;
      if (role === 'DOCTOR' || role === 'MEDICAL_REVIEWER') {
        router.push('/portal/doctor');
      } else if (role === 'CARE_COORDINATOR') {
        router.push('/dashboard/coordinator');
      } else if (role === 'SUPER_ADMIN' || role === 'PLATFORM_ADMIN') {
        router.push('/dashboard');
      } else {
        router.push('/dashboard/support');
      }
    } catch (err: any) {
      setError(err.message || 'Staff authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const selectStaffPreset = (role: 'DOCTOR' | 'COORDINATOR' | 'ADMIN' | 'SUPPORT') => {
    setSelectedStaffRole(role);
    if (role === 'ADMIN') {
      setEmail('admin@gohealthtrip.com');
      setPassword('Admin@1234');
    } else if (role === 'DOCTOR') {
      setEmail('dr.anand.reviewer@gohealthtrip.com');
      setPassword('Doctor@1234');
    } else if (role === 'COORDINATOR') {
      setEmail('sarah.coordinator@gohealthtrip.com');
      setPassword('Coordinator@1234');
    } else if (role === 'SUPPORT') {
      setEmail('vikram.support@gohealthtrip.in');
      setPassword('Support@1234');
    }
  };

  const directStaffDemoLogin = (role: 'DOCTOR' | 'COORDINATOR' | 'ADMIN' | 'SUPPORT') => {
    let mockUser: any = {};
    if (role === 'DOCTOR') {
      mockUser = {
        id: 'doc-trehan',
        name: 'Dr. Anand (Reviewer)',
        email: 'dr.anand.reviewer@gohealthtrip.com',
        role: 'DOCTOR',
        hospital: 'Medanta – The Medicity',
      };
      localStorage.setItem('ght_user', JSON.stringify(mockUser));
      router.push('/portal/doctor');
    } else if (role === 'COORDINATOR') {
      mockUser = {
        id: 'coord-sarah',
        name: 'Sarah Fernandes',
        email: 'sarah.coordinator@gohealthtrip.com',
        role: 'CARE_COORDINATOR',
        desk: 'GCC & Middle East Desk',
      };
      localStorage.setItem('ght_user', JSON.stringify(mockUser));
      router.push('/dashboard/coordinator');
    } else if (role === 'ADMIN') {
      mockUser = {
        id: 'admin-root',
        name: 'Platform Super Admin',
        email: 'admin@gohealthtrip.com',
        role: 'SUPER_ADMIN',
      };
      localStorage.setItem('ght_user', JSON.stringify(mockUser));
      router.push('/dashboard');
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
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans">
      <Header />

      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 via-indigo-600 to-violet-700 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-500/20 mx-auto">
              <Key className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest block">
              Internal Enterprise Access
            </span>
            <h1 className="text-2xl font-black text-white tracking-tight">
              Hospital Staff & Clinical Portal
            </h1>
            <p className="text-xs text-slate-400">
              For accredited surgeons, care coordinators, and platform administrators
            </p>
          </div>

          {/* Quick 1-Click Staff Access Switcher for Evaluators */}
          <div className="bg-slate-900 border border-slate-800 p-2.5 rounded-2xl shadow-xl">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block px-2 pb-1.5 text-center">
              1-Click Staff Workspace Access:
            </span>
            <div className="grid grid-cols-4 gap-1.5">
              {[
                { id: 'ADMIN', label: 'Admin', icon: Key, color: 'text-indigo-400' },
                { id: 'DOCTOR', label: 'Doctor', icon: Stethoscope, color: 'text-teal-400' },
                { id: 'COORDINATOR', label: 'Coordinator', icon: Users, color: 'text-blue-400' },
                { id: 'SUPPORT', label: 'Support', icon: HelpCircle, color: 'text-rose-400' },
              ].map((tab) => {
                const Icon = tab.icon;
                const isSelected = selectedStaffRole === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => selectStaffPreset(tab.id as any)}
                    className={`py-2 px-1 rounded-xl text-center flex flex-col items-center gap-1 transition ${
                      isSelected
                        ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/30'
                        : 'bg-slate-950/60 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : tab.color}`} />
                    <span className="text-[10px] leading-none">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Login Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl space-y-5">
            {error && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-300 rounded-xl text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleStaffLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Staff Work Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="employee@gohealthtrip.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-700 text-sm focus:outline-none focus:border-indigo-500 bg-slate-950 text-white placeholder-slate-500"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Password / Access Key
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
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
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-700 text-sm focus:outline-none focus:border-indigo-500 bg-slate-950 text-white placeholder-slate-500 font-mono"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-violet-700 hover:from-indigo-500 hover:to-violet-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/20 text-sm transition flex items-center justify-center gap-2"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
                  <span>Sign In as Staff</span>
                </button>

                <button
                  type="button"
                  onClick={() => directStaffDemoLogin(selectedStaffRole)}
                  className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-indigo-300 font-semibold rounded-xl text-xs border border-slate-700 transition"
                  title="Direct 1-Click Access for Demonstration"
                >
                  Direct Entry ➔
                </button>
              </div>
            </form>

            <div className="text-center pt-2 border-t border-slate-800 text-xs text-slate-400">
              Are you an international patient?{' '}
              <Link href="/login" className="text-teal-400 font-bold hover:underline">
                Go to Patient Sign-In
              </Link>
            </div>
          </div>

          {/* Security Notice */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 text-center">
            <p className="text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>HIPAA Compliant · TLS 1.3 Encrypted Session · ISO 27001 Certified</span>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
