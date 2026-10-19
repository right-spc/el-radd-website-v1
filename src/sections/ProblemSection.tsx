import { useEffect, useRef, useState } from 'react';
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

  // Mobile: the alternative cards are a swipe carousel; track the active one for the dots.
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const max = track.scrollWidth - track.clientWidth;
      if (max <= 0) return;
      // In RTL, scrollLeft runs 0..-max; distance from the start is what matters.
      setActiveCard(Math.round(Math.abs(track.scrollLeft) / max));
    };
    track.addEventListener('scroll', onScroll, { passive: true });
    return () => track.removeEventListener('scroll', onScroll);
  }, []);

  const goToCard = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth;
    if (max <= 0) return;
    const rtl = getComputedStyle(track).direction === 'rtl';
    track.scrollTo({
      left: (index / (villains.length - 1)) * max * (rtl ? -1 : 1),
      behavior: 'smooth',
    });
  };

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
          {villains.map((villain) => (
            <div className="problem-villain" key={villain.title}>
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
        <div className="problem-villain-dots">
          {villains.map((villain, index) => (
            <button
              type="button"
              key={villain.title}
              aria-label={villain.title}
              aria-current={index === activeCard}
              className={index === activeCard ? 'active' : undefined}
              onClick={() => goToCard(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
