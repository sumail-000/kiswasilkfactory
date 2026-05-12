"use client";

import { useCallback, useState, type ReactNode, createElement } from "react";

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
  const [shown, setShown] = useState(false);

  const setRef = useCallback(
    (el: HTMLElement | null) => {
      if (!el || shown) return;
      if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
        setShown(true);
        return;
      }
      const io = new IntersectionObserver(
        (entries, observer) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              window.setTimeout(() => setShown(true), delay);
              observer.disconnect();
              break;
            }
          }
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
      );
      io.observe(el);
    },
    [delay, shown]
  );

  return createElement(
    as,
    { ref: setRef, className: `reveal ${shown ? "in" : ""} ${className}` },
    children
  );
}
