import { useTranslation } from 'react-i18next';

interface AskChip {
  question: string;
}

// The HorusDesk widget queues ask() calls made before init finishes, so we
// can fire immediately without waiting for the widget to be ready.
function askElRadd(question: string) {
  const widget = window.horusDesk;
  if (widget && typeof widget.ask === 'function') {
    widget.ask(question);
    return;
  }
  // Widget script not loaded (blocked or slow): retry shortly.
  window.setTimeout(() => askElRadd(question), 400);
}

export default function DemoSection() {
  const { t } = useTranslation();
  const chips = t('demo.chips', { returnObjects: true }) as AskChip[];

  return (
    <section className="section section--light" id="demo">
      <div className="container">
        <div className="demo-head">
          <span className="demo-eyebrow">{t('demo.eyebrow')}</span>
          <h2 className="demo-title">
            {(() => {
              const title = t('demo.title') as string;
              const [pre, accent, post] = title.split('*');
              return (
                <>
                  {pre}
                  <span className="accent">{accent}</span>
                  {post}
                </>
              );
            })()}
          </h2>
          <p className="demo-lead">{t('demo.lead')}</p>
          <p className="demo-cooking">
            {(() => {
              const cooking = t('demo.cooking') as string;
              const [pre, strong, post] = cooking.split('*');
              return (
                <>
                  {pre}
                  <strong>{strong}</strong>
                  {post}
                </>
              );
            })()}
          </p>
        </div>

        <div className="demo-chips">
          {chips.map((chip) => (
            <button
              className="demo-chip"
              type="button"
              key={chip.question}
              onClick={() => askElRadd(chip.question)}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              {chip.question}
            </button>
          ))}
        </div>
        <p className="demo-caption">{t('demo.caption')}</p>

        <div className="demo-launcher">
          <span className="demo-bubble" aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </span>
          <span className="demo-launcher-label">
            <strong>{t('demo.launcher_title')}</strong>
            {t('demo.launcher_sub')}
          </span>
        </div>
      </div>
    </section>
  );
}
