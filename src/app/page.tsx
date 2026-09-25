'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import Logo from '@/components/Logo';
import HeroScreensaver from '@/components/home/HeroScreensaver';
import CarePathJourney from '@/components/home/CarePathJourney';
import {
  ArrowRight, ShieldCheck, Globe2, BadgeCheck, Star,
  Wallet, Award, Heart, Handshake, Smile,
  CheckCircle2, Lock, Phone, Globe, Menu, X, Quote,
  ChevronRight, Users, Building2, TrendingUp, Clock3,
  CreditCard, Zap, PlayCircle, Plane, MapPin,
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

/* ─── Data ───────────────────────────────────────────── */

// Hospital thumbnails
const hospitals = [
  {
    name: 'Apollo Hospitals',
    tag: 'JCI Accredited · 30+ Years',
    city: 'Delhi · Chennai · Mumbai',
    img: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=400&q=75',
    color: 'from-sky-600 to-sky-800',
  },
  {
    name: 'Medanta – The Medicity',
    tag: 'JCI Accredited · Superspecialty',
    city: 'Gurugram',
    img: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&q=75',
    color: 'from-teal-600 to-teal-800',
  },
  {
    name: 'Fortis Memorial (FMRI)',
    tag: 'NABH · Tertiary Care',
    city: 'Gurugram',
    img: 'https://images.unsplash.com/photo-1632833239869-a37e3a5806d2?w=400&q=75',
    color: 'from-indigo-600 to-indigo-800',
  },
  {
    name: 'Max Healthcare',
    tag: 'JCI Accredited · 17 Hospitals',
    city: 'Delhi NCR',
    img: 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=400&q=75',
    color: 'from-emerald-600 to-emerald-800',
  },
];

// Medical specialty thumbnails
const specialties = [
  {
    name: 'Cardiology & Cardiac Surgery',
    sub: 'CABG · Valve Replacement · TAVR',
    img: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=400&q=75',
    badge: '★ Most Requested',
    badgeColor: 'bg-amber-100 text-amber-700',
  },
  {
    name: 'Oncology & Cancer Care',
    sub: 'CyberKnife · Immunotherapy · BMT',
    img: 'https://images.unsplash.com/photo-1579154341098-e4e158cc7f55?w=400&q=75',
    badge: '',
    badgeColor: '',
  },
  {
    name: 'Orthopedics & Joint Care',
    sub: 'Robotic Knee · Hip · Spine',
    img: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=400&q=75',
    badge: '',
    badgeColor: '',
  },
  {
    name: 'Neurosurgery',
    sub: 'Gamma Knife · Neuro-Navigation',
    img: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=400&q=75',
    badge: '',
    badgeColor: '',
  },
  {
    name: 'Organ Transplants',
    sub: 'Liver · Kidney · Living-donor',
    img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&q=75',
    badge: '',
    badgeColor: '',
  },
  {
    name: 'Reproductive & IVF',
    sub: 'ICSI · PGT-A · Fertility Preservation',
    img: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=400&q=75',
    badge: '',
    badgeColor: '',
  },
];

const whyIndia = [
  { icon: Wallet,     label: '60–80%\nCost Savings',          color: 'text-sky-600 bg-sky-50' },
  { icon: Award,      label: 'World-Class\nDoctors & Surgeons', color: 'text-violet-600 bg-violet-50' },
  { icon: ShieldCheck,label: 'NABH/JCI\nAccredited Hospitals', color: 'text-emerald-600 bg-emerald-50' },
  { icon: Globe2,     label: 'Rich Culture\n& Travel Experience',color: 'text-amber-600 bg-amber-50' },
  { icon: Heart,      label: 'Warm &\nCaring People',          color: 'text-rose-600 bg-rose-50' },
];

const whyGHT = [
  { icon: BadgeCheck, label: 'Verified Patients\n& Secure Platform',    color: 'text-sky-600 bg-sky-50' },
  { icon: Building2,  label: 'Trusted Hospital\nNetwork',               color: 'text-teal-600 bg-teal-50' },
  { icon: Handshake,  label: 'End-to-End\nSupport',                     color: 'text-indigo-600 bg-indigo-50' },
  { icon: CreditCard, label: 'Transparent Pricing\nNo Hidden Costs',    color: 'text-emerald-600 bg-emerald-50' },
  { icon: Smile,      label: 'Personalized\n& Caring Experience',       color: 'text-rose-600 bg-rose-50' },
];

const testimonials = [
  {
    name: 'Ali Al-Balushi', country: 'Muscat, Oman', flag: '🇴🇲',
    treatment: 'Cardiac Surgery — Medanta, Gurugram',
    quote: 'GoHealthTrip made travelling to India for heart surgery feel completely manageable. My coordinator was with me every single step.',
    rating: 5, savings: '68% cost savings vs UAE',
  },
  {
    name: 'Amara Diallo', country: 'Dakar, Senegal', flag: '🇸🇳',
    treatment: 'Kidney Transplant — Apollo Hospitals, Delhi',
    quote: 'From document submission to post-op follow-up, every detail was handled professionally. I felt safe and well-informed throughout.',
    rating: 5, savings: '72% cost savings vs France',
  },
  {
    name: 'Natalia Ivanova', country: 'Moscow, Russia', flag: '🇷🇺',
    treatment: 'IVF & Genetic Screening — Max Healthcare',
    quote: 'GoHealthTrip connected us with the right specialists and handled every visa and travel detail. We are now proud parents.',
    rating: 5, savings: '55% cost savings vs Germany',
  },
];


const navLinks = [
  { name: 'How It Works', href: '#how-it-works' },
  { name: 'Specialties', href: '#specialties' },
  { name: 'Hospitals', href: '#hospitals' },
  { name: 'Find Treatment', href: '/find-treatment' },
  { name: 'Demo Journey', href: '/demo-case' },
];

/* ─── Page ───────────────────────────────────────────── */
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

  useEffect(() => {
    const timer = setInterval(() => setActiveTestimonial(p => (p + 1) % testimonials.length), 5500);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="min-h-screen bg-white overflow-x-hidden">

      {/* ══ HEADER ══════════════════════════════════════════════════════ */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/97 backdrop-blur-md shadow-md border-b border-slate-100'
                 : 'bg-white border-b border-slate-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-[68px]">

            {/* Official Brand Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <Logo variant="compact" theme="light" />
              <span className="hidden sm:inline-block text-[10px] font-bold text-teal-800 uppercase bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
                India HQ
              </span>
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
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 bg-slate-50">
                <Globe className="w-3.5 h-3.5 text-slate-400" />
                <select value={currentLang} onChange={e => setCurrentLang(e.target.value)}
                  aria-label="Language" className="bg-transparent border-none outline-none cursor-pointer">
                  <option value="EN">English</option>
                  <option value="AR">العربية</option>
                  <option value="SW">Kiswahili</option>
                  <option value="FR">Français</option>
                  <option value="RU">Русский</option>
                  <option value="BN">বাংলা</option>
                </select>
              </div>
              <Link href="/dashboard"
                className="px-3.5 py-2 text-xs font-semibold text-slate-700 border border-slate-200 hover:border-sky-300 hover:text-sky-700 rounded-lg transition">
                Coordinator Portal
              </Link>
              <Link href="/start-journey"
                className="px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center gap-1.5">
                Start Treatment <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Mobile toggle */}
            <button onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition" aria-label="Toggle menu">
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-slate-100 px-4 pt-2 pb-4 space-y-1">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-700 hover:bg-sky-50 hover:text-sky-700 transition">
                {link.name}
              </Link>
            ))}
            <div className="pt-2 border-t border-slate-100">
              <Link href="/start-journey" onClick={() => setMobileOpen(false)}
                className="block w-full py-2.5 text-center text-sm font-bold text-white bg-gradient-to-r from-sky-500 to-indigo-600 rounded-lg shadow">
                Start Treatment Journey
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* ══ HERO: LIVE SCREENSAVER & GLOBAL JOURNEYS TO INDIA ═════════ */}
      <HeroScreensaver />


      {/* ══ THE HAPPY PATH — GOHEALTHTRIP CAREPATH JOURNEY ═══════════ */}
      <CarePathJourney />

      {/* ══ HOSPITAL PARTNERS (with image thumbnails) ════════════════════ */}
      <section id="hospitals" className="py-16 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-block px-3 py-1 text-xs font-bold text-sky-700 bg-sky-100 rounded-full uppercase tracking-wider mb-3">Partner Hospitals</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">India's Highest-Accredited Healthcare Networks</h2>
            <p className="mt-2 text-slate-500 text-sm">Every hospital in our network is independently verified for accreditation, clinical outcomes and patient safety.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {hospitals.map((h, i) => (
              <div key={i} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl card-hover border border-slate-100">
                {/* Hospital image */}
                <div className="relative h-40 overflow-hidden">
                  <Image
                    src={h.img}
                    alt={h.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,25vw"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${h.color} opacity-40`} />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-0.5 text-[9px] font-bold text-emerald-700 flex items-center gap-1">
                    <BadgeCheck className="w-2.5 h-2.5" /> Verified
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-slate-900 text-sm">{h.name}</h3>
                  <p className="text-xs text-sky-600 font-semibold mt-0.5">{h.tag}</p>
                  <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                    <Globe className="w-3 h-3" /> {h.city}
                  </p>
                  <Link href="/hospitals"
                    className="mt-3 text-xs font-semibold text-sky-600 hover:text-sky-800 flex items-center gap-0.5 transition">
                    View hospital <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/hospitals"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-sky-500 text-sky-600 font-bold rounded-xl hover:bg-sky-500 hover:text-white transition-all text-sm">
              View All Partner Hospitals <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══ MEDICAL SPECIALTIES (with image thumbnails) ═════════════════ */}
      <section id="specialties" className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-block px-3 py-1 text-xs font-bold text-indigo-700 bg-indigo-100 rounded-full uppercase tracking-wider mb-3">Medical Specialties</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">Centers of Clinical Excellence</h2>
            <p className="mt-2 text-slate-500 text-sm">Explore accredited specialties across India's top quaternary hospitals.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {specialties.map((spec, i) => (
              <Link href="/find-treatment" key={i}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-100 card-hover block">
                {/* Image thumbnail */}
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={spec.img}
                    alt={spec.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" />
                  {spec.badge && (
                    <span className={`absolute top-3 left-3 text-[10px] font-bold px-2 py-0.5 rounded-full ${spec.badgeColor}`}>
                      {spec.badge}
                    </span>
                  )}
                  <div className="absolute bottom-3 left-4 right-4">
                    <h3 className="font-bold text-white text-sm leading-snug">{spec.name}</h3>
                  </div>
                </div>
                {/* Content */}
                <div className="p-4 flex items-center justify-between">
                  <p className="text-xs text-slate-500">{spec.sub}</p>
                  <span className="text-xs font-semibold text-sky-600 flex items-center gap-0.5 group-hover:gap-1.5 transition-all">
                    Explore <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/find-treatment"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-indigo-500 text-indigo-600 font-bold rounded-xl hover:bg-indigo-500 hover:text-white transition-all text-sm">
              Browse All Treatments <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══ WHY INDIA + WHY GOHEALTHTRIP ════════════════════════════════ */}
      <section className="py-16 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">

            {/* Why India */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              {/* Header image strip */}
              <div className="relative h-40">
                <Image
                  src="https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&q=75"
                  alt="Taj Mahal - India"
                  fill
                  className="object-cover"
                  sizes="(max-width:768px) 100vw,50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-sky-900/80 to-sky-700/60" />
                <div className="absolute inset-0 flex items-center px-6">
                  <div>
                    <h3 className="text-xl font-extrabold text-white">WHY INDIA?</h3>
                    <p className="text-sky-200 text-xs mt-0.5">The global destination for affordable, world-class medical care</p>
                  </div>
                </div>
              </div>
              <div className="p-5 grid grid-cols-5 gap-3">
                {whyIndia.map((w, i) => {
                  const Icon = w.icon;
                  const lines = w.label.split('\n');
                  return (
                    <div key={i} className="flex flex-col items-center text-center gap-2">
                      <div className={`w-11 h-11 rounded-xl ${w.color} flex items-center justify-center`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <p className="text-[10px] text-slate-600 font-semibold leading-snug">
                        {lines.map((l, li) => <span key={li} className="block">{l}</span>)}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Why GoHealthTrip */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="relative h-40">
                <Image
                  src="https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=800&q=75"
                  alt="Medical care team"
                  fill
                  className="object-cover"
                  sizes="(max-width:768px) 100vw,50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/80 to-indigo-700/60" />
                <div className="absolute inset-0 flex items-center px-6">
                  <div>
                    <h3 className="text-xl font-extrabold text-white">WHY GOHEALTHTRIP?</h3>
                    <p className="text-indigo-200 text-xs mt-0.5">Your trusted partner for the entire medical journey</p>
                  </div>
                </div>
              </div>
              <div className="p-5 grid grid-cols-5 gap-3">
                {whyGHT.map((w, i) => {
                  const Icon = w.icon;
                  const lines = w.label.split('\n');
                  return (
                    <div key={i} className="flex flex-col items-center text-center gap-2">
                      <div className={`w-11 h-11 rounded-xl ${w.color} flex items-center justify-center`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <p className="text-[10px] text-slate-600 font-semibold leading-snug">
                        {lines.map((l, li) => <span key={li} className="block">{l}</span>)}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIALS ════════════════════════════════════════════════ */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-block px-3 py-1 text-xs font-bold text-emerald-700 bg-emerald-100 rounded-full uppercase tracking-wider mb-3">Patient Stories</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">Lives Changed by Expert Care</h2>
          </div>

          <div className="bg-gradient-to-br from-slate-50 to-sky-50 rounded-3xl shadow border border-slate-100 p-8 md:p-10 relative overflow-hidden">
            <Quote className="absolute top-6 right-8 w-16 h-16 text-slate-100" />
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
                  <p className="font-bold text-slate-900 text-sm">{testimonials[activeTestimonial].flag} {testimonials[activeTestimonial].name}</p>
                  <p className="text-xs text-slate-500">{testimonials[activeTestimonial].country}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-500">{testimonials[activeTestimonial].treatment}</p>
                <p className="text-sm font-bold text-emerald-600 mt-0.5">{testimonials[activeTestimonial].savings}</p>
              </div>
            </div>
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setActiveTestimonial(i)}
                  className={`h-2 rounded-full transition-all ${i === activeTestimonial ? 'w-6 bg-sky-500' : 'w-2 bg-slate-200 hover:bg-slate-300'}`}
                  aria-label={`Testimonial ${i + 1}`} />
              ))}
            </div>
          </div>

          {/* Stat row */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Users,        val: '500+', label: 'Patients Served' },
              { icon: CheckCircle2, val: '98%',  label: 'Satisfaction Rate' },
              { icon: Globe2,       val: '7',    label: 'Countries' },
              { icon: Award,        val: '50+',  label: 'Partner Hospitals' },
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

      {/* ══ INDIA BANNER (Taj Mahal landscape) ══════════════════════════ */}
      <section className="relative h-56 md:h-72 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=75"
          alt="Heal in India — Experience More"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-sky-900/80 via-sky-800/60 to-indigo-900/70" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <p className="text-sky-300 text-xs font-semibold uppercase tracking-widest mb-2">Care Beyond Borders</p>
          <h2 className="text-2xl md:text-4xl font-extrabold text-white italic mb-4">
            Healing People · Connecting Cultures · Building a Brighter Tomorrow
          </h2>
          <Link href="/start-journey"
            className="inline-flex items-center gap-2 px-7 py-3 bg-sky-500 hover:bg-sky-400 text-white font-bold rounded-xl shadow-xl hover:scale-105 transition-all text-sm">
            Partner with Us — Invest in a Healthier World <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ══ FINAL CTA ═══════════════════════════════════════════════════ */}
      <section className="py-20 bg-gradient-to-r from-sky-700 via-indigo-700 to-violet-800">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-3">Start Your Medical Journey Today</h2>
          <p className="text-sky-200 text-sm mb-7 max-w-xl mx-auto leading-relaxed">
            Get a personalised hospital proposal within 48 hours. No payment required to submit. Available 24/7 in Arabic, English, French, Swahili, Russian and Bengali.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/start-journey"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-indigo-700 font-bold rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition-all text-sm">
              <Zap className="w-4 h-4" /> Get Free Treatment Proposal
            </Link>
            <Link href="/demo-case"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/15 hover:bg-white/25 text-white font-semibold border border-white/25 rounded-xl transition text-sm">
              <PlayCircle className="w-4 h-4" /> See a Sample Journey
            </Link>
          </div>
          <p className="mt-5 text-xs text-sky-300 flex items-center justify-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Free clinical consultation · No hidden fees · Your data is encrypted
          </p>
        </div>
      </section>

      {/* ══ FOOTER ══════════════════════════════════════════════════════ */}
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white font-black">G</div>
                <div>
                  <span className="font-extrabold text-white text-lg">GoHealth<span className="text-sky-400">Trip</span></span>
                  <p className="text-[10px] text-slate-500">Better Care. Brighter Journeys.</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-slate-500 max-w-xs">
                Headquartered in New Delhi, India. Connecting international patients with world-class healthcare since 2024.
                <br /><strong className="text-slate-400">www.gohealthtrip.com</strong>
              </p>
              <p className="mt-3 text-xs text-slate-600">Global Patients · Indian Excellence · A Healthier Tomorrow</p>
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm mb-3">Patient Services</h4>
              <ul className="space-y-2">
                {[['Start Journey','/start-journey'],['Find Treatment','/find-treatment'],['Hospitals & Doctors','/hospitals'],['My Case','/my-case'],['Demo Journey','/demo-case']].map(([label,href]) => (
                  <li key={href}><Link href={href} className="text-sm text-slate-500 hover:text-sky-400 transition">{label}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm mb-3">Contact Us</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-sky-500" /> +91 11 4567 8900</li>
                <li className="flex items-center gap-2"><Globe className="w-3.5 h-3.5 text-sky-500" /> care@gohealthtrip.in</li>
                <li className="flex items-start gap-2 mt-1 text-xs leading-relaxed">
                  <Lock className="w-3.5 h-3.5 text-sky-500 mt-0.5 flex-shrink-0" />
                  <span>24/7 coordination in EN · AR · SW · FR · RU · BN</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-600">
            <p>© {new Date().getFullYear()} GoHealthTrip. All rights reserved.</p>
            <p className="text-center">Compliant with DPDP Act 2023 · ABDM Standards · NABH Medical Travel Guidelines</p>
            <p><span className="text-slate-700">⚠ Demo environment — not a registered medical provider.</span></p>
          </div>
        </div>
      </footer>
    </main>
  );
}
