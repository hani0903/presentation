import type { Slide } from "@/entities/slide";
import { useSlideNavigation } from "../model/useSlideNavigation";
import { SlideControls } from "./SlideControls";
import { SlideIndicator } from "./SlideIndicator";
import { SlideView } from "./SlideView";

interface SlideDeckProps {
  slides: Slide[];
}

export const SlideDeck = ({ slides }: SlideDeckProps) => {
  const { currentIndex, direction, canGoNext, canGoPrev, goNext, goPrev } =
    useSlideNavigation(slides.length);

  return (
    <div className="flex w-full max-w-5xl flex-col items-center gap-4">
      <div className="border-outline-variant bg-surface-container relative aspect-video w-full overflow-hidden rounded-2xl border">
        <SlideView slide={slides[currentIndex]} direction={direction} />
        <SlideControls
          canGoPrev={canGoPrev}
          canGoNext={canGoNext}
          onPrev={goPrev}
          onNext={goNext}
        />
      </div>
      <SlideIndicator current={currentIndex + 1} total={slides.length} />
    </div>
  );
};
