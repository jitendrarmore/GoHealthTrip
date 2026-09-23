'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import {
  Users, ShieldCheck, Clock, CheckCircle2, AlertCircle,
  Plane, Building2, FileText, Phone, MessageSquare,
  ArrowRight, Search, Filter, Send, Download, Sparkles,
} from 'lucide-react';

export default function CoordinatorDashboardPage() {
  const [selectedCase, setSelectedCase] = useState('GHT-2026-OMN-0101');
  const [vilGenerated, setVilGenerated] = useState(false);
  const [airportScheduled, setAirportScheduled] = useState(false);

  const coordinator = {
    name: 'Sarah Fernandes',
    desk: 'GCC & Middle East Patient Desk',
    email: 'sarah.fernandes@gohealthtrip.in',
    phone: '+91 98110 44521 (WhatsApp Live)',
    languages: ['Arabic (Fluent)', 'English', 'Hindi'],
    activeCasesCount: 14,
    slaCompliance: '99.4%',
  };

  const cases = [
    {
      id: 'GHT-2026-OMN-0101',
      patient: 'Ali Al-Balushi',
      country: 'Oman 🇴🇲',
      city: 'Muscat',
      procedure: 'Off-Pump CABG (Heart Bypass)',
      hospital: 'Medanta – The Medicity',
      doctor: 'Dr. Naresh Trehan',
      stage: 'VISA_VIL_READY',
      attendant: 'Fatima Al-Balushi (Spouse)',
      arrivalTarget: '16 Oct 2026',
      vilStatus: 'READY_TO_ISSUE',
    },
    {
      id: 'GHT-2026-ARE-0104',
      patient: 'Rashid Al-Nuaimi',
      country: 'UAE 🇦🇪',
      city: 'Dubai',
      procedure: 'Robotic Spine Fusion (L4-L5)',
      hospital: 'Apollo Delhi',
      doctor: 'Dr. Arun Sethi',
      stage: 'CLINICAL_REVIEW_APPROVED',
      attendant: 'Sultan Al-Nuaimi (Brother)',
      arrivalTarget: '22 Oct 2026',
      vilStatus: 'PENDING_APPROVAL',
    },
    {
      id: 'GHT-2026-KEN-0102',
      patient: 'Grace Mwangi',
      country: 'Kenya 🇰🇪',
      city: 'Nairobi',
      procedure: 'Robotic Knee Replacement',
      hospital: 'Max Saket',
      doctor: 'Dr. S.K.S. Marya',
      stage: 'HOSPITAL_QUOTATION_ISSUED',
      attendant: 'John Mwangi (Son)',
      arrivalTarget: '28 Oct 2026',
      vilStatus: 'AWAITING_CONSENT',
    },
  ];

  const handleGenerateVIL = () => {
    setVilGenerated(true);
    setTimeout(() => setVilGenerated(false), 4000);
  };

  const handleScheduleAirport = () => {
    setAirportScheduled(true);
    setTimeout(() => setAirportScheduled(false), 4000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <Header />

      <main className="flex-1 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-6">

          {/* Coordinator Profile Header */}
          <div className="bg-gradient-to-r from-sky-950 via-slate-900 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-sky-400 to-indigo-600 flex items-center justify-center font-bold text-2xl shadow">
                👩‍💼
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-black">{coordinator.name}</h1>
                  <span className="px-2.5 py-0.5 bg-sky-500/20 text-sky-300 border border-sky-500/30 rounded-full text-[10px] font-bold uppercase tracking-wider">
                    {coordinator.desk}
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-1">
                  Languages: {coordinator.languages.join(' · ')} · {coordinator.phone}
                </p>
              </div>
            </div>

            <div className="flex gap-4 text-center">
              <div className="px-4 py-2 bg-white/10 rounded-2xl backdrop-blur-sm">
                <span className="text-xl font-black text-white">{coordinator.activeCasesCount}</span>
                <span className="text-[10px] text-slate-300 block uppercase font-semibold">Active Caseload</span>
              </div>
              <div className="px-4 py-2 bg-white/10 rounded-2xl backdrop-blur-sm">
                <span className="text-xl font-black text-emerald-400">{coordinator.slaCompliance}</span>
                <span className="text-[10px] text-slate-300 block uppercase font-semibold">SLA On-Time Rate</span>
              </div>
            </div>
          </div>

          {vilGenerated && (
            <div className="p-4 bg-emerald-50 text-emerald-900 rounded-2xl border border-emerald-200 text-xs font-semibold flex items-center gap-2 shadow-sm animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Official Hospital Visa Invitation Letter (VIL) generated and transmitted to Indian Embassy Muscat for Ali Al-Balushi & companion Fatima Al-Balushi.</span>
            </div>
          )}

          {airportScheduled && (
            <div className="p-4 bg-sky-50 text-sky-900 rounded-2xl border border-sky-200 text-xs font-semibold flex items-center gap-2 shadow-sm animate-fadeIn">
              <Plane className="w-4 h-4 text-sky-600 flex-shrink-0" />
              <span>IGI T3 Airport Chauffeur & Patient Reception dispatched for 16 Oct 2026. Driver details synced to patient dashboard.</span>
            </div>
          )}

          {/* Caseload and Workflow Workspace */}
          <div className="grid lg:grid-cols-12 gap-6">

            {/* Left 5 Cols: Active Patients Queue */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                <h2 className="font-extrabold text-sm text-slate-900">Active Patient Caseload</h2>
                <span className="text-xs font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full">
                  {cases.length} Traveling
                </span>
              </div>

              <div className="space-y-3">
                {cases.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => setSelectedCase(c.id)}
                    className={`p-5 rounded-2xl border cursor-pointer transition space-y-2 ${
                      selectedCase === c.id
                        ? 'bg-sky-50/70 border-sky-500 shadow-sm ring-2 ring-sky-500/20'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <strong className="text-sm font-bold text-slate-900">{c.patient}</strong>
                      <span className="text-xs text-slate-500">{c.country}</span>
                    </div>

                    <p className="text-xs text-sky-700 font-semibold">{c.procedure}</p>

                    <div className="text-[11px] text-slate-600 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-slate-400" />
                      <span>{c.hospital} ({c.doctor})</span>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                      <span className="text-slate-500">Target Arrival: <strong>{c.arrivalTarget}</strong></span>
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-bold">
                        {c.stage}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right 7 Cols: Logistics, VIL, & Transport Coordination */}
            <div className="lg:col-span-7 space-y-6">

              {/* Patient Journey Hub */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
                <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-xs font-mono font-bold text-sky-700">Case: GHT-2026-OMN-0101</span>
                    <h3 className="text-lg font-black text-slate-900">Ali Al-Balushi (Muscat, Oman)</h3>
                  </div>
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold">
                    Proposal Accepted by Patient
                  </span>
                </div>

                {/* Logistics Checklist */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Logistics & International Clearance
                  </h4>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between text-xs">
                    <div>
                      <strong className="text-slate-900 block font-bold">1. Hospital Visa Invitation Letter (VIL)</strong>
                      <span className="text-slate-500">Issued by Medanta IPD for Ali Al-Balushi & Fatima Al-Balushi</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleGenerateVIL}
                      className="px-3 py-1.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl font-bold transition flex items-center gap-1 shadow-sm"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Issue VIL</span>
                    </button>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between text-xs">
                    <div>
                      <strong className="text-slate-900 block font-bold">2. IGI Airport Reception & Ambulance Booking</strong>
                      <span className="text-slate-500">Flight WY 241 (Oman Air) landing T3 DEL at 14:20</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleScheduleAirport}
                      className="px-3 py-1.5 bg-slate-900 hover:bg-sky-600 text-white rounded-xl font-bold transition flex items-center gap-1 shadow-sm"
                    >
                      <Plane className="w-3.5 h-3.5" />
                      <span>Confirm Reception</span>
                    </button>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between text-xs">
                    <div>
                      <strong className="text-slate-900 block font-bold">3. Guest Accommodations & Halal Dining</strong>
                      <span className="text-slate-500">Medanta Medicity Suites (Room 408) · Arabic menu requested</span>
                    </div>
                    <span className="text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100">
                      Confirmed
                    </span>
                  </div>
                </div>

                {/* Direct Patient WhatsApp Action */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <a
                    href="https://wa.me/96891234567?text=Hello%20Mr.%20Ali,%20this%20is%20Sarah%20from%20GoHealthTrip.%20Your%20visa%20invitation%20letter%20is%20ready."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition shadow"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp Patient Directly</span>
                  </a>
                  <Link
                    href="/my-case"
                    className="px-5 py-3 border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold rounded-xl text-xs flex items-center justify-center gap-1 transition"
                  >
                    <span>View Patient's Live View</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
