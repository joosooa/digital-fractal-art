import { useState, useEffect } from 'react';
import DataStream from '@/components/DataStream';
import ParticleCanvas from '@/components/ParticleCanvas';
import Navigation from '@/components/Navigation';
import Logo from '@/components/Logo';
import Instruction from '@/components/Instruction';
import Scanline from '@/components/Scanline';

const Index = () => {
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const handleMouseDown = () => setIsDragging(true);
    const handleMouseUp = () => setIsDragging(false);
    const handleTouchStart = () => setIsDragging(true);
    const handleTouchEnd = () => setIsDragging(false);

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <div className="relative w-full h-full bg-background overflow-hidden">
      <DataStream />
      <Scanline />
      <ParticleCanvas isDragging={isDragging} />
      <Navigation />
      <Logo isInverted={isDragging} />
      <Instruction />
    </div>
  );
};

export default Index;
