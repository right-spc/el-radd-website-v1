import { useTranslation } from 'react-i18next';

const WA_URL =
  'https://wa.me/201000000000?text=' +
  encodeURIComponent('أهلاً، عايز أعرف تفاصيل عرض التأسيس');

export default function FinalCta() {
  const { t } = useTranslation();

  return (
    <section className="section section--dark-alt final-cta">
      <div className="container">
        <h2 className="section-title">{t('final.title')}</h2>
        <a className="btn-gold" href={WA_URL} target="_blank" rel="noreferrer">
          {t('final.cta')}
        </a>
      </div>
    </section>
  );
}
