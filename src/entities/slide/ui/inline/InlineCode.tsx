import { cn } from "@/shared/lib/utils";

interface InlineCodeProps {
  text: string;
  className?: string;
}

export const InlineCode = ({ text, className }: InlineCodeProps) => (
  <code
    className={cn(
      "bg-primary-100 text-primary-700 rounded px-1.5 py-0.5 font-mono text-[0.9em]",
      className,
    )}
  >
    {text}
  </code>
);
