'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Stethoscope,
  Heart,
  Sparkles,
  ArrowRight,
  ChevronRight,
  CheckCircle2,
  TrendingDown,
  Clock,
  ShieldCheck,
  Zap,
  Activity,
  Award
} from 'lucide-react';

interface Specialty {
  id: string;
  name: string;
  category: string;
  tagline: string;
  procedures: string[];
  costAtHome: string;
  costInIndia: string;
  savingsPercent: string;
  typicalStay: string;
  img: string;
  badge: string;
  badgeColor: string;
  themeColor: string;
  accentBorder: string;
}

const specialtyData: Specialty[] = [
  {
    id: 'cardiac',
    name: 'Cardiology & Cardiac Surgery',
    category: 'Heart & Vascular',
    tagline: 'Minimally invasive CABG, valve replacement & pediatric cardiac care',
    procedures: ['Robotic Heart Bypass (CABG)', 'TAVR & Valve Replacements', 'Pediatric Cardiac Surgery (VSD/ASD)'],
    costAtHome: '$125,000',
    costInIndia: '$7,500',
    savingsPercent: '85%',
    typicalStay: '7–10 Days Stay',
    img: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=800&q=75',
    badge: '★ High Demand',
    badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
    themeColor: 'bg-rose-600',
    accentBorder: 'hover:border-rose-500 hover:ring-2 hover:ring-rose-500/20',
  },
  {
    id: 'oncology',
    name: 'Oncology & Cancer Care',
    category: 'Cancer Sciences',
    tagline: 'Precision radiation, immunotherapy & bone marrow transplants',
    procedures: ['CyberKnife Robotic Radiosurgery', 'Proton Beam Therapy', 'Bone Marrow Transplants (BMT)'],
    costAtHome: '$75,000',
    costInIndia: '$12,000',
    savingsPercent: '84%',
    typicalStay: '10–14 Days Stay',
    img: 'https://images.unsplash.com/photo-1579154341098-e4e158cc7f55?w=800&q=75',
    badge: 'Precision Tech',
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
    themeColor: 'bg-purple-600',
    accentBorder: 'hover:border-purple-500 hover:ring-2 hover:ring-purple-500/20',
  },
  {
    id: 'ortho',
    name: 'Orthopedics & Joint Reconstruction',
    category: 'Bone & Joint',
    tagline: 'Robotic knee/hip replacements & complex spine fusion',
    procedures: ['Robotic Bilateral Knee Replacement', 'Hip Resurfacing & Reconstruction', 'Multi-Level Spine Fusion Surgery'],
    costAtHome: '$48,000',
    costInIndia: '$6,800',
    savingsPercent: '85%',
    typicalStay: '5–7 Days Stay',
    img: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&q=75',
    badge: 'Robotic Precision',
    badgeColor: 'bg-teal-50 text-teal-700 border-teal-200',
    themeColor: 'bg-teal-600',
    accentBorder: 'hover:border-teal-500 hover:ring-2 hover:ring-teal-500/20',
  },
  {
    id: 'neuro',
    name: 'Neurosurgery & Spine Sciences',
    category: 'Brain & Spine',
    tagline: 'Endoscopic skull-base surgery & micro-neurovascular intervention',
    procedures: ['Gamma Knife Radiosurgery', 'Brain Tumor Resection with Navigation', 'Minimally Invasive Spine Decompression'],
    costAtHome: '$95,000',
    costInIndia: '$11,500',
    savingsPercent: '87%',
    typicalStay: '7–12 Days Stay',
    img: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&q=75',
    badge: 'Micro-Surgical',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    themeColor: 'bg-blue-600',
    accentBorder: 'hover:border-blue-500 hover:ring-2 hover:ring-blue-500/20',
  },
  {
    id: 'transplant',
    name: 'Multi-Organ Transplants',
    category: 'Transplantation',
    tagline: 'Living-donor liver, kidney & bone marrow with ethical governance',
    procedures: ['Living-Donor Liver Transplantation', 'ABO-Incompatible Kidney Transplant', 'Autologous & Allogeneic BMT'],
    costAtHome: '$350,000',
    costInIndia: '$34,000',
    savingsPercent: '90%',
    typicalStay: '21–28 Days Stay',
    img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=75',
    badge: 'Highest Savings',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    themeColor: 'bg-emerald-600',
    accentBorder: 'hover:border-emerald-500 hover:ring-2 hover:ring-emerald-500/20',
  },
  {
    id: 'fertility',
    name: 'Reproductive Medicine & Advanced IVF',
    category: 'IVF & Genetics',
    tagline: 'ICSI, blastocyst culture & pre-implantation genetic screening (PGT-A)',
    procedures: ['IVF with PGT-A Genetic Screening', 'ICSI & Assisted Hatching', 'Egg/Sperm Vitrification & Preservation'],
    costAtHome: '$28,000',
    costInIndia: '$5,800',
    savingsPercent: '79%',
    typicalStay: '14–18 Days Stay',
    img: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=800&q=75',
    badge: 'Genetic Screening',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
    themeColor: 'bg-amber-600',
    accentBorder: 'hover:border-amber-500 hover:ring-2 hover:ring-amber-500/20',
  },
];

const specialtyFilters = [
  'All Specialties',
  'Heart & Vascular',
  'Cancer Sciences',
  'Bone & Joint',
  'Brain & Spine',
  'Transplantation',
  'IVF & Genetics',
];

export default function MedicalSpecialtiesSection() {
  const [selectedCategory, setSelectedCategory] = useState('All Specialties');

  const filteredSpecialties = selectedCategory === 'All Specialties'
    ? specialtyData
    : specialtyData.filter((s) => s.category === selectedCategory);

  return (
    <section
      id="specialties"
      aria-label="GoHealthTrip Medical Specialties"
      className="relative py-20 bg-gradient-to-b from-white via-slate-50/70 to-white overflow-hidden border-b border-slate-100"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">

        {/* ─── 1. SECTION HEADER (CarePath Aligned) ──────────────────── */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-800 text-xs font-extrabold tracking-[0.25em] uppercase mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>CENTERS OF CLINICAL EXCELLENCE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            World-Class{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-sky-600 to-indigo-600">
              Medical Specialties
            </span>
          </h2>

          <p className="mt-3 text-lg sm:text-xl font-bold text-slate-700">
            Advanced quaternary procedures delivering 70% to 85% cost savings with uncompromised clinical outcomes.
          </p>

          <p className="mt-2 text-sm sm:text-base text-slate-500 max-w-2xl mx-auto leading-relaxed">
            From robotic joint replacements and minimally invasive heart bypasses to living-donor organ transplants and stereotactic oncology, discover specialized medical departments in India.
          </p>

          {/* Interactive Specialty Filter Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {specialtyFilters.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-2xl text-xs font-extrabold transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20 scale-105'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* ─── 2. SPECIALTY CARDS GRID (CarePath Aligned) ─────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {filteredSpecialties.map((s) => (
            <div
              key={s.id}
              className={`group bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between ${s.accentBorder}`}
            >
              {/* Card Image Banner */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                <Image
                  src={s.img}
                  alt={s.name}
                  fill
                  quality={85}
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/20 to-black/20" />

                {/* Top-left: Savings percentage pill */}
                <div className="absolute top-3 left-3 bg-emerald-500 text-slate-950 font-black px-2.5 py-1 rounded-full text-[10px] shadow-md flex items-center gap-1 border border-emerald-400">
                  <TrendingDown className="w-3 h-3 text-slate-950" />
                  <span>{s.savingsPercent} LOWER COST</span>
                </div>

                {/* Top-right: Badge */}
                <div className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold border backdrop-blur-md shadow-sm ${s.badgeColor}`}>
                  {s.badge}
                </div>

                {/* Bottom title overlay */}
                <div className="absolute bottom-3 left-4 right-4">
                  <h3 className="font-black text-white text-lg leading-snug drop-shadow-sm group-hover:text-teal-200 transition">
                    {s.name}
                  </h3>
                  <p className="text-[11px] text-slate-200 font-semibold mt-0.5">
                    {s.tagline}
                  </p>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">

                {/* Benchmark Cost Comparison Box */}
                <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-2xl border border-slate-200/80 text-center">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">
                      US / UK Cost
                    </span>
                    <span className="text-xs font-bold text-slate-400 line-through">
                      {s.costAtHome}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-teal-700 font-black block uppercase tracking-wider">
                      Cost in India
                    </span>
                    <span className="text-sm font-black text-emerald-600">
                      {s.costInIndia}
                    </span>
                  </div>
                </div>

                {/* Core Procedures Checklist */}
                <div className="space-y-1.5">
                  <div className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                    Featured Procedures
                  </div>
                  <div className="space-y-1">
                    {s.procedures.map((proc, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 flex-shrink-0" />
                        <span>{proc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stay and Hospital Duration Tag */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-slate-500 font-semibold">
                    <Clock className="w-3.5 h-3.5 text-sky-600" />
                    <span>{s.typicalStay}</span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    JCI Accredited Suites
                  </span>
                </div>

                {/* Action CTA */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                  <Link
                    href={`/find-treatment?specialty=${encodeURIComponent(s.name)}`}
                    className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1 transition group-hover:gap-1.5"
                  >
                    <span>View Specialists & Costs</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    href={`/start-journey?treatment=${encodeURIComponent(s.name)}`}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-teal-600 text-white text-xs font-extrabold shadow-sm transition"
                  >
                    Get Estimate
                  </Link>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* ─── 3. BOTTOM SECOND OPINION & PRICING PANEL (CarePath CTA style) ─ */}
        <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/90 shadow-xl shadow-slate-200/60 overflow-hidden">
          <div className="grid lg:grid-cols-12 gap-6 items-center">

            {/* Left 8 cols: Clinical Second Opinion Assistance */}
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-sky-800 text-xs font-bold border border-sky-200">
                <Activity className="w-3.5 h-3.5 text-sky-600" />
                <span>Multidisciplinary Clinical Evaluation Desk</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Need an Expert Opinion on Your Diagnosis or Treatment?
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
                Upload your MRI, CT scans, and medical history. Our medical advisory desk will coordinate a complimentary multidisciplinary review with treating hospital heads across India within 24–48 hours.
              </p>

              {/* 3 Trust indicators */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <div className="text-base font-black text-slate-900">Zero Obligation</div>
                  <div className="text-[11px] text-slate-500 font-medium">Free Clinical Assessment</div>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <div className="text-base font-black text-teal-700">Multi-Hospital</div>
                  <div className="text-[11px] text-slate-500 font-medium">Comparative Estimates</div>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 col-span-2 sm:col-span-1">
                  <div className="text-base font-black text-indigo-700">100% HIPAA</div>
                  <div className="text-[11px] text-slate-500 font-medium">Encrypted Document Vault</div>
                </div>
              </div>
            </div>

            {/* Right 4 cols: Direct Buttons */}
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-stretch justify-center gap-3">
              <Link
                href="/find-treatment"
                className="w-full text-center px-6 py-3.5 bg-gradient-to-r from-teal-500 via-sky-600 to-indigo-600 hover:from-teal-600 hover:to-indigo-700 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-sky-500/25 hover:shadow-xl transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
              >
                <Stethoscope className="w-4 h-4" />
                <span>Explore All Treatments & Costs</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/start-journey"
                className="w-full text-center px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-sm rounded-2xl border border-slate-200 transition flex items-center justify-center gap-2"
              >
                <span>Upload Reports for Free Review</span>
              </Link>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
