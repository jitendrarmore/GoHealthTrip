'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  HeartPulse, 
  ShieldCheck, 
  FileText, 
  Plane, 
  User, 
  Menu, 
  X, 
  Globe, 
  MessageSquare,
  Building2,
  Stethoscope,
  ChevronDown,
  HelpCircle,
  Users,
  LogIn
} from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [portalsOpen, setPortalsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('EN');
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Find Treatment', href: '/find-treatment' },
    { name: 'Hospitals', href: '/hospitals' },
    { name: 'Patient Profile', href: '/profile' },
    { name: 'My Case', href: '/my-case' },
    { name: 'Demo Case', href: '/demo-case' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 via-indigo-600 to-violet-700 flex items-center justify-center text-white font-black text-xl shadow-md">
              G
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-lg text-slate-900 tracking-tight">GoHealthTrip</span>
                <span className="text-[10px] font-bold text-sky-700 uppercase bg-sky-50 px-2 py-0.5 rounded-full border border-sky-200">
                  India HQ
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium">International Patient Facilitation</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-5 text-sm font-semibold text-slate-600">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`transition hover:text-sky-600 ${
                  pathname === link.href ? 'text-sky-600 font-bold' : ''
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Role Portals Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setPortalsOpen(!portalsOpen)}
                className="flex items-center gap-1 text-slate-600 hover:text-sky-600 font-semibold py-1 transition"
              >
                <span>Staff Portals</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {portalsOpen && (
                <div
                  onMouseLeave={() => setPortalsOpen(false)}
                  className="absolute left-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 space-y-1 z-50 animate-fadeIn"
                >
                  <Link
                    href="/portal/doctor"
                    onClick={() => setPortalsOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-sky-50 hover:text-sky-700 transition"
                  >
                    <Stethoscope className="w-4 h-4 text-indigo-600" />
                    <div>
                      <span className="block font-bold">Doctor Portal</span>
                      <span className="text-[10px] text-slate-400">Clinical Reviews Queue</span>
                    </div>
                  </Link>
                  <Link
                    href="/dashboard/coordinator"
                    onClick={() => setPortalsOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-sky-50 hover:text-sky-700 transition"
                  >
                    <Users className="w-4 h-4 text-sky-600" />
                    <div>
                      <span className="block font-bold">Coordinator Desk</span>
                      <span className="text-[10px] text-slate-400">Active Cases & Logistics</span>
                    </div>
                  </Link>
                  <Link
                    href="/dashboard/support"
                    onClick={() => setPortalsOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-sky-50 hover:text-sky-700 transition"
                  >
                    <HelpCircle className="w-4 h-4 text-rose-600" />
                    <div>
                      <span className="block font-bold">Support Manager</span>
                      <span className="text-[10px] text-slate-400">Escalations & Tickets</span>
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center space-x-2.5">
            {/* Language Selector */}
            <div className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 bg-slate-50">
              <Globe className="w-3.5 h-3.5 text-slate-500" />
              <select
                value={currentLang}
                onChange={(e) => setCurrentLang(e.target.value)}
                aria-label="Language selection"
                className="bg-transparent border-none outline-none cursor-pointer text-xs"
              >
                <option value="EN">English</option>
                <option value="AR">العربية (Arabic)</option>
                <option value="SW">Kiswahili</option>
                <option value="FR">Français</option>
                <option value="RU">Русский</option>
                <option value="BN">বাংলা</option>
              </select>
            </div>

            <Link
              href="/login"
              className="px-3 py-2 text-xs font-semibold text-slate-700 hover:text-sky-600 border border-slate-200 hover:border-sky-300 rounded-xl transition flex items-center gap-1.5"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </Link>

            <Link
              href="/start-journey"
              className="px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-sky-500 to-indigo-600 hover:opacity-95 rounded-xl shadow-sm transition"
            >
              Start Treatment
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-slate-700" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 px-4 pt-2 pb-6 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-sky-600 hover:bg-slate-50"
            >
              {link.name}
            </Link>
          ))}

          <div className="pt-2 border-t border-slate-100 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 px-3 block">Role Portals:</span>
            <Link href="/portal/doctor" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-1.5 text-sm text-slate-600 hover:text-sky-600">
              Doctor Clinical Portal
            </Link>
            <Link href="/dashboard/coordinator" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-1.5 text-sm text-slate-600 hover:text-sky-600">
              Care Coordinator Desk
            </Link>
            <Link href="/dashboard/support" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-1.5 text-sm text-slate-600 hover:text-sky-600">
              Support Manager Portal
            </Link>
            <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-1.5 text-sm text-sky-600 font-bold">
              Sign In / Google Federated
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
