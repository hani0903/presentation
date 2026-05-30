import { useEffect, useRef, useState } from "react";
import type { Slide } from "@/entities/slide";
import { cn } from "@/shared/lib/utils";
import { SlideRenderer } from "./SlideRenderer";

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
    <div className={cn("h-full w-full", animClass)}>
      <SlideRenderer slide={displaySlide} />
    </div>
  );
};
