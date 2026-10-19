import { useTranslation } from 'react-i18next';

interface InboxMsg {
  channel: string;
  time: string;
  text: string;
  status: string;
  variant?: 'wa' | 'ms';
}

interface Villain {
  title: string;
  desc: string;
}

export default function ProblemSection() {
  const { t } = useTranslation();
  const msgs = t('problem.msgs', { returnObjects: true }) as InboxMsg[];
  const villains = t('problem.villains', { returnObjects: true }) as Villain[];

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

        <div className="problem-villains">
          {villains.map((villain) => (
            <div className="problem-villain" key={villain.title}>
              <h3>{villain.title}</h3>
              <p>{villain.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
