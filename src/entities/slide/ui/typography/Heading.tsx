import type { ElementType, ReactNode } from "react";
import { cn } from "@/shared/lib/utils";

interface HeadingProps {
  as?: ElementType;
  children: ReactNode;
  className?: string;
}

export const Heading = ({
  as: Tag = "h2",
  children,
  className,
}: HeadingProps) => (
  <Tag className={cn("text-heading-2 text-on-surface", className)}>
    {children}
  </Tag>
);
