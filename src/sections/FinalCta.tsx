import { useTranslation } from 'react-i18next';

export default function FinalCta() {
  const { t } = useTranslation();

  return (
    <section className="section section--dark-alt final-cta">
      <div className="container">
        <h2 className="section-title">{t('final.title')}</h2>
        <a className="btn-gold" href={t('final.ctaHref')}>
          {t('final.cta')}
        </a>
      </div>
    </section>
  );
}
