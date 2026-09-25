'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import {
  Star, MapPin, CheckCircle2, ArrowRight, Stethoscope,
  BadgeCheck, Globe, Bed, Users, ShieldCheck, Phone,
  Zap, Building2, Sparkles, ChevronRight, Check
} from 'lucide-react';

const hospitals = [
  {
    id: 'apollo',
    name: 'Indraprastha Apollo Hospitals',
    location: 'New Delhi (Delhi Mathura Road)',
    city: 'Delhi NCR',
    accreditations: ['JCI Gold Standard', 'NABH', 'NABL'],
    beds: '710 Beds',
    icuBeds: '150 ICU',
    rating: 4.9,
    reviews: 1420,
    description: 'First JCI-accredited hospital in India. Pioneer in living-donor liver transplants, open-heart CABG, and robotic-assisted surgery.',
    doctors: [
      { name: 'Dr. Vivek Gupta', specialty: 'Senior Interventional Cardiologist' },
      { name: 'Dr. Arun Sethi', specialty: 'Robotic Joint Replacement' },
    ],
    features: ['Dedicated International Patient Lounge', 'Arabic & Swahili Interpreters', 'Airport Ambulance Reception'],
    img: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&q=75',
    color: 'from-sky-600 to-sky-900',
    accentBorder: 'border-slate-200/90 hover:border-sky-500 hover:ring-2 hover:ring-sky-500/20',
  },
  {
    id: 'medanta',
    name: 'Medanta – The Medicity',
    location: 'Gurugram (Sector 38, Delhi NCR)',
    city: 'Gurugram',
    accreditations: ['JCI Gold Seal', 'NABH', 'NABL'],
    beds: '1,250 Beds',
    icuBeds: '300 ICU',
    rating: 4.9,
    reviews: 1850,
    description: 'Founded by world-renowned cardiac surgeon Dr. Naresh Trehan. State-of-the-art multi-organ transplant and cardiac sciences centre spread across 43 acres.',
    doctors: [
      { name: 'Dr. Naresh Trehan', specialty: 'Chairman & Chief Cardiac Surgeon' },
      { name: 'Dr. A.S. Soin', specialty: 'Chairman Liver Transplantation' },
    ],
    features: ['Air Ambulance Helipad', 'Dedicated Foreign Patient Wing', 'International Dietary Kitchens'],
    img: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=75',
    color: 'from-teal-600 to-teal-900',
    accentBorder: 'border-slate-200/90 hover:border-teal-500 hover:ring-2 hover:ring-teal-500/20',
  },
  {
    id: 'fortis-fmri',
    name: 'Fortis Memorial Research Institute (FMRI)',
    location: 'Gurugram (Sector 44, Delhi NCR)',
    city: 'Gurugram',
    accreditations: ['JCI Gold Seal', 'NABH', 'NABL'],
    beds: '1,000 Beds',
    icuBeds: '220 ICU',
    rating: 4.8,
    reviews: 980,
    description: 'Next-generation quaternary care hospital featuring CyberKnife, Gamma Knife, and a leading paediatric bone marrow transplant unit.',
    doctors: [
      { name: 'Dr. Vinod Raina', specialty: 'Executive Director Oncology & BMT' },
      { name: 'Dr. Sandeep Vaishya', specialty: 'Director Neurosurgery' },
    ],
    features: ['Multi-lingual Care Navigators', 'Embassy Liaison Desk', 'Integrated Recovery Suites'],
    img: 'https://images.unsplash.com/photo-1632833239869-a37e3a5806d2?w=800&q=75',
    color: 'from-indigo-600 to-indigo-900',
    accentBorder: 'border-slate-200/90 hover:border-indigo-500 hover:ring-2 hover:ring-indigo-500/20',
  },
  {
    id: 'max-saket',
    name: 'Max Super Speciality Hospital',
    location: 'Saket, New Delhi',
    city: 'Delhi NCR',
    accreditations: ['JCI Gold Seal', 'NABH'],
    beds: '530 Beds',
    icuBeds: '130 ICU',
    rating: 4.85,
    reviews: 1120,
    description: 'Centre of excellence for Heart & Vascular, Cancer Care, Neurosciences, and Orthopedics — with a dedicated international patient desk and rapid T3 reception.',
    doctors: [
      { name: 'Dr. Harit Chaturvedi', specialty: 'Chairman Cancer Care' },
      { name: 'Dr. S.K.S. Marya', specialty: 'Chairman Orthopedics & Joint Replacement' },
    ],
    features: ['Express OPD for International Patients', 'Halal Food Options', 'Airport Pickup & Drop'],
    img: 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=800&q=75',
    color: 'from-emerald-600 to-emerald-900',
    accentBorder: 'border-slate-200/90 hover:border-emerald-500 hover:ring-2 hover:ring-emerald-500/20',
  },
  {
    id: 'narayana-bengaluru',
    name: 'Narayana Health City',
    location: 'Bommasandra, Bengaluru',
    city: 'Bengaluru',
    accreditations: ['JCI Gold Seal', 'NABH'],
    beds: '1,400 Beds',
    icuBeds: '280 ICU',
    rating: 4.9,
    reviews: 1650,
    description: 'World-renowned tertiary healthcare city recognized for high-volume complex cardiac surgery, pediatric interventions, and organ transplantation.',
    doctors: [
      { name: 'Dr. Devi Shetty', specialty: 'Founder & Senior Cardiac Surgeon' },
      { name: 'Dr. Colin John', specialty: 'Senior Pediatric Cardiothoracic Surgeon' },
    ],
    features: ['Specialized Pediatric Concierge', 'Kempegowda Int\'l Airport Chauffeur', 'Affordable Quaternary Packages'],
    img: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&q=75',
    color: 'from-rose-600 to-rose-900',
    accentBorder: 'border-slate-200/90 hover:border-rose-500 hover:ring-2 hover:ring-rose-500/20',
  },
  {
    id: 'kokilaben-mumbai',
    name: 'Kokilaben Dhirubhai Ambani Hospital',
    location: 'Andheri West, Mumbai',
    city: 'Mumbai',
    accreditations: ['JCI Gold Seal', 'NABH', 'CAP'],
    beds: '750 Beds',
    icuBeds: '180 ICU',
    rating: 4.9,
    reviews: 1290,
    description: 'Premier quaternary hospital in Mumbai featuring a Full-Time Specialist System (FTSS), advanced robotic rehabilitation suites, and comprehensive cancer care.',
    doctors: [
      { name: 'Dr. Mandar Nadkarni', specialty: 'Director Surgical Oncology' },
      { name: 'Dr. Sanjay Pandey', specialty: 'Head of Reconstructive Urology & Andrology' },
    ],
    features: ['VIP Airport Chauffeur', 'International Dietary Kitchens', 'Sea-Facing Patient Recovery Suites'],
    img: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&q=75',
    color: 'from-violet-600 to-violet-900',
    accentBorder: 'border-slate-200/90 hover:border-violet-500 hover:ring-2 hover:ring-violet-500/20',
  },
];

const cityFilters = ['All Cities', 'Delhi NCR', 'Gurugram', 'Bengaluru', 'Mumbai'];

const stats = [
  { val: '50+', label: 'Partner Hospitals', icon: Building2 },
  { val: '4.9★', label: 'Avg Patient Rating', icon: Star },
  { val: '100%', label: 'JCI & NABH Verified', icon: BadgeCheck },
  { val: '24/7', label: 'International Concierge', icon: Phone },
];

export default function HospitalsPage() {
  const [selectedCity, setSelectedCity] = useState('All Cities');

  const filteredHospitals = selectedCity === 'All Cities'
    ? hospitals
    : hospitals.filter((h) => h.city === selectedCity || h.location.includes(selectedCity));

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-1">
        {/* ── 1. CarePath-Aligned Hero Banner ────────────────────────────── */}
        <section className="relative py-16 sm:py-20 bg-gradient-to-b from-white via-slate-50/70 to-slate-50 overflow-hidden border-b border-slate-100">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 text-center">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200/80 text-teal-800 text-xs font-extrabold tracking-[0.25em] uppercase mb-4 shadow-sm">
              <Building2 className="w-3.5 h-3.5 text-teal-600" />
              <span>ACCREDITED HEALTHCARE NETWORK</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight max-w-4xl mx-auto">
              India's Highest-Accredited{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-teal-600 to-indigo-600">
                Hospital Networks & Specialists
              </span>
            </h1>

            <p className="mt-3 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Every partner hospital holds Gold-Standard JCI or NABH accreditation and is independently inspected for international clinical outcomes, advanced robotic suites, and dedicated concierge wings.
            </p>

            {/* Metric Capsules */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
              {stats.map((s) => {
                const Icon = s.icon;
                return (
                  <div key={s.label} className="bg-white rounded-2xl p-4 text-center border border-slate-200/80 shadow-sm">
                    <Icon className="w-5 h-5 text-teal-600 mx-auto mb-1.5" />
                    <div className="text-xl sm:text-2xl font-black text-slate-900">{s.val}</div>
                    <p className="text-[11px] text-slate-500 font-semibold mt-0.5">{s.label}</p>
                  </div>
                );
              })}
            </div>

            {/* City Filter Pills */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
              {cityFilters.map((city) => (
                <button
                  key={city}
                  type="button"
                  onClick={() => setSelectedCity(city)}
                  className={`px-4 py-2 rounded-2xl text-xs font-extrabold transition-all duration-300 ${
                    selectedCity === city
                      ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20 scale-105'
                      : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>

          </div>
        </section>

        {/* ── 2. CarePath-Styled Hospital Cards ──────────────────────────── */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto space-y-8">
            {filteredHospitals.map((h) => (
              <div
                key={h.id}
                className={`bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border ${h.accentBorder}`}
              >
                <div className="grid md:grid-cols-12 gap-0">
                  {/* Left: Hospital Image Banner */}
                  <div className="md:col-span-5 relative min-h-64 md:min-h-full overflow-hidden bg-slate-100">
                    <Image
                      src={h.img}
                      alt={h.name}
                      fill
                      quality={85}
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 40vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-black/10" />

                    {/* Top rating badge */}
                    <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-white/95 backdrop-blur-md rounded-full px-3 py-1 shadow-md border border-white">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="text-xs font-black text-slate-900">{h.rating}</span>
                      <span className="text-[10px] text-slate-500">({h.reviews.toLocaleString()} patients)</span>
                    </div>

                    {/* Bottom Accreditations */}
                    <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-1.5">
                      {h.accreditations.map((acc) => (
                        <span
                          key={acc}
                          className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 bg-emerald-500/90 text-white rounded-full backdrop-blur-sm shadow-sm"
                        >
                          <Check className="w-3 h-3" /> {acc}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right: Hospital Details & Specialists */}
                  <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-5">
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center gap-2 text-xs font-bold text-teal-700 mb-1">
                          <MapPin className="w-3.5 h-3.5 text-rose-500" />
                          <span>{h.location}</span>
                          <span className="text-slate-300">•</span>
                          <span className="flex items-center gap-1 text-slate-600">
                            <Bed className="w-3.5 h-3.5 text-sky-600" /> {h.beds} ({h.icuBeds})
                          </span>
                        </div>

                        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                          {h.name}
                        </h2>
                      </div>

                      <p className="text-sm text-slate-600 leading-relaxed">
                        {h.description}
                      </p>

                      {/* Specialists Showcase */}
                      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
                        <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider block mb-2.5">
                          Department Chiefs & Key Specialists
                        </span>
                        <div className="grid sm:grid-cols-2 gap-2.5">
                          {h.doctors.map((doc, idx) => (
                            <div key={idx} className="flex items-center gap-2.5 bg-white p-2.5 rounded-xl border border-slate-100 shadow-sm">
                              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-400 to-indigo-600 flex items-center justify-center text-white font-black text-xs flex-shrink-0">
                                {doc.name.replace('Dr. ', '')[0]}
                              </div>
                              <div className="overflow-hidden">
                                <p className="text-xs font-black text-slate-900 truncate">{doc.name}</p>
                                <p className="text-[10px] text-slate-500 truncate">{doc.specialty}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* International Concierge Services */}
                      <div>
                        <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider block mb-2">
                          International Patient Amenities
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {h.features.map((feat) => (
                            <span
                              key={feat}
                              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200/60"
                            >
                              <ShieldCheck className="w-3.5 h-3.5 text-teal-600 flex-shrink-0" />
                              <span>{feat}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Actions */}
                    <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                      <Link
                        href={`/start-journey?hospital=${encodeURIComponent(h.name)}`}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-sky-500 via-teal-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white text-xs font-extrabold rounded-2xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
                      >
                        <Zap className="w-4 h-4" />
                        <span>Request Official Quotation & Visa Letter</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>

                      <Link
                        href={`/find-treatment?hospital=${encodeURIComponent(h.name)}`}
                        className="text-xs font-bold text-slate-600 hover:text-sky-700 flex items-center justify-center gap-1 py-2 sm:py-0"
                      >
                        <span>View Procedures</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>

                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 3. Bottom Matchmaker Panel (CarePath CTA style) ─────────────── */}
        <section className="py-14 px-4 sm:px-6 lg:px-8 bg-slate-50 border-t border-slate-100">
          <div className="max-w-4xl mx-auto rounded-3xl bg-white p-8 sm:p-10 border border-slate-200 shadow-xl text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mx-auto shadow-sm">
              <Sparkles className="w-6 h-6" />
            </div>

            <h3 className="text-2xl font-black text-slate-900 tracking-tight">
              Can't Decide Which Hospital Fits Your Medical Case?
            </h3>

            <p className="text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
              Our clinical care coordinators match your specific condition, budget, and travel schedule with treating department heads across Apollo, Medanta, Fortis, and Max.
            </p>

            <div className="pt-2">
              <Link
                href="/start-journey"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-sky-500 via-teal-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-sky-500/25 hover:shadow-xl transition-all"
              >
                <span>Get Personalized Multi-Hospital Match</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
