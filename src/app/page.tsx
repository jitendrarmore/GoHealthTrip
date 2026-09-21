import Link from 'next/link';
import { 
  HeartPulse, 
  ShieldCheck, 
  Building2, 
  FileText, 
  Plane, 
  CreditCard, 
  Stethoscope, 
  Award,
  Sparkles,
  ArrowRight,
  Clock,
  Compass
} from 'lucide-react';

export default function HomePage() {
  const specialties = [
    { name: 'Cardiology & Cardiac Surgery', desc: 'CABG, Valve Replacement, Pediatric Cardiac Care', icon: HeartPulse },
    { name: 'Oncology & Cancer Care', desc: 'Surgical, Radiation (CyberKnife) & BMT', icon: Sparkles },
    { name: 'Orthopedics & Joint Care', desc: 'Robotic Knee & Hip Replacements, Spine', icon: Stethoscope },
    { name: 'Neurosurgery & Spine', desc: 'Minimally invasive neuro-navigation', icon: Compass },
    { name: 'Organ Transplants', desc: 'Living-donor Liver & Kidney Transplants', icon: Award },
    { name: 'Reproductive & IVF', desc: 'Advanced ICSI, PGT-A genetic screening', icon: ShieldCheck }
  ];

  const steps = [
    { num: '01', title: 'Case Submission & KYC', desc: 'Share your diagnostic reports and identity securely.' },
    { num: '02', title: 'Clinical Review & AI Summary', desc: 'Indian medical specialists review and structure your case.' },
    { num: '03', title: 'Hospital Match & Proposals', desc: 'Receive transparent quotations from JCI/NABH hospitals.' },
    { num: '04', title: 'Visa & Travel Facilitation', desc: 'Official Hospital VIL letter, e-Medical Visa, and hotel booking.' },
    { num: '05', title: 'Treatment & Recovery in India', desc: 'Airport pickup, dedicated care coordinator, and inpatient care.' },
    { num: '06', title: 'Safe Return & Follow-Up', desc: 'Discharge dossier and post-op remote tele-consultations.' }
  ];

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-md">
              G
            </div>
            <div>
              <span className="font-bold text-lg text-slate-900 tracking-tight">GoHealthTrip</span>
              <span className="text-xs text-sky-600 font-semibold ml-2 px-2 py-0.5 bg-sky-50 rounded-full border border-sky-200">India HQ</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-600">
            <Link href="#how-it-works" className="hover:text-sky-600 transition">How It Works</Link>
            <Link href="#specialties" className="hover:text-sky-600 transition">Specialties</Link>
            <Link href="#hospitals" className="hover:text-sky-600 transition">Hospitals</Link>
            <Link href="/demo-case" className="hover:text-sky-600 transition text-indigo-600 font-semibold">Demo Case Journey</Link>
          </nav>

          <div className="flex items-center space-x-3">
            <Link 
              href="/dashboard" 
              className="px-4 py-2 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
            >
              Coordinator Portal
            </Link>
            <Link 
              href="/start-journey" 
              className="px-4 py-2 text-sm font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-lg shadow transition flex items-center"
            >
              Start Treatment Journey <ArrowRight className="w-4 h-4 ml-1.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-sky-50/50 to-slate-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-sky-100/80 text-sky-800 text-xs font-semibold uppercase tracking-wider mb-6">
              <ShieldCheck className="w-4 h-4 text-sky-600" />
              <span>Accredited JCI & NABH Hospital Coordination</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Your Complete Medical Journey to India,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-indigo-600">
                Coordinated in One Place.
              </span>
            </h1>
            <p className="mt-6 text-lg text-slate-600 leading-relaxed">
              We connect international patients with India’s leading superspecialists and accredited hospitals. Transparent quotations, medical visa facilitation, dedicated airport transfer, and end-to-end clinical coordination.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/start-journey"
                className="px-8 py-3.5 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition transform active:scale-95 flex items-center justify-center"
              >
                Start Your Treatment Journey <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link
                href="/demo-case"
                className="px-8 py-3.5 bg-white hover:bg-slate-100 text-slate-800 font-semibold border border-slate-300 rounded-xl shadow-sm transition flex items-center justify-center"
              >
                View Live Demo Journey (Ali Al-Balushi)
              </Link>
            </div>

            {/* Clinical Disclaimer Alert */}
            <div className="mt-8 text-xs text-slate-500 bg-white/70 p-3 rounded-lg border border-slate-200 inline-block max-w-xl text-left">
              <span className="font-semibold text-slate-700">Notice:</span> GoHealthTrip is an international healthcare facilitation platform. It does not independently diagnose, prescribe, or replace registered medical practitioners.
            </div>
          </div>
        </div>
      </section>

      {/* Specialties Grid */}
      <section id="specialties" className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900">Centers of Clinical Excellence</h2>
            <p className="mt-3 text-slate-600">Explore accredited medical specialties in top Indian quaternary hospitals.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {specialties.map((spec, i) => {
              const Icon = spec.icon;
              return (
                <div key={i} className="p-6 rounded-2xl border border-slate-200 hover:border-sky-500/50 hover:shadow-lg transition bg-slate-50/50 group">
                  <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center mb-4 group-hover:scale-110 transition">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{spec.name}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{spec.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6-Step Journey */}
      <section id="how-it-works" className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900">The 6-Step Coordinated Patient Path</h2>
            <p className="mt-3 text-slate-600">From home country inquiry to successful discharge and post-op follow-up.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((st, i) => (
              <div key={i} className="relative p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
                <span className="text-3xl font-black text-sky-600/20 mb-2 block">{st.num}</span>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{st.title}</h3>
                <p className="text-sm text-slate-600">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hospital Partners */}
      <section id="hospitals" className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-8">
            Partnered with India’s Highest-Accredited Healthcare Networks
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 text-slate-600 font-bold text-lg">
            <span className="hover:text-slate-900 transition">Apollo Hospitals (JCI)</span>
            <span className="hover:text-slate-900 transition">Fortis Memorial (FMRI)</span>
            <span className="hover:text-slate-900 transition">Max Healthcare</span>
            <span className="hover:text-slate-900 transition">Medanta - The Medicity</span>
            <span className="hover:text-slate-900 transition">Manipal Hospitals</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm">
          <p className="text-slate-300 font-semibold">GoHealthTrip Platform — Headquartered in New Delhi, India</p>
          <p className="mt-2 text-xs text-slate-500">
            Compliant with DPDP Act 2023, ABDM standards, and NABH guidelines for medical travel facilitation.
          </p>
          <p className="mt-4 text-xs text-slate-600">
            © {new Date().getFullYear()} GoHealthTrip. All rights reserved. Demo environment.
          </p>
        </div>
      </footer>
    </main>
  );
}
