import { useTranslation } from 'react-i18next';
import visaUrl from '../assets/payments/visa.svg';
import mastercardUrl from '../assets/payments/mastercard.svg';
import meezaUrl from '../assets/payments/meeza.svg';
import paymobUrl from '../assets/payments/paymob.png';
import instapayUrl from '../assets/payments/instapay.png';

interface Plan {
  flag: string;
  name: string;
  sub: string;
  amount: string;
  old?: string;
  per: string;
  promiseLabel: string;
  promiseSub: string;
  features: string[];
  cta: string;
  ctaHref: string;
  ctaGhost?: boolean;
  soon?: boolean;
  hot?: boolean;
  note?: string;
}

export default function PricingSection() {
  const { t } = useTranslation();
  const plans = t('pricing.plans', { returnObjects: true }) as Plan[];
  const title = t('pricing.title') as string;
  const [titlePre, titleAccent, titlePost] = title.split('*');

  const payMethods = [
    { src: instapayUrl, alt: 'انستا باي', tile: true },
    { src: paymobUrl, alt: 'بايموب' },
    { src: meezaUrl, alt: 'ميزة' },
    { src: visaUrl, alt: 'فيزا' },
    { src: mastercardUrl, alt: 'ماستركارد' },
  ];

  return (
    <section className="section section--dark" id="pricing">
      <div className="container">
        <div className="pricing-head">
          <span className="pricing-eyebrow">{t('pricing.eyebrow')}</span>
          <h2 className="pricing-title">
            {titlePre}
            <span className="accent">{titleAccent}</span>
            {titlePost}
          </h2>
          <p className="pricing-lead">{t('pricing.lead')}</p>
        </div>

        <div className="pricing-cards">
          {plans.map((plan) => (
            <div
              className={`pricing-card${plan.hot ? ' pricing-card--hot' : ''}${plan.soon ? ' pricing-card--soon' : ''}`}
              key={plan.name}
            >
              <span className={`pricing-flag${plan.soon ? ' pricing-flag--soon' : ''}`}>
                {plan.flag}
              </span>
              <div className="pricing-plan">{plan.name}</div>
              <div className="pricing-plan-sub">{plan.sub}</div>
              <div className="pricing-price">
                <span className="pricing-amount">{plan.amount}</span>
                {plan.old && <span className="pricing-amount-old">{plan.old}</span>}
                <span className="pricing-per">{plan.per}</span>
              </div>
              <div className="pricing-promise">
                <div className="pricing-promise-label">{plan.promiseLabel}</div>
                <div className="pricing-promise-sub">{plan.promiseSub}</div>
              </div>
              <ul className="pricing-features">
                {plan.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <a className={`pricing-cta${plan.ctaGhost ? ' pricing-cta--ghost' : ''}`} href={plan.ctaHref}>
                {plan.cta}
              </a>
              {plan.note && <p className="pricing-note-later">{plan.note}</p>}
            </div>
          ))}
        </div>

        <div className="pricing-payments">
          <p className="pricing-pay-label">{t('pricing.payLabel')}</p>
          <div className="pricing-pay-cards">
            {payMethods.map((method) => (
              <span
                className={`pricing-pay-card${method.tile ? ' pricing-pay-card--tile' : ''}`}
                key={method.alt}
                title={method.alt}
              >
                <img src={method.src} alt={method.alt} loading="lazy" />
              </span>
            ))}
            <span className="pricing-pay-card pricing-wallets-card" title="المحافظ الإلكترونية">
              <svg
                className="pricing-wallet-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
                <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
                <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
