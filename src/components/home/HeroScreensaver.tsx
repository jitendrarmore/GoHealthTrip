'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Plane, Globe, ShieldCheck, Heart, Sparkles, ArrowRight,
  TrendingDown, MapPin, Users, Play, Pause, Maximize2,
  Minimize2, CheckCircle2, Building2, Clock, DollarSign
} from 'lucide-react';

// Live Patient Journeys traveling to India for care
const livePatientJourneys = [
  {
    id: 1,
    name: 'Eleanor Vance',
    country: 'United Kingdom',
    city: 'London',
    flag: '🇬🇧',
    procedure: 'Robotic Bilateral Knee Replacement',
    hospital: 'Fortis Memorial, Delhi NCR',
    costAtHome: '$44,000',
    costInIndia: '$8,200',
    savings: '$35,800',
    percentSavings: '81%',
    status: 'In Flight · Arriving IGI Airport',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80',
  },
  {
    id: 2,
    name: 'Tariq Al-Balushi',
    country: 'Oman',
    city: 'Muscat',
    flag: '🇴🇲',
    procedure: 'CyberKnife & Spinal Neuro-Oncology',
    hospital: 'Apollo Proton Cancer Centre, Chennai',
    costAtHome: '$52,000',
    costInIndia: '$14,500',
    savings: '$37,500',
    percentSavings: '72%',
    status: 'Visa Approved · Hospital Scheduled',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80',
  },
  {
    id: 3,
    name: 'Amina Mwangi',
    country: 'Kenya',
    city: 'Nairobi',
    flag: '🇰🇪',
    procedure: 'Pediatric Cardiac VSD Surgery',
    hospital: 'Narayana Health, Bengaluru',
    costAtHome: '$32,000',
    costInIndia: '$6,400',
    savings: '$25,600',
    percentSavings: '80%',
    status: 'Medical Concierge Assigned',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80',
  },
  {
    id: 4,
    name: 'David Campbell',
    country: 'United States',
    city: 'California',
    flag: '🇺🇸',
    procedure: 'Minimally Invasive Multi-Level Spine Fusion',
    hospital: 'Max Super Speciality Hospital, Delhi',
    costAtHome: '$98,000',
    costInIndia: '$12,800',
    savings: '$85,200',
    percentSavings: '87%',
    status: 'In Flight · Special Transport Ready',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80',
  },
  {
    id: 5,
    name: 'Fatima Al-Nuaimi',
    country: 'United Arab Emirates',
    city: 'Dubai',
    flag: '🇦🇪',
    procedure: 'Advanced IVF with PGT-A Genetic Screening',
    hospital: 'Apollo Fertility, Mumbai',
    costAtHome: '$28,000',
    costInIndia: '$6,200',
    savings: '$21,800',
    percentSavings: '78%',
    status: 'Consultation Completed · Travel Booked',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&q=80',
  },
  {
    id: 6,
    name: 'Rustam Kadyrov',
    country: 'Uzbekistan',
    city: 'Tashkent',
    flag: '🇺🇿',
    procedure: 'Living-Donor Liver Transplant',
    hospital: 'Medanta - The Medicity, Gurugram',
    costAtHome: '$110,000',
    costInIndia: '$33,000',
    savings: '$77,000',
    percentSavings: '70%',
    status: 'Donor Evaluation Cleared',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80',
  },
  {
    id: 7,
    name: 'Hans & Greta Mueller',
    country: 'Germany',
    city: 'Munich',
    flag: '🇩🇪',
    procedure: 'Hip Resurfacing & Rehabilitation',
    hospital: 'Kokilaben Dhirubhai Ambani, Mumbai',
    costAtHome: '$38,000',
    costInIndia: '$9,500',
    savings: '$28,500',
    percentSavings: '75%',
    status: 'In Flight · Hotel Booked',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&q=80',
  },
];

// Interactive savings estimator options
const procedureEstimates: Record<string, { usCost: number; inCost: number }> = {
  'Heart Bypass (CABG)': { usCost: 125000, inCost: 7500 },
  'Robotic Knee Replacement': { usCost: 45000, inCost: 6800 },
  'CyberKnife / Oncology': { usCost: 65000, inCost: 11000 },
  'Spine Fusion Surgery': { usCost: 95000, inCost: 10500 },
  'Living-Donor Liver Transplant': { usCost: 350000, inCost: 34000 },
  'IVF with Genetic Screening': { usCost: 26000, inCost: 5500 },
  'Dental Full-Mouth Implants': { usCost: 34000, inCost: 4800 },
};

export default function HeroScreensaver() {
  const [activePatientIndex, setActivePatientIndex] = useState(0);
  const [isScreensaverMode, setIsScreensaverMode] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [selectedProcedure, setSelectedProcedure] = useState('Heart Bypass (CABG)');
  const [selectedHomeCountry, setSelectedHomeCountry] = useState('United States');

  // Auto-cycle through traveling patients like a live flight radar
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActivePatientIndex((prev) => (prev + 1) % livePatientJourneys.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const currentPatient = livePatientJourneys[activePatientIndex];
  const currentEstimate = procedureEstimates[selectedProcedure] || procedureEstimates['Heart Bypass (CABG)'];
  const dollarSavings = currentEstimate.usCost - currentEstimate.inCost;
  const percentSavings = Math.round((dollarSavings / currentEstimate.usCost) * 100);

  return (
    <section className="relative overflow-hidden bg-slate-950 text-white select-none">
      {/* ─── 1. Breathtaking Panoramic Hero Backdrop ───────────────── */}
      <div className="relative w-full h-[620px] sm:h-[680px] lg:h-[720px] overflow-hidden">
        {/* The User's Panoramic Artwork */}
        <div
          className={`absolute inset-0 transition-transform duration-1000 ease-out ${
            isScreensaverMode ? 'scale-105' : 'scale-100'
          }`}
        >
          <Image
            src="/images/gohealthtrip-banner.png"
            alt="GoHealthTrip - Global Medical Travel to India"
            fill
            priority
            quality={95}
            className="object-cover object-center lg:object-[center_35%]"
            sizes="100vw"
          />
          {/* Subtle cinematic gradient overlays for pristine readability while preserving vibrant imagery */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-900/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/40 to-transparent lg:w-2/3" />
        </div>

        {/* ─── 2. Animated Radar Flight Corridors SVG Overlay ───────── */}
        <div className="absolute inset-0 pointer-events-none z-10 hidden md:block">
          <svg className="w-full h-full" viewBox="0 0 1024 384" preserveAspectRatio="none">
            <defs>
              <linearGradient id="flightTrailGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.2" />
                <stop offset="80%" stopColor="#2DD4BF" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#10B981" stopOpacity="1" />
              </linearGradient>

              {/* Glowing filter */}
              <filter id="glow">
                <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Flight Arc: USA / NY (x=160, y=85) to India (x=405, y=105) */}
            <path
              d="M 170 85 Q 280 20 405 105"
              fill="none"
              stroke="url(#flightTrailGrad)"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              className="opacity-70 animate-pulse"
            />

            {/* Flight Arc: UK / London (x=245, y=65) to India (x=405, y=105) */}
            <path
              d="M 245 65 Q 320 30 405 105"
              fill="none"
              stroke="url(#flightTrailGrad)"
              strokeWidth="2"
              strokeDasharray="5 3"
              className="opacity-90"
            />

            {/* Flight Arc: GCC / Muscat / Dubai (x=340, y=100) to India (x=405, y=105) */}
            <path
              d="M 340 100 Q 370 85 405 105"
              fill="none"
              stroke="#2DD4BF"
              strokeWidth="2.5"
              strokeDasharray="4 2"
              className="opacity-95"
            />

            {/* Flight Arc: Africa / Nairobi (x=315, y=150) to India (x=405, y=105) */}
            <path
              d="M 315 150 Q 360 140 405 105"
              fill="none"
              stroke="url(#flightTrailGrad)"
              strokeWidth="1.8"
              strokeDasharray="4 4"
              className="opacity-80"
            />

            {/* Flight Arc: CIS / Tashkent (x=355, y=70) to India (x=405, y=105) */}
            <path
              d="M 355 70 Q 380 75 405 105"
              fill="none"
              stroke="#38BDF8"
              strokeWidth="1.5"
              strokeDasharray="3 3"
              className="opacity-85"
            />

            {/* Pulsing Target Ring over India (x=405, y=105) */}
            <circle cx="405" cy="105" r="8" fill="none" stroke="#10B981" strokeWidth="1.5" className="animate-ping opacity-75" />
            <circle cx="405" cy="105" r="4" fill="#10B981" filter="url(#glow)" />
          </svg>
        </div>

        {/* ─── 3. Foreground Hero Content ────────────────────────────── */}
        <div className="relative z-20 max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-between py-8 sm:py-12">
          
          {/* Top Bar: Live Journey Stream Mode & Status Pills */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* Live Indicator Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-teal-500/40 shadow-lg text-xs font-semibold">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-emerald-400 tracking-wide">LIVE GLOBAL JOURNEY RADAR</span>
              <span className="text-slate-400">|</span>
              <span className="text-slate-200 hidden sm:inline">12,480+ Patients Guided to India</span>
            </div>

            {/* Screensaver / Ambient Controls */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="px-3 py-1.5 rounded-xl bg-slate-900/80 backdrop-blur-md border border-slate-700/80 text-xs text-slate-300 hover:text-white flex items-center gap-1.5 transition shadow"
                title={isAutoPlaying ? 'Pause patient stream' : 'Auto-play patient stream'}
              >
                {isAutoPlaying ? <Pause className="w-3.5 h-3.5 text-teal-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
                <span className="hidden sm:inline">{isAutoPlaying ? 'Pause Radar' : 'Resume'}</span>
              </button>

              <button
                type="button"
                onClick={() => setIsScreensaverMode(!isScreensaverMode)}
                className={`px-3 py-1.5 rounded-xl backdrop-blur-md border text-xs font-semibold flex items-center gap-1.5 transition shadow ${
                  isScreensaverMode
                    ? 'bg-teal-500 text-slate-950 border-teal-400 shadow-teal-500/30'
                    : 'bg-slate-900/80 border-slate-700 text-slate-200 hover:border-teal-500/60'
                }`}
              >
                {isScreensaverMode ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5 text-teal-400" />}
                <span>{isScreensaverMode ? 'Standard View' : 'Screensaver View'}</span>
              </button>
            </div>
          </div>

          {/* Center Main Stage */}
          <div className="grid lg:grid-cols-12 gap-8 items-end my-auto pt-4 pb-2">
            
            {/* Left Column: Slogan, Title & Key Actions */}
            <div className={`lg:col-span-7 space-y-5 transition-all duration-500 ${
              isScreensaverMode ? 'opacity-30 hover:opacity-100' : 'opacity-100'
            }`}>
              
              {/* Slogan with official teal curved underline accent */}
              <div className="space-y-1">
                <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-teal-400 block drop-shadow">
                  Better Care. Brighter Journeys.
                </span>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-none drop-shadow-md">
                  Healthcare should <br />
                  <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-cyan-200 to-white">
                    have no borders.
                    <svg className="absolute -bottom-2 left-0 w-full h-3 text-teal-400" viewBox="0 0 260 12" fill="none">
                      <path d="M2 8C70 2 190 2 258 8" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
                    </svg>
                  </span>
                </h1>
              </div>

              <p className="text-sm sm:text-base text-slate-200 max-w-xl leading-relaxed drop-shadow bg-slate-950/40 backdrop-blur-sm p-3 rounded-2xl border border-white/10">
                Thousands travel from across the globe to India every month for world-class surgeries, living-donor organ transplants, and advanced robotic care at <strong>70% to 85% lower costs</strong> in JCI/NABH accredited hospital centres.
              </p>

              {/* Direct CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="/start-journey"
                  className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-teal-500 via-emerald-500 to-teal-600 hover:from-teal-600 hover:to-emerald-700 text-white font-extrabold text-sm shadow-xl shadow-teal-500/25 flex items-center gap-2 transform hover:-translate-y-0.5 transition-all"
                >
                  <Plane className="w-4 h-4" />
                  <span>Start Your Medical Journey</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/find-treatment"
                  className="px-5 py-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-white font-bold text-sm border border-slate-700/80 backdrop-blur-md transition flex items-center gap-2"
                >
                  <Building2 className="w-4 h-4 text-teal-400" />
                  <span>Explore Treatments & Costs</span>
                </Link>
              </div>

              {/* 4 Mini Trust Indicators */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                {[
                  { label: '70–85% Savings', sub: 'in USD vs US/UK/UAE' },
                  { label: '50+ JCI Hospitals', sub: 'Apollo, Fortis, Max' },
                  { label: '48h Medical Visa', sub: 'Fast-Track VIL Desk' },
                  { label: '24/7 Coordinator', sub: 'Airport-to-Bedside' },
                ].map((pill) => (
                  <div
                    key={pill.label}
                    className="p-2.5 rounded-xl bg-slate-900/75 border border-white/10 backdrop-blur-md shadow-sm"
                  >
                    <div className="text-xs font-bold text-teal-300">{pill.label}</div>
                    <div className="text-[10px] text-slate-400">{pill.sub}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: "Screensaver" Live Patient Story Card */}
            <div className="lg:col-span-5">
              <div className="bg-slate-900/95 border border-teal-500/40 rounded-3xl p-5 sm:p-6 shadow-2xl backdrop-blur-xl space-y-4 animate-fadeIn">
                
                {/* Header of the Card */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{currentPatient.flag}</span>
                    <div>
                      <div className="text-xs font-extrabold text-white flex items-center gap-1.5">
                        <span>{currentPatient.name}</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {currentPatient.city}, {currentPatient.country} ➔ India
                      </div>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-teal-500/15 text-teal-300 border border-teal-500/30">
                    {currentPatient.status}
                  </span>
                </div>

                {/* Procedure & Destination */}
                <div className="space-y-1">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Procedure & Hospital
                  </div>
                  <div className="text-sm font-black text-white">
                    {currentPatient.procedure}
                  </div>
                  <div className="text-xs text-teal-300 flex items-center gap-1 font-semibold">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>{currentPatient.hospital}</span>
                  </div>
                </div>

                {/* Transparent Financial Savings Comparison */}
                <div className="grid grid-cols-3 gap-2 bg-slate-950/80 p-3 rounded-2xl border border-slate-800 text-center">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Home Country</span>
                    <span className="text-xs font-bold text-slate-300 line-through">
                      {currentPatient.costAtHome}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-teal-400 block">Cost in India</span>
                    <span className="text-sm font-black text-emerald-400">
                      {currentPatient.costInIndia}
                    </span>
                  </div>
                  <div className="bg-emerald-500/10 rounded-xl p-1 border border-emerald-500/20">
                    <span className="text-[10px] font-extrabold text-emerald-300 block">Saved USD</span>
                    <span className="text-xs font-black text-emerald-400">
                      {currentPatient.savings}
                    </span>
                  </div>
                </div>

                {/* Patient Navigation Dots */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex gap-1.5">
                    {livePatientJourneys.map((p, idx) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setActivePatientIndex(idx)}
                        className={`h-1.5 rounded-full transition-all ${
                          idx === activePatientIndex
                            ? 'w-6 bg-teal-400'
                            : 'w-2 bg-slate-700 hover:bg-slate-500'
                        }`}
                        title={`View ${p.name}`}
                      />
                    ))}
                  </div>

                  <Link
                    href={`/start-journey?treatment=${encodeURIComponent(currentPatient.procedure)}`}
                    className="text-xs font-bold text-teal-400 hover:text-teal-300 flex items-center gap-1 transition"
                  >
                    <span>Get Similar Estimate</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Live Corridor Ticker */}
          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-300 overflow-hidden">
            <div className="flex items-center gap-2 whitespace-nowrap">
              <span className="font-bold text-teal-400 uppercase tracking-wider">Flight Corridors:</span>
              <span className="text-slate-400">Daily direct medical flights from Muscat, Dubai, London, Nairobi, Tashkent & Dhaka.</span>
            </div>
            <div className="hidden md:flex items-center gap-4 text-slate-400">
              <span>✈️ Average 3–7h Flight</span>
              <span>•</span>
              <span>🏥 50+ JCI/NABH Hospitals</span>
              <span>•</span>
              <span>🛡️ 100% HIPAA & DPDP Compliant</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
