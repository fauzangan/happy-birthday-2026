import { useEffect, useRef, useState } from 'react';

interface Props {
  end: number;
  duration?: number;
  className?: string;
  format?: (n: number) => string;
}

/*
 * Menghitung naik dari 0 ke `end` saat masuk layar (momen khas Wrapped).
 * Setelah selesai, mengikuti nilai `end` terbaru (berguna buat counter live).
 * Reduced-motion: langsung lompat ke nilai akhir.
 */
export default function CountUp({ end, duration = 1400, className, format }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const doneRef = useRef(false);
  const [started, setStarted] = useState(false);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setStarted(true);
          obs.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || doneRef.current) {
      setValue(end);
      doneRef.current = true;
      return;
    }
    let raf = 0;
    const start = performance.now();
    const target = end;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
      else doneRef.current = true;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, end, duration]);

  const shown = doneRef.current ? end : value;
  return (
    <span ref={ref} className={className}>
      {format ? format(shown) : shown}
    </span>
  );
}
