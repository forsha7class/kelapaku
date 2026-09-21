"use client";

import { useEffect, useRef } from "react";
import { animate, useInView } from "motion/react";

/**
 * Progressive enhancement: tanpa JS konten tetap terlihat (globals.css hanya
 * menyembunyikan .reveal saat prefers-reduced-motion: no-preference).
 */
export function Reveal({
  children,
  delay = 0,
  y = 26,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.opacity = "1";
      return;
    }
    const ctrl = animate(
      el,
      { opacity: [0, 1], transform: [`translateY(${y}px)`, "translateY(0px)"] },
      { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
    );
    return () => ctrl.stop();
  }, [inView, delay, y]);

  return (
    <div ref={ref} data-fx="reveal" className={`reveal ${className ?? ""}`}>
      {children}
    </div>
  );
}
