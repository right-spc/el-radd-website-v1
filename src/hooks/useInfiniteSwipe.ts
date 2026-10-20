import { useEffect, useRef } from 'react';

// Infinite swipe — the list is doubled and, once a swipe settles, the scroll
// position silently teleports back by one copy width (identical content), so
// it never hits an end in either direction. RTL-aware.
export function useInfiniteSwipe<T extends HTMLElement>() {
  const trackRef = useRef<T>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const copy = () => track.scrollWidth / 2;
    const isRTL = () => getComputedStyle(track).direction === 'rtl';
    const recenter = () => {
      track.scrollLeft = (isRTL() ? -1 : 1) * copy();
    };
    recenter();
    let settleTimer: number | undefined;
    const onScroll = () => {
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(() => {
        const c = copy();
        if (c <= 0) return;
        let p = Math.abs(track.scrollLeft);
        const sign = track.scrollLeft < 0 ? -1 : 1;
        if (p < c) p += c;
        else if (p >= c * 2) p -= c;
        else return;
        track.scrollLeft = p * sign;
      }, 120);
    };
    track.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', recenter);
    return () => {
      window.clearTimeout(settleTimer);
      track.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', recenter);
    };
  }, []);

  return trackRef;
}
