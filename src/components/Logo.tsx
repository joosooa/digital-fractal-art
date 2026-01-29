interface LogoProps {
  isInverted: boolean;
  fillPercent?: number;
}

const Logo = ({ isInverted, fillPercent = 0 }: LogoProps) => {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-center pointer-events-none">
      <div className="relative">
        {/* Base white text */}
        <h1 
          className={`font-display text-[18vw] leading-[0.9] font-black tracking-[-0.02em] ${isInverted ? 'text-background' : 'text-foreground'}`}
          style={{ 
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 900,
            transform: 'scaleX(1.1)',
            WebkitFontSmoothing: 'antialiased'
          }}
        >
          YOFLÉ
        </h1>
        
        {/* Magenta fill overlay with wave effect - clips from bottom to top with side margins */}
        <div 
          className="absolute inset-0 overflow-hidden"
          style={{ 
            clipPath: `inset(${100 - fillPercent}% 8% 0 8%)`,
            transition: 'clip-path 0.15s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          {/* Wave effect overlay */}
          <div 
            className="absolute inset-0"
            style={{
              background: fillPercent > 0 && fillPercent < 100 
                ? 'linear-gradient(180deg, rgba(230, 0, 126, 0.3) 0%, transparent 20%)' 
                : 'transparent',
              animation: fillPercent > 0 && fillPercent < 100 ? 'wave 1.5s ease-in-out infinite' : 'none',
              pointerEvents: 'none'
            }}
          />
          <h1 
            className="font-display text-[18vw] leading-[0.9] font-black tracking-[-0.02em] text-primary"
            style={{ 
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 900,
              transform: 'scaleX(1.1)',
              WebkitFontSmoothing: 'antialiased',
              textShadow: '0 0 30px hsl(330 100% 45% / 0.5), 0 0 60px hsl(330 100% 45% / 0.3)'
            }}
          >
            YOFLÉ
          </h1>
        </div>

        {/* Glow effect at fill line */}
        {fillPercent > 0 && fillPercent < 100 && (
          <div 
            className="absolute left-[8%] right-[8%] h-1 pointer-events-none"
            style={{
              bottom: `${fillPercent}%`,
              background: 'linear-gradient(90deg, transparent, hsl(330 100% 45% / 0.8), transparent)',
              boxShadow: '0 0 20px hsl(330 100% 45% / 0.6), 0 0 40px hsl(330 100% 45% / 0.4)',
              filter: 'blur(2px)',
              transition: 'bottom 0.15s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Logo;
