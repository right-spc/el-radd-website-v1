import { useTranslation } from 'react-i18next';
import type { ReactNode } from 'react';

interface SolutionMsg {
  channel: string;
  time: string;
  text: string;
  reply: string;
  status: string;
  confirm?: string;
  variant?: 'wa' | 'ms';
}

interface Pillar {
  title: string;
  icon: 'night' | 'chat' | 'money';
  points: string[];
}

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

const ICONS: Record<Pillar['icon'], ReactNode> = {
  night: (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
      <path d="m9.5 11.5 2 2 4-4" />
    </svg>
  ),
  chat: (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  money: (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <circle cx="12" cy="12" r="2.5" />
      <path d="M6 12h.01M18 12h.01" />
    </svg>
  ),
};

export default function SolutionSection() {
  const { t } = useTranslation();
  const msgs = t('solution.msgs', { returnObjects: true }) as SolutionMsg[];
  const pillars = t('solution.pillars', { returnObjects: true }) as Pillar[];

  // Locale strings carry *markers* around the emphasized phrase.
  const title = t('solution.title') as string;
  const [titlePre, titleAccent, titlePost] = title.split('*');
  const body = t('solution.body') as string;
  const [bodyPre, bodyStrong, bodyPost] = body.split('*');

  return (
    <section className="section section--dark" id="solution">
      <div className="container">
        <div className="solution-grid">
          <div>
            <span className="solution-eyebrow">{t('solution.eyebrow')}</span>
            <h2 className="solution-title">
              {titlePre}
              <span className="accent">{titleAccent}</span>
              {titlePost}
            </h2>
            <p className="solution-lead">{t('solution.lead')}</p>
            <p className="solution-body">
              {bodyPre}
              <strong>{bodyStrong}</strong>
              {bodyPost}
            </p>
          </div>
          <div>
            <div className="solution-inbox">
              <div className="solution-inbox-head">
                <span className="solution-clock">{t('solution.clock')}</span>
                <span className="solution-night-label">
                  {t('solution.night_label')}
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
                </span>
              </div>
              {msgs.map((msg) => (
                <div className="solution-msg" key={msg.channel}>
                  <div className="solution-msg-top">
                    <span
                      className={`solution-ch${msg.variant ? ` solution-ch--${msg.variant}` : ''}`}
                    >
                      {msg.channel}
                    </span>
                    <span className="solution-time">{msg.time}</span>
                  </div>
                  <p className="solution-msg-text">{msg.text}</p>
                  <div className="solution-reply">{msg.reply}</div>
                  <div className="solution-msg-foot">
                    {msg.confirm && (
                      <span className="solution-confirm">✓ {msg.confirm}</span>
                    )}
                    <span className="solution-status">✓✓ {msg.status}</span>
                  </div>
                </div>
              ))}
            </div>
            <p className="solution-punch">{t('solution.punch')}</p>
          </div>
        </div>

        <h3 className="solution-pillars-title">{t('solution.pillars_title')}</h3>
        <div className="solution-pillars">
          {pillars.map((pillar) => (
            <div className="solution-pillar" key={pillar.title}>
              <span className="solution-pillar-icon" aria-hidden="true">
                {ICONS[pillar.icon]}
              </span>
              <h3>{pillar.title}</h3>
              <ul className="solution-pillar-list">
                {pillar.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
