import { useEffect, useRef } from 'react';

/*
 * Confetti ambience — Discord-colored bits drifting down the page.
 * Replaces the old floating-hearts canvas. Same rAF / DPR / resize shape.
 */

interface Bit {
  x: number;
  y: number;
  size: number;
  speedY: number;
  drift: number;
  driftSpeed: number;
  phase: number;
  type: 'rect' | 'star' | 'dot';
  color: string;
  rotation: number;
  rotSpeed: number;
  opacity: number;
}

const COLORS = ['#5865f2', '#57f287', '#fee75c', '#eb459e', '#ff7a66', '#818cf8'];

function star(ctx: CanvasRenderingContext2D, r: number) {
  ctx.beginPath();
  for (let i = 0; i < 5; i++) {
    const a = (i * 4 * Math.PI) / 5 - Math.PI / 2;
    const x = Math.cos(a) * r;
    const y = Math.sin(a) * r;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
}

function createBit(w: number, h: number, reset = false): Bit {
  const roll = Math.random();
  const type: Bit['type'] = roll > 0.66 ? 'star' : roll > 0.33 ? 'rect' : 'dot';
  return {
    x: Math.random() * w,
    y: reset ? -20 - Math.random() * 80 : Math.random() * h,
    size: type === 'dot' ? 2 + Math.random() * 3 : 5 + Math.random() * 7,
    speedY: 0.4 + Math.random() * 0.9,
    drift: 12 + Math.random() * 28,
    driftSpeed: 0.004 + Math.random() * 0.008,
    phase: Math.random() * Math.PI * 2,
    type,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    rotation: Math.random() * Math.PI * 2,
    rotSpeed: (Math.random() - 0.5) * 0.05,
    opacity: 0.45 + Math.random() * 0.45,
  };
}

export default function ConfettiCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let bits: Bit[] = [];

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = window.innerWidth * dpr;
      canvas!.height = window.innerHeight * dpr;
      canvas!.style.width = window.innerWidth + 'px';
      canvas!.style.height = window.innerHeight + 'px';
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function init() {
      resize();
      const count = window.innerWidth < 768 ? 26 : 50;
      bits = Array.from({ length: count }, () =>
        createBit(window.innerWidth, window.innerHeight),
      );
    }

    function animate() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx!.clearRect(0, 0, w, h);

      for (const b of bits) {
        b.y += b.speedY;
        b.phase += b.driftSpeed;
        b.rotation += b.rotSpeed;

        if (b.y > h + 30) Object.assign(b, createBit(w, h, true));

        const drawX = b.x + Math.sin(b.phase) * b.drift;

        ctx!.save();
        ctx!.translate(drawX, b.y);
        ctx!.rotate(b.rotation);
        ctx!.globalAlpha = b.opacity;
        ctx!.fillStyle = b.color;

        if (b.type === 'rect') {
          ctx!.fillRect(-b.size / 2, -b.size / 3, b.size, b.size * 0.66);
        } else if (b.type === 'star') {
          star(ctx!, b.size * 0.7);
          ctx!.fill();
        } else {
          ctx!.beginPath();
          ctx!.arc(0, 0, b.size, 0, Math.PI * 2);
          ctx!.fill();
        }
        ctx!.restore();
      }

      animId = requestAnimationFrame(animate);
    }

    init();
    animate();
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
