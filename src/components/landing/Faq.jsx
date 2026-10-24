import { useState } from 'react'
import { useLang } from '../../i18n/LangContext.jsx'
import Section from './Section.jsx'
import Reveal from '../Reveal.jsx'
import { IconChevron } from '../Icons.jsx'

export function Accordion({ items, defaultOpen = 0 }) {
  const [openIdx, setOpenIdx] = useState(defaultOpen)

  return (
    <div className="divide-y divide-ink/10 rounded-card border border-ink/10 bg-white px-6 shadow-soft">
      {items.map((item, i) => {
        const open = i === openIdx
        return (
          <div key={i}>
            <button
              type="button"
              onClick={() => setOpenIdx(open ? -1 : i)}
              aria-expanded={open}
              aria-controls={`faq-panel-${i}`}
              className="flex min-h-[44px] w-full items-center justify-between gap-4 py-5 text-start"
            >
              <span className="text-lg font-extrabold text-ink">{item.q}</span>
              <IconChevron
                className={`h-5 w-5 shrink-0 text-primary transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
              />
            </button>
            <div
              id={`faq-panel-${i}`}
              className="grid transition-all duration-300 ease-out"
              style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
            >
              <div className="overflow-hidden">
                <p className="pb-6 leading-relaxed text-ink/75">{item.a}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default function Faq() {
  const { t } = useLang()
  return (
    <Section id="faq">
      <Reveal className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-extrabold text-primary md:text-4xl">{t.faq.header}</h2>
      </Reveal>
      <Reveal className="mx-auto mt-10 max-w-3xl">
        <Accordion items={t.faq.items} />
      </Reveal>
    </Section>
  )
}
