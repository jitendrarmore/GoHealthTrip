'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Building2, Award, Star, MapPin, CheckCircle, ArrowRight, Stethoscope } from 'lucide-react';

export default function HospitalsPage() {
  const hospitals = [
    {
      name: 'Indraprastha Apollo Hospitals [DEMO]',
      location: 'New Delhi (Delhi Mathura Road)',
      accreditations: ['JCI Gold Standard', 'NABH', 'NABL'],
      beds: '710 Beds (150 ICU)',
      rating: 4.9,
      reviews: 1420,
      description: 'First JCI-accredited hospital in India. Pioneer in liver transplants, open-heart CABG, and robotic surgery.',
      doctors: [
        { name: 'Dr. Vivek Gupta', specialty: 'Senior Interventional Cardiologist' },
        { name: 'Dr. Arun Sethi', specialty: 'Robotic Joint Replacement' },
      ],
      features: ['Dedicated International Patient Lounge', 'Arabic & Swahili Interpreters', 'Airport Ambulance Reception']
    },
    {
      name: 'Medanta - The Medicity [DEMO]',
      location: 'Gurugram (Delhi NCR)',
      accreditations: ['JCI', 'NABH', 'NABL'],
      beds: '1,250 Beds (300 ICU)',
      rating: 4.9,
      reviews: 1850,
      description: 'Founded by world-renowned cardiac surgeon Dr. Naresh Trehan. State-of-the-art multi-organ transplant & cardiac sciences.',
      doctors: [
        { name: 'Dr. Naresh Trehan', specialty: 'Chairman & Chief Cardiac Surgeon' },
        { name: 'Dr. A.S. Soin', specialty: 'Chairman Liver Transplantation' },
      ],
      features: ['Air Ambulance Helipad', 'Dedicated Foreign Patient Wing', 'Custom International Dietary Kitchens']
    },
    {
      name: 'Fortis Memorial Research Institute (FMRI) [DEMO]',
      location: 'Gurugram (Sector 44)',
      accreditations: ['JCI', 'NABH', 'NABL'],
      beds: '1,000 Beds (220 ICU)',
      rating: 4.8,
      reviews: 980,
      description: 'Next-generation quaternary care hospital featuring CyberKnife, Gamma Knife, and advanced pediatric bone marrow transplant units.',
      doctors: [
        { name: 'Dr. Vinod Raina', specialty: 'Executive Director Oncology & BMT' },
        { name: 'Dr. Sandeep Vaishya', specialty: 'Director Neurosurgery' },
      ],
      features: ['Multi-lingual Care Navigators', 'Embassy Liaison Desk', 'Integrated Recovery Suites']
    },
    {
      name: 'Max Super Speciality Hospital [DEMO]',
      location: 'Saket, New Delhi',
      accreditations: ['JCI', 'NABH'],
      beds: '530 Beds (130 ICU)',
      rating: 4.85,
      reviews: 1120,
      description: 'Center of excellence for Heart & Vascular Institute, Cancer Care, Neurosciences, and Orthopedics.',
      doctors: [
        { name: 'Dr. Harit Chaturvedi', specialty: 'Chairman Cancer Care' },
        { name: 'Dr. S.K.S. Marya', specialty: 'Chairman Orthopedics & Joint Replacement' },
      ],
      features: ['Express OPD for International Patients', 'Halal Food Options', 'Airport Pickup & Drop']
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Accredited Indian Hospital Networks & Specialists
            </h1>
            <p className="text-sm text-slate-600">
              Every partner hospital is rigorously vetted, holding Gold-Standard JCI (Joint Commission International) or NABH accreditations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {hospitals.map((h, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col justify-between space-y-6 hover:shadow-md transition">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-black text-slate-900">{h.name}</h3>
                      <div className="flex items-center space-x-1.5 text-xs text-slate-500 mt-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{h.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1 px-2.5 py-1 bg-amber-50 text-amber-900 border border-amber-200 rounded-lg text-xs font-bold">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span>{h.rating} ({h.reviews})</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">{h.description}</p>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {h.accreditations.map((acc, idx) => (
                      <span key={idx} className="text-[10px] font-bold px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full flex items-center">
                        <CheckCircle className="w-3 h-3 mr-1" /> {acc}
                      </span>
                    ))}
                    <span className="text-[10px] font-semibold px-2 py-0.5 bg-slate-100 text-slate-700 rounded-full">
                      {h.beds}
                    </span>
                  </div>

                  {/* Doctors */}
                  <div className="p-3.5 bg-slate-50 rounded-xl space-y-2 text-xs">
                    <span className="font-bold text-slate-700 uppercase text-[10px] block">Key Specialists:</span>
                    {h.doctors.map((doc, idx) => (
                      <div key={idx} className="flex justify-between items-center">
                        <span className="font-semibold text-slate-800 flex items-center">
                          <Stethoscope className="w-3.5 h-3.5 text-sky-600 mr-1.5" />
                          {doc.name}
                        </span>
                        <span className="text-slate-500">{doc.specialty}</span>
                      </div>
                    ))}
                  </div>

                  {/* Features */}
                  <div className="space-y-1 text-xs text-slate-500">
                    {h.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex gap-3">
                  <Link
                    href="/start-journey"
                    className="flex-1 py-2.5 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold rounded-xl shadow transition text-center flex items-center justify-center"
                  >
                    Request Quotation from this Hospital <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
