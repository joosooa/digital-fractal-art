const Navigation = () => {
  return (
    <nav className="absolute top-0 w-full p-8 flex justify-between items-start z-20">
      <div className="nav-text text-foreground/80">
        System: YOFLÉ_OS v2.5<br />
        Status: Terminal_Active
      </div>
      <div className="nav-text text-right text-foreground/80">
        Access_Code: 0XFF829<br />
        Local: Seoul_KR
      </div>
    </nav>
  );
};

export default Navigation;
