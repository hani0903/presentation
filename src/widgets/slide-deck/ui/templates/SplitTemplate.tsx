import type { SplitSlide } from "@/entities/slide";

export const SplitTemplate = ({ title, left, right }: SplitSlide) => {
  return (
    <div className="flex h-full w-full flex-col justify-center gap-8 px-16 py-12">
      <h2 className="text-heading-3 text-on-surface">{title}</h2>
      <div className="grid grid-cols-2 gap-8">
        {[left, right].map((col, i) => (
          <div key={i} className="flex flex-col gap-4">
            <h3 className="text-body-1 text-on-surface font-semibold">
              {col.heading}
            </h3>
            <ul className="flex flex-col gap-2">
              {col.bullets.map((bullet, j) => (
                <li
                  key={j}
                  className="text-body-2 text-on-surface-variant flex items-start gap-2"
                >
                  <span className="bg-primary mt-2 h-1.5 w-1.5 shrink-0 rounded-full" />
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};
