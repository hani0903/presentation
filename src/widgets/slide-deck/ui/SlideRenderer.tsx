import type { Slide } from "@/entities/slide";
import { ContentTemplate } from "./templates/ContentTemplate";
import { CoverTemplate } from "./templates/CoverTemplate";
import { ProcessTemplate } from "./templates/ProcessTemplate";
import { SectionTemplate } from "./templates/SectionTemplate";
import { SplitTemplate } from "./templates/SplitTemplate";

interface SlideRendererProps {
  slide: Slide;
}

export const SlideRenderer = ({ slide }: SlideRendererProps) => {
  switch (slide.type) {
    case "cover":
      return <CoverTemplate {...slide} />;
    case "section":
      return <SectionTemplate {...slide} />;
    case "content":
      return <ContentTemplate {...slide} />;
    case "process":
      return <ProcessTemplate {...slide} />;
    case "split":
      return <SplitTemplate {...slide} />;
    default:
      return (
        <div className="flex h-full w-full items-center justify-center">
          <p className="text-body-2 text-on-surface-variant">{slide.title}</p>
        </div>
      );
  }
};
