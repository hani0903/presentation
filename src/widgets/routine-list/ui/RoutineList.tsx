import { RoutineCard, useRoutineStore } from "@/entities/routine";
import { ToggleButton } from "@/features/toggle-routine";

export function RoutineList() {
  const routines = useRoutineStore((state) => state.routines);

  return (
    <ul className="flex flex-col gap-2">
      {routines.map((routine) => (
        <li key={routine.id}>
          <RoutineCard
            routine={routine}
            action={
              <ToggleButton routineId={routine.id} isDone={routine.isDone} />
            }
          />
        </li>
      ))}
    </ul>
  );
}
