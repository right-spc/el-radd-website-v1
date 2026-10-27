// Delta (px) needed to center card in the carousel viewport.
export function carouselCenterDelta(el, card) {
  return (
    card.getBoundingClientRect().left + card.offsetWidth / 2 -
    (el.getBoundingClientRect().left + el.clientWidth / 2)
  )
}
