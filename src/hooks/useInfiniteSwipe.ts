import { useEffect, useRef } from 'react';

// Infinite swipe — the list is doubled and, once a swipe settles, the scroll
// position silently teleports back by one copy width (identical content), then
// glides to the nearest card edge. The teleport direction comes from the
// computed direction, never from scrollLeft's sign — at the RTL 0 boundary the
// sign flips and would clamp the wrap to the first card. Alignment is done in
// JS (not CSS scroll-snap) because mandatory snap re-targets after teleports
// and snaps the user back to the card they came from.
export function useInfiniteSwipe<T extends HTMLElement>() {
  const trackRef = useRef<T>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const copy = () => track.scrollWidth / 2;
    const isRTL = () => getComputedStyle(track).direction === 'rtl';
    const sign = () => (isRTL() ? -1 : 1);
    // Start in the middle copy so swiping wraps both ways from the start.
    track.scrollLeft = sign() * copy();

    // Phone browsers fire resize when the URL bar collapses during scrolling —
    // only re-center when the width genuinely changed, or it would yank the
    // user back mid-swipe.
    let lastWidth = window.innerWidth;
    const onResize = () => {
      if (window.innerWidth === lastWidth) return;
      lastWidth = window.innerWidth;
      track.scrollLeft = sign() * copy();
    };

    let settleTimer: number | undefined;
    const onScroll = () => {
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(() => {
        const c = copy();
        if (c <= 0) return;
        let p = Math.abs(track.scrollLeft);
        if (p < c) p += c;
        else if (p >= c * 2) p -= c;
        // teleport by one copy (invisible — identical content)
        track.scrollLeft = p * sign();
        // then glide to the nearest card edge for a clean rest position
        const first = track.firstElementChild as HTMLElement | null;
        const second = first ? (first.nextElementSibling as HTMLElement | null) : null;
        if (!first || !second) return;
        const slot = second.offsetLeft - first.offsetLeft;
        if (slot <= 0) return;
        const p2 = Math.abs(track.scrollLeft);
        const aligned = Math.round(p2 / slot) * slot;
        if (Math.abs(aligned - p2) > 2) {
          track.scrollTo({ left: aligned * sign(), behavior: 'smooth' });
        }
      }, 120);
    };

    track.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      window.clearTimeout(settleTimer);
      track.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return trackRef;
}
