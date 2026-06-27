import { useEffect, useState } from 'react';
import ScrollReveal from './ScrollReveal';
import CountUp from './CountUp';

/*
 * ==========================================
 *   GANTI TANGGAL MULAI DI BAWAH INI!
 *   Format: new Date('YYYY-MM-DD')
 * ==========================================
 */
const START_DATE = new Date('2023-01-03');
/* ========================================== */

function diff(from: Date) {
  const ms = Date.now() - from.getTime();
  return {
    days: Math.floor(ms / 86400000),
    hours: Math.floor((ms % 86400000) / 3600000),
    minutes: Math.floor((ms % 3600000) / 60000),
    seconds: Math.floor((ms % 60000) / 1000),
  };
}

export default function CheckpointCounter() {
  const [time, setTime] = useState(diff(START_DATE));

  useEffect(() => {
    const id = setInterval(() => setTime(diff(START_DATE)), 1000);
    return () => clearInterval(id);
  }, []);

  const items: [number, string][] = [
    [time.days, 'Hari'],
    [time.hours, 'Jam'],
    [time.minutes, 'Menit'],
    [time.seconds, 'Detik'],
  ];

  return (
    <section className="scene scene--counter">
      <div className="scene__inner">
        <ScrollReveal>
          <p className="scene__eyebrow">Our Journey Together</p>
          <h2 className="scene__title">Sudah sejauh ini, dan masih terus jalan.</h2>
          <p className="scene__lead">
            Sejak{' '}
            {START_DATE.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </ScrollReveal>

        <div className="counter__grid">
          {items.map(([value, label], i) => (
            <ScrollReveal key={label} delay={i * 90}>
              <div className="counter__tile">
                {label === 'Hari' ? (
                  <CountUp end={value} className="counter__number" />
                ) : (
                  <span className="counter__number">{String(value).padStart(2, '0')}</span>
                )}
                <span className="counter__label">{label}</span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
