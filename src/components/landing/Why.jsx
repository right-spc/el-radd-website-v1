import { useLang } from '../../i18n/LangContext.jsx'
import { useReducedMotion } from '../../hooks/useReducedMotion.js'
import Section from './Section.jsx'
import Reveal from '../Reveal.jsx'
import {
  IconWhatsApp,
  IconInstagram,
  IconMail,
  IconGlobe,
  IconAudioLines,
  IconHeadset,
  IconHandoff,
} from '../Icons.jsx'
import mark from '../../assets/logo/mark.svg'

function ProofBubble({ from, text, highlight }) {
  const isBot = from === 'bot'
  const parts = highlight && text.includes(highlight) ? text.split(highlight) : null
  return (
    <div className={`msg-in flex ${isBot ? 'justify-start' : 'justify-end'}`}>
      <div
        className={`max-w-[86%] rounded-2xl px-4 py-2.5 text-[15px] font-semibold leading-relaxed shadow-sm ${
          isBot
            ? 'rounded-es-sm bg-primary text-white'
            : 'rounded-ee-sm border border-ink/15 bg-white text-ink'
        }`}
      >
        {parts ? (
          <p>
            {parts[0]}
            <span className="rounded bg-highlight/45 px-0.5">{highlight}</span>
            {parts[1]}
          </p>
        ) : (
          <p>{text}</p>
        )}
      </div>
    </div>
  )
}

export default function Why() {
  const { t } = useLang()
  const reduced = useReducedMotion()

  const glyphs = {
    tone: <IconAudioLines className="h-5 w-5" />,
    channels: (
      <span className="flex items-center gap-[2px]">
        <IconWhatsApp className="h-3 w-3 text-wa" />
        <IconInstagram className="h-3 w-3 text-[#b3328c]" />
        <IconMail className="h-3 w-3 text-ink/45" />
        <IconGlobe className="h-3 w-3 text-primary-2" />
      </span>
    ),
    egp: (
      <span className="text-base font-black tracking-wide">
        ج.م <s className="text-xs font-bold text-ink/35 decoration-2" dir="ltr">$</s>
      </span>
    ),
    support: <IconHeadset className="h-5 w-5" />,
    handoff: <IconHandoff className="h-5 w-5" />,
  }

  return (
    <Section id="demo">
      <Reveal className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-extrabold text-primary md:text-4xl">{t.why.header}</h2>
        <p className="mt-3 text-lg leading-relaxed text-ink/75 md:text-xl">{t.why.sub}</p>
      </Reveal>

      <div className="mt-7 grid items-stretch gap-4 md:grid-cols-[7fr_5fr]">
        <Reveal className="flex flex-col rounded-card border border-ink/10 bg-white p-5 shadow-soft">
          <div className="mb-3.5 flex items-center justify-between border-b border-ink/10 pb-3">
            <span className="inline-flex items-center gap-2.5">
              <img src={mark} alt="" className="h-8 w-auto" width="28" height="32" />
              <strong className="text-[15px] font-extrabold text-primary">{t.brand.wordmark}</strong>
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-ink/50">
              <span className="relative flex h-2 w-2">
                {!reduced && (
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-wa opacity-75" />
                )}
                <span className="relative inline-flex h-2 w-2 rounded-full bg-wa" />
              </span>
              {t.hero.liveNow}
            </span>
          </div>
          <div className="flex flex-1 flex-col justify-center gap-2.5">
            {t.why.chat.map((m, i) => (
              <ProofBubble key={i} from={m.from} text={m.text} highlight={m.highlight} />
            ))}
          </div>
        </Reveal>

        <div className="flex flex-col gap-2.5">
          {t.why.chips.map((chip, i) => (
            <Reveal
              key={i}
              delay={i * 80}
              className="flex flex-1 items-center gap-3.5 rounded-card border border-ink/10 bg-white px-4 py-2.5 shadow-soft"
            >
              <span className="flex h-11 min-w-11 shrink-0 items-center justify-center rounded-xl bg-primary-soft px-2 text-primary">
                {glyphs[chip.icon]}
              </span>
              <div>
                <p className="text-[15px] font-extrabold leading-snug text-ink">{chip.title}</p>
                <p className="mt-0.5 text-xs font-bold leading-snug text-ink/50">{chip.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}
