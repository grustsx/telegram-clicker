import { useRef, useState, useEffect } from 'react';

export function useZoomWithWheel(initialZoom = 1, minZoom = 0.5, maxZoom = 3) {
  const [zoom, setZoom] = useState(initialZoom);
  const pinchStartDistanceRef = useRef<number | null>(null);
  const lastZoomRef = useRef(initialZoom);
  const containerRef = useRef<HTMLDivElement>(null);

  const getDistance = (touch1: Touch, touch2: Touch) => {
    const dx = touch2.clientX - touch1.clientX;
    const dy = touch2.clientY - touch1.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  // Touch pinch
  const onTouchStart = (e: TouchEvent) => {
    if (e.touches.length === 2) {
      const dist = getDistance(e.touches[0], e.touches[1]);
      pinchStartDistanceRef.current = dist;
    }
  };

  const onTouchMove = (e: TouchEvent) => {
    if (e.touches.length === 2 && pinchStartDistanceRef.current !== null) {
      e.preventDefault();
      const newDist = getDistance(e.touches[0], e.touches[1]);
      const scaleFactor = newDist / pinchStartDistanceRef.current;
      let newZoom = lastZoomRef.current * scaleFactor;
      newZoom = Math.min(maxZoom, Math.max(minZoom, newZoom));
      setZoom(newZoom);
    }
  };

  const onTouchEnd = () => {
    if (pinchStartDistanceRef.current !== null) {
      lastZoomRef.current = zoom;
      pinchStartDistanceRef.current = null;
    }
  };

  // Mouse wheel zoom
  const onWheel = (e: WheelEvent) => {
    // ✅ вариант: только если нажата Ctrl
    // if (!e.ctrlKey) return;

    // ✅ вариант: всегда масштабировать (как в редакторах)
    const delta = -e.deltaY;
    const zoomStep = 0.0015;
    const newZoom = Math.min(
      maxZoom,
      Math.max(minZoom, zoom + delta * zoomStep),
    );
    setZoom(newZoom);
    lastZoomRef.current = newZoom;

    // Отключаем нативный зум
    e.preventDefault();
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    el.addEventListener('touchstart', onTouchStart, { passive: false });
    el.addEventListener('touchmove', onTouchMove, { passive: false });
    el.addEventListener('touchend', onTouchEnd);
    el.addEventListener('wheel', onWheel, { passive: false });

    return () => {
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
      el.removeEventListener('touchend', onTouchEnd);
      el.removeEventListener('wheel', onWheel);
    };
  }, [zoom]);

  return { zoom, ref: containerRef };
}
