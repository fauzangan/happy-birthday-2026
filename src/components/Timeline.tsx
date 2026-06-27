import { useState, useCallback, type CSSProperties } from 'react';
import ScrollReveal from './ScrollReveal';

/*
 * ==========================================
 *   GANTI MOMEN-MOMEN DI BAWAH INI!
 *   Tambah/hapus/edit sesuai cerita kalian
 *   Foto: taruh file di folder public/photos/
 *   lalu pasang path-nya di field 'img'.
 *   Kosongin kalau belum ada — otomatis jadi
 *   placeholder.
 * ==========================================
 */
type MomentEvent = {
  date: string;
  emoji: string;
  title: string;
  img: string;
  // 'contain' menampilkan seluruh foto tanpa terpotong; default 'cover' (mengisi panel).
  fit?: 'cover' | 'contain';
};

const EVENTS: MomentEvent[] = [
  {
    date: 'Jan 2023',
    emoji: '✨',
    title: 'Awal Cerita Kita',
    img: '/photos/awal-cerita.jpeg',
  },
  {
    date: 'Mar 2023',
    emoji: '🍕',
    title: 'Jalan Pertama',
    img: '/photos/jalan-pertama.png',
  },
  {
    date: 'Des 2023',
    emoji: '🌅',
    title: 'Bandungan',
    img: '/photos/liburan-bandungan.jpeg',
  },
  {
    date: 'Des 2023',
    emoji: '🎓',
    title: 'Lulus Kuliah',
    img: '/photos/lulus.jpeg',
  },
  {
    date: 'Jan 2024',
    emoji: '🎨',
    title: 'Simpang Lima',
    img: '/photos/melukis.jpeg',
    fit: 'contain',
  },
  {
    date: 'Jun 2026',
    emoji: '🎂',
    title: 'Ulang Tahunmu',
    img: '/photos/profile-photos.jpeg',
  },
];
/* ========================================== */

// Selaras dengan border-left accent .moment:nth-child(5n+..) di App.css
const ACCENTS = ['--blurple', '--green', '--yellow', '--fuchsia', '--coral'];

export default function MomentsTimeline() {
  const [imgErrors, setImgErrors] = useState<Set<number>>(new Set());

  const handleImgError = useCallback((index: number) => {
    setImgErrors((prev) => new Set(prev).add(index));
  }, []);

  return (
    <section className="scene scene--timeline">
      <div className="scene__inner">
        <ScrollReveal>
          <p className="scene__eyebrow"># momen-tersemat</p>
          <h2 className="scene__title">Momen yang tersemat.</h2>
          <p className="scene__lead">Beberapa highlight dari perjalanan kita.</p>
        </ScrollReveal>

        <div className="moments">
          {EVENTS.map((ev, i) => {
            const accent = `var(${ACCENTS[i % ACCENTS.length]})`;
            return (
              <ScrollReveal key={i} delay={i * 80} direction={i % 2 === 0 ? 'left' : 'right'}>
                <article className="moment" style={{ '--accent': accent } as CSSProperties}>
                  <div className="moment__body">
                    <span className="moment__emoji" aria-hidden="true">{ev.emoji}</span>
                    <div className="moment__text">
                      <span className="moment__date">{ev.date}</span>
                      <h3 className="moment__title">{ev.title}</h3>
                    </div>
                  </div>
                  <div className="moment__media">
                    {!imgErrors.has(i) && ev.img && (
                      <img
                        src={ev.img}
                        alt={ev.title}
                        loading="lazy"
                        className="moment__img"
                        style={{ objectFit: ev.fit ?? 'cover' }}
                        onError={() => handleImgError(i)}
                      />
                    )}
                    {(imgErrors.has(i) || !ev.img) && (
                      <span className="moment__placeholder" aria-hidden="true">
                        <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <rect x="3" y="3" width="18" height="18" rx="3" />
                          <circle cx="8.5" cy="8.5" r="1.5" />
                          <path d="M21 15l-5-5L5 21" />
                        </svg>
                      </span>
                    )}
                  </div>
                </article>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
