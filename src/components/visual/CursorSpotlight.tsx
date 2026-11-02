import React, { useEffect, useRef } from 'react';

export const CursorSpotlight: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse target and smoothed position
    let targetX = width / 2;
    let targetY = height / 2;
    let currentX = width / 2;
    let currentY = height / 2;
    let isMouseInside = false;

    // Interactive pop-up particles
    interface PopParticle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      color: string;
      life: number;
      maxLife: number;
    }

    const particles: PopParticle[] = [];
    const colors = ['#00F0FF', '#38BDF8', '#8B5CF6', '#C084FC', '#EC4899'];

    // Click wave rings
    interface Ripple {
      x: number;
      y: number;
      radius: number;
      alpha: number;
      maxRadius: number;
    }
    const ripples: Ripple[] = [];

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    let lastSpawn = 0;
    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      isMouseInside = true;

      // Spawn pop-up particles as cursor moves
      const now = performance.now();
      if (now - lastSpawn > 25) {
        lastSpawn = now;
        for (let i = 0; i < 2; i++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 2.2 + 0.6;
          particles.push({
            x: e.clientX + (Math.random() - 0.5) * 16,
            y: e.clientY + (Math.random() - 0.5) * 16,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed - 0.4,
            size: Math.random() * 2.5 + 1.2,
            alpha: 1,
            color: colors[Math.floor(Math.random() * colors.length)],
            life: 0,
            maxLife: Math.floor(Math.random() * 35) + 25,
          });
        }
      }
    };

    const handleMouseLeave = () => {
      isMouseInside = false;
    };

    const handleClick = (e: MouseEvent) => {
      // Pop-up burst on click
      ripples.push({
        x: e.clientX,
        y: e.clientY,
        radius: 10,
        alpha: 0.9,
        maxRadius: 180,
      });

      for (let i = 0; i < 18; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 4 + 1.5;
        particles.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 3.5 + 1.5,
          alpha: 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          life: 0,
          maxLife: 45,
        });
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('click', handleClick);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth cursor lerp
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;

      // Draw interactive cursor spotlight & grid illuminator
      if (isMouseInside) {
        // Broad ambient glow
        const ambientGlow = ctx.createRadialGradient(
          currentX,
          currentY,
          20,
          currentX,
          currentY,
          320
        );
        ambientGlow.addColorStop(0, 'rgba(0, 240, 255, 0.14)');
        ambientGlow.addColorStop(0.35, 'rgba(139, 92, 246, 0.08)');
        ambientGlow.addColorStop(0.7, 'rgba(236, 72, 153, 0.03)');
        ambientGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = ambientGlow;
        ctx.beginPath();
        ctx.arc(currentX, currentY, 320, 0, Math.PI * 2);
        ctx.fill();

        // Intense core aura
        const coreSpot = ctx.createRadialGradient(
          currentX,
          currentY,
          0,
          currentX,
          currentY,
          80
        );
        coreSpot.addColorStop(0, 'rgba(0, 240, 255, 0.22)');
        coreSpot.addColorStop(0.5, 'rgba(139, 92, 246, 0.1)');
        coreSpot.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = coreSpot;
        ctx.beginPath();
        ctx.arc(currentX, currentY, 80, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw click ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += 4.5;
        r.alpha *= 0.94;

        ctx.save();
        ctx.strokeStyle = `rgba(0, 240, 255, ${r.alpha})`;
        ctx.lineWidth = 1.5;
        ctx.shadowColor = '#00F0FF';
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();

        if (r.alpha < 0.02 || r.radius >= r.maxRadius) {
          ripples.splice(i, 1);
        }
      }

      // Draw & update interactive pop-up particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.96;
        p.vy *= 0.96;
        p.life++;
        p.alpha = 1 - p.life / p.maxLife;

        ctx.save();
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (1 - (p.life / p.maxLife) * 0.4), 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        if (p.life >= p.maxLife || p.alpha <= 0) {
          particles.splice(i, 1);
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ opacity: 0.95 }}
    />
  );
};
