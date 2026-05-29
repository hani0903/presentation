import type { ReactNode } from "react";
import { cn } from "@/shared/lib/utils";
import type { Routine } from "../model/types";

interface RoutineCardProps {
  routine: Routine;
  action?: ReactNode;
}

export function RoutineCard({ routine, action }: RoutineCardProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between rounded-lg border p-4",
        routine.isDone ? "bg-neutral-50 opacity-60" : "bg-white",
      )}
    >
      <span
        className={cn(
          "text-sm",
          routine.isDone && "text-neutral-400 line-through",
        )}
      >
        {routine.title}
      </span>
      {action}
    </div>
  );
}
