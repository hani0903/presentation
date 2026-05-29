import { Button } from "@/shared/ui/Button";
import { useRoutineStore } from "@/entities/routine";

interface ToggleButtonProps {
  routineId: string;
  isDone: boolean;
}

export function ToggleButton({ routineId, isDone }: ToggleButtonProps) {
  const toggleRoutine = useRoutineStore((state) => state.toggleRoutine);

  return (
    <Button variant="ghost" onClick={() => toggleRoutine(routineId)}>
      {isDone ? "취소" : "완료"}
    </Button>
  );
}
