import { useTranslation } from 'react-i18next';

export default function QuestionsSection() {
  const { t, i18n } = useTranslation();
  const pills = t('questions.pills', { returnObjects: true }) as string[];
  const arrow = i18n.language === 'ar' ? '←' : '→';

  const handleClick = (question: string) => {
    console.log(question);
    window.trackPillClick(question);
  };

  return (
    <section className="section section--dark" id="questions">
      <div className="container">
        <div className="questions-head">
          <h2 className="section-title">{t('questions.title')}</h2>
          <p className="section-sub">{t('questions.sub')}</p>
        </div>
        <div className="pills">
          {pills.map((pill) => (
            <button
              className="pill-q"
              type="button"
              key={pill}
              onClick={() => handleClick(pill)}
            >
              {pill}
            </button>
          ))}
        </div>
        <p className="questions-footer">
          {t('questions.footer')} {arrow}
        </p>
      </div>
    </section>
  );
}
