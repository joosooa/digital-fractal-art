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
      setTimeout(() => setShowSplash(false), 1200);
    } else if (fillPercent < 100) {
      setIsComplete(false);
    }
  }, [fillPercent, isComplete]);

  // Calculate wave position from bottom
  const waveBottom = `${fillPercent}%`;

  return (
    <>
      {/* Full screen magenta water fill - refined gradient */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, hsl(330 100% 42%) 0%, hsl(330 100% 48%) 100%)',
          clipPath: `inset(${100 - fillPercent}% 0 0 0)`,
          transition: 'clip-path 0.3s cubic-bezier(0.33, 1, 0.68, 1)',
          zIndex: 5
        }}
      />

      {/* Subtle gradient overlay for depth */}
      {fillPercent > 0 && (
        <div 
          className="fixed inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.15) 100%)',
            clipPath: `inset(${100 - fillPercent}% 0 0 0)`,
            transition: 'clip-path 0.3s cubic-bezier(0.33, 1, 0.68, 1)',
            zIndex: 5
          }}
        />
      )}

      {/* Wave layers - refined and smoother */}
      {fillPercent > 0 && fillPercent < 100 && (
        <div 
          className="fixed left-0 right-0 pointer-events-none overflow-visible"
          style={{ 
            bottom: waveBottom,
            height: '100px',
            zIndex: 6,
            transition: 'bottom 0.3s cubic-bezier(0.33, 1, 0.68, 1)'
          }}
        >
          {/* Wave layer 1 - Back wave */}
          <svg 
            className="absolute w-[200%] left-[-50%] animate-wave-1"
            style={{ bottom: '-15px', height: '80px', opacity: 0.6 }}
            viewBox="0 0 1200 80" 
            preserveAspectRatio="none"
          >
            <path 
              d="M0,40 C150,20 300,60 450,40 C600,20 750,60 900,40 C1050,20 1200,60 1200,40 L1200,80 L0,80 Z"
              fill="hsl(330 100% 38%)"
            />
          </svg>
          
          {/* Wave layer 2 - Middle wave */}
          <svg 
            className="absolute w-[200%] left-[-25%] animate-wave-2"
            style={{ bottom: '-8px', height: '70px', opacity: 0.8 }}
            viewBox="0 0 1200 70" 
            preserveAspectRatio="none"
          >
            <path 
              d="M0,35 C200,55 400,15 600,35 C800,55 1000,15 1200,35 L1200,70 L0,70 Z"
              fill="hsl(330 100% 45%)"
            />
          </svg>
          
          {/* Wave layer 3 - Front wave */}
          <svg 
            className="absolute w-[200%] left-0 animate-wave-3"
            style={{ bottom: '0px', height: '60px' }}
            viewBox="0 0 1200 60" 
            preserveAspectRatio="none"
          >
            <path 
              d="M0,30 C150,45 300,15 450,30 C600,45 750,15 900,30 C1050,45 1200,15 1200,30 L1200,60 L0,60 Z"
              fill="hsl(330 100% 52%)"
            />
          </svg>
        </div>
      )}

      {/* Completion splash effect - refined */}
      {showSplash && (
        <div 
          className="fixed inset-0 pointer-events-none animate-splash"
          style={{ zIndex: 7 }}
        >
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/20 to-transparent" />
        </div>
      )}

      {/* Settled waves when complete - minimal */}
      {isComplete && !showSplash && (
        <div 
          className="fixed top-0 left-0 right-0 overflow-hidden pointer-events-none"
          style={{ height: '30px', zIndex: 6 }}
        >
          <svg 
            className="absolute w-[200%] left-[-25%] animate-wave-settle"
            style={{ top: '15px', height: '20px' }}
            viewBox="0 0 1200 20" 
            preserveAspectRatio="none"
          >
            <path 
              d="M0,10 C300,14 600,6 900,10 C1200,14 1200,10 1200,10 L1200,20 L0,20 Z"
              fill="hsl(330 100% 48%)"
            />
          </svg>
        </div>
      )}

      {/* Logo and tagline container */}
      <div className="fixed inset-0 flex items-center justify-center z-10 pointer-events-none">
        <div className="text-center">
          <h1 
            className="font-display text-[18vw] leading-[0.85] font-black tracking-[-0.02em]"
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
          
          {/* Hero tagline - refined typography */}
          <div 
            className="mt-6 overflow-hidden"
            style={{
              opacity: isComplete ? 1 : 0,
              transition: 'opacity 0.8s ease-out',
            }}
          >
            <p 
              className="text-sm md:text-base tracking-[0.3em] uppercase"
              style={{
                color: 'white',
                mixBlendMode: 'difference',
                fontFamily: "'Courier Prime', monospace",
                fontWeight: 400,
                letterSpacing: '0.25em',
              }}
            >
              세상의 식품 트렌드를 한 스푼 먼저 맛보다
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Logo;
