'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { 
  HeartPulse, 
  Sparkles, 
  Stethoscope, 
  Compass, 
  Award, 
  ShieldCheck, 
  Eye, 
  Smile, 
  Activity, 
  Syringe, 
  ArrowRight,
  Search,
  Check
} from 'lucide-react';

export default function FindTreatmentPage() {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const treatments = [
    {
      name: 'Coronary Artery Bypass Grafting (CABG)',
      category: 'Cardiology',
      typicalStay: '7 Days Hospital + 7 Days Hotel',
      priceRange: '$5,200 – $7,800 USD',
      hospitals: ['Medanta - The Medicity', 'Apollo Delhi', 'Fortis Gurugram'],
      icon: HeartPulse,
      description: 'Off-pump or minimally invasive bypass surgery restoring myocardial blood flow using arterial and venous grafts.'
    },
    {
      name: 'Bilateral Robotic Total Knee Replacement',
      category: 'Orthopedics',
      typicalStay: '5 Days Hospital + 10 Days Hotel',
      priceRange: '$6,000 – $8,500 USD',
      hospitals: ['Max Saket', 'Apollo Delhi', 'Manipal Bengaluru'],
      icon: Stethoscope,
      description: 'Computer-navigated robotic joint replacement using FDA-approved high-flexion titanium implants.'
    },
    {
      name: 'Allogeneic Bone Marrow Transplant (BMT)',
      category: 'Oncology',
      typicalStay: '28 Days HEPA Isolation + 30 Days Hotel',
      priceRange: '$22,000 – $32,000 USD',
      hospitals: ['Fortis Memorial (FMRI)', 'Medanta Gurugram'],
      icon: Sparkles,
      description: 'Conditioning chemotherapy followed by HLA-matched donor hematopoietic stem cell infusion in positive-pressure suites.'
    },
    {
      name: 'Living Donor Liver Transplant',
      category: 'Transplants',
      typicalStay: '21 Days Hospital + 21 Days Hotel',
      priceRange: '$28,000 – $36,000 USD',
      hospitals: ['Medanta Gurugram', 'Apollo Delhi', 'Max Saket'],
      icon: Award,
      description: 'Complete living-related donor liver transplantation with comprehensive pre-transplant HLA and vascular evaluation.'
    },
    {
      name: 'Deep Brain Stimulation (DBS) for Parkinson’s',
      category: 'Neurosurgery',
      typicalStay: '7 Days Hospital + 10 Days Hotel',
      priceRange: '$18,000 – $24,000 USD',
      hospitals: ['Apollo Delhi', 'Medanta Gurugram', 'Fortis FMRI'],
      icon: Compass,
      description: 'Stereotactic implantation of electrodes into specific brain targets coupled with neuro-stimulator programming.'
    },
    {
      name: 'IVF Cycle with ICSI & PGT-A Genetic Screening',
      category: 'Fertility',
      typicalStay: '14 – 18 Days Outpatient / Hotel',
      priceRange: '$3,800 – $5,500 USD',
      hospitals: ['Max Healthcare IVF Center', 'Apollo Cradle'],
      icon: ShieldCheck,
      description: 'Advanced intracytoplasmic sperm injection and preimplantation genetic aneuploidy screening with high success protocols.'
    }
  ];

  const categories = ['ALL', 'Cardiology', 'Orthopedics', 'Oncology', 'Transplants', 'Neurosurgery', 'Fertility'];

  const filtered = treatments.filter((t) => {
    const matchesCat = selectedCategory === 'ALL' || t.category === selectedCategory;
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) || t.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Explore Medical Treatments & Indicative Cost Ranges
            </h1>
            <p className="text-sm text-slate-600">
              Transparent procedure information, hospital stay duration, and accredited Indian hospital networks.
            </p>
          </div>

          {/* Search & Category Filter */}
          <div className="flex flex-col sm:flex-row gap-4 max-w-4xl mx-auto">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search procedures (e.g. CABG, Knee Replacement, BMT, IVF)..."
                className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                    selectedCategory === cat
                      ? 'bg-sky-600 text-white shadow-sm'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between hover:border-sky-500/50 hover:shadow-md transition">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center font-bold">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 bg-slate-100 text-slate-700 rounded-full">
                        {item.category}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-extrabold text-lg text-slate-900 leading-snug">{item.name}</h3>
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed">{item.description}</p>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl space-y-1.5 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Indicative Cost:</span>
                        <strong className="text-sky-700 font-bold">{item.priceRange}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Expected Stay:</span>
                        <span className="text-slate-700 font-semibold">{item.typicalStay}</span>
                      </div>
                    </div>

                    <div>
                      <span className="text-[11px] font-bold uppercase text-slate-400 block mb-1">Partner Centers:</span>
                      <div className="flex flex-wrap gap-1">
                        {item.hospitals.map((h, i) => (
                          <span key={i} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-100">
                    <Link
                      href="/start-journey"
                      className="w-full py-2.5 bg-slate-900 hover:bg-sky-600 text-white text-xs font-bold rounded-xl shadow transition flex items-center justify-center"
                    >
                      Get Hospital Quotations <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
