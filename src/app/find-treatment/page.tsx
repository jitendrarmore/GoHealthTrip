'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import {
  HeartPulse, Sparkles, Stethoscope, Compass, Award, ShieldCheck,
  ArrowRight, Search, CheckCircle2, Clock, DollarSign, Building2,
  BadgeCheck, Zap, Filter, TrendingDown, ChevronRight
} from 'lucide-react';

const treatments = [
  {
    name: 'Coronary Artery Bypass Grafting (CABG)',
    category: 'Cardiology',
    typicalStay: '7 Days Hospital + 7 Days Hotel',
    priceRange: '$5,200 – $7,800 USD',
    costAtHome: '$125,000 USD',
    savings: '75%',
    hospitals: ['Indraprastha Apollo', 'Medanta – The Medicity', 'Fortis Memorial (FMRI)'],
    icon: HeartPulse,
    img: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=600&q=75',
    description: 'Minimally invasive or off-pump bypass restoring myocardial blood flow using arterial and venous grafts by India\'s senior cardiac surgeons.',
    accentBorder: 'border-slate-200/90 hover:border-rose-500 hover:ring-2 hover:ring-rose-500/20',
    tagColor: 'bg-rose-50 text-rose-700 border-rose-200',
  },
  {
    name: 'Bilateral Robotic Total Knee Replacement',
    category: 'Orthopedics',
    typicalStay: '5 Days Hospital + 7 Days Hotel',
    priceRange: '$6,000 – $8,500 USD',
    costAtHome: '$48,000 USD',
    savings: '82%',
    hospitals: ['Max Super Speciality Saket', 'Apollo Hospitals', 'Manipal Bengaluru'],
    icon: Stethoscope,
    img: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=600&q=75',
    description: 'Computer-navigated robotic joint replacement using FDA-approved titanium implants with sub-millimeter precision and rapid recovery protocols.',
    accentBorder: 'border-slate-200/90 hover:border-teal-500 hover:ring-2 hover:ring-teal-500/20',
    tagColor: 'bg-teal-50 text-teal-700 border-teal-200',
  },
  {
    name: 'Allogeneic Bone Marrow Transplant (BMT)',
    category: 'Oncology',
    typicalStay: '28 Days HEPA Isolation + 30 Days Hotel',
    priceRange: '$22,000 – $32,000 USD',
    costAtHome: '$180,000 USD',
    savings: '85%',
    hospitals: ['Fortis Memorial (FMRI)', 'Medanta Gurugram', 'Apollo Cancer Institute'],
    icon: Sparkles,
    img: 'https://images.unsplash.com/photo-1579154341098-e4e158cc7f55?w=600&q=75',
    description: 'Conditioning therapy followed by HLA-matched donor stem cell infusion in positive-pressure HEPA isolation suites with continuous pediatric oncology care.',
    accentBorder: 'border-slate-200/90 hover:border-purple-500 hover:ring-2 hover:ring-purple-500/20',
    tagColor: 'bg-purple-50 text-purple-700 border-purple-200',
  },
  {
    name: 'Living Donor Liver Transplant',
    category: 'Transplants',
    typicalStay: '21 Days Hospital + 21 Days Hotel',
    priceRange: '$28,000 – $36,000 USD',
    costAtHome: '$350,000 USD',
    savings: '90%',
    hospitals: ['Medanta Gurugram', 'Indraprastha Apollo', 'Max Healthcare'],
    icon: Award,
    img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=75',
    description: 'Complete living-related donor liver transplantation with comprehensive pre-transplant HLA evaluation and government authorization liaison.',
    accentBorder: 'border-slate-200/90 hover:border-emerald-500 hover:ring-2 hover:ring-emerald-500/20',
    tagColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  {
    name: 'Deep Brain Stimulation (DBS) & Spine Surgery',
    category: 'Neurosurgery',
    typicalStay: '7 Days Hospital + 10 Days Hotel',
    priceRange: '$18,000 – $24,000 USD',
    costAtHome: '$95,000 USD',
    savings: '78%',
    hospitals: ['Apollo Delhi', 'Medanta Gurugram', 'Fortis FMRI'],
    icon: Compass,
    img: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&q=75',
    description: 'Stereotactic micro-implantation coupled with neuro-stimulator calibration for Parkinson\'s, tremors, and complex cervical spine decompression.',
    accentBorder: 'border-slate-200/90 hover:border-blue-500 hover:ring-2 hover:ring-blue-500/20',
    tagColor: 'bg-blue-50 text-blue-700 border-blue-200',
  },
  {
    name: 'IVF Cycle with ICSI & PGT-A Genetic Screening',
    category: 'Fertility',
    typicalStay: '14–18 Days Outpatient / Hotel',
    priceRange: '$3,800 – $5,500 USD',
    costAtHome: '$28,000 USD',
    savings: '80%',
    hospitals: ['Max Healthcare IVF Center', 'Apollo Cradle', 'Nova IVF Fertility'],
    icon: ShieldCheck,
    img: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=600&q=75',
    description: 'Advanced intracytoplasmic sperm injection and preimplantation genetic aneuploidy screening with India\'s premier fertility laboratories.',
    accentBorder: 'border-slate-200/90 hover:border-amber-500 hover:ring-2 hover:ring-amber-500/20',
    tagColor: 'bg-amber-50 text-amber-700 border-amber-200',
  },
];

const categories = ['ALL', 'Cardiology', 'Orthopedics', 'Oncology', 'Transplants', 'Neurosurgery', 'Fertility'];

export default function FindTreatmentPage() {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = treatments.filter((t) => {
    const matchesCat = selectedCategory === 'ALL' || t.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      t.name.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-1">
        {/* ── 1. CarePath-Aligned Hero Banner ────────────────────────────── */}
        <section className="relative py-16 sm:py-20 bg-gradient-to-b from-white via-slate-50/70 to-slate-50 overflow-hidden border-b border-slate-100">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 text-center">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-800 text-xs font-extrabold tracking-[0.25em] uppercase mb-4 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>CENTERS OF CLINICAL EXCELLENCE</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight max-w-4xl mx-auto">
              Explore Medical Treatments{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-sky-600 to-indigo-600">
                & Transparent Cost Estimates
              </span>
            </h1>

            <p className="mt-3 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Transparent procedure costs, expected hospital stay durations, and accredited Indian hospital networks — offering up to 85% cost savings with verified clinical outcomes.
            </p>

            {/* Search Bar */}
            <div className="mt-8 max-w-2xl mx-auto relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search procedures — e.g. CABG, Knee Replacement, BMT, IVF, Liver..."
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm transition"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="mt-6 flex flex-wrap gap-2 justify-center">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-2xl text-xs font-extrabold transition-all duration-300 ${
                    selectedCategory === cat
                      ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20 scale-105'
                      : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {cat === 'ALL' ? 'All Treatments' : cat}
                </button>
              ))}
            </div>

            <p className="mt-4 text-xs text-slate-400">
              Showing <strong className="text-slate-700">{filtered.length}</strong> accredited treatment{filtered.length !== 1 ? 's' : ''} {selectedCategory !== 'ALL' ? `in ${selectedCategory}` : ''}
            </p>
          </div>
        </section>

        {/* ── 2. CarePath-Styled Treatment Cards ──────────────────────────── */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {filtered.length === 0 ? (
              <div className="text-center py-16 text-slate-500 bg-white rounded-3xl border border-slate-200 p-8 max-w-xl mx-auto">
                <Search className="w-10 h-10 mx-auto mb-3 text-slate-300" />
                <p className="font-bold text-slate-900">No treatments found for "{searchQuery}"</p>
                <p className="text-xs text-slate-400 mt-1">Try another keyword or reset filters to browse all treatments.</p>
                <button
                  type="button"
                  onClick={() => { setSearchQuery(''); setSelectedCategory('ALL'); }}
                  className="mt-4 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className={`group bg-white rounded-3xl overflow-hidden border shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between ${item.accentBorder}`}
                    >
                      {/* Image Banner */}
                      <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                        <Image
                          src={item.img}
                          alt={item.name}
                          fill
                          quality={85}
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/20 to-black/20" />

                        {/* Top-left: Category pill */}
                        <span className={`absolute top-3 left-3 text-[10px] font-black px-2.5 py-1 rounded-full border backdrop-blur-md shadow-sm ${item.tagColor}`}>
                          {item.category}
                        </span>

                        {/* Top-right: Savings */}
                        <span className="absolute top-3 right-3 text-[10px] font-black px-2.5 py-1 rounded-full bg-emerald-500 text-slate-950 shadow-md border border-emerald-400 flex items-center gap-1">
                          <TrendingDown className="w-3 h-3 text-slate-950" />
                          <span>SAVE {item.savings}</span>
                        </span>

                        {/* Bottom title */}
                        <div className="absolute bottom-3 left-4 right-4">
                          <h3 className="font-black text-white text-base leading-snug drop-shadow-sm group-hover:text-teal-200 transition">
                            {item.name}
                          </h3>
                        </div>
                      </div>

                      {/* Card Content Body */}
                      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                        <p className="text-xs text-slate-500 leading-relaxed min-h-[48px]">
                          {item.description}
                        </p>

                        {/* Indicative Cost & Savings Box */}
                        <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-2xl border border-slate-200/80 text-center">
                          <div>
                            <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">
                              US / UK Cost
                            </span>
                            <span className="text-xs font-bold text-slate-400 line-through">
                              {item.costAtHome}
                            </span>
                          </div>
                          <div>
                            <span className="text-[10px] text-teal-700 font-black block uppercase tracking-wider">
                              Cost in India
                            </span>
                            <span className="text-sm font-black text-emerald-600">
                              {item.priceRange.split('–')[0]}
                            </span>
                          </div>
                        </div>

                        {/* Hospital Stay Duration */}
                        <div className="flex items-center gap-1.5 text-xs text-slate-600 font-semibold py-1">
                          <Clock className="w-3.5 h-3.5 text-sky-600 flex-shrink-0" />
                          <span>{item.typicalStay}</span>
                        </div>

                        {/* Accredited Hospital Network */}
                        <div className="pt-2 border-t border-slate-100">
                          <span className="text-[10px] font-black uppercase text-slate-400 block mb-1.5">
                            Available Quaternary Centers:
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {item.hospitals.map((h) => (
                              <span
                                key={h}
                                className="inline-flex items-center gap-1 text-[10px] bg-slate-100 border border-slate-200/60 text-slate-700 px-2 py-0.5 rounded-lg font-medium"
                              >
                                <Building2 className="w-2.5 h-2.5 text-teal-600" />
                                <span>{h}</span>
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* CTA Button */}
                        <div className="pt-3 border-t border-slate-100">
                          <Link
                            href={`/start-journey?treatment=${encodeURIComponent(item.name)}`}
                            className="w-full py-3 bg-gradient-to-r from-sky-500 via-teal-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white text-xs font-extrabold rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1.5"
                          >
                            <Zap className="w-3.5 h-3.5" />
                            <span>Request Treatment Plan & Quotation</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* ── 3. Bottom Consultation Panel (CarePath CTA style) ───────────── */}
        <section className="py-14 px-4 sm:px-6 lg:px-8 bg-slate-50 border-t border-slate-100">
          <div className="max-w-4xl mx-auto rounded-3xl bg-white p-8 sm:p-10 border border-slate-200 shadow-xl text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto shadow-sm">
              <BadgeCheck className="w-6 h-6" />
            </div>

            <h3 className="text-2xl font-black text-slate-900 tracking-tight">
              Don't See Your Specific Condition or Procedure?
            </h3>

            <p className="text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
              We cover over 150+ sub-specialties across India's leading JCI-accredited quaternary networks. Submit your diagnostic reports and our medical coordinator desk will identify the right chief specialist within 24 hours.
            </p>

            <div className="pt-2">
              <Link
                href="/start-journey"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-sky-500 via-teal-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-sky-500/25 hover:shadow-xl transition-all"
              >
                <span>Submit Your Case for Review</span>
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
