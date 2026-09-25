import Link from 'next/link';
import { ShieldCheck, HeartPulse, Building2, Globe } from 'lucide-react';
import Logo from '@/components/Logo';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Col 1 */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <Logo variant="compact" theme="dark" />
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              India’s dedicated international patient coordination platform. Facilitating clinical evaluations, transparent hospital proposals, medical visas, and complete travel logistics.
            </p>
            <div className="flex items-center space-x-2 text-xs text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>DPDP 2023 & ABDM Compliant</span>
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Top Specialties</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/find-treatment?cat=Cardiology" className="hover:text-white transition">Cardiothoracic & Bypass Surgery</Link></li>
              <li><Link href="/find-treatment?cat=Oncology" className="hover:text-white transition">Medical & Surgical Oncology / BMT</Link></li>
              <li><Link href="/find-treatment?cat=Orthopedics" className="hover:text-white transition">Robotic Joint Replacement</Link></li>
              <li><Link href="/find-treatment?cat=Neurosurgery" className="hover:text-white transition">Brain & Spine Surgery</Link></li>
              <li><Link href="/find-treatment?cat=Transplants" className="hover:text-white transition">Living Donor Liver & Kidney Transplants</Link></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Accredited Hospitals</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/hospitals" className="hover:text-white transition">Apollo Hospitals (New Delhi / Chennai)</Link></li>
              <li><Link href="/hospitals" className="hover:text-white transition">Fortis Memorial Research Institute</Link></li>
              <li><Link href="/hospitals" className="hover:text-white transition">Max Super Speciality Hospital</Link></li>
              <li><Link href="/hospitals" className="hover:text-white transition">Medanta - The Medicity</Link></li>
              <li><Link href="/hospitals" className="hover:text-white transition">Manipal Hospitals</Link></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">International Patient Care</h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Need assistance with an urgent medical query or visa invitation letter?
            </p>
            <div className="p-3 bg-slate-800/80 rounded-xl text-xs space-y-1">
              <p className="text-white font-semibold">Care Desk (New Delhi HQ):</p>
              <p className="text-sky-400 font-mono">+91 98100 12345</p>
              <p className="text-slate-400">care@gohealthtrip.com</p>
            </div>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-8 text-center space-y-3">
          <p className="text-[11px] text-slate-500 max-w-4xl mx-auto leading-normal">
            <strong>Clinical Disclaimer:</strong> GoHealthTrip is an independent administrative and logistics facilitation platform headquartered in India. It does not independently provide medical advice, diagnosis, treatment, or prescribe medication. All medical evaluations, recommendations, surgical procedures, and treatment proposals are provided strictly by certified Indian healthcare institutions and licensed Medical Practitioners.
          </p>
          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} GoHealthTrip Technologies Pvt Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
