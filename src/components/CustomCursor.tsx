import { useEffect, useRef } from 'react';


export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const mouse  = useRef({ x: -200, y: -200 });
  const visible = useRef(false);

  useEffect(() => {
    if ('ontouchstart' in window) return;
    const dot = dotRef.current;
    if (!dot) return;

    const setVisible = (v: boolean) => {
      if (visible.current === v) return;
      visible.current = v;
      dot.style.opacity = v ? '1' : '0';
    };

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      dot.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
      setVisible(true);
    };

    // Named, so the cleanup can actually remove them. They used to be inline
    // arrow functions, which meant a fresh reference every mount and no way to
    // detach — each page navigation left two more behind on document.body.
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener('mousemove', onMove);
    document.body.addEventListener('mouseleave', onLeave);
    document.body.addEventListener('mouseenter', onEnter);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.body.removeEventListener('mouseleave', onLeave);
      document.body.removeEventListener('mouseenter', onEnter);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      className="hidden lg:block"
      style={{
        position: 'fixed', top: 0, left: 0,
        width: '8px', height: '8px',
        borderRadius: '50%',
        backgroundColor: '#00E5FF',
        zIndex: 9999,
        pointerEvents: 'none',
        opacity: 0,
        willChange: 'transform',
      }}
    />
  );
}
