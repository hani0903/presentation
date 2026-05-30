export interface CoverSlide {
  type: "cover";
  id: number;
  title: string;
  subtitle: string;
  presenter: string;
}

export interface SectionSlide {
  type: "section";
  id: number;
  sectionNumber: string;
  title: string;
  items?: string[];
}

// ── ContentBlock ─────────────────────────────────────────────────────────────

export interface FlowStep {
  label: string;
  description?: string;
}

export interface CompareColumn {
  heading: string;
  items: string[];
}

export type ContentBlock =
  | { kind: "bullets"; items: string[] }
  | { kind: "ordered"; items: string[] }
  | { kind: "callout"; variant: "info" | "success" | "warning"; text: string }
  | { kind: "code"; lang: "text" | "md" | "js" | "ts"; code: string }
  | { kind: "table"; headers: string[]; rows: string[][] }
  | { kind: "flow"; steps: FlowStep[]; direction?: "vertical" | "horizontal" }
  | { kind: "compare"; left: CompareColumn; right: CompareColumn }
  | { kind: "image"; src: string; alt: string; caption?: string }
  | { kind: "heading"; text: string; as?: string }
  | { kind: "body"; text: string; as?: string }
  | { kind: "highlight"; text: string }
  | { kind: "inline-code"; text: string };

export interface ContentSlide {
  type: "content";
  id: number;
  chapter: string;
  title: string;
  body: ContentBlock[];
}

// ── ProcessSlide ──────────────────────────────────────────────────────────────

export interface ProcessStep {
  label: string;
  description?: string;
}

export interface ProcessSlide {
  type: "process";
  id: number;
  title: string;
  steps: ProcessStep[];
}

// ── SplitSlide ────────────────────────────────────────────────────────────────

export interface SplitColumn {
  heading: string;
  bullets: string[];
}

export interface SplitSlide {
  type: "split";
  id: number;
  title: string;
  left: SplitColumn;
  right: SplitColumn;
}

// ── Union ─────────────────────────────────────────────────────────────────────

export type Slide =
  | CoverSlide
  | SectionSlide
  | ContentSlide
  | ProcessSlide
  | SplitSlide;
