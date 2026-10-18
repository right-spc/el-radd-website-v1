import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function DemoSection() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <section className="section section--light" id="demo">
      <div className="container">
        <div className="demo-head">
          <h2 className="section-title">{t('demo.title')}</h2>
          <p className="section-sub">{t('demo.sub')}</p>
          <p className="section-note">{t('demo.note')}</p>
        </div>
        <div
          className={open ? 'demo-panel demo-panel--open' : 'demo-panel'}
          aria-hidden={!open}
        >
          {t('demo.placeholder')}
        </div>
        <div className="demo-button-wrap">
          <button className="btn-gold" type="button" onClick={() => setOpen(true)}>
            {t('demo.title')}
          </button>
        </div>
      </div>
    </section>
  );
}
