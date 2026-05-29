import { ExternalLink } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import type { DocLink } from "../model/constants";

type DocLinkCardProps = DocLink;

export const DocLinkCard = ({ name, description, url }: DocLinkCardProps) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className={cn(
        "flex items-center justify-between rounded-2xl p-4",
        "bg-surface-container-low shadow-card",
        "transition-[background-color,transform] duration-[120ms]",
        "hover:bg-surface-hover hover:-translate-y-px",
        "focus-visible:outline-primary focus-visible:outline-2 focus-visible:outline-offset-2",
      )}
    >
      <div className="flex flex-col gap-1">
        <span className="text-body-3 text-on-surface font-medium">{name}</span>
        <span className="text-caption text-on-surface-variant">
          {description}
        </span>
      </div>
      <ExternalLink
        size={16}
        aria-hidden
        className="text-on-surface-variant shrink-0"
      />
    </a>
  );
};
