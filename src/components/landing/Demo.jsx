import { useState } from 'react'
import { useLang } from '../../i18n/LangContext.jsx'
import Section from './Section.jsx'
import Reveal from '../Reveal.jsx'
import { Bubble } from '../ChatView.jsx'
import mark from '../../assets/logo/mark.svg'

export default function Demo() {
  const { t } = useLang()
  const [active, setActive] = useState(0)
  const persona = t.demo.personas[active]

  return (
    <Section id="demo">
      <Reveal className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-extrabold text-primary md:text-4xl">{t.demo.header}</h2>
        <p className="mt-4 text-lg leading-relaxed text-ink/80 md:text-xl">{t.demo.sub}</p>
      </Reveal>

      <Reveal className="mt-8 flex flex-wrap justify-center gap-2.5">
        {t.demo.personas.map((p, i) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setActive(i)}
            aria-pressed={i === active}
            className={`min-h-[44px] rounded-full border-2 px-5 font-bold transition active:scale-[0.97] ${
              i === active
                ? 'border-primary bg-primary text-white shadow-sm'
                : 'border-ink/15 bg-white text-ink/70 hover:border-primary/40 hover:text-primary'
            }`}
          >
            {p.label}
          </button>
        ))}
      </Reveal>

      <Reveal className="mt-8 flex justify-center">
        <div className="w-full max-w-xl rounded-card border border-ink/10 bg-white shadow-soft">
          <div className="flex items-center justify-between border-b border-ink/10 px-5 py-3.5">
            <span className="inline-flex items-center gap-2">
              <img src={mark} alt="" className="h-5 w-auto" width="18" height="21" />
              <span className="text-sm font-extrabold text-primary">{persona.label}</span>
            </span>
          </div>
          <div key={persona.id} className="card-in flex flex-col gap-2.5 p-4 md:p-5">
            {persona.messages.map((m, i) => (
              <Bubble key={i} from={m.from} text={m.text} />
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
