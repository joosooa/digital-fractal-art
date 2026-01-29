import { useState, useEffect } from 'react';
import DataStream from '@/components/DataStream';
import Navigation from '@/components/Navigation';
import Logo from '@/components/Logo';
import Instruction from '@/components/Instruction';
import Scanline from '@/components/Scanline';

const Index = () => {
  const [fillHeight, setFillHeight] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const handleMouseDown = () => setIsDragging(true);
    const handleMouseUp = () => {
      setIsDragging(false);
      setFillHeight(0);
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const windowHeight = window.innerHeight;
        const mouseY = e.clientY;
        const percentage = ((windowHeight - mouseY) / windowHeight) * 100;
        setFillHeight(Math.min(100, Math.max(0, percentage)));
      }
    };

    const handleTouchStart = () => setIsDragging(true);
    const handleTouchEnd = () => {
      setIsDragging(false);
      setFillHeight(0);
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging) {
        const windowHeight = window.innerHeight;
        const touchY = e.touches[0].clientY;
        const percentage = ((windowHeight - touchY) / windowHeight) * 100;
        setFillHeight(Math.min(100, Math.max(0, percentage)));
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
  }, [isDragging]);

  return (
    <div className="relative w-full h-full bg-background overflow-hidden">
      <DataStream />
      <Scanline />
      
      {/* Magenta fill from bottom */}
      <div 
        className="absolute bottom-0 left-0 w-full bg-primary transition-all duration-75 ease-out pointer-events-none z-[2]"
        style={{ height: `${fillHeight}%` }}
      />
      
      <Navigation />
      <Logo isInverted={false} />
      <Instruction />
    </div>
  );
};

export default Index;
