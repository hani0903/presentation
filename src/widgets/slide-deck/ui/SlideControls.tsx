import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/shared/lib/utils";

interface SlideControlsProps {
  canGoPrev: boolean;
  canGoNext: boolean;
  onPrev: () => void;
  onNext: () => void;
}

export const SlideControls = ({
  canGoPrev,
  canGoNext,
  onPrev,
  onNext,
}: SlideControlsProps) => {
  return (
    <>
      <button
        type="button"
        onClick={onPrev}
        disabled={!canGoPrev}
        aria-label="이전 슬라이드"
        className={cn(
          "absolute top-0 left-0 flex h-full w-16 items-center justify-center",
          "text-on-surface-variant transition-all duration-200",
          "hover:bg-surface-overlay hover:text-on-surface",
          "disabled:cursor-not-allowed disabled:opacity-20",
          "focus-visible:outline-primary focus-visible:outline-2 focus-visible:outline-offset-2",
        )}
      >
        <ChevronLeft size={32} aria-hidden />
      </button>
      <button
        type="button"
        onClick={onNext}
        disabled={!canGoNext}
        aria-label="다음 슬라이드"
        className={cn(
          "absolute top-0 right-0 flex h-full w-16 items-center justify-center",
          "text-on-surface-variant transition-all duration-200",
          "hover:bg-surface-overlay hover:text-on-surface",
          "disabled:cursor-not-allowed disabled:opacity-20",
          "focus-visible:outline-primary focus-visible:outline-2 focus-visible:outline-offset-2",
        )}
      >
        <ChevronRight size={32} aria-hidden />
      </button>
    </>
  );
};
