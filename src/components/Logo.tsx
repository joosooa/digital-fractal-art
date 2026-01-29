interface LogoProps {
  isInverted: boolean;
  fillPercent?: number;
}

const Logo = ({ isInverted, fillPercent = 0 }: LogoProps) => {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-center pointer-events-none">
      <div className="relative">
        {/* Base white text */}
        <h1 className={`main-logo ${isInverted ? 'inverted' : ''}`}>
          YOFLÉ
        </h1>
        
        {/* Magenta fill overlay - clips from bottom */}
        <div 
          className="absolute inset-0 overflow-hidden"
          style={{ 
            clipPath: `inset(${100 - fillPercent}% 0 0 0)`,
            transition: 'clip-path 0.05s ease-out'
          }}
        >
          <h1 className="main-logo text-primary" style={{ mixBlendMode: 'normal' }}>
            YOFLÉ
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Logo;
