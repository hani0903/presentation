import { ExternalLink } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import type { Presentation } from "../model/types";

interface PresentationCardProps {
  card: Presentation;
}

export const PresentationCard = ({ card }: PresentationCardProps) => {
  return (
    <a
      href={card.path}
      target="_blank"
      rel="noreferrer"
      className={cn(
        "group flex w-full flex-col gap-4 rounded-2xl border p-6",
        "border-outline-variant bg-surface-container-low",
        "cursor-pointer transition-colors duration-200",
        "hover:border-outline hover:bg-surface-container",
        "focus-visible:outline-primary focus-visible:outline-2 focus-visible:outline-offset-2",
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-heading-4 text-on-surface">{card.title}</h3>
        <ExternalLink
          size={18}
          aria-hidden
          className="text-on-surface-variant group-hover:text-on-surface mt-0.5 shrink-0 transition-colors"
        />
      </div>
      <p className="text-body-3 text-on-surface-variant">{card.description}</p>
      <div className="flex flex-wrap gap-2">
        {card.keywords.map((keyword) => (
          <span
            key={keyword}
            className="bg-primary-container text-caption text-on-primary-container rounded-full px-2.5 py-1"
          >
            {keyword}
          </span>
        ))}
      </div>
    </a>
  );
};
