import type { ElementType, ReactNode } from "react";
import { cn } from "@/shared/lib/utils";

interface SubheadingProps {
  as?: ElementType;
  children: ReactNode;
  className?: string;
}

export const Subheading = ({
  as: Tag = "h3",
  children,
  className,
}: SubheadingProps) => (
  <Tag className={cn("text-heading-4 text-on-surface", className)}>
    {children}
  </Tag>
);
