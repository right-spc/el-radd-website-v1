// Bridge to the chat widget embedded in index.html.
// The snippet config global is window.chatWidget (orgKey); older builds
// exposed their API on window.horusDesk — whichever exposes open() wins.
// Falls back to scrolling to the demo section when the widget
// script hasn't loaded (e.g. blocked) so CTAs never dead-end.
function widget() {
  if (typeof window === 'undefined') return undefined
  const withApi = [window.horusDesk, window.chatWidget].find(
    (c) => c && typeof c.open === 'function',
  )
  return withApi || window.horusDesk || window.chatWidget
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
