import type { Presentation } from "./types";
import { PRESENTATION_CARDS } from "./constants";

export const usePresentations = (): { data: Presentation[] } => ({
  data: PRESENTATION_CARDS,
});
