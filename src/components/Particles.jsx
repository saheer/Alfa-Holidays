import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

/**
 * Ultra-light atmosphere layer: faint light motes drifting up and to the right,
 * plus a few soft 4-point sparkles that twinkle. Single <canvas>, pre-rendered
 * glow sprites, DPR capped at 2, paused when the tab is hidden, and drawn once
 * (no motion) for people who prefer reduced motion.
 * Opacity is kept between 0.08 and 0.25 so it never competes with the type.
 */

const COLORS = [
  [255, 255, 255], // white
  [255, 238, 200], // champagne
  [190, 232, 255], // ice blue
];

const rand = (a, b) => a + Math.random() * (b - a);

function makeSprite([r, g, b], size = 64) {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d');
  const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  grad.addColorStop(0, `rgba(${r},${g},${b},1)`);
  grad.addColorStop(0.3, `rgba(${r},${g},${b},0.35)`);
  grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);
  return c;
}

function createParticle(w, h, anywhere = true) {
  const sparkle = Math.random() < 0.14;
  return {
    x: rand(0, w),
    y: anywhere ? rand(0, h) : h + 20,
    size: sparkle ? rand(5, 9) : rand(1.2, 3.2), // sprite radius / sparkle arm length
    vx: rand(2, 9), // px per second, drifting right...
    vy: -rand(5, 15), // ...and upward
    alpha: rand(0.15, 0.25),
    phase: rand(0, Math.PI * 2),
    speed: rand(0.4, 1.1),
    color: Math.floor(rand(0, COLORS.length)),
    sparkle,
  };
}

export default function Particles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const sprites = COLORS.map((c) => makeSprite(c));
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let w = 0;
    let h = 0;
    let particles = [];
    let raf = 0;
    let last = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(70, Math.max(22, Math.round((w * h) / 26000)));
      particles = Array.from({ length: count }, () => createParticle(w, h));
      if (reduce) draw(0);
    };

    const draw = (t) => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        const twinkle = 0.55 + 0.45 * Math.sin(t * p.speed + p.phase);
        const a = p.alpha * twinkle;
        ctx.globalAlpha = a;

        if (p.sparkle) {
          const [r, g, b] = COLORS[p.color];
          const L = p.size * (0.7 + 0.3 * twinkle);
          ctx.strokeStyle = `rgb(${r},${g},${b})`;
          ctx.lineWidth = 0.8;
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.moveTo(p.x - L, p.y);
          ctx.lineTo(p.x + L, p.y);
          ctx.moveTo(p.x, p.y - L);
          ctx.lineTo(p.x, p.y + L);
          ctx.stroke();
          ctx.drawImage(sprites[p.color], p.x - 7, p.y - 7, 14, 14);
        } else {
          const d = p.size * 4; // sprite is mostly soft falloff, so draw it larger
          ctx.drawImage(sprites[p.color], p.x - d / 2, p.y - d / 2, d, d);
        }
      }
      ctx.globalAlpha = 1;
    };

    const tick = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        if (p.y < -20 || p.x > w + 20) {
          particles[i] = createParticle(w, h, false);
          if (Math.random() < 0.5) particles[i].x = rand(0, w * 0.6);
        }
      }
      draw(now / 1000);
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (reduce || raf) return;
      last = performance.now();
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    resize();
    start();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      stop();
      ro.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <motion.div
      className="pointer-events-none absolute inset-0 z-0"
      aria-hidden="true"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 3, delay: 1, ease: 'easeOut' }}
    >
      <canvas ref={canvasRef} className="h-full w-full" />
    </motion.div>
  );
}
