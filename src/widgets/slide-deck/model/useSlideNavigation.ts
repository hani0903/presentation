import { useCallback, useEffect, useState } from "react";

interface UseSlideNavigationResult {
  currentIndex: number;
  direction: "next" | "prev" | null;
  canGoNext: boolean;
  canGoPrev: boolean;
  goNext: () => void;
  goPrev: () => void;
}

export const useSlideNavigation = (total: number): UseSlideNavigationResult => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev" | null>(null);

  const canGoNext = currentIndex < total - 1;
  const canGoPrev = currentIndex > 0;

  const goNext = useCallback(() => {
    if (!canGoNext) return;
    setDirection("next");
    setCurrentIndex((i) => i + 1);
  }, [canGoNext]);

  const goPrev = useCallback(() => {
    if (!canGoPrev) return;
    setDirection("prev");
    setCurrentIndex((i) => i - 1);
  }, [canGoPrev]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [goNext, goPrev]);

  return { currentIndex, direction, canGoNext, canGoPrev, goNext, goPrev };
};
