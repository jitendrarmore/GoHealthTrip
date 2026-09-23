'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import {
  CheckCircle2, ArrowRight, ArrowLeft, Upload, ShieldCheck,
  FileText, Building2, AlertCircle, Sparkles, Globe2,
  BadgeCheck, Lock, Users, Clock3, Search, MapPin, Globe,
} from 'lucide-react';
import Link from 'next/link';

interface CountryItem {
  name: string;
  code: string;
  flag: string;
  dialCode: string;
  capital?: string;
  popular?: boolean;
}

const DEFAULT_POPULAR_COUNTRIES: CountryItem[] = [
  { name: 'Oman', flag: '🇴🇲', code: 'OMN', dialCode: '+968', capital: 'Muscat', popular: true },
  { name: 'United Arab Emirates', flag: '🇦🇪', code: 'ARE', dialCode: '+971', capital: 'Abu Dhabi', popular: true },
  { name: 'Saudi Arabia', flag: '🇸🇦', code: 'SAU', dialCode: '+966', capital: 'Riyadh', popular: true },
  { name: 'Kenya', flag: '🇰🇪', code: 'KEN', dialCode: '+254', capital: 'Nairobi', popular: true },
  { name: 'Nigeria', flag: '🇳🇬', code: 'NGA', dialCode: '+234', capital: 'Abuja', popular: true },
  { name: 'Bangladesh', flag: '🇧🇩', code: 'BGD', dialCode: '+880', capital: 'Dhaka', popular: true },
  { name: 'Uzbekistan', flag: '🇺🇿', code: 'UZB', dialCode: '+998', capital: 'Tashkent', popular: true },
  { name: 'Canada', flag: '🇨🇦', code: 'CAN', dialCode: '+1', capital: 'Ottawa', popular: true },
  { name: 'United Kingdom', flag: '🇬🇧', code: 'GBR', dialCode: '+44', capital: 'London', popular: true },
  { name: 'United States', flag: '🇺🇸', code: 'USA', dialCode: '+1', capital: 'Washington, D.C.', popular: true },
  { name: 'India', flag: '🇮🇳', code: 'IND', dialCode: '+91', capital: 'New Delhi', popular: true },
  { name: 'Tanzania', flag: '🇹🇿', code: 'TZA', dialCode: '+255', capital: 'Dodoma', popular: true },
  { name: 'Kuwait', flag: '🇰🇼', code: 'KWT', dialCode: '+965', capital: 'Kuwait City', popular: true },
  { name: 'Qatar', flag: '🇶🇦', code: 'QAT', dialCode: '+974', capital: 'Doha', popular: true },
];

const stepMeta = [
  { label: 'Country & Nationality',           icon: Globe2,       img: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&q=70' },
  { label: 'Identity, City & Contact',        icon: BadgeCheck,   img: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=70' },
  { label: 'Medical Condition',               icon: Sparkles,     img: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&q=70' },
  { label: 'Medical Records & Reports',       icon: FileText,     img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=70' },
  { label: 'Treatment Requested',             icon: ShieldCheck,  img: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=600&q=70' },
  { label: 'Preferred Destination in India',  icon: Building2,    img: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=600&q=70' },
  { label: 'Budget & Travel Timeframe',       icon: Clock3,       img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=70' },
  { label: 'Review & Submit Case',            icon: CheckCircle2, img: 'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=600&q=70' },
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

  // Geo state
  const [allCountries, setAllCountries] = useState<CountryItem[]>(DEFAULT_POPULAR_COUNTRIES);
  const [countrySearch, setCountrySearch] = useState('');
  const [isSearchingApi, setIsSearchingApi] = useState(false);
  const [cities, setCities] = useState<string[]>([]);
  const [loadingCities, setLoadingCities] = useState(false);
  const [isCustomCity, setIsCustomCity] = useState(false);
  const [isCustomCountry, setIsCustomCountry] = useState(false);
  const [customCountryName, setCustomCountryName] = useState('');

  const [formData, setFormData] = useState({
    nationality: 'Oman',
    residenceCountry: 'Oman',
    city: 'Muscat',
    customCity: '',
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

  // Fetch full list of world countries on mount
  useEffect(() => {
    fetch('/api/v1/geo/countries')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setAllCountries(data.data);
        }
      })
      .catch((err) => console.warn('Using bundled countries fallback:', err));
  }, []);

  // Debounced live search querying restcountries v5 API via backend endpoint
  useEffect(() => {
    if (!countrySearch.trim()) return;

    const timer = setTimeout(() => {
      setIsSearchingApi(true);
      fetch(`/api/v1/geo/countries?q=${encodeURIComponent(countrySearch.trim())}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success && Array.isArray(data.data) && data.data.length > 0) {
            setAllCountries((prev) => {
              const map = new Map<string, CountryItem>();
              for (const c of data.data) {
                map.set(c.name.toLowerCase(), c);
              }
              for (const c of prev) {
                if (!map.has(c.name.toLowerCase())) {
                  map.set(c.name.toLowerCase(), c);
                }
              }
              return Array.from(map.values());
            });
          }
        })
        .catch((e) => console.warn('Live restcountries search error:', e))
        .finally(() => setIsSearchingApi(false));
    }, 250);

    return () => clearTimeout(timer);
  }, [countrySearch]);

  // Fetch cities whenever selected nationality / country changes
  useEffect(() => {
    const countryToFetch = formData.nationality || 'Oman';
    setLoadingCities(true);
    fetch(`/api/v1/geo/cities?country=${encodeURIComponent(countryToFetch)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setCities(data.data);
          if (!data.data.includes(formData.city)) {
            setFormData((prev) => ({ ...prev, city: data.data[0] }));
          }
        } else {
          setCities(['Main City / Capital', 'Other City']);
        }
      })
      .catch(() => {
        setCities(['Main City / Capital', 'Other City']);
      })
      .finally(() => setLoadingCities(false));
  }, [formData.nationality]);

  const selectCountry = (country: CountryItem) => {
    setIsCustomCountry(false);
    setFormData((prev) => ({
      ...prev,
      nationality: country.name,
      residenceCountry: country.name,
      phone: country.dialCode ? `${country.dialCode} ` : prev.phone,
      city: country.capital || prev.city,
    }));
  };

  const handleCustomCountrySubmit = () => {
    if (!customCountryName.trim()) return;
    setFormData((prev) => ({
      ...prev,
      nationality: customCountryName.trim(),
      residenceCountry: customCountryName.trim(),
    }));
    setIsCustomCountry(true);
  };

  const handleGoogleFastFill = async () => {
    try {
      const res = await fetch('/api/v1/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'patient.google@gmail.com',
          name: 'Ahmed Al-Kindi',
          picture: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&q=80',
        }),
      });
      const data = await res.json();
      if (data.success) {
        setFormData((prev) => ({
          ...prev,
          firstName: 'Ahmed',
          lastName: 'Al-Kindi',
          email: 'patient.google@gmail.com',
        }));
      }
    } catch (e) {
      console.warn('Google fast fill error:', e);
    }
  };

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

  const filteredCountries = countrySearch.trim()
    ? allCountries.filter(
        (c) =>
          c.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
          c.code.toLowerCase().includes(countrySearch.toLowerCase()) ||
          c.dialCode.includes(countrySearch)
      )
    : allCountries;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
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
                    ['Origin Location', `${formData.city}, ${formData.nationality}`, 'text-slate-900'],
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
                <div className="flex flex-col sm:flex-row justify-center gap-3">
                  <Link href="/profile"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-bold rounded-xl shadow-lg hover:scale-105 transition-all text-sm">
                    <span>Manage My Patient Profile</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link href="/my-case"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-slate-300 text-slate-700 font-bold rounded-xl hover:bg-slate-100 transition-all text-sm">
                    View Live Timeline
                  </Link>
                </div>
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

                  {/* ── STEP 1: FREE COUNTRIES API + SEARCH + CUSTOM OPTION ── */}
                  {currentStep === 1 && (
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-bold text-slate-900">Select Your Country of Origin</h3>
                          <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full">
                            250+ Countries Live
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">
                          Configures your Indian e-Medical Visa eligibility, airport routing, and document checklist.
                        </p>
                      </div>

                      {/* Selected Country Banner */}
                      <div className="p-4 bg-gradient-to-r from-sky-50 to-indigo-50 rounded-2xl border-2 border-sky-400 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
                        <div className="flex items-center gap-3">
                          <span className="text-4xl">
                            {allCountries.find(c => c.name.toLowerCase() === formData.nationality.toLowerCase())?.flag || '🌍'}
                          </span>
                          <div>
                            <span className="text-[10px] font-bold text-sky-700 uppercase tracking-wider block">
                              Selected Patient Country:
                            </span>
                            <strong className="text-base font-black text-slate-900">
                              {formData.nationality}
                            </strong>
                            <p className="text-xs text-slate-500">
                              Dial Code: <span className="font-semibold text-sky-700">{formData.phone.split(' ')[0] || '+'}</span>
                              {formData.city && <> · Capital / City: <span className="font-semibold text-slate-800">{formData.city}</span></>}
                            </p>
                          </div>
                        </div>
                        <span className="px-3 py-1 bg-emerald-500 text-white rounded-full text-xs font-bold flex items-center gap-1 shadow">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Confirmed
                        </span>
                      </div>

                      {/* Search Bar for All 250+ Countries */}
                      <div className="space-y-1">
                        <div className="relative">
                          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                          <input
                            type="text"
                            value={countrySearch}
                            onChange={(e) => setCountrySearch(e.target.value)}
                            placeholder="Type to filter country (e.g. Canada, Kenya, Oman, France, Saudi Arabia)..."
                            className="w-full pl-10 pr-28 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white"
                          />
                          {isSearchingApi ? (
                            <span className="absolute right-3 top-2.5 text-[10px] font-bold text-sky-600 animate-pulse">
                              API Searching...
                            </span>
                          ) : countrySearch ? (
                            <button
                              type="button"
                              onClick={() => setCountrySearch('')}
                              className="absolute right-3 top-2 px-1.5 py-0.5 text-xs text-slate-400 hover:text-slate-600"
                            >
                              ✕
                            </button>
                          ) : null}
                        </div>
                        <p className="text-[10px] text-slate-400">
                          Click any country card or flag to set your destination. Live search via <strong>api.restcountries.com v5</strong>.
                        </p>
                      </div>

                      {/* Grid of Countries: Click Flag to Set Name */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-h-64 overflow-y-auto pr-1">
                        {filteredCountries.map((c) => (
                          <button
                            key={c.code || c.name}
                            type="button"
                            onClick={() => selectCountry(c)}
                            className={`p-3 rounded-2xl border text-center transition flex flex-col items-center gap-1.5 group ${
                              formData.nationality.toLowerCase() === c.name.toLowerCase()
                                ? 'border-sky-500 bg-sky-50 shadow-md ring-2 ring-sky-500/30'
                                : 'border-slate-200 hover:border-sky-300 bg-white hover:bg-slate-50'
                            }`}
                          >
                            <span className="text-3xl group-hover:scale-110 transition-transform">{c.flag}</span>
                            <strong className={`text-xs font-bold truncate w-full ${
                              formData.nationality.toLowerCase() === c.name.toLowerCase() ? 'text-sky-700' : 'text-slate-800'
                            }`}>
                              {c.name}
                            </strong>
                            <span className="text-[10px] text-slate-400">{c.dialCode}</span>
                            {formData.nationality.toLowerCase() === c.name.toLowerCase() && (
                              <span className="text-[9px] font-bold text-sky-600 bg-sky-100 px-2 py-0.5 rounded-full mt-0.5">
                                Selected
                              </span>
                            )}
                          </button>
                        ))}
                      </div>

                      {/* Custom Country Manual Entry Option */}
                      <div className="pt-2 border-t border-slate-100">
                        <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                          <span className="font-semibold">Don't see your country? Enter custom:</span>
                        </div>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={customCountryName}
                            onChange={(e) => setCustomCountryName(e.target.value)}
                            placeholder="Type custom country name..."
                            className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white"
                          />
                          <button
                            type="button"
                            onClick={handleCustomCountrySubmit}
                            className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold transition"
                          >
                            Set Country
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ── STEP 2: IDENTITY, CITY & GOOGLE FEDERATED SIGN-UP ── */}
                  {currentStep === 2 && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-bold text-slate-900">Patient Identity, City & Contact</h3>
                          <p className="text-xs text-slate-500 mt-0.5">Enter details exactly as they appear on your passport.</p>
                        </div>

                        {/* Fast Fill with Google Button */}
                        <button
                          type="button"
                          onClick={handleGoogleFastFill}
                          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 rounded-xl text-xs font-semibold text-slate-700 shadow-sm transition"
                        >
                          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                          </svg>
                          <span>Fast Fill with Google</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">First Name (as on Passport)</label>
                          <input
                            type="text"
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                            className={inputClass}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Last Name</label>
                          <input
                            type="text"
                            value={formData.lastName}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                            className={inputClass}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email Address</label>
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className={inputClass}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                            WhatsApp / Phone (Prefix: {formData.nationality})
                          </label>
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className={inputClass}
                          />
                        </div>
                      </div>

                      {/* City Selector using City API */}
                      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="block text-xs font-bold text-slate-700 uppercase">
                            City of Residence in {formData.nationality}
                          </label>
                          <button
                            type="button"
                            onClick={() => setIsCustomCity(!isCustomCity)}
                            className="text-xs text-sky-600 hover:text-sky-700 font-semibold"
                          >
                            {isCustomCity ? 'Choose from list' : 'Type custom city'}
                          </button>
                        </div>

                        {isCustomCity ? (
                          <input
                            type="text"
                            value={formData.city}
                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                            placeholder="Type your city name..."
                            className={inputClass}
                          />
                        ) : (
                          <div className="relative">
                            <select
                              value={formData.city}
                              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                              aria-label="Select City of Residence"
                              className={inputClass + ' appearance-none cursor-pointer'}
                            >
                              {cities.map((city) => (
                                <option key={city} value={city}>
                                  {city}
                                </option>
                              ))}
                              <option value="Other">Other / Not Listed</option>
                            </select>
                            <MapPin className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5 pointer-events-none" />
                          </div>
                        )}
                        <p className="text-[11px] text-slate-400">
                          {loadingCities ? 'Loading cities...' : `Found ${cities.length} major cities in ${formData.nationality}. Used to plan airport transfer.`}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* ── STEP 3: MEDICAL CONDITION ── */}
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

                  {/* ── STEP 4: MEDICAL DOCUMENTS ── */}
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

                  {/* ── STEP 5: TREATMENT REQUESTED ── */}
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

                  {/* ── STEP 6: PREFERRED DESTINATION ── */}
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

                  {/* ── STEP 7: BUDGET & TIMEFRAME ── */}
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
                            aria-label="Select Budget Range"
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

                  {/* ── STEP 8: REVIEW & SUBMIT ── */}
                  {currentStep === 8 && (
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">Review & Authorize Medical Case Submission</h3>
                        <p className="text-xs text-slate-500 mt-1">Please review your information before submitting for clinical review.</p>
                      </div>
                      <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 text-sm">
                        {[
                          ['Patient', `${formData.firstName} ${formData.lastName}`],
                          ['Origin Country & City', `${formData.city}, ${formData.nationality}`],
                          ['Phone / WhatsApp', formData.phone],
                          ['Email', formData.email],
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

                  {/* Navigation Buttons */}
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
