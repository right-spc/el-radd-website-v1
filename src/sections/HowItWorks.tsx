import { useTranslation } from 'react-i18next';

interface Step {
  title: string;
  desc: string;
}

export default function HowItWorks() {
  const { t } = useTranslation();
  const steps = t('how.steps', { returnObjects: true }) as Step[];

  return (
    <section className="section section--light" id="service">
      <div className="container">
        <h2 className="section-title">{t('how.title')}</h2>
        <div className="steps">
          {steps.map((step, index) => (
            <div className="step-card" key={step.title}>
              <div className="step-num">{index + 1}</div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-desc">{step.desc}</p>
            </div>
          ))}
        </div>
        <p className="section-note">{t('how.note')}</p>
      </div>
    </section>
  );
}
