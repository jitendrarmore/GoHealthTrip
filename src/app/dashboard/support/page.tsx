'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import {
  HelpCircle, ShieldCheck, AlertCircle, Clock, CheckCircle2,
  MessageSquare, User, Building2, Phone, Search, Filter,
  ArrowRight, Send, Check, X,
} from 'lucide-react';

interface SupportTicket {
  id: string;
  caseId: string;
  patientName: string;
  country: string;
  subject: string;
  category: 'VISA_URGENT' | 'TRAVEL_CHANGE' | 'MEDICAL_QUESTION' | 'BILLING';
  priority: 'EMERGENCY' | 'HIGH' | 'MEDIUM';
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED';
  createdAt: string;
  slaMinutesLeft: number;
  lastMessage: string;
}

export default function SupportManagerDashboardPage() {
  const [selectedTicketId, setSelectedTicketId] = useState('TICK-2026-881');
  const [resolutionNote, setResolutionNote] = useState('');
  const [resolvedSuccess, setResolvedSuccess] = useState(false);

  const manager = {
    name: 'Vikram Malhotra',
    role: 'Head of International Patient Support & Escalations',
    email: 'vikram.support@gohealthtrip.in',
    phone: '+91 11 4567 8999',
    avgResponseTime: '8 mins',
    resolutionRate: '98.8%',
    activeTickets: 5,
  };

  const [tickets, setTickets] = useState<SupportTicket[]>([
    {
      id: 'TICK-2026-881',
      caseId: 'GHT-2026-OMN-0101',
      patientName: 'Ali Al-Balushi',
      country: 'Oman 🇴🇲',
      subject: 'Flight reschedule: Patient requested 2-day earlier arrival for pre-op',
      category: 'TRAVEL_CHANGE',
      priority: 'HIGH',
      status: 'OPEN',
      createdAt: '25 mins ago',
      slaMinutesLeft: 35,
      lastMessage: 'Patient needs hospital bed reservation moved from Oct 16 to Oct 14.',
    },
    {
      id: 'TICK-2026-882',
      caseId: 'GHT-2026-KEN-0102',
      patientName: 'Grace Mwangi',
      country: 'Kenya 🇰🇪',
      subject: 'Clarification on implant brand for robotic knee replacement',
      category: 'MEDICAL_QUESTION',
      priority: 'MEDIUM',
      status: 'IN_PROGRESS',
      createdAt: '1 hour ago',
      slaMinutesLeft: 50,
      lastMessage: 'Surgeon Dr. Marya confirmed Stryker Triathlon FDA-approved titanium implant.',
    },
    {
      id: 'TICK-2026-883',
      caseId: 'GHT-2026-NGA-0105',
      patientName: 'Emeka Okafor',
      country: 'Nigeria 🇳🇬',
      subject: 'Embassy letter requirement: Yellow fever exemption letter needed',
      category: 'VISA_URGENT',
      priority: 'EMERGENCY',
      status: 'OPEN',
      createdAt: '12 mins ago',
      slaMinutesLeft: 18,
      lastMessage: 'Indian High Commission Abuja requested hospital letter confirming medical urgency.',
    },
  ]);

  const activeTicket = tickets.find(t => t.id === selectedTicketId) || tickets[0];

  const handleResolveTicket = (e: React.FormEvent) => {
    e.preventDefault();
    setTickets(tickets.map(t => t.id === selectedTicketId ? { ...t, status: 'RESOLVED' } : t));
    setResolvedSuccess(true);
    setTimeout(() => setResolvedSuccess(false), 4000);
    setResolutionNote('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <Header />

      <main className="flex-1 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-6">

          {/* Manager Header Banner */}
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center font-bold text-3xl shadow">
                🛡️
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-black">{manager.name}</h1>
                  <span className="px-2.5 py-0.5 bg-rose-500/20 text-rose-300 border border-rose-500/30 rounded-full text-[10px] font-bold uppercase tracking-wider">
                    Quality & Escalations Desk
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-1">
                  {manager.role} · 24/7 Response Center
                </p>
              </div>
            </div>

            <div className="flex gap-4 text-center">
              <div className="px-4 py-2 bg-white/10 rounded-2xl backdrop-blur-sm">
                <span className="text-xl font-black text-amber-400">{manager.activeTickets}</span>
                <span className="text-[10px] text-slate-300 block uppercase font-semibold">Active Tickets</span>
              </div>
              <div className="px-4 py-2 bg-white/10 rounded-2xl backdrop-blur-sm">
                <span className="text-xl font-black text-emerald-400">{manager.avgResponseTime}</span>
                <span className="text-[10px] text-slate-300 block uppercase font-semibold">Avg Response Time</span>
              </div>
            </div>
          </div>

          {resolvedSuccess && (
            <div className="p-4 bg-emerald-50 text-emerald-900 rounded-2xl border border-emerald-200 text-xs font-semibold flex items-center gap-2 shadow-sm animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Ticket resolved and closed! Resolution notification transmitted to patient and assigned hospital coordinator.</span>
            </div>
          )}

          {/* Ticket Queue & Details Workspace */}
          <div className="grid lg:grid-cols-12 gap-6">

            {/* Left 5 Cols: Escalation Queue */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                <h2 className="font-extrabold text-sm text-slate-900">Escalation & Support Queue</h2>
                <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">
                  {tickets.filter(t => t.status !== 'RESOLVED').length} Open
                </span>
              </div>

              <div className="space-y-3">
                {tickets.map((t) => (
                  <div
                    key={t.id}
                    onClick={() => setSelectedTicketId(t.id)}
                    className={`p-5 rounded-2xl border cursor-pointer transition space-y-2 ${
                      selectedTicketId === t.id
                        ? 'bg-sky-50/70 border-sky-500 shadow-sm ring-2 ring-sky-500/20'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-sky-700">{t.id}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        t.priority === 'EMERGENCY'
                          ? 'bg-rose-100 text-rose-800'
                          : t.priority === 'HIGH'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}>
                        {t.priority}
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-slate-900 leading-snug">{t.subject}</h4>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                      <span>{t.patientName} ({t.country})</span>
                      <span className={`font-semibold ${t.status === 'RESOLVED' ? 'text-emerald-600' : 'text-amber-600'}`}>
                        {t.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right 7 Cols: Ticket Detail & Resolution Form */}
            <div className="lg:col-span-7 space-y-6">

              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
                <div className="flex justify-between items-start border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-xs font-mono font-bold text-sky-700">{activeTicket.id}</span>
                    <h3 className="text-base font-black text-slate-900 mt-0.5">{activeTicket.subject}</h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Case: <strong>{activeTicket.caseId}</strong> · Patient: <strong>{activeTicket.patientName}</strong> ({activeTicket.country})
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    activeTicket.status === 'RESOLVED' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {activeTicket.status}
                  </span>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Reported Issue:</span>
                  <p className="text-slate-700 leading-relaxed">{activeTicket.lastMessage}</p>
                </div>

                {activeTicket.status !== 'RESOLVED' ? (
                  <form onSubmit={handleResolveTicket} className="space-y-4 pt-2">
                    <label className="block text-xs font-bold text-slate-700 uppercase">
                      Action Taken / Resolution Summary
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={resolutionNote}
                      onChange={(e) => setResolutionNote(e.target.value)}
                      placeholder="Detail the steps taken (e.g. Medanta hospital bed rescheduling approved, updated VIL issued to patient)..."
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white"
                    />

                    <div className="flex justify-end gap-3 pt-2">
                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow"
                      >
                        <Check className="w-4 h-4" />
                        <span>Mark Ticket Resolved</span>
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-900">
                    This ticket has been marked as <strong>RESOLVED</strong> by Vikram Malhotra.
                  </div>
                )}
              </div>

            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
