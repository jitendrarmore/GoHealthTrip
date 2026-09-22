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
  Stethoscope
} from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('EN');
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Find Treatment', href: '/find-treatment' },
    { name: 'Doctors & Hospitals', href: '/hospitals' },
    { name: 'My Case & Timeline', href: '/my-case' },
    { name: 'Demo Journey', href: '/demo-case' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-indigo-600 flex items-center justify-center text-white font-black text-xl shadow-md">
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
          <nav className="hidden lg:flex items-center space-x-6 text-sm font-semibold text-slate-600">
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
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center space-x-3">
            {/* Language Selector */}
            <div className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 bg-slate-50">
              <Globe className="w-3.5 h-3.5 text-slate-500" />
              <select
                value={currentLang}
                onChange={(e) => setCurrentLang(e.target.value)}
                aria-label="Language selection"
                className="bg-transparent border-none outline-none cursor-pointer"
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
              href="/start-journey"
              className="px-4 py-2 text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 rounded-lg shadow-sm transition"
            >
              Start Treatment Journey
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-semibold text-slate-700 hover:bg-slate-50 hover:text-sky-600"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-2 border-t border-slate-100 flex flex-col space-y-2">
            <Link
              href="/start-journey"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 text-center text-sm font-bold text-white bg-sky-600 rounded-lg shadow"
            >
              Start Treatment Journey
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
