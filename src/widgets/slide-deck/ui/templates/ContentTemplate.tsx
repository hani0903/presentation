import type { ContentSlide } from "@/entities/slide";
import { ContentBlockRenderer } from "@/entities/slide";

export const ContentTemplate = ({ chapter, title, body }: ContentSlide) => {
  return (
    <div className="flex h-full w-full flex-col gap-8 px-16 py-12">
      <span className="text-caption text-on-surface-variant tracking-widest uppercase">
        {chapter}
      </span>
      <h2 className="text-heading-2 text-on-surface">{title}</h2>
      <div className="flex flex-col gap-4">
        {body.map((block, i) => (
          <ContentBlockRenderer key={`${block.kind}-${i}`} block={block} />
        ))}
      </div>
    </div>
  );
};
