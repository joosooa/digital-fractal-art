const Navigation = () => {
  return (
    <nav className="absolute top-0 w-full p-8 z-20">
      {/* Desktop only - Top center label */}
      <div className="hidden md:block absolute top-8 left-1/2 -translate-x-1/2">
        <span 
          className="text-xs tracking-[0.3em] uppercase text-foreground/50"
          style={{ fontFamily: "'Courier Prime', monospace" }}
        >
          FOOD AI DASHBOARD
        </span>
      </div>
      
      <div className="flex justify-between items-start">
        <div className="nav-text text-foreground/80">
          System: YOFLÉ_OS v2.5<br />
          Status: Terminal_Active
        </div>
        <div className="nav-text text-right text-foreground/80">
          Access_Code: 0XFF829<br />
          Local: Seoul_KR
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
