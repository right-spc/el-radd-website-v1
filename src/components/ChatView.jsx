export function TypingDots() {
  return (
    <div className="flex justify-start">
      <div className="flex items-center gap-1.5 rounded-2xl rounded-es-sm bg-primary-soft px-4 py-3">
        <span className="typing-dot h-2 w-2 rounded-full bg-primary/70" />
        <span className="typing-dot h-2 w-2 rounded-full bg-primary/70" />
        <span className="typing-dot h-2 w-2 rounded-full bg-primary/70" />
      </div>
    </div>
  )
}

export function Bubble({ from, text, time }) {
  const isBot = from === 'bot'
  return (
    <div className={`msg-in flex ${isBot ? 'justify-start' : 'justify-end'}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-[15px] leading-relaxed shadow-sm ${
          isBot
            ? 'rounded-es-sm bg-primary text-white'
            : 'rounded-ee-sm border border-ink/10 bg-white text-ink'
        }`}
      >
        <p>{text}</p>
        {time && (
          <span className={`mt-1 block text-end text-[11px] ${isBot ? 'text-white/70' : 'text-ink/45'}`}>
            {time}
          </span>
        )}
      </div>
    </div>
  )
}

export function StatusLine({ text }) {
  return (
    <div className="msg-in flex justify-center py-1">
      <span className="rounded-full bg-ink/5 px-3 py-1 text-xs font-bold text-ink/50">{text}</span>
    </div>
  )
}

export function ChatMessages({ items, shown, typing, className = '' }) {
  return (
    <div className={`flex flex-col justify-end gap-2.5 overflow-hidden ${className}`}>
      {items.slice(0, shown).map((item, i) =>
        item.status ? (
          <StatusLine key={i} text={item.status} />
        ) : (
          <Bubble key={i} from={item.from} text={item.text} time={item.time} />
        ),
      )}
      {typing && <TypingDots />}
    </div>
  )
}
