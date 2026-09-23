'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import FloatingConcierge from '@/components/FloatingConcierge';
import {
  ArrowRight, ShieldCheck, Globe2, BadgeCheck, Star,
  Wallet, Award, Heart, Handshake, Smile,
  CheckCircle2, Lock, Phone, Globe, Menu, X, Quote,
  ChevronRight, Users, Building2, TrendingUp, Clock3,
  CreditCard, Zap, PlayCircle, Plane, MapPin, Stethoscope,
  Sparkles, HeartPulse, Check, Sparkle, HelpCircle,
} from 'lucide-react';

/* ─── Animated Counter ───────────────────────────────── */
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
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

/* ─── Estimator Data ─────────────────────────────────── */
interface EstimatorProcedure {
  id: string;
  name: string;
  category: string;
  indiaCost: number;
  homeCosts: Record<string, number>;
  stay: string;
  hospitals: string;
}

const estimatorProcedures: EstimatorProcedure[] = [
  {
    id: 'cabg',
    name: 'Coronary Artery Bypass (CABG)',
    category: 'Cardiology',
    indiaCost: 5800,
    homeCosts: {
      OMN: 34000,
      ARE: 42000,
      KEN: 22000,
      NGA: 26000,
      UZB: 24000,
      GBR: 38000,
      BGD: 14000,
    },
    stay: '7 days hospital + 7 days hotel',
    hospitals: 'Medanta, Apollo Delhi, Fortis Escorts',
  },
  {
    id: 'knee',
    name: 'Robotic Bilateral Knee Replacement',
    category: 'Orthopedics',
    indiaCost: 6500,
    homeCosts: {
      OMN: 28000,
      ARE: 35000,
      KEN: 19000,
      NGA: 21000,
      UZB: 18000,
      GBR: 32000,
      BGD: 12000,
    },
    stay: '5 days hospital + 8 days hotel',
    hospitals: 'Max Saket, Apollo, Manipal',
  },
  {
    id: 'liver',
    name: 'Living Donor Liver Transplant',
    category: 'Transplants',
    indiaCost: 29000,
    homeCosts: {
      OMN: 140000,
      ARE: 180000,
      KEN: 95000,
      NGA: 110000,
      UZB: 85000,
      GBR: 210000,
      BGD: 55000,
    },
    stay: '21 days hospital + 21 days hotel',
    hospitals: 'Medanta, Apollo Delhi, Fortis FMRI',
  },
  {
    id: 'bmt',
    name: 'Bone Marrow Transplant (BMT)',
    category: 'Oncology',
    indiaCost: 23000,
    homeCosts: {
      OMN: 95000,
      ARE: 120000,
      KEN: 70000,
      NGA: 85000,
      UZB: 65000,
      GBR: 160000,
      BGD: 45000,
    },
    stay: '28 days HEPA isolation + 21 days hotel',
    hospitals: 'Fortis FMRI, Medanta, Max Healthcare',
  },
  {
    id: 'ivf',
    name: 'IVF with ICSI & PGT-A Genetic Screening',
    category: 'Fertility',
    indiaCost: 4200,
    homeCosts: {
      OMN: 16000,
      ARE: 20000,
      KEN: 12000,
      NGA: 14000,
      UZB: 11000,
      GBR: 19000,
      BGD: 8000,
    },
    stay: '14–18 days outpatient',
    hospitals: 'Max IVF, Apollo Cradle',
  },
  {
    id: 'spine',
    name: 'Minimally Invasive Spine Fusion',
    category: 'Neurosurgery',
    indiaCost: 7200,
    homeCosts: {
      OMN: 32000,
      ARE: 39000,
      KEN: 24000,
      NGA: 28000,
      UZB: 22000,
      GBR: 44000,
      BGD: 15000,
    },
    stay: '6 days hospital + 8 days hotel',
    hospitals: 'Apollo Delhi, Fortis FMRI, Medanta',
  },
];

const estimatorCountries = [
  { code: 'OMN', name: 'Oman', flag: '🇴🇲', currency: 'USD' },
  { code: 'ARE', name: 'UAE', flag: '🇦🇪', currency: 'USD' },
  { code: 'KEN', name: 'Kenya', flag: '🇰🇪', currency: 'USD' },
  { code: 'NGA', name: 'Nigeria', flag: '🇳🇬', currency: 'USD' },
  { code: 'UZB', name: 'Uzbekistan', flag: '🇺🇿', currency: 'USD' },
  { code: 'GBR', name: 'United Kingdom', flag: '🇬🇧', currency: 'USD' },
  { code: 'BGD', name: 'Bangladesh', flag: '🇧🇩', currency: 'USD' },
];

/* ─── Doctors Spotlight ──────────────────────────────── */
const topDoctors = [
  {
    name: 'Dr. Naresh Trehan',
    role: 'Chairman & Chief Cardiac Surgeon',
    hospital: 'Medanta – The Medicity, Gurugram',
    experience: '40+ Years · 48,000+ Heart Surgeries',
    credentials: 'Padma Bhushan, MBBS, FRCS (USA / India)',
    img: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&q=75',
    specialty: 'Cardiac Surgery',
  },
  {
    name: 'Dr. A.S. Soin',
    role: 'Chairman, Liver Transplantation Institute',
    hospital: 'Medanta – The Medicity, Gurugram',
    experience: '30+ Years · 3,500+ Liver Transplants',
    credentials: 'Padma Shri, MBBS, MS, FRCS (Edin, Glasg)',
    img: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&q=75',
    specialty: 'Liver Transplant',
  },
  {
    name: 'Dr. Vinod Raina',
    role: 'Executive Director, Medical Oncology & BMT',
    hospital: 'Fortis Memorial (FMRI), Gurugram',
    experience: '35+ Years · Ex-Head Oncology AIIMS',
    credentials: 'MBBS, MD, FRCP (UK), DM Oncology',
    img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=75',
    specialty: 'Cancer Care & BMT',
  },
  {
    name: 'Dr. S.K.S. Marya',
    role: 'Chairman, Orthopaedics & Joint Replacement',
    hospital: 'Max Super Speciality Hospital, Saket',
    experience: '35+ Years · 20,000+ Joint Surgeries',
    credentials: 'MBBS, MS (Ortho), M.Ch (UK), FRCS',
    img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=75',
    specialty: 'Orthopedics & Robotic Knee',
  },
];

/* ─── Cost Comparison Matrix ─────────────────────────── */
const costComparisonMatrix = [
  {
    procedure: 'Heart Bypass Surgery (CABG)',
    india: '$5,800',
    usa: '$125,000',
    uk: '$38,000',
    uae: '$42,000',
    germany: '$36,000',
    savings: '85%',
  },
  {
    procedure: 'Robotic Knee Replacement (Bilateral)',
    india: '$6,500',
    usa: '$52,000',
    uk: '$32,000',
    uae: '$35,000',
    germany: '$28,000',
    savings: '80%',
  },
  {
    procedure: 'Living Donor Liver Transplant',
    india: '$29,000',
    usa: '$575,000',
    uk: '$210,000',
    uae: '$180,000',
    germany: '$190,000',
    savings: '86%',
  },
  {
    procedure: 'Bone Marrow Transplant (Allogeneic)',
    india: '$23,000',
    usa: '$350,000',
    uk: '$160,000',
    uae: '$120,000',
    germany: '$140,000',
    savings: '84%',
  },
  {
    procedure: 'Brain Tumor Craniotomy / Neuro',
    india: '$7,200',
    usa: '$110,000',
    uk: '$44,000',
    uae: '$39,000',
    germany: '$42,000',
    savings: '82%',
  },
  {
    procedure: 'IVF with ICSI & PGT-A',
    india: '$4,200',
    usa: '$24,000',
    uk: '$19,000',
    uae: '$20,000',
    germany: '$16,000',
    savings: '78%',
  },
];

/* ─── Regional Desks ─────────────────────────────────── */
const regionalDesks = [
  {
    id: 'gcc',
    name: 'GCC & Middle East Desk',
    flag: '🇴🇲 🇦🇪 🇸🇦',
    flightTime: '3h 15m (Muscat/Dubai ➔ Delhi)',
    visa: '48h e-Medical Visa',
    services: [
      'Native Arabic patient coordinators assigned to every family',
      'Hospital Arabic menu and 100% Halal certified dining',
      'Private luxury recovery apartments near hospital',
      'Direct embassy medical endorsement assistance',
    ],
  },
  {
    id: 'africa',
    name: 'East & West Africa Desk',
    flag: '🇰🇪 🇳🇬 🇹🇿 🇸🇳',
    flightTime: '5h 45m direct (Nairobi/Lagos ➔ Mumbai/Delhi)',
    visa: '72h Express Visa Support',
    services: [
      'Swahili and French speaking care navigators',
      'Yellow fever & transit protocol assistance',
      'Airport ambulance reception & dedicated hospital bed transfer',
      'Extended stay companion packages with cooking facilities',
    ],
  },
  {
    id: 'cis',
    name: 'Central Asia & CIS Desk',
    flag: '🇺🇿 🇰🇿 🇷🇺',
    flightTime: '3h 30m direct (Tashkent/Almaty ➔ Delhi)',
    visa: '48h e-Med Visa Fast-Track',
    services: [
      'Certified Russian-speaking medical interpreters in OPD & ICU',
      'All diagnostic reports translated into Russian & English',
      'Assistance with regional bank wire transfers & foreign exchange',
      'Post-discharge remote consultation with home country doctors',
    ],
  },
  {
    id: 'uk',
    name: 'UK, Europe & Global Desk',
    flag: '🇬🇧 🇪🇺 🇺🇸',
    flightTime: '8h direct (London Heathrow ➔ Delhi)',
    visa: 'e-Tourist / e-Medical Visa in 24–48h',
    services: [
      'No 12–18 month NHS wait times — surgery scheduled within 48h of landing',
      'JCI-accredited care adhering to US/UK clinical guidelines',
      'Direct specialist tele-consultation before booking flights',
      'Full electronic health dossier for your home country GP',
    ],
  },
];

/* ─── 6 Happy Path steps ─────────────────────────────── */
const journeySteps = [
  {
    num: '1',
    title: 'Register & Verify',
    color: 'bg-sky-600',
    textColor: 'text-sky-700',
    borderColor: 'border-sky-500',
    img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=480&q=75',
    imgAlt: 'Patient registering on mobile',
    bullets: [
      'Sign up on GoHealthTrip securely',
      'Identity verification via country-specific validators',
      'Encrypted & DPDP-compliant onboarding',
    ],
  },
  {
    num: '2',
    title: 'Upload Medical Reports',
    color: 'bg-teal-600',
    textColor: 'text-teal-700',
    borderColor: 'border-teal-500',
    img: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=480&q=75',
    imgAlt: 'MRI and medical scans',
    bullets: [
      'Upload prescriptions, MRI/CT scans & history',
      'AI clinical extraction & specialist validation',
      'Initial treatment opinion within 12 hours',
    ],
  },
  {
    num: '3',
    title: 'Consult & Plan',
    color: 'bg-indigo-600',
    textColor: 'text-indigo-700',
    borderColor: 'border-indigo-500',
    img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=480&q=75',
    imgAlt: 'Doctor video consultation',
    bullets: [
      'Matched with India’s foremost superspecialists',
      'Live video consultation with treating doctor',
      'Itemized transparent quotations from 3 hospitals',
    ],
  },
  {
    num: '4',
    title: 'Confirm & Prepare (Visa & Travel)',
    color: 'bg-amber-500',
    textColor: 'text-amber-700',
    borderColor: 'border-amber-500',
    img: '/medical-travel-map.png',
    imgAlt: 'Global flight routes and medical travel map to India',
    bullets: [
      'Official Hospital Visa Invitation Letter (VIL) in 24h',
      'Indian e-Medical Visa facilitation for patient & companion',
      'Flight tickets, stay booking & foreign exchange assistance',
    ],
  },
  {
    num: '5',
    title: 'Travel & Treatment in India',
    color: 'bg-emerald-600',
    textColor: 'text-emerald-700',
    borderColor: 'border-emerald-500',
    img: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=480&q=75',
    imgAlt: 'Modern hospital in India',
    bullets: [
      'Airport chauffeur greeting & ambulance reception',
      'Express international OPD & inpatient admission',
      'Surgeries by India’s most accredited doctors',
    ],
  },
  {
    num: '6',
    title: 'Safe Return & Lifelong Follow-Up',
    color: 'bg-rose-500',
    textColor: 'text-rose-700',
    borderColor: 'border-rose-500',
    img: 'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=480&q=75',
    imgAlt: 'Happy family after recovery',
    bullets: [
      'Comprehensive discharge dossier & medication plan',
      'Remote tele-followup with your surgeon back home',
      'Share your experience & inspire others',
    ],
  },
];

/* ─── Hospital thumbnails ────────────────────────────── */
const hospitals = [
  {
    name: 'Indraprastha Apollo Hospitals',
    tag: 'JCI Accredited · 30+ Years',
    city: 'New Delhi · Mathura Road',
    img: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=400&q=75',
    color: 'from-sky-600 to-sky-800',
  },
  {
    name: 'Medanta – The Medicity',
    tag: 'JCI Accredited · Quaternary Care',
    city: 'Gurugram (Delhi NCR)',
    img: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&q=75',
    color: 'from-teal-600 to-teal-800',
  },
  {
    name: 'Fortis Memorial Research Institute (FMRI)',
    tag: 'JCI / NABH · CyberKnife & BMT',
    city: 'Gurugram (Sector 44)',
    img: 'https://images.unsplash.com/photo-1632833239869-a37e3a5806d2?w=400&q=75',
    color: 'from-indigo-600 to-indigo-800',
  },
  {
    name: 'Max Super Speciality Hospital',
    tag: 'JCI Accredited · 17 Hospitals',
    city: 'Saket, New Delhi',
    img: 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=400&q=75',
    color: 'from-emerald-600 to-emerald-800',
  },
];

const testimonials = [
  {
    name: 'Ali Al-Balushi', country: 'Muscat, Oman', flag: '🇴🇲',
    treatment: 'Triple Vessel Heart Bypass (CABG) — Medanta',
    quote: 'Back home in Oman, I was quoted over $45,000. GoHealthTrip organized my entire surgery at Medanta with Dr. Trehan’s team for under $6,000. The Arabic translator was with my family from the airport to discharge.',
    rating: 5, savings: 'Saved $38,000 USD (85%)',
  },
  {
    name: 'Amara Diallo', country: 'Dakar, Senegal', flag: '🇸🇳',
    treatment: 'Living Donor Kidney Transplant — Apollo Delhi',
    quote: 'From report translation to our Indian medical visas in 48 hours, everything was effortless. The care coordinators handled hospital admissions, our guest house, and daily Halal meals.',
    rating: 5, savings: 'Saved $78,000 USD vs France',
  },
  {
    name: 'Farkhod Karimov', country: 'Tashkent, Uzbekistan', flag: '🇺🇿',
    treatment: 'CyberKnife Radiation for Brain Tumor — Fortis FMRI',
    quote: 'The Russian-speaking coordinator met us at Delhi airport. No delays, world-class technology, and the doctors were exceptionally warm and capable. I recommend GoHealthTrip to everyone in Central Asia.',
    rating: 5, savings: 'Saved $32,000 USD vs Germany',
  },
];

const navLinks = [
  { name: 'Cost Calculator', href: '#cost-calculator' },
  { name: 'Specialists', href: '#specialists' },
  { name: 'Regional Desks', href: '#regional-desks' },
  { name: 'How It Works', href: '#how-it-works' },
  { name: 'Hospitals', href: '#hospitals' },
  { name: 'Demo Journey', href: '/demo-case' },
];

/* ─── Page Component ─────────────────────────────────── */
export default function HomePage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('EN');
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  // Estimator state
  const [selectedProcId, setSelectedProcId] = useState('cabg');
  const [selectedCountryCode, setSelectedCountryCode] = useState('OMN');
  const [activeDeskId, setActiveDeskId] = useState('gcc');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setActiveTestimonial(p => (p + 1) % testimonials.length), 6000);
    return () => clearInterval(timer);
  }, []);

  const currentProc = estimatorProcedures.find(p => p.id === selectedProcId) || estimatorProcedures[0];
  const currentCountry = estimatorCountries.find(c => c.code === selectedCountryCode) || estimatorCountries[0];
  const homeCost = currentProc.homeCosts[selectedCountryCode] || currentProc.indiaCost * 4;
  const savingsAmount = homeCost - currentProc.indiaCost;
  const savingsPct = Math.round((savingsAmount / homeCost) * 100);

  const currentDesk = regionalDesks.find(d => d.id === activeDeskId) || regionalDesks[0];

  return (
    <main className="min-h-screen bg-white overflow-x-hidden text-slate-800">

      {/* ══ HEADER ══════════════════════════════════════════════════════ */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/97 backdrop-blur-md shadow-md border-b border-slate-100'
                 : 'bg-white border-b border-slate-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-[68px]">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-11 h-11 flex-shrink-0">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-sky-500 via-indigo-600 to-violet-700 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                  <span className="text-white font-black text-xl">G</span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-white flex items-center justify-center shadow-sm">
                  <span className="text-white font-black text-[7px]">✓</span>
                </div>
              </div>
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-extrabold text-xl text-slate-900 tracking-tight leading-none">
                    GoHealth<span className="text-sky-600">Trip</span>
                  </span>
                  <span className="text-[9px] font-bold text-sky-700 uppercase bg-sky-50 px-2 py-0.5 rounded-full border border-sky-200">
                    India HQ
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 font-medium leading-none mt-1">International Patient Facilitation</p>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center space-x-6 text-sm font-semibold text-slate-600">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}
                  className="nav-link-underline hover:text-sky-600 transition-colors py-1">
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Right CTAs */}
            <div className="hidden sm:flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-slate-50">
                <Globe className="w-3.5 h-3.5 text-slate-400" />
                <select value={currentLang} onChange={e => setCurrentLang(e.target.value)}
                  aria-label="Language selection" className="bg-transparent border-none outline-none cursor-pointer text-xs">
                  <option value="EN">English</option>
                  <option value="AR">العربية (Arabic)</option>
                  <option value="SW">Kiswahili</option>
                  <option value="FR">Français</option>
                  <option value="RU">Русский (Russian)</option>
                  <option value="BN">বাংলা (Bengali)</option>
                </select>
              </div>
              <Link href="/dashboard"
                className="px-3.5 py-2 text-xs font-semibold text-slate-700 border border-slate-200 hover:border-sky-300 hover:text-sky-700 rounded-xl transition">
                Coordinator Portal
              </Link>
              <Link href="/start-journey"
                className="px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-sky-500 via-indigo-600 to-violet-700 hover:opacity-95 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 glow-cyan">
                Start Treatment <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Mobile toggle */}
            <button onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition" aria-label="Toggle menu">
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-slate-100 px-4 pt-2 pb-4 space-y-1">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}
                className="block px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-sky-50 hover:text-sky-700 transition">
                {link.name}
              </Link>
            ))}
            <div className="pt-2 border-t border-slate-100">
              <Link href="/start-journey" onClick={() => setMobileOpen(false)}
                className="block w-full py-2.5 text-center text-sm font-bold text-white bg-gradient-to-r from-sky-500 to-indigo-600 rounded-xl shadow">
                Start Treatment Journey
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* ══ HERO SECTION (Completely Upgraded) ══════════════════════════ */}
      <section className="relative overflow-hidden bg-[#071329] text-white" style={{ minHeight: '90vh' }}>
        {/* Medical travel world map background */}
        <div className="absolute inset-0">
          <Image
            src="/medical-travel-map.png"
            alt="World map of medical travel flight routes to India"
            fill
            priority
            className="object-cover object-center opacity-35 mix-blend-screen scale-105"
            sizes="100vw"
          />
          {/* Subtle multi-layer gradient overlays to guarantee crisp text legibility while revealing the map */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#071329]/98 via-[#0c1f3d]/88 to-[#071a33]/85" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#071329]/60 via-transparent to-[#071329]/95" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-12 gap-12 items-center">

            {/* Left 6 Columns: Value Proposition */}
            <div className="lg:col-span-6 text-center lg:text-left space-y-6">
              {/* Eyebrow status badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-sky-300 text-xs font-semibold tracking-wide backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                <span>Care Beyond Borders · Official Hospital Coordinator</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.12] tracking-tight">
                From Anywhere
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-teal-300 to-indigo-300">
                  in the World.
                </span>
                <br />
                To Better Care in India.
              </h1>

              <p className="text-slate-300 text-base lg:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
                One trusted journey from your first medical report to treatment, recovery, and the journey home. Save 70–85% on quaternary treatments by India’s most celebrated surgeons.
              </p>

              {/* International Country Badges */}
              <div className="pt-1">
                <p className="text-[11px] uppercase tracking-wider text-slate-400 font-bold mb-2.5">
                  Welcoming Patients Daily From:
                </p>
                <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                  {[
                    { name: 'Oman', flag: '🇴🇲' },
                    { name: 'UAE', flag: '🇦🇪' },
                    { name: 'Kenya', flag: '🇰🇪' },
                    { name: 'Nigeria', flag: '🇳🇬' },
                    { name: 'Uzbekistan', flag: '🇺🇿' },
                    { name: 'Bangladesh', flag: '🇧🇩' },
                    { name: 'UK', flag: '🇬🇧' },
                  ].map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedCountryCode(estimatorCountries.find(x => x.name.includes(c.name))?.code || 'OMN')}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 hover:bg-white/20 border border-white/15 rounded-full text-xs text-white font-medium transition"
                    >
                      <span>{c.flag}</span>
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3.5 justify-center lg:justify-start">
                <Link
                  href="/start-journey"
                  className="group inline-flex items-center justify-center gap-2 px-7 py-4 bg-gradient-to-r from-sky-400 via-indigo-500 to-violet-600 hover:opacity-95 text-white font-extrabold rounded-2xl shadow-xl glow-cyan hover:scale-[1.02] transition-all text-sm"
                >
                  <Zap className="w-4 h-4" />
                  <span>Start Your Treatment Journey</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/demo-case"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-white/10 hover:bg-white/15 text-white font-bold border border-white/25 rounded-2xl transition text-sm backdrop-blur-sm"
                >
                  <PlayCircle className="w-4 h-4 text-sky-300" />
                  <span>View Ali's Live Demo Journey</span>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="pt-2 flex flex-wrap gap-4 justify-center lg:justify-start text-xs text-slate-300">
                <div className="flex items-center gap-1.5">
                  <BadgeCheck className="w-4 h-4 text-emerald-400" />
                  <span>JCI Gold Standard & NABH Hospitals</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-sky-400" />
                  <span>Zero Upfront Medical Fee</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock3 className="w-4 h-4 text-violet-400" />
                  <span>48h e-Medical Visa Liaison</span>
                </div>
              </div>
            </div>

            {/* Right 6 Columns: Interactive Cost & Savings Estimator (REPLACES GREY BOXES) */}
            <div className="lg:col-span-6">
              <div className="glass-panel-dark rounded-3xl p-6 sm:p-8 relative glow-cyan">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow">
                      💰
                    </div>
                    <div>
                      <h3 className="font-extrabold text-base text-white">Instant Treatment & Cost Estimator</h3>
                      <p className="text-[11px] text-slate-400">Compare procedure costs with your home country</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Live 2026 Rates
                  </span>
                </div>

                {/* Form Selectors */}
                <div className="space-y-4">
                  {/* Procedure selector */}
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                      Select Medical Procedure:
                    </label>
                    <div className="relative">
                      <select
                        value={selectedProcId}
                        onChange={(e) => setSelectedProcId(e.target.value)}
                        aria-label="Select Medical Procedure"
                        className="w-full bg-slate-900/90 text-white text-xs font-semibold px-4 py-3 rounded-xl border border-white/20 focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400 cursor-pointer appearance-none"
                      >
                        {estimatorProcedures.map((p) => (
                          <option key={p.id} value={p.id} className="bg-slate-900 text-white">
                            {p.name} ({p.category})
                          </option>
                        ))}
                      </select>
                      <ChevronRight className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5 rotate-90 pointer-events-none" />
                    </div>
                  </div>

                  {/* Country selector */}
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                      Your Country of Origin:
                    </label>
                    <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5">
                      {estimatorCountries.map((c) => (
                        <button
                          key={c.code}
                          type="button"
                          onClick={() => setSelectedCountryCode(c.code)}
                          className={`py-2 px-1 rounded-xl text-center transition flex flex-col items-center gap-0.5 border ${
                            selectedCountryCode === c.code
                              ? 'bg-sky-500/30 border-sky-400 text-white font-bold shadow-sm'
                              : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                          }`}
                        >
                          <span className="text-lg">{c.flag}</span>
                          <span className="text-[10px] leading-tight truncate w-full">{c.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Savings Comparison Box */}
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/15 space-y-3">
                    <div className="grid grid-cols-2 gap-3 text-center">
                      <div className="p-3 rounded-xl bg-slate-900/70 border border-white/10">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">Est. Cost in India</span>
                        <span className="text-xl sm:text-2xl font-black text-sky-400 mt-0.5 block">
                          ${currentProc.indiaCost.toLocaleString()} USD
                        </span>
                        <span className="text-[9px] text-slate-400 block mt-0.5">Includes Hospital & Surgeon</span>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-900/70 border border-white/10">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">
                          Cost in {currentCountry.name}
                        </span>
                        <span className="text-xl sm:text-2xl font-black text-slate-400 line-through mt-0.5 block">
                          ${homeCost.toLocaleString()} USD
                        </span>
                        <span className="text-[9px] text-rose-400 block mt-0.5">Standard Private Care</span>
                      </div>
                    </div>

                    {/* Calculated Savings Highlight */}
                    <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-emerald-400" />
                        <div>
                          <p className="text-xs font-bold text-emerald-300">You Save ~ ${savingsAmount.toLocaleString()} USD</p>
                          <p className="text-[10px] text-slate-300">{currentProc.stay}</p>
                        </div>
                      </div>
                      <span className="text-lg font-black text-emerald-400 bg-emerald-900/50 px-2.5 py-1 rounded-lg border border-emerald-500/40">
                        {savingsPct}% OFF
                      </span>
                    </div>

                    <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />
                      <span>Available at: <strong>{currentProc.hospitals}</strong></span>
                    </div>
                  </div>

                  {/* 1-Click Request Button */}
                  <Link
                    href={`/start-journey?procedure=${currentProc.id}&country=${currentCountry.code}`}
                    className="w-full py-3.5 bg-gradient-to-r from-sky-400 via-indigo-500 to-violet-600 hover:opacity-95 text-white font-extrabold rounded-xl shadow-lg flex items-center justify-center gap-2 text-sm transition glow-cyan"
                  >
                    <span>Get Detailed Hospital Quotations Free</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  {/* Verified Patient Story Snippet */}
                  <div className="pt-1 flex items-center gap-3 text-xs text-slate-300">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold flex-shrink-0">
                      ✓
                    </div>
                    <p className="text-[11px] leading-snug">
                      <strong>Ali Al-Balushi (Oman)</strong> saved $38,000 on CABG at Medanta via GoHealthTrip.
                      <Link href="/demo-case" className="text-sky-300 underline font-semibold ml-1">
                        Read Case Study
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Wave to transition to light content */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <svg viewBox="0 0 1440 70" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 70H1440V35C1200 70 960 0 720 35C480 70 240 0 0 35V70Z" fill="#f8fafc" />
          </svg>
        </div>
      </section>

      {/* ══ SECTION 2: GLOBAL COST COMPARISON MATRIX ════════════════════ */}
      <section id="cost-calculator" className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold text-sky-800 bg-sky-100 rounded-full uppercase tracking-wider mb-3">
              <CreditCard className="w-3.5 h-3.5 text-sky-600" /> Transparent Pricing
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              International Cost Comparison Matrix
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              India provides identical FDA-approved implants, Da Vinci robotic surgery, and JCI accreditation at a fraction of Western and GCC private rates.
            </p>
          </div>

          {/* Comparison Table */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-900 text-white text-xs uppercase tracking-wider">
                <tr>
                  <th className="py-4 px-6 font-bold">Procedure</th>
                  <th className="py-4 px-6 font-bold text-sky-400 bg-slate-800/80">India (JCI Hospital)</th>
                  <th className="py-4 px-6 font-medium text-slate-400">USA</th>
                  <th className="py-4 px-6 font-medium text-slate-400">UK (Private)</th>
                  <th className="py-4 px-6 font-medium text-slate-400">UAE / GCC</th>
                  <th className="py-4 px-6 font-medium text-slate-400">Germany</th>
                  <th className="py-4 px-6 font-bold text-emerald-400">Typical Savings</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {costComparisonMatrix.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition">
                    <td className="py-4 px-6 font-bold text-slate-900 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-sky-600 flex-shrink-0" />
                      <span>{row.procedure}</span>
                    </td>
                    <td className="py-4 px-6 font-extrabold text-sky-700 bg-sky-50/50">
                      {row.india}
                    </td>
                    <td className="py-4 px-6 text-slate-500">{row.usa}</td>
                    <td className="py-4 px-6 text-slate-500">{row.uk}</td>
                    <td className="py-4 px-6 text-slate-500">{row.uae}</td>
                    <td className="py-4 px-6 text-slate-500">{row.germany}</td>
                    <td className="py-4 px-6">
                      <span className="inline-block px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full font-bold text-xs">
                        Save {row.savings}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 bg-sky-50/80 rounded-2xl border border-sky-100 text-xs text-sky-950">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-sky-600 flex-shrink-0" />
              <span>
                <strong>All inclusive package estimates:</strong> Hospital stay, surgeon fees, anaesthesia, routine diagnostics, medications during admission, and nursing care.
              </span>
            </div>
            <Link
              href="/start-journey"
              className="flex-shrink-0 px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl shadow-sm transition"
            >
              Get Custom Quote for Your Procedure
            </Link>
          </div>
        </div>
      </section>

      {/* ══ SECTION 3: TOP SPECIALISTS SPOTLIGHT ════════════════════════ */}
      <section id="specialists" className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold text-indigo-800 bg-indigo-100 rounded-full uppercase tracking-wider mb-3">
              <Award className="w-3.5 h-3.5 text-indigo-600" /> World-Class Faculty
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              India's Most Distinguished Medical Specialists
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Trained at Harvard, Stanford, Cambridge, and AIIMS, these pioneers have performed thousands of life-saving surgeries with international benchmark success rates.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {topDoctors.map((doc, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition card-hover flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={doc.img}
                      alt={doc.name}
                      fill
                      className="object-cover object-top hover:scale-105 transition-transform duration-500"
                      sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full text-[10px] font-bold text-slate-800 shadow">
                      {doc.specialty}
                    </span>
                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <h3 className="font-extrabold text-base leading-tight">{doc.name}</h3>
                      <p className="text-[11px] text-sky-300 font-medium mt-0.5">{doc.role}</p>
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <p className="text-xs text-slate-600 font-semibold flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0" />
                      <span>{doc.hospital}</span>
                    </p>
                    <p className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-lg">
                      ⚡ {doc.experience}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      {doc.credentials}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <Link
                    href={`/start-journey?doctor=${encodeURIComponent(doc.name)}`}
                    className="w-full py-2.5 bg-slate-900 hover:bg-sky-600 text-white text-xs font-bold rounded-xl shadow transition flex items-center justify-center gap-1.5"
                  >
                    <span>Request Doctor Opinion</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/hospitals"
              className="inline-flex items-center gap-2 px-6 py-3.5 border-2 border-slate-300 hover:border-sky-500 text-slate-700 hover:text-sky-700 font-bold rounded-2xl transition text-sm"
            >
              <span>Explore All 50+ Partner Hospitals & 200+ Specialists</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══ SECTION 4: COUNTRY-SPECIFIC PATIENT DESKS ═══════════════════ */}
      <section id="regional-desks" className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold text-teal-800 bg-teal-100 rounded-full uppercase tracking-wider mb-3">
              <Globe className="w-3.5 h-3.5 text-teal-600" /> Tailored For Your Region
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Dedicated International Patient Desks
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              We cater to your linguistic, cultural, and dietary preferences so you feel completely at home throughout treatment in India.
            </p>
          </div>

          {/* Regional Tabs */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {regionalDesks.map((d) => (
              <button
                key={d.id}
                onClick={() => setActiveDeskId(d.id)}
                className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition flex items-center gap-2 border ${
                  activeDeskId === d.id
                    ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span>{d.flag}</span>
                <span>{d.name}</span>
              </button>
            ))}
          </div>

          {/* Active Desk Showcase Card */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-slate-200">
            <div className="grid md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-7 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{currentDesk.flag}</span>
                  <div>
                    <h3 className="text-xl font-extrabold text-slate-900">{currentDesk.name}</h3>
                    <p className="text-xs text-sky-600 font-bold">Fast-Track Coordination Desk</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Flight Connectivity</span>
                    <strong className="text-xs text-slate-800 font-semibold">{currentDesk.flightTime}</strong>
                  </div>
                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                    <span className="text-[10px] uppercase font-bold text-emerald-700 block">Visa Assistance</span>
                    <strong className="text-xs text-emerald-900 font-semibold">{currentDesk.visa}</strong>
                  </div>
                </div>

                <div className="space-y-2.5 pt-2">
                  {currentDesk.services.map((svc, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>{svc}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-3">
                  <Link
                    href={`/start-journey?desk=${currentDesk.id}`}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-bold rounded-xl shadow text-xs hover:opacity-95 transition"
                  >
                    <span>Connect with {currentDesk.name.split(' ')[0]} Coordinator</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Right Col: Map & Hospitality badge */}
              <div className="md:col-span-5 relative h-72 rounded-2xl overflow-hidden shadow-inner border border-slate-100 bg-[#0c2b4c]">
                <Image
                  src="/medical-travel-map.png"
                  alt="Medical travel route"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width:768px) 100vw,40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 p-3 bg-white/90 backdrop-blur-md rounded-xl border border-white/40 text-xs">
                  <p className="font-bold text-slate-900">Hospital Guest Relations Active</p>
                  <p className="text-[11px] text-slate-500">English · Arabic · Swahili · Russian · Bengali</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SECTION 5: THE HAPPY PATH (6 STEPS) ═════════════════════════ */}
      <section id="how-it-works" className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-r from-sky-700 via-sky-600 to-indigo-700 px-8 py-8 mb-12 text-center shadow-lg">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              THE HAPPY PATH – YOUR COMPLETE PATIENT JOURNEY
            </h2>
            <p className="text-sky-100 mt-1 text-sm">
              A transparent, doctor-supervised continuum from your initial inquiry to safe recovery at home
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {journeySteps.map((step, i) => (
              <div key={i} className={`bg-white rounded-3xl border-2 ${step.borderColor} shadow-sm hover:shadow-xl transition-all overflow-hidden group card-hover flex flex-col justify-between`}>
                <div>
                  <div className="relative h-44 overflow-hidden">
                    <Image
                      src={step.img}
                      alt={step.imgAlt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,33vw"
                    />
                    <div className={`absolute top-3 left-3 w-9 h-9 rounded-full ${step.color} flex items-center justify-center text-white font-black text-lg shadow-lg`}>
                      {step.num}
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className={`text-base font-bold mb-3 ${step.textColor}`}>{step.title}</h3>
                    <ul className="space-y-2">
                      {step.bullets.map((b, j) => (
                        <li key={j} className="flex items-start gap-2 text-xs text-slate-600 leading-snug">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Step {step.num} of 6
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-4 p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-3xl border border-emerald-100 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xl flex-shrink-0">
                ❤️
              </div>
              <div>
                <p className="text-sm font-bold text-emerald-900 uppercase tracking-wider">
                  Healthier People. Happier Families. Brighter Tomorrows.
                </p>
                <p className="text-xs text-slate-600 mt-0.5">
                  Over 500+ international families have travelled through GoHealthTrip with 98% clinical satisfaction.
                </p>
              </div>
            </div>
            <Link
              href="/start-journey"
              className="flex-shrink-0 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl text-xs flex items-center gap-1.5 transition shadow"
            >
              Begin Step 1 Free <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══ SECTION 6: PARTNER HOSPITALS ════════════════════════════════ */}
      <section id="hospitals" className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold text-sky-800 bg-sky-100 rounded-full uppercase tracking-wider mb-3">
              <Building2 className="w-3.5 h-3.5 text-sky-600" /> Accredited Infrastructure
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              India's Premier Quaternary Hospital Networks
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Each facility features dedicated international patient lounges, state-of-the-art robotic operation suites, and round-the-clock translation navigators.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {hospitals.map((h, i) => (
              <div key={i} className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl card-hover border border-slate-200 flex flex-col justify-between">
                <div>
                  <div className="relative h-44 overflow-hidden">
                    <Image
                      src={h.img}
                      alt={h.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,25vw"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${h.color} opacity-40`} />
                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm rounded-full px-2.5 py-0.5 text-[10px] font-bold text-emerald-800 flex items-center gap-1 shadow">
                      <BadgeCheck className="w-3 h-3 text-emerald-600" /> JCI Verified
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-extrabold text-slate-900 text-sm leading-snug">{h.name}</h3>
                    <p className="text-xs text-sky-600 font-bold mt-1">{h.tag}</p>
                    <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" /> {h.city}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <Link
                    href={`/hospitals`}
                    className="w-full py-2.5 border border-slate-200 hover:border-sky-500 hover:text-sky-600 text-slate-700 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1"
                  >
                    <span>View Hospital Details</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SECTION 7: PATIENT STORIES & TESTIMONIALS ═══════════════════ */}
      <section className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold text-emerald-800 bg-emerald-100 rounded-full uppercase tracking-wider mb-3">
              <Star className="w-3.5 h-3.5 text-emerald-600" /> Real Patient Journeys
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Loved by Patients Across 30+ Nations
            </h2>
          </div>

          <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl shadow-xl p-8 sm:p-12 relative overflow-hidden">
            <Quote className="absolute top-6 right-8 w-20 h-20 text-white/5 pointer-events-none" />

            <div className="flex gap-1 mb-4">
              {Array.from({ length: testimonials[activeTestimonial].rating }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>

            <blockquote className="text-slate-200 text-base sm:text-lg leading-relaxed font-normal mb-8">
              "{testimonials[activeTestimonial].quote}"
            </blockquote>

            <div className="flex items-center justify-between flex-wrap gap-4 border-t border-white/10 pt-6">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-sky-400 to-indigo-500 flex items-center justify-center text-white font-black text-lg shadow">
                  {testimonials[activeTestimonial].name[0]}
                </div>
                <div>
                  <p className="font-extrabold text-white text-sm">
                    {testimonials[activeTestimonial].flag} {testimonials[activeTestimonial].name}
                  </p>
                  <p className="text-xs text-slate-400">{testimonials[activeTestimonial].country}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-300 font-medium">{testimonials[activeTestimonial].treatment}</p>
                <p className="text-xs font-bold text-emerald-400 mt-0.5">{testimonials[activeTestimonial].savings}</p>
              </div>
            </div>

            {/* Carousel navigation pills */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === activeTestimonial ? 'w-8 bg-sky-400' : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ SECTION 8: CULTURAL & TRAVEL BANNER ══════════════════════════ */}
      <section className="relative h-64 sm:h-80 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=75"
          alt="Heal in India — Experience More"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-sky-950/85 via-indigo-950/70 to-slate-950/85" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto">
          <span className="text-sky-300 text-xs font-bold uppercase tracking-widest mb-2">Care Beyond Borders</span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-4 leading-tight">
            Healing People · Connecting Cultures · Building a Brighter Tomorrow
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl mb-6">
            From the historic sights of Delhi and Agra to warm hospitality, India offers a restorative environment for recovery.
          </p>
          <Link
            href="/start-journey"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-sky-400 to-indigo-600 hover:opacity-95 text-white font-extrabold rounded-2xl shadow-xl hover:scale-105 transition-all text-xs glow-cyan"
          >
            <span>Plan Your Medical Journey Today</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ══ FOOTER ══════════════════════════════════════════════════════ */}
      <footer className="bg-slate-950 text-slate-400 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white font-black text-lg">
                  G
                </div>
                <div>
                  <span className="font-extrabold text-white text-xl">
                    GoHealth<span className="text-sky-400">Trip</span>
                  </span>
                  <p className="text-[10px] text-slate-500">Better Care. Brighter Journeys.</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-slate-400 max-w-sm">
                Headquartered in New Delhi, India. Connecting international patients with accredited quaternary care since 2024.
                <br /><strong className="text-slate-300">www.gohealthtrip.com</strong>
              </p>
              <div className="flex flex-wrap gap-2 pt-1 text-[11px] text-slate-400">
                <span className="px-2.5 py-1 bg-slate-900 rounded-lg border border-slate-800">JCI Accredited Network</span>
                <span className="px-2.5 py-1 bg-slate-900 rounded-lg border border-slate-800">NABH Standards</span>
                <span className="px-2.5 py-1 bg-slate-900 rounded-lg border border-slate-800">DPDP Act 2023 Compliant</span>
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold text-sm mb-4">Patient Services</h4>
              <ul className="space-y-2.5 text-sm">
                {[
                  ['Start Free Case', '/start-journey'],
                  ['Cost Comparison', '#cost-calculator'],
                  ['Find Treatment', '/find-treatment'],
                  ['Top Hospitals', '/hospitals'],
                  ['Demo Patient Journey', '/demo-case'],
                  ['My Case Dashboard', '/my-case'],
                ].map(([label, href]) => (
                  <li key={href}>
                    <Link href={href} className="text-slate-400 hover:text-sky-400 transition">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-sm mb-4">24/7 International Desk</h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-sky-400 flex-shrink-0" />
                  <span>+91 11 4567 8900</span>
                </li>
                <li className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-sky-400 flex-shrink-0" />
                  <span>care@gohealthtrip.in</span>
                </li>
                <li className="flex items-start gap-2 text-xs leading-relaxed text-slate-500 pt-1">
                  <Lock className="w-3.5 h-3.5 text-sky-400 mt-0.5 flex-shrink-0" />
                  <span>Coordinators fluent in Arabic, Swahili, Russian, French, Bengali, and English.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>© {new Date().getFullYear()} GoHealthTrip. All rights reserved.</p>
            <p className="text-center">
              Compliant with DPDP Act 2023 · ABDM Standards · NABH Guidelines for Medical Travel Facilitation
            </p>
            <p className="text-slate-600">
              Disclaimer: Facilitation platform; non-diagnostic.
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Concierge / WhatsApp for Overseas Patients */}
      <FloatingConcierge />
    </main>
  );
}
