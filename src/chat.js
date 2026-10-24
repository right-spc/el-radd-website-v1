// Bridge to the Horus Desk widget embedded in index.html.
// Falls back to scrolling to the demo section when the widget
// script hasn't loaded (e.g. blocked) so CTAs never dead-end.
function widget() {
  return typeof window !== 'undefined' ? window.horusDesk : undefined
}

export function openElradd() {
  const hd = widget()
  if (hd && typeof hd.open === 'function') {
    hd.open()
    return
  }
  document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function askElradd(question) {
  const hd = widget()
  if (hd && typeof hd.ask === 'function') return hd.ask(question)
  if (hd && typeof hd.open === 'function') {
    hd.open()
    return true
  }
  document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  return false
}
