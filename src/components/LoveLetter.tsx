import { useEffect, useRef, useState } from 'react';
import ScrollReveal from './ScrollReveal';

/*
 * ==========================================
 *   GANTI ISI CHAT DI BAWAH INI!
 *   Tiap baris = satu balon chat.
 *   Tulis pakai bahasamu sendiri ya :)
 * ==========================================
 */
const SENDER = 'kamu'; // nama panggilanmu yang muncul di chat
const MESSAGES = [
  'Hai Sayang 👋',
  'Selamat ulang tahun yaa! 🎂',
  'Makasih udah jadi bagian paling seru di hari-hariku.',
  'Kamu itu orang yang bikin hal biasa jadi nggak biasa.',
  'Tahun ini aku doain semua yang kamu mau pelan-pelan kewujud.',
  'Tetep jadi kamu yang sekarang, aku suka banget sama itu.',
  'Pokoknya, hari ini kamu yang paling spesial. ❤️',
];
const TIME_LABEL = 'hari ini';
/* ========================================== */

const INITIAL = SENDER.trim()[0]?.toUpperCase() ?? '?';

export default function ChatLetter() {
  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0); // berapa pesan sudah tampil
  const [started, setStarted] = useState(false);

  /* mulai reveal saat masuk viewport */
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
      { threshold: 0.25 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* reveal pesan satu per satu (atau langsung kalau reduced motion) */
  useEffect(() => {
    if (!started) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setCount(MESSAGES.length);
      return;
    }
    if (count >= MESSAGES.length) return;
    const t = setTimeout(() => setCount((c) => c + 1), count === 0 ? 600 : 1100);
    return () => clearTimeout(t);
  }, [started, count]);

  const typing = started && count < MESSAGES.length;

  return (
    <section className="scene scene--chat">
      <div className="scene__inner">
        <ScrollReveal>
          <p className="scene__eyebrow">Pesan Langsung</p>
          <h2 className="scene__title">Satu pesan buat kamu.</h2>
        </ScrollReveal>

        <ScrollReveal delay={120}>
          <div className="chat" ref={ref}>
            <div className="chat__header">
              <span className="chat__avatar" aria-hidden="true">{INITIAL}</span>
              <div>
                <span className="chat__name">{SENDER}</span>
                <span className="chat__sub">Selalu online buat kamu</span>
              </div>
              <span className="chat__presence" aria-hidden="true" />
            </div>

            <div className="chat__thread">
              {MESSAGES.slice(0, count).map((m, i) => (
                <div className="chat__row" key={i}>
                  <span className="chat__bubble">{m}</span>
                  <span className="chat__time">{TIME_LABEL}</span>
                </div>
              ))}

              {typing && (
                <div className="chat__typing" aria-label="sedang mengetik">
                  <span /><span /><span />
                </div>
              )}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
