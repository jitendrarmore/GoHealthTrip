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
  LogIn,
  LogOut,
  Key,
  FolderOpen,
  ArrowRight
} from 'lucide-react';
import { useState, useEffect } from 'react';
import Logo from '@/components/Logo';

interface LoggedInUser {
  id?: string;
  name?: string;
  email?: string;
  role?: string;
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [portalsOpen, setPortalsOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('EN');
  const [currentUser, setCurrentUser] = useState<LoggedInUser | null>(null);
  const pathname = usePathname();

  // Public primary navigation links (without My Case)
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'How It Works', href: '/#how-it-works' },
    { name: 'Hospitals', href: '/hospitals' },
    { name: 'Find Treatment', href: '/find-treatment' },
  ];

  // Sync user authentication state from localStorage
  useEffect(() => {
    const syncUser = () => {
      try {
        const stored = typeof window !== 'undefined' ? localStorage.getItem('ght_user') : null;
        const token = typeof window !== 'undefined' ? localStorage.getItem('ght_token') : null;
        if (stored && token) {
          setCurrentUser(JSON.parse(stored));
        } else {
          setCurrentUser(null);
        }
      } catch {
        setCurrentUser(null);
      }
    };

    syncUser();
    window.addEventListener('storage', syncUser);
    return () => window.removeEventListener('storage', syncUser);
  }, []);

  const handleSignOut = () => {
    try {
      localStorage.removeItem('ght_token');
      localStorage.removeItem('ght_user');
    } catch {}
    setCurrentUser(null);
    setUserDropdownOpen(false);
    setMobileMenuOpen(false);
    window.location.href = '/login';
  };

  // Get user display name or initials
  const displayName = currentUser?.name || currentUser?.email?.split('@')[0] || 'Patient';
  const initials = currentUser?.name
    ? currentUser.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
    : currentUser?.email
    ? currentUser.email.slice(0, 2).toUpperCase()
    : 'P';

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-[68px]">
          
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2.5 group">
            <Logo variant="compact" theme="light" />
            <span className="hidden sm:inline-block text-[10px] font-bold text-teal-800 uppercase bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
              India HQ
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 text-sm font-semibold text-slate-600">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors py-1 hover:text-sky-600 ${
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
                  className="absolute left-0 mt-2 w-60 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 space-y-1 z-50 animate-fadeIn"
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
                  <Link
                    href="/dashboard"
                    onClick={() => setPortalsOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 transition border-t border-slate-100 mt-1 pt-2"
                  >
                    <ShieldCheck className="w-4 h-4 text-indigo-600" />
                    <div>
                      <span className="block font-bold">Admin Control Center</span>
                      <span className="text-[10px] text-slate-400">Roles & Permissions (RBAC)</span>
                    </div>
                  </Link>
                  <Link
                    href="/staff/login"
                    onClick={() => setPortalsOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-indigo-700 bg-indigo-50/60 hover:bg-indigo-50 transition border-t border-indigo-100 mt-1 pt-2"
                  >
                    <Key className="w-4 h-4 text-indigo-600" />
                    <div>
                      <span className="block font-bold">Staff & Doctor Login</span>
                      <span className="text-[10px] text-indigo-500">Employee Workspace Access</span>
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center space-x-3">
            {/* Language Selector */}
            <div className="flex items-center space-x-1 px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-slate-50">
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

            {/* Authenticated User vs Unauthenticated Guest */}
            {currentUser ? (
              /* Logged In User Capsule & Dropdown */
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 transition shadow-sm"
                  aria-expanded={userDropdownOpen}
                  aria-label="User Account Menu"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-sky-500 to-teal-500 text-white font-extrabold text-xs flex items-center justify-center shadow-sm">
                    {initials}
                  </div>
                  <div className="text-left hidden md:block">
                    <span className="block text-xs font-black text-slate-900 leading-none">
                      {displayName}
                    </span>
                    <span className="text-[10px] font-bold text-teal-600 uppercase tracking-wider">
                      {currentUser.role || 'Patient'}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {userDropdownOpen && (
                  <div
                    onMouseLeave={() => setUserDropdownOpen(false)}
                    className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 space-y-1 z-50 animate-fadeIn"
                  >
                    {/* User profile header card */}
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 mb-1">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-sky-500 to-teal-500 text-white font-black text-sm flex items-center justify-center">
                          {initials}
                        </div>
                        <div className="overflow-hidden">
                          <p className="text-xs font-extrabold text-slate-900 truncate">{displayName}</p>
                          <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
                        </div>
                      </div>
                    </div>

                    {/* My Case Link (Belongs to logged-in person) */}
                    <Link
                      href="/my-case"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-800 hover:bg-teal-50 hover:text-teal-700 transition"
                    >
                      <FolderOpen className="w-4 h-4 text-teal-600" />
                      <div>
                        <span className="block font-bold">My Case</span>
                        <span className="text-[10px] text-slate-400">Track treatment & timeline</span>
                      </div>
                    </Link>

                    {/* Patient Profile */}
                    <Link
                      href="/profile"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-800 hover:bg-sky-50 hover:text-sky-700 transition"
                    >
                      <User className="w-4 h-4 text-sky-600" />
                      <div>
                        <span className="block font-bold">Patient Profile</span>
                        <span className="text-[10px] text-slate-400">Medical history & documents</span>
                      </div>
                    </Link>

                    {/* Dashboard */}
                    <Link
                      href="/dashboard"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-800 hover:bg-indigo-50 hover:text-indigo-700 transition"
                    >
                      <ShieldCheck className="w-4 h-4 text-indigo-600" />
                      <div>
                        <span className="block font-bold">Dashboard</span>
                        <span className="text-[10px] text-slate-400">Case status & support</span>
                      </div>
                    </Link>

                    {/* Sign Out */}
                    <div className="pt-1 border-t border-slate-100 mt-1">
                      <button
                        type="button"
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition text-left"
                      >
                        <LogOut className="w-4 h-4 text-rose-600" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Guest links: Sign In & Sign Up */
              <>
                <Link
                  href="/login"
                  className="px-3 py-2 text-xs font-semibold text-slate-700 hover:text-teal-600 border border-slate-200 hover:border-teal-300 rounded-xl transition flex items-center gap-1.5"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Sign In</span>
                </Link>

                <Link
                  href="/signup"
                  className="px-3 py-2 text-xs font-bold text-teal-700 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-xl transition flex items-center gap-1.5"
                >
                  <User className="w-3.5 h-3.5 text-teal-600" />
                  <span>Sign Up</span>
                </Link>
              </>
            )}

            {/* Direct CTA */}
            <Link
              href="/start-journey"
              className="px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-sky-500 to-indigo-600 hover:opacity-95 rounded-xl shadow-sm transition flex items-center gap-1.5"
            >
              <span>Start Treatment</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-slate-700" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 px-4 pt-3 pb-6 space-y-3">
          
          {/* Mobile Logged-in User Card */}
          {currentUser ? (
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-sky-500 to-teal-500 text-white font-black text-sm flex items-center justify-center">
                  {initials}
                </div>
                <div>
                  <p className="text-sm font-black text-slate-900">{displayName}</p>
                  <p className="text-xs text-slate-500">{currentUser.email}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200/80">
                <Link
                  href="/my-case"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs font-bold text-teal-700 text-center flex items-center justify-center gap-1"
                >
                  <FolderOpen className="w-3.5 h-3.5 text-teal-600" />
                  <span>My Case</span>
                </Link>
                <Link
                  href="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs font-bold text-slate-700 text-center flex items-center justify-center gap-1"
                >
                  <User className="w-3.5 h-3.5 text-sky-600" />
                  <span>Profile</span>
                </Link>
              </div>
              <button
                type="button"
                onClick={handleSignOut}
                className="w-full py-1.5 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl transition text-center"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 text-center flex items-center justify-center gap-1.5"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </Link>
              <Link
                href="/signup"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 bg-teal-50 border border-teal-200 rounded-xl text-xs font-bold text-teal-700 text-center flex items-center justify-center gap-1.5"
              >
                <User className="w-3.5 h-3.5 text-teal-600" />
                <span>Sign Up</span>
              </Link>
            </div>
          )}

          {/* Primary Nav Links */}
          <div className="space-y-1 pt-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:text-sky-600 hover:bg-slate-50"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Portals & Start Treatment */}
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
          </div>

          <div className="pt-2">
            <Link
              href="/start-journey"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full py-3 text-center text-xs font-bold text-white bg-gradient-to-r from-sky-500 to-indigo-600 rounded-xl shadow-md"
            >
              Start Treatment Journey
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
