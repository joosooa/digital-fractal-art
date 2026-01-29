import { useState, useEffect, useRef } from 'react';
import DataStream from '@/components/DataStream';
import Navigation from '@/components/Navigation';
import Logo from '@/components/Logo';
import Instruction from '@/components/Instruction';
import Scanline from '@/components/Scanline';
import AccessForm from '@/components/AccessForm';

const Index = () => {
  const [fillPercent, setFillPercent] = useState(0);
  const [scrollOffset, setScrollOffset] = useState(0);
  const isFilledRef = useRef(false);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      if (!isFilledRef.current) {
        // Phase 1: Fill the logo (scroll down to fill) - slower, requires ~3 wheel scrolls
        setFillPercent(prev => {
          const newFill = Math.min(100, Math.max(0, prev + e.deltaY * 0.12));
          if (newFill >= 100) {
            isFilledRef.current = true;
          }
          return newFill;
        });
      } else {
        // Phase 2: Scroll to form section
        setScrollOffset(prev => {
          const newScroll = Math.min(100, Math.max(0, prev + e.deltaY * 0.2));
          // If scrolling back up and at top, go back to phase 1
          if (newScroll <= 0 && e.deltaY < 0) {
            isFilledRef.current = false;
            setFillPercent(100);
          }
          return newScroll;
        });
      }
    };

    // Touch support for mobile
    let touchStartY = 0;
    
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const deltaY = touchStartY - e.touches[0].clientY;
      touchStartY = e.touches[0].clientY;
      
      if (!isFilledRef.current) {
        setFillPercent(prev => {
          const newFill = Math.min(100, Math.max(0, prev + deltaY * 0.2));
          if (newFill >= 100) {
            isFilledRef.current = true;
          }
          return newFill;
        });
      } else {
        setScrollOffset(prev => {
          const newScroll = Math.min(100, Math.max(0, prev + deltaY * 0.3));
          if (newScroll <= 0 && deltaY < 0) {
            isFilledRef.current = false;
            setFillPercent(100);
          }
          return newScroll;
        });
      }
    };

    document.addEventListener('wheel', handleWheel, { passive: false });
    document.addEventListener('touchstart', handleTouchStart, { passive: false });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      document.removeEventListener('wheel', handleWheel);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  const handleBackToHero = () => {
    setScrollOffset(0);
    setFillPercent(0);
    isFilledRef.current = false;
  };

  return (
    <div className="relative w-full h-[200vh] overflow-hidden">
      {/* Hero Section */}
      <div 
        className="fixed inset-0 bg-background transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ 
          transform: `translateY(-${scrollOffset * 1.2}%)`,
          opacity: scrollOffset > 30 ? 1 - (scrollOffset - 30) / 40 : 1
        }}
      >
        <DataStream />
        <Scanline />
        <Navigation />
        <Logo isInverted={false} fillPercent={fillPercent} />
        <Instruction text={fillPercent >= 100 ? "SCROLL DOWN TO CONTINUE" : "SCROLL TO DECODE"} />
      </div>

      {/* Gradient Transition Zone - Extended */}
      <div 
        className="fixed inset-0 pointer-events-none transition-opacity duration-1000"
        style={{ 
          opacity: scrollOffset > 10 && scrollOffset < 90 
            ? Math.min(1, (scrollOffset - 10) / 20) * (scrollOffset < 70 ? 1 : 1 - (scrollOffset - 70) / 20)
            : 0,
          background: `linear-gradient(
            180deg,
            hsl(330, 100%, 35%) 0%,
            hsl(330, 100%, 40%) 10%,
            hsl(330, 95%, 45%) 20%,
            hsl(335, 85%, 55%) 35%,
            hsl(340, 70%, 65%) 50%,
            hsl(345, 55%, 75%) 65%,
            hsl(350, 40%, 85%) 80%,
            hsl(355, 25%, 92%) 90%,
            hsl(0, 15%, 97%) 100%
          )`,
          zIndex: 15
        }}
      />

      {/* Form Section */}
      <div 
        className="fixed inset-0 transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ 
          transform: `translateY(${Math.max(0, 100 - scrollOffset * 1.1)}%)`,
          opacity: scrollOffset < 50 ? 0 : Math.min(1, (scrollOffset - 50) / 25),
          zIndex: 20
        }}
      >
        <AccessForm onClose={handleBackToHero} />
      </div>
    </div>
  );
};

export default Index;
