'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import {
  User, Users, ShieldCheck, FileText, CheckCircle2, AlertCircle,
  Plus, Trash2, Edit3, Save, Phone, Mail, Globe, Calendar,
  Heart, Lock, Sparkles, Building2, Download, Eye, Clock,
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
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Profile data state
  const [profile, setProfile] = useState({
    firstName: 'Ali',
    lastName: 'Al-Balushi',
    email: 'ali.albalushi@demo.om',
    phone: '+968 9123 4567',
    dateOfBirth: '1974-06-15',
    gender: 'MALE',
    nationality: 'Oman',
    residenceCountry: 'Oman',
    city: 'Muscat',
    address: 'Al Khuwair, Block 42, Way 3502, Muscat',
    // Passport info
    passportNumber: '08472911',
    passportIssuingCountry: 'Oman',
    passportIssueDate: '2020-05-20',
    passportExpiryDate: '2030-05-19',
    kycStatus: 'VERIFIED',
    // Medical Baseline
    bloodGroup: 'O+',
    allergies: 'Penicillin (mild rash), Dust mites',
    chronicConditions: 'Hypertension (managed), Type 2 Diabetes',
    currentMedications: 'Metformin 500mg, Atorvastatin 20mg, Amlodipine 5mg',
    pastSurgeries: 'Appendectomy (2012)',
  });

  const [companions, setCompanions] = useState<Companion[]>([
    {
      id: 'c1',
      fullName: 'Fatima Al-Balushi',
      relationship: 'Spouse / Primary Medical Attendant',
      passportNumber: '09124892',
      passportExpiry: '2031-09-12',
      nationality: 'Oman',
    },
    {
      id: 'c2',
      fullName: 'Tariq Al-Balushi',
      relationship: 'Son / Travel Companion',
      passportNumber: '10482019',
      passportExpiry: '2032-01-20',
      nationality: 'Oman',
    },
  ]);

  const [newCompanion, setNewCompanion] = useState<Companion>({
    id: '',
    fullName: '',
    relationship: 'Family Attendant',
    passportNumber: '',
    passportExpiry: '',
    nationality: 'Oman',
  });
  const [showAddCompanion, setShowAddCompanion] = useState(false);

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const addCompanion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompanion.fullName || !newCompanion.passportNumber) return;
    setCompanions([...companions, { ...newCompanion, id: `c-${Date.now()}` }]);
    setNewCompanion({
      id: '',
      fullName: '',
      relationship: 'Family Attendant',
      passportNumber: '',
      passportExpiry: '',
      nationality: profile.nationality,
    });
    setShowAddCompanion(false);
    handleSave();
  };

  const removeCompanion = (id: string) => {
    setCompanions(companions.filter(c => c.id !== id));
    handleSave();
  };

  const inputClass = 'w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white transition';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <Header />

      <main className="flex-1 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-6">

          {/* Top Banner */}
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="flex items-center gap-4 text-center md:text-left">
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-sky-400 to-indigo-500 flex items-center justify-center font-black text-2xl shadow-lg">
                  {profile.firstName[0]}
                </div>
                <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-400 border-2 border-slate-900 flex items-center justify-center text-[10px] font-bold">
                  ✓
                </span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-extrabold">{profile.firstName} {profile.lastName}</h1>
                  <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-[10px] font-bold uppercase tracking-wider">
                    KYC Verified
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-1 flex items-center gap-2 justify-center md:justify-start">
                  <span>🇴🇲 {profile.nationality}</span>
                  <span>·</span>
                  <span>ID: GHT-PAT-84910</span>
                  <span>·</span>
                  <span>Assigned Desk: GCC & Middle East</span>
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Link
                href="/my-case"
                className="px-5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-xs font-bold transition flex items-center gap-2"
              >
                <Clock className="w-3.5 h-3.5 text-sky-400" />
                <span>Active Journey Timeline</span>
              </Link>
              <button
                type="button"
                onClick={handleSave}
                className="px-5 py-2.5 bg-gradient-to-r from-sky-400 to-indigo-600 hover:opacity-95 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Profile</span>
              </button>
            </div>
          </div>

          {savedSuccess && (
            <div className="p-4 bg-emerald-50 text-emerald-900 rounded-2xl border border-emerald-200 text-xs font-semibold flex items-center gap-2 shadow-sm animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Profile updated successfully! All medical visa invitation letters and hospital records have been synced.</span>
            </div>
          )}

          {/* Navigation Tabs */}
          <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap gap-2">
            {[
              { id: 'personal', label: 'Personal & Contact', icon: User },
              { id: 'passport', label: 'Passport & KYC Dossier', icon: ShieldCheck },
              { id: 'medical', label: 'Baseline Medical History', icon: Heart },
              { id: 'companions', label: `Travel Companions (${companions.length})`, icon: Users },
              { id: 'cases', label: 'Active Medical Cases', icon: FileText },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
                    activeTab === tab.id
                      ? 'bg-sky-600 text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab 1: Personal & Contact */}
          {activeTab === 'personal' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <h2 className="text-base font-extrabold text-slate-900">Patient Personal Details</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">First Name</label>
                  <input
                    type="text"
                    value={profile.firstName}
                    onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Last Name</label>
                  <input
                    type="text"
                    value={profile.lastName}
                    onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Date of Birth</label>
                  <input
                    type="date"
                    value={profile.dateOfBirth}
                    onChange={(e) => setProfile({ ...profile, dateOfBirth: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Gender</label>
                  <select
                    value={profile.gender}
                    onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
                    aria-label="Select Gender"
                    className={inputClass}
                  >
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Nationality</label>
                  <input
                    type="text"
                    value={profile.nationality}
                    onChange={(e) => setProfile({ ...profile, nationality: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">City of Residence</label>
                  <input
                    type="text"
                    value={profile.city}
                    onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email Address</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">WhatsApp / Phone Number</label>
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div className="sm:col-span-2 md:col-span-1">
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Home Address</label>
                  <input
                    type="text"
                    value={profile.address}
                    onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  type="button"
                  onClick={handleSave}
                  className="px-6 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold transition shadow"
                >
                  Save Personal Information
                </button>
              </div>
            </div>
          )}

          {/* Tab 2: Passport & KYC */}
          {activeTab === 'passport' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-extrabold text-slate-900">Passport & Medical Visa KYC</h2>
                  <p className="text-xs text-slate-500">Required by the Ministry of External Affairs for e-Medical Visa facilitation.</p>
                </div>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Passport Valid
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Passport Number</label>
                  <input
                    type="text"
                    value={profile.passportNumber}
                    onChange={(e) => setProfile({ ...profile, passportNumber: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Issuing Country</label>
                  <input
                    type="text"
                    value={profile.passportIssuingCountry}
                    onChange={(e) => setProfile({ ...profile, passportIssuingCountry: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Issue Date</label>
                  <input
                    type="date"
                    value={profile.passportIssueDate}
                    onChange={(e) => setProfile({ ...profile, passportIssueDate: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Expiry Date</label>
                  <input
                    type="date"
                    value={profile.passportExpiryDate}
                    onChange={(e) => setProfile({ ...profile, passportExpiryDate: e.target.value })}
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Uploaded bio page preview */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="w-8 h-8 text-sky-600" />
                  <div>
                    <strong className="text-xs text-slate-900 block font-bold">Passport_Bio_Page_Ali.pdf</strong>
                    <span className="text-[11px] text-slate-500">1.2 MB · Scanned Clean · Veriff KYC Approved</span>
                  </div>
                </div>
                <button
                  type="button"
                  className="px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100 transition"
                >
                  View Document
                </button>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  type="button"
                  onClick={handleSave}
                  className="px-6 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold transition shadow"
                >
                  Save Passport Dossier
                </button>
              </div>
            </div>
          )}

          {/* Tab 3: Medical Baseline */}
          {activeTab === 'medical' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div>
                <h2 className="text-base font-extrabold text-slate-900">Baseline Clinical History</h2>
                <p className="text-xs text-slate-500">Shared strictly with treating surgeons and anaesthesiologists in India.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Blood Group</label>
                  <input
                    type="text"
                    value={profile.bloodGroup}
                    onChange={(e) => setProfile({ ...profile, bloodGroup: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Known Allergies</label>
                  <input
                    type="text"
                    value={profile.allergies}
                    onChange={(e) => setProfile({ ...profile, allergies: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div className="sm:col-span-3">
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Chronic Medical Conditions</label>
                  <input
                    type="text"
                    value={profile.chronicConditions}
                    onChange={(e) => setProfile({ ...profile, chronicConditions: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div className="sm:col-span-3">
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Current Medications & Dosages</label>
                  <input
                    type="text"
                    value={profile.currentMedications}
                    onChange={(e) => setProfile({ ...profile, currentMedications: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div className="sm:col-span-3">
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Past Surgeries & Hospitalizations</label>
                  <input
                    type="text"
                    value={profile.pastSurgeries}
                    onChange={(e) => setProfile({ ...profile, pastSurgeries: e.target.value })}
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  type="button"
                  onClick={handleSave}
                  className="px-6 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold transition shadow"
                >
                  Update Clinical History
                </button>
              </div>
            </div>
          )}

          {/* Tab 4: Travel Companions / Attendants */}
          {activeTab === 'companions' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-extrabold text-slate-900">Accompanying Family & Attendants</h2>
                  <p className="text-xs text-slate-500">
                    Each patient is permitted up to 2 Medical Attendants under Indian MED-X visa regulations.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAddCompanion(!showAddCompanion)}
                  className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Attendant</span>
                </button>
              </div>

              {showAddCompanion && (
                <form onSubmit={addCompanion} className="p-5 bg-sky-50/70 rounded-2xl border border-sky-200 space-y-4">
                  <h3 className="text-xs font-bold text-sky-950 uppercase tracking-wider">New Attendant Information</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Full Name</label>
                      <input
                        type="text"
                        required
                        value={newCompanion.fullName}
                        onChange={(e) => setNewCompanion({ ...newCompanion, fullName: e.target.value })}
                        placeholder="As on passport"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Relationship</label>
                      <input
                        type="text"
                        required
                        value={newCompanion.relationship}
                        onChange={(e) => setNewCompanion({ ...newCompanion, relationship: e.target.value })}
                        placeholder="e.g. Spouse, Son, Sibling"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Passport Number</label>
                      <input
                        type="text"
                        required
                        value={newCompanion.passportNumber}
                        onChange={(e) => setNewCompanion({ ...newCompanion, passportNumber: e.target.value })}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Passport Expiry</label>
                      <input
                        type="date"
                        required
                        value={newCompanion.passportExpiry}
                        onChange={(e) => setNewCompanion({ ...newCompanion, passportExpiry: e.target.value })}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Nationality</label>
                      <input
                        type="text"
                        required
                        value={newCompanion.nationality}
                        onChange={(e) => setNewCompanion({ ...newCompanion, nationality: e.target.value })}
                        className={inputClass}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAddCompanion(false)}
                      className="px-4 py-2 border border-slate-300 rounded-xl text-xs font-semibold text-slate-600 hover:bg-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold"
                    >
                      Save Attendant
                    </button>
                  </div>
                </form>
              )}

              <div className="space-y-3">
                {companions.map((comp) => (
                  <div
                    key={comp.id}
                    className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <strong className="text-sm font-bold text-slate-900">{comp.fullName}</strong>
                        <span className="text-[10px] font-bold px-2 py-0.5 bg-sky-100 text-sky-800 rounded-full">
                          {comp.relationship}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        Passport: <span className="font-mono text-slate-700 font-semibold">{comp.passportNumber}</span> · Exp: {comp.passportExpiry} · {comp.nationality}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-100">
                        MED-X Visa Eligible
                      </span>
                      <button
                        type="button"
                        onClick={() => removeCompanion(comp.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg transition"
                        aria-label="Remove companion"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 5: Active Medical Cases */}
          {activeTab === 'cases' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <h2 className="text-base font-extrabold text-slate-900">Active Patient Journey</h2>

              <div className="p-6 bg-gradient-to-br from-slate-50 to-sky-50 rounded-2xl border border-sky-100 space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-sky-100 pb-3">
                  <div>
                    <span className="text-xs font-mono font-bold text-sky-700">Case ID: GHT-2026-OMN-0101</span>
                    <h3 className="text-base font-black text-slate-900 mt-0.5">
                      Off-Pump Coronary Artery Bypass Grafting (CABG)
                    </h3>
                  </div>
                  <span className="px-3 py-1 bg-emerald-500 text-white rounded-full text-xs font-bold shadow-sm">
                    Hospital Proposal Ready
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <span className="text-slate-500 block">Treating Quaternary Center:</span>
                    <strong className="text-slate-900">Medanta – The Medicity</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Chief Surgeon:</span>
                    <strong className="text-slate-900">Dr. Naresh Trehan</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Personal Care Coordinator:</span>
                    <strong className="text-slate-900">Sarah Fernandes (GCC Desk)</strong>
                  </div>
                </div>

                <div className="pt-2 flex gap-3">
                  <Link
                    href="/my-case"
                    className="px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold rounded-xl shadow transition"
                  >
                    Open Case Details & Quotations
                  </Link>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
