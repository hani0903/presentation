import type { Slide } from "./types";

export const SLIDES: Slide[] = [
  // Slide 1 — CoverSlide
  {
    id: 1,
    type: "cover",
    title: "Claude Harness를 활용한\nAI 개발 워크플로우 구축",
    subtitle: "CLAUDE.md · Rules · Hooks · Skills",
    presenter: "조하은",
  },

  // Slide 2 — 왜 관심을 가지게 되었나
  {
    id: 2,
    type: "content",
    chapter: "01. 배경",
    title: "왜 Claude Harness인가",
    bullets: [
      "AI에게 매번 같은 컨텍스트를 설명하는 반복 비용",
      "프로젝트를 모르는 AI는 일관된 코드를 만들지 못함",
      "Harness = AI가 프로젝트를 이해하고 일관되게 동작하는 환경",
    ],
  },

  // Slide 3 — Harness란 무엇인가
  {
    id: 3,
    type: "content",
    chapter: "01. 배경",
    title: "Claude Harness란",
    bullets: [
      "CLAUDE.md — 프로젝트 맥락과 규칙을 AI에게 영속적으로 전달",
      "Rules — 아키텍처·코딩 컨벤션을 대화마다 재설명하지 않아도 됨",
      "Hooks — 파일 저장·커밋 시점에 품질 가드를 자동 실행",
      "Skills — 반복 워크플로우를 재사용 가능한 명령으로 캡슐화",
    ],
  },

  // Slide 4 — SectionSlide
  {
    id: 4,
    type: "section",
    sectionNumber: "02",
    title: "내가 구축하고 있는 Claude Harness",
    items: ["CLAUDE.md", "Design System", "Feature Planning"],
  },

  // Slide 5 — CLAUDE.md
  {
    id: 5,
    type: "content",
    chapter: "02. 내가 구축하고 있는 Harness",
    title: "CLAUDE.md",
    bullets: [
      "프로젝트 개요·기술 스택·아키텍처를 단일 문서에 정의",
      "FSD 레이어 규칙, 컴포넌트 컨벤션, import 규칙 자동 적용",
      "대화가 바뀌어도 AI가 동일한 맥락으로 작업",
    ],
  },

  // Slide 6 — Design System + Skills
  {
    id: 6,
    type: "content",
    chapter: "02. 내가 구축하고 있는 Harness",
    title: "Design System + Skills",
    bullets: [
      "PostToolUse 훅: 파일 저장 시 디자인 토큰 위반 자동 감지",
      "design-system 스킬: UI 작업 전 원칙과 토큰을 컨텍스트에 로드",
      "feature-planner 스킬: 스펙 인터뷰 → PRD → 이슈 분해 자동화",
    ],
  },

  // Slide 7 — ProcessSlide
  {
    id: 7,
    type: "process",
    title: "Feature Planning Workflow",
    steps: [
      { label: "spec-original.md", description: "초기 아이디어 · 기능 정의서" },
      { label: "스펙 인터뷰", description: "1문1답으로 모호성 제거" },
      { label: "spec-fixed.md", description: "확정된 요구사항" },
      { label: "PRD + ADR", description: "사용자 스토리 · 기술 결정" },
      { label: "이슈 분해", description: "수직 슬라이스 · Given-When-Then AC" },
      { label: "구현 → 검증", description: "이슈 순서대로 구현 · 동작 확인" },
    ],
  },

  // Slide 8 — SectionSlide
  {
    id: 8,
    type: "section",
    sectionNumber: "03",
    title: "다음 실험 계획",
  },

  // Slide 9 — SplitSlide
  {
    id: 9,
    type: "split",
    title: "현재까지 / 앞으로",
    left: {
      heading: "현재 검증 완료",
      bullets: [
        "CLAUDE.md 기반 FSD 아키텍처 룰셋",
        "디자인 시스템 PostToolUse 훅",
        "feature-planner 스킬 파이프라인",
        "Husky + commitlint 커밋 가드",
      ],
    },
    right: {
      heading: "다음 실험 계획",
      bullets: [
        "Playwright 기반 검증 자동화",
        "FSD PreToolUse 훅 완성",
        "Storybook 컴포넌트 문서화",
        "슬라이드 콘텐츠 MDX 전환",
      ],
    },
  },

  // Slide 10 — 마무리
  {
    id: 10,
    type: "content",
    chapter: "03. 마무리",
    title: "한 줄 요약",
    bullets: [
      '"AI에게 프로젝트를 이해시키면, 반복은 사라지고 설계가 남는다"',
      "Harness는 완성이 아니라 지속적으로 구축하는 시스템",
      "이 발표 자체가 Harness로 구현됐습니다",
    ],
  },
];
