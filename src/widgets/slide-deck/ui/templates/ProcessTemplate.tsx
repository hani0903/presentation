import type { ProcessSlide } from "@/entities/slide";
import { ProcessArrow } from "../ProcessArrow";

export const ProcessTemplate = ({ title, steps }: ProcessSlide) => {
  return (
    <div className="flex h-full w-full flex-col gap-6 px-16 py-12">
      <h2 className="text-heading-3 text-on-surface">{title}</h2>
      <div className="flex flex-col items-start">
        {steps.map((step, i) => (
          <div key={i} className="flex flex-col items-start">
            <div className="flex flex-col gap-1">
              <span className="text-body-2 text-on-surface font-medium">
                {step.label}
              </span>
              {step.description && (
                <span className="text-caption text-on-surface-variant">
                  {step.description}
                </span>
              )}
            </div>
            {i < steps.length - 1 && <ProcessArrow />}
          </div>
        ))}
      </div>
    </div>
  );
};
