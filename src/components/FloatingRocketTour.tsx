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
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#1A1A1A" floodOpacity="0.3"/>
          </filter>
        </defs>

        <g filter="url(#shadow)">
          {/* Exhaust Flame (3 layers, outlined) */}
          <path d="M26 48 Q32 66 38 48 Z" fill="#FFCC00" stroke="#1A1A1A" strokeWidth="2"/>
          <path d="M28 48 Q32 60 36 48 Z" fill="#FF8811" stroke="#1A1A1A" strokeWidth="2"/>
          <path d="M30 48 Q32 54 34 48 Z" fill="#FF3333" stroke="#1A1A1A" strokeWidth="1.5"/>

          {/* Left Fin */}
          <path d="M22 36 Q10 42 12 50 Q16 44 24 44 Z" fill="#2288DD" stroke="#1A1A1A" strokeWidth="2.5" strokeLinejoin="round"/>
          
          {/* Right Fin */}
          <path d="M42 36 Q54 42 52 50 Q48 44 40 44 Z" fill="#2288DD" stroke="#1A1A1A" strokeWidth="2.5" strokeLinejoin="round"/>

          {/* Nozzle */}
          <path d="M26 44 L38 44 L36 48 L28 48 Z" fill="#555555" stroke="#1A1A1A" strokeWidth="2.5" strokeLinejoin="round"/>

          {/* Main Body (Chubby) */}
          <path d="M32 6 C42 12, 46 26, 42 44 L22 44 C18 26, 22 12, 32 6 Z" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="2.5" strokeLinejoin="round"/>

          {/* Red Nose Cone */}
          <path d="M32 6 C37 9, 39.5 15, 40 20 L24 20 C24.5 15, 27 9, 32 6 Z" fill="#FF1111" stroke="#1A1A1A" strokeWidth="2.5" strokeLinejoin="round"/>

          {/* Rivets */}
          <circle cx="27" cy="23" r="1" fill="#1A1A1A"/>
          <circle cx="30" cy="23.5" r="1" fill="#1A1A1A"/>
          <circle cx="34" cy="23.5" r="1" fill="#1A1A1A"/>
          <circle cx="37" cy="23" r="1" fill="#1A1A1A"/>

          {/* Window Rim */}
          <circle cx="32" cy="32" r="6" fill="#88CCFF" stroke="#444444" strokeWidth="3"/>
          <circle cx="32" cy="32" r="7.5" fill="none" stroke="#1A1A1A" strokeWidth="2.5"/>

          {/* Window Glass Highlight */}
          <path d="M29 29 A4 4 0 0 1 34 29" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        </g>
      </svg>
    </div>
  );
};
