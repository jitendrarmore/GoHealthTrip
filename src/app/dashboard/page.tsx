'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { 
  Users, 
  Clock, 
  FileText, 
  ShieldCheck, 
  CreditCard, 
  Plane, 
  Building2, 
  CheckCircle2, 
  AlertTriangle, 
  Search, 
  Filter, 
  ArrowRight,
  Eye,
  AlertCircle,
  Calendar,
  Sparkles,
  ChevronRight,
  Plus
} from 'lucide-react';

export default function OperationsDashboard() {
  const [selectedStage, setSelectedStage] = useState('ALL');
  const [selectedPriority, setSelectedPriority] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // 14 Operational KPIs
  const kpis = [
    { label: 'New Leads', count: 18, color: 'border-blue-500 text-blue-600 bg-blue-50' },
    { label: 'Identity Pending', count: 7, color: 'border-amber-500 text-amber-600 bg-amber-50' },
    { label: 'Medical Review Pending', count: 12, color: 'border-indigo-500 text-indigo-600 bg-indigo-50' },
    { label: 'Provider Matching', count: 9, color: 'border-purple-500 text-purple-600 bg-purple-50' },
    { label: 'Proposal Pending', count: 6, color: 'border-sky-500 text-sky-600 bg-sky-50' },
    { label: 'Payment Pending', count: 4, color: 'border-emerald-500 text-emerald-600 bg-emerald-50' },
    { label: 'Visa Pending', count: 8, color: 'border-orange-500 text-orange-600 bg-orange-50' },
    { label: 'Travel Pending', count: 5, color: 'border-teal-500 text-teal-600 bg-teal-50' },
    { label: 'Arriving This Week', count: 3, color: 'border-cyan-500 text-cyan-600 bg-cyan-50 font-bold' },
    { label: 'Currently in India', count: 14, color: 'border-rose-500 text-rose-600 bg-rose-50 font-bold' },
    { label: 'Hospitalized (Inpatient)', count: 6, color: 'border-red-500 text-red-600 bg-red-50 font-bold' },
    { label: 'Discharge Pending', count: 4, color: 'border-yellow-500 text-yellow-600 bg-yellow-50' },
    { label: 'Follow-Up Pending', count: 11, color: 'border-violet-500 text-violet-600 bg-violet-50' },
    { label: 'Completed Cases', count: 142, color: 'border-emerald-600 text-emerald-700 bg-emerald-100/50' },
  ];

  // Cases Dataset
  const cases = [
    {
      id: 'GHT-2026-OMN-0101',
      patient: 'Ali Al-Balushi',
      country: 'Oman 🇴🇲',
      treatment: 'CABG (Off-Pump Bypass)',
      stage: 'PROPOSAL_READY',
      priority: 'HIGH',
      coordinator: 'Sarah Fernandes',
      hospital: 'Medanta - The Medicity',
      doctor: 'Dr. Naresh Trehan',
      estimatedValue: '$8,300',
      visaStatus: 'VIL Generated',
      travelStatus: 'Planned (16 Oct)',
      nextAction: 'Awaiting Patient Proposal Consent',
      slaStatus: 'ON_TIME',
      slaHoursLeft: '18h SLA',
      lastUpdated: '2 hours ago'
    },
    {
      id: 'GHT-2026-KEN-0102',
      patient: 'Grace Mwangi',
      country: 'Kenya 🇰🇪',
      treatment: 'Bilateral Robotic Knee Replacement',
      stage: 'VISA_PROCESSING',
      priority: 'MEDIUM',
      coordinator: 'Amit Patel',
      hospital: 'Max Super Speciality, Saket',
      doctor: 'Dr. Arun Sethi',
      estimatedValue: '$7,200',
      visaStatus: 'Under Embassy Review',
      travelStatus: 'Pending Visa',
      nextAction: 'Track Indian High Commission Nairobi',
      slaStatus: 'ON_TIME',
      slaHoursLeft: '24h SLA',
      lastUpdated: '4 hours ago'
    },
    {
      id: 'GHT-2026-NGA-0103',
      patient: 'Chinedu Okafor',
      country: 'Nigeria 🇳🇬',
      treatment: 'Allogeneic BMT (Leukemia)',
      stage: 'MEDICAL_REVIEW',
      priority: 'URGENT',
      coordinator: 'Sarah Fernandes',
      hospital: 'Fortis Memorial (FMRI)',
      doctor: 'Dr. Vinod Raina',
      estimatedValue: '$26,000',
      visaStatus: 'Not Applied',
      travelStatus: 'Unscheduled',
      nextAction: 'Review HLA Donor Typing Scan',
      slaStatus: 'WARNING',
      slaHoursLeft: '3h SLA Left',
      lastUpdated: '30 mins ago'
    },
    {
      id: 'GHT-2026-BGD-0104',
      patient: 'Rahim Chowdhury',
      country: 'Bangladesh 🇧🇩',
      treatment: 'Living Donor Liver Transplant',
      stage: 'ARRIVED_IN_INDIA',
      priority: 'HIGH',
      coordinator: 'Rohan Sen',
      hospital: 'Indraprastha Apollo, Delhi',
      doctor: 'Dr. Vivek Gupta',
      estimatedValue: '$29,500',
      visaStatus: 'Triple Entry MED Verified',
      travelStatus: 'Arrived (DEL T3)',
      nextAction: 'Pre-Admission Workup & BAC Evaluation',
      slaStatus: 'ON_TIME',
      slaHoursLeft: 'Active Inpatient',
      lastUpdated: '10 mins ago'
    }
  ];

  // Tasks Dataset
  const tasks = [
    { task: 'Submit VIL Letter to Indian Embassy Muscat for Ali Al-Balushi', owner: 'Sarah Fernandes', dueDate: 'Today, 5:00 PM', priority: 'HIGH', status: 'IN_PROGRESS', caseId: 'GHT-2026-OMN-0101' },
    { task: 'Upload HLA matched donor reports for Chinedu Okafor', owner: 'Dr. Anand (Reviewer)', dueDate: 'Today, 3:00 PM', priority: 'URGENT', status: 'OVERDUE', caseId: 'GHT-2026-NGA-0103' },
    { task: 'Confirm Airport Wheelchair Reception for Grace Mwangi', owner: 'Logistics Desk', dueDate: 'Tomorrow, 10:00 AM', priority: 'MEDIUM', status: 'PENDING', caseId: 'GHT-2026-KEN-0102' }
  ];

  const filteredCases = cases.filter((c) => {
    const matchesStage = selectedStage === 'ALL' || c.stage === selectedStage;
    const matchesPriority = selectedPriority === 'ALL' || c.priority === selectedPriority;
    const matchesSearch = c.patient.toLowerCase().includes(searchQuery.toLowerCase()) || c.id.toLowerCase().includes(searchQuery.toLowerCase()) || c.treatment.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStage && matchesPriority && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      <Header />

      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Top Title & Alert Bar */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                  Operations & Care Coordination Command Center
                </h1>
                <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">
                  Live Dispatch
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Headquarters: New Delhi, India • Monitoring active patient journeys across GCC, Africa & South Asia.
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <Link
                href="/start-journey"
                className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold rounded-xl shadow transition flex items-center"
              >
                <Plus className="w-3.5 h-3.5 mr-1" /> New Patient Case
              </Link>
            </div>
          </div>

          {/* 14 Operational KPI Grid */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Journey Stage Pipeline (14 Vital KPIs)
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
              {kpis.map((kpi, idx) => (
                <div 
                  key={idx} 
                  className={`p-3.5 rounded-xl border bg-white shadow-xs flex flex-col justify-between space-y-1 ${kpi.color}`}
                >
                  <span className="text-[11px] font-semibold text-slate-600 leading-tight block truncate">{kpi.label}</span>
                  <span className="text-2xl font-black">{kpi.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Filters & Search Toolbar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search patient, Case ID, or condition..."
                className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              <select
                value={selectedStage}
                onChange={(e) => setSelectedStage(e.target.value)}
                className="px-3 py-2 text-xs font-semibold rounded-xl border border-slate-300 bg-slate-50 text-slate-700"
              >
                <option value="ALL">All Stages</option>
                <option value="MEDICAL_REVIEW">Medical Review</option>
                <option value="PROPOSAL_READY">Proposal Ready</option>
                <option value="VISA_PROCESSING">Visa Processing</option>
                <option value="ARRIVED_IN_INDIA">Arrived in India</option>
              </select>

              <select
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                className="px-3 py-2 text-xs font-semibold rounded-xl border border-slate-300 bg-slate-50 text-slate-700"
              >
                <option value="ALL">All Priorities</option>
                <option value="URGENT">Urgent / Critical</option>
                <option value="HIGH">High Priority</option>
                <option value="MEDIUM">Medium Priority</option>
              </select>
            </div>
          </div>

          {/* 14-Column Master Case Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50/70">
              <h3 className="font-bold text-sm text-slate-900">Active Patient Journey Workflows</h3>
              <span className="text-xs text-slate-500 font-medium">Showing {filteredCases.length} prioritized cases</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="py-3.5 px-4">Case ID</th>
                    <th className="py-3.5 px-4">Patient & Country</th>
                    <th className="py-3.5 px-4">Treatment</th>
                    <th className="py-3.5 px-4">Stage</th>
                    <th className="py-3.5 px-4">Priority</th>
                    <th className="py-3.5 px-4">Coordinator</th>
                    <th className="py-3.5 px-4">Hospital & Doctor</th>
                    <th className="py-3.5 px-4">Est. Value</th>
                    <th className="py-3.5 px-4">Visa</th>
                    <th className="py-3.5 px-4">Travel</th>
                    <th className="py-3.5 px-4">SLA / Next Action</th>
                    <th className="py-3.5 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredCases.map((c) => (
                    <tr key={c.id} className="hover:bg-slate-50/80 transition">
                      <td className="py-3.5 px-4 font-mono font-bold text-sky-700">{c.id}</td>
                      <td className="py-3.5 px-4">
                        <strong className="text-slate-900 block">{c.patient}</strong>
                        <span className="text-slate-500 text-[11px]">{c.country}</span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-700 font-medium">{c.treatment}</td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 bg-sky-100 text-sky-800 rounded font-bold text-[10px]">
                          {c.stage}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                          c.priority === 'URGENT' ? 'bg-rose-100 text-rose-800 animate-pulse' :
                          c.priority === 'HIGH' ? 'bg-amber-100 text-amber-800' :
                          'bg-slate-100 text-slate-700'
                        }`}>
                          {c.priority}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-700">{c.coordinator}</td>
                      <td className="py-3.5 px-4">
                        <span className="text-slate-900 font-medium block truncate max-w-[140px]">{c.hospital}</span>
                        <span className="text-slate-500 text-[11px]">{c.doctor}</span>
                      </td>
                      <td className="py-3.5 px-4 font-extrabold text-slate-900">{c.estimatedValue}</td>
                      <td className="py-3.5 px-4 text-slate-600">{c.visaStatus}</td>
                      <td className="py-3.5 px-4 text-slate-600">{c.travelStatus}</td>
                      <td className="py-3.5 px-4">
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded block w-fit mb-1 ${
                          c.slaStatus === 'WARNING' ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {c.slaHoursLeft}
                        </span>
                        <span className="text-slate-500 text-[11px] block truncate max-w-[160px]">{c.nextAction}</span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <Link
                          href={`/dashboard/cases/${c.id}`}
                          className="px-3 py-1.5 bg-slate-900 hover:bg-sky-600 text-white rounded-lg font-bold text-xs inline-flex items-center shadow-xs transition"
                        >
                          Workspace <ChevronRight className="w-3.5 h-3.5 ml-1" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Operational Task Center & Escalation Alerts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Task Management */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-sm text-slate-900">Coordinator Task Queue & SLA Timers</h3>
                <button className="text-xs text-sky-600 font-bold hover:underline">+ Add Task</button>
              </div>

              <div className="space-y-3">
                {tasks.map((t, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between text-xs">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                          t.status === 'OVERDUE' ? 'bg-rose-100 text-rose-800' :
                          t.status === 'IN_PROGRESS' ? 'bg-sky-100 text-sky-800' : 'bg-slate-200 text-slate-700'
                        }`}>
                          {t.status}
                        </span>
                        <span className="font-mono text-slate-500 text-[11px]">{t.caseId}</span>
                      </div>
                      <p className="font-bold text-slate-900">{t.task}</p>
                      <p className="text-slate-500 text-[11px]">Assigned to: <strong>{t.owner}</strong> • Due: {t.dueDate}</p>
                    </div>

                    <button className="px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 font-bold rounded-lg transition">
                      Mark Complete
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* SLA Escalation Matrix */}
            <div className="bg-amber-950 text-amber-100 rounded-2xl p-6 border border-amber-800 shadow-sm flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase mb-3">
                  <AlertTriangle className="w-4 h-4" />
                  <span>SLA Escalation Protocol</span>
                </div>
                <h4 className="text-white font-bold text-base mb-2">Automated Triggers Active</h4>
                <ul className="space-y-2 text-xs text-amber-200/90">
                  <li>• Clinical Review SLA: <strong>24 Hours</strong> (Escalates to Medical Director)</li>
                  <li>• Hospital Quotation SLA: <strong>48 Hours</strong> (Escalates to IPD Desk Head)</li>
                  <li>• Visa Invitation Letter (VIL): <strong>12 Hours</strong> from proposal acceptance</li>
                </ul>
              </div>

              <p className="text-[10px] text-amber-400/70 border-t border-amber-900 pt-3">
                Zero Unauthorized PHI Access: All staff interactions with medical scans and identity documents are immutably logged with IP & timestamp.
              </p>
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
