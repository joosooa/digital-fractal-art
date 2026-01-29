import { useState, useEffect, useRef } from 'react';
import DataStream from '@/components/DataStream';
import Navigation from '@/components/Navigation';
import Logo from '@/components/Logo';
import Instruction from '@/components/Instruction';
import Scanline from '@/components/Scanline';
import AccessForm from '@/components/AccessForm';

const Index = () => {
  const [fillPercent, setFillPercent] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const isDraggingRef = useRef(false);
  const wasFullyFilledRef = useRef(false);

  useEffect(() => {
    const handleMouseDown = () => {
      isDraggingRef.current = true;
    };
    
    const handleMouseUp = () => {
      isDraggingRef.current = false;
      if (wasFullyFilledRef.current) {
        setShowForm(true);
      }
      setFillPercent(0);
      wasFullyFilledRef.current = false;
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingRef.current) {
        const windowHeight = window.innerHeight;
        const mouseY = e.clientY;
        const percentage = ((windowHeight - mouseY) / windowHeight) * 100;
        const newFill = Math.min(100, Math.max(0, percentage));
        setFillPercent(newFill);
        if (newFill >= 100) {
          wasFullyFilledRef.current = true;
        }
      }
    };

    const handleTouchStart = () => {
      isDraggingRef.current = true;
    };
    
    const handleTouchEnd = () => {
      isDraggingRef.current = false;
      if (wasFullyFilledRef.current) {
        setShowForm(true);
      }
      setFillPercent(0);
      wasFullyFilledRef.current = false;
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      if (isDraggingRef.current) {
        const windowHeight = window.innerHeight;
        const touchY = e.touches[0].clientY;
        const percentage = ((windowHeight - touchY) / windowHeight) * 100;
        const newFill = Math.min(100, Math.max(0, percentage));
        setFillPercent(newFill);
        if (newFill >= 100) {
          wasFullyFilledRef.current = true;
        }
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
  }, []);

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
