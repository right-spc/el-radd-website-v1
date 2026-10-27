import { useLang } from '../../i18n/LangContext.jsx'
import { useReducedMotion } from '../../hooks/useReducedMotion.js'
import Section from './Section.jsx'
import Reveal from '../Reveal.jsx'
import { askElradd, openElradd } from '../../chat.js'
import { IconChatBubble, IconAudioLines, IconWhatsApp, IconBolt, IconCheck, IconHandoff, IconReceipt } from '../Icons.jsx'

const pillIcons = {
  chat: IconChatBubble,
  tone: IconAudioLines,
  whatsapp: IconWhatsApp,
  bolt: IconBolt,
  check: IconCheck,
  handoff: IconHandoff,
  receipt: IconReceipt,
}

export default function Ask() {
  const { t } = useLang()
  const reduced = useReducedMotion()

  return (
    <Section id="ask" className="bg-primary-soft/40">
      <Reveal className="mx-auto max-w-xl text-center">
        <h2 className="text-3xl font-extrabold leading-snug text-primary md:text-4xl">{t.ask.header}</h2>
        <p className="mt-3 text-lg leading-relaxed text-ink/75">{t.ask.sub}</p>
      </Reveal>

      <Reveal className="mt-6 flex justify-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white px-4 py-2 text-[13px] font-extrabold text-ink/60 shadow-sm">
          <span className="relative flex h-2.5 w-2.5">
            {!reduced && (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-wa opacity-75" />
            )}
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-wa" />
          </span>
          {t.ask.live}
        </span>
      </Reveal>

      <Reveal className="mt-7 flex flex-wrap justify-center gap-2.5">
        {t.ask.pills.map((pill) => {
          const Icon = pillIcons[pill.icon]
          return (
            <button
              key={pill.text}
              type="button"
              onClick={() => askElradd(pill.text)}
              className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-primary/20 bg-white px-[18px] py-[11px] text-[15px] font-bold text-primary shadow-sm transition hover:border-primary/45 hover:bg-primary-soft active:scale-[0.97]"
            >
              {Icon && <Icon className="h-4 w-4 text-primary-2" />}
              {pill.text}
            </button>
          )
        })}
      </Reveal>

      <p className="mt-6 text-center text-sm font-bold text-ink/55">{t.ask.free}</p>

      <Reveal className="mx-auto mt-10 max-w-5xl rounded-[24px] bg-gradient-to-l from-primary to-primary-2 px-6 py-12 text-center text-white shadow-soft md:py-14">
        <h3 className="text-3xl font-extrabold md:text-4xl">{t.ask.close}</h3>
        <button
          type="button"
          onClick={openElradd}
          className="mt-7 inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-full bg-white px-7 text-lg font-bold text-primary shadow-sm transition hover:bg-highlight active:scale-[0.98]"
        >
          <IconChatBubble className="h-5 w-5" />
          {t.ask.cta}
        </button>
      </Reveal>
    </Section>
  )
}
