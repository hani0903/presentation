import type { ElementType, ReactNode } from "react";
import { cn } from "@/shared/lib/utils";

interface BodyProps {
  as?: ElementType;
  children: ReactNode;
  className?: string;
}

export const Body = ({ as: Tag = "p", children, className }: BodyProps) => (
  <Tag className={cn("text-body-2 text-on-surface-variant", className)}>
    {children}
  </Tag>
);
