/**
 * Aceternity-style Spotlight — radial cyan glow that follows the cursor
 * within its parent. Drop it inside a `relative overflow-hidden` container.
 */
import { useRef, useEffect, useState } from 'react';

interface SpotlightProps {
  className?: string;
}

export function Spotlight({ className = '' }: SpotlightProps) {
  /**
   * The listener lives in an effect, not in the callback ref.
   *
   * A callback ref used to register it and return a cleanup function, but
   * React 18 ignores what a callback ref returns — so the mousemove listener
   * was never removed. Every mount left one behind on the hero section, each
   * holding a reference to a detached node, and React logged "Unexpected
   * return value from a callback ref" on every render. React 19 changes the
   * semantics again, which would have turned this into a different bug.
   */
  const [el, setEl] = useState<HTMLDivElement | null>(null);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!el) return;
    const parent = el.parentElement;
    if (!parent) return;

    const handleMouseMove = (e: MouseEvent) => {
      const node = ref.current;
      if (!node) return;
      const rect = parent.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      node.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(0,212,255,0.07), transparent 50%)`;
    };

    parent.addEventListener('mousemove', handleMouseMove);
    return () => parent.removeEventListener('mousemove', handleMouseMove);
  }, [el]);

  return (
    <div
      ref={(node) => {
        ref.current = node;
        setEl(node);
      }}
      className={`pointer-events-none absolute inset-0 z-0 transition-opacity duration-300 ${className}`}
    />
  );
}
