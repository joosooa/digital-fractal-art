interface LogoProps {
  isInverted: boolean;
}

const Logo = ({ isInverted }: LogoProps) => {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-center pointer-events-none">
      <h1 className={`main-logo ${isInverted ? 'inverted' : ''}`}>
        YOFLÉ
      </h1>
    </div>
  );
};

export default Logo;
