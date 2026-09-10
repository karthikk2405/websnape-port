import React, { useEffect, useState, useRef } from 'react';

export const FloatingRocketTour: React.FC = () => {
  const [flying, setFlying] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const startTour = () => {
      setFlying(true);
      timerRef.current = setTimeout(() => {
        setFlying(false);
      }, 10000);
    };

    timerRef.current = setTimeout(() => {
      startTour();
      intervalRef.current = setInterval(startTour, 30000);
    }, 4000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div
      className={`rocket-tour ${flying ? 'flying' : ''}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          
          <linearGradient id="bodyGrad" x1="20" y1="20" x2="44" y2="44" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#E2E8F0" />
            <stop offset="100%" stopColor="#94A3B8" />
          </linearGradient>

          <linearGradient id="noseGrad" x1="32" y1="8" x2="32" y2="24" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="100%" stopColor="#2563EB" />
          </linearGradient>

          <linearGradient id="finGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#A78BFA" />
            <stop offset="100%" stopColor="#6D28D9" />
          </linearGradient>

          <linearGradient id="flameGrad" x1="32" y1="48" x2="32" y2="60" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#67E8F9" />
            <stop offset="50%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#A855F7" opacity="0" />
          </linearGradient>
        </defs>

        {/* Exhaust Flame */}
        <path d="M26 48 Q32 64 38 48 Q32 54 26 48Z" fill="url(#flameGrad)" filter="url(#glow)"/>
        <circle cx="32" cy="49" r="3" fill="#FFFFFF" filter="url(#glow)"/>

        {/* Left Fin */}
        <path d="M22 36 L12 46 L22 42 Z" fill="url(#finGrad)"/>
        {/* Right Fin */}
        <path d="M42 36 L52 46 L42 42 Z" fill="url(#finGrad)"/>

        {/* Main Body */}
        <path d="M22 24 C22 18, 28 10, 32 6 C36 10, 42 18, 42 24 L42 44 C42 46, 40 48, 38 48 L26 48 C24 48, 22 46, 22 44 Z" fill="url(#bodyGrad)"/>

        {/* Nose Cone Overlay */}
        <path d="M22 24 C22 18, 28 10, 32 6 C36 10, 42 18, 42 24 Q32 28 22 24Z" fill="url(#noseGrad)"/>

        {/* Window */}
        <circle cx="32" cy="32" r="5" fill="#1E293B"/>
        <circle cx="32" cy="32" r="4" fill="#38BDF8"/>
        <path d="M30 30 A3 3 0 0 1 34 30" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" fill="none"/>

        {/* Highlights */}
        <path d="M24 24 L24 42" stroke="#FFFFFF" strokeWidth="1" opacity="0.6" fill="none"/>
      </svg>
    </div>
  );
};
