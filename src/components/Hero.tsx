import { useTranslation } from 'react-i18next';
import ChatContent from './ChatContent';

export default function Hero() {
  const { t, i18n } = useTranslation();
  const separator = i18n.language === 'ar' ? '، ' : ', ';
  const accentWord = i18n.language === 'ar' ? 'الرد' : 'El Radd';
  const h1 = t('hero.h1') as string;
  const h1Parts = h1.split(accentWord);

  return (
    <section className="hero" id="hero">
      <div className="hero-glow hero-glow--top" aria-hidden="true" />
      <div className="hero-glow hero-glow--side" aria-hidden="true" />
      <div className="container hero-grid">
        <div className="hero-content">
          <span className="badge">{t('hero.badge')}</span>
          <h1>
            {h1Parts.length > 1 ? (
              <>
                {h1Parts[0]}
                <span className="h1-accent">{accentWord}</span>
                {h1Parts[1]}
              </>
            ) : (
              h1
            )}
          </h1>
          <p className="hero-sub hero-sub--full">{t('hero.sub')}</p>
          <p className="hero-sub hero-sub--short">{t('hero.sub_short')}</p>
          <div className="hero-ctas">
            <a className="btn-gold" href="#demo">
              {t('hero.cta_primary')}
            </a>
            <a className="btn-outline" href="#service">
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
        </div>
        <div className="hero-visual">
          <div className="chat-scene">
            <div className="site-card" aria-hidden="true">
              <div className="site-card-bar">
                <span />
                <span />
                <span />
              </div>
              <div className="site-card-line" />
              <div className="site-card-line site-card-line--short" />
              <div className="site-card-block" />
            </div>
            <div className="chat-card chat-card--hero chat-card--hero-full">
              <ChatContent />
            </div>
            <div className="chat-card chat-card--hero chat-card--hero-compact">
              <ChatContent compact />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
