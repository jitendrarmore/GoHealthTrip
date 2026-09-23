'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Users, Clock, FileText, ShieldCheck, CreditCard, Plane, 
  Building2, CheckCircle2, AlertTriangle, Search, Filter, 
  ArrowRight, Eye, AlertCircle, Calendar, Sparkles, ChevronRight, 
  Plus, UserCheck, Stethoscope, Heart, Lock, Key, RefreshCw,
  Phone, Mail, Settings, Activity, Award, MessageSquare, Loader2,
  LogOut
} from 'lucide-react';

export default function UnifiedDashboard() {
  const router = useRouter();
  const [userRole, setUserRole] = useState<'PATIENT' | 'DOCTOR' | 'CARE_COORDINATOR' | 'SUPER_ADMIN'>('PATIENT');
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [patientData, setPatientData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Admin state
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [adminLoading, setAdminLoading] = useState(false);
  const [updatingUser, setUpdatingUser] = useState<string | null>(null);
  const [adminActionSuccess, setAdminActionSuccess] = useState('');
  const [activeAdminTab, setActiveAdminTab] = useState<'rbac' | 'operations'>('rbac');

  // Load user from localStorage and fetch user-specific data from DB/Cache
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const storedUserStr = localStorage.getItem('ght_user');
        const token = localStorage.getItem('ght_token') || '';
        let userObj = storedUserStr ? JSON.parse(storedUserStr) : null;

        if (userObj) {
          setCurrentUser(userObj);
          if (userObj.role === 'SUPER_ADMIN' || userObj.role === 'PLATFORM_ADMIN') {
            setUserRole('SUPER_ADMIN');
          } else if (userObj.role === 'DOCTOR') {
            setUserRole('DOCTOR');
          } else if (userObj.role === 'CARE_COORDINATOR') {
            setUserRole('CARE_COORDINATOR');
          } else {
            setUserRole('PATIENT');
          }
        }

        // Fetch user profile from DB/cache
        const email = userObj?.email;
        const res = await fetch(`/api/v1/user/profile${email ? `?email=${encodeURIComponent(email)}` : ''}`, {
          headers: {
            Authorization: token ? `Bearer ${token}` : '',
          },
        });

        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) {
            setPatientData(json.data);
            if (json.data.role === 'SUPER_ADMIN' || json.data.role === 'PLATFORM_ADMIN') {
              setUserRole('SUPER_ADMIN');
            }
          }
        }
      } catch (err) {
        console.warn('Dashboard load error:', err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  // Fetch admin user directory when Super Admin
  useEffect(() => {
    if (userRole === 'SUPER_ADMIN') {
      fetchAdminUsers();
    }
  }, [userRole]);

  const fetchAdminUsers = async () => {
    setAdminLoading(true);
    try {
      const res = await fetch('/api/v1/admin/users');
      const data = await res.json();
      if (data.success && data.data?.users) {
        setAllUsers(data.data.users);
      }
    } catch (err) {
      console.warn('Failed to load admin users:', err);
    } finally {
      setAdminLoading(false);
    }
  };

  const handleUpdateRole = async (userId: string, newRole: string) => {
    setUpdatingUser(userId);
    setAdminActionSuccess('');
    try {
      const res = await fetch('/api/v1/admin/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, newRole }),
      });
      const data = await res.json();
      if (data.success) {
        setAdminActionSuccess(data.message || 'User role updated successfully');
        setAllUsers((prev) =>
          prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
        );
        setTimeout(() => setAdminActionSuccess(''), 4000);
      }
    } catch (err) {
      console.warn('Error updating role:', err);
    } finally {
      setUpdatingUser(null);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('ght_token');
    localStorage.removeItem('ght_user');
    document.cookie = 'ght_token=; Max-Age=0; path=/;';
    router.push('/login');
  };

  return (
    <div className="min-vh-100 flex flex-col bg-slate-950 text-slate-100 font-sans">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Top Control Bar with Current Identity */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-6 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-600 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-teal-500/20">
              {currentUser?.name ? currentUser.name[0].toUpperCase() : 'U'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-base sm:text-lg">
                  {currentUser?.name || patientData?.firstName
                    ? `${patientData?.firstName || ''} ${patientData?.lastName || ''}`.trim() || currentUser?.name
                    : 'Authenticated User'}
                </span>
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-teal-500/10 text-teal-400 border border-teal-500/30">
                  {userRole}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {currentUser?.email || patientData?.email || 'Logged in via Google'}
              </p>
            </div>
          </div>

          {/* Top User Actions */}
          <div className="flex items-center gap-2 self-stretch md:self-auto">
            {userRole === 'SUPER_ADMIN' ? (
              <div className="flex items-center gap-2">
                <span className="px-3 py-1.5 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-bold flex items-center gap-1.5">
                  <Key className="w-3.5 h-3.5" />
                  Super Admin
                </span>
                <button
                  onClick={handleSignOut}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-rose-950/40 text-slate-400 hover:text-rose-400 text-xs font-semibold border border-slate-700 transition flex items-center gap-1.5"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 w-full md:w-auto">
                <Link
                  href="/profile"
                  className="flex-1 md:flex-none px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-300 text-xs font-semibold border border-slate-700 transition text-center"
                >
                  My Medical Dossier
                </Link>
                <button
                  onClick={handleSignOut}
                  className="flex-1 md:flex-none px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-rose-950/40 text-slate-400 hover:text-rose-400 text-xs font-semibold border border-slate-700 transition flex items-center justify-center gap-1.5"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* 1. PATIENT DASHBOARD (USER SPECIFIC & DATA ISOLATED) */}
        {/* ═══════════════════════════════════════════════════════════ */}
        {userRole === 'PATIENT' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Confidential Data Isolation Banner */}
            <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-500/30 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-teal-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-bold text-teal-300">
                  Confidential Patient Portal & Medical Data Isolation
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  Your treatment data, surgical reports, and visa documents are isolated strictly to your account ({currentUser?.email || patientData?.email}). No other patients have visibility into your health records.
                </p>
              </div>
            </div>

            {/* Interactive 6-Stage Journey Tracker */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <span className="text-xs font-bold text-teal-400 uppercase tracking-widest">
                    Your Medical Journey In India
                  </span>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                    Treatment & Recovery Lifecycle
                  </h2>
                </div>
                <Link
                  href="/start-journey"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 border border-teal-500/30 text-xs font-bold transition-all self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  Request Second Opinion / New Journey
                </Link>
              </div>

              {/* 6 Stage steps */}
              <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
                {[
                  { step: '01', title: 'Clinical Review', status: 'COMPLETED', desc: 'Reports evaluated by specialist' },
                  { step: '02', title: 'Hospital Quote', status: 'ACTIVE', desc: 'Hospital quotes & plan ready' },
                  { step: '03', title: 'Medical Visa (VIL)', status: 'PENDING', desc: 'Hospital letter for e-MED visa' },
                  { step: '04', title: 'Travel & Hotel', status: 'PENDING', desc: 'Flights, hotel & airport greeting' },
                  { step: '05', title: 'Treatment in India', status: 'PENDING', desc: 'Admission, surgery & ICU' },
                  { step: '06', title: 'Recovery & Home', status: 'PENDING', desc: 'Post-op review & journey home' },
                ].map((s) => {
                  const isDone = s.status === 'COMPLETED';
                  const isActive = s.status === 'ACTIVE';
                  return (
                    <div
                      key={s.step}
                      className={`p-4 rounded-xl border transition-all ${
                        isDone
                          ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-400'
                          : isActive
                          ? 'bg-teal-950/40 border-teal-500 shadow-md shadow-teal-500/10 text-teal-300'
                          : 'bg-slate-900/40 border-slate-800 text-slate-500'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono font-bold">{s.step}</span>
                        {isDone ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        ) : isActive ? (
                          <span className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-pulse" />
                        ) : (
                          <Clock className="w-3.5 h-3.5 text-slate-600" />
                        )}
                      </div>
                      <div className="font-bold text-white text-xs sm:text-sm">{s.title}</div>
                      <p className="text-[11px] text-slate-400 mt-1 leading-snug">{s.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Actions & Assigned Care Team Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Card 1: Assigned Care Team */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-teal-400">
                      Your Dedicated Support
                    </span>
                    <Heart className="w-4 h-4 text-teal-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">Assigned Care Coordinator</h3>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800 mb-4">
                    <div className="w-10 h-10 rounded-full bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-300 font-bold text-sm">
                      SF
                    </div>
                    <div>
                      <div className="font-bold text-white text-sm">Sarah Fernandes</div>
                      <div className="text-xs text-slate-400">GCC & International Patient Desk</div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 mb-4">
                    Available 24/7 on WhatsApp to coordinate your medical visa letter, translation, and airport ambulance.
                  </p>
                </div>

                <a
                  href="https://wa.me/919876543210?text=Hello%20Sarah,%20I%20need%20assistance%20with%20my%20treatment%20journey"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-all shadow-md"
                >
                  <MessageSquare className="w-4 h-4" />
                  Chat on WhatsApp
                </a>
              </div>

              {/* Card 2: Personal Medical Dossier */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-teal-400">
                      Health Information
                    </span>
                    <Activity className="w-4 h-4 text-teal-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">Your Clinical Dossier</h3>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1.5 border-b border-slate-800">
                      <span className="text-slate-400">Blood Group:</span>
                      <span className="font-bold text-white">{patientData?.bloodGroup || 'Not specified'}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-800">
                      <span className="text-slate-400">Allergies:</span>
                      <span className="font-bold text-rose-300">{patientData?.medicalAllergies || 'None recorded'}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-800">
                      <span className="text-slate-400">Chronic Conditions:</span>
                      <span className="font-bold text-white">{patientData?.chronicConditions || 'None'}</span>
                    </div>
                    <div className="flex justify-between py-1.5">
                      <span className="text-slate-400">Travel Attendants:</span>
                      <span className="font-bold text-teal-300">{patientData?.companions?.length || 0} Registered</span>
                    </div>
                  </div>
                </div>

                <Link
                  href="/profile"
                  className="mt-4 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-300 border border-slate-700 font-semibold text-xs transition-all"
                >
                  <Settings className="w-4 h-4" />
                  Edit My Medical Profile & KYC
                </Link>
              </div>

              {/* Card 3: Quick Action Hub */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-teal-400">
                      Patient Actions
                    </span>
                    <Sparkles className="w-4 h-4 text-teal-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">Quick Navigation</h3>
                  <div className="space-y-2 text-xs">
                    <Link
                      href="/find-treatment"
                      className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-teal-500/40 transition-all text-slate-300 hover:text-white"
                    >
                      <span className="flex items-center gap-2 font-medium">
                        <CreditCard className="w-4 h-4 text-teal-400" />
                        Treatment Cost & Savings Estimator
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                    </Link>
                    <Link
                      href="/hospitals"
                      className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-teal-500/40 transition-all text-slate-300 hover:text-white"
                    >
                      <span className="flex items-center gap-2 font-medium">
                        <Building2 className="w-4 h-4 text-teal-400" />
                        Explore JCI Accredited Hospitals
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                    </Link>
                    <Link
                      href="/my-case"
                      className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-teal-500/40 transition-all text-slate-300 hover:text-white"
                    >
                      <span className="flex items-center gap-2 font-medium">
                        <FileText className="w-4 h-4 text-teal-400" />
                        Upload Medical Records / MRI Scans
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                    </Link>
                  </div>
                </div>

                <Link
                  href="/start-journey"
                  className="mt-4 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white font-semibold text-xs shadow-md transition-all"
                >
                  <Plus className="w-4 h-4" />
                  Initiate Treatment Case
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* 2. SUPER ADMIN CONTROL CENTER (RBAC & USER PERMISSIONS) */}
        {/* ═══════════════════════════════════════════════════════════ */}
        {userRole === 'SUPER_ADMIN' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Admin Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">
                  Platform Governance & Security
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                  Super Admin Role & Permission Control Center (RBAC)
                </h2>
                <p className="text-sm text-slate-400 mt-1">
                  Manage all registered users, assign roles (Doctor, Patient, Coordinator), and configure granular permissions.
                </p>
              </div>

              <button
                onClick={fetchAdminUsers}
                disabled={adminLoading}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-indigo-300 border border-slate-700 text-xs font-bold transition-all self-start sm:self-auto"
              >
                <RefreshCw className={`w-4 h-4 ${adminLoading ? 'animate-spin' : ''}`} />
                Refresh User Directory
              </button>
            </div>

            {/* Notification alert */}
            {adminActionSuccess && (
              <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-sm flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span>{adminActionSuccess}</span>
              </div>
            )}

            {/* Admin Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Users</div>
                <div className="text-2xl font-extrabold text-white mt-2">{allUsers.length || 6}</div>
                <div className="text-xs text-indigo-400 mt-1">Registered in DB</div>
              </div>
              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Doctors & Reviewers</div>
                <div className="text-2xl font-extrabold text-teal-400 mt-2">
                  {allUsers.filter((u) => u.role === 'DOCTOR' || u.role === 'MEDICAL_REVIEWER').length}
                </div>
                <div className="text-xs text-slate-400 mt-1">Clinical Review Rights</div>
              </div>
              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Care Coordinators</div>
                <div className="text-2xl font-extrabold text-blue-400 mt-2">
                  {allUsers.filter((u) => u.role === 'CARE_COORDINATOR').length}
                </div>
                <div className="text-xs text-slate-400 mt-1">VIL & Logistics Rights</div>
              </div>
              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">International Patients</div>
                <div className="text-2xl font-extrabold text-emerald-400 mt-2">
                  {allUsers.filter((u) => u.role === 'PATIENT').length}
                </div>
                <div className="text-xs text-slate-400 mt-1">Active Medical Journeys</div>
              </div>
            </div>

            {/* User Directory Table with In-line Role Assignment */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="p-6 border-b border-slate-800 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Users className="w-5 h-5 text-indigo-400" />
                    All Registered Accounts & Role Assignment
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Click any user's role to promote or reassign permissions with instant database and cache persistence.
                  </p>
                </div>
              </div>

              {adminLoading ? (
                <div className="p-12 text-center text-slate-400">
                  <Loader2 className="w-8 h-8 animate-spin mx-auto text-indigo-400 mb-2" />
                  Loading accounts from database...
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-slate-300">
                    <thead className="bg-slate-950/60 text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800">
                      <tr>
                        <th className="px-6 py-4">User / Email</th>
                        <th className="px-6 py-4">Current Role</th>
                        <th className="px-6 py-4">Permissions Enabled</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Assign New Role</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {allUsers.map((u) => (
                        <tr key={u.id} className="hover:bg-slate-800/40 transition-colors">
                          <td className="px-6 py-4">
                            <div className="font-bold text-white text-sm">{u.name || u.email.split('@')[0]}</div>
                            <div className="text-xs text-slate-400 font-mono mt-0.5">{u.email}</div>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                                u.role === 'SUPER_ADMIN'
                                  ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40'
                                  : u.role === 'DOCTOR'
                                  ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
                                  : u.role === 'CARE_COORDINATOR'
                                  ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                                  : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                              }`}
                            >
                              {u.role === 'DOCTOR' && <Stethoscope className="w-3 h-3" />}
                              {u.role === 'CARE_COORDINATOR' && <Users className="w-3 h-3" />}
                              {u.role === 'SUPER_ADMIN' && <Key className="w-3 h-3" />}
                              {u.role}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-wrap gap-1 max-w-xs">
                              {u.role === 'SUPER_ADMIN' && (
                                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-900/50 text-indigo-300">
                                  FULL_ADMIN_ACCESS
                                </span>
                              )}
                              {u.role === 'DOCTOR' && (
                                <>
                                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-900/50 text-teal-300">
                                    clinical:review
                                  </span>
                                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-900/50 text-teal-300">
                                    cases:read
                                  </span>
                                </>
                              )}
                              {u.role === 'CARE_COORDINATOR' && (
                                <>
                                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-900/50 text-blue-300">
                                    visa:issue_vil
                                  </span>
                                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-900/50 text-blue-300">
                                    cases:write
                                  </span>
                                </>
                              )}
                              {u.role === 'PATIENT' && (
                                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                                  patient:own_records
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center gap-1 text-xs text-emerald-400">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              Active
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <select
                              value={u.role}
                              disabled={updatingUser === u.id}
                              onChange={(e) => handleUpdateRole(u.id, e.target.value)}
                              className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs font-semibold focus:outline-none focus:border-indigo-500 transition-all cursor-pointer"
                            >
                              <option value="PATIENT">Make Patient</option>
                              <option value="DOCTOR">Make Doctor</option>
                              <option value="CARE_COORDINATOR">Make Coordinator</option>
                              <option value="SUPER_ADMIN">Make Super Admin</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* 3. DOCTOR VIEW REDIRECT */}
        {/* ═══════════════════════════════════════════════════════════ */}
        {userRole === 'DOCTOR' && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-8 text-center animate-fadeIn">
            <Stethoscope className="w-14 h-14 text-teal-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Doctor Clinical Review Queue</h2>
            <p className="text-slate-400 text-sm max-w-lg mx-auto mb-6">
              You are recognized as a Medical Reviewer / Specialist. Access your assigned patient dossiers, review uploaded angiograms, and submit surgical opinions.
            </p>
            <Link
              href="/portal/doctor"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-600 text-white font-bold text-sm shadow-lg shadow-teal-500/20 transition-all"
            >
              Open Doctor Clinical Portal ➔
            </Link>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* 4. CARE COORDINATOR VIEW REDIRECT */}
        {/* ═══════════════════════════════════════════════════════════ */}
        {userRole === 'CARE_COORDINATOR' && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-8 text-center animate-fadeIn">
            <Users className="w-14 h-14 text-blue-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Care Coordinator Caseload Workspace</h2>
            <p className="text-slate-400 text-sm max-w-lg mx-auto mb-6">
              Access your regional caseload desk, issue 1-click Hospital Visa Invitation Letters (VIL), and schedule airport ambulance pickups.
            </p>
            <Link
              href="/dashboard/coordinator"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-500/20 transition-all"
            >
              Open Coordinator Workspace ➔
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
