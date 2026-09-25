'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ShieldCheck,
  FileText,
  Stethoscope,
  Plane,
  Building2,
  Heart,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Users,
  Play,
  Pause,
  ChevronDown,
  ChevronUp,
  MapPin,
  Check
} from 'lucide-react';

interface Milestone {
  step: string;
  stepNum: number;
  title: string;
  shortDesc: string;
  bullets: string[];
  image: string;
  imageAlt: string;
  statusTag: string;
  colorName: string;
  badgeBg: string;
  badgeShadow: string;
  tagBg: string;
  tagText: string;
  tagBorder: string;
  activeBorder: string;
  activeGlow: string;
  accentText: string;
}

const milestones: Milestone[] = [
  {
    step: '01',
    stepNum: 1,
    title: 'Register & Verify',
    shortDesc: 'Create your GoHealthTrip profile and securely verify your identity.',
    bullets: [
      'Create your profile',
      'Identity verification',
      'Secure onboarding'
    ],
    image: '/images/carepath-step-1.png',
    imageAlt: 'Registration portal on laptop with passport verification',
    statusTag: 'REGISTERED',
    colorName: 'blue',
    badgeBg: 'bg-blue-600',
    badgeShadow: 'shadow-blue-500/30',
    tagBg: 'bg-blue-50',
    tagText: 'text-blue-700',
    tagBorder: 'border-blue-200',
    activeBorder: 'border-blue-500 ring-2 ring-blue-500/20',
    activeGlow: 'shadow-blue-500/15',
    accentText: 'text-blue-600',
  },
  {
    step: '02',
    stepNum: 2,
    title: 'Upload Medical Reports',
    shortDesc: 'Share your medical information securely with the GoHealthTrip care team.',
    bullets: [
      'Upload prescriptions and reports',
      'Organize medical documents',
      'Prepare your case for clinical review'
    ],
    image: '/images/carepath-step-2.png',
    imageAlt: 'Medical reports and MRI scan cloud upload interface',
    statusTag: 'MEDICAL REVIEW',
    colorName: 'teal',
    badgeBg: 'bg-teal-600',
    badgeShadow: 'shadow-teal-500/30',
    tagBg: 'bg-teal-50',
    tagText: 'text-teal-700',
    tagBorder: 'border-teal-200',
    activeBorder: 'border-teal-500 ring-2 ring-teal-500/20',
    activeGlow: 'shadow-teal-500/15',
    accentText: 'text-teal-600',
  },
  {
    step: '03',
    stepNum: 3,
    title: 'Consult & Plan',
    shortDesc: 'Connect with suitable doctors and hospitals based on your medical needs.',
    bullets: [
      'Medical case review',
      'Doctor consultation',
      'Treatment planning',
      'Preliminary estimate'
    ],
    image: '/images/carepath-step-3.png',
    imageAlt: 'Doctor video consultation screen with treatment planning',
    statusTag: 'DOCTOR CONSULTATION',
    colorName: 'purple',
    badgeBg: 'bg-purple-600',
    badgeShadow: 'shadow-purple-500/30',
    tagBg: 'bg-purple-50',
    tagText: 'text-purple-700',
    tagBorder: 'border-purple-200',
    activeBorder: 'border-purple-500 ring-2 ring-purple-500/20',
    activeGlow: 'shadow-purple-500/15',
    accentText: 'text-purple-600',
  },
  {
    step: '04',
    stepNum: 4,
    title: 'Confirm & Prepare',
    shortDesc: 'Once your treatment plan is confirmed, prepare for your journey to India.',
    bullets: [
      'Confirm treatment plan',
      'Visa assistance',
      'Travel coordination',
      'Stay and logistics support'
    ],
    image: '/images/carepath-step-4.png',
    imageAlt: 'Approved medical visa and airport departure documents',
    statusTag: 'VISA & PREPARATION',
    colorName: 'rose',
    badgeBg: 'bg-rose-600',
    badgeShadow: 'shadow-rose-500/30',
    tagBg: 'bg-rose-50',
    tagText: 'text-rose-700',
    tagBorder: 'border-rose-200',
    activeBorder: 'border-rose-500 ring-2 ring-rose-500/20',
    activeGlow: 'shadow-rose-500/15',
    accentText: 'text-rose-600',
  },
  {
    step: '05',
    stepNum: 5,
    title: 'Travel & Treatment',
    shortDesc: 'Arrive in India and receive coordinated support throughout your treatment journey.',
    bullets: [
      'Airport pickup',
      'Hospital coordination',
      'Admission support',
      'Treatment and family assistance'
    ],
    image: '/images/carepath-step-5.png',
    imageAlt: 'Quaternary hospital in India with airport patient liaison',
    statusTag: 'ON-GROUND CARE',
    colorName: 'sky',
    badgeBg: 'bg-sky-600',
    badgeShadow: 'shadow-sky-500/30',
    tagBg: 'bg-sky-50',
    tagText: 'text-sky-700',
    tagBorder: 'border-sky-200',
    activeBorder: 'border-sky-500 ring-2 ring-sky-500/20',
    activeGlow: 'shadow-sky-500/15',
    accentText: 'text-sky-600',
  },
  {
    step: '06',
    stepNum: 6,
    title: 'Recover & Return',
    shortDesc: 'Continue your recovery with coordinated post-treatment support and return home with confidence.',
    bullets: [
      'Post-treatment follow-up',
      'Local support',
      'Return travel coordination',
      'Continued care coordination'
    ],
    image: '/images/carepath-step-6.png',
    imageAlt: 'Happy recovering family with daughter and luggage at airport',
    statusTag: 'RECOVERY & RETURN',
    colorName: 'amber',
    badgeBg: 'bg-amber-600',
    badgeShadow: 'shadow-amber-500/30',
    tagBg: 'bg-amber-50',
    tagText: 'text-amber-800',
    tagBorder: 'border-amber-200',
    activeBorder: 'border-amber-500 ring-2 ring-amber-500/20',
    activeGlow: 'shadow-amber-500/15',
    accentText: 'text-amber-600',
  },
];

export default function CarePathJourney() {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [expandedMobileSteps, setExpandedMobileSteps] = useState<Record<number, boolean>>({
    1: true,
  });

  // Auto-cycle through milestones like a live flight radar tracker
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev % 6) + 1);
    }, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const handleStepClick = (stepNum: number) => {
    setActiveStep(stepNum);
    setIsAutoPlaying(false);
  };

  const toggleMobileStep = (stepNum: number) => {
    setActiveStep(stepNum);
    setIsAutoPlaying(false);
    setExpandedMobileSteps((prev) => ({
      ...prev,
      [stepNum]: !prev[stepNum],
    }));
  };

  const currentMilestone = milestones.find((m) => m.stepNum === activeStep) || milestones[0];

  return (
    <section
      id="how-it-works"
      aria-label="GoHealthTrip CarePath Patient Journey"
      className="relative py-20 bg-gradient-to-b from-white via-slate-50/70 to-white overflow-hidden border-b border-slate-100"
    >
      {/* Subtle world map & ambient global travel backdrop */}
      <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-multiply overflow-hidden">
        <Image
          src="/images/gohealthtrip-banner.png"
          alt=""
          fill
          quality={70}
          className="object-cover object-top filter blur-[3px] scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/85 to-white" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">

        {/* ─── 1. SECTION HEADER ────────────────────────────────────── */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200/80 text-teal-800 text-xs font-extrabold tracking-[0.25em] uppercase mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>THE HAPPY PATH</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            GoHealthTrip{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-teal-600 to-indigo-600">
              CarePath™
            </span>
          </h2>

          <p className="mt-3 text-lg sm:text-xl font-bold text-slate-700">
            Your journey to better care, coordinated every step of the way.
          </p>

          <p className="mt-2 text-sm sm:text-base text-slate-500 max-w-2xl mx-auto leading-relaxed">
            From your first medical report to treatment, recovery, and the journey home, GoHealthTrip helps coordinate every important step.
          </p>
        </div>

        {/* ─── 2. FLOATING JOURNEY STATUS TRACKER ────────────────────── */}
        <div className="mb-10 max-w-3xl mx-auto">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3 sm:p-4 border border-slate-200 shadow-lg shadow-slate-200/50 flex flex-wrap items-center justify-between gap-3">
            {/* Active stage info */}
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded-lg text-xs font-black tracking-wider uppercase bg-slate-900 text-white shadow-sm">
                STAGE {currentMilestone.step} / 06
              </span>
              <div>
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  CURRENT JOURNEY STAGE
                </div>
                <div className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
                  <span className={currentMilestone.accentText}>●</span>
                  <span>{currentMilestone.statusTag}</span>
                  <span className="text-slate-400 font-normal hidden sm:inline">
                    — {currentMilestone.title}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Milestone Jump Buttons & Play/Pause */}
            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                {milestones.map((m) => (
                  <button
                    key={m.step}
                    type="button"
                    onClick={() => handleStepClick(m.stepNum)}
                    className={`w-7 h-7 rounded-lg text-xs font-extrabold transition-all flex items-center justify-center ${
                      m.stepNum === activeStep
                        ? `${m.badgeBg} text-white shadow-md scale-105`
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
                    }`}
                    title={`Jump to step ${m.step}: ${m.title}`}
                    aria-label={`Step ${m.step}: ${m.title}`}
                  >
                    {m.step}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition"
                title={isAutoPlaying ? 'Pause journey auto-cycle' : 'Resume auto-cycle'}
                aria-label={isAutoPlaying ? 'Pause journey auto-cycle' : 'Resume auto-cycle'}
              >
                {isAutoPlaying ? (
                  <Pause className="w-3.5 h-3.5 text-teal-600" />
                ) : (
                  <Play className="w-3.5 h-3.5 text-emerald-600" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ─── 3. DESKTOP WIDE JOURNEY SERPENTINE ROUTE (>= 1024px) ──── */}
        <div className="hidden lg:block relative mb-14">

          {/* SVG Flight Lines Overlays connecting cards */}
          <div className="absolute inset-0 pointer-events-none z-0">
            {/* Top row connectors: 01 -> 02, and 02 -> 03 */}
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 680">
              <defs>
                <linearGradient id="flightTrailTop" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#2563EB" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#0D9488" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.8" />
                </linearGradient>

                <linearGradient id="flightTrailTurn" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#E11D48" stopOpacity="0.8" />
                </linearGradient>

                <linearGradient id="flightTrailBot" x1="100%" y1="0%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#E11D48" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#0284C7" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#D97706" stopOpacity="0.8" />
                </linearGradient>
              </defs>

              {/* Segment 1: from Card 1 right edge to Card 2 left edge */}
              <line
                x1="380"
                y1="160"
                x2="420"
                y2="160"
                stroke="url(#flightTrailTop)"
                strokeWidth="2.5"
                strokeDasharray="6 4"
                className="animate-flight-dash"
              />

              {/* Segment 2: from Card 2 right edge to Card 3 left edge */}
              <line
                x1="780"
                y1="160"
                x2="820"
                y2="160"
                stroke="url(#flightTrailTop)"
                strokeWidth="2.5"
                strokeDasharray="6 4"
                className="animate-flight-dash"
              />

              {/* Segment 3: Serpentine Turn on the right from Card 3 down into Card 4 */}
              <path
                d="M 1160 160 C 1220 160, 1220 520, 1160 520"
                fill="none"
                stroke="url(#flightTrailTurn)"
                strokeWidth="2.5"
                strokeDasharray="6 4"
                className="animate-flight-dash"
              />

              {/* Segment 4: from Card 4 left edge to Card 5 right edge (going backwards) */}
              <line
                x1="820"
                y1="520"
                x2="780"
                y2="520"
                stroke="url(#flightTrailBot)"
                strokeWidth="2.5"
                strokeDasharray="6 4"
                className="animate-flight-dash-reverse"
              />

              {/* Segment 5: from Card 5 left edge to Card 6 right edge (going backwards) */}
              <line
                x1="420"
                y1="520"
                x2="380"
                y2="520"
                stroke="url(#flightTrailBot)"
                strokeWidth="2.5"
                strokeDasharray="6 4"
                className="animate-flight-dash-reverse"
              />
            </svg>
          </div>

          {/* Serpentine 2-Row Grid:
              Row 1: [01: Register & Verify] → [02: Upload Reports] → [03: Consult & Plan]
              Turn ↓
              Row 2: [06: Recover & Return] ← [05: Travel & Treatment] ← [04: Confirm & Prepare]
          */}
          <div className="grid grid-cols-3 gap-6 relative z-10">

            {/* ─── ROW 1: 01, 02, 03 ─── */}
            {[milestones[0], milestones[1], milestones[2]].map((m, idx) => {
              const isSelected = activeStep === m.stepNum;
              return (
                <div
                  key={m.step}
                  onMouseEnter={() => handleStepClick(m.stepNum)}
                  className={`group relative bg-white rounded-3xl overflow-hidden border transition-all duration-300 shadow-sm flex flex-col justify-between ${
                    isSelected
                      ? `${m.activeBorder} shadow-xl ${m.activeGlow} -translate-y-1.5`
                      : 'border-slate-200/90 hover:border-slate-300 hover:shadow-md'
                  }`}
                  role="button"
                  tabIndex={0}
                  aria-expanded={isSelected}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleStepClick(m.stepNum);
                    }
                  }}
                >
                  {/* Top Artwork Header */}
                  <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                    <Image
                      src={m.image}
                      alt={m.imageAlt}
                      fill
                      quality={90}
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 1200px) 33vw, 400px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/10" />

                    {/* Milestone Number Badge */}
                    <div
                      className={`absolute top-3 left-3 w-10 h-10 rounded-2xl ${m.badgeBg} text-white font-black text-sm flex items-center justify-center shadow-lg ${m.badgeShadow} ring-2 ring-white`}
                    >
                      {m.step}
                    </div>

                    {/* Status Pill Badge */}
                    <div
                      className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${m.tagBg} ${m.tagText} border ${m.tagBorder} backdrop-blur-sm shadow-sm`}
                    >
                      {m.statusTag}
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className="text-lg font-black text-slate-900 group-hover:text-sky-700 transition">
                        {m.title}
                      </h3>
                      <p className="mt-1 text-xs text-slate-500 leading-relaxed min-h-[36px]">
                        {m.shortDesc}
                      </p>
                    </div>

                    {/* Checklist */}
                    <div className="pt-3 border-t border-slate-100 space-y-2">
                      {m.bullets.map((b, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Connecting Flight Badge to next card (for 01 and 02) */}
                  {idx < 2 && (
                    <div className="absolute -right-3 top-20 z-20 w-6 h-6 rounded-full bg-white border border-slate-300 shadow-md flex items-center justify-center text-sky-600">
                      <Plane className="w-3 h-3 transform rotate-45" />
                    </div>
                  )}

                  {/* Curve Down Indicator on Card 03 */}
                  {idx === 2 && (
                    <div className="absolute -right-3 bottom-10 z-20 px-2 py-1 rounded-full bg-purple-600 text-white text-[9px] font-bold shadow-md flex items-center gap-1">
                      <span>NEXT</span>
                      <ArrowRight className="w-2.5 h-2.5 transform rotate-90" />
                    </div>
                  )}
                </div>
              );
            })}

            {/* ─── ROW 2: 06 (Left), 05 (Center), 04 (Right) ─── */}
            {[milestones[5], milestones[4], milestones[3]].map((m, idx) => {
              const isSelected = activeStep === m.stepNum;
              return (
                <div
                  key={m.step}
                  onMouseEnter={() => handleStepClick(m.stepNum)}
                  className={`group relative bg-white rounded-3xl overflow-hidden border transition-all duration-300 shadow-sm flex flex-col justify-between ${
                    isSelected
                      ? `${m.activeBorder} shadow-xl ${m.activeGlow} -translate-y-1.5`
                      : 'border-slate-200/90 hover:border-slate-300 hover:shadow-md'
                  }`}
                  role="button"
                  tabIndex={0}
                  aria-expanded={isSelected}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleStepClick(m.stepNum);
                    }
                  }}
                >
                  {/* Top Artwork Header */}
                  <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                    <Image
                      src={m.image}
                      alt={m.imageAlt}
                      fill
                      quality={90}
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 1200px) 33vw, 400px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/10" />

                    {/* Milestone Number Badge */}
                    <div
                      className={`absolute top-3 left-3 w-10 h-10 rounded-2xl ${m.badgeBg} text-white font-black text-sm flex items-center justify-center shadow-lg ${m.badgeShadow} ring-2 ring-white`}
                    >
                      {m.step}
                    </div>

                    {/* Status Pill Badge */}
                    <div
                      className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${m.tagBg} ${m.tagText} border ${m.tagBorder} backdrop-blur-sm shadow-sm`}
                    >
                      {m.statusTag}
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className="text-lg font-black text-slate-900 group-hover:text-sky-700 transition">
                        {m.title}
                      </h3>
                      <p className="mt-1 text-xs text-slate-500 leading-relaxed min-h-[36px]">
                        {m.shortDesc}
                      </p>
                    </div>

                    {/* Checklist */}
                    <div className="pt-3 border-t border-slate-100 space-y-2">
                      {m.bullets.map((b, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Leftward flight connector arrow badge (on 05 and 04) */}
                  {idx < 2 && (
                    <div className="absolute -left-3 top-20 z-20 w-6 h-6 rounded-full bg-white border border-slate-300 shadow-md flex items-center justify-center text-sky-600">
                      <ArrowLeft className="w-3 h-3 text-sky-600" />
                    </div>
                  )}
                </div>
              );
            })}

          </div>
        </div>

        {/* ─── 4. TABLET & MOBILE CONTINUOUS VERTICAL ROUTE (< 1024px) ── */}
        <div className="lg:hidden relative mb-12">
          {/* Continuous vertical dashed route line down the left side */}
          <div className="absolute left-6 top-8 bottom-8 w-0.5 border-l-2 border-dashed border-teal-400/80 z-0" />

          <div className="space-y-6 relative z-10">
            {milestones.map((m) => {
              const isSelected = activeStep === m.stepNum;
              const isExpanded = expandedMobileSteps[m.stepNum] ?? false;

              return (
                <div
                  key={m.step}
                  className={`bg-white rounded-2xl border transition-all shadow-sm overflow-hidden ml-2 sm:ml-4 pl-10 sm:pl-12 relative ${
                    isSelected
                      ? `${m.activeBorder} shadow-lg ${m.activeGlow}`
                      : 'border-slate-200'
                  }`}
                >
                  {/* Floating Left Milestone Pin on the vertical route */}
                  <button
                    type="button"
                    onClick={() => toggleMobileStep(m.stepNum)}
                    className={`absolute -left-4 top-4 w-9 h-9 rounded-2xl ${m.badgeBg} text-white font-black text-xs flex items-center justify-center shadow-md ring-4 ring-white z-10`}
                    aria-label={`Step ${m.step}: ${m.title}`}
                  >
                    {m.step}
                  </button>

                  {/* Mobile Card Header */}
                  <div
                    onClick={() => toggleMobileStep(m.stepNum)}
                    className="p-4 cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                    role="button"
                    tabIndex={0}
                    aria-expanded={isExpanded}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        toggleMobileStep(m.stepNum);
                      }
                    }}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${m.tagBg} ${m.tagText} border ${m.tagBorder}`}
                        >
                          {m.statusTag}
                        </span>
                      </div>
                      <h3 className="text-base font-black text-slate-900">{m.title}</h3>
                      <p className="text-xs text-slate-500 mt-0.5">{m.shortDesc}</p>
                    </div>

                    {/* Touch toggle button (>= 44px) */}
                    <div className="w-11 h-11 rounded-xl bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-500 flex-shrink-0 self-end sm:self-center transition">
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-teal-600" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                      )}
                    </div>
                  </div>

                  {/* Mobile Expanded Content */}
                  {isExpanded && (
                    <div className="px-4 pb-4 pt-1 border-t border-slate-100 space-y-3 animate-fadeIn">
                      {/* Thumbnail illustration */}
                      <div className="relative h-32 w-full rounded-xl overflow-hidden bg-slate-100">
                        <Image
                          src={m.image}
                          alt={m.imageAlt}
                          fill
                          quality={85}
                          className="object-cover object-center"
                          sizes="(max-width: 768px) 100vw, 400px"
                        />
                      </div>

                      {/* Checklist */}
                      <div className="space-y-1.5 pt-1">
                        {m.bullets.map((b, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                            <span>{b}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ─── 5. FINAL PREMIUM CTA PANEL ───────────────────────────── */}
        <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/90 shadow-xl shadow-slate-200/60 overflow-hidden">
          {/* Subtle background flight contrail graphic */}
          <div className="absolute right-0 bottom-0 pointer-events-none opacity-20 hidden md:block">
            <svg width="400" height="150" viewBox="0 0 400 150" fill="none">
              <path
                d="M 10 140 C 150 140, 250 80, 380 20"
                stroke="#0EA5E9"
                strokeWidth="2.5"
                strokeDasharray="6 4"
              />
            </svg>
          </div>

          <div className="grid lg:grid-cols-12 gap-6 items-center">
            {/* Left: Happy recovering family thumbnail */}
            <div className="lg:col-span-3 flex justify-center lg:justify-start">
              <div className="relative w-48 sm:w-56 h-28 sm:h-32 rounded-2xl overflow-hidden shadow-md border-2 border-white ring-1 ring-slate-200">
                <Image
                  src="/images/carepath-cta-family.png"
                  alt="Happy family returning home after successful medical journey"
                  fill
                  quality={90}
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 240px, 300px"
                />
              </div>
            </div>

            {/* Center: Headline & Direct CTA Button */}
            <div className="lg:col-span-6 text-center lg:text-left space-y-3">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Ready to begin your healthcare journey?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
                Tell us about your healthcare needs and let our team help coordinate the next steps.
              </p>
              <div className="pt-1">
                <Link
                  href="/start-journey"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-sky-500 via-teal-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-sky-500/25 hover:shadow-xl transition-all transform hover:-translate-y-0.5"
                >
                  <span>Start Your Healthcare Journey</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right: 3 Trust Badges & Airplane Icon */}
            <div className="lg:col-span-3 flex lg:flex-col sm:flex-row flex-wrap items-center justify-center lg:items-end gap-3 text-xs font-bold text-slate-700 border-t lg:border-t-0 lg:border-l border-slate-100 pt-4 lg:pt-0 lg:pl-6">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <span>Secure</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
                  <Users className="w-3.5 h-3.5" />
                </div>
                <span>Guided</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
                  <Heart className="w-3.5 h-3.5" />
                </div>
                <span>End-to-End Support</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
