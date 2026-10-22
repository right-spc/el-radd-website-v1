import { useTranslation } from 'react-i18next';

// The HorusDesk widget queues ask() calls made before init finishes, so we
// can fire immediately without waiting for the widget to be ready.
function widgetCall(action: 'ask' | 'open', question: string | undefined, attempt = 0): void {
  const widget = window.horusDesk;
  if (widget && typeof widget[action] === 'function') {
    if (action === 'ask') widget.ask(question as string);
    else widget.open();
    return;
  }
  // Widget script not loaded (blocked or slow): retry shortly.
  if (attempt < 25) window.setTimeout(() => widgetCall(action, question, attempt + 1), 400);
}

export default function DemoSection() {
  const { t } = useTranslation();
  const chips = t('demo.chips', { returnObjects: true }) as { question: string }[];

  const title = t('demo.title') as string;
  const [titlePre, titleAccent, titlePost] = title.split('*');
  const cooking = t('demo.cooking') as string;
  const [cookingPre, cookingStrong, cookingPost] = cooking.split('*');

  return (
    <section className="section section--light" id="demo">
      <div className="container">
        <div className="demo-head">
          <span className="demo-eyebrow">{t('demo.eyebrow')}</span>
          <h2 className="demo-title">
            {titlePre}
            <span className="accent">{titleAccent}</span>
            {titlePost}
          </h2>
          <p className="demo-lead">{t('demo.lead')}</p>
          <p className="demo-cooking">
            {cookingPre}
            <strong>{cookingStrong}</strong>
            {cookingPost}
          </p>
        </div>

        <div className="demo-chips">
          {chips.map((chip) => (
            <button
              className="demo-chip"
              type="button"
              key={chip.question}
              onClick={() => widgetCall('ask', chip.question)}
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

        <button
          className="demo-launcher"
          type="button"
          onClick={() => widgetCall('open', undefined)}
        >
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
        </button>

        <div className="demo-close">
          <p className="demo-close-title">{t('demo.close_title')}</p>
          <button
            className="btn-gold"
            type="button"
            onClick={() => widgetCall('open', undefined)}
          >
            {t('demo.close_cta')}
          </button>
        </div>
      </div>
    </section>
  );
}
