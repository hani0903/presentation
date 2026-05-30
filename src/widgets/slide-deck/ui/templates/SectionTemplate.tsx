import type { SectionSlide } from "@/entities/slide";

export const SectionTemplate = ({
  sectionNumber,
  title,
  items,
}: SectionSlide) => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-8 px-16 py-12">
      <span className="text-heading-1 text-primary font-bold">
        {sectionNumber}
      </span>
      <h2 className="text-heading-2 text-on-surface text-center">{title}</h2>
      {items && items.length > 0 && (
        <ul className="flex flex-col items-center gap-2">
          {items.map((item, i) => (
            <li key={i} className="text-body-2 text-on-surface-variant">
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
