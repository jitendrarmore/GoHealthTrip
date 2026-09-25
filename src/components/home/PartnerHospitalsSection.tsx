'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Building2,
  MapPin,
  BadgeCheck,
  Star,
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Users,
  Bed,
  Sparkles,
  HeartPulse
} from 'lucide-react';

interface Hospital {
  id: string;
  name: string;
  categoryTag: string;
  city: string;
  region: string;
  accreditation: string;
  beds: string;
  icuBeds: string;
  rating: number;
  reviewsCount: number;
  highlightSpecs: string[];
  conciergeFeatures: string[];
  img: string;
  colorGradient: string;
  accentBorder: string;
}

const hospitalData: Hospital[] = [
  {
    id: 'apollo',
    name: 'Indraprastha Apollo Hospitals',
    categoryTag: 'Quaternary Pioneer · 30+ Years',
    city: 'New Delhi',
    region: 'Delhi NCR',
    accreditation: 'JCI Gold Seal & NABH Accredited',
    beds: '710 Beds',
    icuBeds: '150 ICU Beds',
    rating: 4.9,
    reviewsCount: 1420,
    highlightSpecs: ['Robotic Heart Surgery (CABG)', 'Liver & Kidney Transplants', 'Proton Beam Oncology'],
    conciergeFeatures: ['Dedicated International Patient Lounge', 'Arabic & Swahili Interpreters', 'Airport Ambulance Liaison'],
    img: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&q=75',
    colorGradient: 'from-sky-600 via-sky-700 to-sky-900',
    accentBorder: 'hover:border-sky-500 hover:ring-2 hover:ring-sky-500/20',
  },
  {
    id: 'medanta',
    name: 'Medanta – The Medicity',
    categoryTag: 'Superspecialty Flagship · 43 Acres',
    city: 'Gurugram',
    region: 'Delhi NCR',
    accreditation: 'JCI & NABH Accredited',
    beds: '1,250 Beds',
    icuBeds: '300 ICU Beds',
    rating: 4.9,
    reviewsCount: 1850,
    highlightSpecs: ['Heart Institute by Dr. Trehan', 'Living-Donor Liver Transplants', 'CyberKnife & Bone Marrow'],
    conciergeFeatures: ['Air Ambulance Helipad On-Site', 'Dedicated Foreign Patient Wing', 'Multi-Cuisine Dietary Kitchens'],
    img: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=75',
    colorGradient: 'from-teal-600 via-teal-700 to-teal-900',
    accentBorder: 'hover:border-teal-500 hover:ring-2 hover:ring-teal-500/20',
  },
  {
    id: 'fortis-fmri',
    name: 'Fortis Memorial (FMRI)',
    categoryTag: 'Next-Gen Robotics & Quaternary',
    city: 'Gurugram',
    region: 'Delhi NCR',
    accreditation: 'JCI & NABH Accredited',
    beds: '1,000 Beds',
    icuBeds: '220 ICU Beds',
    rating: 4.8,
    reviewsCount: 980,
    highlightSpecs: ['Paediatric Heart Surgery', 'Neurosciences & Gamma Knife', 'Orthopedic Robotic Joint Replacement'],
    conciergeFeatures: ['Direct IGI T3 Meet & Greet', 'Fast-Track Medical Visa Desk', 'Private Family Suites'],
    img: 'https://images.unsplash.com/photo-1632833239869-a37e3a5806d2?w=800&q=75',
    colorGradient: 'from-indigo-600 via-indigo-700 to-indigo-900',
    accentBorder: 'hover:border-indigo-500 hover:ring-2 hover:ring-indigo-500/20',
  },
  {
    id: 'max-healthcare',
    name: 'Max Super Speciality Hospital',
    categoryTag: 'Leading Oncology & Surgical Network',
    city: 'Saket, New Delhi',
    region: 'Delhi NCR',
    accreditation: 'JCI Gold Standard & NABH',
    beds: '800 Beds',
    icuBeds: '180 ICU Beds',
    rating: 4.9,
    reviewsCount: 1120,
    highlightSpecs: ['Cancer Care & TrueBeam STx', 'Minimally Invasive Spine Surgery', 'Advanced Bariatric & IVF'],
    conciergeFeatures: ['Embassy & Consular Documentation', 'Russian, French & Arabic Translators', 'Complimentary Local SIM & Cabs'],
    img: 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=800&q=75',
    colorGradient: 'from-emerald-600 via-emerald-700 to-emerald-900',
    accentBorder: 'hover:border-emerald-500 hover:ring-2 hover:ring-emerald-500/20',
  },
  {
    id: 'narayana-health',
    name: 'Narayana Health City',
    categoryTag: 'Global Cardiac & Pediatric Hub',
    city: 'Bengaluru',
    region: 'Bengaluru',
    accreditation: 'JCI & NABH Accredited',
    beds: '1,400 Beds',
    icuBeds: '280 ICU Beds',
    rating: 4.9,
    reviewsCount: 1650,
    highlightSpecs: ['Pediatric Cardiac Surgery Center', 'Heart & Lung Transplantation', 'Advanced Oncology Institute'],
    conciergeFeatures: ['Specialized Pediatric Concierge', 'Direct Kempegowda Airport Transfer', 'Guest House Accommodations'],
    img: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&q=75',
    colorGradient: 'from-rose-600 via-rose-700 to-rose-900',
    accentBorder: 'hover:border-rose-500 hover:ring-2 hover:ring-rose-500/20',
  },
  {
    id: 'kokilaben',
    name: 'Kokilaben Dhirubhai Ambani Hospital',
    categoryTag: 'Quaternary Medical Sciences',
    city: 'Mumbai',
    region: 'Mumbai',
    accreditation: 'JCI, NABH & CAP Certified',
    beds: '750 Beds',
    icuBeds: '180 ICU Beds',
    rating: 4.9,
    reviewsCount: 1290,
    highlightSpecs: ['Full-Time Specialist System (FTSS)', 'Robotic Joint Reconstruction', 'Comprehensive Cancer Centre'],
    conciergeFeatures: ['VIP Airport Chauffeur', 'International Dietary Kitchens', 'Sea-Facing Patient Recovery Rooms'],
    img: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&q=75',
    colorGradient: 'from-violet-600 via-violet-700 to-violet-900',
    accentBorder: 'hover:border-violet-500 hover:ring-2 hover:ring-violet-500/20',
  },
];

const cityFilters = ['All Hospitals', 'Delhi NCR', 'Mumbai', 'Bengaluru'];

export default function PartnerHospitalsSection() {
  const [selectedCity, setSelectedCity] = useState('All Hospitals');

  const filteredHospitals = selectedCity === 'All Hospitals'
    ? hospitalData
    : hospitalData.filter((h) => h.region === selectedCity || h.city.includes(selectedCity));

  return (
    <section
      id="hospitals"
      aria-label="GoHealthTrip Partner Hospitals Network"
      className="relative py-20 bg-gradient-to-b from-white via-slate-50/70 to-white overflow-hidden border-b border-slate-100"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* ─── 1. SECTION HEADER (CarePath Aligned) ──────────────────── */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200/80 text-teal-800 text-xs font-extrabold tracking-[0.25em] uppercase mb-4 shadow-sm">
            <Building2 className="w-3.5 h-3.5 text-teal-600" />
            <span>ACCREDITED HEALTHCARE NETWORK</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            India's Premier{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-teal-600 to-indigo-600">
              Partner Hospitals
            </span>
          </h2>

          <p className="mt-3 text-lg sm:text-xl font-bold text-slate-700">
            India's highest-accredited quaternary medical institutions and surgical centres.
          </p>

          <p className="mt-2 text-sm sm:text-base text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Every hospital in our network is independently verified for JCI & NABH gold-standard accreditations, advanced robotic suites, and dedicated international patient concierges.
          </p>

          {/* Interactive City Filter Pills */}
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

        {/* ─── 2. HOSPITAL CARDS GRID (CarePath Aligned) ─────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {filteredHospitals.map((h) => (
            <div
              key={h.id}
              className={`group bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between ${h.accentBorder}`}
            >
              {/* Card Image Banner */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                <Image
                  src={h.img}
                  alt={h.name}
                  fill
                  quality={85}
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/20" />

                {/* Top-left: JCI / NABH Gold Pill */}
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md rounded-full px-2.5 py-1 text-[10px] font-black text-slate-900 shadow-md flex items-center gap-1.5 border border-white">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span>{h.accreditation.split('&')[0]}</span>
                </div>

                {/* Top-right: Location */}
                <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md rounded-full px-2.5 py-1 text-[10px] font-bold text-white shadow-md flex items-center gap-1 border border-white/10">
                  <MapPin className="w-3 h-3 text-rose-400" />
                  <span>{h.city}</span>
                </div>

                {/* Bottom title overlay */}
                <div className="absolute bottom-3 left-4 right-4">
                  <h3 className="font-black text-white text-lg leading-snug drop-shadow-sm group-hover:text-teal-200 transition">
                    {h.name}
                  </h3>
                  <p className="text-[11px] text-slate-200 font-semibold mt-0.5">
                    {h.categoryTag}
                  </p>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                
                {/* Stats row: Beds + Rating */}
                <div className="flex items-center justify-between py-2 border-b border-slate-100 text-xs">
                  <div className="flex items-center gap-1.5 text-slate-600 font-bold">
                    <Bed className="w-3.5 h-3.5 text-sky-600" />
                    <span>{h.beds}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-emerald-700 font-semibold">{h.icuBeds}</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-800 font-extrabold">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{h.rating}</span>
                    <span className="text-[10px] text-slate-400 font-normal">({h.reviewsCount}+)</span>
                  </div>
                </div>

                {/* Clinical Excellence Centers */}
                <div className="space-y-1.5">
                  <div className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                    Key Clinical Centers
                  </div>
                  <div className="space-y-1">
                    {h.highlightSpecs.map((spec, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 flex-shrink-0" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Concierge & Translation Badges */}
                <div className="pt-2 border-t border-slate-100">
                  <div className="text-[11px] font-black uppercase tracking-wider text-slate-400 mb-1.5">
                    International Patient Services
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {h.conciergeFeatures.map((f, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-lg bg-slate-50 border border-slate-200/80 text-[10px] font-semibold text-slate-600"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                  <Link
                    href={`/hospitals?name=${encodeURIComponent(h.name)}`}
                    className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1 transition group-hover:gap-1.5"
                  >
                    <span>View Hospital Details</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    href={`/start-journey?hospital=${encodeURIComponent(h.name)}`}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-teal-600 text-white text-xs font-extrabold shadow-sm transition"
                  >
                    Inquire
                  </Link>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* ─── 3. BOTTOM NETWORK TRUST PANEL (CarePath CTA style) ────── */}
        <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/90 shadow-xl shadow-slate-200/60 overflow-hidden">
          <div className="grid lg:grid-cols-12 gap-6 items-center">
            
            {/* Left 7 cols: Statement and Key Network Statistics */}
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% NABH / JCI Gold-Standard Verified</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Looking for a specific medical specialist or hospital?
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
                Our care coordinators work with multi-specialty tumor boards, chief surgeons, and international patient lounges across India to secure your preliminary treatment plans and quotations.
              </p>

              {/* 3 Trust Indicator Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <div className="text-base font-black text-slate-900">50+ Hospitals</div>
                  <div className="text-[11px] text-slate-500 font-medium">Pan-India Quaternary Network</div>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <div className="text-base font-black text-teal-700">24/7 Desk</div>
                  <div className="text-[11px] text-slate-500 font-medium">Airport-to-Bedside Care</div>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 col-span-2 sm:col-span-1">
                  <div className="text-base font-black text-indigo-700">24–48h VIL</div>
                  <div className="text-[11px] text-slate-500 font-medium">Fast-Track Visa Support</div>
                </div>
              </div>
            </div>

            {/* Right 4 cols: Direct CTA Buttons */}
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-stretch justify-center gap-3">
              <Link
                href="/hospitals"
                className="w-full text-center px-6 py-3.5 bg-gradient-to-r from-sky-500 via-teal-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-sky-500/25 hover:shadow-xl transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
              >
                <Building2 className="w-4 h-4" />
                <span>Browse All Partner Hospitals</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/start-journey"
                className="w-full text-center px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-sm rounded-2xl border border-slate-200 transition flex items-center justify-center gap-2"
              >
                <span>Request Custom Recommendation</span>
              </Link>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
