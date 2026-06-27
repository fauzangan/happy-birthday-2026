import { useRef, useState, useEffect } from 'react';

/*
 * ==========================================
 *   TARUH FILE MUSIK DI:
 *   public/music/background.mp3
 *
 *   Ganti judul & path di bawah ini
 * ==========================================
 */
const MUSIC_SRC = '/music/background.mp3';
const TRACK_TITLE = 'Discord Checkpoint';
/* ========================================== */

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [pulse, setPulse] = useState(true);

  /* Initial attention pulse — stop after first interaction */
  useEffect(() => {
    const t = setTimeout(() => setPulse(false), 6000);
    return () => clearTimeout(t);
  }, []);

  /* Autoplay on open (loop). Browsers block autoplay-with-sound until the
     user interacts, so if the initial play() is rejected we retry on the
     first interaction (click / keydown / scroll / touch). */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    let started = false;

    const start = () => {
      if (started || !audio) return;
      audio
        .play()
        .then(() => {
          started = true;
          setPlaying(true);
          setPulse(false);
          removeListeners();
        })
        .catch(() => {
          /* still blocked — wait for a real interaction */
        });
    };

    const events: Array<keyof DocumentEventMap> = [
      'pointerdown',
      'keydown',
      'scroll',
      'touchstart',
    ];

    function removeListeners() {
      events.forEach((e) => window.removeEventListener(e, start));
    }

    /* Try immediately on load */
    start();
    /* And arm listeners in case it was blocked */
    events.forEach((e) =>
      window.addEventListener(e, start, { passive: true })
    );

    return removeListeners;
  }, []);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    setPulse(false);
    if (playing) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
    setPlaying(!playing);
  }

  return (
    <div className={`music ${pulse ? 'music--pulse' : ''} ${playing ? 'music--playing' : ''}`}>
      <audio ref={audioRef} src={MUSIC_SRC} loop preload="auto" />
      <button
        className="music__pill"
        onClick={toggle}
        aria-label={playing ? 'Pause musik' : 'Putar musik'}
        title={playing ? 'Pause' : 'Putar Musik'}
      >
        <span className={`music__bars ${playing ? 'music__bars--on' : ''}`} aria-hidden="true">
          <span /><span /><span /><span />
        </span>
        <span className="music__meta">
          <span className="music__label">{playing ? 'Sedang diputar' : 'Putar lagu'}</span>
          <span className="music__title">{TRACK_TITLE}</span>
        </span>
        <span className="music__icon" aria-hidden="true">
          {playing ? (
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <rect x="6" y="4" width="4" height="16" rx="1.5" />
              <rect x="14" y="4" width="4" height="16" rx="1.5" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </span>
      </button>
    </div>
  );
}
