import React, { useEffect, useState, useRef } from 'react';

// A fixed-position clay rocket SVG that flies around the page
export const FloatingRocketTour: React.FC = () => {
  const [flying, setFlying] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const startTour = () => {
      setFlying(true);
      // Stop after one full loop (10s)
      timerRef.current = setTimeout(() => {
        setFlying(false);
      }, 10000);
    };

    // First tour after 4 seconds of page load
    timerRef.current = setTimeout(() => {
      startTour();
      // Repeat every 30 seconds
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
      {/* Clay-style rocket SVG */}
      <svg viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Drop shadow */}
        <defs>
          <filter id="shadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#C87A4B" floodOpacity="0.5"/>
          </filter>
        </defs>

        {/* Exhaust flame */}
        <ellipse cx="26" cy="44" rx="7" ry="9" fill="#FFCC44" opacity="0.85"/>
        <ellipse cx="26" cy="43" rx="4" ry="6" fill="#FF9933" opacity="0.9"/>
        <ellipse cx="26" cy="42" rx="2" ry="4" fill="#FFFBE0" opacity="0.95"/>

        {/* Body */}
        <rect x="17" y="18" width="18" height="22" rx="9" fill="#F2DDD0" filter="url(#shadow)"/>
        {/* Body outline */}
        <rect x="17" y="18" width="18" height="22" rx="9" fill="none" stroke="#2A1A10" strokeWidth="1.5" opacity="0.25"/>

        {/* Copper stripe */}
        <rect x="17" y="24" width="18" height="5" rx="0" fill="#E4A882" opacity="0.8"/>

        {/* Nose cone */}
        <path d="M17 22 Q26 4 35 22Z" fill="#C87A4B" filter="url(#shadow)"/>
        <path d="M17 22 Q26 4 35 22Z" fill="none" stroke="#2A1A10" strokeWidth="1.5" opacity="0.2"/>

        {/* Nose tip */}
        <circle cx="26" cy="8" r="4" fill="#D46A43"/>

        {/* Window */}
        <circle cx="26" cy="32" r="5" fill="#F2DDD0"/>
        <circle cx="26" cy="32" r="3.5" fill="#5A9B88"/>
        <circle cx="24.5" cy="30.5" r="1" fill="white" opacity="0.7"/>

        {/* Left fin */}
        <path d="M17 36 L10 42 L17 40Z" fill="#D46A43" filter="url(#shadow)"/>
        <path d="M17 36 L10 42 L17 40Z" fill="none" stroke="#2A1A10" strokeWidth="1" opacity="0.2"/>

        {/* Right fin */}
        <path d="M35 36 L42 42 L35 40Z" fill="#D46A43" filter="url(#shadow)"/>
        <path d="M35 36 L42 42 L35 40Z" fill="none" stroke="#2A1A10" strokeWidth="1" opacity="0.2"/>
      </svg>
    </div>
  );
};
