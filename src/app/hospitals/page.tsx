'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import {
  Star, MapPin, CheckCircle, ArrowRight, Stethoscope,
  BadgeCheck, Globe, Bed, Users, ShieldCheck, Phone,
  Zap, Building2,
} from 'lucide-react';

const hospitals = [
  {
    name: 'Indraprastha Apollo Hospitals',
    location: 'New Delhi (Delhi Mathura Road)',
    accreditations: ['JCI Gold Standard', 'NABH', 'NABL'],
    beds: '710 Beds · 150 ICU',
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
    accentColor: 'border-sky-500',
    tagColor: 'bg-sky-600',
  },
  {
    name: 'Medanta – The Medicity',
    location: 'Gurugram (Delhi NCR)',
    accreditations: ['JCI', 'NABH', 'NABL'],
    beds: '1,250 Beds · 300 ICU',
    rating: 4.9,
    reviews: 1850,
    description: 'Founded by world-renowned cardiac surgeon Dr. Naresh Trehan. State-of-the-art multi-organ transplant and cardiac sciences centre.',
    doctors: [
      { name: 'Dr. Naresh Trehan', specialty: 'Chairman & Chief Cardiac Surgeon' },
      { name: 'Dr. A.S. Soin', specialty: 'Chairman Liver Transplantation' },
    ],
    features: ['Air Ambulance Helipad', 'Dedicated Foreign Patient Wing', 'International Dietary Kitchens'],
    img: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=75',
    color: 'from-teal-600 to-teal-900',
    accentColor: 'border-teal-500',
    tagColor: 'bg-teal-600',
  },
  {
    name: 'Fortis Memorial Research Institute (FMRI)',
    location: 'Gurugram (Sector 44)',
    accreditations: ['JCI', 'NABH', 'NABL'],
    beds: '1,000 Beds · 220 ICU',
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
    accentColor: 'border-indigo-500',
    tagColor: 'bg-indigo-600',
  },
  {
    name: 'Max Super Speciality Hospital',
    location: 'Saket, New Delhi',
    accreditations: ['JCI', 'NABH'],
    beds: '530 Beds · 130 ICU',
    rating: 4.85,
    reviews: 1120,
    description: 'Centre of excellence for Heart & Vascular, Cancer Care, Neurosciences, and Orthopedics — with a dedicated international patient desk.',
    doctors: [
      { name: 'Dr. Harit Chaturvedi', specialty: 'Chairman Cancer Care' },
      { name: 'Dr. S.K.S. Marya', specialty: 'Chairman Orthopedics & Joint Replacement' },
    ],
    features: ['Express OPD for International Patients', 'Halal Food Options', 'Airport Pickup & Drop'],
    img: 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=800&q=75',
    color: 'from-emerald-600 to-emerald-900',
    accentColor: 'border-emerald-500',
    tagColor: 'bg-emerald-600',
  },
];

const stats = [
  { val: '50+', label: 'Partner Hospitals', icon: Building2 },
  { val: '4.9★', label: 'Avg Patient Rating', icon: Star },
  { val: '100%', label: 'JCI / NABH Verified', icon: BadgeCheck },
  { val: '24/7', label: 'International Support', icon: Phone },
];

export default function HospitalsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-1">
        {/* ── Hero ─────────────────────────────────── */}
        <section className="relative overflow-hidden" style={{ minHeight: 260 }}>
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=1400&q=75"
              alt="Modern hospital interior"
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/75 to-slate-800/60" />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-sky-300 text-xs font-semibold uppercase tracking-wider mb-4">
                <BadgeCheck className="w-3.5 h-3.5" /> JCI & NABH Accredited Network
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                India's Highest-Accredited<br />Hospital Networks & Specialists
              </h1>
              <p className="mt-3 text-slate-300 text-sm max-w-lg leading-relaxed">
                Every partner hospital holds Gold-Standard JCI or NABH accreditation and is rigorously vetted for international patient outcomes, infrastructure, and safety.
              </p>
            </div>

            {/* Stat strip */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl">
              {stats.map((s) => {
                const Icon = s.icon;
                return (
                  <div key={s.label} className="glass-card rounded-xl p-3 text-center">
                    <div className="text-xl font-black text-white">{s.val}</div>
                    <p className="text-[10px] text-slate-300 mt-0.5 font-medium">{s.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
          {/* Wave */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 50H1440V25C1200 50 960 0 720 25C480 50 240 0 0 25V50Z" fill="#f8fafc" />
            </svg>
          </div>
        </section>

        {/* ── Hospital Cards ─────────────────────────────── */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto space-y-8">
            {hospitals.map((h, i) => (
              <div key={i} className={`bg-white rounded-3xl shadow-md overflow-hidden border border-slate-100 hover:shadow-xl transition-all card-hover border-l-4 ${h.accentColor}`}>
                <div className="grid md:grid-cols-5 gap-0">
                  {/* Left: Hospital Image */}
                  <div className="md:col-span-2 relative min-h-56 md:min-h-0">
                    <Image
                      src={h.img}
                      alt={h.name}
                      fill
                      className="object-cover"
                      sizes="(max-width:768px) 100vw,40vw"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${h.color} opacity-50`} />
                    {/* Rating badge */}
                    <div className="absolute top-4 left-4 flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 shadow">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="text-xs font-black text-slate-900">{h.rating}</span>
                      <span className="text-[10px] text-slate-500">({h.reviews.toLocaleString()})</span>
                    </div>
                    {/* Accreditation badges */}
                    <div className="absolute bottom-4 left-4 flex flex-wrap gap-1">
                      {h.accreditations.map((acc) => (
                        <span key={acc} className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 bg-emerald-500 text-white rounded-full">
                          <CheckCircle className="w-2.5 h-2.5" /> {acc}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right: Content */}
                  <div className="md:col-span-3 p-6 sm:p-8 flex flex-col justify-between">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xl font-extrabold text-slate-900">{h.name}</h3>
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          <span>{h.location}</span>
                          <span className="mx-1.5 text-slate-300">·</span>
                          <Bed className="w-3.5 h-3.5 text-slate-400" />
                          <span>{h.beds}</span>
                        </div>
                      </div>

                      <p className="text-sm text-slate-600 leading-relaxed">{h.description}</p>

                      {/* Doctors */}
                      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-2">Key Specialists</span>
                        <div className="space-y-2">
                          {h.doctors.map((doc, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-sky-400 to-indigo-500 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                                {doc.name.split(' ').find(w => w !== 'Dr.')![0]}
                              </div>
                              <div>
                                <p className="text-xs font-bold text-slate-900">{doc.name}</p>
                                <p className="text-[10px] text-slate-500">{doc.specialty}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Features */}
                      <div className="flex flex-wrap gap-2">
                        {h.features.map((feat) => (
                          <span key={feat} className="inline-flex items-center gap-1 text-[10px] font-medium text-slate-600 bg-slate-100 px-2 py-1 rounded-lg">
                            <ShieldCheck className="w-3 h-3 text-sky-500 flex-shrink-0" />
                            {feat}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="pt-5 border-t border-slate-100 mt-5">
                      <Link
                        href="/start-journey"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white text-sm font-bold rounded-xl shadow-md hover:shadow-lg transition-all"
                      >
                        <Zap className="w-4 h-4" />
                        Request Quotation from this Hospital
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Bottom CTA ─────────────────────────────────── */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto rounded-3xl bg-gradient-to-r from-sky-600 via-indigo-600 to-violet-700 p-8 text-center shadow-xl">
            <h3 className="text-xl font-extrabold text-white mb-2">Can't decide which hospital?</h3>
            <p className="text-sky-200 text-sm mb-5 max-w-md mx-auto">
              Our clinical coordinators will match you with the best hospital for your specific condition, budget, and travel date.
            </p>
            <Link href="/start-journey"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-indigo-700 font-bold rounded-xl shadow-lg hover:scale-105 transition-all text-sm">
              Get Personalised Hospital Match <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
