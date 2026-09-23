'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import {
  Stethoscope, ShieldCheck, FileText, CheckCircle2, Clock,
  AlertTriangle, ArrowRight, User, Eye, Download, Send,
  Award, Sparkles, Building2, Search, Filter,
} from 'lucide-react';

interface ClinicalCase {
  id: string;
  patientName: string;
  age: number;
  gender: string;
  country: string;
  condition: string;
  priority: 'EMERGENCY' | 'HIGH' | 'ROUTINE';
  status: 'PENDING_REVIEW' | 'REVIEWED' | 'ADDITIONAL_TESTS_REQUIRED';
  submittedAt: string;
  reports: { name: string; size: string; type: string }[];
  clinicalSummary: string;
}

export default function DoctorPortalPage() {
  const [selectedCaseId, setSelectedCaseId] = useState<string>('GHT-2026-OMN-0101');
  const [filterPriority, setFilterPriority] = useState<string>('ALL');
  const [submittedReview, setSubmittedReview] = useState(false);

  // Doctor evaluation form state
  const [evaluation, setEvaluation] = useState({
    surgicalEligibility: 'APPROVED_SURGICAL_CANDIDATE',
    recommendedProcedure: 'Off-Pump Coronary Artery Bypass Grafting (OP-CABG x 3 Grafts: LIMA to LAD, SVG to OM & RCA)',
    expectedIcuDays: '2 Days',
    expectedWardDays: '5 Days',
    expectedHotelRecoveryDays: '7 Days',
    preOpInstructions: 'Hold antiplatelet medication (Clopidogrel) 5 days prior to planned surgery date. Repeat serum creatinine on arrival.',
    surgeonNotes: 'High likelihood of complete revascularization. Preserved ejection fraction (>50%) makes patient an excellent low-risk candidate.',
  });

  const cases: ClinicalCase[] = [
    {
      id: 'GHT-2026-OMN-0101',
      patientName: 'Ali Al-Balushi',
      age: 52,
      gender: 'Male',
      country: 'Oman 🇴🇲',
      condition: 'Triple Vessel Coronary Artery Disease (CAD)',
      priority: 'HIGH',
      status: 'PENDING_REVIEW',
      submittedAt: 'Today, 08:30 AM',
      reports: [
        { name: 'Coronary_Angiography_Muscat.pdf', size: '2.4 MB', type: 'Imaging / Catheterization' },
        { name: 'Blood_Biochemistry_Panel.pdf', size: '850 KB', type: 'Lab Report' },
      ],
      clinicalSummary: 'Angiogram reveals 90% LAD stenosis, 85% proximal RCA stenosis, and 70% LCx lesion. Preserved LV function (52%). Angina on minimal exertion for 3 months.',
    },
    {
      id: 'GHT-2026-KEN-0102',
      patientName: 'Grace Mwangi',
      age: 58,
      gender: 'Female',
      country: 'Kenya 🇰🇪',
      condition: 'Severe Bilateral Knee Osteoarthritis (Grade IV)',
      priority: 'ROUTINE',
      status: 'PENDING_REVIEW',
      submittedAt: 'Yesterday, 04:15 PM',
      reports: [
        { name: 'Bilateral_Knee_XRay_Nairobi.pdf', size: '4.1 MB', type: 'Radiology' },
      ],
      clinicalSummary: 'Severe joint space narrowing with subchondral sclerosis. Conservative therapies exhausted. Walking limited to 50 meters.',
    },
    {
      id: 'GHT-2026-UZB-0103',
      patientName: 'Farkhod Karimov',
      age: 46,
      gender: 'Male',
      country: 'Uzbekistan 🇺🇿',
      condition: 'Acoustic Neuroma / Vestibular Schwannoma (1.8 cm)',
      priority: 'HIGH',
      status: 'REVIEWED',
      submittedAt: '2 days ago',
      reports: [
        { name: 'Brain_MRI_With_Contrast_Tashkent.pdf', size: '8.2 MB', type: 'MRI Scan' },
      ],
      clinicalSummary: 'Unilateral hearing loss with mild ataxia. CyberKnife stereotactic radiosurgery recommended to preserve facial nerve function.',
    },
  ];

  const currentCase = cases.find(c => c.id === selectedCaseId) || cases[0];

  const handleSubmitEvaluation = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedReview(true);
    setTimeout(() => setSubmittedReview(false), 4000);
  };

  const inputClass = 'w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white transition';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <Header />

      <main className="flex-1 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-6">

          {/* Doctor Header Banner */}
          <div className="bg-gradient-to-r from-sky-900 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center font-bold text-3xl shadow">
                👨‍⚕️
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-black">Dr. Naresh Trehan</h1>
                  <span className="px-2.5 py-0.5 bg-sky-400/20 text-sky-300 border border-sky-400/30 rounded-full text-[10px] font-bold uppercase tracking-wider">
                    Chief Cardiac Surgeon
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-1 flex items-center gap-2">
                  <Building2 className="w-3.5 h-3.5 text-sky-400" />
                  <span>Medanta – The Medicity (Gurugram) · International IPD Clinical Panel</span>
                </p>
              </div>
            </div>

            <div className="flex gap-4 text-center">
              <div className="px-4 py-2 bg-white/10 rounded-2xl backdrop-blur-sm">
                <span className="text-xl font-black text-white">2</span>
                <span className="text-[10px] text-slate-300 block uppercase font-semibold">Pending Reviews</span>
              </div>
              <div className="px-4 py-2 bg-white/10 rounded-2xl backdrop-blur-sm">
                <span className="text-xl font-black text-emerald-400">142</span>
                <span className="text-[10px] text-slate-300 block uppercase font-semibold">Surgeries Completed</span>
              </div>
            </div>
          </div>

          {submittedReview && (
            <div className="p-4 bg-emerald-50 text-emerald-900 rounded-2xl border border-emerald-200 text-xs font-semibold flex items-center gap-2 shadow-sm animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Surgeon Opinion & Formal Evaluation submitted successfully! Care Coordinator and Hospital IPD notified to issue official quotation.</span>
            </div>
          )}

          {/* Main Grid: Left Caselist, Right Review Form */}
          <div className="grid lg:grid-cols-12 gap-6">

            {/* Left 4 Cols: Cases Queue */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                <h2 className="font-extrabold text-sm text-slate-900">Clinical Review Queue</h2>
                <span className="text-xs font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full">
                  {cases.length} Cases
                </span>
              </div>

              <div className="space-y-3">
                {cases.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => setSelectedCaseId(c.id)}
                    className={`p-4 rounded-2xl border cursor-pointer transition flex flex-col gap-2 ${
                      selectedCaseId === c.id
                        ? 'bg-sky-50/60 border-sky-500 shadow-sm ring-2 ring-sky-500/20'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">{c.patientName}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        c.priority === 'HIGH' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {c.priority}
                      </span>
                    </div>

                    <p className="text-xs text-sky-700 font-semibold">{c.condition}</p>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                      <span>{c.country} · {c.age}y/{c.gender}</span>
                      <span className="text-emerald-700 font-semibold">{c.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right 8 Cols: Patient Case Dossier & Clinical Evaluation */}
            <div className="lg:col-span-8 space-y-6">

              {/* Patient Snapshot Card */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-xs font-mono font-bold text-sky-700">{currentCase.id}</span>
                    <h3 className="text-xl font-black text-slate-900 mt-0.5">
                      {currentCase.patientName} ({currentCase.age}y / {currentCase.gender})
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">Origin: {currentCase.country} · Submitted: {currentCase.submittedAt}</p>
                  </div>
                  <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-bold">
                    Awaiting Surgeon Evaluation
                  </span>
                </div>

                {/* AI / Clinical Summary */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1.5">
                  <span className="font-bold text-slate-700 uppercase text-[10px] tracking-wider block">Clinical History & AI Extraction:</span>
                  <p className="text-slate-700 leading-relaxed">{currentCase.clinicalSummary}</p>
                </div>

                {/* Attached Reports */}
                <div>
                  <span className="font-bold text-slate-700 uppercase text-[10px] tracking-wider block mb-2">Uploaded Diagnostic Files:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {currentCase.reports.map((rep, i) => (
                      <div key={i} className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-sky-600 flex-shrink-0" />
                          <div>
                            <strong className="text-slate-900 block font-semibold truncate max-w-[180px]">{rep.name}</strong>
                            <span className="text-[10px] text-slate-400">{rep.type} · {rep.size}</span>
                          </div>
                        </div>
                        <button
                          type="button"
                          className="px-2.5 py-1 bg-sky-50 text-sky-700 hover:bg-sky-100 rounded-lg text-xs font-bold transition flex items-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Surgeon Opinion & Evaluation Form */}
              <form onSubmit={handleSubmitEvaluation} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                  <Stethoscope className="w-5 h-5 text-indigo-600" />
                  <h3 className="font-extrabold text-base text-slate-900">Surgeon Clinical Opinion & Treatment Prescription</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Surgical Eligibility Status
                    </label>
                    <select
                      value={evaluation.surgicalEligibility}
                      onChange={(e) => setEvaluation({ ...evaluation, surgicalEligibility: e.target.value })}
                      aria-label="Surgical Eligibility Status"
                      className={inputClass}
                    >
                      <option value="APPROVED_SURGICAL_CANDIDATE">Approved Candidate for Surgical Intervention</option>
                      <option value="MEDICAL_MANAGEMENT_RECOMMENDED">Medical Management / Non-Surgical Recommended</option>
                      <option value="ADDITIONAL_DIAGNOSTICS_REQUIRED">Additional Investigations Required Prior to Confirmation</option>
                      <option value="DECLINED_HIGH_RISK">Ineligible / High Risk for Overseas Travel</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Recommended Procedure / Surgical Plan
                    </label>
                    <textarea
                      rows={2}
                      value={evaluation.recommendedProcedure}
                      onChange={(e) => setEvaluation({ ...evaluation, recommendedProcedure: e.target.value })}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Expected ICU Stay</label>
                    <input
                      type="text"
                      value={evaluation.expectedIcuDays}
                      onChange={(e) => setEvaluation({ ...evaluation, expectedIcuDays: e.target.value })}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Expected Inpatient Ward Stay</label>
                    <input
                      type="text"
                      value={evaluation.expectedWardDays}
                      onChange={(e) => setEvaluation({ ...evaluation, expectedWardDays: e.target.value })}
                      className={inputClass}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Expected Post-Op Hotel Recovery Stay</label>
                    <input
                      type="text"
                      value={evaluation.expectedHotelRecoveryDays}
                      onChange={(e) => setEvaluation({ ...evaluation, expectedHotelRecoveryDays: e.target.value })}
                      className={inputClass}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Pre-Operative Instructions & Clinical Notes</label>
                    <textarea
                      rows={3}
                      value={evaluation.preOpInstructions}
                      onChange={(e) => setEvaluation({ ...evaluation, preOpInstructions: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-400">
                    Opinion signed by Dr. Naresh Trehan (FRCS, Chairman Cardiac Sciences)
                  </span>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-sky-500 to-indigo-600 hover:opacity-95 text-white font-bold rounded-xl shadow-md text-xs flex items-center gap-2 transition"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit & Authorize Hospital Quotation</span>
                  </button>
                </div>
              </form>

            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
