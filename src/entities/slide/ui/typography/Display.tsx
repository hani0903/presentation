import type { ElementType, ReactNode } from "react";
import { cn } from "@/shared/lib/utils";

interface DisplayProps {
  as?: ElementType;
  children: ReactNode;
  className?: string;
}

export const Display = ({
  as: Tag = "h1",
  children,
  className,
}: DisplayProps) => (
  <Tag className={cn("text-display-1 text-on-surface", className)}>
    {children}
  </Tag>
);
