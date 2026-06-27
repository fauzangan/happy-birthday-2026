import { useEffect, useState } from 'react';
import Parallax from './Parallax';

/*
 * ==========================================
 *   GANTI DATA PROFIL DI BAWAH INI!
 * ==========================================
 */
const FULL_NAME = 'Mita Ayu Lestari';
const USERNAME = 'mita';
const TAG = '2806'; // 28-06, tanggal ultah
const STATUS_TEXT = 'Hari ini ulang tahun! 🎂';
const MEMBER_SINCE = '28 Juni 2001';
const AVATAR_SRC = '/photos/avatar.jpg'; // taruh foto di public/photos/avatar.jpg (opsional)
/* ========================================== */

const INITIALS = FULL_NAME.split(' ')
  .slice(0, 2)
  .map((w) => w[0])
  .join('')
  .toUpperCase();

export default function ProfileHero() {
  const [show, setShow] = useState(false);
  const [avatarOk, setAvatarOk] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="hero">
      <Parallax speed={0.06}>
      <div className={`profile ${show ? 'profile--in' : ''}`}>
        <p className="profile__eyebrow">
          <span className="profile__eyebrow-dot" />
          CHECKPOINT 2026
        </p>

        <div className="profile__card">
          <div className="profile__banner" />

          <div className="profile__avatar-wrap">
            <div className="profile__avatar">
              {avatarOk ? (
                <img
                  src={AVATAR_SRC}
                  alt={FULL_NAME}
                  onError={() => setAvatarOk(false)}
                />
              ) : (
                <span className="profile__avatar-fallback">{INITIALS}</span>
              )}
            </div>
            <span className="profile__presence" aria-hidden="true" />
          </div>

          <div className="profile__body">
            <span className="profile__status-pill">{STATUS_TEXT}</span>

            <h1 className="profile__name">{FULL_NAME}</h1>
            <p className="profile__handle">
              @{USERNAME}
              <span className="profile__tag">#{TAG}</span>
            </p>

            <div className="profile__divider" />

            <p className="profile__section-label">Anggota sejak</p>
            <p className="profile__member">{MEMBER_SINCE}</p>

            <div className="profile__badges" aria-label="Lencana">
              <span className="profile__badge" title="Ulang tahun">🎂</span>
              <span className="profile__badge" title="Spesial">⭐</span>
              <span className="profile__badge" title="Tersayang">💝</span>
            </div>
          </div>
        </div>
      </div>
      </Parallax>

      <div className={`hero__scroll ${show ? 'hero__scroll--visible' : ''}`}>
        <span>Scroll</span>
        <div className="hero__scroll-line" />
      </div>
    </section>
  );
}
