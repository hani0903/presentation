import type { ContentSlide } from "@/entities/slide";

export const ContentTemplate = ({ chapter, title, bullets }: ContentSlide) => {
  return (
    <div className="flex h-full w-full flex-col justify-center gap-8 px-16 py-12">
      <span className="text-caption text-on-surface-variant tracking-widest uppercase">
        {chapter}
      </span>
      <h2 className="text-heading-2 text-on-surface">{title}</h2>
      <ul className="flex flex-col gap-3">
        {bullets.map((bullet, i) => (
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
