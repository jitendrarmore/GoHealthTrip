'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MessageSquare, Phone, X, CheckCircle2, ArrowRight, ShieldCheck, Globe } from 'lucide-react';

export default function FloatingConcierge() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Expanded Modal */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-fadeInUp">
          {/* Header */}
          <div className="bg-gradient-to-r from-sky-600 via-indigo-600 to-violet-700 p-5 text-white relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-1.5 rounded-full transition"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center font-bold text-lg backdrop-blur-sm">
                  🩺
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-indigo-700" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm">24/7 International Desk</h4>
                <p className="text-xs text-sky-200">Arabic · Swahili · Russian · French · English</p>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="p-5 space-y-4 text-slate-700 text-xs">
            <p className="leading-relaxed">
              Hello! Need help choosing an accredited Indian hospital, estimating costs, or arranging an urgent medical visa?
            </p>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
              <div className="flex items-center gap-2 text-slate-800 font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Zero Obligation · 100% Free Consultation</span>
              </div>
              <p className="text-[11px] text-slate-500">
                Official quotes direct from JCI/NABH hospital international patient departments.
              </p>
            </div>

            <div className="space-y-2 pt-1">
              <Link
                href="/start-journey"
                onClick={() => setIsOpen(false)}
                className="w-full py-3 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-bold rounded-xl shadow-md flex items-center justify-center gap-1.5 transition"
              >
                <span>Upload Reports for Free Quote</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <a
                href="https://wa.me/919123456789?text=Hello%20GoHealthTrip,%20I%20am%20looking%20for%20medical%20treatment%20in%20India"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow flex items-center justify-center gap-2 transition"
              >
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            <div className="text-[10px] text-slate-400 text-center flex items-center justify-center gap-1">
              <Globe className="w-3 h-3" />
              <span>Coordinating with patients from 30+ countries</span>
            </div>
          </div>
        </div>
      )}

      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-sky-500 via-indigo-600 to-violet-700 text-white font-bold rounded-full shadow-2xl hover:scale-105 transition-all glow-cyan"
        aria-label="Open 24/7 International Medical Desk"
      >
        <div className="relative">
          <MessageSquare className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full" />
        </div>
        <span className="text-xs tracking-wide">24/7 Medical Desk</span>
      </button>
    </div>
  );
}
