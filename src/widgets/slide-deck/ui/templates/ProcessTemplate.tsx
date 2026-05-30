import type { ProcessSlide } from "@/entities/slide";
import { FlowDiagram } from "@/entities/slide";

export const ProcessTemplate = ({ title, steps }: ProcessSlide) => (
  <div className="flex h-full w-full flex-col gap-6 px-16 py-12">
    <h2 className="text-heading-3 text-on-surface">{title}</h2>
    <FlowDiagram steps={steps} direction="vertical" />
  </div>
);
