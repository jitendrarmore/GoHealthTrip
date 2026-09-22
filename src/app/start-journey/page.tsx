'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Upload, 
  ShieldCheck, 
  FileText, 
  Building2, 
  Clock, 
  AlertCircle,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';

export default function StartJourneyPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Country & Nationality
    nationality: 'Oman',
    residenceCountry: 'Oman',
    passportExpiry: '2030-05-20',
    // Step 2: Identity
    firstName: 'Ali',
    lastName: 'Al-Balushi',
    email: 'ali.albalushi@demo.om',
    phone: '+968 9123 4567',
    // Step 3: Medical Condition
    primaryCondition: 'Triple Vessel Coronary Artery Disease',
    symptoms: 'Shortness of breath on walking, angina chest pain for 3 months',
    // Step 4: Medical Documents
    uploadedDocs: [
      { name: 'Coronary_Angiogram_Report_Muscat.pdf', category: 'DIAGNOSTIC_REPORT', size: '2.4 MB' },
      { name: 'Passport_Bio_Page_Ali.pdf', category: 'PASSPORT_COPY', size: '1.2 MB' }
    ],
    // Step 5: Treatment Requested
    treatmentRequested: 'Coronary Artery Bypass Grafting (CABG)',
    // Step 6: Preferred Location
    preferredLocation: 'Delhi NCR (New Delhi / Gurugram)',
    // Step 7: Budget & Timeframe
    budgetRange: '$5,000 - $8,000 USD',
    targetTravelDate: 'October 2026',
    needsAttendantVisa: true,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const countries = [
    { name: 'Oman', flag: '🇴🇲', code: 'OMN' },
    { name: 'United Arab Emirates', flag: '🇦🇪', code: 'ARE' },
    { name: 'Kenya', flag: '🇰🇪', code: 'KEN' },
    { name: 'Nigeria', flag: '🇳🇬', code: 'NGA' },
    { name: 'Bangladesh', flag: '🇧🇩', code: 'BGD' },
    { name: 'Uzbekistan', flag: '🇺🇿', code: 'UZB' },
    { name: 'United Kingdom', flag: '🇬🇧', code: 'GBR' },
    { name: 'United States', flag: '🇺🇸', code: 'USA' },
  ];

  const locations = [
    'Delhi NCR (New Delhi / Gurugram)',
    'Mumbai (Maharashtra)',
    'Bengaluru (Karnataka)',
    'Chennai (Tamil Nadu)',
    'Hyderabad (Telangana)',
    'No Preference / Best Specialist Available'
  ];

  const handleNext = () => {
    if (currentStep < 8) setCurrentStep(currentStep + 1);
    else setIsSubmitted(true);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          
          {/* Progress Header */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4 text-sky-600" />
              <span>Secure International Patient Case Submission</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Begin Your Medical Journey to India
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Step {currentStep} of 8: {
                currentStep === 1 ? 'Country & Nationality' :
                currentStep === 2 ? 'Identity & Contact Verification' :
                currentStep === 3 ? 'Medical Condition & Symptoms' :
                currentStep === 4 ? 'Medical Records & Diagnostic Reports' :
                currentStep === 5 ? 'Requested Procedure or Specialty' :
                currentStep === 6 ? 'Preferred Destination in India' :
                currentStep === 7 ? 'Budget & Travel Timeframe' :
                'Review & Case Submission'
              }
            </p>

            {/* Stepper bar */}
            <div className="w-full bg-slate-200 h-2 rounded-full mt-6 overflow-hidden">
              <div 
                className="bg-sky-600 h-full transition-all duration-300 ease-out"
                style={{ width: `${(currentStep / 8) * 100}%` }}
              />
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-sm border border-slate-200">
            {isSubmitted ? (
              <div className="text-center py-8 space-y-6">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h2 className="text-2xl font-black text-slate-900">Medical Case Initialized!</h2>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 max-w-md mx-auto text-left text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Case Number:</span>
                    <strong className="text-slate-900 font-mono">GHT-2026-OMN-0101</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Assigned Care Coordinator:</span>
                    <strong className="text-slate-900">Sarah Fernandes (GCC Desk)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Initial Clinical Review:</span>
                    <span className="text-sky-600 font-semibold">Under Evaluation (12-24h SLA)</span>
                  </div>
                </div>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Our clinical review team in New Delhi has received your reports. We are preparing structured quotes from accredited partner hospitals.
                </p>
                <div className="flex justify-center gap-4 pt-4">
                  <Link
                    href="/my-case"
                    className="px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl shadow transition"
                  >
                    Open My Case Dashboard
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                
                {/* STEP 1: Country & Nationality */}
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-slate-900">Select Your Country of Origin</h3>
                    <p className="text-xs text-slate-500">This configures specific Indian medical visa requirements and document checklists.</p>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                      {countries.map((c) => (
                        <button
                          key={c.code}
                          type="button"
                          onClick={() => setFormData({ ...formData, nationality: c.name, residenceCountry: c.name })}
                          className={`p-4 rounded-xl border text-center transition flex flex-col items-center space-y-1 ${
                            formData.nationality === c.name 
                              ? 'border-sky-600 bg-sky-50 text-sky-900 font-bold ring-2 ring-sky-600/20' 
                              : 'border-slate-200 hover:border-slate-300 text-slate-700'
                          }`}
                        >
                          <span className="text-2xl">{c.flag}</span>
                          <span className="text-xs">{c.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 2: Identity & Contact */}
                {currentStep === 2 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-slate-900">Patient Identity & Contact Information</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">First Name (As on Passport)</label>
                        <input
                          type="text"
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Last Name</label>
                        <input
                          type="text"
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email Address</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">WhatsApp / Phone Number</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 3: Medical Condition */}
                {currentStep === 3 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-slate-900">Describe Your Medical Condition</h3>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Primary Diagnosis / Health Issue</label>
                      <input
                        type="text"
                        value={formData.primaryCondition}
                        onChange={(e) => setFormData({ ...formData, primaryCondition: e.target.value })}
                        placeholder="e.g. Severe Coronary Artery Disease, Knee Osteoarthritis, Breast Lump"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Current Symptoms & Duration</label>
                      <textarea
                        rows={3}
                        value={formData.symptoms}
                        onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
                        placeholder="Please describe when symptoms began, medications tried, or past surgeries..."
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                    </div>
                  </div>
                )}

                {/* STEP 4: Medical Documents */}
                {currentStep === 4 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-slate-900">Upload Diagnostic Reports & Scans</h3>
                    <p className="text-xs text-slate-500">Supported formats: PDF, JPG, PNG, DICOM (Max 25MB per file). All files are encrypted at rest with AES-256.</p>

                    <div className="border-2 border-dashed border-slate-300 hover:border-sky-500 rounded-2xl p-6 text-center bg-slate-50/50 cursor-pointer transition">
                      <Upload className="w-8 h-8 text-sky-600 mx-auto mb-2" />
                      <p className="text-sm font-semibold text-slate-800">Drag & drop your files here, or browse</p>
                      <p className="text-xs text-slate-400 mt-1">Upload Angiography, MRI/CT scans, biopsy or discharge summaries</p>
                    </div>

                    <div className="space-y-2">
                      <span className="text-xs font-bold text-slate-700 uppercase">Attached Files:</span>
                      {formData.uploadedDocs.map((doc, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                          <div className="flex items-center space-x-2">
                            <FileText className="w-4 h-4 text-sky-600" />
                            <span className="font-semibold text-slate-800">{doc.name}</span>
                            <span className="text-slate-400">({doc.size})</span>
                          </div>
                          <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-bold">
                            Scanned Clean
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 5: Treatment Requested */}
                {currentStep === 5 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-slate-900">Treatment or Procedure Requested</h3>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Procedure / Specialist Care</label>
                      <input
                        type="text"
                        value={formData.treatmentRequested}
                        onChange={(e) => setFormData({ ...formData, treatmentRequested: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                    </div>
                    <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start space-x-2">
                      <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>
                        Our clinical review panel in India will evaluate whether this treatment is suitable or suggest diagnostic updates before issuing a final hospital quotation.
                      </span>
                    </div>
                  </div>
                )}

                {/* STEP 6: Preferred Location in India */}
                {currentStep === 6 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-slate-900">Preferred Destination in India</h3>
                    <div className="space-y-2">
                      {locations.map((loc) => (
                        <label
                          key={loc}
                          onClick={() => setFormData({ ...formData, preferredLocation: loc })}
                          className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition ${
                            formData.preferredLocation === loc
                              ? 'border-sky-600 bg-sky-50/50 text-sky-900 font-bold ring-1 ring-sky-600'
                              : 'border-slate-200 hover:border-slate-300 text-slate-700'
                          }`}
                        >
                          <span className="text-sm">{loc}</span>
                          <Building2 className="w-4 h-4 text-slate-400" />
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 7: Budget & Travel Timeframe */}
                {currentStep === 7 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-slate-900">Budget Range & Target Travel Timeline</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Estimated Budget (USD)</label>
                        <select
                          value={formData.budgetRange}
                          onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                        >
                          <option>$3,000 - $5,000 USD</option>
                          <option>$5,000 - $8,000 USD</option>
                          <option>$8,000 - $15,000 USD</option>
                          <option>$15,000+ USD</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Intended Travel Date</label>
                        <input
                          type="text"
                          value={formData.targetTravelDate}
                          onChange={(e) => setFormData({ ...formData, targetTravelDate: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 8: Final Review */}
                {currentStep === 8 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-slate-900">Confirm & Authorize Medical Case Submission</h3>
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
                      <p><strong>Patient:</strong> {formData.firstName} {formData.lastName} ({formData.nationality})</p>
                      <p><strong>Condition:</strong> {formData.primaryCondition}</p>
                      <p><strong>Treatment:</strong> {formData.treatmentRequested}</p>
                      <p><strong>Destination:</strong> {formData.preferredLocation}</p>
                      <p><strong>Reports Attached:</strong> {formData.uploadedDocs.length} files</p>
                    </div>

                    <div className="p-3 bg-sky-50 rounded-xl border border-sky-200 text-xs text-sky-900 leading-relaxed">
                      By submitting this case, you consent to secure data transmission for medical review by authorized clinicians in India in accordance with the Digital Personal Data Protection (DPDP) Act 2023.
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center pt-6 border-t border-slate-200">
                  {currentStep > 1 ? (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="px-5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-700 hover:bg-slate-50 flex items-center"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1.5" /> Back
                    </button>
                  ) : <div />}

                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-6 py-2.5 bg-sky-600 hover:bg-sky-700 text-white text-sm font-bold rounded-xl shadow transition flex items-center"
                  >
                    {currentStep === 8 ? 'Submit Case for Medical Review' : 'Continue'} <ArrowRight className="w-4 h-4 ml-1.5" />
                  </button>
                </div>

              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
