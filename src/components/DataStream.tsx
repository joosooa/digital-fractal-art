import { useEffect, useRef } from 'react';

const DataStream = () => {
  const streamRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rows = 50;
    const cols = 100;
    let content = "";
    for (let i = 0; i < rows; i++) {
      content += "YOFLÉ ".repeat(cols) + "\n";
    }
    if (streamRef.current) {
      streamRef.current.textContent = content;
    }
  }, []);

  useEffect(() => {
    let animationId: number;
    const animate = () => {
      if (streamRef.current) {
        const offset = (Date.now() * 0.05) % 100;
        streamRef.current.style.transform = `translate(-${offset}px, -${offset / 2}px)`;
      }
      animationId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationId);
  }, []);

  return <div ref={streamRef} className="data-stream" />;
};

export default DataStream;
