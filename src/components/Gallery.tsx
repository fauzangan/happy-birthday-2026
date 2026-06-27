import { useState, useCallback } from 'react';
import ScrollReveal from './ScrollReveal';

/*
 * ==========================================
 *   GANTI FOTO-FOTO DI BAWAH INI!
 *   Taruh file foto di folder public/photos/
 *   lalu ganti path 'src' di bawah.
 * ==========================================
 */
const PHOTOS = [
  { src: '/photos/gallery/gallery-1.jpeg', caption: 'Momen favoritku' },
  { src: '/photos/gallery/gallery-2.jpeg', caption: 'Senyum terbaikmu' },
  { src: '/photos/gallery/gallery-3.jpeg', caption: 'Lagi seru-serunya' },
  { src: '/photos/gallery/gallery-4.jpeg', caption: 'Petualangan kita' },
  { src: '/photos/gallery/gallery-5.jpeg', caption: 'Random tapi berkesan' },
  { src: '/photos/gallery/gallery-6.jpeg', caption: 'Selalu kangen ini' },
  { src: '/photos/gallery/gallery-7.jpeg', caption: 'Hari yang seru' },
  { src: '/photos/gallery/gallery-8.jpeg', caption: 'Selalu bareng kamu' },
  { src: '/photos/gallery/gallery-9.jpeg', caption: 'Nggak ada bosennya' },
  { src: '/photos/gallery/gallery-10.jpeg', caption: 'Sampai nanti ya' },
];
/* ========================================== */

const GRADIENTS = [
  'linear-gradient(135deg, #5865f2, #818cf8)',
  'linear-gradient(135deg, #eb459e, #ff7a66)',
  'linear-gradient(135deg, #57f287, #5865f2)',
  'linear-gradient(135deg, #fee75c, #ff7a66)',
  'linear-gradient(135deg, #818cf8, #eb459e)',
  'linear-gradient(135deg, #ff7a66, #fee75c)',
];

export default function Gallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [imgErrors, setImgErrors] = useState<Set<number>>(new Set());

  const open = useCallback((i: number) => setLightbox(i), []);
  const close = useCallback(() => setLightbox(null), []);
  const prev = useCallback(
    () => setLightbox((c) => (c !== null ? (c - 1 + PHOTOS.length) % PHOTOS.length : null)),
    [],
  );
  const next = useCallback(
    () => setLightbox((c) => (c !== null ? (c + 1) % PHOTOS.length : null)),
    [],
  );

  const handleImgError = useCallback((index: number) => {
    setImgErrors((prev) => new Set(prev).add(index));
  }, []);

  return (
    <section className="scene scene--gallery">
      <div className="scene__inner">
        <ScrollReveal>
          <p className="scene__eyebrow"># galeri-media</p>
          <h2 className="scene__title">Galeri kenangan.</h2>
          <p className="scene__lead">Ketuk salah satu buat lihat lebih besar.</p>
        </ScrollReveal>

        <div className="gallery__grid">
          {PHOTOS.map((photo, i) => (
            <ScrollReveal key={i} delay={i * 70}>
              <button
                type="button"
                className="gallery__item"
                style={{ background: GRADIENTS[i % GRADIENTS.length] }}
                onClick={() => open(i)}
                aria-label={`Buka foto: ${photo.caption}`}
              >
                {!imgErrors.has(i) && (
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    loading="lazy"
                    className="gallery__img"
                    onError={() => handleImgError(i)}
                  />
                )}
                <span className="gallery__overlay">
                  <span className="gallery__caption">{photo.caption}</span>
                </span>
                {imgErrors.has(i) && (
                  <span className="gallery__placeholder">
                    <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="3" y="3" width="18" height="18" rx="3" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <path d="M21 15l-5-5L5 21" />
                    </svg>
                    <span>Foto {i + 1}</span>
                  </span>
                )}
              </button>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {lightbox !== null && (
        <div className="lightbox" onClick={close}>
          <div className="lightbox__inner" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox__close" onClick={close} aria-label="Tutup">
              <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" strokeWidth="2.5" fill="none">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <button className="lightbox__nav lightbox__nav--prev" onClick={prev} aria-label="Sebelumnya">
              <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" strokeWidth="2.5" fill="none">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <div className="lightbox__content">
              {!imgErrors.has(lightbox) ? (
                <img src={PHOTOS[lightbox].src} alt={PHOTOS[lightbox].caption} className="lightbox__img" />
              ) : (
                <div className="lightbox__placeholder" style={{ background: GRADIENTS[lightbox % GRADIENTS.length] }}>
                  <span>Foto {lightbox + 1}</span>
                </div>
              )}
              <p className="lightbox__caption">{PHOTOS[lightbox].caption}</p>
            </div>

            <button className="lightbox__nav lightbox__nav--next" onClick={next} aria-label="Selanjutnya">
              <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" strokeWidth="2.5" fill="none">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
