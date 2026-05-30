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

export interface ContentSlide {
  type: "content";
  id: number;
  chapter: string;
  title: string;
  bullets: string[];
}

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

export type Slide =
  | CoverSlide
  | SectionSlide
  | ContentSlide
  | ProcessSlide
  | SplitSlide;
