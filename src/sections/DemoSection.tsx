import { useTranslation } from 'react-i18next';

export default function DemoSection() {
  const { t } = useTranslation();

  return (
    <section className="section section--light" id="demo">
      <div className="container">
        <div className="demo-head">
          <h2 className="section-title">{t('demo.title')}</h2>
          <p className="section-sub">{t('demo.sub')}</p>
          <p className="section-note">{t('demo.hint')}</p>
          <p className="section-note">{t('demo.note')}</p>
        </div>
      </div>
    </section>
  );
}
