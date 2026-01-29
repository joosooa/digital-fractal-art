import { useEffect, useRef, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  char: string;
  color: string;
  fontSize: number;
  vx: number;
  vy: number;
  life: number;
  decay: number;
  rotate: number;
}

interface ParticleCanvasProps {
  isDragging: boolean;
}

const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@&%*";
const COLORS = ['#e6007e', '#d4ff3f', '#ffffff'];

const ParticleCanvas = ({ isDragging }: ParticleCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);

  const createExplosion = useCallback((x: number, y: number) => {
    const count = 15;
    for (let i = 0; i < count; i++) {
      const char = CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      particlesRef.current.push({
        x,
        y,
        char,
        color,
        fontSize: Math.random() * 12 + 8,
        vx: (Math.random() - 0.5) * 10,
        vy: (Math.random() - 0.5) * 10,
        life: 1,
        decay: Math.random() * 0.02 + 0.005,
        rotate: Math.random() * Math.PI * 2,
      });
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current = particlesRef.current.filter(p => p.life > 0);

      particlesRef.current.forEach(p => {
        // Update
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.1; // Gravity
        p.life -= p.decay;
        p.rotate += 0.1;

        // Draw
        ctx.save();
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.font = `bold ${p.fontSize}px 'Courier Prime'`;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotate);
        ctx.fillText(p.char, 0, 0);
        ctx.restore();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        createExplosion(e.clientX, e.clientY);
        // Screen glitch effect
        if (Math.random() > 0.8) {
          ctx.fillStyle = 'rgba(230, 0, 126, 0.2)';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging) {
        createExplosion(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      createExplosion(e.touches[0].clientX, e.touches[0].clientY);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchstart', handleTouchStart);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchstart', handleTouchStart);
    };
  }, [isDragging, createExplosion]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-[5]"
    />
  );
};

export default ParticleCanvas;
