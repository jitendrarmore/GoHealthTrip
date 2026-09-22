'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  Clock, 
  CheckCircle2, 
  FileText, 
  Plane, 
  Building2, 
  ShieldCheck, 
  CreditCard, 
  MessageSquare, 
  Upload, 
  Download, 
  AlertTriangle,
  User,
  Send,
  Sparkles,
  Phone,
  Calendar,
  XCircle,
  Eye
} from 'lucide-react';

export default function MyCaseDashboard() {
  const [activeTab, setActiveTab] = useState<'timeline' | 'documents' | 'proposal' | 'visa' | 'travel' | 'messages'>('timeline');
  const [proposalAccepted, setProposalAccepted] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { sender: 'COORDINATOR', text: 'Hello Mr. Ali, I am Sarah Fernandes, your dedicated Care Coordinator for your CABG journey in India. Dr. Naresh Trehan has reviewed your angiogram reports and approved your surgical pathway.', time: '10:30 AM' },
    { sender: 'PATIENT', text: 'Thank you Sarah. Can you confirm if my wife Fatima is included in the hospital companion room and visa invitation letter?', time: '11:15 AM' },
    { sender: 'COORDINATOR', text: 'Yes! The Hospital VIL letter includes Fatima as your Medical Attendant (MED-X visa). She will stay in your private deluxe room at Medanta at no extra lodging cost.', time: '11:40 AM' },
  ]);

  const caseInfo = {
    caseNumber: 'GHT-2026-OMN-0101',
    patient: 'Ali Al-Balushi',
    country: 'Oman 🇴🇲',
    stage: 'PROPOSAL_READY',
    priority: 'HIGH',
    coordinator: 'Sarah Fernandes (GCC Desk)',
    hospital: 'Medanta - The Medicity, Gurugram (JCI, NABH)',
    doctor: 'Dr. Naresh Trehan (Chairman & Chief Cardiac Surgeon)',
    procedure: 'Off-Pump Coronary Artery Bypass Grafting (CABG)',
  };

  const timelineSteps = [
    { name: '1. Identity & KYC Verification', status: 'DONE', detail: 'Passport verified via Veriff' },
    { name: '2. Medical Records Upload & AI Extraction', status: 'DONE', detail: 'Angiography & lab reports scanned' },
    { name: '3. Clinical Review by Indian Specialist', status: 'DONE', detail: 'Evaluated by Dr. Naresh Trehan' },
    { name: '4. Hospital Matching & Formal Quotation', status: 'DONE', detail: 'Medanta quotation generated' },
    { name: '5. Treatment Proposal & Patient Consent', status: 'ACTIVE', detail: 'Awaiting your review and approval below' },
    { name: '6. Platform Payment & Treatment Advance', status: 'PENDING', detail: 'Unlocks upon proposal acceptance' },
    { name: '7. Medical Visa (e-Med) & Invitation Letter', status: 'PENDING', detail: 'Hospital VIL letter ready' },
    { name: '8. Flight, Hotel & Transit Coordination', status: 'PENDING', detail: 'Itinerary planned' },
    { name: '9. India Arrival & Dedicated Airport Pickup', status: 'PENDING', detail: 'Target: 16 Oct 2026' },
    { name: '10. Hospital Inpatient Admission', status: 'PENDING', detail: 'Deluxe Room & Pre-Op tests' },
    { name: '11. Surgical Procedure & Inpatient Care', status: 'PENDING', detail: 'Off-pump CABG revascularization' },
    { name: '12. Discharge & Hotel Recovery', status: 'PENDING', detail: '7-day post-op recovery suite' },
    { name: '13. Safe Return & Follow-Up Teleconsultation', status: 'PENDING', detail: 'Remote video review from Oman' },
  ];

  const documents = [
    {
      id: '1',
      name: 'Coronary_Angiography_Muscat_Aug2026.pdf',
      category: 'DIAGNOSTIC_REPORT',
      size: '2.4 MB',
      date: '24 Aug 2026',
      status: 'VERIFIED_CLEAN',
      aiExtracted: {
        diagnosis: 'Severe Triple Vessel CAD (90% LAD, 85% RCA, 70% LCx)',
        findings: 'Preserved LVEF 52%. Normal renal markers.',
        recommendation: 'Surgical myocardial revascularization (CABG) advised.',
        missing: '2D Echocardiogram detailed report'
      }
    },
    {
      id: '2',
      name: 'Passport_Bio_Page_Ali_AlBalushi.pdf',
      category: 'PASSPORT_COPY',
      size: '1.2 MB',
      date: '22 Aug 2026',
      status: 'VERIFIED_CLEAN',
      aiExtracted: null
    },
    {
      id: '3',
      name: 'Medanta_Hospital_Visa_Invitation_Letter_VIL.pdf',
      category: 'VISA_DOCUMENT',
      size: '890 KB',
      date: '28 Aug 2026',
      status: 'ISSUED_BY_HOSPITAL',
      aiExtracted: null
    }
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;
    setChatMessages([...chatMessages, { sender: 'PATIENT', text: messageText, time: 'Just now' }]);
    setMessageText('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      <Header />

      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Top Banner */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <div className="flex items-center space-x-3">
                  <h1 className="text-2xl font-black text-slate-900">{caseInfo.caseNumber}</h1>
                  <span className="px-3 py-1 bg-sky-100 text-sky-800 text-xs font-bold rounded-full">
                    {caseInfo.stage}
                  </span>
                  <span className="px-3 py-1 bg-rose-100 text-rose-800 text-xs font-bold rounded-full">
                    {caseInfo.priority} Priority
                  </span>
                </div>
                <p className="text-sm text-slate-600 mt-1">
                  Patient: <strong className="text-slate-900">{caseInfo.patient}</strong> ({caseInfo.country}) | {caseInfo.procedure}
                </p>
              </div>

              <div className="flex items-center space-x-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div className="w-10 h-10 rounded-full bg-sky-600 text-white font-bold flex items-center justify-center">
                  SF
                </div>
                <div className="text-xs">
                  <span className="text-slate-400 block font-medium">Care Coordinator</span>
                  <strong className="text-slate-800">{caseInfo.coordinator}</strong>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex flex-wrap gap-2 pt-6 mt-6 border-t border-slate-200 text-xs font-bold">
              {[
                { id: 'timeline', name: 'Journey Timeline', icon: Clock },
                { id: 'documents', name: 'Medical Vault & AI Extraction', icon: FileText },
                { id: 'proposal', name: 'Treatment Proposal & Estimates', icon: CreditCard },
                { id: 'visa', name: 'Medical Visa (e-Med)', icon: ShieldCheck },
                { id: 'travel', name: 'Flights & Hotel Logistics', icon: Plane },
                { id: 'messages', name: 'Care Team Messaging', icon: MessageSquare },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-4 py-2.5 rounded-xl transition flex items-center space-x-2 ${
                      activeTab === tab.id
                        ? 'bg-sky-600 text-white shadow-sm'
                        : 'bg-slate-50 text-slate-700 hover:bg-slate-200/70 border border-slate-200'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* TAB 1: JOURNEY TIMELINE */}
          {activeTab === 'timeline' && (
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
              <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center">
                <Clock className="w-5 h-5 text-sky-600 mr-2" />
                13-Milestone Coordinated Patient Journey
              </h2>

              <div className="space-y-4">
                {timelineSteps.map((st, i) => (
                  <div 
                    key={i} 
                    className={`flex items-start justify-between p-4 rounded-xl border transition ${
                      st.status === 'DONE' ? 'bg-slate-50/50 border-emerald-200' :
                      st.status === 'ACTIVE' ? 'bg-sky-50/60 border-sky-400 ring-2 ring-sky-500/20' :
                      'bg-slate-50/30 border-slate-200 opacity-60'
                    }`}
                  >
                    <div className="flex items-start space-x-3.5">
                      {st.status === 'DONE' ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      ) : st.status === 'ACTIVE' ? (
                        <div className="w-5 h-5 rounded-full border-2 border-sky-600 border-t-transparent animate-spin shrink-0 mt-0.5" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-slate-300 shrink-0 mt-0.5" />
                      )}
                      <div>
                        <h4 className={`text-sm font-bold ${st.status === 'ACTIVE' ? 'text-sky-900' : 'text-slate-800'}`}>
                          {st.name}
                        </h4>
                        <p className="text-xs text-slate-500 mt-0.5">{st.detail}</p>
                      </div>
                    </div>

                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase ${
                      st.status === 'DONE' ? 'bg-emerald-100 text-emerald-800' :
                      st.status === 'ACTIVE' ? 'bg-sky-600 text-white' :
                      'bg-slate-200 text-slate-600'
                    }`}>
                      {st.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: MEDICAL DOCUMENTS & AI EXTRACTION */}
          {activeTab === 'documents' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Vault List */}
              <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">Encrypted Medical Vault</h2>
                    <p className="text-xs text-slate-500">Stored with AES-256 KMS envelope encryption</p>
                  </div>
                  <button className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold rounded-xl shadow transition flex items-center">
                    <Upload className="w-3.5 h-3.5 mr-1.5" /> Upload New File
                  </button>
                </div>

                <div className="space-y-4">
                  {documents.map((doc) => (
                    <div key={doc.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start space-x-3">
                          <FileText className="w-6 h-6 text-sky-600 shrink-0 mt-1" />
                          <div>
                            <h4 className="text-sm font-bold text-slate-900">{doc.name}</h4>
                            <p className="text-xs text-slate-500">Uploaded {doc.date} • {doc.size} • Category: {doc.category}</p>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded">
                          {doc.status}
                        </span>
                      </div>

                      <div className="flex justify-end space-x-2 pt-2 border-t border-slate-200/60">
                        <button className="px-3 py-1 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition flex items-center">
                          <Eye className="w-3 h-3 mr-1" /> Preview
                        </button>
                        <button className="px-3 py-1 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition flex items-center">
                          <Download className="w-3 h-3 mr-1" /> Download
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Clinical Summary Panel */}
              <div className="bg-sky-950 text-white rounded-2xl p-6 shadow-sm flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1.5 text-xs font-bold uppercase text-sky-300">
                      <Sparkles className="w-4 h-4 text-sky-400" />
                      <span>AI Clinical Extraction</span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 bg-sky-800 text-sky-200 rounded font-bold">
                      Confidence 94%
                    </span>
                  </div>

                  <div className="p-4 bg-sky-900/60 rounded-xl border border-sky-800/80 space-y-2 text-xs">
                    <span className="font-bold text-sky-300 block">Extracted Diagnosis:</span>
                    <p className="text-sky-100">Triple Vessel CAD with 90% LAD, 85% RCA, 70% LCx Stenosis.</p>
                  </div>

                  <div className="p-4 bg-sky-900/60 rounded-xl border border-sky-800/80 space-y-2 text-xs">
                    <span className="font-bold text-sky-300 block">Clinical Recommendation:</span>
                    <p className="text-sky-100">Off-Pump Coronary Artery Bypass Grafting (CABG) with 3 arterial/venous grafts.</p>
                  </div>

                  <div className="p-4 bg-amber-950/60 rounded-xl border border-amber-800/60 space-y-1.5 text-xs">
                    <span className="font-bold text-amber-300 block">Identified Missing Records:</span>
                    <p className="text-amber-100">• 2D Echocardiogram Scan Report</p>
                    <p className="text-amber-100">• Pre-op Renal Function & HbA1c</p>
                  </div>
                </div>

                <p className="text-[10px] text-sky-400/70 border-t border-sky-800/60 pt-4">
                  * Clinical extraction is an administrative summary tool verified by Dr. Naresh Trehan. Not an autonomous medical diagnosis.
                </p>
              </div>

            </div>
          )}

          {/* TAB 3: PROPOSALS & ESTIMATES */}
          {activeTab === 'proposal' && (
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-6">
                <div>
                  <h2 className="text-xl font-black text-slate-900">Treatment Proposal — Version 1.0</h2>
                  <p className="text-xs text-slate-500">Issued by Medanta - The Medicity & Care Coordination Desk</p>
                </div>
                <div className="text-left sm:text-right">
                  <span className="text-xs text-slate-500 block">Total Coordinated Investment</span>
                  <span className="text-3xl font-black text-slate-900">$8,300 USD</span>
                </div>
              </div>

              {/* Breakdown Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                
                <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                  <span className="font-bold text-slate-500 uppercase text-[10px] block">1. Hospital Medical Quotation</span>
                  <p className="text-2xl font-black text-slate-900">$7,100</p>
                  <ul className="space-y-1 text-slate-600 text-[11px] pt-2 border-t border-slate-200">
                    <li>✓ Surgeon & Anesthetist Fees</li>
                    <li>✓ 2 Post-Op Cardiac ICU Days</li>
                    <li>✓ 5 Private Deluxe Room Days</li>
                    <li>✓ Pre-op Blood & Diagnostic Work</li>
                  </ul>
                </div>

                <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                  <span className="font-bold text-slate-500 uppercase text-[10px] block">2. Accommodation & Transit</span>
                  <p className="text-2xl font-black text-slate-900">$950</p>
                  <ul className="space-y-1 text-slate-600 text-[11px] pt-2 border-t border-slate-200">
                    <li>✓ 7 Days Partner Hotel (Courtyard Marriott)</li>
                    <li>✓ Attendant Lodging Included</li>
                    <li>✓ Airport Reception in Dedicated AC Car</li>
                    <li>✓ Daily Hospital Shuttle</li>
                  </ul>
                </div>

                <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                  <span className="font-bold text-slate-500 uppercase text-[10px] block">3. Care Facilitation & Follow-Up</span>
                  <p className="text-2xl font-black text-slate-900">$250</p>
                  <ul className="space-y-1 text-slate-600 text-[11px] pt-2 border-t border-slate-200">
                    <li>✓ Dedicated Care Coordinator in India</li>
                    <li>✓ Medical Visa Invitation Letter (VIL)</li>
                    <li>✓ SIM Card & Currency Exchange Assistance</li>
                    <li>✓ 1 Remote Tele-Consultation After Return</li>
                  </ul>
                </div>

              </div>

              {/* Inclusions & Exclusions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-4">
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                  <span className="font-bold text-emerald-900 block mb-2">Package Inclusions:</span>
                  <ul className="space-y-1 text-emerald-800">
                    <li>• All surgical consumables for off-pump bypass</li>
                    <li>• Daily attending surgeon rounds and resident care</li>
                    <li>• Free companion accommodation in patient room</li>
                  </ul>
                </div>

                <div className="p-4 bg-rose-50 rounded-xl border border-rose-200">
                  <span className="font-bold text-rose-900 block mb-2">Package Exclusions:</span>
                  <ul className="space-y-1 text-rose-800">
                    <li>• Extended hospital stay beyond 7 days</li>
                    <li>• Specialized blood products or dialysis if unforeseen</li>
                    <li>• International flight airfare</li>
                  </ul>
                </div>
              </div>

              {/* Consent & Acceptance */}
              <div className="p-5 bg-sky-50 rounded-xl border border-sky-200 space-y-4">
                <div className="flex items-start space-x-3">
                  <ShieldCheck className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-sky-900 leading-relaxed">
                    By accepting this proposal, you agree to the stated package inclusions and authorized hospital clinical pathway. No payment is charged until visa clearance is initiated.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  {proposalAccepted ? (
                    <div className="w-full py-3 bg-emerald-600 text-white font-bold rounded-xl text-center text-sm shadow flex items-center justify-center space-x-2">
                      <CheckCircle2 className="w-5 h-5" />
                      <span>Proposal Accepted! Moving to Visa Coordination...</span>
                    </div>
                  ) : (
                    <>
                      <button
                        onClick={() => setProposalAccepted(true)}
                        className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl shadow transition text-center"
                      >
                        Accept Proposal & Authorize Journey
                      </button>
                      <button
                        onClick={() => setActiveTab('messages')}
                        className="px-6 py-3 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-sm font-semibold rounded-xl transition"
                      >
                        Request Revision / Clarification
                      </button>
                    </>
                  )}
                </div>
              </div>

            </div>
          )}

          {/* TAB 4: VISA */}
          {activeTab === 'visa' && (
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Indian Medical Visa (e-Med & MED-X)</h2>
                  <p className="text-xs text-slate-500">Government of India e-Visa Portal Integration</p>
                </div>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">
                  VIL Letter Ready
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <span className="font-bold text-slate-700 uppercase">Primary Applicant:</span>
                  <p className="text-sm font-bold text-slate-900">Ali Al-Balushi (Patient)</p>
                  <p className="text-slate-500">Visa Type: Indian e-Medical Visa (Triple Entry, 60 Days)</p>
                  <p className="text-slate-500">Hospital VIL: Medanta_VIL_Ali_AlBalushi.pdf</p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <span className="font-bold text-slate-700 uppercase">Medical Attendant (MED-X):</span>
                  <p className="text-sm font-bold text-slate-900">Fatima Al-Balushi (Spouse)</p>
                  <p className="text-slate-500">Visa Type: Indian e-Medical Attendant Visa (MED-X)</p>
                  <p className="text-slate-500">Status: Included in Hospital Invitation Dossier</p>
                </div>
              </div>

              <div className="p-4 bg-sky-50 rounded-xl border border-sky-200 flex justify-between items-center text-xs">
                <div>
                  <h4 className="font-bold text-sky-900">Download Official Hospital Invitation Letter (VIL)</h4>
                  <p className="text-sky-700">Required for submission on indianvisaonline.gov.in</p>
                </div>
                <button className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-lg shadow transition flex items-center">
                  <Download className="w-3.5 h-3.5 mr-1.5" /> Download VIL PDF
                </button>
              </div>
            </div>
          )}

          {/* TAB 5: TRAVEL & LOGISTICS */}
          {activeTab === 'travel' && (
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
              <h2 className="text-lg font-bold text-slate-900">Travel & Destination Itinerary</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
                
                <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex items-center space-x-2 font-bold text-slate-700 uppercase">
                    <Plane className="w-4 h-4 text-sky-600" />
                    <span>Flight Schedule</span>
                  </div>
                  <p className="text-sm font-bold text-slate-900">Oman Air (WY-241)</p>
                  <p className="text-slate-500">Muscat (MCT) → New Delhi (DEL T3)</p>
                  <p className="text-slate-500">Arrival: 16 Oct 2026, 14:30 IST</p>
                </div>

                <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex items-center space-x-2 font-bold text-slate-700 uppercase">
                    <Building2 className="w-4 h-4 text-sky-600" />
                    <span>Partner Recovery Hotel</span>
                  </div>
                  <p className="text-sm font-bold text-slate-900">Courtyard by Marriott</p>
                  <p className="text-slate-500">Gurugram Downtown (1.8 km to Medanta)</p>
                  <p className="text-slate-500">Booking Ref: HTL-GUR-2026-892</p>
                </div>

                <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex items-center space-x-2 font-bold text-slate-700 uppercase">
                    <ShieldCheck className="w-4 h-4 text-sky-600" />
                    <span>Airport Transfer Driver</span>
                  </div>
                  <p className="text-sm font-bold text-slate-900">Rajesh Kumar [DEMO]</p>
                  <p className="text-slate-500">Vehicle: DL 1Z A 4488 (Sanitized AC Car)</p>
                  <p className="text-emerald-600 font-bold">Contact: +91 98765 43210</p>
                </div>

              </div>
            </div>
          )}

          {/* TAB 6: MESSAGES */}
          {activeTab === 'messages' && (
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
              <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Direct Care Team Messaging</h2>
                  <p className="text-xs text-slate-500">Encrypted communication with Sarah Fernandes (Care Coordinator)</p>
                </div>
                <div className="flex items-center space-x-1.5 text-xs text-emerald-600 font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Online & Active</span>
                </div>
              </div>

              {/* Chat Thread */}
              <div className="space-y-4 max-h-96 overflow-y-auto p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                {chatMessages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.sender === 'PATIENT' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-md p-3.5 rounded-2xl space-y-1 ${
                        msg.sender === 'PATIENT'
                          ? 'bg-sky-600 text-white rounded-br-none'
                          : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none shadow-sm'
                      }`}
                    >
                      <p className="leading-relaxed">{msg.text}</p>
                      <span className={`text-[9px] block text-right ${msg.sender === 'PATIENT' ? 'text-sky-200' : 'text-slate-400'}`}>
                        {msg.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <input
                  type="text"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Type your question for the care coordination desk..."
                  className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold rounded-xl shadow transition flex items-center"
                >
                  <Send className="w-3.5 h-3.5 mr-1.5" /> Send
                </button>
              </form>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
