'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import {
  CheckCircle2, ArrowRight, ArrowLeft, Upload, ShieldCheck,
  FileText, Building2, AlertCircle, Sparkles, Globe2,
  BadgeCheck, Lock, Users, Clock3,
} from 'lucide-react';
import Link from 'next/link';

const stepMeta = [
  { label: 'Country & Nationality',           icon: Globe2,       img: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&q=70' },
  { label: 'Identity & Contact',              icon: BadgeCheck,   img: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=70' },
  { label: 'Medical Condition',               icon: Sparkles,     img: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&q=70' },
  { label: 'Medical Records & Reports',       icon: FileText,     img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=70' },
  { label: 'Treatment Requested',             icon: ShieldCheck,  img: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=600&q=70' },
  { label: 'Preferred Destination in India',  icon: Building2,    img: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=600&q=70' },
  { label: 'Budget & Travel Timeframe',       icon: Clock3,       img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=70' },
  { label: 'Review & Submit Case',            icon: CheckCircle2, img: 'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=600&q=70' },
];

const countries = [
  { name: 'Oman',                flag: '🇴🇲', code: 'OMN' },
  { name: 'United Arab Emirates',flag: '🇦🇪', code: 'ARE' },
  { name: 'Kenya',               flag: '🇰🇪', code: 'KEN' },
  { name: 'Nigeria',             flag: '🇳🇬', code: 'NGA' },
  { name: 'Bangladesh',          flag: '🇧🇩', code: 'BGD' },
  { name: 'Uzbekistan',          flag: '🇺🇿', code: 'UZB' },
  { name: 'United Kingdom',      flag: '🇬🇧', code: 'GBR' },
  { name: 'United States',       flag: '🇺🇸', code: 'USA' },
];

const locations = [
  'Delhi NCR (New Delhi / Gurugram)',
  'Mumbai (Maharashtra)',
  'Bengaluru (Karnataka)',
  'Chennai (Tamil Nadu)',
  'Hyderabad (Telangana)',
  'No Preference / Best Specialist Available',
];

export default function StartJourneyPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    nationality: 'Oman',
    residenceCountry: 'Oman',
    passportExpiry: '2030-05-20',
    firstName: 'Ali',
    lastName: 'Al-Balushi',
    email: 'ali.albalushi@demo.om',
    phone: '+968 9123 4567',
    primaryCondition: 'Triple Vessel Coronary Artery Disease',
    symptoms: 'Shortness of breath on walking, angina chest pain for 3 months',
    uploadedDocs: [
      { name: 'Coronary_Angiogram_Report_Muscat.pdf', category: 'DIAGNOSTIC_REPORT', size: '2.4 MB' },
      { name: 'Passport_Bio_Page_Ali.pdf', category: 'PASSPORT_COPY', size: '1.2 MB' },
    ],
    treatmentRequested: 'Coronary Artery Bypass Grafting (CABG)',
    preferredLocation: 'Delhi NCR (New Delhi / Gurugram)',
    budgetRange: '$5,000 - $8,000 USD',
    targetTravelDate: 'October 2026',
    needsAttendantVisa: true,
  });

  const progress = Math.round((currentStep / 8) * 100);
  const meta = stepMeta[currentStep - 1];
  const StepIcon = meta.icon;

  const handleNext = () => {
    if (currentStep < 8) setCurrentStep(currentStep + 1);
    else setIsSubmitted(true);
  };
  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const inputClass = 'w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-white transition';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-1 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">

          {/* Page header */}
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider mb-3">
              <Lock className="w-3.5 h-3.5" /> Secure International Patient Case Submission
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Begin Your Medical Journey to India
            </h1>
            <p className="text-sm text-slate-500 mt-1.5">
              Free to submit · Receive hospital proposals in 48 hours · DPDP 2023 compliant
            </p>
          </div>

          {/* Trust badges row */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {[
              { icon: ShieldCheck, label: 'AES-256 Encryption' },
              { icon: BadgeCheck,  label: 'DPDP 2023 Compliant' },
              { icon: Users,       label: 'Dedicated Coordinator' },
              { icon: Clock3,      label: '48h Response SLA' },
            ].map((b) => {
              const Icon = b.icon;
              return (
                <div key={b.label} className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-600 font-medium shadow-sm">
                  <Icon className="w-3.5 h-3.5 text-sky-500" />
                  {b.label}
                </div>
              );
            })}
          </div>

          {isSubmitted ? (
            /* ── Success Screen ─────────────────────────────── */
            <div className="bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden">
              <div className="relative h-48">
                <Image
                  src="https://images.unsplash.com/photo-1609220136736-443140cffec6?w=900&q=75"
                  alt="Happy recovery"
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/60 to-emerald-800/80" />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="w-16 h-16 bg-emerald-400 text-white rounded-full flex items-center justify-center shadow-xl mb-2">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h2 className="text-2xl font-extrabold text-white">Medical Case Initialized!</h2>
                </div>
              </div>

              <div className="p-8 text-center space-y-5">
                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 max-w-md mx-auto text-left text-sm space-y-3">
                  {[
                    ['Case Number', 'GHT-2026-OMN-0101', 'font-mono text-slate-900'],
                    ['Assigned Coordinator', 'Sarah Fernandes (GCC Desk)', 'text-slate-900'],
                    ['Clinical Review SLA', 'Under Evaluation (12–24h)', 'text-sky-600'],
                  ].map(([k, v, vClass]) => (
                    <div key={k as string} className="flex justify-between items-center">
                      <span className="text-slate-500">{k as string}:</span>
                      <strong className={`font-semibold ${vClass as string}`}>{v as string}</strong>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Our clinical review team in New Delhi has received your reports. We are preparing structured quotes from accredited partner hospitals.
                </p>
                <Link href="/my-case"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-bold rounded-xl shadow-lg hover:scale-105 transition-all text-sm">
                  Open My Case Dashboard <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ) : (
            /* ── Wizard Layout ──────────────────────────────── */
            <div className="grid lg:grid-cols-5 gap-6">

              {/* Left sidebar — step image + step list */}
              <div className="lg:col-span-2 space-y-4">
                {/* Step illustration */}
                <div className="relative h-56 lg:h-72 rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src={meta.img}
                    alt={meta.label}
                    fill
                    className="object-cover transition-all duration-500"
                    sizes="(max-width:1024px) 100vw,40vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-7 h-7 rounded-lg bg-sky-500 flex items-center justify-center">
                        <StepIcon className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-xs font-bold text-sky-300 uppercase tracking-wider">Step {currentStep} of 8</span>
                    </div>
                    <p className="text-white font-bold text-sm">{meta.label}</p>
                  </div>
                </div>

                {/* Step checklist */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 space-y-2">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Your Progress</p>
                  {stepMeta.map((s, i) => {
                    const Icon = s.icon;
                    const stepNum = i + 1;
                    const done = stepNum < currentStep;
                    const active = stepNum === currentStep;
                    return (
                      <div key={i} className={`flex items-center gap-2.5 px-3 py-2 rounded-xl transition ${
                        active ? 'bg-sky-50 border border-sky-200' : done ? 'opacity-60' : 'opacity-40'
                      }`}>
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                          done ? 'bg-emerald-500' : active ? 'bg-sky-500' : 'bg-slate-200'
                        }`}>
                          {done ? <CheckCircle2 className="w-4 h-4 text-white" /> : <Icon className="w-3.5 h-3.5 text-white" />}
                        </div>
                        <span className={`text-xs font-medium ${active ? 'text-sky-700 font-bold' : done ? 'text-slate-500 line-through' : 'text-slate-400'}`}>
                          {s.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right — form card */}
              <div className="lg:col-span-3">
                {/* Progress bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-slate-500 mb-1.5">
                    <span className="font-semibold text-slate-700">Step {currentStep} of 8: {meta.label}</span>
                    <span>{progress}% complete</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-sky-500 to-indigo-600 h-full transition-all duration-500 ease-out rounded-full"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-100 space-y-6">

                  {/* STEP 1 */}
                  {currentStep === 1 && (
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">Select Your Country of Origin</h3>
                        <p className="text-xs text-slate-500 mt-1">This configures your Indian medical visa requirements and document checklist.</p>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {countries.map((c) => (
                          <button key={c.code} type="button"
                            onClick={() => setFormData({ ...formData, nationality: c.name, residenceCountry: c.name })}
                            className={`p-4 rounded-2xl border-2 text-center transition flex flex-col items-center gap-1.5 ${
                              formData.nationality === c.name
                                ? 'border-sky-500 bg-sky-50 shadow-md ring-2 ring-sky-500/20'
                                : 'border-slate-200 hover:border-slate-300 bg-white'
                            }`}>
                            <span className="text-3xl">{c.flag}</span>
                            <span className={`text-xs font-semibold ${formData.nationality === c.name ? 'text-sky-700' : 'text-slate-600'}`}>{c.name}</span>
                            {formData.nationality === c.name && <CheckCircle2 className="w-3.5 h-3.5 text-sky-500" />}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* STEP 2 */}
                  {currentStep === 2 && (
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">Patient Identity & Contact Information</h3>
                        <p className="text-xs text-slate-500 mt-1">Enter details exactly as they appear on your passport.</p>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                          { key: 'firstName', label: 'First Name (as on Passport)', type: 'text' },
                          { key: 'lastName', label: 'Last Name', type: 'text' },
                          { key: 'email', label: 'Email Address', type: 'email' },
                          { key: 'phone', label: 'WhatsApp / Phone Number', type: 'tel' },
                        ].map(({ key, label, type }) => (
                          <div key={key}>
                            <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">{label}</label>
                            <input
                              type={type}
                              value={(formData as unknown as Record<string, string>)[key]}
                              onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                              className={inputClass}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* STEP 3 */}
                  {currentStep === 3 && (
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">Describe Your Medical Condition</h3>
                        <p className="text-xs text-slate-500 mt-1">Be as detailed as possible to help our clinical team prepare accurately.</p>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Primary Diagnosis / Health Issue</label>
                        <input type="text" value={formData.primaryCondition}
                          onChange={(e) => setFormData({ ...formData, primaryCondition: e.target.value })}
                          placeholder="e.g. Severe Coronary Artery Disease, Knee Osteoarthritis"
                          className={inputClass} />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Current Symptoms & Duration</label>
                        <textarea rows={4} value={formData.symptoms}
                          onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
                          placeholder="Describe when symptoms began, medications tried, past surgeries..."
                          className={inputClass + ' resize-none'} />
                      </div>
                    </div>
                  )}

                  {/* STEP 4 */}
                  {currentStep === 4 && (
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">Upload Diagnostic Reports & Scans</h3>
                        <p className="text-xs text-slate-500 mt-1">PDF, JPG, PNG, DICOM · Max 25 MB per file · AES-256 encrypted at rest</p>
                      </div>
                      <div className="border-2 border-dashed border-slate-300 hover:border-sky-500 rounded-2xl p-8 text-center bg-slate-50 cursor-pointer transition group">
                        <div className="w-14 h-14 bg-sky-100 group-hover:bg-sky-200 rounded-2xl flex items-center justify-center mx-auto mb-3 transition">
                          <Upload className="w-7 h-7 text-sky-600" />
                        </div>
                        <p className="text-sm font-bold text-slate-800">Drag & drop your files here, or click to browse</p>
                        <p className="text-xs text-slate-400 mt-1">Upload angiography, MRI/CT scans, biopsy or discharge summaries</p>
                      </div>
                      <div className="space-y-2">
                        <span className="text-xs font-bold text-slate-700 uppercase">Attached Files</span>
                        {formData.uploadedDocs.map((doc, idx) => (
                          <div key={idx} className="flex items-center justify-between p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 text-xs">
                            <div className="flex items-center gap-2">
                              <FileText className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                              <span className="font-semibold text-slate-800">{doc.name}</span>
                              <span className="text-slate-400">({doc.size})</span>
                            </div>
                            <span className="flex items-center gap-1 px-2 py-0.5 bg-emerald-500 text-white rounded-full font-bold">
                              <CheckCircle2 className="w-3 h-3" /> Clean
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* STEP 5 */}
                  {currentStep === 5 && (
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">Treatment or Procedure Requested</h3>
                        <p className="text-xs text-slate-500 mt-1">Tell us what procedure you are seeking. Our panel will validate and may recommend alternatives.</p>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Procedure / Specialist Care</label>
                        <input type="text" value={formData.treatmentRequested}
                          onChange={(e) => setFormData({ ...formData, treatmentRequested: e.target.value })}
                          className={inputClass} />
                      </div>
                      <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
                        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <span>Our clinical review panel will evaluate whether this treatment is suitable and may suggest diagnostic updates before issuing a final hospital quotation.</span>
                      </div>
                    </div>
                  )}

                  {/* STEP 6 */}
                  {currentStep === 6 && (
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">Preferred Destination in India</h3>
                        <p className="text-xs text-slate-500 mt-1">We have accredited partner hospitals across India's major medical hubs.</p>
                      </div>
                      <div className="space-y-2">
                        {locations.map((loc) => (
                          <button key={loc} type="button"
                            onClick={() => setFormData({ ...formData, preferredLocation: loc })}
                            className={`w-full flex items-center justify-between p-4 rounded-xl border-2 text-left transition ${
                              formData.preferredLocation === loc
                                ? 'border-sky-500 bg-sky-50 text-sky-900 shadow-sm ring-2 ring-sky-500/20'
                                : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                            }`}>
                            <span className="text-sm font-medium">{loc}</span>
                            {formData.preferredLocation === loc && <CheckCircle2 className="w-4 h-4 text-sky-500 flex-shrink-0" />}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* STEP 7 */}
                  {currentStep === 7 && (
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">Budget Range & Target Travel Timeline</h3>
                        <p className="text-xs text-slate-500 mt-1">This helps us shortlist hospitals and treatment packages within your budget.</p>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Estimated Budget (USD)</label>
                          <select value={formData.budgetRange}
                            onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                            className={inputClass}>
                            <option>$3,000 - $5,000 USD</option>
                            <option>$5,000 - $8,000 USD</option>
                            <option>$8,000 - $15,000 USD</option>
                            <option>$15,000+ USD</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Intended Travel Date</label>
                          <input type="text" value={formData.targetTravelDate}
                            onChange={(e) => setFormData({ ...formData, targetTravelDate: e.target.value })}
                            placeholder="e.g. October 2026"
                            className={inputClass} />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 8 */}
                  {currentStep === 8 && (
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">Review & Authorize Medical Case Submission</h3>
                        <p className="text-xs text-slate-500 mt-1">Please review your information before submitting for clinical review.</p>
                      </div>
                      <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 text-sm">
                        {[
                          ['Patient', `${formData.firstName} ${formData.lastName} (${formData.nationality})`],
                          ['Condition', formData.primaryCondition],
                          ['Treatment', formData.treatmentRequested],
                          ['Destination', formData.preferredLocation],
                          ['Budget', formData.budgetRange],
                          ['Travel Date', formData.targetTravelDate],
                          ['Reports Attached', `${formData.uploadedDocs.length} files`],
                        ].map(([k, v]) => (
                          <div key={k} className="flex justify-between items-start">
                            <span className="text-slate-500 font-medium">{k}:</span>
                            <span className="text-slate-900 font-semibold text-right max-w-[60%]">{v}</span>
                          </div>
                        ))}
                      </div>
                      <div className="p-4 bg-sky-50 rounded-2xl border border-sky-200 text-xs text-sky-900 leading-relaxed flex items-start gap-2">
                        <ShieldCheck className="w-4 h-4 text-sky-600 flex-shrink-0 mt-0.5" />
                        By submitting, you consent to secure data transmission for medical review by authorized clinicians in India — in compliance with the Digital Personal Data Protection (DPDP) Act 2023.
                      </div>
                    </div>
                  )}

                  {/* Navigation */}
                  <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                    {currentStep > 1 ? (
                      <button type="button" onClick={handleBack}
                        className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition">
                        <ArrowLeft className="w-4 h-4" /> Back
                      </button>
                    ) : <div />}
                    <button type="button" onClick={handleNext}
                      className="flex items-center gap-1.5 px-7 py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white text-sm font-bold rounded-xl shadow-md hover:shadow-lg transition-all">
                      {currentStep === 8 ? 'Submit Case for Medical Review' : 'Continue'}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
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
