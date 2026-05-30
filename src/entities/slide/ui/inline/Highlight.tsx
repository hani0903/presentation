import { cn } from "@/shared/lib/utils";

interface HighlightProps {
  text: string;
  className?: string;
}

export const Highlight = ({ text, className }: HighlightProps) => (
  <strong className={cn("text-primary font-bold", className)}>{text}</strong>
);
