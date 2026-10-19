import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { ReactNode } from 'react';

interface Step {
  when: string;
  chip: string;
  chipType: 'you' | 'us';
  icon: 'call' | 'bolt' | 'trend';
  title: string;
  desc: string;
}

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

const ICONS: Record<Step['icon'], ReactNode> = {
  call: (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  bolt: (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
      <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  ),
  trend: (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  ),
};

export default function HowItWorks() {
  const { t } = useTranslation();
  const steps = t('how.steps', { returnObjects: true }) as Step[];
  const trackRef = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setAnimate(true);
      return;
    }
    // Scroll events and IntersectionObserver don't fire reliably in some
    // embedded panes (their rendering pipeline freezes when idle), so the
    // trigger is a light timer poll — timers always run.
    const check = () => {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.8) {
        setAnimate(true);
        window.clearInterval(poll);
        window.removeEventListener('scroll', onScroll);
      }
    };
    const onScroll = () => check();
    const poll = window.setInterval(check, 250);
    window.addEventListener('scroll', onScroll, { passive: true });
    check();
    return () => {
      window.clearInterval(poll);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  // Locale strings carry *markers* around the emphasized phrase.
  const title = t('how.title') as string;
  const [titlePre, titleAccent, titlePost] = title.split('*');
  const lead = t('how.lead') as string;
  const [leadPre, leadStrong, leadPost] = lead.split('*');
  const panel = t('how.panel') as string;
  const [panelPre, panelStrong, panelPost] = panel.split('*');

  return (
    <section className="section section--light" id="service">
      <div className="container">
        <div className="process-head">
          <span className="process-eyebrow">{t('how.eyebrow')}</span>
          <h2 className="process-title">
            {titlePre}
            <span className="accent">{titleAccent}</span>
            {titlePost}
          </h2>
          <p className="process-lead">
            {leadPre}
            <strong>{leadStrong}</strong>
            {leadPost}
          </p>
        </div>

        <div className={`process-timeline${animate ? ' animate' : ''}`} ref={trackRef}>
          {steps.map((step) => (
            <div className="process-node" key={step.title}>
              <div className="process-badge" aria-hidden="true">
                {ICONS[step.icon]}
              </div>
              <div className="process-when">{step.when}</div>
              <span
                className={`process-chip process-chip--${step.chipType}`}
              >
                {step.chip}
              </span>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>

        <div className={`process-strip${animate ? ' animate' : ''}`}>
          <span className="process-strip-icon" aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Z" />
              <path d="M21 11h-3a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-5Z" />
              <path d="M21 11a9 9 0 0 0-18 0" />
              <path d="M21 16v2a4 4 0 0 1-4 4h-5" />
            </svg>
          </span>
          <p>
            {panelPre}
            <strong>{panelStrong}</strong>
            {panelPost}
          </p>
        </div>
      </div>
    </section>
  );
}
