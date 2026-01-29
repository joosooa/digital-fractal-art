interface LogoProps {
  isInverted: boolean;
  fillPercent?: number;
}

const Logo = ({ isInverted, fillPercent = 0 }: LogoProps) => {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-center pointer-events-none">
      <div className="relative">
        {/* Base white text - no blend mode */}
        <h1 
          className={`font-display text-[18vw] leading-[0.9] font-black tracking-[-0.02em] ${isInverted ? 'text-background' : 'text-foreground'}`}
          style={{ 
            transform: 'scaleX(1.1)',
            WebkitFontSmoothing: 'antialiased'
          }}
        >
          YOFLÉ
        </h1>
        
        {/* Magenta fill overlay - clips from bottom to top */}
        <div 
          className="absolute inset-0 overflow-hidden"
          style={{ 
            clipPath: `inset(${100 - fillPercent}% 0 0 0)`,
            transition: 'clip-path 0.08s ease-out'
          }}
        >
          <h1 
            className="font-display text-[18vw] leading-[0.9] font-black tracking-[-0.02em] text-primary"
            style={{ 
              transform: 'scaleX(1.1)',
              WebkitFontSmoothing: 'antialiased'
            }}
          >
            YOFLÉ
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Logo;
