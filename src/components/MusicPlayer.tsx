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

  /* Autoplay on open (loop). Browsers block autoplay-WITH-SOUND until the
     user interacts, but MUTED autoplay is always allowed. So we start the
     track muted right away (it is really playing), then unmute it on the
     very first user interaction — click / keydown / scroll / touch / move.
     If even the muted play() is rejected, we still retry on interaction. */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    /* Kick off muted playback immediately so the track is running on open */
    audio.muted = true;
    audio
      .play()
      .then(() => setPlaying(true))
      .catch(() => {
        /* even muted was blocked — will start on first interaction below */
      });

    let unmuted = false;

    const unmute = () => {
      if (unmuted || !audio) return;
      unmuted = true;
      audio.muted = false;
      audio
        .play()
        .then(() => {
          setPlaying(true);
          setPulse(false);
        })
        .catch(() => {});
      removeListeners();
    };

    const events: Array<keyof DocumentEventMap> = [
      'pointerdown',
      'keydown',
      'scroll',
      'touchstart',
      'mousemove',
    ];

    function removeListeners() {
      events.forEach((e) => window.removeEventListener(e, unmute));
    }

    events.forEach((e) =>
      window.addEventListener(e, unmute, { passive: true })
    );

    return removeListeners;
  }, []);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    setPulse(false);
    audio.muted = false;
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
