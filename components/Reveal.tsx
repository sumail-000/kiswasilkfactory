"use client";

import { useEffect, useRef, useState, type ReactNode, createElement } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
  delay?: number;
};

export default function Reveal({
  children,
  className = "",
  as = "div",
  delay = 0,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const t = setTimeout(() => setShown(true), delay);
            io.disconnect();
            return () => clearTimeout(t);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  return createElement(
    as,
    { ref, className: `reveal ${shown ? "in" : ""} ${className}` },
    children
  );
}
