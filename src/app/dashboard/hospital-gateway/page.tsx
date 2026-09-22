'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { 
  Building2, 
  Sparkles, 
  ArrowLeft, 
  CheckCircle2, 
  RefreshCw, 
  Activity, 
  FileText, 
  ShieldCheck, 
  Lock, 
  ExternalLink,
  Cpu
} from 'lucide-react';

export default function HospitalGatewayDashboard() {
  const [syncing, setSyncing] = useState<string | null>(null);

  const hospitals = [
    {
      id: 'apollo-hospitals-delhi-demo',
      name: 'Indraprastha Apollo Hospitals, New Delhi',
      integrationType: 'FHIR_R4',
      authType: 'SMART on FHIR (OAuth2)',
      status: 'ONLINE',
      latency: '42ms',
      lastSync: '2 mins ago',
      supportedOps: ['Patient Bundle', 'Encounter Sync', 'DiagnosticReport', 'Discharge Summary']
    },
    {
      id: 'medanta-the-medicity-demo',
      name: 'Medanta - The Medicity, Gurugram',
      integrationType: 'REST_API',
      authType: 'Bearer JWT (HMAC-SHA256)',
      status: 'ONLINE',
      latency: '38ms',
      lastSync: '5 mins ago',
      supportedOps: ['IPD Admission API', 'Surgeon Slot Booking', 'Quotation Engine', 'VIL Dispatch']
    },
    {
      id: 'fortis-memorial-gurugram-demo',
      name: 'Fortis Memorial Research Institute (FMRI)',
      integrationType: 'REST_API',
      authType: 'API Key + Mutual TLS',
      status: 'ONLINE',
      latency: '55ms',
      lastSync: '12 mins ago',
      supportedOps: ['BMT Dossier Dispatch', 'Estimate Retrieval', 'Inpatient Tracking']
    },
    {
      id: 'max-saket-delhi-demo',
      name: 'Max Super Speciality Hospital, Saket',
      integrationType: 'SECURE_PORTAL_MANUAL',
      authType: 'Role-based 2FA Workspace',
      status: 'ONLINE',
      latency: 'N/A (Portal)',
      lastSync: '1 hour ago',
      supportedOps: ['Manual Case Review', 'Quotation Upload', 'Doctor Comments']
    }
  ];

  const handleTriggerSync = (id: string) => {
    setSyncing(id);
    setTimeout(() => setSyncing(null), 1200);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      <Header />

      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div>
              <div className="flex items-center space-x-2">
                <Building2 className="w-6 h-6 text-sky-600" />
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                  Hospital Integration Gateway & AI Pipeline
                </h1>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Unified interoperability bridge coordinating FHIR R4, REST APIs, and Secure EMR Adapters across India.
              </p>
            </div>

            <Link
              href="/dashboard"
              className="px-4 py-2 bg-slate-900 hover:bg-sky-600 text-white text-xs font-bold rounded-xl shadow transition flex items-center"
            >
              <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Operations Desk
            </Link>
          </div>

          {/* Top Capability Registry Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {hospitals.map((h) => (
              <div key={h.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-extrabold text-base text-slate-900">{h.name}</h3>
                    <div className="flex items-center space-x-2 text-xs text-slate-500 mt-1">
                      <span className="font-mono bg-slate-100 px-2 py-0.5 rounded text-[11px] font-bold text-sky-800">
                        {h.integrationType}
                      </span>
                      <span>• Auth: {h.authType}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-800 rounded-full text-xs font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>{h.status}</span>
                  </div>
                </div>

                {/* Operations & Specs */}
                <div className="p-3.5 bg-slate-50 rounded-xl text-xs space-y-2">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Supported Gateway Directives:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {h.supportedOps.map((op, i) => (
                      <span key={i} className="px-2 py-0.5 bg-white border border-slate-200 rounded text-[10px] font-semibold text-slate-700">
                        {op}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center text-xs pt-2 border-t border-slate-100">
                  <span className="text-slate-400">Last Synced: {h.lastSync} (Latency: {h.latency})</span>
                  <button
                    onClick={() => handleTriggerSync(h.id)}
                    disabled={syncing === h.id}
                    className="px-3 py-1.5 bg-sky-50 hover:bg-sky-100 text-sky-700 rounded-lg font-bold transition flex items-center"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 mr-1 ${syncing === h.id ? 'animate-spin' : ''}`} />
                    {syncing === h.id ? 'Syncing...' : 'Ping EMR Gateway'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* AI Extraction Layer Monitor */}
          <div className="bg-sky-950 text-white rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-sky-800 pb-4">
              <div className="flex items-center space-x-2">
                <Cpu className="w-6 h-6 text-sky-400" />
                <div>
                  <h3 className="font-black text-lg">AI Document Extraction & Summarization Engine</h3>
                  <p className="text-xs text-sky-300">Strict Information Extraction Guardrails • Zero Autonomous Diagnosis</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-sky-800 text-sky-200 rounded-full text-xs font-bold">
                Model: Medical-Claude / GPT-4o Vision Verified
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
              <div className="p-4 bg-sky-900/60 rounded-xl border border-sky-800 space-y-2">
                <span className="font-bold text-sky-300 uppercase block">1. Diagnostic Metric Parsing</span>
                <p className="text-sky-100 leading-relaxed">
                  Extracts LVEF percentages, stenosis degrees, HbA1c levels, histological grades, and surgical recommendations from raw PDFs/DICOM scans.
                </p>
              </div>

              <div className="p-4 bg-sky-900/60 rounded-xl border border-sky-800 space-y-2">
                <span className="font-bold text-sky-300 uppercase block">2. Missing Record Detection</span>
                <p className="text-sky-100 leading-relaxed">
                  Cross-references patient case dossier against Indian hospital pre-admission checklists to flag missing echo, viral markers, or biopsy blocks before patient departure.
                </p>
              </div>

              <div className="p-4 bg-sky-900/60 rounded-xl border border-sky-800 space-y-2">
                <span className="font-bold text-sky-300 uppercase block">3. Automated Clinical Escalation</span>
                <p className="text-sky-100 leading-relaxed">
                  Concierge questions regarding pain, bleeding, or drug dosing are instantly diverted to licensed medical review staff with emergency disclaimers.
                </p>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
