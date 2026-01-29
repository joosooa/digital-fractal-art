import { useEffect, useState } from 'react';

interface LogoProps {
  isInverted: boolean;
  fillPercent?: number;
}

const Logo = ({ isInverted, fillPercent = 0 }: LogoProps) => {
  const [isComplete, setIsComplete] = useState(false);
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    if (fillPercent >= 100 && !isComplete) {
      setIsComplete(true);
      setShowSplash(true);
      setTimeout(() => setShowSplash(false), 1500);
    } else if (fillPercent < 100) {
      setIsComplete(false);
    }
  }, [fillPercent, isComplete]);

  // Calculate wave position from bottom
  const waveBottom = `${fillPercent}%`;

  return (
    <>
      {/* Full screen magenta water fill */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{
          background: 'hsl(330 100% 45%)',
          clipPath: `inset(${100 - fillPercent}% 0 0 0)`,
          transition: 'clip-path 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
          zIndex: 5
        }}
      />

      {/* Wave layers - positioned at the water line */}
      {fillPercent > 0 && fillPercent < 100 && (
        <div 
          className="fixed left-0 right-0 pointer-events-none overflow-visible"
          style={{ 
            bottom: waveBottom,
            height: '80px',
            zIndex: 6,
            transition: 'bottom 0.15s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          {/* Wave layer 1 - Back wave (darker) */}
          <svg 
            className="absolute w-[200%] left-[-50%] animate-wave-1"
            style={{ bottom: '-10px', height: '60px' }}
            viewBox="0 0 1200 60" 
            preserveAspectRatio="none"
          >
            <path 
              d="M0,30 C100,10 200,50 300,30 C400,10 500,50 600,30 C700,10 800,50 900,30 C1000,10 1100,50 1200,30 L1200,60 L0,60 Z"
              fill="hsl(330 100% 35%)"
            />
          </svg>
          
          {/* Wave layer 2 - Middle wave */}
          <svg 
            className="absolute w-[200%] left-[-25%] animate-wave-2"
            style={{ bottom: '-5px', height: '50px' }}
            viewBox="0 0 1200 50" 
            preserveAspectRatio="none"
          >
            <path 
              d="M0,25 C150,45 250,5 400,25 C550,45 650,5 800,25 C950,45 1050,5 1200,25 L1200,50 L0,50 Z"
              fill="hsl(330 100% 45%)"
            />
          </svg>
          
          {/* Wave layer 3 - Front wave (lighter/brighter) */}
          <svg 
            className="absolute w-[200%] left-0 animate-wave-3"
            style={{ bottom: '0px', height: '40px' }}
            viewBox="0 0 1200 40" 
            preserveAspectRatio="none"
          >
            <path 
              d="M0,20 C120,35 180,5 300,20 C420,35 480,5 600,20 C720,35 780,5 900,20 C1020,35 1080,5 1200,20 L1200,40 L0,40 Z"
              fill="hsl(330 100% 55%)"
            />
          </svg>

          {/* Foam/highlight at wave crest */}
          <div 
            className="absolute left-0 right-0 h-2 animate-foam"
            style={{ 
              bottom: '30px',
              background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 25%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0.4) 75%, transparent 100%)',
              filter: 'blur(2px)'
            }}
          />
        </div>
      )}

      {/* Completion splash effect */}
      {showSplash && (
        <div 
          className="fixed inset-0 pointer-events-none animate-splash"
          style={{ zIndex: 7 }}
        >
          <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      )}

      {/* Settled waves when complete */}
      {isComplete && !showSplash && (
        <div 
          className="fixed top-0 left-0 right-0 overflow-hidden pointer-events-none"
          style={{ height: '50px', zIndex: 6 }}
        >
          <svg 
            className="absolute w-[200%] left-[-25%] animate-wave-settle"
            style={{ top: '20px', height: '35px' }}
            viewBox="0 0 1200 35" 
            preserveAspectRatio="none"
          >
            <path 
              d="M0,18 C200,22 400,14 600,18 C800,22 1000,14 1200,18 L1200,35 L0,35 Z"
              fill="hsl(330 100% 50%)"
            />
          </svg>
        </div>
      )}

      {/* Logo text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-center pointer-events-none">
        <div className="relative">
          <h1 
            className="font-display text-[18vw] leading-[0.9] font-black tracking-[-0.02em]"
            style={{ 
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 900,
              transform: 'scaleX(1.1)',
              WebkitFontSmoothing: 'antialiased',
              color: 'white',
              mixBlendMode: 'difference'
            }}
          >
            YOFLÉ
          </h1>
        </div>
      </div>
    </>
  );
};

export default Logo;
