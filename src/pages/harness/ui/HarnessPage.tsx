import { SLIDES } from "@/entities/slide";
import { SlideDeck } from "@/widgets/slide-deck";

export const HarnessPage = () => {
  return (
    <div className="bg-background flex min-h-screen flex-col items-center justify-center p-8">
      <SlideDeck slides={SLIDES} />
    </div>
  );
};
