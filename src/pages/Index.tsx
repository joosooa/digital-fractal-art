import { useState, useEffect, useRef } from 'react';
import DataStream from '@/components/DataStream';
import Navigation from '@/components/Navigation';
import Logo from '@/components/Logo';
import Instruction from '@/components/Instruction';
import AccessForm from '@/components/AccessForm';

const Index = () => {
  const [fillPercent, setFillPercent] = useState(0);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [heroComplete, setHeroComplete] = useState(false);
  const isFilledRef = useRef(false);
  const heroDelayRef = useRef(false);

  const isWithinScrollableForm = (target: EventTarget | null) => {
    if (!(target instanceof Element)) return false;
    return Boolean(target.closest('[data-scrollable="form"]'));
  };

  useEffect(() => {
    // When fill reaches 100%, wait a moment before allowing scroll transition
    if (fillPercent >= 100 && !heroDelayRef.current) {
      heroDelayRef.current = true;
      setTimeout(() => {
        setHeroComplete(true);
      }, 800); // Show hero tagline for 800ms before allowing transition
    } else if (fillPercent < 100) {
      heroDelayRef.current = false;
      setHeroComplete(false);
    }
  }, [fillPercent]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Allow native scrolling inside the form section
      if (isWithinScrollableForm(e.target)) return;
      e.preventDefault();
      
      if (!isFilledRef.current) {
        // Phase 1: Fill the logo
        setFillPercent(prev => {
          const newFill = Math.min(100, Math.max(0, prev + e.deltaY * 0.12));
          if (newFill >= 100) {
            isFilledRef.current = true;
          }
          return newFill;
        });
      } else if (heroComplete) {
        // Phase 2: Scroll to form section (only after hero delay)
        setScrollOffset(prev => {
          const newScroll = Math.min(100, Math.max(0, prev + e.deltaY * 0.15));
          if (newScroll <= 0 && e.deltaY < 0) {
            isFilledRef.current = false;
            setFillPercent(100);
            setHeroComplete(false);
            heroDelayRef.current = false;
          }
          return newScroll;
        });
      }
    };

    // Touch support for mobile - improved
    let touchStartY = 0;
    let lastTouchY = 0;
    
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
      lastTouchY = e.touches[0].clientY;
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      // Allow native scrolling inside the form section
      if (isWithinScrollableForm(e.target)) return;
      e.preventDefault();
      const currentY = e.touches[0].clientY;
      const deltaY = lastTouchY - currentY;
      lastTouchY = currentY;
      
      if (!isFilledRef.current) {
        setFillPercent(prev => {
          const newFill = Math.min(100, Math.max(0, prev + deltaY * 0.5));
          if (newFill >= 100) {
            isFilledRef.current = true;
          }
          return newFill;
        });
      } else if (heroComplete) {
        setScrollOffset(prev => {
          const newScroll = Math.min(100, Math.max(0, prev + deltaY * 0.4));
          if (newScroll <= 0 && deltaY < 0) {
            isFilledRef.current = false;
            setFillPercent(100);
            setHeroComplete(false);
            heroDelayRef.current = false;
          }
          return newScroll;
        });
      }
    };

    document.addEventListener('wheel', handleWheel, { passive: false });
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      document.removeEventListener('wheel', handleWheel);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, [heroComplete]);

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
          transform: `translateY(-${scrollOffset * 0.8}%)`,
          opacity: scrollOffset > 40 ? 1 - (scrollOffset - 40) / 40 : 1
        }}
      >
        <DataStream />
        <Navigation />
        <Logo isInverted={false} fillPercent={fillPercent} />
        <Instruction text={fillPercent >= 100 ? "SCROLL DOWN TO CONTINUE" : "SCROLL TO DECODE"} />
      </div>

      {/* Gradient Transition Zone - Extended & Longer */}
      <div 
        className="fixed inset-0 pointer-events-none transition-opacity duration-1000"
        style={{ 
          opacity: scrollOffset > 15 && scrollOffset < 95 
            ? Math.min(1, (scrollOffset - 15) / 25) * (scrollOffset < 80 ? 1 : 1 - (scrollOffset - 80) / 15)
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
          transform: `translateY(${Math.max(0, 100 - scrollOffset * 0.9)}%)`,
          opacity: scrollOffset < 60 ? 0 : Math.min(1, (scrollOffset - 60) / 20),
          zIndex: 20
        }}
      >
        <AccessForm onClose={handleBackToHero} />
      </div>
    </div>
  );
};

export default Index;
