import React from 'react';
import Image from 'next/image';

interface LogoProps {
  variant?: 'full' | 'compact' | 'icon' | 'badge';
  theme?: 'light' | 'dark';
  className?: string;
  showTagline?: boolean;
}

/**
 * Official GoHealthTrip Logo component
 * Features the signature 3 wellness leaves + soaring aircraft flight trail,
 * two-tone typography (Go[Health]Trip), and "Better Care. Brighter Journeys." tagline.
 */
export default function Logo({
  variant = 'compact',
  theme = 'light',
  className = '',
  showTagline = true,
}: LogoProps) {
  const isDark = theme === 'dark';

  // 1. Icon-only variant
  if (variant === 'icon') {
    return (
      <div className={`relative flex items-center justify-center ${className}`}>
        <svg
          viewBox="0 0 120 70"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Left Wellness Leaf */}
          <path
            d="M50 56C36 50 20 38 22 22C36 22 48 38 50 56Z"
            fill="#00A884"
          />
          {/* Center Tall Wellness Leaf */}
          <path
            d="M52 56C42 36 44 14 52 4C60 14 62 36 52 56Z"
            fill="#00A884"
          />
          {/* Right Wellness Leaf */}
          <path
            d="M54 56C56 38 68 22 82 22C84 38 68 50 54 56Z"
            fill="#00A884"
          />
          {/* Flight Path Contrail Arc */}
          <path
            d="M48 60C62 56 82 46 102 24"
            stroke={isDark ? '#38BDF8' : '#0F2B46'}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Soaring Airliner Silhouette */}
          <g transform="translate(98, 14) rotate(42) scale(0.9)">
            {/* Fuselage */}
            <path
              d="M0 -12 C1.5 -12 2.5 -8 2.5 10 C2.5 14 1 15 0 15 C-1 15 -2.5 14 -2.5 10 C-2.5 -8 -1.5 -12 0 -12 Z"
              fill={isDark ? '#38BDF8' : '#0F2B46'}
            />
            {/* Wings */}
            <path
              d="M0 -3 L16 4 L16 7 L0 3 L-16 7 L-16 4 Z"
              fill={isDark ? '#38BDF8' : '#0F2B46'}
            />
            {/* Horizontal Stabilizers */}
            <path
              d="M0 10 L7 13 L7 15 L0 13.5 L-7 15 L-7 13 Z"
              fill={isDark ? '#38BDF8' : '#0F2B46'}
            />
          </g>
        </svg>
      </div>
    );
  }

  // 2. Full official brand card with subtitle and tagline
  if (variant === 'full') {
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        {/* Brand Icon (Leaves + Plane) */}
        <div className="w-24 h-14 relative mb-1">
          <svg
            viewBox="0 0 120 70"
            className="w-full h-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M50 56C36 50 20 38 22 22C36 22 48 38 50 56Z"
              fill="#00A884"
            />
            <path
              d="M52 56C42 36 44 14 52 4C60 14 62 36 52 56Z"
              fill="#00A884"
            />
            <path
              d="M54 56C56 38 68 22 82 22C84 38 68 50 54 56Z"
              fill="#00A884"
            />
            <path
              d="M48 60C62 56 82 46 102 24"
              stroke={isDark ? '#38BDF8' : '#0F2B46'}
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <g transform="translate(98, 14) rotate(42) scale(0.9)">
              <path
                d="M0 -12 C1.5 -12 2.5 -8 2.5 10 C2.5 14 1 15 0 15 C-1 15 -2.5 14 -2.5 10 C-2.5 -8 -1.5 -12 0 -12 Z"
                fill={isDark ? '#38BDF8' : '#0F2B46'}
              />
              <path
                d="M0 -3 L16 4 L16 7 L0 3 L-16 7 L-16 4 Z"
                fill={isDark ? '#38BDF8' : '#0F2B46'}
              />
              <path
                d="M0 10 L7 13 L7 15 L0 13.5 L-7 15 L-7 13 Z"
                fill={isDark ? '#38BDF8' : '#0F2B46'}
              />
            </g>
          </svg>
        </div>

        {/* Brand Name */}
        <div className="flex items-baseline tracking-tight font-extrabold text-2xl sm:text-3xl leading-none">
          <span className={isDark ? 'text-white' : 'text-[#0B2545]'}>Go</span>
          <span className="text-[#00A884]">Health</span>
          <span className={isDark ? 'text-white' : 'text-[#0B2545]'}>Trip</span>
        </div>

        {/* Official Tagline */}
        {showTagline && (
          <p
            className={`text-[11px] sm:text-xs font-semibold tracking-wider mt-1.5 ${
              isDark ? 'text-slate-300' : 'text-[#0B2545]/80'
            }`}
          >
            Better Care. Brighter Journeys.
          </p>
        )}
      </div>
    );
  }

  // 3. Compact horizontal logo (ideal for Navbars and Headers)
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Icon */}
      <div className="w-10 h-10 flex-shrink-0 relative">
        <svg
          viewBox="0 0 120 70"
          className="w-full h-full transform scale-110"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M50 56C36 50 20 38 22 22C36 22 48 38 50 56Z"
            fill="#00A884"
          />
          <path
            d="M52 56C42 36 44 14 52 4C60 14 62 36 52 56Z"
            fill="#00A884"
          />
          <path
            d="M54 56C56 38 68 22 82 22C84 38 68 50 54 56Z"
            fill="#00A884"
          />
          <path
            d="M48 60C62 56 82 46 102 24"
            stroke={isDark ? '#38BDF8' : '#0F2B46'}
            strokeWidth="3"
            strokeLinecap="round"
          />
          <g transform="translate(98, 14) rotate(42) scale(0.95)">
            <path
              d="M0 -12 C1.5 -12 2.5 -8 2.5 10 C2.5 14 1 15 0 15 C-1 15 -2.5 14 -2.5 10 C-2.5 -8 -1.5 -12 0 -12 Z"
              fill={isDark ? '#38BDF8' : '#0F2B46'}
            />
            <path
              d="M0 -3 L16 4 L16 7 L0 3 L-16 7 L-16 4 Z"
              fill={isDark ? '#38BDF8' : '#0F2B46'}
            />
            <path
              d="M0 10 L7 13 L7 15 L0 13.5 L-7 15 L-7 13 Z"
              fill={isDark ? '#38BDF8' : '#0F2B46'}
            />
          </g>
        </svg>
      </div>

      {/* Brand Text */}
      <div className="flex flex-col">
        <div className="flex items-baseline tracking-tight font-extrabold text-xl leading-none">
          <span className={isDark ? 'text-white' : 'text-[#0B2545]'}>Go</span>
          <span className="text-[#00A884]">Health</span>
          <span className={isDark ? 'text-white' : 'text-[#0B2545]'}>Trip</span>
        </div>
        {showTagline && (
          <span
            className={`text-[9px] font-semibold tracking-tight mt-0.5 ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            Better Care. Brighter Journeys.
          </span>
        )}
      </div>
    </div>
  );
}
