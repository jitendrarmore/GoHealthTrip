'use client';

import { use, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Clock, 
  FileText, 
  ShieldCheck, 
  CreditCard, 
  Plane, 
  Building2, 
  User, 
  Sparkles, 
  AlertTriangle,
  History,
  Send,
  Download,
  Eye,
  Check,
  ChevronRight
} from 'lucide-react';

export default function CaseDetailWorkspace({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const caseId = resolvedParams.id;
  const [activeSection, setActiveSection] = useState<'summary' | 'clinical' | 'matching' | 'proposal' | 'visa' | 'audit'>('summary');
  const [caseStage, setCaseStage] = useState('PROPOSAL_READY');

  const caseDossier = {
    id: caseId || 'GHT-2026-OMN-0101',
    patient: {
      name: 'Ali Al-Balushi',
      age: 54,
      gender: 'Male',
      country: 'Oman 🇴🇲',
      passportNo: 'A28190281 (Verified)',
      phone: '+968 9123 4567',
      email: 'ali.albalushi@demo.om',
      allergies: 'Penicillin',
      chronic: 'Type 2 Diabetes, Hypertension'
    },
    companion: {
      name: 'Fatima Al-Balushi',
      relation: 'Spouse',
      passportNo: 'A28190282 (Verified)',
      attendantVisaRequired: true
    },
    clinicalReview: {
      reviewer: 'Dr. Naresh Trehan / Dr. Anand (Reviewer)',
      date: '26 Aug 2026',
      summary: '54-year-old male presenting with exertional angina and dyspnea. Angiogram confirms severe Triple Vessel CAD (90% LAD, 85% RCA, 70% LCx). LVEF preserved at 52%.',
      recommendation: 'Off-Pump Coronary Artery Bypass Grafting (OPCABG) - 3 to 4 arterial/venous conduits.',
      missingReports: ['2D Echocardiogram Detailed Report', 'Pre-op HbA1c & Serum Creatinine Profile'],
      icd10: 'I25.10 (Atherosclerotic heart disease)'
    },
    auditLogs: [
      { action: 'STAGE_TRANSITION', old: 'PROVIDER_REVIEW', new: 'PROPOSAL_READY', actor: 'Sarah Fernandes (Coordinator)', time: '28 Aug 2026, 14:20 IST', ip: '103.21.124.5' },
      { action: 'DOCUMENT_VIEWED', old: null, new: 'Coronary_Angiography_Muscat.pdf', actor: 'Dr. Naresh Trehan (Doctor)', time: '26 Aug 2026, 11:05 IST', ip: '14.139.60.2' },
      { action: 'IDENTITY_VERIFIED', old: 'PENDING', new: 'VERIFIED', actor: 'Veriff Webhook Integration', time: '22 Aug 2026, 16:30 IST', ip: '34.201.12.88' },
    ]
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      <Header />

      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Breadcrumb & Navigation */}
          <div className="flex items-center justify-between">
            <Link 
              href="/dashboard" 
              className="inline-flex items-center text-xs font-bold text-slate-600 hover:text-sky-600 transition"
            >
              <ArrowLeft className="w-4 h-4 mr-1" /> Back to Operations Command Center
            </Link>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold px-3 py-1 bg-sky-100 text-sky-800 rounded-full">
                Active Stage: {caseStage}
              </span>
            </div>
          </div>

          {/* Dossier Header Banner */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <div className="flex items-center space-x-3">
                  <h1 className="text-2xl font-black text-slate-900">{caseDossier.id}</h1>
                  <span className="px-2.5 py-0.5 bg-rose-100 text-rose-800 text-xs font-bold rounded-full">
                    HIGH PRIORITY
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  Patient: <strong className="text-slate-900">{caseDossier.patient.name}</strong> • Age: {caseDossier.patient.age} • {caseDossier.patient.country}
                </p>
              </div>

              {/* Stage Transition Control */}
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-slate-500 uppercase">Transition Stage:</span>
                <select
                  value={caseStage}
                  onChange={(e) => setCaseStage(e.target.value)}
                  className="px-3 py-2 text-xs font-bold rounded-xl border border-sky-300 bg-sky-50 text-sky-900 focus:outline-none"
                >
                  <option value="PROPOSAL_READY">PROPOSAL_READY</option>
                  <option value="PATIENT_DECISION">PATIENT_DECISION</option>
                  <option value="PAYMENT_PENDING">PAYMENT_PENDING</option>
                  <option value="ACCEPTED">ACCEPTED</option>
                  <option value="VISA_PROCESSING">VISA_PROCESSING</option>
                  <option value="VISA_APPROVED">VISA_APPROVED</option>
                  <option value="READY_FOR_TRAVEL">READY_FOR_TRAVEL</option>
                  <option value="ARRIVED_IN_INDIA">ARRIVED_IN_INDIA</option>
                  <option value="HOSPITAL_ADMISSION">HOSPITAL_ADMISSION</option>
                  <option value="TREATMENT_IN_PROGRESS">TREATMENT_IN_PROGRESS</option>
                  <option value="DISCHARGE">DISCHARGE</option>
                  <option value="FOLLOW_UP">FOLLOW_UP</option>
                  <option value="COMPLETED">COMPLETED</option>
                </select>
              </div>
            </div>

            {/* Sub-Navigation Tabs */}
            <div className="flex flex-wrap gap-2 pt-6 mt-6 border-t border-slate-200 text-xs font-bold">
              {[
                { id: 'summary', name: 'Patient & KYC Dossier', icon: User },
                { id: 'clinical', name: 'Clinical Review & AI Summary', icon: Sparkles },
                { id: 'matching', name: 'Provider Matching & Quotations', icon: Building2 },
                { id: 'proposal', name: 'Treatment Proposal Builder', icon: CreditCard },
                { id: 'visa', name: 'Visa & Travel Desk', icon: ShieldCheck },
                { id: 'audit', name: 'Immutable Audit Trail', icon: History },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveSection(tab.id as any)}
                    className={`px-4 py-2 rounded-xl transition flex items-center space-x-1.5 ${
                      activeSection === tab.id
                        ? 'bg-slate-900 text-white shadow-sm'
                        : 'bg-slate-50 text-slate-700 hover:bg-slate-200/70 border border-slate-200'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* SECTION 1: SUMMARY & KYC */}
          {activeSection === 'summary' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <h3 className="font-bold text-sm text-slate-900">Patient Demographic & Medical Profile</h3>
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded text-[10px] font-bold">
                    KYC Verified (Veriff)
                  </span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between"><span className="text-slate-500">Full Name:</span> <strong>{caseDossier.patient.name}</strong></div>
                  <div className="flex justify-between"><span className="text-slate-500">Passport Number:</span> <span className="font-mono">{caseDossier.patient.passportNo}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Phone / WhatsApp:</span> <span>{caseDossier.patient.phone}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Email:</span> <span>{caseDossier.patient.email}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Allergies:</span> <strong className="text-rose-600">{caseDossier.patient.allergies}</strong></div>
                  <div className="flex justify-between"><span className="text-slate-500">Chronic Co-morbidities:</span> <span>{caseDossier.patient.chronic}</span></div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <h3 className="font-bold text-sm text-slate-900">Medical Attendant / Companion</h3>
                  <span className="px-2 py-0.5 bg-sky-100 text-sky-800 rounded text-[10px] font-bold">
                    MED-X Eligible
                  </span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between"><span className="text-slate-500">Companion Name:</span> <strong>{caseDossier.companion.name}</strong></div>
                  <div className="flex justify-between"><span className="text-slate-500">Relationship:</span> <span>{caseDossier.companion.relation}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Passport:</span> <span className="font-mono">{caseDossier.companion.passportNo}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Attendant Visa Status:</span> <span className="text-emerald-600 font-bold">Included in VIL Invitation Letter</span></div>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 2: CLINICAL REVIEW & AI */}
          {activeSection === 'clinical' && (
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
              <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                <div>
                  <h3 className="font-bold text-base text-slate-900">Clinical Evaluation & Summary</h3>
                  <p className="text-xs text-slate-500">Reviewed by {caseDossier.clinicalReview.reviewer} on {caseDossier.clinicalReview.date}</p>
                </div>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">
                  Clinical Approval Granted
                </span>
              </div>

              <div className="space-y-4 text-xs">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-700 uppercase block mb-1">Clinical Case Synopsis:</span>
                  <p className="text-slate-800 leading-relaxed">{caseDossier.clinicalReview.summary}</p>
                </div>

                <div className="p-4 bg-sky-50 rounded-xl border border-sky-200">
                  <span className="font-bold text-sky-900 uppercase block mb-1">Recommended Surgical Procedure:</span>
                  <p className="text-sky-800 font-semibold">{caseDossier.clinicalReview.recommendation}</p>
                  <p className="text-sky-600 mt-1 font-mono">ICD-10 Code: {caseDossier.clinicalReview.icd10}</p>
                </div>

                <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                  <span className="font-bold text-amber-900 uppercase block mb-1">Clarifications & Missing Reports Requested:</span>
                  <ul className="list-disc list-inside text-amber-800 space-y-1">
                    {caseDossier.clinicalReview.missingReports.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 3: AUDIT TRAIL */}
          {activeSection === 'audit' && (
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
              <div>
                <h3 className="font-bold text-base text-slate-900">Immutable Audit Trail (21 CFR Part 11 / DPDP Compliant)</h3>
                <p className="text-xs text-slate-500">Every sensitive action, document access, and state transition is cryptographically logged.</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Action</th>
                      <th className="py-3 px-4">Transition Details / Target</th>
                      <th className="py-3 px-4">Actor</th>
                      <th className="py-3 px-4">IP Address</th>
                      <th className="py-3 px-4">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {caseDossier.auditLogs.map((log, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="py-3 px-4 font-bold text-sky-800">{log.action}</td>
                        <td className="py-3 px-4 text-slate-700">
                          {log.old ? `${log.old} → ${log.new}` : log.new}
                        </td>
                        <td className="py-3 px-4 text-slate-800 font-medium">{log.actor}</td>
                        <td className="py-3 px-4 font-mono text-slate-500">{log.ip}</td>
                        <td className="py-3 px-4 text-slate-500">{log.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
