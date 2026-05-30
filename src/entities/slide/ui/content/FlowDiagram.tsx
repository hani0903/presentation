import { ArrowDown, ArrowRight } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import type { FlowStep } from "../../model/types";

interface FlowDiagramProps {
  steps: FlowStep[];
  direction?: "vertical" | "horizontal";
}

const VerticalArrow = () => (
  <ArrowDown size={18} className="text-on-surface-variant my-0.5 shrink-0" />
);

const HorizontalArrow = () => (
  <ArrowRight
    size={18}
    className="text-on-surface-variant mx-1 shrink-0 self-center"
  />
);

export const FlowDiagram = ({
  steps,
  direction = "vertical",
}: FlowDiagramProps) => {
  const isVertical = direction === "vertical";

  return (
    <div
      className={cn(
        "flex",
        isVertical ? "flex-col items-start" : "flex-wrap items-start",
      )}
    >
      {steps.map((step, i) => (
        <div
          key={i}
          className={cn(
            "flex",
            isVertical ? "flex-col items-start" : "flex-row items-center",
          )}
        >
          <div className="flex flex-col gap-0.5">
            <span className="text-body-2 text-on-surface font-medium">
              {step.label}
            </span>
            {step.description && (
              <span className="text-caption text-on-surface-variant">
                {step.description}
              </span>
            )}
          </div>
          {i < steps.length - 1 &&
            (isVertical ? <VerticalArrow /> : <HorizontalArrow />)}
        </div>
      ))}
    </div>
  );
};
