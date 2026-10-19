import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import type { ReactNode } from 'react';

interface InboxMsg {
  channel: string;
  time: string;
  text: string;
  status: string;
  variant?: 'wa' | 'ms';
}

interface Villain {
  title: string;
  icon: 'clock' | 'card';
  points: string[];
}

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

const ICONS: Record<Villain['icon'], ReactNode> = {
  clock: (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  card: (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  ),
};

export default function ProblemSection() {
  const { t } = useTranslation();
  const msgs = t('problem.msgs', { returnObjects: true }) as InboxMsg[];
  const villains = t('problem.villains', { returnObjects: true }) as Villain[];

  // Mobile: infinite swipe — the list is doubled and, once a swipe settles,
  // the scroll position silently teleports back by one copy width (identical
  // content), so it never hits an end in either direction.
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const copy = () => track.scrollWidth / 2;
    const isRTL = () => getComputedStyle(track).direction === 'rtl';
    // Start in the middle copy so swiping wraps both ways from the start.
    const recenter = () => {
      track.scrollLeft = (isRTL() ? -1 : 1) * copy();
    };
    recenter();
    let settleTimer: number | undefined;
    const onScroll = () => {
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(() => {
        const c = copy();
        if (c <= 0) return;
        let p = Math.abs(track.scrollLeft);
        const sign = track.scrollLeft < 0 ? -1 : 1;
        if (p < c) p += c;
        else if (p >= c * 2) p -= c;
        else return;
        track.scrollLeft = p * sign;
      }, 120);
    };
    track.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', recenter);
    return () => {
      window.clearTimeout(settleTimer);
      track.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', recenter);
    };
  }, []);

  // Locale strings carry *markers* around the emphasized phrase.
  const title = t('problem.title') as string;
  const [titlePre, titleAccent, titlePost] = title.split('*');
  const body = t('problem.body') as string;
  const [bodyPre, bodyStrong, bodyPost] = body.split('*');

  return (
    <section className="section section--light" id="problem">
      <div className="container">
        <div className="problem-grid">
          <div>
            <span className="problem-eyebrow">{t('problem.eyebrow')}</span>
            <h2 className="problem-title">
              {titlePre}
              <span className="accent">{titleAccent}</span>
              {titlePost}
            </h2>
            <p className="problem-lead">{t('problem.lead')}</p>
            <p className="problem-body">
              {bodyPre}
              <strong>{bodyStrong}</strong>
              {bodyPost}
            </p>
          </div>
          <div>
            <div className="problem-inbox">
              <div className="problem-inbox-head">
                <span className="problem-clock">{t('problem.clock')}</span>
                <span className="problem-night-label">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                  </svg>
                  {t('problem.night_label')}
                </span>
              </div>
              {msgs.map((msg) => (
                <div className="problem-msg" key={msg.channel}>
                  <div className="problem-msg-top">
                    <span
                      className={`problem-ch${msg.variant ? ` problem-ch--${msg.variant}` : ''}`}
                    >
                      {msg.channel}
                    </span>
                    <span className="problem-time">{msg.time}</span>
                  </div>
                  <p className="problem-msg-text">{msg.text}</p>
                  <span
                    className={`problem-status${msg.variant === 'ms' ? ' problem-status--seen' : ''}`}
                  >
                    {msg.status}
                  </span>
                </div>
              ))}
            </div>
            <p className="problem-punch">{t('problem.punch')}</p>
          </div>
        </div>

        <h3 className="problem-alt-title">{t('problem.alternatives_title')}</h3>
        <div className="problem-villains" ref={trackRef}>
          <div className="problem-villains-track">
            {[...villains, ...villains].map((villain, index) => (
              <div
                className="problem-villain"
                key={`${villain.title}-${index}`}
                aria-hidden={index >= villains.length || undefined}
              >
                <span className="problem-villain-icon" aria-hidden="true">
                  {ICONS[villain.icon]}
                </span>
                <h3>{villain.title}</h3>
                <ul className="problem-villain-list">
                  {villain.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
