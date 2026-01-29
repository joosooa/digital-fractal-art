import yofleLogo from '@/assets/yofle-logo.png';

interface LogoProps {
  isInverted: boolean;
}

const Logo = ({ isInverted }: LogoProps) => {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-center pointer-events-none">
      <div className={`logo-container ${isInverted ? 'inverted' : ''}`}>
        <img 
          src={yofleLogo} 
          alt="YOFLÉ" 
          className="w-[40vw] max-w-[600px] min-w-[200px] h-auto mix-blend-difference"
        />
      </div>
    </div>
  );
};

export default Logo;
