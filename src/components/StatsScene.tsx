import ScrollReveal from './ScrollReveal';
import CountUp from './CountUp';
import Parallax from './Parallax';

/*
 * ==========================================
 *   GANTI STATISTIK & FAKTA DI BAWAH INI!
 *   Bikin se-personal mungkin biar lucu :)
 * ==========================================
 */
const NEW_AGE = '25'; // umur baru Mita
const BIG_STAT = { value: '∞', label: 'Kali bikin aku senyum tahun ini' };

const STATS = [
  { emoji: '🏆', value: '#1', label: 'Orang favoritku' },
  { emoji: '😡', value: '#2', label: 'Orang paling sering ngambek' },
  { emoji: '🍜', value: '#3', label: 'Makanan favoritenya sushi' },
  { emoji: '😴', value: '#4', label: 'Hobinya tidur' },
];

const FACTS = [
  'Senyummu masih jadi notifikasi favoritku.',
  'Kamu naik level ke umur ' + NEW_AGE + ' hari ini.',
  'Status: selalu online di hatiku.',
];
/* ========================================== */

export default function StatsScene() {
  return (
    <section className="scene scene--stats">
      <div className="scene__inner">
        <ScrollReveal>
          <p className="scene__eyebrow">Rekap Singkat</p>
          <h2 className="scene__title">Sedikit fakta soal kamu.</h2>
        </ScrollReveal>

        <ScrollReveal delay={120}>
          <div className="stats__hero">
            <Parallax speed={0.08}>
              <span className="stats__hero-value">{BIG_STAT.value}</span>
            </Parallax>
            <span className="stats__hero-label">{BIG_STAT.label}</span>
            <span className="stats__levelup">
              LEVEL UP → <CountUp end={Number(NEW_AGE)} />
            </span>
          </div>
        </ScrollReveal>

        <div className="stats__grid">
          {STATS.map((s, i) => (
            <ScrollReveal key={s.label} delay={i * 90}>
              <div className="stats__card">
                <span className="stats__emoji" aria-hidden="true">{s.emoji}</span>
                <span className="stats__value">{s.value}</span>
                <span className="stats__label">{s.label}</span>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="stats__facts">
          {FACTS.map((f, i) => (
            <ScrollReveal key={i} delay={i * 80}>
              <p className="stats__fact">
                <span className="stats__fact-tick">✓</span>
                {f}
              </p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
