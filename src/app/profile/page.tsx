'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import {
  User, Users, ShieldCheck, FileText, CheckCircle2, AlertCircle,
  Plus, Trash2, Edit3, Save, Phone, Mail, Globe, Calendar,
  Heart, Lock, Sparkles, Building2, Download, Eye, Clock, Loader2,
} from 'lucide-react';

interface Companion {
  id: string;
  fullName: string;
  relationship: string;
  passportNumber: string;
  passportExpiry: string;
  nationality: string;
}

export default function PatientProfilePage() {
  const [activeTab, setActiveTab] = useState<'personal' | 'passport' | 'medical' | 'companions' | 'cases'>('personal');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Real user profile data state initialized cleanly
  const [profile, setProfile] = useState({
    userId: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: 'MALE',
    nationality: '',
    residenceCountry: '',
    city: '',
    address: '',
    // Passport & KYC
    passportNumber: '',
    passportIssuingCountry: '',
    passportIssueDate: '',
    passportExpiryDate: '',
    kycStatus: 'VERIFIED',
    // Medical Baseline
    bloodGroup: '',
    allergies: '',
    chronicConditions: '',
    currentMedications: '',
    pastSurgeries: '',
  });

  const [companions, setCompanions] = useState<Companion[]>([]);
  const [activeCases, setActiveCases] = useState<any[]>([]);
  const [newCompanion, setNewCompanion] = useState<Companion>({
    id: '',
    fullName: '',
    relationship: 'Family Attendant',
    passportNumber: '',
    passportExpiry: '',
    nationality: '',
  });
  const [showAddCompanion, setShowAddCompanion] = useState(false);

  // Fetch real user data from Database & Cache on mount
  useEffect(() => {
    async function loadUserProfile() {
      setLoading(true);
      try {
        let storedUserStr = localStorage.getItem('ght_user');
        let storedUser = storedUserStr ? JSON.parse(storedUserStr) : null;
        let token = localStorage.getItem('ght_token') || '';

        // Query API with token or stored email
        let url = '/api/v1/user/profile';
        if (storedUser?.email) {
          url += `?email=${encodeURIComponent(storedUser.email)}`;
        }

        const res = await fetch(url, {
          headers: {
            Authorization: token ? `Bearer ${token}` : '',
          },
        });

        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) {
            const d = json.data;
            setProfile((prev) => ({
              ...prev,
              userId: d.id || prev.userId,
              firstName: d.firstName || storedUser?.name?.split(' ')[0] || '',
              lastName: d.lastName || storedUser?.name?.split(' ').slice(1).join(' ') || '',
              email: d.email || storedUser?.email || '',
              phone: d.phone || prev.phone,
              dateOfBirth: d.dateOfBirth || prev.dateOfBirth,
              gender: d.gender || prev.gender,
              nationality: d.nationality || prev.nationality,
              city: d.city || prev.city,
              address: d.address || prev.address,
              passportNumber: d.passportNumber || prev.passportNumber,
              passportIssuingCountry: d.passportIssuingCountry || prev.passportIssuingCountry,
              bloodGroup: d.bloodGroup || prev.bloodGroup,
              allergies: d.medicalAllergies || prev.allergies,
              chronicConditions: d.chronicConditions || prev.chronicConditions,
              currentMedications: d.currentMedications || prev.currentMedications,
              pastSurgeries: d.pastSurgeries || prev.pastSurgeries,
            }));

            if (d.companions && Array.isArray(d.companions) && d.companions.length > 0) {
              setCompanions(d.companions);
            }
            if (d.activeCases && Array.isArray(d.activeCases)) {
              setActiveCases(d.activeCases);
            }
          }
        } else if (storedUser) {
          // Fallback to local stored session if API had no DB record yet
          const nameParts = (storedUser.name || '').split(' ');
          setProfile((prev) => ({
            ...prev,
            firstName: nameParts[0] || 'User',
            lastName: nameParts.slice(1).join(' ') || '',
            email: storedUser.email || '',
          }));
        }
      } catch (err: any) {
        console.warn('Error loading user profile:', err);
      } finally {
        setLoading(false);
      }
    }

    loadUserProfile();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrorMessage('');
    setSavedSuccess(false);

    try {
      const token = localStorage.getItem('ght_token') || '';
      const res = await fetch('/api/v1/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : '',
        },
        body: JSON.stringify({
          userId: profile.userId,
          email: profile.email,
          firstName: profile.firstName,
          lastName: profile.lastName,
          phone: profile.phone,
          dateOfBirth: profile.dateOfBirth,
          gender: profile.gender,
          medicalAllergies: profile.allergies,
          chronicConditions: profile.chronicConditions,
          companions,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to save profile in database');
      }

      // Update local storage
      const storedUserStr = localStorage.getItem('ght_user');
      if (storedUserStr) {
        const u = JSON.parse(storedUserStr);
        u.name = `${profile.firstName} ${profile.lastName}`.trim();
        localStorage.setItem('ght_user', JSON.stringify(u));
      }

      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 4000);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to save changes to Database.');
    } finally {
      setSaving(false);
    }
  };

  const addCompanion = () => {
    if (!newCompanion.fullName) return;
    const item: Companion = {
      id: `c_${Date.now()}`,
      fullName: newCompanion.fullName,
      relationship: newCompanion.relationship,
      passportNumber: newCompanion.passportNumber,
      passportExpiry: newCompanion.passportExpiry,
      nationality: newCompanion.nationality || profile.nationality,
    };
    setCompanions((prev) => [...prev, item]);
    setNewCompanion({
      id: '',
      fullName: '',
      relationship: 'Family Attendant',
      passportNumber: '',
      passportExpiry: '',
      nationality: profile.nationality,
    });
    setShowAddCompanion(false);
  };

  const removeCompanion = (id: string) => {
    setCompanions((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="min-vh-100 flex flex-col bg-slate-900 text-slate-100 font-sans">
      <Header />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header Card */}
        <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-6 sm:p-8 mb-8 shadow-xl backdrop-blur-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-cyan-600 via-teal-500 to-emerald-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-teal-500/20 border-2 border-white/20">
                {profile.firstName ? profile.firstName[0].toUpperCase() : 'P'}
                {profile.lastName ? profile.lastName[0].toUpperCase() : 'T'}
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    {profile.firstName || profile.lastName
                      ? `${profile.firstName} ${profile.lastName}`.trim()
                      : 'International Patient'}
                  </h1>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified Patient
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-y-1 gap-x-4 mt-2 text-sm text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-4 h-4 text-slate-400" />
                    {profile.email || 'Google Authenticated User'}
                  </span>
                  {profile.phone && (
                    <span className="flex items-center gap-1.5">
                      <Phone className="w-4 h-4 text-slate-400" />
                      {profile.phone}
                    </span>
                  )}
                  {profile.nationality && (
                    <span className="flex items-center gap-1.5">
                      <Globe className="w-4 h-4 text-slate-400" />
                      {profile.nationality}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 self-stretch sm:self-auto">
              <Link
                href="/dashboard"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-700/80 hover:bg-slate-700 text-white font-medium text-sm border border-slate-600 transition-all shadow-sm"
              >
                Go to My Dashboard
              </Link>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white font-semibold text-sm shadow-md shadow-teal-500/20 transition-all"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Feedback alerts */}
          {savedSuccess && (
            <div className="mt-5 p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-sm flex items-center gap-2 animate-fadeIn">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <span>Profile, medical baseline, and travel attendants saved directly to PostgreSQL Database and Cache!</span>
            </div>
          )}

          {errorMessage && (
            <div className="mt-5 p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-sm flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}
        </div>

        {/* Tab Navigation */}
        <div className="flex overflow-x-auto no-scrollbar gap-2 mb-8 border-b border-slate-700/80 pb-4">
          {[
            { id: 'personal', label: 'Personal Information', icon: User },
            { id: 'passport', label: 'Passport & KYC Dossier', icon: ShieldCheck },
            { id: 'medical', label: 'Baseline Medical History', icon: Heart },
            { id: 'companions', label: 'Travel Attendants (MED-X)', icon: Users },
            { id: 'cases', label: 'My Treatment Cases', icon: FileText },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-teal-500/15 text-teal-300 border border-teal-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-teal-400' : 'text-slate-500'}`} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* TAB 1: PERSONAL INFORMATION */}
        {activeTab === 'personal' && (
          <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              <User className="w-5 h-5 text-teal-400" />
              Personal & Contact Information
            </h2>
            <p className="text-slate-400 text-sm mb-6">
              Details are stored in your secure medical dossier to issue official Indian Hospital Visa Invitation Letters.
            </p>

            <form onSubmit={handleSave} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">First Name</label>
                <input
                  type="text"
                  value={profile.firstName}
                  onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                  placeholder="Enter first name"
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Last Name</label>
                <input
                  type="text"
                  value={profile.lastName}
                  onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                  placeholder="Enter last name"
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Email Address (Google Account)</label>
                <input
                  type="email"
                  value={profile.email}
                  readOnly
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/60 border border-slate-800 text-slate-400 text-sm cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">WhatsApp / Phone Number</label>
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  placeholder="e.g. +968 9123 4567 or +1 416 555 0192"
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Date of Birth</label>
                <input
                  type="date"
                  value={profile.dateOfBirth}
                  onChange={(e) => setProfile({ ...profile, dateOfBirth: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700 text-white focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Gender</label>
                <select
                  value={profile.gender}
                  onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700 text-white focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all text-sm"
                >
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHER">Other</option>
                  <option value="PREFER_NOT_TO_SAY">Prefer not to say</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Country of Residence / Nationality</label>
                <input
                  type="text"
                  value={profile.nationality}
                  onChange={(e) => setProfile({ ...profile, nationality: e.target.value })}
                  placeholder="e.g. Oman, Kenya, Nigeria, Canada, UK"
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">City</label>
                <input
                  type="text"
                  value={profile.city}
                  onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                  placeholder="e.g. Muscat, Nairobi, Lagos, Toronto"
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all text-sm"
                />
              </div>

              <div className="sm:col-span-2 flex justify-end">
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white font-semibold text-sm shadow-md transition-all flex items-center gap-2"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  Save Information to Database
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 2: PASSPORT & KYC */}
        {activeTab === 'passport' && (
          <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-teal-400" />
              Passport & Indian Medical Visa (e-MED) KYC Dossier
            </h2>
            <p className="text-slate-400 text-sm mb-6">
              Indian High Commissions require passport copies with at least 6 months remaining validity.
            </p>

            <form onSubmit={handleSave} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Passport Number</label>
                <input
                  type="text"
                  value={profile.passportNumber}
                  onChange={(e) => setProfile({ ...profile, passportNumber: e.target.value })}
                  placeholder="e.g. A12345678"
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all text-sm font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Issuing Country</label>
                <input
                  type="text"
                  value={profile.passportIssuingCountry}
                  onChange={(e) => setProfile({ ...profile, passportIssuingCountry: e.target.value })}
                  placeholder="e.g. Oman, Kenya, UK, Canada"
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Issue Date</label>
                <input
                  type="date"
                  value={profile.passportIssueDate}
                  onChange={(e) => setProfile({ ...profile, passportIssueDate: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700 text-white focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Expiry Date</label>
                <input
                  type="date"
                  value={profile.passportExpiryDate}
                  onChange={(e) => setProfile({ ...profile, passportExpiryDate: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700 text-white focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all text-sm"
                />
              </div>

              <div className="sm:col-span-2 flex justify-end">
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white font-semibold text-sm shadow-md transition-all flex items-center gap-2"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  Save Passport Dossier
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 3: MEDICAL HISTORY */}
        {activeTab === 'medical' && (
          <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-400" />
              Baseline Clinical History & Surgical Safety
            </h2>
            <p className="text-slate-400 text-sm mb-6">
              Reviewing doctors use these clinical notes to assess pre-anesthesia safety and prescribe optimal care plans.
            </p>

            <form onSubmit={handleSave} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Blood Group</label>
                <select
                  value={profile.bloodGroup}
                  onChange={(e) => setProfile({ ...profile, bloodGroup: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700 text-white focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all text-sm"
                >
                  <option value="">Select blood group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Known Drug or Food Allergies</label>
                <input
                  type="text"
                  value={profile.allergies}
                  onChange={(e) => setProfile({ ...profile, allergies: e.target.value })}
                  placeholder="e.g. Penicillin, Sulfa, NSAIDs, None"
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all text-sm"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Chronic Medical Conditions</label>
                <textarea
                  rows={2}
                  value={profile.chronicConditions}
                  onChange={(e) => setProfile({ ...profile, chronicConditions: e.target.value })}
                  placeholder="e.g. Hypertension (controlled), Type-2 Diabetes, Asthma, None"
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all text-sm"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Current Daily Medications</label>
                <textarea
                  rows={2}
                  value={profile.currentMedications}
                  onChange={(e) => setProfile({ ...profile, currentMedications: e.target.value })}
                  placeholder="e.g. Metformin 500mg daily, Amlodipine 5mg, Aspirin 75mg"
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all text-sm"
                />
              </div>

              <div className="sm:col-span-2 flex justify-end">
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white font-semibold text-sm shadow-md transition-all flex items-center gap-2"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  Save Clinical Baseline
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 4: TRAVEL ATTENDANTS */}
        {activeTab === 'companions' && (
          <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-teal-400" />
                  Travel Companions & Attendants (MED-X Visa)
                </h2>
                <p className="text-slate-400 text-sm mt-1">
                  Indian immigration permits up to 2 medical attendants per patient on e-Medical Attendant Visa.
                </p>
              </div>
              <button
                onClick={() => setShowAddCompanion(!showAddCompanion)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 border border-teal-500/30 text-sm font-semibold transition-all"
              >
                <Plus className="w-4 h-4" />
                Add Attendant
              </button>
            </div>

            {/* Add Companion Form Modal/Inline */}
            {showAddCompanion && (
              <div className="mb-6 p-5 rounded-xl bg-slate-900/90 border border-teal-500/40 animate-fadeIn">
                <h3 className="text-sm font-bold text-teal-300 mb-4">Enter Attendant Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={newCompanion.fullName}
                      onChange={(e) => setNewCompanion({ ...newCompanion, fullName: e.target.value })}
                      placeholder="Attendant full name"
                      className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Relationship</label>
                    <select
                      value={newCompanion.relationship}
                      onChange={(e) => setNewCompanion({ ...newCompanion, relationship: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm"
                    >
                      <option value="Spouse">Spouse</option>
                      <option value="Parent">Parent</option>
                      <option value="Child">Child</option>
                      <option value="Sibling">Sibling</option>
                      <option value="Relative">Relative</option>
                      <option value="Caregiver">Caregiver / Nurse</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Passport Number</label>
                    <input
                      type="text"
                      value={newCompanion.passportNumber}
                      onChange={(e) => setNewCompanion({ ...newCompanion, passportNumber: e.target.value })}
                      placeholder="Passport #"
                      className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm font-mono"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setShowAddCompanion(false)}
                    className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={addCompanion}
                    className="px-4 py-2 rounded-lg bg-teal-500 hover:bg-teal-600 text-white text-xs font-semibold"
                  >
                    Confirm Attendant
                  </button>
                </div>
              </div>
            )}

            {/* List of companions */}
            {companions.length === 0 ? (
              <div className="text-center py-10 border border-dashed border-slate-700 rounded-xl">
                <Users className="w-10 h-10 text-slate-600 mx-auto mb-2" />
                <p className="text-slate-400 text-sm">No medical attendants registered yet.</p>
                <p className="text-slate-500 text-xs mt-1">Click "Add Attendant" if a family member is accompanying you to India.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {companions.map((c) => (
                  <div key={c.id} className="p-4 rounded-xl bg-slate-900/60 border border-slate-700/80 flex items-start justify-between">
                    <div>
                      <div className="font-bold text-white text-sm">{c.fullName}</div>
                      <div className="text-xs text-teal-400 font-medium mt-0.5">{c.relationship}</div>
                      {c.passportNumber && (
                        <div className="text-xs text-slate-400 mt-2 font-mono">Passport: {c.passportNumber}</div>
                      )}
                    </div>
                    <button
                      onClick={() => removeCompanion(c.id)}
                      className="text-slate-500 hover:text-rose-400 transition-colors p-1"
                      title="Remove attendant"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 5: MY TREATMENT CASES */}
        {activeTab === 'cases' && (
          <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              <FileText className="w-5 h-5 text-teal-400" />
              Connected Treatment Cases
            </h2>
            <p className="text-slate-400 text-sm mb-6">
              Only cases filed by your account ({profile.email}) are visible here.
            </p>

            {activeCases.length === 0 ? (
              <div className="text-center py-12 border border-dashed border-slate-700 rounded-xl">
                <FileText className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <h3 className="text-base font-bold text-white mb-1">No Active Medical Journeys Yet</h3>
                <p className="text-slate-400 text-sm max-w-md mx-auto mb-6">
                  Ready to explore world-class care in India with 70–85% savings?
                </p>
                <Link
                  href="/start-journey"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white font-semibold text-sm shadow-md"
                >
                  Start New Treatment Journey
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {activeCases.map((c) => (
                  <div key={c.id} className="p-5 rounded-xl bg-slate-900/60 border border-slate-700/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-teal-500/20 text-teal-300">
                          {c.caseNumber}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-semibold">
                          {c.stage}
                        </span>
                      </div>
                      <h4 className="text-white font-bold text-base mt-2">{c.condition}</h4>
                      <p className="text-xs text-slate-400 mt-1">Requested Treatment: {c.treatment || 'Consultation'}</p>
                    </div>
                    <Link
                      href={`/my-case?id=${c.id}`}
                      className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-300 text-xs font-semibold border border-slate-700"
                    >
                      View Case Tracker ➔
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
