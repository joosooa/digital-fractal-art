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
  const isDraggingRef = useRef(false);
  const startYRef = useRef(0);
  const isFilledRef = useRef(false);

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      startYRef.current = e.clientY;
    };
    
    const handleMouseUp = () => {
      isDraggingRef.current = false;
      // Snap to either hero or form section
      if (scrollOffset > 50) {
        setScrollOffset(100);
      } else {
        setScrollOffset(0);
        if (fillPercent < 100) {
          setFillPercent(0);
          isFilledRef.current = false;
        }
      }
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      
      const deltaY = startYRef.current - e.clientY;
      
      if (!isFilledRef.current) {
        // Phase 1: Fill the logo (drag up to fill)
        const newFill = Math.min(100, Math.max(0, (deltaY / 300) * 100));
        setFillPercent(newFill);
        
        if (newFill >= 100) {
          isFilledRef.current = true;
          startYRef.current = e.clientY; // Reset start position for phase 2
        }
      } else {
        // Phase 2: Scroll to form section (drag down to reveal)
        const scrollDelta = (e.clientY - startYRef.current) / window.innerHeight * 100;
        const newScroll = Math.min(100, Math.max(0, scrollDelta));
        setScrollOffset(newScroll);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      isDraggingRef.current = true;
      startYRef.current = e.touches[0].clientY;
    };
    
    const handleTouchEnd = () => {
      isDraggingRef.current = false;
      if (scrollOffset > 50) {
        setScrollOffset(100);
      } else {
        setScrollOffset(0);
        if (fillPercent < 100) {
          setFillPercent(0);
          isFilledRef.current = false;
        }
      }
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current) return;
      
      const deltaY = startYRef.current - e.touches[0].clientY;
      
      if (!isFilledRef.current) {
        const newFill = Math.min(100, Math.max(0, (deltaY / 300) * 100));
        setFillPercent(newFill);
        
        if (newFill >= 100) {
          isFilledRef.current = true;
          startYRef.current = e.touches[0].clientY;
        }
      } else {
        const scrollDelta = (e.touches[0].clientY - startYRef.current) / window.innerHeight * 100;
        const newScroll = Math.min(100, Math.max(0, scrollDelta));
        setScrollOffset(newScroll);
      }
    };

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchend', handleTouchEnd);
    document.addEventListener('touchmove', handleTouchMove);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, [fillPercent, scrollOffset]);

  const handleBackToHero = () => {
    setScrollOffset(0);
    setFillPercent(0);
    isFilledRef.current = false;
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Hero Section */}
      <div 
        className="absolute inset-0 bg-background transition-transform duration-500 ease-out"
        style={{ transform: `translateY(-${scrollOffset}%)` }}
      >
        <DataStream />
        <Scanline />
        <Navigation />
        <Logo isInverted={false} fillPercent={fillPercent} />
        <Instruction text={fillPercent >= 100 ? "DRAG DOWN TO CONTINUE" : "DRAG UP TO DECODE"} />
      </div>

      {/* Form Section */}
      <div 
        className="absolute inset-0 transition-transform duration-500 ease-out"
        style={{ transform: `translateY(${100 - scrollOffset}%)` }}
      >
        <AccessForm onClose={handleBackToHero} />
      </div>
    </div>
  );
};

export default Index;
