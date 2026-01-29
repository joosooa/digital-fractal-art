interface LogoProps {
  isInverted: boolean;
  fillPercent?: number;
}

const Logo = ({ isInverted, fillPercent = 0 }: LogoProps) => {
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
        {/* Wave SVG at the top of the fill */}
        {fillPercent > 0 && fillPercent < 100 && (
          <svg 
            className="absolute left-0 right-0 w-full"
            style={{ 
              top: '-20px',
              height: '40px'
            }}
            viewBox="0 0 1200 40" 
            preserveAspectRatio="none"
          >
            <path 
              className="animate-wave"
              d="M0,20 C150,35 350,5 500,20 C650,35 850,5 1000,20 C1100,30 1150,25 1200,20 L1200,40 L0,40 Z"
              fill="hsl(330 100% 45%)"
            />
            <path 
              className="animate-wave-reverse"
              d="M0,25 C200,10 300,35 500,25 C700,15 900,40 1200,25 L1200,40 L0,40 Z"
              fill="hsl(330 100% 50% / 0.5)"
            />
          </svg>
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
