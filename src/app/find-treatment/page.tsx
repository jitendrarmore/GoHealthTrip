'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import {
  HeartPulse, Sparkles, Stethoscope, Compass, Award, ShieldCheck,
  ArrowRight, Search, CheckCircle2, Clock, DollarSign, Building2,
  BadgeCheck, Zap, Filter,
} from 'lucide-react';

const treatments = [
  {
    name: 'Coronary Artery Bypass Grafting (CABG)',
    category: 'Cardiology',
    typicalStay: '7 Days Hospital + 7 Days Hotel',
    priceRange: '$5,200 – $7,800 USD',
    savings: '70% vs USA/UK',
    hospitals: ['Medanta – The Medicity', 'Apollo Delhi', 'Fortis Gurugram'],
    icon: HeartPulse,
    img: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=600&q=75',
    description: 'Off-pump or minimally invasive bypass surgery restoring myocardial blood flow using arterial and venous grafts. Performed by India\'s top cardiac surgeons.',
    accentColor: 'border-t-red-500',
    tagColor: 'bg-red-100 text-red-700',
  },
  {
    name: 'Bilateral Robotic Total Knee Replacement',
    category: 'Orthopedics',
    typicalStay: '5 Days Hospital + 10 Days Hotel',
    priceRange: '$6,000 – $8,500 USD',
    savings: '75% vs USA/UK',
    hospitals: ['Max Saket', 'Apollo Delhi', 'Manipal Bengaluru'],
    icon: Stethoscope,
    img: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=600&q=75',
    description: 'Computer-navigated robotic joint replacement using FDA-approved high-flexion titanium implants for superior alignment and longevity.',
    accentColor: 'border-t-sky-500',
    tagColor: 'bg-sky-100 text-sky-700',
  },
  {
    name: 'Allogeneic Bone Marrow Transplant (BMT)',
    category: 'Oncology',
    typicalStay: '28 Days HEPA Isolation + 30 Days Hotel',
    priceRange: '$22,000 – $32,000 USD',
    savings: '65% vs USA/UK',
    hospitals: ['Fortis Memorial (FMRI)', 'Medanta Gurugram'],
    icon: Sparkles,
    img: 'https://images.unsplash.com/photo-1579154341098-e4e158cc7f55?w=600&q=75',
    description: 'Conditioning chemotherapy followed by HLA-matched donor hematopoietic stem cell infusion in positive-pressure HEPA-filtered suites.',
    accentColor: 'border-t-violet-500',
    tagColor: 'bg-violet-100 text-violet-700',
  },
  {
    name: 'Living Donor Liver Transplant',
    category: 'Transplants',
    typicalStay: '21 Days Hospital + 21 Days Hotel',
    priceRange: '$28,000 – $36,000 USD',
    savings: '60% vs USA/UK',
    hospitals: ['Medanta Gurugram', 'Apollo Delhi', 'Max Saket'],
    icon: Award,
    img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=75',
    description: 'Complete living-related donor liver transplantation with comprehensive pre-transplant HLA and vascular evaluation by India\'s finest hepato-surgeons.',
    accentColor: 'border-t-emerald-500',
    tagColor: 'bg-emerald-100 text-emerald-700',
  },
  {
    name: 'Deep Brain Stimulation (DBS) for Parkinson\'s',
    category: 'Neurosurgery',
    typicalStay: '7 Days Hospital + 10 Days Hotel',
    priceRange: '$18,000 – $24,000 USD',
    savings: '68% vs USA/UK',
    hospitals: ['Apollo Delhi', 'Medanta Gurugram', 'Fortis FMRI'],
    icon: Compass,
    img: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&q=75',
    description: 'Stereotactic implantation of electrodes into specific brain targets coupled with neuro-stimulator programming for Parkinson\'s and movement disorders.',
    accentColor: 'border-t-amber-500',
    tagColor: 'bg-amber-100 text-amber-700',
  },
  {
    name: 'IVF Cycle with ICSI & PGT-A Genetic Screening',
    category: 'Fertility',
    typicalStay: '14–18 Days Outpatient / Hotel',
    priceRange: '$3,800 – $5,500 USD',
    savings: '55% vs USA/UK',
    hospitals: ['Max Healthcare IVF Center', 'Apollo Cradle'],
    icon: ShieldCheck,
    img: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=600&q=75',
    description: 'Advanced intracytoplasmic sperm injection and preimplantation genetic aneuploidy screening with India\'s highest IVF success rate protocols.',
    accentColor: 'border-t-pink-500',
    tagColor: 'bg-pink-100 text-pink-700',
  },
];

const categories = ['ALL', 'Cardiology', 'Orthopedics', 'Oncology', 'Transplants', 'Neurosurgery', 'Fertility'];

const categoryColors: Record<string, string> = {
  ALL: 'bg-slate-700 text-white',
  Cardiology: 'bg-red-500 text-white',
  Orthopedics: 'bg-sky-500 text-white',
  Oncology: 'bg-violet-500 text-white',
  Transplants: 'bg-emerald-500 text-white',
  Neurosurgery: 'bg-amber-500 text-white',
  Fertility: 'bg-pink-500 text-white',
};

export default function FindTreatmentPage() {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = treatments.filter((t) => {
    const matchesCat = selectedCategory === 'ALL' || t.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch = t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q) || t.category.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-1">
        {/* ── Hero ──────────────────────────────────────── */}
        <section className="relative overflow-hidden" style={{ minHeight: 240 }}>
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=1400&q=75"
              alt="Medical treatment lab"
              fill
              priority
              className="object-cover object-top"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/90 via-indigo-900/75 to-sky-900/60" />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-sky-300 text-xs font-semibold uppercase tracking-wider mb-4">
                <DollarSign className="w-3.5 h-3.5" /> Transparent Pricing · No Hidden Costs
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Explore Medical Treatments<br />& Cost Ranges in India
              </h1>
              <p className="mt-3 text-indigo-200 text-sm max-w-lg leading-relaxed">
                Transparent procedure information, expected hospital stay duration, and accredited Indian hospital networks — all in one place.
              </p>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 50H1440V25C1200 50 960 0 720 25C480 50 240 0 0 25V50Z" fill="#f8fafc" />
            </svg>
          </div>
        </section>

        {/* ── Search & Filter ───────────────────────────── */}
        <section className="py-8 px-4 sm:px-6 lg:px-8 bg-slate-50">
          <div className="max-w-7xl mx-auto space-y-4">
            {/* Search bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search procedures — e.g. CABG, Knee Replacement, BMT, IVF..."
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm"
              />
            </div>

            {/* Category pills */}
            <div className="flex flex-wrap gap-2 justify-center">
              <span className="flex items-center gap-1 text-xs font-semibold text-slate-500 mr-1">
                <Filter className="w-3.5 h-3.5" /> Filter:
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                    selectedCategory === cat
                      ? categoryColors[cat]
                      : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300 shadow-sm'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <p className="text-center text-xs text-slate-400">
              Showing <strong className="text-slate-600">{filtered.length}</strong> treatment{filtered.length !== 1 ? 's' : ''} {selectedCategory !== 'ALL' ? `in ${selectedCategory}` : ''}
            </p>
          </div>
        </section>

        {/* ── Treatment Cards ───────────────────────────── */}
        <section className="pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {filtered.length === 0 ? (
              <div className="text-center py-16 text-slate-500">
                <Search className="w-10 h-10 mx-auto mb-3 text-slate-300" />
                <p className="font-semibold">No treatments found for "{searchQuery}"</p>
                <button onClick={() => { setSearchQuery(''); setSelectedCategory('ALL'); }}
                  className="mt-3 text-xs text-sky-600 hover:underline">Clear filters</button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className={`bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl overflow-hidden flex flex-col card-hover border-t-4 ${item.accentColor}`}>
                      {/* Thumbnail */}
                      <div className="relative h-44 overflow-hidden">
                        <Image
                          src={item.img}
                          alt={item.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width:768px) 100vw,(max-width:1200px) 50vw,33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                        {/* Category badge */}
                        <span className={`absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full ${item.tagColor}`}>
                          {item.category}
                        </span>
                        {/* Savings badge */}
                        <span className="absolute top-3 right-3 text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-500 text-white">
                          Save {item.savings}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="p-5 flex flex-col flex-1">
                        <div className="flex items-start gap-3 mb-3">
                          <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0">
                            <Icon className="w-5 h-5 text-slate-600" />
                          </div>
                          <h3 className="font-extrabold text-sm text-slate-900 leading-snug">{item.name}</h3>
                        </div>

                        <p className="text-xs text-slate-500 leading-relaxed mb-4 flex-1">{item.description}</p>

                        {/* Cost & Stay */}
                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-2 text-xs mb-4">
                          <div className="flex items-center justify-between">
                            <span className="flex items-center gap-1 text-slate-500"><DollarSign className="w-3.5 h-3.5" /> Indicative Cost</span>
                            <strong className="text-sky-700 font-bold">{item.priceRange}</strong>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="flex items-center gap-1 text-slate-500"><Clock className="w-3.5 h-3.5" /> Expected Stay</span>
                            <span className="text-slate-700 font-semibold text-right max-w-[55%]">{item.typicalStay}</span>
                          </div>
                        </div>

                        {/* Hospital tags */}
                        <div className="mb-4">
                          <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1.5">Partner Hospitals</span>
                          <div className="flex flex-wrap gap-1">
                            {item.hospitals.map((h) => (
                              <span key={h} className="inline-flex items-center gap-1 text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                                <Building2 className="w-2.5 h-2.5" /> {h}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* CTA */}
                        <Link href="/start-journey"
                          className="w-full py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white text-xs font-bold rounded-xl shadow transition flex items-center justify-center gap-1.5">
                          <Zap className="w-3.5 h-3.5" />
                          Get Hospital Quotations
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* ── Bottom CTA ──────────────────────────────────── */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 border-t border-slate-100">
          <div className="max-w-3xl mx-auto rounded-3xl bg-gradient-to-r from-indigo-600 via-sky-600 to-teal-600 p-8 text-center shadow-xl">
            <BadgeCheck className="w-10 h-10 text-white mx-auto mb-3 opacity-80" />
            <h3 className="text-xl font-extrabold text-white mb-2">Don't see your procedure?</h3>
            <p className="text-sky-100 text-sm mb-5 max-w-md mx-auto">
              We cover 150+ procedures across 12 specialties. Submit your case and our clinical team will identify the right specialist within 24 hours.
            </p>
            <Link href="/start-journey"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-indigo-700 font-bold rounded-xl shadow-lg hover:scale-105 transition-all text-sm">
              Submit Your Case <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
