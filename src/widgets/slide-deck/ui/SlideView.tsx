import { useEffect, useRef, useState } from "react";
import type { Slide } from "@/entities/slide";
import { cn } from "@/shared/lib/utils";

interface SlideViewProps {
  slide: Slide;
  direction: "next" | "prev" | null;
}

export const SlideView = ({ slide, direction }: SlideViewProps) => {
  const [displaySlide, setDisplaySlide] = useState(slide);
  const [animClass, setAnimClass] = useState("");
  const isFirst = useRef(true);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    const enterFrom =
      direction === "next" ? "translate-x-full" : "-translate-x-full";

    setAnimClass(enterFrom);
    const raf = requestAnimationFrame(() => {
      setDisplaySlide(slide);
      setAnimClass(cn(enterFrom, "transition-transform duration-300 ease-out"));
      requestAnimationFrame(() =>
        setAnimClass(
          "translate-x-0 transition-transform duration-300 ease-out",
        ),
      );
    });
    return () => cancelAnimationFrame(raf);
  }, [slide, direction]);

  return (
    <div
      className={cn(
        "flex h-full w-full flex-col items-start justify-center gap-8 px-16 py-12",
        animClass,
      )}
    >
      <h2 className="text-heading-2 text-on-surface">{displaySlide.title}</h2>
      <ul className="flex flex-col gap-3">
        {displaySlide.bullets.map((bullet, i) => (
          <li
            key={i}
            className="text-body-1 text-on-surface-variant flex items-start gap-3"
          >
            <span className="bg-primary mt-2 h-1.5 w-1.5 shrink-0 rounded-full" />
            {bullet}
          </li>
        ))}
      </ul>
    </div>
  );
};
