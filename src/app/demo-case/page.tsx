import Link from 'next/link';
import { 
  CheckCircle2, 
  Clock, 
  FileText, 
  Building, 
  User, 
  Plane, 
  ShieldCheck, 
  ChevronRight, 
  CreditCard,
  AlertTriangle,
  ArrowLeft
} from 'lucide-react';

export default function DemoCasePage() {
  const caseData = {
    caseNumber: 'GHT-2026-OMN-0101',
    patientName: 'Ali Al-Balushi',
    country: 'Oman 🇴🇲',
    condition: 'Triple Vessel Coronary Artery Disease with Angina',
    currentStage: 'PROPOSAL_READY',
    priority: 'HIGH',
    assignedCoordinator: 'Sarah Fernandes (GCC Desk)',
    hospital: 'Medanta - The Medicity, Gurugram (JCI, NABH)',
    treatingSurgeon: 'Dr. Naresh Trehan (Chairman & Chief Cardiac Surgeon)',
    procedure: 'Off-Pump Coronary Artery Bypass Graft (OPCABG)',
    estimateTotal: '$8,300 USD',
    breakdown: {
      treatment: '$7,100 (Hospital, Surgeon, 2 ICU + 5 Deluxe Room Days)',
      logistics: '$950 (Partner Hotel 7 days + Airport Dedicated Pickup/Drop)',
      platform: '$250 (Full Journey Care Coordination & Post-Op Remote Teleconsult)'
    },
    visaStatus: 'Visa Invitation Letter (VIL) Generated',
    travelDates: '16 Oct 2026 – 31 Oct 2026'
  };

  const timeline = [
    { name: 'Identity & KYC Verification', status: 'COMPLETED', date: '22 Aug 2026' },
    { name: 'Medical Reports Upload & AI Extraction', status: 'COMPLETED', date: '24 Aug 2026' },
    { name: 'Clinical Review by Indian Specialist', status: 'COMPLETED', date: '26 Aug 2026' },
    { name: 'Hospital Matching & Formal Quotation', status: 'COMPLETED', date: '28 Aug 2026' },
    { name: 'Treatment Proposal Review (Current)', status: 'ACTIVE', date: 'Awaiting Patient Consent' },
    { name: 'Medical Visa (e-Med) & Flight Coordination', status: 'UPCOMING', date: 'Pending Proposal Approval' },
    { name: 'India Arrival & Inpatient Hospital Admission', status: 'UPCOMING', date: '18 Oct 2026' },
    { name: 'Surgical Procedure & Hospital Discharge', status: 'UPCOMING', date: '25 Oct 2026' },
    { name: 'Hotel Recovery & Safe Return to Oman', status: 'UPCOMING', date: '31 Oct 2026' },
    { name: 'Remote Post-Op Follow-Up Teleconsultation', status: 'UPCOMING', date: '15 Nov 2026' }
  ];

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Navigation & Header */}
        <div className="flex items-center justify-between">
          <Link href="/" className="inline-flex items-center text-sm font-medium text-slate-600 hover:text-sky-600 transition">
            <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Home
          </Link>
          <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 bg-amber-100 text-amber-900 rounded-full border border-amber-300">
            Live Demo Case Journey
          </span>
        </div>

        {/* Case Banner */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-6">
            <div>
              <div className="flex items-center space-x-3">
                <h1 className="text-2xl font-black text-slate-900">{caseData.caseNumber}</h1>
                <span className="px-3 py-1 bg-sky-100 text-sky-800 text-xs font-bold rounded-full">
                  Stage: {caseData.currentStage}
                </span>
                <span className="px-3 py-1 bg-rose-100 text-rose-800 text-xs font-bold rounded-full">
                  Priority: {caseData.priority}
                </span>
              </div>
              <p className="text-slate-600 mt-1">
                Patient: <strong className="text-slate-900">{caseData.patientName}</strong> ({caseData.country})
              </p>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-xs text-slate-500 block">Total Coordinated Package</span>
              <span className="text-3xl font-black text-slate-900">{caseData.estimateTotal}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 text-sm">
            <div className="space-y-1">
              <span className="text-xs text-slate-400 uppercase font-semibold">Primary Diagnosis</span>
              <p className="font-semibold text-slate-800">{caseData.condition}</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs text-slate-400 uppercase font-semibold">Hospital & Surgeon</span>
              <p className="font-semibold text-slate-800">{caseData.treatingSurgeon}</p>
              <p className="text-xs text-slate-500">{caseData.hospital}</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs text-slate-400 uppercase font-semibold">Assigned Care Coordinator</span>
              <p className="font-semibold text-slate-800">{caseData.assignedCoordinator}</p>
              <p className="text-xs text-emerald-600 font-medium">Available via WhatsApp & Portal</p>
            </div>
          </div>
        </div>

        {/* Treatment Proposal Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
              <FileText className="w-5 h-5 text-sky-600 mr-2" />
              Detailed Proposal Cost Breakdown
            </h2>

            <div className="space-y-4 text-sm">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-slate-900">Hospital Medical Package</h4>
                  <p className="text-xs text-slate-500">Includes CABG, 2 ICU days, 5 private room days, surgeon fee, standard diagnostics.</p>
                </div>
                <span className="font-extrabold text-slate-900">$7,100</span>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-slate-900">Travel & Logistics Coordination</h4>
                  <p className="text-xs text-slate-500">7 Days partner hotel stay + Airport reception in dedicated AC sedan.</p>
                </div>
                <span className="font-extrabold text-slate-900">$950</span>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-slate-900">Platform Facilitation & Post-Op Follow-up</h4>
                  <p className="text-xs text-slate-500">Dedicated care coordinator, visa dossier, and post-discharge teleconsult.</p>
                </div>
                <span className="font-extrabold text-slate-900">$250</span>
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-between items-center text-base">
                <span className="font-bold text-slate-900">Total Validated Estimate:</span>
                <span className="font-black text-2xl text-sky-700">$8,300 USD</span>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <button className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow transition text-center">
                  Accept Proposal & Proceed to Visa
                </button>
                <button className="px-6 py-3 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold rounded-xl transition text-center">
                  Request Revision
                </button>
              </div>
            </div>
          </div>

          {/* AI Clinical Summary Overlay */}
          <div className="bg-sky-900 text-white rounded-2xl p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-sky-300">
                  AI Medical Extraction Summary
                </span>
                <span className="text-xs px-2 py-0.5 bg-sky-800 text-sky-200 rounded">Audited</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Angiography Findings Extracted</h3>
              <p className="text-xs text-sky-100 leading-relaxed">
                90% stenosis in mid-LAD, 85% proximal RCA, 70% LCx. Left Ventricular Ejection Fraction (LVEF) 52%.
              </p>
              <div className="mt-4 p-3 bg-sky-800/80 rounded-xl text-xs space-y-1">
                <span className="font-bold text-sky-200">Flagged Missing Records:</span>
                <p className="text-sky-100">• Recent Serum Creatinine & Renal Profile</p>
                <p className="text-sky-100">• 2D Echocardiogram Detailed Report</p>
              </div>
            </div>
            <p className="mt-6 text-[10px] text-sky-300/80">
              * AI summary is an administrative extraction aid and has been clinically reviewed by Dr. Naresh Trehan.
            </p>
          </div>
        </div>

        {/* Visual 10-Milestone Journey Timeline */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center">
            <Clock className="w-5 h-5 text-sky-600 mr-2" />
            Patient Journey Milestone Tracker
          </h2>

          <div className="space-y-4">
            {timeline.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 hover:bg-slate-50 transition">
                <div className="flex items-center space-x-3">
                  {item.status === 'COMPLETED' ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  ) : item.status === 'ACTIVE' ? (
                    <div className="w-5 h-5 rounded-full border-2 border-sky-600 border-t-transparent animate-spin shrink-0" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-slate-300 shrink-0" />
                  )}
                  <div>
                    <span className={`text-sm font-semibold ${item.status === 'COMPLETED' ? 'text-slate-800' : item.status === 'ACTIVE' ? 'text-sky-700 font-bold' : 'text-slate-400'}`}>
                      {item.name}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-xs ${item.status === 'COMPLETED' ? 'text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded' : item.status === 'ACTIVE' ? 'text-sky-700 bg-sky-50 px-2 py-0.5 rounded font-bold' : 'text-slate-400'}`}>
                    {item.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
