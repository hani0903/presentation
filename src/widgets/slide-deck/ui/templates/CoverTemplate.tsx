import type { CoverSlide } from "@/entities/slide";

export const CoverTemplate = ({ title, subtitle, presenter }: CoverSlide) => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-6 px-16 py-12">
      <h1 className="text-heading-1 text-on-surface text-center break-keep">
        {title}
      </h1>
      <p className="text-body-1 text-on-surface-variant text-center">
        {subtitle}
      </p>
      <span className="text-caption text-on-surface-variant mt-4">
        {presenter}
      </span>
    </div>
  );
};
