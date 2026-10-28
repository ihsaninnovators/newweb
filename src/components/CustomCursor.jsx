import React, { useEffect, useRef, useState } from "react";

const INTERACTIVE = 'a, button, input, textarea, select, label, [role="button"]';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    // Touch devices and small screens keep their native cursor
    const touch = navigator.maxTouchPoints > 0 || window.matchMedia("(pointer: coarse)").matches;
    const wide = window.innerWidth >= 768;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (touch || !wide || reduced) return;

    setEnabled(true);
    document.body.classList.add("has-custom-cursor");

    let mx = -100;
    let my = -100;
    let rx = -100;
    let ry = -100;
    let frame = 0;

    const place = (el, x, y) => {
      if (el) el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
    };

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      setVisible(true);
      const el = e.target instanceof Element ? e.target : null;
      setActive(!!el?.closest(INTERACTIVE));
      place(dotRef.current, mx, my);
    };

    const onLeave = () => setVisible(false);

    const tick = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      place(ringRef.current, rx, ry);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(frame);
      document.body.classList.remove("has-custom-cursor");
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden="true"
        className={`pointer-events-none fixed left-0 top-0 z-[9998] border transition-[width,height,background-color,border-color,opacity] duration-200 ease-out ${visible ? "opacity-100" : "opacity-0"} ${active ? "h-11 w-11 border-primary bg-primary/10" : "h-7 w-7 border-primary/50 bg-transparent"}`}
      />
      <div
        ref={dotRef}
        aria-hidden="true"
        className={`pointer-events-none fixed left-0 top-0 z-[9999] h-1 w-1 bg-primary transition-opacity duration-200 ${visible ? "opacity-100" : "opacity-0"}`}
      />
    </>
  );
}