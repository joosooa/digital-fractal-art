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
    <div className="relative w-full h-full overflow-hidden">
      {/* Hero Section */}
      <div 
        className="absolute inset-0 bg-background transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ 
          transform: `translateY(-${scrollOffset}%)`,
          opacity: scrollOffset > 50 ? 1 - (scrollOffset - 50) / 50 : 1
        }}
      >
        <DataStream />
        <Scanline />
        <Navigation />
        <Logo isInverted={false} fillPercent={fillPercent} />
        <Instruction text={fillPercent >= 100 ? "SCROLL DOWN TO CONTINUE" : "SCROLL TO DECODE"} />
      </div>

      {/* Form Section */}
      <div 
        className="absolute inset-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ 
          transform: `translateY(${100 - scrollOffset}%)`,
          opacity: scrollOffset < 50 ? scrollOffset / 50 : 1
        }}
      >
        <AccessForm onClose={handleBackToHero} />
      </div>
    </div>
  );
};

export default Index;
