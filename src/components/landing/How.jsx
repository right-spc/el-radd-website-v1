import { useState } from 'react'
import { useLang } from '../../i18n/LangContext.jsx'
import Section from './Section.jsx'
import Reveal from '../Reveal.jsx'
import { IconArrow, IconBolt, IconCamera, IconChatBubble, IconGlobe, IconHandoff, IconMail, IconReceipt, IconWhatsApp } from '../Icons.jsx'

const channelIcons = {
  whatsapp: IconWhatsApp,
  messenger: IconBolt,
  instagram: IconCamera,
  email: IconMail,
  webchat: IconGlobe,
}

function ChannelsStrip() {
  const { t } = useLang()
  const channels = t.how.channels
  const [activeId, setActiveId] = useState('webchat')
  const active = channels.find((c) => c.id === activeId) || channels[channels.length - 1]
  const ActiveIcon = channelIcons[active.id] || IconChatBubble

  return (
    <div className="mt-10">
      <p className="text-center text-lg font-extrabold text-ink">{t.how.channelsLabel}</p>
      <div className="mt-4 flex flex-wrap justify-center gap-2.5" role="group" aria-label={t.how.channelsLabel}>
        {channels.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setActiveId(c.id)}
            aria-pressed={c.id === activeId}
            className={`min-h-[44px] rounded-full border-2 px-5 font-bold transition active:scale-[0.97] ${
              c.id === activeId
                ? 'border-primary bg-primary text-white shadow-sm'
                : 'border-ink/15 bg-white text-ink/70 hover:border-primary/40 hover:text-primary'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>
      <div
        key={active.id}
        className="card-in mx-auto mt-6 flex max-w-xl flex-col items-center gap-3 rounded-card border border-ink/10 bg-white p-6 text-center shadow-soft"
      >
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary-soft text-primary">
          <ActiveIcon className="h-6 w-6" />
        </span>
        <p className="text-lg font-bold text-ink">{active.line}</p>
        <span
          className={`rounded-full px-4 py-1.5 text-sm font-extrabold ${
            active.id === 'webchat' ? 'bg-primary text-white' : 'bg-highlight/60 text-ink'
          }`}
        >
          {active.credits}
        </span>
      </div>
    </div>
  )
}

export default function How() {
  const { t, lang } = useLang()
  const nf = new Intl.NumberFormat(lang === 'ar' ? 'ar-EG' : 'en-US', { useGrouping: false })

  return (
    <Section id="how" className="bg-white/60">
      <Reveal className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-extrabold text-primary md:text-4xl">{t.how.header}</h2>
      </Reveal>

      <div className="mt-10 grid items-stretch gap-4 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
        {t.how.steps.map((step, i) => (
          <div key={i} className="contents">
            <Reveal className="flex flex-col items-center gap-3 rounded-card border border-ink/10 bg-white p-6 text-center shadow-soft">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary text-lg font-extrabold text-white">
                {nf.format(i + 1)}
              </span>
              <h3 className="text-lg font-extrabold leading-snug text-ink">{step.title}</h3>
              {step.body && <p className="text-[15px] leading-relaxed text-ink/65">{step.body}</p>}
            </Reveal>
            {i < t.how.steps.length - 1 && (
              <div className="hidden items-center justify-center text-primary/40 md:flex" aria-hidden="true">
                <IconArrow className="h-7 w-7" />
              </div>
            )}
          </div>
        ))}
      </div>

      <Reveal className="mt-6 flex justify-center">
        <p className="inline-flex items-center gap-2.5 rounded-card border border-ink/10 bg-white px-5 py-3.5 text-[15px] font-bold text-ink/80 shadow-soft">
          <IconHandoff className="h-6 w-6 text-primary" />
          {t.how.handoff}
        </p>
      </Reveal>

      <Reveal>
        <ChannelsStrip />
      </Reveal>

      <Reveal className="mt-8 flex justify-center">
        <p className="inline-flex items-center gap-2.5 text-lg font-extrabold text-primary">
          <IconReceipt className="h-6 w-6" />
          {t.how.oneBill}
        </p>
      </Reveal>
    </Section>
  )
}
