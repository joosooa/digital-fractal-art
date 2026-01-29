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
      // 출렁임 효과 후 안정화
      setTimeout(() => setShowSplash(false), 1500);
    } else if (fillPercent < 100) {
      setIsComplete(false);
    }
  }, [fillPercent, isComplete]);

  return (
    <>
      {/* Full screen magenta water fill with wave effect */}
      <div 
        className="fixed inset-0 pointer-events-none z-5"
        style={{
          background: 'hsl(330 100% 45%)',
          clipPath: `inset(${100 - fillPercent}% 0 0 0)`,
          transition: 'clip-path 0.15s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        {/* Multiple wave layers at the top of the fill */}
        {fillPercent > 0 && fillPercent < 100 && (
          <div 
            className="absolute left-0 right-0 overflow-visible"
            style={{ top: '-100px', height: '120px' }}
          >
            {/* Wave layer 1 - Back wave */}
            <svg 
              className="absolute w-[200%] left-[-50%] animate-wave-1"
              style={{ top: '20px', height: '100px' }}
              viewBox="0 0 1200 100" 
              preserveAspectRatio="none"
            >
              <path 
                d="M0,50 C100,20 200,80 300,50 C400,20 500,80 600,50 C700,20 800,80 900,50 C1000,20 1100,80 1200,50 L1200,100 L0,100 Z"
                fill="hsl(330 100% 40%)"
              />
            </svg>
            
            {/* Wave layer 2 - Middle wave */}
            <svg 
              className="absolute w-[200%] left-[-25%] animate-wave-2"
              style={{ top: '35px', height: '80px' }}
              viewBox="0 0 1200 80" 
              preserveAspectRatio="none"
            >
              <path 
                d="M0,40 C150,70 250,10 400,40 C550,70 650,10 800,40 C950,70 1050,10 1200,40 L1200,80 L0,80 Z"
                fill="hsl(330 100% 45%)"
              />
            </svg>
            
            {/* Wave layer 3 - Front wave (brightest) */}
            <svg 
              className="absolute w-[200%] left-0 animate-wave-3"
              style={{ top: '50px', height: '70px' }}
              viewBox="0 0 1200 70" 
              preserveAspectRatio="none"
            >
              <path 
                d="M0,35 C120,60 180,10 300,35 C420,60 480,10 600,35 C720,60 780,10 900,35 C1020,60 1080,10 1200,35 L1200,70 L0,70 Z"
                fill="hsl(330 100% 50%)"
              />
            </svg>

            {/* Foam/bubbles effect */}
            <div className="absolute inset-x-0 top-[60px] h-[30px] bg-gradient-to-b from-white/20 to-transparent animate-foam" />
          </div>
        )}

        {/* Completion splash effect */}
        {showSplash && (
          <div className="absolute inset-0 animate-splash">
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/30 to-transparent" />
          </div>
        )}

        {/* Settled waves when complete */}
        {isComplete && !showSplash && (
          <div className="absolute top-0 left-0 right-0 overflow-hidden" style={{ height: '60px' }}>
            <svg 
              className="absolute w-[200%] left-[-25%] animate-wave-settle"
              style={{ top: '30px', height: '40px' }}
              viewBox="0 0 1200 40" 
              preserveAspectRatio="none"
            >
              <path 
                d="M0,20 C200,25 400,15 600,20 C800,25 1000,15 1200,20 L1200,40 L0,40 Z"
                fill="hsl(330 100% 48%)"
              />
            </svg>
          </div>
        )}
      </div>

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
