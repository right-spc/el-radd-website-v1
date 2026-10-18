import { useTranslation } from 'react-i18next';
import ChatContent from './ChatContent';

const WA_URL =
  'https://wa.me/201000000000?text=' +
  encodeURIComponent('أهلاً، عايز أعرف تفاصيل عرض التأسيس');

export default function Hero() {
  const { t, i18n } = useTranslation();
  const separator = i18n.language === 'ar' ? '، ' : ', ';

  return (
    <section className="hero" id="hero">
      <div className="container hero-grid">
        <div className="hero-content">
          <span className="badge">{t('hero.badge')}</span>
          <h1>{t('hero.h1')}</h1>
          <p className="hero-sub">{t('hero.sub')}</p>
          <div className="hero-ctas">
            <a className="btn-gold" href={WA_URL} target="_blank" rel="noreferrer">
              {t('hero.cta_primary')}
            </a>
            <a className="btn-outline" href="#demo">
              {t('hero.cta_secondary')}
            </a>
          </div>
          <p className="trust-line">
            {(t('hero.trust') as string)
              .split(separator)
              .map((part: string) => (
                <span key={part}>{part}</span>
              ))}
          </p>
          <div className="chat-card chat-card--mobile">
            <ChatContent />
          </div>
        </div>
        <div className="hero-visual">
          <div className="phone-scene">
            <div className="arch-outline" aria-hidden="true" />
            <div className="phone-mock">
              <div className="phone-screen">
                <ChatContent />
              </div>
            </div>
            <div className="widget-float">
              <div className="widget-card">{t('chat.widget_greeting')}</div>
              <div className="widget-bubble" aria-hidden="true">
                رد
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
