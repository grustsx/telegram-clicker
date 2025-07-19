import { useRef, useEffect } from 'react';

export default function useDragScroll<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const isDragging = useRef(false);
  const start = useRef({ x: 0, y: 0, scrollLeft: 0, scrollTop: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      start.current = {
        x: e.pageX,
        y: e.pageY,
        scrollLeft: el.scrollLeft,
        scrollTop: el.scrollTop,
      };
      el.style.cursor = 'grabbing';
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const dx = e.pageX - start.current.x;
      const dy = e.pageY - start.current.y;
      el.scrollLeft = start.current.scrollLeft - dx;
      el.scrollTop = start.current.scrollTop - dy;
    };

    const onMouseUp = () => {
      isDragging.current = false;
      el.style.cursor = 'grab';
    };

    const onTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      isDragging.current = true;
      start.current = {
        x: touch.pageX,
        y: touch.pageY,
        scrollLeft: el.scrollLeft,
        scrollTop: el.scrollTop,
      };
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging.current) return;
      const touch = e.touches[0];
      const dx = touch.pageX - start.current.x;
      const dy = touch.pageY - start.current.y;
      el.scrollLeft = start.current.scrollLeft - dx;
      el.scrollTop = start.current.scrollTop - dy;
      e.preventDefault();
    };

    const onTouchEnd = () => {
      isDragging.current = false;
    };

    el.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    el.addEventListener('touchstart', onTouchStart, { passive: false });
    el.addEventListener('touchmove', onTouchMove, { passive: false });
    el.addEventListener('touchend', onTouchEnd);

    el.style.cursor = 'grab';

    return () => {
      el.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);

      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
      el.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  return ref;
}
