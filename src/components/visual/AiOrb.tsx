import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface AiOrbProps {
  size?: 'sm' | 'md' | 'lg';
  isPulsing?: boolean;
}

export const AiOrb: React.FC<AiOrbProps> = ({ size = 'lg', isPulsing = false }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const dimension = size === 'sm' ? 80 : size === 'md' ? 140 : 200;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let angle = 0;

    // High DPI scaling
    const dpr = window.devicePixelRatio || 1;
    canvas.width = dimension * dpr;
    canvas.height = dimension * dpr;
    ctx.scale(dpr, dpr);

    const particles: { x: number; y: number; speed: number; radius: number; color: string; offset: number }[] = [];
    const colors = ['#00F0FF', '#38BDF8', '#8B5CF6', '#C084FC', '#EC4899'];

    for (let i = 0; i < 28; i++) {
      particles.push({
        x: 0,
        y: 0,
        speed: 0.015 + Math.random() * 0.02,
        radius: 0.8 + Math.random() * 2.2,
        color: colors[i % colors.length],
        offset: (i * Math.PI * 2) / 28,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, dimension, dimension);
      const centerX = dimension / 2;
      const centerY = dimension / 2;
      const baseRadius = dimension * 0.28;

      // Outer ethereal glow
      const outerGlow = ctx.createRadialGradient(centerX, centerY, baseRadius * 0.2, centerX, centerY, baseRadius * 1.6);
      outerGlow.addColorStop(0, 'rgba(56, 189, 248, 0.25)');
      outerGlow.addColorStop(0.5, 'rgba(139, 92, 246, 0.15)');
      outerGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = outerGlow;
      ctx.beginPath();
      ctx.arc(centerX, centerY, baseRadius * 1.6, 0, Math.PI * 2);
      ctx.fill();

      // Rotating particle rings
      angle += 0.015;
      particles.forEach((p, idx) => {
        const currentAngle = angle * (idx % 2 === 0 ? 1 : -1.2) + p.offset;
        const ringSpread = baseRadius * (0.65 + 0.35 * Math.sin(angle * 1.5 + idx));
        const px = centerX + Math.cos(currentAngle) * ringSpread;
        const py = centerY + Math.sin(currentAngle) * (ringSpread * 0.75);

        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(px, py, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Core neural nucleus
      const coreGradient = ctx.createRadialGradient(centerX - 4, centerY - 4, 2, centerX, centerY, baseRadius * 0.8);
      coreGradient.addColorStop(0, '#FFFFFF');
      coreGradient.addColorStop(0.3, '#38BDF8');
      coreGradient.addColorStop(0.7, '#8B5CF6');
      coreGradient.addColorStop(1, 'rgba(236, 72, 153, 0.8)');

      ctx.shadowColor = '#00F0FF';
      ctx.shadowBlur = 18;
      ctx.fillStyle = coreGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, baseRadius * 0.65, 0, Math.PI * 2);
      ctx.fill();

      // Reset shadow for next tick
      ctx.shadowBlur = 0;

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [dimension]);

  return (
    <div className="relative flex items-center justify-center select-none pointer-events-none">
      {/* Outer pulsing atmospheric rings */}
      <motion.div
        animate={isPulsing ? { scale: [1, 1.25, 1], opacity: [0.3, 0.7, 0.3] } : { scale: [1, 1.08, 1], opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: isPulsing ? 1.5 : 3.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute rounded-full bg-gradient-to-tr from-cyber-blue/30 via-cyber-violet/20 to-cyber-pink/30 blur-2xl"
        style={{ width: dimension * 1.4, height: dimension * 1.4 }}
      />
      
      {/* Dynamic Canvas Orb */}
      <canvas
        ref={canvasRef}
        style={{ width: dimension, height: dimension }}
        className="relative z-10 drop-shadow-2xl"
      />
    </div>
  );
};
