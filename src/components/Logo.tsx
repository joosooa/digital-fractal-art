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
          transition: 'clip-path 0.25s cubic-bezier(0.33, 1, 0.68, 1)',
          zIndex: 5
        }}
      />

      {/* Wave layers - positioned at the water line */}
      {fillPercent > 0 && fillPercent < 100 && (
        <div 
          className="fixed left-0 right-0 pointer-events-none overflow-visible"
          style={{ 
            bottom: waveBottom,
            height: '150px',
            zIndex: 6,
            transition: 'bottom 0.25s cubic-bezier(0.33, 1, 0.68, 1)'
          }}
        >
          {/* Wave layer 1 - Back wave (darker, largest) */}
          <svg 
            className="absolute w-[200%] left-[-50%] animate-wave-1"
            style={{ bottom: '-20px', height: '120px' }}
            viewBox="0 0 1200 120" 
            preserveAspectRatio="none"
          >
            <path 
              d="M0,60 C100,20 200,100 300,60 C400,20 500,100 600,60 C700,20 800,100 900,60 C1000,20 1100,100 1200,60 L1200,120 L0,120 Z"
              fill="hsl(330 100% 35%)"
            />
          </svg>
          
          {/* Wave layer 2 - Middle wave */}
          <svg 
            className="absolute w-[200%] left-[-25%] animate-wave-2"
            style={{ bottom: '-10px', height: '100px' }}
            viewBox="0 0 1200 100" 
            preserveAspectRatio="none"
          >
            <path 
              d="M0,50 C150,90 250,10 400,50 C550,90 650,10 800,50 C950,90 1050,10 1200,50 L1200,100 L0,100 Z"
              fill="hsl(330 100% 45%)"
            />
          </svg>
          
          {/* Wave layer 3 - Front wave (lighter/brighter) */}
          <svg 
            className="absolute w-[200%] left-0 animate-wave-3"
            style={{ bottom: '0px', height: '80px' }}
            viewBox="0 0 1200 80" 
            preserveAspectRatio="none"
          >
            <path 
              d="M0,40 C120,70 180,10 300,40 C420,70 480,10 600,40 C720,70 780,10 900,40 C1020,70 1080,10 1200,40 L1200,80 L0,80 Z"
              fill="hsl(330 100% 55%)"
            />
          </svg>

          {/* Foam/highlight at wave crest */}
          <div 
            className="absolute left-0 right-0 h-4 animate-foam"
            style={{ 
              bottom: '60px',
              background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.5) 20%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0.5) 80%, transparent 100%)',
              filter: 'blur(3px)'
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
