import { useState, useEffect } from 'react';
import DataStream from '@/components/DataStream';
import Navigation from '@/components/Navigation';
import Logo from '@/components/Logo';
import Instruction from '@/components/Instruction';
import Scanline from '@/components/Scanline';
import AccessForm from '@/components/AccessForm';

const Index = () => {
  const [fillPercent, setFillPercent] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [wasFullyFilled, setWasFullyFilled] = useState(false);

  useEffect(() => {
    if (fillPercent >= 100) {
      setWasFullyFilled(true);
    }
  }, [fillPercent]);

  useEffect(() => {
    const handleMouseDown = () => setIsDragging(true);
    const handleMouseUp = () => {
      setIsDragging(false);
      if (wasFullyFilled) {
        setShowForm(true);
      }
      setFillPercent(0);
      setWasFullyFilled(false);
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const windowHeight = window.innerHeight;
        const mouseY = e.clientY;
        const percentage = ((windowHeight - mouseY) / windowHeight) * 100;
        setFillPercent(Math.min(100, Math.max(0, percentage)));
      }
    };

    const handleTouchStart = () => setIsDragging(true);
    const handleTouchEnd = () => {
      setIsDragging(false);
      if (wasFullyFilled) {
        setShowForm(true);
      }
      setFillPercent(0);
      setWasFullyFilled(false);
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging) {
        const windowHeight = window.innerHeight;
        const touchY = e.touches[0].clientY;
        const percentage = ((windowHeight - touchY) / windowHeight) * 100;
        setFillPercent(Math.min(100, Math.max(0, percentage)));
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
  }, [isDragging, wasFullyFilled]);

  const handleCloseForm = () => {
    setShowForm(false);
  };

  if (showForm) {
    return <AccessForm onClose={handleCloseForm} />;
  }

  return (
    <div className="relative w-full h-full bg-background overflow-hidden">
      <DataStream />
      <Scanline />
      <Navigation />
      <Logo isInverted={false} fillPercent={fillPercent} />
      <Instruction />
    </div>
  );
};

export default Index;
