import { useTranslation } from 'react-i18next';

interface ChannelCard {
  name: string;
  desc: string;
  highlight?: boolean;
}

export default function Channels() {
  const { t } = useTranslation();
  const cards = t('channels.cards', { returnObjects: true }) as ChannelCard[];

  return (
    <section className="section section--dark" id="channels">
      <div className="container">
        <h2 className="section-title">{t('channels.title')}</h2>
        <div className="channel-cards">
          {cards.map((card) => (
            <div
              className={
                card.highlight ? 'channel-card channel-card--highlight' : 'channel-card'
              }
              key={card.name}
            >
              {card.highlight && (
                <span className="channel-pill">{t('channels.unlimited')}</span>
              )}
              <h3 className="channel-name">{card.name}</h3>
              <p className="channel-desc">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
