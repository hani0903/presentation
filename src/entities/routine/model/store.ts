import { create } from "zustand";
import type { Routine } from "./types";
import { mockRoutines } from "./mock";

interface RoutineStore {
  routines: Routine[];
  toggleRoutine: (id: string) => void;
}

export const useRoutineStore = create<RoutineStore>((set) => ({
  routines: mockRoutines,
  toggleRoutine: (id) =>
    set((state) => ({
      routines: state.routines.map((r) =>
        r.id === id ? { ...r, isDone: !r.isDone } : r,
      ),
    })),
}));
