import './App.css';
import ScrollProgress from './components/ScrollProgress';
import ConfettiCanvas from './components/ParticleCanvas';
import ProfileHero from './components/Hero';
import CheckpointCounter from './components/LoveCounter';
import StatsScene from './components/StatsScene';
import MomentsTimeline from './components/Timeline';
import Gallery from './components/Gallery';
import ChatLetter from './components/LoveLetter';
import MusicPlayer from './components/MusicPlayer';
import ScrollReveal from './components/ScrollReveal';

/*
 * ==========================================
 *   GANTI NAMA DI BAWAH INI!
 * ==========================================
 */
const NAME = 'Sayang';
/* ========================================== */

export default function App() {
  return (
    <>
      <ScrollProgress />
      <ConfettiCanvas />
      <ProfileHero />
      <CheckpointCounter />
      <StatsScene />
      <MomentsTimeline />
      <Gallery />
      <ChatLetter />

      <footer className="outro">
        <ScrollReveal>
          <span className="outro__check">✓</span>
          <h2 className="outro__title">Checkpoint selesai.</h2>
          <p className="outro__text">
            Selamat ulang tahun, <strong>{NAME}</strong>. Sampai jumpa di rekap tahun depan 🎂
          </p>
          <p className="outro__credit">Dibuat khusus buat kamu</p>
        </ScrollReveal>
      </footer>

      <MusicPlayer />
    </>
  );
}
