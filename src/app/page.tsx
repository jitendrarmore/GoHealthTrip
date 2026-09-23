'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import {
  HeartPulse,
  ShieldCheck,
  Stethoscope,
  Award,
  Sparkles,
  ArrowRight,
  Compass,
  CheckCircle2,
  Star,
  Globe2,
  FileText,
  Plane,
  Building2,
  CreditCard,
  Phone,
  BadgeCheck,
  TrendingUp,
  Users,
  Clock3,
  ChevronRight,
  Quote,
  PlayCircle,
  Menu,
  X,
  Globe,
  Zap,
  Lock,
} from 'lucide-react';

/* ─── Animated Counter ──────────────────────────────── */
function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1800;
          const steps = 60;
          const inc = target / steps;
          let cur = 0;
          const timer = setInterval(() => {
            cur = Math.min(cur + inc, target);
            setCount(Math.floor(cur));
            if (cur >= target) clearInterval(timer);
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ─── Data ──────────────────────────────────────────── */
const specialties = [
  {
    name: 'Cardiology & Cardiac Surgery',
    desc: 'CABG, Valve Replacement, TAVR & Pediatric Cardiac Care by India\'s top cardiologists.',
    icon: HeartPulse,
    color: 'from-red-500 to-rose-600',
    bg: 'bg-red-50',
    text: 'text-red-600',
    border: 'border-t-red-500',
    tag: 'Most Requested',
  },
  {
    name: 'Oncology & Cancer Care',
    desc: 'Surgical, Radiation (CyberKnife/LINAC), Immunotherapy & Bone Marrow Transplants.',
    icon: Sparkles,
    color: 'from-violet-500 to-purple-600',
    bg: 'bg-violet-50',
    text: 'text-violet-600',
    border: 'border-t-violet-500',
    tag: '',
  },
  {
    name: 'Orthopedics & Joint Care',
    desc: 'Robotic-assisted Knee & Hip Replacement, Spine Fusion & Sports Medicine.',
    icon: Stethoscope,
    color: 'from-sky-500 to-cyan-600',
    bg: 'bg-sky-50',
    text: 'text-sky-600',
    border: 'border-t-sky-500',
    tag: '',
  },
  {
    name: 'Neurosurgery & Spine',
    desc: 'Minimally invasive neuro-navigation, Gamma Knife & complex spinal reconstruction.',
    icon: Compass,
    color: 'from-amber-500 to-orange-600',
    bg: 'bg-amber-50',
    text: 'text-amber-600',
    border: 'border-t-amber-500',
    tag: '',
  },
  {
    name: 'Organ Transplants',
    desc: 'Living-donor Liver & Kidney Transplants with comprehensive post-op care plans.',
    icon: Award,
    color: 'from-emerald-500 to-teal-600',
    bg: 'bg-emerald-50',
    text: 'text-emerald-600',
    border: 'border-t-emerald-500',
    tag: '',
  },
  {
    name: 'Reproductive & IVF',
    desc: 'Advanced ICSI, PGT-A genetic screening & fertility preservation programmes.',
    icon: ShieldCheck,
    color: 'from-pink-500 to-rose-500',
    bg: 'bg-pink-50',
    text: 'text-pink-600',
    border: 'border-t-pink-500',
    tag: '',
  },
];

const steps = [
  {
    num: '01',
    title: 'Secure Case Submission',
    desc: 'Share diagnostic reports and identity documents via our encrypted, DPDP-compliant portal.',
    icon: FileText,
    color: 'bg-sky-600',
  },
  {
    num: '02',
    title: 'AI-Powered Clinical Review',
    desc: 'Indian superspecialists review your case, supported by AI document extraction and clinical summarisation.',
    icon: Sparkles,
    color: 'bg-violet-600',
  },
  {
    num: '03',
    title: 'Transparent Hospital Proposals',
    desc: 'Receive detailed, itemised quotations from JCI/NABH-accredited hospitals within 48 hours.',
    icon: Building2,
    color: 'bg-emerald-600',
  },
  {
    num: '04',
    title: 'Visa & Travel Facilitation',
    desc: 'Official Hospital VIL letter, e-Medical Visa guidance, hotel booking and airport transfers.',
    icon: Plane,
    color: 'bg-amber-600',
  },
  {
    num: '05',
    title: 'Dedicated On-Ground Coordination',
    desc: 'Personal care coordinator, hospital admission, interpreter services and daily family updates.',
    icon: Users,
    color: 'bg-rose-600',
  },
  {
    num: '06',
    title: 'Safe Return & Remote Follow-Up',
    desc: 'Complete discharge dossier and post-op tele-consultations with your treating specialist.',
    icon: Globe2,
    color: 'bg-teal-600',
  },
];

const testimonials = [
  {
    name: 'Ali Al-Balushi',
    country: 'Muscat, Oman',
    flag: '🇴🇲',
    treatment: 'Cardiac Bypass Surgery — Medanta, Gurugram',
    quote: 'GoHealthTrip made what seemed impossible — travelling to India for heart surgery — feel completely manageable. My coordinator was with me every step of the way.',
    rating: 5,
    savings: '68% cost savings vs. UAE',
  },
  {
    name: 'Amara Diallo',
    country: 'Dakar, Senegal',
    flag: '🇸🇳',
    treatment: 'Kidney Transplant — Apollo Hospitals, Delhi',
    quote: 'From document submission to post-op tele-consultation, every detail was handled professionally. I felt safe and informed throughout my 6-week journey.',
    rating: 5,
    savings: '72% cost savings vs. France',
  },
  {
    name: 'Natalia Ivanova',
    country: 'Moscow, Russia',
    flag: '🇷🇺',
    treatment: 'IVF & Genetic Screening — Max Healthcare',
    quote: 'We had tried for years. GoHealthTrip connected us with the right specialists and handled every visa and travel detail. We\'re now proud parents.',
    rating: 5,
    savings: '55% cost savings vs. Germany',
  },
];

const trustBadges = [
  { label: 'JCI Accredited', sub: 'Hospital Network' },
  { label: 'NABH Certified', sub: 'Quality Standards' },
  { label: 'ABDM Compliant', sub: 'Digital Health ID' },
  { label: 'DPDP Act 2023', sub: 'Data Privacy' },
];

const hospitals = [
  { name: 'Apollo Hospitals', tag: 'JCI · 30+ Years', color: 'text-sky-700' },
  { name: 'Medanta – The Medicity', tag: 'JCI · Superspecialty', color: 'text-violet-700' },
  { name: 'Fortis Memorial', tag: 'NABH · FMRI', color: 'text-emerald-700' },
  { name: 'Max Healthcare', tag: 'JCI · 17 Hospitals', color: 'text-amber-700' },
  { name: 'Manipal Hospitals', tag: 'NABH · Pan-India', color: 'text-rose-700' },
];

/* ─── Main Page ─────────────────────────────────────── */
export default function HomePage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('EN');
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((p) => (p + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const navLinks = [
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Specialties', href: '#specialties' },
    { name: 'Hospitals', href: '#hospitals' },
    { name: 'Find Treatment', href: '/find-treatment' },
    { name: 'Demo Journey', href: '/demo-case' },
  ];

  return (
    <main className="min-h-screen bg-white overflow-x-hidden">

      {/* ══ HEADER ══════════════════════════════════════════ */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-slate-100'
          : 'bg-white/90 backdrop-blur-sm border-b border-slate-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white font-black text-xl shadow-lg group-hover:scale-105 transition-transform">
                G
              </div>
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="font-extrabold text-lg text-slate-900 tracking-tight">GoHealthTrip</span>
                  <span className="text-[9px] font-bold text-white bg-sky-500 px-1.5 py-0.5 rounded uppercase tracking-wider">India</span>
                </div>
                <p className="text-[10px] text-slate-400 font-medium leading-none">International Patient Facilitation</p>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center space-x-7 text-sm font-semibold text-slate-600">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="nav-link-underline hover:text-sky-600 transition-colors py-1"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Right CTAs */}
            <div className="hidden sm:flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 bg-slate-50">
                <Globe className="w-3.5 h-3.5 text-slate-400" />
                <select
                  value={currentLang}
                  onChange={(e) => setCurrentLang(e.target.value)}
                  aria-label="Language selection"
                  className="bg-transparent border-none outline-none cursor-pointer"
                >
                  <option value="EN">English</option>
                  <option value="AR">العربية</option>
                  <option value="SW">Kiswahili</option>
                  <option value="FR">Français</option>
                  <option value="RU">Русский</option>
                  <option value="BN">বাংলা</option>
                </select>
              </div>
              <Link
                href="/dashboard"
                className="px-3.5 py-2 text-xs font-semibold text-slate-700 border border-slate-200 hover:border-sky-300 hover:text-sky-700 rounded-lg transition"
              >
                Coordinator Portal
              </Link>
              <Link
                href="/start-journey"
                className="px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 rounded-lg shadow-md shadow-sky-200 hover:shadow-sky-300 transition-all flex items-center gap-1.5"
              >
                Start Treatment <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-slate-100 px-4 pt-2 pb-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-700 hover:bg-sky-50 hover:text-sky-700 transition"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-2 border-t border-slate-100">
              <Link
                href="/start-journey"
                onClick={() => setMobileOpen(false)}
                className="block w-full py-2.5 text-center text-sm font-bold text-white bg-gradient-to-r from-sky-500 to-indigo-600 rounded-lg shadow"
              >
                Start Treatment Journey
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* ══ HERO ════════════════════════════════════════════ */}
      <section className="relative overflow-hidden hero-mesh min-h-[88vh] flex items-center">
        {/* Decorative blobs */}
        <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-sky-500/10 blur-3xl pointer-events-none animate-float" />
        <div className="absolute bottom-20 left-10 w-80 h-80 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-teal-500/5 blur-3xl pointer-events-none" />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column */}
            <div className="text-center lg:text-left">
              {/* Eyebrow badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-sky-300 text-xs font-semibold uppercase tracking-wider mb-6 animate-fadeInUp">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
                JCI & NABH Accredited Hospital Network · Est. 2024
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight animate-fadeInUp delay-100">
                World-Class
                <br />
                <span className="gradient-text-animated">Medical Care</span>
                <br />
                <span className="text-slate-300">in India. Coordinated.</span>
              </h1>

              <p className="mt-6 text-slate-400 text-base lg:text-lg leading-relaxed max-w-lg animate-fadeInUp delay-200">
                We connect international patients with India's finest superspecialists and JCI-accredited hospitals — with transparent pricing, visa support, and a dedicated care coordinator by your side.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start animate-fadeInUp delay-300">
                <Link
                  href="/start-journey"
                  className="group inline-flex items-center justify-center gap-2 px-7 py-4 bg-gradient-to-r from-sky-400 to-indigo-500 hover:from-sky-500 hover:to-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-sky-500/30 hover:shadow-sky-500/50 transition-all text-sm"
                >
                  <Zap className="w-4 h-4" />
                  Start Your Treatment Journey
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/demo-case"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-white/10 hover:bg-white/15 text-white font-semibold border border-white/20 rounded-xl transition text-sm"
                >
                  <PlayCircle className="w-4 h-4 text-sky-300" />
                  View Live Demo Journey
                </Link>
              </div>

              {/* Trust micro-badges */}
              <div className="mt-8 flex flex-wrap gap-3 justify-center lg:justify-start animate-fadeInUp delay-400">
                {trustBadges.map((b) => (
                  <div key={b.label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/8 border border-white/10 text-xs text-slate-300">
                    <BadgeCheck className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span className="font-semibold text-white">{b.label}</span>
                    <span>· {b.sub}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column — Stats Cards */}
            <div className="animate-fadeIn delay-300">
              <div className="grid grid-cols-2 gap-4">
                {/* Stat 1 */}
                <div className="glass-card rounded-2xl p-5 text-center card-hover">
                  <div className="text-4xl font-black text-white mb-1">
                    <AnimatedCounter target={500} suffix="+" />
                  </div>
                  <p className="text-xs text-slate-300 font-medium">International Patients</p>
                  <div className="mt-2 flex justify-center">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                  </div>
                </div>

                {/* Stat 2 */}
                <div className="glass-card rounded-2xl p-5 text-center card-hover">
                  <div className="text-4xl font-black text-white mb-1">
                    <AnimatedCounter target={50} suffix="+" />
                  </div>
                  <p className="text-xs text-slate-300 font-medium">Accredited Hospitals</p>
                  <div className="mt-2 flex justify-center">
                    <Building2 className="w-4 h-4 text-sky-400" />
                  </div>
                </div>

                {/* Stat 3 */}
                <div className="glass-card rounded-2xl p-5 text-center card-hover">
                  <div className="text-4xl font-black text-white mb-1">
                    <AnimatedCounter target={7} suffix="" />
                  </div>
                  <p className="text-xs text-slate-300 font-medium">Countries Served</p>
                  <div className="mt-2 flex justify-center">
                    <Globe2 className="w-4 h-4 text-violet-400" />
                  </div>
                </div>

                {/* Stat 4 */}
                <div className="glass-card rounded-2xl p-5 text-center card-hover">
                  <div className="text-4xl font-black text-white mb-1">
                    <AnimatedCounter target={70} suffix="%" />
                  </div>
                  <p className="text-xs text-slate-300 font-medium">Avg. Cost Savings</p>
                  <div className="mt-2 flex justify-center">
                    <CreditCard className="w-4 h-4 text-amber-400" />
                  </div>
                </div>

                {/* Wide stat */}
                <div className="col-span-2 glass-card rounded-2xl p-5 flex items-center justify-between card-hover">
                  <div>
                    <div className="text-2xl font-black text-white">
                      <AnimatedCounter target={48} suffix="h" />
                    </div>
                    <p className="text-xs text-slate-300 font-medium">Average Time to Hospital Proposal</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                    <Clock3 className="w-6 h-6 text-sky-300" />
                  </div>
                </div>
              </div>

              {/* Active demo case card */}
              <div className="mt-4 glass-card rounded-2xl p-4 flex items-center gap-4">
                <div className="animate-pulse-ring w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="w-3 h-3 rounded-full bg-emerald-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-white">Live Demo: Ali Al-Balushi</p>
                  <p className="text-xs text-slate-400 truncate">Cardiac Surgery · Stage: Hospital Proposal Received</p>
                </div>
                <Link href="/demo-case" className="text-xs font-semibold text-sky-400 hover:text-sky-300 flex items-center gap-0.5 whitespace-nowrap">
                  View <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 80H1440V40C1200 80 960 0 720 40C480 80 240 0 0 40V80Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ══ TRUST STRIP ═════════════════════════════════════ */}
      <section className="bg-white py-10 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-slate-400 mb-6">
            Partnered with India's Highest-Accredited Healthcare Networks
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6 lg:gap-12">
            {hospitals.map((h) => (
              <div key={h.name} className="flex flex-col items-center group">
                <span className={`text-base font-extrabold ${h.color} group-hover:opacity-80 transition`}>{h.name}</span>
                <span className="text-xs text-slate-400 mt-0.5">{h.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SPECIALTIES ═════════════════════════════════════ */}
      <section id="specialties" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-block px-3 py-1 text-xs font-bold text-sky-700 bg-sky-100 rounded-full uppercase tracking-wider mb-3">Medical Specialties</span>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900">Centers of Clinical Excellence</h2>
            <p className="mt-3 text-slate-500 text-base">Explore accredited specialties across India's top quaternary hospitals.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {specialties.map((spec, i) => {
              const Icon = spec.icon;
              return (
                <div
                  key={i}
                  className={`relative group bg-white rounded-2xl p-7 shadow-sm hover:shadow-xl border border-slate-100 border-t-4 ${spec.border} card-hover cursor-pointer`}
                >
                  {spec.tag && (
                    <span className="absolute top-5 right-5 text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                      ★ {spec.tag}
                    </span>
                  )}
                  <div className={`w-12 h-12 rounded-xl ${spec.bg} ${spec.text} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">{spec.name}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{spec.desc}</p>
                  <div className="mt-5 flex items-center gap-1 text-xs font-semibold text-sky-600 group-hover:gap-2 transition-all">
                    <Link href="/find-treatment">Explore specialty</Link>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/find-treatment"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-sky-500 text-sky-600 font-bold rounded-xl hover:bg-sky-500 hover:text-white transition-all text-sm"
            >
              Browse All Treatments <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══ HOW IT WORKS ════════════════════════════════════ */}
      <section id="how-it-works" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-block px-3 py-1 text-xs font-bold text-indigo-700 bg-indigo-100 rounded-full uppercase tracking-wider mb-3">The Process</span>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900">Your 6-Step Coordinated Patient Path</h2>
            <p className="mt-3 text-slate-500 text-base">From home-country inquiry to successful recovery and post-op follow-up.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((st, i) => {
              const Icon = st.icon;
              return (
                <div key={i} className="relative group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg p-7 card-hover">
                  {/* Step number badge */}
                  <div className={`w-10 h-10 rounded-xl ${st.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-5xl font-black text-slate-100 absolute top-5 right-6 select-none">{st.num}</span>
                  <h3 className="text-base font-bold text-slate-900 mb-2 pr-10">{st.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{st.desc}</p>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="mt-14 rounded-3xl bg-gradient-to-r from-sky-600 via-indigo-600 to-violet-700 p-8 md:p-12 text-center shadow-2xl">
            <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-3">Ready to Begin Your Medical Journey?</h3>
            <p className="text-sky-200 mb-7 text-sm md:text-base max-w-xl mx-auto">
              Join 500+ international patients who have experienced world-class medical care in India — at 50–80% lower cost.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/start-journey"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-indigo-700 font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all text-sm"
              >
                Start Treatment Journey <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/hospitals"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/15 hover:bg-white/25 text-white font-semibold border border-white/25 rounded-xl transition text-sm"
              >
                <Building2 className="w-4 h-4" /> Browse Hospitals
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIALS ════════════════════════════════════ */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-block px-3 py-1 text-xs font-bold text-emerald-700 bg-emerald-100 rounded-full uppercase tracking-wider mb-3">Patient Stories</span>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900">Lives Changed by Expert Care</h2>
            <p className="mt-3 text-slate-500 text-base">Real stories from real patients across the world.</p>
          </div>

          {/* Featured testimonial */}
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-10 relative overflow-hidden">
              <Quote className="absolute top-6 right-8 w-16 h-16 text-slate-100" />
              
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonials[activeTestimonial].rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              <blockquote className="text-slate-700 text-lg leading-relaxed font-medium mb-6">
                "{testimonials[activeTestimonial].quote}"
              </blockquote>

              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-sky-400 to-indigo-500 flex items-center justify-center text-white font-bold text-lg">
                    {testimonials[activeTestimonial].name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">
                      {testimonials[activeTestimonial].flag} {testimonials[activeTestimonial].name}
                    </p>
                    <p className="text-xs text-slate-500">{testimonials[activeTestimonial].country}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-500">{testimonials[activeTestimonial].treatment}</p>
                  <p className="text-sm font-bold text-emerald-600 mt-0.5">{testimonials[activeTestimonial].savings}</p>
                </div>
              </div>

              {/* Dots */}
              <div className="flex justify-center gap-2 mt-6">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTestimonial(i)}
                    className={`h-2 rounded-full transition-all ${i === activeTestimonial ? 'w-6 bg-sky-500' : 'w-2 bg-slate-200 hover:bg-slate-300'}`}
                    aria-label={`Testimonial ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Mini stat row */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { icon: Users, val: '500+', label: 'Patients Served' },
              { icon: CheckCircle2, val: '98%', label: 'Satisfaction Rate' },
              { icon: Globe2, val: '7', label: 'Countries' },
              { icon: Award, val: '50+', label: 'Partner Hospitals' },
            ].map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 text-center">
                  <Icon className="w-5 h-5 text-sky-500 mx-auto mb-2" />
                  <div className="text-2xl font-black text-slate-900">{s.val}</div>
                  <div className="text-xs text-slate-500 font-medium">{s.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ SECURITY / COMPLIANCE BANNER ════════════════════ */}
      <section className="bg-white py-14 border-t border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 p-8 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center">
              <Lock className="w-8 h-8 text-sky-400" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-lg font-bold text-white mb-1">Your Privacy & Data is Protected</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                GoHealthTrip is compliant with <strong className="text-slate-200">DPDP Act 2023</strong>, <strong className="text-slate-200">ABDM Health Data Standards</strong>, and <strong className="text-slate-200">NABH Medical Travel guidelines</strong>. All medical records are encrypted end-to-end. We are a healthcare facilitation platform — we do not diagnose or prescribe.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-2 flex-shrink-0">
              {trustBadges.map((b) => (
                <div key={b.label} className="flex flex-col items-center px-3 py-2 bg-white/5 border border-white/10 rounded-xl">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 mb-1" />
                  <span className="text-[10px] font-bold text-white">{b.label}</span>
                  <span className="text-[9px] text-slate-400">{b.sub}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ FINAL CTA ════════════════════════════════════════ */}
      <section className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-sky-200">
            <HeartPulse className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-4">
            Start Your Medical Journey Today
          </h2>
          <p className="text-slate-500 text-base max-w-xl mx-auto mb-8 leading-relaxed">
            Get a personalised treatment proposal from India's top hospitals within 48 hours. Our coordinators are available 24/7 across Arabic, English, French, Swahili, Russian, and Bengali.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/start-journey"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-sky-200 hover:shadow-sky-300 hover:scale-105 transition-all text-sm"
            >
              <Zap className="w-4 h-4" /> Get Free Treatment Proposal
            </Link>
            <Link
              href="/demo-case"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-slate-300 hover:border-sky-400 text-slate-700 hover:text-sky-700 font-semibold rounded-xl transition-all text-sm"
            >
              <PlayCircle className="w-4 h-4" /> See a Sample Journey
            </Link>
          </div>
          <div className="mt-6 flex items-center justify-center gap-1.5 text-xs text-slate-400">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>No payment required to submit your case · Free clinical consultation</span>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══════════════════════════════════════════ */}
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white font-black">G</div>
                <span className="font-extrabold text-white text-lg">GoHealthTrip</span>
              </div>
              <p className="text-sm leading-relaxed text-slate-500 max-w-xs">
                Headquartered in New Delhi, India. Connecting international patients with world-class healthcare since 2024.
              </p>
              <div className="mt-4 flex gap-3">
                {trustBadges.slice(0,2).map((b) => (
                  <span key={b.label} className="text-[10px] px-2 py-1 bg-slate-800 text-slate-400 rounded font-medium">{b.label}</span>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-semibold text-sm mb-3">Patient Services</h4>
              <ul className="space-y-2">
                {[
                  ['Start Journey', '/start-journey'],
                  ['Find Treatment', '/find-treatment'],
                  ['Hospitals & Doctors', '/hospitals'],
                  ['My Case', '/my-case'],
                  ['Demo Journey', '/demo-case'],
                ].map(([label, href]) => (
                  <li key={href}>
                    <Link href={href} className="text-sm text-slate-500 hover:text-sky-400 transition">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-semibold text-sm mb-3">Contact Us</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-sky-500" /> +91 11 4567 8900</li>
                <li className="flex items-center gap-2"><Globe className="w-3.5 h-3.5 text-sky-500" /> care@gohealthtrip.in</li>
                <li className="flex items-start gap-2 mt-1 text-xs leading-relaxed">
                  <span>24/7 coordination in EN · AR · SW · FR · RU · BN</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-600">
            <p>© {new Date().getFullYear()} GoHealthTrip. All rights reserved.</p>
            <p className="text-center">
              Compliant with DPDP Act 2023 · ABDM Standards · NABH Medical Travel Guidelines
            </p>
            <p>
              <span className="text-slate-700">⚠ Demo environment — not a registered medical provider.</span>
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
